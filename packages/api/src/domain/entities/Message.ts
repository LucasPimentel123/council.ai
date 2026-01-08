export type MessageRole = "user" | "agent";

export interface Message {
  id: string;
  conversationId: string;
  role: MessageRole;
  content: string;
  embedding?: number[] | null;
  createdAt: Date;
}

export interface CreateMessageInput {
  conversationId: string;
  role: MessageRole;
  content: string;
  embedding?: number[];
}
