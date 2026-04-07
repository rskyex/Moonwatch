// ---------------------------------------------------------------------------
// Moonwatch – manual curation adapter
// ---------------------------------------------------------------------------
// Wraps manually authored entries (from src/data/manual-entries.ts) in the
// standard RawItem format so they flow through the same normalization
// pipeline as external sources.
//
// To add a manual entry:
// 1. Add an entry to src/data/manual-entries.ts
// 2. Run the ingestion pipeline
// 3. The entry will be normalized and merged with other sources
// ---------------------------------------------------------------------------

import { BaseAdapter } from "./base-adapter";
import type { AdapterConfig, RawItem } from "./types";

const MANUAL_CONFIG: AdapterConfig = {
  id: "manual-curation",
  name: "Manual Curation",
  sourceType: "manual-curation",
  reliability: "primary",
  enabled: true,
  endpoints: [],
  pollIntervalMinutes: 0, // manual only
  maxItems: 100,
  defaultTags: ["curated"],
  defaultEntityIds: [],
};

export class ManualAdapter extends BaseAdapter {
  private entries: RawItem[];

  constructor(entries: RawItem[] = [], config?: Partial<AdapterConfig>) {
    super({ ...MANUAL_CONFIG, ...config });
    this.entries = entries;
  }

  async fetchRaw(): Promise<RawItem[]> {
    return this.entries;
  }

  async healthCheck(): Promise<boolean> {
    return true; // Always healthy — local data
  }
}
