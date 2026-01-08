import { SimilarDocumentResult } from "../../../domain/repositories/IContextDocumentRepository.js";
import { IContextDocumentRepository } from "../../../domain/repositories/IContextDocumentRepository.js";
import { IEmbeddingService } from "../../services/EmbeddingService.js";

export class SearchDocuments {
  constructor(
    private readonly documentRepository: IContextDocumentRepository,
    private readonly embeddingService: IEmbeddingService
  ) {}

  async execute(
    query: string,
    limit = 10,
    projectId?: string
  ): Promise<SimilarDocumentResult[]> {
    const embedding = await this.embeddingService.generateEmbedding(query);
    return this.documentRepository.findSimilar(embedding, limit, projectId);
  }
}
