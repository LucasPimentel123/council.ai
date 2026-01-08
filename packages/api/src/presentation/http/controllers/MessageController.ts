import { Request, Response, NextFunction } from "express";
import { CreateMessage } from "../../../application/use-cases/message/CreateMessage.js";
import { SearchMessages } from "../../../application/use-cases/message/SearchMessages.js";
import { ListMessages } from "../../../application/use-cases/message/ListMessages.js";

export class MessageController {
  constructor(
    private readonly createMessage: CreateMessage,
    private readonly searchMessages: SearchMessages,
    private readonly listMessages: ListMessages
  ) {}

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const message = await this.createMessage.execute({
        ...req.body,
        conversationId: req.params.conversationId,
      });
      res.status(201).json({ data: message });
    } catch (error) {
      next(error);
    }
  }

  async search(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { q, limit, projectId } = req.query;
      const results = await this.searchMessages.execute(
        q as string,
        limit ? parseInt(limit as string) : 10,
        projectId as string | undefined
      );
      res.json({ data: results });
    } catch (error) {
      next(error);
    }
  }

  async list(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const messages = await this.listMessages.execute(
        req.params.conversationId
      );
      res.json({ data: messages });
    } catch (error) {
      next(error);
    }
  }
}
