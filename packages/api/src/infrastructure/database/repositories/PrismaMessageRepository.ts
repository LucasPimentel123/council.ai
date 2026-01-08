import { PrismaClient, Prisma } from "@prisma/client";
import {
  Message,
  CreateMessageInput,
  MessageRole,
} from "../../../domain/entities/Message.js";
import {
  IMessageRepository,
  SimilarMessageResult,
} from "../../../domain/repositories/IMessageRepository.js";

export class PrismaMessageRepository implements IMessageRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findById(id: string): Promise<Message | null> {
    const message = await this.prisma.message.findUnique({
      where: { id },
    });

    if (!message) return null;

    return {
      ...message,
      role: message.role as MessageRole,
      embedding: null, // Unsupported type not returned by default
    };
  }

  async findByConversationId(conversationId: string): Promise<Message[]> {
    const messages = await this.prisma.message.findMany({
      where: { conversationId },
      orderBy: { createdAt: "asc" },
    });

    return messages.map((m) => ({
      ...m,
      role: m.role as MessageRole,
      embedding: null,
    }));
  }

  async create(input: CreateMessageInput): Promise<Message> {
    const { embedding, ...data } = input;

    if (embedding) {
      // Use raw SQL to insert with embedding
      const result = await this.prisma.$queryRaw<{ id: string }[]>`
        INSERT INTO "Message" (id, "conversationId", role, content, embedding, "createdAt")
        VALUES (
          gen_random_uuid()::text,
          ${data.conversationId},
          ${data.role},
          ${data.content},
          ${embedding}::vector,
          NOW()
        )
        RETURNING id
      `;

      const created = await this.findById(result[0].id);
      return created!;
    }

    const message = await this.prisma.message.create({
      data,
    });

    return {
      ...message,
      role: message.role as MessageRole,
      embedding: null,
    };
  }

  async updateEmbedding(id: string, embedding: number[]): Promise<void> {
    await this.prisma.$executeRaw`
      UPDATE "Message"
      SET embedding = ${embedding}::vector
      WHERE id = ${id}
    `;
  }

  async findSimilar(
    embedding: number[],
    limit: number,
    projectId?: string
  ): Promise<SimilarMessageResult[]> {
    const embeddingStr = `[${embedding.join(",")}]`;

    let results: Array<{
      id: string;
      conversationId: string;
      role: string;
      content: string;
      createdAt: Date;
      similarity: number;
    }>;

    if (projectId) {
      results = await this.prisma.$queryRaw`
        SELECT
          m.id,
          m."conversationId",
          m.role,
          m.content,
          m."createdAt",
          1 - (m.embedding <=> ${embeddingStr}::vector) as similarity
        FROM "Message" m
        JOIN "Conversation" c ON m."conversationId" = c.id
        WHERE m.embedding IS NOT NULL
          AND c."projectId" = ${projectId}
        ORDER BY m.embedding <=> ${embeddingStr}::vector
        LIMIT ${limit}
      `;
    } else {
      results = await this.prisma.$queryRaw`
        SELECT
          m.id,
          m."conversationId",
          m.role,
          m.content,
          m."createdAt",
          1 - (m.embedding <=> ${embeddingStr}::vector) as similarity
        FROM "Message" m
        WHERE m.embedding IS NOT NULL
        ORDER BY m.embedding <=> ${embeddingStr}::vector
        LIMIT ${limit}
      `;
    }

    return results.map((r) => ({
      message: {
        id: r.id,
        conversationId: r.conversationId,
        role: r.role as MessageRole,
        content: r.content,
        createdAt: r.createdAt,
        embedding: null,
      },
      similarity: Number(r.similarity),
    }));
  }

  async delete(id: string): Promise<void> {
    await this.prisma.message.delete({
      where: { id },
    });
  }
}
