import { z } from "zod";

export const createProjectSchema = z.object({
  body: z.object({
    name: z.string().min(1, "Name is required"),
    description: z.string().optional(),
  }),
});

export const projectParamsSchema = z.object({
  params: z.object({
    id: z.string().min(1, "Project ID is required"),
  }),
});

export type CreateProjectDTO = z.infer<typeof createProjectSchema>["body"];
