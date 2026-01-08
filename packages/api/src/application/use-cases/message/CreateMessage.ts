import { Message, CreateMessageInput } from "../../../domain/entities/Message.js";
import { IMessageRepository } from "../../../domain/repositories/IMessageRepository.js";
import { IConversationRepository } from "../../../domain/repositories/IConversationRepository.js";
import { IEmbeddingService } from "../../services/EmbeddingService.js";
import { AppError } from "../../../shared/errors/AppError.js";

export class CreateMessage {
  constructor(
    private readonly messageRepository: IMessageRepository,
    private readonly conversationRepository: IConversationRepository,
    private readonly embeddingService: IEmbeddingService
  ) {}

  async execute(
    input: Omit<CreateMessageInput, "embedding">,
    generateEmbedding = true
  ): Promise<Message> {
    // Verify conversation exists
    const conversation = await this.conversationRepository.findById(
      input.conversationId
    );
    if (!conversation) {
      throw new AppError("Conversation not found", 404);
    }

    let embedding: number[] | undefined;
    if (generateEmbedding) {
      embedding = await this.embeddingService.generateEmbedding(input.content);
    }

    return this.messageRepository.create({
      ...input,
      embedding,
    });
  }
}
