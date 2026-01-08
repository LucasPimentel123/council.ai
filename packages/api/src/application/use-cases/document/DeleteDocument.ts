import { IContextDocumentRepository } from "../../../domain/repositories/IContextDocumentRepository.js";
import { AppError } from "../../../shared/errors/AppError.js";

export class DeleteDocument {
  constructor(private readonly documentRepository: IContextDocumentRepository) {}

  async execute(id: string): Promise<void> {
    const document = await this.documentRepository.findById(id);

    if (!document) {
      throw new AppError("Document not found", 404);
    }

    await this.documentRepository.delete(id);
  }
}
