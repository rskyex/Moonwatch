// ---------------------------------------------------------------------------
// Moonwatch – commercial lunar companies adapter
// ---------------------------------------------------------------------------
// Aggregates news from commercial entities involved in lunar exploration.
//
// RSS-capable sources are fetched directly. For companies without RSS feeds,
// manual curation or future HTML scraping is needed:
//
// - Intuitive Machines: https://www.intuitivemachines.com/news
//   No public RSS feed. Requires scraping or manual entry.
//
// - ispace: https://ispace-inc.com/news/
//   No public RSS feed. Requires scraping or manual entry.
//
// - Astrobotic: https://www.astrobotic.com/news/
//   No public RSS feed. Requires scraping or manual entry.
//
// - SpaceX: Limited RSS availability. The Flickr feed and some blog
//   mirrors exist but official updates are mainly via X/Twitter.
//
// The endpoints below use available feeds; expand as companies publish
// RSS or as scrapers are built.
// ---------------------------------------------------------------------------

import { BaseAdapter } from "./base-adapter";
import { fetchRssFeed } from "./rss-parser";
import type { AdapterConfig, RawItem } from "./types";

const COMMERCIAL_CONFIG: AdapterConfig = {
  id: "commercial-rss",
  name: "Commercial Lunar Companies",
  sourceType: "press-release",
  reliability: "secondary",
  enabled: true,
  endpoints: [
    // SpaceX blog (unofficial RSS mirror — may need updating)
    "https://www.spacex.com/api/feed",
  ],
  pollIntervalMinutes: 120,
  maxItems: 30,
  defaultTags: ["commercial", "private-sector"],
  defaultEntityIds: [],
};

export class CommercialAdapter extends BaseAdapter {
  constructor(config?: Partial<AdapterConfig>) {
    super({ ...COMMERCIAL_CONFIG, ...config });
  }

  async fetchRaw(): Promise<RawItem[]> {
    const allItems: RawItem[] = [];

    for (const endpoint of this.config.endpoints) {
      try {
        const items = await fetchRssFeed(endpoint, this.config.maxItems);
        allItems.push(...items);
      } catch {
        // Commercial feeds are often unreliable or change URLs
        console.warn(`[Commercial] Failed to fetch: ${endpoint}`);
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

export const commercialAdapter = new CommercialAdapter();
