import { ChatAnthropic } from "@langchain/anthropic";
import {
  HumanMessage,
  AIMessage,
  SystemMessage,
} from "@langchain/core/messages";
import {
  ILLMProvider,
  LLMMessage,
  LLMResponse,
  LLMGenerateOptions,
} from "../../domain/providers/ILLMProvider.js";

/**
 * LangChain-based implementation of ILLMProvider using Claude
 */
export class LangChainClaudeProvider implements ILLMProvider {
  private readonly model: ChatAnthropic;
  private readonly modelId: string;

  constructor(apiKey: string, modelId: string = "claude-opus-4-5-20251101") {
    this.modelId = modelId;
    this.model = new ChatAnthropic({
      anthropicApiKey: apiKey,
      modelName: modelId,
    });
  }

  async generateResponse(
    messages: LLMMessage[],
    options?: LLMGenerateOptions
  ): Promise<LLMResponse> {
    // Convert our generic message format to LangChain message format
    const langChainMessages = messages.map((msg) => {
      switch (msg.role) {
        case "user":
          return new HumanMessage(msg.content);
        case "assistant":
          return new AIMessage(msg.content);
        case "system":
          return new SystemMessage(msg.content);
        default:
          return new HumanMessage(msg.content);
      }
    });

    // Configure generation options
    const invokeOptions: Record<string, unknown> = {};
    if (options?.maxTokens) {
      invokeOptions.maxTokens = options.maxTokens;
    }
    if (options?.temperature !== undefined) {
      invokeOptions.temperature = options.temperature;
    }

    // Invoke the model
    const response = await this.model.invoke(langChainMessages, invokeOptions);

    // Extract content (handle string or complex content array)
    let content: string;
    if (typeof response.content === "string") {
      content = response.content;
    } else if (Array.isArray(response.content)) {
      // Handle content blocks (text, tool_use, etc.)
      content = response.content
        .filter(
          (block): block is { type: "text"; text: string } =>
            typeof block === "object" &&
            block !== null &&
            "type" in block &&
            block.type === "text"
        )
        .map((block) => block.text)
        .join("");
    } else {
      content = String(response.content);
    }

    // Extract usage metadata if available
    const usage = response.usage_metadata
      ? {
          inputTokens: response.usage_metadata.input_tokens,
          outputTokens: response.usage_metadata.output_tokens,
        }
      : undefined;

    return {
      content,
      model: this.modelId,
      usage,
    };
  }

  getProviderName(): string {
    return `langchain-claude:${this.modelId}`;
  }
}
