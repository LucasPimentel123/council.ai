export type DocumentType = "text" | "spreadsheet" | "image";

export interface ContextDocument {
  id: string;
  name: string;
  type: DocumentType;
  size: string;
  content: string | null;
  domainId: string;
  projectId: string;
  embedding?: number[] | null;
  uploadedAt: Date;
}

export interface CreateDocumentInput {
  name: string;
  type: DocumentType;
  size: string;
  content?: string;
  domainId: string;
  projectId: string;
  embedding?: number[];
}
