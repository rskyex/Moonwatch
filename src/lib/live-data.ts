// ---------------------------------------------------------------------------
// Moonwatch – live data fetching for server components
// ---------------------------------------------------------------------------
// This module provides async functions that fetch real data from external
// sources during server-side rendering. Used by pages with ISR enabled.
// Falls back to static mock data when external sources are unavailable.
// ---------------------------------------------------------------------------

import type { Update } from "@/types";
import { runIngestion, mergeWithExisting } from "@/lib/ingestion";
import { getAllUpdates } from "@/lib/data-access";
import { computeApproximateLunarState, getLunarPhaseLabel } from "@/adapters/jpl";
import type { EphemerisPoint } from "@/types";

// ---------------------------------------------------------------------------
// Ingested updates cache (in-memory, per-instance)
// ---------------------------------------------------------------------------

let _cachedUpdates: Update[] | null = null;
let _cacheTimestamp = 0;
const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour

/**
 * Get all updates including live ingested data from RSS feeds.
 * Merges with curated mock data. Caches for 1 hour in memory.
 */
export async function getLiveUpdates(): Promise<Update[]> {
  const now = Date.now();

  if (_cachedUpdates && now - _cacheTimestamp < CACHE_TTL_MS) {
    return _cachedUpdates;
  }

  try {
    const result = await runIngestion();
    const curated = getAllUpdates();
    const merged = mergeWithExisting(curated, result.finalUpdates);
    _cachedUpdates = merged;
    _cacheTimestamp = now;
    return merged;
  } catch (error) {
    console.error("[live-data] Ingestion failed, using curated data:", error);
    return getAllUpdates();
  }
}

// ---------------------------------------------------------------------------
// Lunar ephemeris
// ---------------------------------------------------------------------------

export interface LunarStateDisplay {
  distance: string;
  phaseAngle: string;
  phaseName: string;
  subSolarLng: string;
  librationLat: string;
  librationLng: string;
  timestamp: string;
}

/**
 * Get current lunar state formatted for display.
 */
export function getLunarStateDisplay(): LunarStateDisplay {
  const state = computeApproximateLunarState();
  return {
    distance: `${(state.earthMoonDistance ?? 384400).toLocaleString()} km`,
    phaseAngle: `${state.phaseAngle ?? 0}°`,
    phaseName: getLunarPhaseLabel(state.phaseAngle ?? 0),
    subSolarLng: `${state.subSolarLng ?? 0}°`,
    librationLat: `${state.librationLat ?? 0}°`,
    librationLng: `${state.librationLng ?? 0}°`,
    timestamp: state.timestamp,
  };
}
