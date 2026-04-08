import type { LrocImageRef } from "@/types";

/**
 * Lunar Reconnaissance Orbiter Camera (LROC) adapter.
 *
 * LROC provides the highest-resolution imagery of the lunar surface.
 * NAC (Narrow Angle Camera): ~0.5m/pixel
 * WAC (Wide Angle Camera): ~100m/pixel
 *
 * Data source: https://wms.lroc.asu.edu/lroc
 * QuickMap: https://quickmap.lroc.asu.edu/
 *
 * This module provides curated image references for key exploration
 * sites and the interface for future API integration.
 */

/** Curated LROC image references for key lunar sites */
export const LROC_KEY_IMAGES: LrocImageRef[] = [
  {
    id: "lroc-shackleton-nac",
    cameraType: "NAC",
    coordinates: { lat: -89.7, lng: 0 },
    resolution: 0.5,
    url: "https://quickmap.lroc.asu.edu/?extent=-2.5,-90.5,2.5,-88.9&proj=10&layers=NrBsFYBoAZIRnpEBmZA",
    date: "2023-01-15T00:00:00Z",
  },
  {
    id: "lroc-south-pole-wac",
    cameraType: "WAC",
    coordinates: { lat: -90, lng: 0 },
    resolution: 100,
    url: "https://quickmap.lroc.asu.edu/?extent=-30,-91,30,-85&proj=10",
  },
  {
    id: "lroc-aristarchus-nac",
    cameraType: "NAC",
    coordinates: { lat: 23.7, lng: -47.4 },
    resolution: 0.5,
    url: "https://quickmap.lroc.asu.edu/?extent=-48.5,22.5,-46.3,24.9&proj=10",
  },
  {
    id: "lroc-tranquility-base",
    cameraType: "NAC",
    coordinates: { lat: 0.67, lng: 23.47 },
    resolution: 0.5,
    url: "https://quickmap.lroc.asu.edu/?extent=23.3,0.5,23.7,0.9&proj=10",
    date: "2012-07-15T00:00:00Z",
  },
  {
    id: "lroc-copernicus-wac",
    cameraType: "WAC",
    coordinates: { lat: 9.6, lng: -20.1 },
    resolution: 100,
    url: "https://quickmap.lroc.asu.edu/?extent=-22,-1,-18,12&proj=10",
  },
];

/**
 * Get LROC image references near a coordinate.
 */
export function getLrocImagesNear(
  lat: number,
  lng: number,
  radiusDeg = 5,
): LrocImageRef[] {
  return LROC_KEY_IMAGES.filter((img) => {
    const dLat = img.coordinates.lat - lat;
    const dLng = img.coordinates.lng - lng;
    return Math.sqrt(dLat * dLat + dLng * dLng) <= radiusDeg;
  });
}

/**
 * Build a QuickMap URL centered on a coordinate.
 * This generates a direct link to LROC QuickMap.
 */
export function buildQuickMapUrl(
  lat: number,
  lng: number,
  zoom = 10,
): string {
  const extent = 2;
  return `https://quickmap.lroc.asu.edu/?extent=${lng - extent},${lat - extent},${lng + extent},${lat + extent}&proj=${zoom}`;
}
