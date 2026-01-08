/**
 * EmbeddingService - Placeholder for embedding generation
 *
 * This service will integrate with an embedding model (OpenAI, local model, etc.)
 * to generate vector embeddings for semantic search.
 *
 * For now, it returns a mock embedding for development/testing.
 */
export interface IEmbeddingService {
  generateEmbedding(text: string): Promise<number[]>;
}

export class EmbeddingService implements IEmbeddingService {
  private readonly dimensions = 1536; // OpenAI ada-002 dimensions

  /**
   * Generate an embedding for the given text.
   *
   * TODO: Integrate with actual embedding model:
   * - OpenAI text-embedding-ada-002
   * - Sentence Transformers
   * - Other embedding models
   */
  async generateEmbedding(text: string): Promise<number[]> {
    // For development: generate a deterministic mock embedding based on text hash
    // This allows testing the vector search functionality without an API key

    // In production, replace with actual embedding API call:
    // const response = await openai.embeddings.create({
    //   model: "text-embedding-ada-002",
    //   input: text,
    // });
    // return response.data[0].embedding;

    console.warn(
      "EmbeddingService: Using mock embedding. Integrate with actual embedding model for production."
    );

    // Generate deterministic mock embedding
    const hash = this.hashString(text);
    const embedding: number[] = [];

    for (let i = 0; i < this.dimensions; i++) {
      // Use hash to seed pseudo-random values
      const value = Math.sin(hash + i) * 0.5;
      embedding.push(value);
    }

    // Normalize the vector
    const magnitude = Math.sqrt(
      embedding.reduce((sum, val) => sum + val * val, 0)
    );
    return embedding.map((val) => val / magnitude);
  }

  private hashString(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash;
    }
    return hash;
  }
}
