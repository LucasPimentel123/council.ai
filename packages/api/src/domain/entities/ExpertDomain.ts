/**
 * Valid domain identifiers for expert domains.
 */
export type DomainId =
  | "marketing"
  | "business"
  | "finance"
  | "product"
  | "legal";

/**
 * Represents an expert domain with its configuration and system prompt.
 * This is a core domain entity that defines each AI advisor's identity and expertise.
 */
export interface ExpertDomain {
  id: DomainId;
  name: string;
  description: string;
  agentName: string;
  agentRole: string;
  systemPrompt: string;
}
