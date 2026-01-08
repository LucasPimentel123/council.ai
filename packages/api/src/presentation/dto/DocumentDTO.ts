import { z } from "zod";

export const uploadDocumentSchema = z.object({
  body: z.object({
    name: z.string().min(1, "Name is required"),
    type: z.enum(["text", "spreadsheet", "image"]),
    size: z.string().min(1, "Size is required"),
    content: z.string().optional(),
    domainId: z.string().min(1, "Domain ID is required"),
  }),
  params: z.object({
    projectId: z.string().min(1, "Project ID is required"),
  }),
});

export const searchDocumentsSchema = z.object({
  query: z.object({
    q: z.string().min(1, "Search query is required"),
    limit: z.string().optional(),
    projectId: z.string().optional(),
  }),
});

export const documentParamsSchema = z.object({
  params: z.object({
    id: z.string().min(1, "Document ID is required"),
  }),
});

export type UploadDocumentDTO = z.infer<typeof uploadDocumentSchema>["body"];
