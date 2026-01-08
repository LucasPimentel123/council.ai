export interface Project {
  id: string;
  name: string;
  description?: string;
  createdAt: Date;
}

export type DomainType = 'marketing' | 'business' | 'finance' | 'product' | 'legal';

export interface Domain {
  id: DomainType;
  name: string;
  description: string;
  icon: string;
  agentName: string;
  agentRole: string;
}

export interface Conversation {
  id: string;
  title: string;
  domainId: DomainType;
  projectId: string;
  lastMessage?: string;
  updatedAt: Date;
  createdAt: Date;
}

export interface Message {
  id: string;
  conversationId: string;
  role: 'user' | 'agent';
  content: string;
  createdAt: Date;
}

export interface ContextDocument {
  id: string;
  name: string;
  type: 'text' | 'spreadsheet' | 'image';
  size: string;
  domainId: DomainType;
  projectId: string;
  uploadedAt: Date;
}
