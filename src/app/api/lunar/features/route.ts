import { NextResponse } from "next/server";
import {
  searchLunarFeatures,
  MAJOR_LUNAR_FEATURES,
  getFeaturesNearCoordinate,
  getFeaturesByType,
  getSouthPoleFeatures,
} from "@/adapters/usgs-moon";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q");
  const type = searchParams.get("type");
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  const radius = searchParams.get("radius");
  const region = searchParams.get("region");

  let features;

  if (q) {
    features = searchLunarFeatures(q);
  } else if (lat && lng) {
    features = getFeaturesNearCoordinate(
      parseFloat(lat),
      parseFloat(lng),
      radius ? parseFloat(radius) : 5,
    );
  } else if (type) {
    features = getFeaturesByType(type);
  } else if (region === "south-pole") {
    features = getSouthPoleFeatures();
  } else {
    features = MAJOR_LUNAR_FEATURES;
  }

  return NextResponse.json({
    count: features.length,
    features,
  });
}
