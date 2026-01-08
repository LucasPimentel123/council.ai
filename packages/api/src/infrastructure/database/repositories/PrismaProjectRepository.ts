import { PrismaClient } from "@prisma/client";
import {
  Project,
  CreateProjectInput,
  UpdateProjectInput,
} from "../../../domain/entities/Project.js";
import { IProjectRepository } from "../../../domain/repositories/IProjectRepository.js";

export class PrismaProjectRepository implements IProjectRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findAll(): Promise<Project[]> {
    return this.prisma.project.findMany({
      orderBy: { createdAt: "desc" },
    });
  }

  async findById(id: string): Promise<Project | null> {
    return this.prisma.project.findUnique({
      where: { id },
    });
  }

  async create(input: CreateProjectInput): Promise<Project> {
    return this.prisma.project.create({
      data: input,
    });
  }

  async update(id: string, input: UpdateProjectInput): Promise<Project> {
    return this.prisma.project.update({
      where: { id },
      data: input,
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.project.delete({
      where: { id },
    });
  }
}
