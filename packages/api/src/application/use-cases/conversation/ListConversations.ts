import { Conversation } from "../../../domain/entities/Conversation.js";
import { IConversationRepository } from "../../../domain/repositories/IConversationRepository.js";

export class ListConversations {
  constructor(private readonly conversationRepository: IConversationRepository) {}

  async execute(projectId?: string): Promise<Conversation[]> {
    if (projectId) {
      return this.conversationRepository.findByProjectId(projectId);
    }
    return this.conversationRepository.findAll();
  }
}
