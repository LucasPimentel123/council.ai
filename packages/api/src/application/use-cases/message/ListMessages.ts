import { Message } from "../../../domain/entities/Message.js";
import { IMessageRepository } from "../../../domain/repositories/IMessageRepository.js";

export class ListMessages {
  constructor(private readonly messageRepository: IMessageRepository) {}

  async execute(conversationId: string): Promise<Message[]> {
    return this.messageRepository.findByConversationId(conversationId);
  }
}
