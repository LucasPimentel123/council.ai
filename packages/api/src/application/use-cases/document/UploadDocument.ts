import {
  ContextDocument,
  CreateDocumentInput,
} from "../../../domain/entities/ContextDocument.js";
import { IContextDocumentRepository } from "../../../domain/repositories/IContextDocumentRepository.js";
import { IProjectRepository } from "../../../domain/repositories/IProjectRepository.js";
import { IEmbeddingService } from "../../services/EmbeddingService.js";
import { AppError } from "../../../shared/errors/AppError.js";

export class UploadDocument {
  constructor(
    private readonly documentRepository: IContextDocumentRepository,
    private readonly projectRepository: IProjectRepository,
    private readonly embeddingService: IEmbeddingService
  ) {}

  async execute(
    input: Omit<CreateDocumentInput, "embedding">,
    generateEmbedding = true
  ): Promise<ContextDocument> {
    // Verify project exists
    const project = await this.projectRepository.findById(input.projectId);
    if (!project) {
      throw new AppError("Project not found", 404);
    }

    let embedding: number[] | undefined;
    if (generateEmbedding && input.content) {
      embedding = await this.embeddingService.generateEmbedding(input.content);
    }

    return this.documentRepository.create({
      ...input,
      embedding,
    });
  }
}
