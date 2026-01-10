import { z } from "zod";

const domainIdSchema = z.enum([
  "marketing",
  "business",
  "finance",
  "product",
  "legal",
]);

export const generateResponseSchema = z.object({
  body: z.object({
    message: z.string().min(1, "Message is required"),
    domainId: domainIdSchema,
    options: z
      .object({
        maxTokens: z.number().int().positive().optional(),
        temperature: z.number().min(0).max(1).optional(),
      })
      .optional(),
  }),
});

export type GenerateResponseDTO = z.infer<
  typeof generateResponseSchema
>["body"];
