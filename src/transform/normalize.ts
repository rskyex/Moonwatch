import type { RawItem, AdapterConfig } from "@/adapters/types";
import type { Update, SourceRef } from "@/types";

/**
 * Generate a deterministic slug from a title string.
 */
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);
}

/**
 * Generate a deterministic ID from source + external ID.
 */
function generateId(sourceId: string, externalId: string): string {
  return `${sourceId}--${slugify(externalId)}`;
}

/**
 * Infer significance from content signals.
 * This is a heuristic — manual curation can override.
 */
function inferSignificance(raw: RawItem): "routine" | "notable" | "major" | "critical" {
  const text = `${raw.title} ${raw.content}`.toLowerCase();

  const criticalKeywords = ["first human", "crewed landing", "crew aboard", "emergency", "loss of", "abort"];
  const majorKeywords = ["successfully landed", "launch success", "first ever", "milestone achieved", "sample return", "historic"];
  const notableKeywords = ["contract award", "design review", "test complete", "partnership", "agreement signed", "assembly complete", "integration"];

  if (criticalKeywords.some(k => text.includes(k))) return "critical";
  if (majorKeywords.some(k => text.includes(k))) return "major";
  if (notableKeywords.some(k => text.includes(k))) return "notable";
  return "routine";
}

/**
 * Extract a summary from content if none is provided.
 * Takes the first ~200 characters of content, breaking at sentence boundary.
 */
function extractSummary(content: string, maxLength = 200): string {
  // Strip HTML tags
  const clean = content.replace(/<[^>]+>/g, "").trim();
  if (clean.length <= maxLength) return clean;

  const truncated = clean.slice(0, maxLength);
  const lastSentence = truncated.lastIndexOf(". ");
  if (lastSentence > maxLength * 0.5) {
    return truncated.slice(0, lastSentence + 1);
  }
  return truncated.replace(/\s+\S*$/, "") + "…";
}

/**
 * Normalize a raw adapter item into an internal Update.
 *
 * This is the core transformation: external data → internal schema.
 * The adapter's config provides default tags and entity associations.
 */
export function normalizeToUpdate(
  raw: RawItem,
  adapterConfig: AdapterConfig,
): Update {
  const now = new Date().toISOString();
  const id = generateId(adapterConfig.id, raw.externalId);

  const sourceRef: SourceRef = {
    sourceId: adapterConfig.id,
    url: raw.url,
    accessedAt: now,
  };

  return {
    id,
    slug: slugify(raw.title),
    name: raw.title,
    title: raw.title,
    summary: raw.summary || extractSummary(raw.content),
    content: raw.content,
    date: raw.date,
    significance: inferSignificance(raw),
    missionIds: [], // Populated by enrichment step
    entityIds: [...adapterConfig.defaultEntityIds],
    infrastructureIds: [], // Populated by enrichment step
    sourceId: adapterConfig.id,
    ingestedFrom: adapterConfig.id,
    tags: [
      ...adapterConfig.defaultTags,
      ...(raw.categories || []).map(c => slugify(c)),
    ],
    sources: [sourceRef],
    createdAt: now,
    updatedAt: now,
  };
}

/**
 * Normalize a batch of raw items from a single adapter.
 */
export function normalizeBatch(
  items: RawItem[],
  adapterConfig: AdapterConfig,
): Update[] {
  return items.map(item => normalizeToUpdate(item, adapterConfig));
}

export { slugify, generateId, inferSignificance, extractSummary };
