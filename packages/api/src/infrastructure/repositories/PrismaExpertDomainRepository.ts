import { PrismaClient } from "@prisma/client";
import { ExpertDomain, DomainId } from "../../domain/entities/ExpertDomain.js";
import { IExpertDomainRepository } from "../../domain/repositories/IExpertDomainRepository.js";

/**
 * Prisma implementation of IExpertDomainRepository.
 * Fetches expert domain configurations from PostgreSQL database.
 */
export class PrismaExpertDomainRepository implements IExpertDomainRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findById(id: DomainId): Promise<ExpertDomain | null> {
    const domain = await this.prisma.expertDomain.findUnique({
      where: { id },
    });

    if (!domain) {
      return null;
    }

    return this.mapToDomainEntity(domain);
  }

  async findAll(): Promise<ExpertDomain[]> {
    const domains = await this.prisma.expertDomain.findMany();
    return domains.map(this.mapToDomainEntity);
  }

  private mapToDomainEntity(record: {
    id: string;
    name: string;
    description: string;
    agentName: string;
    agentRole: string;
    systemPrompt: string;
  }): ExpertDomain {
    return {
      id: record.id as DomainId,
      name: record.name,
      description: record.description,
      agentName: record.agentName,
      agentRole: record.agentRole,
      systemPrompt: record.systemPrompt,
    };
  }
}
