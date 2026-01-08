import { Request, Response, NextFunction } from "express";
import { CreateConversation } from "../../../application/use-cases/conversation/CreateConversation.js";
import { GetConversation } from "../../../application/use-cases/conversation/GetConversation.js";
import { ListConversations } from "../../../application/use-cases/conversation/ListConversations.js";

export class ConversationController {
  constructor(
    private readonly createConversation: CreateConversation,
    private readonly getConversation: GetConversation,
    private readonly listConversations: ListConversations
  ) {}

  async listByProject(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const conversations = await this.listConversations.execute(
        req.params.projectId
      );
      res.json({ data: conversations });
    } catch (error) {
      next(error);
    }
  }

  async get(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const conversation = await this.getConversation.execute(req.params.id);
      res.json({ data: conversation });
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const conversation = await this.createConversation.execute({
        ...req.body,
        projectId: req.params.projectId,
      });
      res.status(201).json({ data: conversation });
    } catch (error) {
      next(error);
    }
  }
}
