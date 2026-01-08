import {
  Conversation,
  CreateConversationInput,
  UpdateConversationInput,
} from "../entities/Conversation.js";

export interface IConversationRepository {
  findAll(): Promise<Conversation[]>;
  findById(id: string): Promise<Conversation | null>;
  findByProjectId(projectId: string): Promise<Conversation[]>;
  findByDomainId(domainId: string): Promise<Conversation[]>;
  create(input: CreateConversationInput): Promise<Conversation>;
  update(id: string, input: UpdateConversationInput): Promise<Conversation>;
  delete(id: string): Promise<void>;
}
