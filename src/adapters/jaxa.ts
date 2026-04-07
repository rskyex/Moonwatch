// ---------------------------------------------------------------------------
// Moonwatch – JAXA RSS adapter
// ---------------------------------------------------------------------------
// Fetches press releases from JAXA's public RSS feed.
//
// NOTE: JAXA's English-language RSS availability is limited. The feed below
// covers Japanese press releases (press_j.xml). A future enhancement may
// need HTML scraping of https://global.jaxa.jp/press/ for English content,
// or integration with a translation layer.
// ---------------------------------------------------------------------------

import { BaseAdapter } from "./base-adapter";
import { fetchRssFeed } from "./rss-parser";
import type { AdapterConfig, RawItem } from "./types";

const JAXA_CONFIG: AdapterConfig = {
  id: "jaxa-rss",
  name: "JAXA Press Releases",
  sourceType: "official-agency",
  reliability: "primary",
  enabled: true,
  endpoints: ["https://global.jaxa.jp/rss/press_j.xml"],
  pollIntervalMinutes: 180,
  maxItems: 15,
  defaultTags: ["jaxa", "japan", "official"],
  defaultEntityIds: ["jaxa"],
};

export class JaxaAdapter extends BaseAdapter {
  constructor(config?: Partial<AdapterConfig>) {
    super({ ...JAXA_CONFIG, ...config });
  }

  async fetchRaw(): Promise<RawItem[]> {
    const allItems: RawItem[] = [];

    for (const endpoint of this.config.endpoints) {
      try {
        const items = await fetchRssFeed(endpoint, this.config.maxItems);
        allItems.push(...items);
      } catch {
        console.warn(`[JAXA] Failed to fetch: ${endpoint}`);
      }
    }

    // Sort by date descending, deduplicate by URL
    const seen = new Set<string>();
    return allItems
      .sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      )
      .filter((item) => {
        if (seen.has(item.url)) return false;
        seen.add(item.url);
        return true;
      })
      .slice(0, this.config.maxItems);
  }
}

export const jaxaAdapter = new JaxaAdapter();
