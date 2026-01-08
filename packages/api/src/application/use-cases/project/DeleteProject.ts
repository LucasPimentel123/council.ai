import { IProjectRepository } from "../../../domain/repositories/IProjectRepository.js";
import { AppError } from "../../../shared/errors/AppError.js";

export class DeleteProject {
  constructor(private readonly projectRepository: IProjectRepository) {}

  async execute(id: string): Promise<void> {
    const project = await this.projectRepository.findById(id);

    if (!project) {
      throw new AppError("Project not found", 404);
    }

    await this.projectRepository.delete(id);
  }
}
