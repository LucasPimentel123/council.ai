import { Project, CreateProjectInput } from "../../../domain/entities/Project.js";
import { IProjectRepository } from "../../../domain/repositories/IProjectRepository.js";

export class CreateProject {
  constructor(private readonly projectRepository: IProjectRepository) {}

  async execute(input: CreateProjectInput): Promise<Project> {
    return this.projectRepository.create(input);
  }
}
