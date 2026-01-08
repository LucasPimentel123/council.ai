import { Router } from "express";
import { ConversationController } from "../controllers/ConversationController.js";
import { validateRequest } from "../middleware/validateRequest.js";
import {
  createConversationSchema,
  conversationParamsSchema,
} from "../../dto/ConversationDTO.js";
import { z } from "zod";

const projectConversationsSchema = z.object({
  params: z.object({
    projectId: z.string().min(1, "Project ID is required"),
  }),
});

export function createConversationRouter(
  controller: ConversationController
): Router {
  const router = Router();

  // Standalone conversation routes
  router.get(
    "/:id",
    validateRequest(conversationParamsSchema),
    (req, res, next) => controller.get(req, res, next)
  );

  return router;
}

export function createProjectConversationRouter(
  controller: ConversationController
): Router {
  const router = Router({ mergeParams: true });

  router.get(
    "/",
    validateRequest(projectConversationsSchema),
    (req, res, next) => controller.listByProject(req, res, next)
  );

  router.post(
    "/",
    validateRequest(createConversationSchema),
    (req, res, next) => controller.create(req, res, next)
  );

  return router;
}
