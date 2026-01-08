import { PrismaClient } from "@prisma/client";
import {
  Conversation,
  CreateConversationInput,
  UpdateConversationInput,
} from "../../../domain/entities/Conversation.js";
import { IConversationRepository } from "../../../domain/repositories/IConversationRepository.js";

export class PrismaConversationRepository implements IConversationRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findAll(): Promise<Conversation[]> {
    return this.prisma.conversation.findMany({
      orderBy: { updatedAt: "desc" },
    });
  }

  async findById(id: string): Promise<Conversation | null> {
    return this.prisma.conversation.findUnique({
      where: { id },
    });
  }

  async findByProjectId(projectId: string): Promise<Conversation[]> {
    return this.prisma.conversation.findMany({
      where: { projectId },
      orderBy: { updatedAt: "desc" },
    });
  }

  async findByDomainId(domainId: string): Promise<Conversation[]> {
    return this.prisma.conversation.findMany({
      where: { domainId },
      orderBy: { updatedAt: "desc" },
    });
  }

  async create(input: CreateConversationInput): Promise<Conversation> {
    return this.prisma.conversation.create({
      data: input,
    });
  }

  async update(
    id: string,
    input: UpdateConversationInput
  ): Promise<Conversation> {
    return this.prisma.conversation.update({
      where: { id },
      data: input,
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.conversation.delete({
      where: { id },
    });
  }
}
