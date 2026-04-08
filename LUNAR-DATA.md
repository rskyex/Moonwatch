# Moonwatch — Lunar Data Layers

## Overview

Moonwatch integrates multiple lunar data sources to provide geographic,
observational, and ephemeris context alongside mission tracking. All data
flows through typed adapters and is normalized into internal entities.

## Architecture

```
┌──────────────┐   ┌──────────────┐   ┌──────────────┐   ┌──────────┐
│  Moon Trek    │   │  USGS/IAU    │   │    LROC      │   │   JPL    │
│  (tiles)     │   │  (gazetteer) │   │  (imagery)   │   │(ephemeris│
└──────┬───────┘   └──────┬───────┘   └──────┬───────┘   └────┬─────┘
       │                  │                  │                 │
       ▼                  ▼                  ▼                 ▼
  moon-trek.ts      usgs-moon.ts        lroc.ts           jpl.ts
       │                  │                  │                 │
       └──────────────────┼──────────────────┼─────────────────┘
                          ▼
                   src/types/lunar.ts
                   (LunarFeature, LunarMapLayer, LrocImageRef, EphemerisPoint)
                          │
                          ▼
                    UI Components
```

## Data Sources

### Phase 1: NASA Moon Trek (Tile Maps)

**Adapter:** `src/adapters/moon-trek.ts`
**Source:** https://trek.nasa.gov/moon/

Provides WMTS tile layers for lunar surface visualization:
- **LOLA Shaded Relief** — global topographic map from the Lunar Orbiter
  Laser Altimeter (~118m/pixel)
- **WAC Global Mosaic** — visible-light imagery from LROC Wide Angle
  Camera (~100m/pixel)
- **Clementine Color Ratio** — mineralogical color composite

The tile URL template follows standard XYZ format:
```
https://trek.nasa.gov/tiles/Moon/EQ/{layer}/{z}/{y}/{x}.png
```

**Usage:** The `LunarMap` component uses these tile URLs for background
imagery. Currently renders as a CSS/SVG visualization with markers;
can be upgraded to a full tile-based map with Leaflet when needed.

### Phase 2: USGS / IAU Lunar Gazetteer

**Adapter:** `src/adapters/usgs-moon.ts`
**Source:** https://planetarynames.wr.usgs.gov/

Provides official IAU-approved lunar feature names and coordinates.
The adapter includes a curated set of 22 major features:
- 12 craters (Shackleton, Tycho, Copernicus, south pole cluster, etc.)
- 7 maria (Tranquillitatis, Imbrium, Procellarum, etc.)
- 2 mountains (Mons Huygens, Mons Hadley)
- 1 ridge (Connecting Ridge)

**Functions:**
- `searchLunarFeatures(query)` — name search
- `getFeaturesNearCoordinate(lat, lng, radius)` — proximity search
- `getFeaturesByType(type)` — filter by crater/mare/mons
- `getSouthPoleFeatures()` — features below -80° latitude

**Expansion:** Add more features from the USGS API or import the full
IAU dataset (~9,000 named features) as a static JSON file.

### Phase 3: LROC Imagery References

**Adapter:** `src/adapters/lroc.ts`
**Source:** https://wms.lroc.asu.edu/lroc, https://quickmap.lroc.asu.edu/

Provides references to high-resolution lunar imagery:
- **NAC** (Narrow Angle Camera): ~0.5m/pixel
- **WAC** (Wide Angle Camera): ~100m/pixel

The adapter includes curated image references for key exploration sites
and generates direct links to LROC QuickMap for any coordinate.

**Functions:**
- `getLrocImagesNear(lat, lng, radius)` — find nearby imagery
- `buildQuickMapUrl(lat, lng, zoom)` — generate QuickMap URL

### Phase 4: JPL Horizons Ephemeris

**Adapter:** `src/adapters/jpl.ts`
**Source:** https://ssd.jpl.nasa.gov/horizons/

Provides lunar ephemeris data:
- Earth-Moon distance
- Sub-solar longitude
- Phase angle (lunar phase)
- Libration

Currently scaffolded with mock data. Full API integration requires
HTTP requests to the Horizons REST endpoint.

**Functions:**
- `getCurrentLunarState()` — current mock ephemeris
- `fetchEphemeris(start, end, step)` — stub for API integration
- `getLunarPhaseLabel(phaseAngle)` — phase name from angle

## Types

All lunar data types are in `src/types/lunar.ts`:

```typescript
LunarFeature    — IAU feature (crater, mare, mountain, etc.)
LunarMapLayer   — tile layer configuration
LrocImageRef    — LROC image reference
EphemerisPoint  — celestial body state at a moment
```

## UI Components

### LunarMap (`src/components/regions/LunarMap.tsx`)

CSS/SVG-based lunar surface visualization:
- Equirectangular projection
- Interactive region markers (click to navigate)
- IAU feature markers
- South pole emphasis
- Faint grid lines
- Coordinate labels
- Hover tooltips

### FeatureSearch (`src/components/regions/FeatureSearch.tsx`)

Lunar feature name search input with dropdown results.

## Adding New Data Sources

### To add a new tile layer:
1. Add a `LunarMapLayer` entry to `moon-trek.ts`
2. The `LunarMap` component will automatically pick it up

### To add more gazetteer features:
1. Add `LunarFeature` entries to `usgs-moon.ts`
2. Or implement the USGS API call for dynamic queries

### To add LROC products:
1. Add `LrocImageRef` entries to `lroc.ts`
2. Or implement the WMS query for dynamic product search

### To connect ephemeris:
1. Implement `fetchEphemeris()` in `jpl.ts` with HTTP fetch
2. Add a component to display current lunar state
3. Consider caching with a 1-hour TTL

### To add a completely new source:
1. Create `src/adapters/new-source.ts`
2. Define the appropriate type in `src/types/lunar.ts`
3. Export from `src/adapters/index.ts`
4. Build a UI component or integrate into existing pages

## Integration Points

| Page | Data Layer | Integration |
|------|-----------|-------------|
| Regions listing | Moon Trek, USGS | LunarMap with markers |
| Region detail | USGS, LROC | Nearby features, QuickMap link |
| Mission detail | USGS | Region feature context (via region) |
| Overview | None yet | Could show ephemeris in header |

## Source Transparency

All external data sources are documented here and on the Methodology page.
Tile data carries attribution from NASA/GSFC, ASU, and USGS.
Feature names carry IAU approval status.
Imagery references link directly to primary source (ASU LROC).
