import {
  ContextDocument,
  CreateDocumentInput,
} from "../entities/ContextDocument.js";

export interface SimilarDocumentResult {
  document: ContextDocument;
  similarity: number;
}

export interface IContextDocumentRepository {
  findAll(): Promise<ContextDocument[]>;
  findById(id: string): Promise<ContextDocument | null>;
  findByProjectId(projectId: string): Promise<ContextDocument[]>;
  findByDomainId(domainId: string): Promise<ContextDocument[]>;
  create(input: CreateDocumentInput): Promise<ContextDocument>;
  updateEmbedding(id: string, embedding: number[]): Promise<void>;
  findSimilar(
    embedding: number[],
    limit: number,
    projectId?: string
  ): Promise<SimilarDocumentResult[]>;
  delete(id: string): Promise<void>;
}
