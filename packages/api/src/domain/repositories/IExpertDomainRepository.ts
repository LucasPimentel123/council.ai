import { ExpertDomain, DomainId } from "../entities/ExpertDomain.js";

/**
 * Repository interface for accessing expert domain configurations.
 * Follows the repository pattern for domain data access abstraction.
 */
export interface IExpertDomainRepository {
  /**
   * Find an expert domain by its ID
   */
  findById(id: DomainId): Promise<ExpertDomain | null>;

  /**
   * Get all available expert domains
   */
  findAll(): Promise<ExpertDomain[]>;
}
