import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";
import { AppError } from "../../../shared/errors/AppError.js";

export function validateRequest(schema: ZodSchema) {
  return (req: Request, _res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error: any) {
      const message =
        error.errors?.map((e: any) => e.message).join(", ") ||
        "Validation failed";
      next(new AppError(message, 400));
    }
  };
}
