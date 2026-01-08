import { SimilarMessageResult } from "../../../domain/repositories/IMessageRepository.js";
import { IMessageRepository } from "../../../domain/repositories/IMessageRepository.js";
import { IEmbeddingService } from "../../services/EmbeddingService.js";

export class SearchMessages {
  constructor(
    private readonly messageRepository: IMessageRepository,
    private readonly embeddingService: IEmbeddingService
  ) {}

  async execute(
    query: string,
    limit = 10,
    projectId?: string
  ): Promise<SimilarMessageResult[]> {
    const embedding = await this.embeddingService.generateEmbedding(query);
    return this.messageRepository.findSimilar(embedding, limit, projectId);
  }
}
