// ---------------------------------------------------------------------------
// Moonwatch – manually curated entries
// ---------------------------------------------------------------------------
// These entries flow through the same ingestion pipeline as external sources.
// Add entries here when:
// - A source doesn't have an RSS/API adapter yet
// - You want to add editorial context not available in feeds
// - You need to correct or supplement automated ingestion
//
// Each entry requires:
// - externalId: unique identifier (use "manual-YYYY-MM-DD-slug" format)
// - title: headline
// - content: full text or summary
// - date: ISO 8601 date
// - url: source URL for provenance
// ---------------------------------------------------------------------------

import type { RawItem } from "@/adapters/types";

export const manualEntries: RawItem[] = [
  // Example entry — remove or replace with real curated content
  {
    externalId: "manual-2026-04-01-artemis-iii-update",
    title:
      "Artemis III mission timeline under review following HLS milestone",
    content:
      "NASA is conducting a comprehensive review of the Artemis III timeline following the successful Starship HLS orbital refueling demonstration. The agency indicated that crew training and surface EVA suit qualification remain on the critical path.",
    summary:
      "NASA reviews Artemis III timeline after Starship HLS refueling success.",
    date: "2026-04-01T00:00:00Z",
    url: "https://www.nasa.gov/artemis-iii",
    author: "Moonwatch Editorial",
    categories: ["artemis-program", "hls", "timeline"],
    raw: { source: "manual-curation", curatedBy: "editorial" },
  },
];
