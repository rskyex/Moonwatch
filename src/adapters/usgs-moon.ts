import type { LunarFeature } from "@/types";

/**
 * USGS / IAU Lunar Gazetteer adapter.
 *
 * The International Astronomical Union maintains the official registry
 * of planetary feature names. The USGS hosts the Gazetteer of Planetary
 * Nomenclature which can be queried for lunar features.
 *
 * API: https://planetarynames.wr.usgs.gov/SearchResults
 * Note: The API requires specific query parameters and returns HTML.
 * For production use, a cached JSON extract is recommended.
 *
 * This module provides a curated subset of major lunar features
 * plus the interface for future API integration.
 */

/** Curated major lunar features — high-priority names for search and display */
export const MAJOR_LUNAR_FEATURES: LunarFeature[] = [
  // Major craters
  {
    id: "shackleton",
    name: "Shackleton",
    featureType: "crater",
    coordinates: { lat: -89.7, lng: 0 },
    diameter: 21,
    approved: true,
    namedAfter: "Ernest Shackleton",
  },
  {
    id: "de-gerlache",
    name: "de Gerlache",
    featureType: "crater",
    coordinates: { lat: -88.5, lng: -87.1 },
    diameter: 32.4,
    approved: true,
    namedAfter: "Adrien de Gerlache",
  },
  {
    id: "faustini",
    name: "Faustini",
    featureType: "crater",
    coordinates: { lat: -87.3, lng: 77 },
    diameter: 39,
    approved: true,
    namedAfter: "Arnaldo Faustini",
  },
  {
    id: "haworth",
    name: "Haworth",
    featureType: "crater",
    coordinates: { lat: -87.4, lng: -5.3 },
    diameter: 51.4,
    approved: true,
    namedAfter: "Adrian Haworth",
  },
  {
    id: "malapert",
    name: "Malapert",
    featureType: "crater",
    coordinates: { lat: -84.9, lng: -12.8 },
    diameter: 69,
    approved: true,
    namedAfter: "Charles Malapert",
  },
  {
    id: "cabeus",
    name: "Cabeus",
    featureType: "crater",
    coordinates: { lat: -85.3, lng: -35.7 },
    diameter: 98,
    approved: true,
    namedAfter: "Niccolò Cabeo",
  },
  {
    id: "nobile",
    name: "Nobile",
    featureType: "crater",
    coordinates: { lat: -85.2, lng: 53.5 },
    diameter: 73,
    approved: true,
    namedAfter: "Umberto Nobile",
  },
  {
    id: "tycho",
    name: "Tycho",
    featureType: "crater",
    coordinates: { lat: -43.3, lng: -11.2 },
    diameter: 85,
    approved: true,
    namedAfter: "Tycho Brahe",
  },
  {
    id: "copernicus",
    name: "Copernicus",
    featureType: "crater",
    coordinates: { lat: 9.6, lng: -20.1 },
    diameter: 93,
    approved: true,
    namedAfter: "Nicolaus Copernicus",
  },
  {
    id: "aristarchus",
    name: "Aristarchus",
    featureType: "crater",
    coordinates: { lat: 23.7, lng: -47.4 },
    diameter: 40,
    approved: true,
    namedAfter: "Aristarchus of Samos",
  },
  {
    id: "aitken",
    name: "Aitken",
    featureType: "crater",
    coordinates: { lat: -16.8, lng: 173.4 },
    diameter: 135,
    approved: true,
    namedAfter: "Robert Grant Aitken",
  },
  {
    id: "peary",
    name: "Peary",
    featureType: "crater",
    coordinates: { lat: 88.6, lng: 33 },
    diameter: 73,
    approved: true,
    namedAfter: "Robert Peary",
  },
  {
    id: "connecting-ridge",
    name: "Connecting Ridge",
    featureType: "dorsum",
    coordinates: { lat: -89.4, lng: 130 },
    approved: true,
  },
  // Major maria
  {
    id: "mare-tranquillitatis",
    name: "Mare Tranquillitatis",
    featureType: "mare",
    coordinates: { lat: 8.5, lng: 31.4 },
    diameter: 873,
    approved: true,
  },
  {
    id: "mare-imbrium",
    name: "Mare Imbrium",
    featureType: "mare",
    coordinates: { lat: 32.8, lng: -15.6 },
    diameter: 1123,
    approved: true,
  },
  {
    id: "oceanus-procellarum",
    name: "Oceanus Procellarum",
    featureType: "mare",
    coordinates: { lat: 18.4, lng: -57.4 },
    diameter: 2568,
    approved: true,
  },
  {
    id: "mare-serenitatis",
    name: "Mare Serenitatis",
    featureType: "mare",
    coordinates: { lat: 28, lng: 17.5 },
    diameter: 707,
    approved: true,
  },
  {
    id: "mare-crisium",
    name: "Mare Crisium",
    featureType: "mare",
    coordinates: { lat: 17.0, lng: 59.1 },
    diameter: 555,
    approved: true,
  },
  {
    id: "mare-nectaris",
    name: "Mare Nectaris",
    featureType: "mare",
    coordinates: { lat: -15.2, lng: 35.5 },
    diameter: 333,
    approved: true,
  },
  {
    id: "mare-orientale",
    name: "Mare Orientale",
    featureType: "mare",
    coordinates: { lat: -19.4, lng: -92.8 },
    diameter: 327,
    approved: true,
  },
  // Key mountains
  {
    id: "mons-huygens",
    name: "Mons Huygens",
    featureType: "mons",
    coordinates: { lat: 20, lng: -2.9 },
    approved: true,
    namedAfter: "Christiaan Huygens",
  },
  {
    id: "mons-hadley",
    name: "Mons Hadley",
    featureType: "mons",
    coordinates: { lat: 26.5, lng: 4.7 },
    approved: true,
    namedAfter: "John Hadley",
  },
];

/**
 * Search lunar features by name (case-insensitive substring match).
 */
export function searchLunarFeatures(query: string): LunarFeature[] {
  if (!query || query.length < 2) return [];
  const lower = query.toLowerCase();
  return MAJOR_LUNAR_FEATURES.filter((f) =>
    f.name.toLowerCase().includes(lower),
  );
}

/**
 * Get features near a coordinate (within radiusDeg degrees).
 */
export function getFeaturesNearCoordinate(
  lat: number,
  lng: number,
  radiusDeg = 5,
): LunarFeature[] {
  return MAJOR_LUNAR_FEATURES.filter((f) => {
    const dLat = f.coordinates.lat - lat;
    const dLng = f.coordinates.lng - lng;
    return Math.sqrt(dLat * dLat + dLng * dLng) <= radiusDeg;
  });
}

/**
 * Get features by type.
 */
export function getFeaturesByType(featureType: string): LunarFeature[] {
  return MAJOR_LUNAR_FEATURES.filter((f) => f.featureType === featureType);
}

/**
 * Get all south pole features (lat < -80).
 */
export function getSouthPoleFeatures(): LunarFeature[] {
  return MAJOR_LUNAR_FEATURES.filter((f) => f.coordinates.lat < -80);
}
