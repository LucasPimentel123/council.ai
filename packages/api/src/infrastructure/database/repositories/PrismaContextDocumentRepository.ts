import { PrismaClient } from "@prisma/client";
import {
  ContextDocument,
  CreateDocumentInput,
  DocumentType,
} from "../../../domain/entities/ContextDocument.js";
import {
  IContextDocumentRepository,
  SimilarDocumentResult,
} from "../../../domain/repositories/IContextDocumentRepository.js";

export class PrismaContextDocumentRepository
  implements IContextDocumentRepository
{
  constructor(private readonly prisma: PrismaClient) {}

  async findAll(): Promise<ContextDocument[]> {
    const docs = await this.prisma.contextDocument.findMany({
      orderBy: { uploadedAt: "desc" },
    });

    return docs.map((d) => ({
      ...d,
      type: d.type as DocumentType,
      embedding: null,
    }));
  }

  async findById(id: string): Promise<ContextDocument | null> {
    const doc = await this.prisma.contextDocument.findUnique({
      where: { id },
    });

    if (!doc) return null;

    return {
      ...doc,
      type: doc.type as DocumentType,
      embedding: null,
    };
  }

  async findByProjectId(projectId: string): Promise<ContextDocument[]> {
    const docs = await this.prisma.contextDocument.findMany({
      where: { projectId },
      orderBy: { uploadedAt: "desc" },
    });

    return docs.map((d) => ({
      ...d,
      type: d.type as DocumentType,
      embedding: null,
    }));
  }

  async findByDomainId(domainId: string): Promise<ContextDocument[]> {
    const docs = await this.prisma.contextDocument.findMany({
      where: { domainId },
      orderBy: { uploadedAt: "desc" },
    });

    return docs.map((d) => ({
      ...d,
      type: d.type as DocumentType,
      embedding: null,
    }));
  }

  async create(input: CreateDocumentInput): Promise<ContextDocument> {
    const { embedding, ...data } = input;

    if (embedding) {
      const result = await this.prisma.$queryRaw<{ id: string }[]>`
        INSERT INTO "ContextDocument" (id, name, type, size, content, "domainId", "projectId", embedding, "uploadedAt")
        VALUES (
          gen_random_uuid()::text,
          ${data.name},
          ${data.type},
          ${data.size},
          ${data.content ?? null},
          ${data.domainId},
          ${data.projectId},
          ${embedding}::vector,
          NOW()
        )
        RETURNING id
      `;

      const created = await this.findById(result[0].id);
      return created!;
    }

    const doc = await this.prisma.contextDocument.create({
      data,
    });

    return {
      ...doc,
      type: doc.type as DocumentType,
      embedding: null,
    };
  }

  async updateEmbedding(id: string, embedding: number[]): Promise<void> {
    await this.prisma.$executeRaw`
      UPDATE "ContextDocument"
      SET embedding = ${embedding}::vector
      WHERE id = ${id}
    `;
  }

  async findSimilar(
    embedding: number[],
    limit: number,
    projectId?: string
  ): Promise<SimilarDocumentResult[]> {
    const embeddingStr = `[${embedding.join(",")}]`;

    let results: Array<{
      id: string;
      name: string;
      type: string;
      size: string;
      content: string | null;
      domainId: string;
      projectId: string;
      uploadedAt: Date;
      similarity: number;
    }>;

    if (projectId) {
      results = await this.prisma.$queryRaw`
        SELECT
          id,
          name,
          type,
          size,
          content,
          "domainId",
          "projectId",
          "uploadedAt",
          1 - (embedding <=> ${embeddingStr}::vector) as similarity
        FROM "ContextDocument"
        WHERE embedding IS NOT NULL
          AND "projectId" = ${projectId}
        ORDER BY embedding <=> ${embeddingStr}::vector
        LIMIT ${limit}
      `;
    } else {
      results = await this.prisma.$queryRaw`
        SELECT
          id,
          name,
          type,
          size,
          content,
          "domainId",
          "projectId",
          "uploadedAt",
          1 - (embedding <=> ${embeddingStr}::vector) as similarity
        FROM "ContextDocument"
        WHERE embedding IS NOT NULL
        ORDER BY embedding <=> ${embeddingStr}::vector
        LIMIT ${limit}
      `;
    }

    return results.map((r) => ({
      document: {
        id: r.id,
        name: r.name,
        type: r.type as DocumentType,
        size: r.size,
        content: r.content,
        domainId: r.domainId,
        projectId: r.projectId,
        uploadedAt: r.uploadedAt,
        embedding: null,
      },
      similarity: Number(r.similarity),
    }));
  }

  async delete(id: string): Promise<void> {
    await this.prisma.contextDocument.delete({
      where: { id },
    });
  }
}
