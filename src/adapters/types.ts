// ---------------------------------------------------------------------------
// Moonwatch – adapter interface
// ---------------------------------------------------------------------------

/** A single item returned by an external source adapter. */
export interface RawItem {
  externalId: string;
  title: string;
  content: string;
  date: string;
  url: string;
  raw: Record<string, unknown>;
}

/** Contract every source adapter must satisfy. */
export interface Adapter {
  id: string;
  name: string;
  sourceType: string; // SourceType
  fetch(): Promise<RawItem[]>;
}
