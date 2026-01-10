import { Router } from "express";
import { ChatController } from "../controllers/ChatController.js";
import { validateRequest } from "../middleware/validateRequest.js";
import { generateResponseSchema } from "../../dto/ChatDTO.js";

export function createChatRouter(controller: ChatController): Router {
  const router = Router();

  router.post(
    "/generate",
    validateRequest(generateResponseSchema),
    (req, res, next) => controller.generate(req, res, next)
  );

  return router;
}
