import type { LunarMapLayer } from "@/types";

/**
 * NASA Moon Trek tile layers.
 *
 * Moon Trek provides Web Map Tile Service (WMTS) access to lunar
 * base maps, elevation data, and overlays. Tiles follow a standard
 * XYZ scheme at multiple zoom levels.
 *
 * Source: https://trek.nasa.gov/moon/
 * Documentation: https://trek.nasa.gov/moon/TrekWS/rest/cat/describe
 */

export const MOON_TREK_LAYERS: LunarMapLayer[] = [
  {
    id: "moon-trek-lola-shade",
    name: "LOLA Shaded Relief",
    description:
      "Lunar Orbiter Laser Altimeter shaded relief map. Global coverage at ~118m/pixel.",
    tileUrl:
      "https://trek.nasa.gov/tiles/Moon/EQ/LRO_LOLA_Shade_Global_128ppd_v04/1.0.0/default/default028mm/{z}/{y}/{x}.png",
    attribution: "NASA/GSFC/MIT (LOLA)",
    minZoom: 0,
    maxZoom: 7,
    isDefault: true,
  },
  {
    id: "moon-trek-wac-global",
    name: "WAC Global Mosaic",
    description:
      "LROC Wide Angle Camera global mosaic. Visible-light imagery at ~100m/pixel.",
    tileUrl:
      "https://trek.nasa.gov/tiles/Moon/EQ/LRO_WAC_Mosaic_Global_303ppd_v02/1.0.0/default/default028mm/{z}/{y}/{x}.png",
    attribution: "NASA/GSFC/ASU (LROC WAC)",
    minZoom: 0,
    maxZoom: 8,
    isDefault: false,
  },
  {
    id: "moon-trek-clementine",
    name: "Clementine Color Ratio",
    description:
      "Clementine UVVIS color ratio composite showing mineralogical variations.",
    tileUrl:
      "https://trek.nasa.gov/tiles/Moon/EQ/Clementine_UVVIS_FeO_Lucey2000_Clr_Global_64ppd/1.0.0/default/default028mm/{z}/{y}/{x}.png",
    attribution: "NASA/USGS (Clementine)",
    minZoom: 0,
    maxZoom: 6,
    isDefault: false,
  },
];

/**
 * Get all available Moon Trek tile layers.
 */
export function getMoonTrekLayers(): LunarMapLayer[] {
  return MOON_TREK_LAYERS;
}

/**
 * Get the default base layer.
 */
export function getDefaultLayer(): LunarMapLayer {
  return MOON_TREK_LAYERS.find((l) => l.isDefault) ?? MOON_TREK_LAYERS[0];
}

/**
 * Build a tile URL for a specific layer, zoom, and coordinates.
 * This is used by the map component to request tiles.
 */
export function buildTileUrl(
  layer: LunarMapLayer,
  z: number,
  x: number,
  y: number,
): string {
  return layer.tileUrl
    .replace("{z}", String(z))
    .replace("{x}", String(x))
    .replace("{y}", String(y));
}
