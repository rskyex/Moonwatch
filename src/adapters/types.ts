// ---------------------------------------------------------------------------
// Moonwatch – adapter interface types
// ---------------------------------------------------------------------------

import type { SourceType, ReliabilityTier } from "@/types";

/** Raw item returned by any external source adapter */
export interface RawItem {
  externalId: string;
  title: string;
  content: string;
  summary?: string;
  date: string;
  url: string;
  author?: string;
  categories?: string[];
  raw: Record<string, unknown>;
}

/** Result of a single adapter fetch operation */
export interface FetchResult {
  items: RawItem[];
  fetchedAt: string;
  sourceId: string;
  success: boolean;
  error?: string;
  itemCount: number;
}

/** Configuration for a source adapter */
export interface AdapterConfig {
  id: string;
  name: string;
  sourceType: SourceType;
  reliability: ReliabilityTier;
  enabled: boolean;
  /** Feed URLs or API endpoints */
  endpoints: string[];
  /** How often to poll (in minutes). 0 = manual only */
  pollIntervalMinutes: number;
  /** Maximum number of items to fetch per poll */
  maxItems: number;
  /** Tags automatically applied to items from this source */
  defaultTags: string[];
  /** Entity IDs to auto-associate */
  defaultEntityIds: string[];
}

/** Contract every source adapter must satisfy */
export interface Adapter {
  config: AdapterConfig;
  /** Fetch raw items from the external source */
  fetch(): Promise<FetchResult>;
  /** Validate that the source is reachable */
  healthCheck(): Promise<boolean>;
}
