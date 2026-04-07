// ---------------------------------------------------------------------------
// Moonwatch – base adapter class
// ---------------------------------------------------------------------------
// Abstract base class that handles common adapter logic: error wrapping,
// item limiting, and default health-check behaviour. Concrete adapters
// extend this and implement fetchRaw().
// ---------------------------------------------------------------------------

import type { Adapter, AdapterConfig, FetchResult, RawItem } from "./types";

export abstract class BaseAdapter implements Adapter {
  config: AdapterConfig;

  constructor(config: AdapterConfig) {
    this.config = config;
  }

  /** Subclasses implement this to return raw items from their source. */
  abstract fetchRaw(): Promise<RawItem[]>;

  async fetch(): Promise<FetchResult> {
    const fetchedAt = new Date().toISOString();
    try {
      const items = await this.fetchRaw();
      const limited = items.slice(0, this.config.maxItems);
      return {
        items: limited,
        fetchedAt,
        sourceId: this.config.id,
        success: true,
        itemCount: limited.length,
      };
    } catch (error) {
      return {
        items: [],
        fetchedAt,
        sourceId: this.config.id,
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
        itemCount: 0,
      };
    }
  }

  async healthCheck(): Promise<boolean> {
    try {
      const result = await this.fetch();
      return result.success;
    } catch {
      return false;
    }
  }
}
