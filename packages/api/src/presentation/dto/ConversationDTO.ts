import { z } from "zod";

export const createConversationSchema = z.object({
  body: z.object({
    title: z.string().min(1, "Title is required"),
    domainId: z.string().min(1, "Domain ID is required"),
  }),
  params: z.object({
    projectId: z.string().min(1, "Project ID is required"),
  }),
});

export const conversationParamsSchema = z.object({
  params: z.object({
    id: z.string().min(1, "Conversation ID is required"),
  }),
});

export type CreateConversationDTO = z.infer<
  typeof createConversationSchema
>["body"];
