/**
 * Message format for LLM interactions
 */
export interface LLMMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

/**
 * Response from LLM provider
 */
export interface LLMResponse {
  content: string;
  model: string;
  usage?: {
    inputTokens: number;
    outputTokens: number;
  };
}

/**
 * Configuration options for LLM generation
 */
export interface LLMGenerateOptions {
  maxTokens?: number;
  temperature?: number;
}

/**
 * Abstract interface for LLM providers.
 * Allows interchangeability between different LLM backends (Claude, OpenAI, etc.)
 */
export interface ILLMProvider {
  /**
   * Generate a response for the given messages
   */
  generateResponse(
    messages: LLMMessage[],
    options?: LLMGenerateOptions
  ): Promise<LLMResponse>;

  /**
   * Get the name/identifier of the provider
   */
  getProviderName(): string;
}
