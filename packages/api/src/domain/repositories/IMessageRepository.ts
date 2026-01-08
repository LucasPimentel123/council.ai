import { Message, CreateMessageInput } from "../entities/Message.js";

export interface SimilarMessageResult {
  message: Message;
  similarity: number;
}

export interface IMessageRepository {
  findById(id: string): Promise<Message | null>;
  findByConversationId(conversationId: string): Promise<Message[]>;
  create(input: CreateMessageInput): Promise<Message>;
  updateEmbedding(id: string, embedding: number[]): Promise<void>;
  findSimilar(
    embedding: number[],
    limit: number,
    projectId?: string
  ): Promise<SimilarMessageResult[]>;
  delete(id: string): Promise<void>;
}
