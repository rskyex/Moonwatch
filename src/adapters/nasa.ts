// ---------------------------------------------------------------------------
// Moonwatch – NASA RSS adapter
// ---------------------------------------------------------------------------
// Aggregates content from NASA's public RSS feeds. NASA publishes several
// feeds covering Artemis, general breaking news, image-of-the-day, and
// the Space Launch System blog.
// ---------------------------------------------------------------------------

import { BaseAdapter } from "./base-adapter";
import { fetchRssFeed } from "./rss-parser";
import type { AdapterConfig, RawItem } from "./types";

/** Known NASA feed URLs containing lunar / exploration content. */
export const NASA_FEEDS = {
  artemis: "https://blogs.nasa.gov/artemis/feed/",
  exploration: "https://www.nasa.gov/rss/dyn/lg_image_of_the_day.rss",
  breakingNews: "https://www.nasa.gov/rss/dyn/breaking_news.rss",
  sls: "https://blogs.nasa.gov/spacelaunce-system/feed/", // URL may vary
} as const;

const NASA_CONFIG: AdapterConfig = {
  id: "nasa-rss",
  name: "NASA RSS Feeds",
  sourceType: "official-agency",
  reliability: "primary",
  enabled: true,
  endpoints: [
    "https://blogs.nasa.gov/artemis/feed/",
    "https://www.nasa.gov/rss/dyn/breaking_news.rss",
  ],
  pollIntervalMinutes: 60,
  maxItems: 25,
  defaultTags: ["nasa", "official"],
  defaultEntityIds: ["nasa"],
};

export class NasaAdapter extends BaseAdapter {
  constructor(config?: Partial<AdapterConfig>) {
    super({ ...NASA_CONFIG, ...config });
  }

  async fetchRaw(): Promise<RawItem[]> {
    const allItems: RawItem[] = [];

    for (const endpoint of this.config.endpoints) {
      try {
        const items = await fetchRssFeed(endpoint, this.config.maxItems);
        allItems.push(...items);
      } catch {
        // Individual feed failures shouldn't break the whole adapter
        console.warn(`[NASA] Failed to fetch: ${endpoint}`);
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

export const nasaAdapter = new NasaAdapter();
