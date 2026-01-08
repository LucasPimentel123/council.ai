import { Router } from "express";
import { MessageController } from "../controllers/MessageController.js";
import { validateRequest } from "../middleware/validateRequest.js";
import { createMessageSchema, searchMessagesSchema } from "../../dto/MessageDTO.js";

export function createMessageRouter(controller: MessageController): Router {
  const router = Router();

  router.get(
    "/search",
    validateRequest(searchMessagesSchema),
    (req, res, next) => controller.search(req, res, next)
  );

  return router;
}

export function createConversationMessageRouter(
  controller: MessageController
): Router {
  const router = Router({ mergeParams: true });

  router.post(
    "/",
    validateRequest(createMessageSchema),
    (req, res, next) => controller.create(req, res, next)
  );

  return router;
}
