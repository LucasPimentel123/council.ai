import { Router } from "express";
import { DocumentController } from "../controllers/DocumentController.js";
import { validateRequest } from "../middleware/validateRequest.js";
import {
  uploadDocumentSchema,
  searchDocumentsSchema,
  documentParamsSchema,
} from "../../dto/DocumentDTO.js";
import { z } from "zod";

const projectDocumentsSchema = z.object({
  params: z.object({
    projectId: z.string().min(1, "Project ID is required"),
  }),
});

export function createDocumentRouter(controller: DocumentController): Router {
  const router = Router();

  router.get(
    "/search",
    validateRequest(searchDocumentsSchema),
    (req, res, next) => controller.search(req, res, next)
  );

  router.delete(
    "/:id",
    validateRequest(documentParamsSchema),
    (req, res, next) => controller.delete(req, res, next)
  );

  return router;
}

export function createProjectDocumentRouter(
  controller: DocumentController
): Router {
  const router = Router({ mergeParams: true });

  router.get(
    "/",
    validateRequest(projectDocumentsSchema),
    (req, res, next) => controller.listByProject(req, res, next)
  );

  router.post(
    "/",
    validateRequest(uploadDocumentSchema),
    (req, res, next) => controller.upload(req, res, next)
  );

  return router;
}
