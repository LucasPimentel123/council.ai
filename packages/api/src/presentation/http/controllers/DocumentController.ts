import { Request, Response, NextFunction } from "express";
import { UploadDocument } from "../../../application/use-cases/document/UploadDocument.js";
import { SearchDocuments } from "../../../application/use-cases/document/SearchDocuments.js";
import { ListDocuments } from "../../../application/use-cases/document/ListDocuments.js";
import { DeleteDocument } from "../../../application/use-cases/document/DeleteDocument.js";

export class DocumentController {
  constructor(
    private readonly uploadDocument: UploadDocument,
    private readonly searchDocuments: SearchDocuments,
    private readonly listDocuments: ListDocuments,
    private readonly deleteDocument: DeleteDocument
  ) {}

  async upload(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const document = await this.uploadDocument.execute({
        ...req.body,
        projectId: req.params.projectId,
      });
      res.status(201).json({ data: document });
    } catch (error) {
      next(error);
    }
  }

  async search(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { q, limit, projectId } = req.query;
      const results = await this.searchDocuments.execute(
        q as string,
        limit ? parseInt(limit as string) : 10,
        projectId as string | undefined
      );
      res.json({ data: results });
    } catch (error) {
      next(error);
    }
  }

  async listByProject(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const documents = await this.listDocuments.execute(req.params.projectId);
      res.json({ data: documents });
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      await this.deleteDocument.execute(req.params.id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}
