import { ContextDocument } from "../../../domain/entities/ContextDocument.js";
import { IContextDocumentRepository } from "../../../domain/repositories/IContextDocumentRepository.js";

export class ListDocuments {
  constructor(private readonly documentRepository: IContextDocumentRepository) {}

  async execute(projectId?: string): Promise<ContextDocument[]> {
    if (projectId) {
      return this.documentRepository.findByProjectId(projectId);
    }
    return this.documentRepository.findAll();
  }
}
