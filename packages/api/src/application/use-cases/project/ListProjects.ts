import { Project } from "../../../domain/entities/Project.js";
import { IProjectRepository } from "../../../domain/repositories/IProjectRepository.js";

export class ListProjects {
  constructor(private readonly projectRepository: IProjectRepository) {}

  async execute(): Promise<Project[]> {
    return this.projectRepository.findAll();
  }
}
