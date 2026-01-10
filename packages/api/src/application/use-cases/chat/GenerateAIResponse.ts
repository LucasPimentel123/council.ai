import {
  ILLMProvider,
  LLMMessage,
  LLMGenerateOptions,
} from "../../../domain/providers/ILLMProvider.js";
import { IExpertDomainRepository } from "../../../domain/repositories/IExpertDomainRepository.js";
import { DomainId } from "../../../domain/entities/ExpertDomain.js";
import { AppError } from "../../../shared/errors/AppError.js";

export interface GenerateAIResponseInput {
  message: string;
  domainId: DomainId;
  options?: LLMGenerateOptions;
}

export interface GenerateAIResponseOutput {
  response: string;
  model: string;
  usage?: {
    inputTokens: number;
    outputTokens: number;
  };
}

/**
 * Use case for generating AI responses with domain-specific context.
 * V2: Includes system prompt based on expert domain.
 */
export class GenerateAIResponse {
  constructor(
    private readonly llmProvider: ILLMProvider,
    private readonly expertDomainRepository: IExpertDomainRepository
  ) {}

  async execute(
    input: GenerateAIResponseInput
  ): Promise<GenerateAIResponseOutput> {
    // Validate input
    if (!input.message || input.message.trim().length === 0) {
      throw new AppError("Message content is required", 400);
    }

    // Fetch domain configuration
    const domain = await this.expertDomainRepository.findById(input.domainId);
    if (!domain) {
      throw new AppError(`Unknown domain: ${input.domainId}`, 400);
    }

    // Build messages array with system prompt
    const messages: LLMMessage[] = [
      {
        role: "system",
        content: domain.systemPrompt,
      },
      {
        role: "user",
        content: input.message.trim(),
      },
    ];

    try {
      // Generate response from LLM
      const response = await this.llmProvider.generateResponse(
        messages,
        input.options
      );

      return {
        response: response.content,
        model: response.model,
        usage: response.usage,
      };
    } catch (error) {
      // Handle LangChain/API errors gracefully
      if (error instanceof Error) {
        // Check for common API errors
        if (
          error.message.includes("authentication") ||
          error.message.includes("API key")
        ) {
          throw new AppError("LLM authentication failed", 500);
        }
        if (error.message.includes("rate limit")) {
          throw new AppError(
            "Rate limit exceeded. Please try again later.",
            429
          );
        }
        if (
          error.message.includes("context length") ||
          error.message.includes("too long")
        ) {
          throw new AppError("Message too long for model context", 400);
        }
      }

      // Re-throw AppError as-is
      if (error instanceof AppError) {
        throw error;
      }

      // Generic error handling
      console.error("LLM Provider Error:", error);
      throw new AppError("Failed to generate AI response", 500);
    }
  }
}
