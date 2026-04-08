import type { EphemerisPoint } from "@/types";

/**
 * JPL Horizons System adapter.
 *
 * JPL Horizons provides ephemeris data for solar system bodies.
 * The Moon's state vector, phase angle, libration, and Earth-Moon
 * distance can be queried via the Horizons API.
 *
 * API: https://ssd.jpl.nasa.gov/horizons/
 * REST endpoint: https://ssd.jpl.nasa.gov/api/horizons.api
 *
 * Target body: 301 (Moon)
 * Center: 399 (Earth geocenter)
 *
 * This module provides the adapter scaffold and mock current-state
 * data. Full API integration requires rate-limited HTTP requests.
 */

/**
 * Current lunar state — static mock for architecture scaffolding.
 * In production, this would be fetched from JPL Horizons API.
 */
export function getCurrentLunarState(): EphemerisPoint {
  // Approximate values for demonstration
  return {
    timestamp: new Date().toISOString(),
    subSolarLng: -45.2,
    earthMoonDistance: 384400,
    phaseAngle: 135,
    librationLat: 4.2,
    librationLng: -3.1,
  };
}

/**
 * Fetch ephemeris data from JPL Horizons API.
 *
 * TODO: Implement when API integration is enabled.
 * The API accepts date ranges and returns tabulated data.
 *
 * Example API call:
 * GET https://ssd.jpl.nasa.gov/api/horizons.api?
 *   format=json&
 *   COMMAND='301'&
 *   OBJ_DATA='YES'&
 *   MAKE_EPHEM='YES'&
 *   EPHEM_TYPE='OBSERVER'&
 *   CENTER='399'&
 *   START_TIME='2026-04-01'&
 *   STOP_TIME='2026-04-02'&
 *   STEP_SIZE='1h'
 */
export async function fetchEphemeris(
  _startDate: string,
  _endDate: string,
  _stepHours = 1,
): Promise<EphemerisPoint[]> {
  // TODO: Implement HTTP fetch to JPL Horizons
  return [getCurrentLunarState()];
}

/**
 * Calculate approximate lunar phase from phase angle.
 */
export function getLunarPhaseLabel(phaseAngle: number): string {
  if (phaseAngle < 22.5) return "Full Moon";
  if (phaseAngle < 67.5) return "Waning Gibbous";
  if (phaseAngle < 112.5) return "Third Quarter";
  if (phaseAngle < 157.5) return "Waning Crescent";
  if (phaseAngle < 202.5) return "New Moon";
  if (phaseAngle < 247.5) return "Waxing Crescent";
  if (phaseAngle < 292.5) return "First Quarter";
  if (phaseAngle < 337.5) return "Waxing Gibbous";
  return "Full Moon";
}
