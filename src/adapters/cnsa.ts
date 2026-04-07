// ---------------------------------------------------------------------------
// Moonwatch – CNSA adapter (stub)
// ---------------------------------------------------------------------------
// CNSA (China National Space Administration) has limited English-language
// RSS feeds. English content is typically available at:
//   https://www.cnsa.gov.cn/english/
//
// This adapter is disabled by default. CNSA updates are best handled via:
// 1. Manual curation through the ManualAdapter
// 2. Future HTML scraper targeting cnsa.gov.cn/english/
// 3. Secondary English-language sources (e.g. SpaceNews, NASASpaceflight)
//    that cover CNSA missions such as Chang'e and future crewed lunar plans
// ---------------------------------------------------------------------------

import { BaseAdapter } from "./base-adapter";
import type { AdapterConfig, RawItem } from "./types";

const CNSA_CONFIG: AdapterConfig = {
  id: "cnsa-rss",
  name: "CNSA Updates",
  sourceType: "official-agency",
  reliability: "primary",
  enabled: false, // No reliable English RSS feed available
  endpoints: [],
  pollIntervalMinutes: 0,
  maxItems: 15,
  defaultTags: ["cnsa", "china", "official"],
  defaultEntityIds: ["cnsa"],
};

export class CnsaAdapter extends BaseAdapter {
  constructor(config?: Partial<AdapterConfig>) {
    super({ ...CNSA_CONFIG, ...config });
  }

  async fetchRaw(): Promise<RawItem[]> {
    // CNSA does not provide a usable English-language RSS feed. Returns
    // empty until an HTML scraper or translation integration is implemented.
    return [];
  }

  async healthCheck(): Promise<boolean> {
    // Always returns true since there's nothing to check — the adapter
    // is a no-op stub.
    return true;
  }
}

export const cnsaAdapter = new CnsaAdapter();
