import { Request, Response, NextFunction } from "express";
import { AppError } from "../../../shared/errors/AppError.js";

export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  console.error("Error:", err);

  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      status: "error",
      message: err.message,
    });
    return;
  }

  // Prisma errors
  if (err.name === "PrismaClientKnownRequestError") {
    res.status(400).json({
      status: "error",
      message: "Database operation failed",
    });
    return;
  }

  // Default error
  res.status(500).json({
    status: "error",
    message:
      process.env.NODE_ENV === "production"
        ? "Internal server error"
        : err.message,
  });
}
