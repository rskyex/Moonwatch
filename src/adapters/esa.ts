// ---------------------------------------------------------------------------
// Moonwatch – ESA RSS adapter
// ---------------------------------------------------------------------------
// Aggregates content from ESA's public RSS feeds covering space science
// and human/robotic exploration.
// ---------------------------------------------------------------------------

import { BaseAdapter } from "./base-adapter";
import { fetchRssFeed } from "./rss-parser";
import type { AdapterConfig, RawItem } from "./types";

const ESA_CONFIG: AdapterConfig = {
  id: "esa-rss",
  name: "ESA News & Exploration",
  sourceType: "official-agency",
  reliability: "primary",
  enabled: true,
  endpoints: [
    "https://www.esa.int/rssfeed/Our_Activities/Space_Science",
    "https://www.esa.int/rssfeed/Our_Activities/Human_and_Robotic_Exploration",
  ],
  pollIntervalMinutes: 120,
  maxItems: 20,
  defaultTags: ["esa", "europe", "official"],
  defaultEntityIds: ["esa"],
};

export class EsaAdapter extends BaseAdapter {
  constructor(config?: Partial<AdapterConfig>) {
    super({ ...ESA_CONFIG, ...config });
  }

  async fetchRaw(): Promise<RawItem[]> {
    const allItems: RawItem[] = [];

    for (const endpoint of this.config.endpoints) {
      try {
        const items = await fetchRssFeed(endpoint, this.config.maxItems);
        allItems.push(...items);
      } catch {
        console.warn(`[ESA] Failed to fetch: ${endpoint}`);
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

export const esaAdapter = new EsaAdapter();
