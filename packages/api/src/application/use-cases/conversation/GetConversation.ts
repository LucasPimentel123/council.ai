import { Conversation } from "../../../domain/entities/Conversation.js";
import { Message } from "../../../domain/entities/Message.js";
import { IConversationRepository } from "../../../domain/repositories/IConversationRepository.js";
import { IMessageRepository } from "../../../domain/repositories/IMessageRepository.js";
import { AppError } from "../../../shared/errors/AppError.js";

export interface ConversationWithMessages extends Conversation {
  messages: Message[];
}

export class GetConversation {
  constructor(
    private readonly conversationRepository: IConversationRepository,
    private readonly messageRepository: IMessageRepository
  ) {}

  async execute(id: string): Promise<ConversationWithMessages> {
    const conversation = await this.conversationRepository.findById(id);

    if (!conversation) {
      throw new AppError("Conversation not found", 404);
    }

    const messages = await this.messageRepository.findByConversationId(id);

    return {
      ...conversation,
      messages,
    };
  }
}
