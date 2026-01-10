import { Request, Response, NextFunction } from "express";
import { GenerateAIResponse } from "../../../application/use-cases/chat/GenerateAIResponse.js";

export class ChatController {
  constructor(private readonly generateAIResponse: GenerateAIResponse) {}

  async generate(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { message, domainId, options } = req.body;

      const result = await this.generateAIResponse.execute({
        message,
        domainId,
        options,
      });

      res.status(200).json({
        data: {
          response: result.response,
          model: result.model,
          usage: result.usage,
        },
      });
    } catch (error) {
      next(error);
    }
  }
}
