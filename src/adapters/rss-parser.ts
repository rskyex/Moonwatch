// ---------------------------------------------------------------------------
// Moonwatch – lightweight RSS/Atom parser
// ---------------------------------------------------------------------------
// Uses regex-based XML extraction so we don't need a DOM parser or external
// dependency. Handles RSS 2.0 and Atom formats, CDATA sections, and common
// HTML entities found in NASA/ESA/JAXA feeds.
// ---------------------------------------------------------------------------

import type { RawItem } from "./types";

interface RssChannel {
  title: string;
  link: string;
  description: string;
  items: RssItem[];
}

interface RssItem {
  title: string;
  link: string;
  description: string;
  pubDate: string;
  guid?: string;
  author?: string;
  categories?: string[];
  content?: string;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Extract text content between XML tags (first occurrence). */
function extractTag(xml: string, tag: string): string {
  // Handle self-closing tags
  const selfClosing = new RegExp(`<${tag}[^>]*/\\s*>`, "i");
  if (selfClosing.test(xml) && !new RegExp(`<${tag}[^>]*>[\\s\\S]*?</${tag}>`, "i").test(xml)) {
    return "";
  }

  const re = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`, "i");
  const match = xml.match(re);
  if (!match) return "";
  return stripCdata(decodeEntities(match[1].trim()));
}

/** Extract all occurrences of an XML element. */
function extractAllElements(xml: string, tag: string): string[] {
  const results: string[] = [];
  const re = new RegExp(`<${tag}[\\s>][\\s\\S]*?</${tag}>`, "gi");
  let match: RegExpExecArray | null;
  while ((match = re.exec(xml)) !== null) {
    results.push(match[0]);
  }
  return results;
}

/** Extract an attribute value from an XML element string. */
function extractAttr(element: string, attr: string): string {
  const re = new RegExp(`${attr}\\s*=\\s*["']([^"']*)["']`, "i");
  const match = element.match(re);
  return match ? match[1] : "";
}

/** Strip CDATA wrappers. */
function stripCdata(text: string): string {
  return text
    .replace(/<!\[CDATA\[/g, "")
    .replace(/\]\]>/g, "")
    .trim();
}

/** Decode common HTML/XML entities. */
function decodeEntities(text: string): string {
  return text
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&#(\d+);/g, (_m, code) => String.fromCharCode(Number(code)))
    .replace(/&#x([0-9a-fA-F]+);/g, (_m, hex) =>
      String.fromCharCode(parseInt(hex, 16)),
    );
}

/** Parse an RSS/Atom date string to ISO 8601. */
function parseRssDate(dateStr: string): string {
  if (!dateStr) return new Date().toISOString();
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return new Date().toISOString();
    return d.toISOString();
  } catch {
    return new Date().toISOString();
  }
}

/** Strip HTML tags for plain-text summaries. */
function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "").trim();
}

// ---------------------------------------------------------------------------
// Atom feed parsing
// ---------------------------------------------------------------------------

function parseAtomFeed(xml: string): RssChannel {
  const title = extractTag(xml, "title");
  const linkEl = xml.match(/<link[^>]*rel\s*=\s*["']alternate["'][^>]*>/i);
  const link = linkEl ? extractAttr(linkEl[0], "href") : extractTag(xml, "link");
  const description = extractTag(xml, "subtitle") || "";

  const entries = extractAllElements(xml, "entry");
  const items: RssItem[] = entries.map((entry) => {
    const entryTitle = extractTag(entry, "title");
    // Atom links use href attribute
    const entryLinkEl = entry.match(/<link[^>]*href\s*=\s*["']([^"']*)["'][^>]*>/i);
    const entryLink = entryLinkEl ? entryLinkEl[1] : "";
    const entryContent =
      extractTag(entry, "content") || extractTag(entry, "summary") || "";
    const entrySummary = extractTag(entry, "summary") || "";
    const pubDate =
      extractTag(entry, "updated") || extractTag(entry, "published") || "";
    const guid = extractTag(entry, "id") || "";
    const author = extractTag(entry, "name") || ""; // nested inside <author>

    const categoryEls = entry.match(/<category[^>]*>/gi) || [];
    const categories = categoryEls
      .map((c) => extractAttr(c, "term") || extractAttr(c, "label"))
      .filter(Boolean);

    return {
      title: entryTitle,
      link: entryLink,
      description: stripHtml(entrySummary || entryContent),
      pubDate,
      guid,
      author: author || undefined,
      categories: categories.length ? categories : undefined,
      content: entryContent || undefined,
    };
  });

  return { title, link, description, items };
}

// ---------------------------------------------------------------------------
// RSS 2.0 feed parsing
// ---------------------------------------------------------------------------

function parseRss2Feed(xml: string): RssChannel {
  const channelMatch = xml.match(/<channel>([\s\S]*)<\/channel>/i);
  const channel = channelMatch ? channelMatch[1] : xml;

  const title = extractTag(channel, "title");
  const link = extractTag(channel, "link");
  const description = extractTag(channel, "description");

  const itemElements = extractAllElements(channel, "item");
  const items: RssItem[] = itemElements.map((item) => {
    const itemTitle = extractTag(item, "title");
    const itemLink = extractTag(item, "link");
    const itemDesc = extractTag(item, "description");
    const pubDate = extractTag(item, "pubDate");
    const guid = extractTag(item, "guid");
    const author =
      extractTag(item, "dc:creator") ||
      extractTag(item, "author") ||
      "";
    const contentEncoded =
      extractTag(item, "content:encoded") || "";

    const categoryElements = extractAllElements(item, "category");
    const categories = categoryElements
      .map((c) => stripCdata(extractTag(c, "category") || c.replace(/<\/?category[^>]*>/gi, "").trim()))
      .filter(Boolean);

    return {
      title: itemTitle,
      link: itemLink,
      description: stripHtml(itemDesc),
      pubDate,
      guid: guid || undefined,
      author: author || undefined,
      categories: categories.length ? categories : undefined,
      content: contentEncoded || itemDesc || undefined,
    };
  });

  return { title, link, description, items };
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Parse RSS 2.0 / Atom feed XML into structured items.
 * Uses regex-based XML extraction (no DOM parser dependency).
 */
export function parseRssFeed(xml: string): RssChannel {
  // Detect Atom vs RSS
  if (/<feed[\s>]/i.test(xml)) {
    return parseAtomFeed(xml);
  }
  return parseRss2Feed(xml);
}

/** Fetch and parse an RSS feed URL, returning RawItems. */
export async function fetchRssFeed(
  url: string,
  maxItems = 50,
): Promise<RawItem[]> {
  const response = await fetch(url, {
    headers: {
      Accept: "application/rss+xml, application/atom+xml, application/xml, text/xml",
      "User-Agent": "Moonwatch/1.0 (lunar exploration observatory)",
    },
    signal: AbortSignal.timeout(15_000),
  });

  if (!response.ok) {
    throw new Error(`Feed fetch failed: ${response.status} ${response.statusText}`);
  }

  const xml = await response.text();
  const channel = parseRssFeed(xml);

  return channel.items.slice(0, maxItems).map((item) => ({
    externalId: item.guid || item.link || `${url}#${item.title}`,
    title: item.title,
    content: item.content || item.description,
    summary: item.description || undefined,
    date: parseRssDate(item.pubDate),
    url: item.link,
    author: item.author,
    categories: item.categories,
    raw: {
      feedUrl: url,
      feedTitle: channel.title,
      guid: item.guid,
    },
  }));
}
