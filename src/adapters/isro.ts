// ---------------------------------------------------------------------------
// Moonwatch – ISRO adapter (stub)
// ---------------------------------------------------------------------------
// ISRO does not publish a robust public RSS feed for press releases or
// mission updates. Their website (isro.gov.in) is the primary source of
// English-language content but requires HTML scraping.
//
// This adapter is disabled by default. ISRO updates are best handled via:
// 1. Manual curation through the ManualAdapter
// 2. Future HTML scraper targeting https://www.isro.gov.in/media_isro/
// 3. Secondary news sources that cover ISRO missions
// ---------------------------------------------------------------------------

import { BaseAdapter } from "./base-adapter";
import type { AdapterConfig, RawItem } from "./types";

const ISRO_CONFIG: AdapterConfig = {
  id: "isro-rss",
  name: "ISRO Updates",
  sourceType: "official-agency",
  reliability: "primary",
  enabled: false, // No reliable RSS feed available
  endpoints: [],
  pollIntervalMinutes: 0,
  maxItems: 15,
  defaultTags: ["isro", "india", "official"],
  defaultEntityIds: ["isro"],
};

export class IsroAdapter extends BaseAdapter {
  constructor(config?: Partial<AdapterConfig>) {
    super({ ...ISRO_CONFIG, ...config });
  }

  async fetchRaw(): Promise<RawItem[]> {
    // ISRO does not provide a usable RSS feed. Returns empty until an
    // HTML scraper or API integration is implemented.
    return [];
  }

  async healthCheck(): Promise<boolean> {
    // Always returns true since there's nothing to check — the adapter
    // is a no-op stub.
    return true;
  }
}

export const isroAdapter = new IsroAdapter();
