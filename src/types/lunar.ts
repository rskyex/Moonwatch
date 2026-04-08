/** An IAU-recognized lunar feature (crater, mare, mountain, etc.) */
export interface LunarFeature {
  id: string;
  name: string;
  /** IAU feature type: crater | mare | mons | vallis | rima | dorsum | promontorium | sinus | lacus | palus | other */
  featureType: string;
  /** Center coordinates */
  coordinates: { lat: number; lng: number };
  /** Approximate diameter in km (for craters) or length */
  diameter?: number;
  /** Approval status */
  approved: boolean;
  /** Origin of the name */
  namedAfter?: string;
}

/** A tile layer configuration for lunar mapping */
export interface LunarMapLayer {
  id: string;
  name: string;
  description: string;
  /** WMTS or tile URL template */
  tileUrl: string;
  /** Attribution text */
  attribution: string;
  /** Min/max zoom levels */
  minZoom: number;
  maxZoom: number;
  /** Whether this is the default base layer */
  isDefault: boolean;
}

/** LROC image reference */
export interface LrocImageRef {
  id: string;
  /** NAC or WAC */
  cameraType: "NAC" | "WAC";
  /** Center coordinates */
  coordinates: { lat: number; lng: number };
  /** Resolution in meters/pixel */
  resolution: number;
  /** URL to image or product page */
  url: string;
  /** Date of observation */
  date?: string;
}

/** Ephemeris data point for a celestial body */
export interface EphemerisPoint {
  timestamp: string;
  /** Selenographic sub-solar longitude */
  subSolarLng?: number;
  /** Earth-Moon distance in km */
  earthMoonDistance?: number;
  /** Lunar phase angle in degrees */
  phaseAngle?: number;
  /** Libration */
  librationLat?: number;
  librationLng?: number;
}
