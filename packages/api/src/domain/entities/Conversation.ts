export interface Conversation {
  id: string;
  title: string;
  domainId: string;
  projectId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateConversationInput {
  title: string;
  domainId: string;
  projectId: string;
}

export interface UpdateConversationInput {
  title?: string;
}
