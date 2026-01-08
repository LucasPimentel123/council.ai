import { z } from "zod";

export const createMessageSchema = z.object({
  body: z.object({
    role: z.enum(["user", "agent"]),
    content: z.string().min(1, "Content is required"),
  }),
  params: z.object({
    conversationId: z.string().min(1, "Conversation ID is required"),
  }),
});

export const searchMessagesSchema = z.object({
  query: z.object({
    q: z.string().min(1, "Search query is required"),
    limit: z.string().optional(),
    projectId: z.string().optional(),
  }),
});

export type CreateMessageDTO = z.infer<typeof createMessageSchema>["body"];
