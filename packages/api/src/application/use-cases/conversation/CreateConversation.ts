import {
  Conversation,
  CreateConversationInput,
} from "../../../domain/entities/Conversation.js";
import { IConversationRepository } from "../../../domain/repositories/IConversationRepository.js";
import { IProjectRepository } from "../../../domain/repositories/IProjectRepository.js";
import { AppError } from "../../../shared/errors/AppError.js";

export class CreateConversation {
  constructor(
    private readonly conversationRepository: IConversationRepository,
    private readonly projectRepository: IProjectRepository
  ) {}

  async execute(input: CreateConversationInput): Promise<Conversation> {
    // Verify project exists
    const project = await this.projectRepository.findById(input.projectId);
    if (!project) {
      throw new AppError("Project not found", 404);
    }

    return this.conversationRepository.create(input);
  }
}
