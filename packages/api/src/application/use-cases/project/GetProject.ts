import { Project } from "../../../domain/entities/Project.js";
import { IProjectRepository } from "../../../domain/repositories/IProjectRepository.js";
import { AppError } from "../../../shared/errors/AppError.js";

export class GetProject {
  constructor(private readonly projectRepository: IProjectRepository) {}

  async execute(id: string): Promise<Project> {
    const project = await this.projectRepository.findById(id);

    if (!project) {
      throw new AppError("Project not found", 404);
    }

    return project;
  }
}
