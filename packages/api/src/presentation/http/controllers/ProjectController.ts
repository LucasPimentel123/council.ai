import { Request, Response, NextFunction } from "express";
import { CreateProject } from "../../../application/use-cases/project/CreateProject.js";
import { GetProject } from "../../../application/use-cases/project/GetProject.js";
import { ListProjects } from "../../../application/use-cases/project/ListProjects.js";
import { DeleteProject } from "../../../application/use-cases/project/DeleteProject.js";

export class ProjectController {
  constructor(
    private readonly createProject: CreateProject,
    private readonly getProject: GetProject,
    private readonly listProjects: ListProjects,
    private readonly deleteProject: DeleteProject
  ) {}

  async list(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const projects = await this.listProjects.execute();
      res.json({ data: projects });
    } catch (error) {
      next(error);
    }
  }

  async get(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const project = await this.getProject.execute(req.params.id);
      res.json({ data: project });
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const project = await this.createProject.execute(req.body);
      res.status(201).json({ data: project });
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      await this.deleteProject.execute(req.params.id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}
