import { Router } from "express";
import { ProjectController } from "../controllers/ProjectController.js";
import { validateRequest } from "../middleware/validateRequest.js";
import {
  createProjectSchema,
  projectParamsSchema,
} from "../../dto/ProjectDTO.js";

export function createProjectRouter(controller: ProjectController): Router {
  const router = Router();

  router.get("/", (req, res, next) => controller.list(req, res, next));

  router.get(
    "/:id",
    validateRequest(projectParamsSchema),
    (req, res, next) => controller.get(req, res, next)
  );

  router.post(
    "/",
    validateRequest(createProjectSchema),
    (req, res, next) => controller.create(req, res, next)
  );

  router.delete(
    "/:id",
    validateRequest(projectParamsSchema),
    (req, res, next) => controller.delete(req, res, next)
  );

  return router;
}
