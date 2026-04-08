"use client";

import { useState, useRef, useCallback } from "react";
import Link from "next/link";

interface LunarMapProps {
  regions: {
    id: string;
    slug: string;
    name: string;
    coordinates?: { lat: number; lng: number };
    missionCount: number;
  }[];
  features?: {
    id: string;
    name: string;
    featureType: string;
    coordinates: { lat: number; lng: number };
  }[];
  /** Highlight a specific region */
  highlightRegionId?: string;
}

/** Convert lat/lng to percentage-based x/y within the equirectangular projection */
function toXY(lat: number, lng: number) {
  const x = ((lng + 180) / 360) * 100;
  const y = ((90 - lat) / 180) * 100;
  return { x, y };
}

/** Format coordinate for display */
function formatCoord(lat: number, lng: number) {
  const latLabel = lat >= 0 ? `${lat.toFixed(2)}\u00b0N` : `${Math.abs(lat).toFixed(2)}\u00b0S`;
  const lngLabel = lng >= 0 ? `${lng.toFixed(2)}\u00b0E` : `${Math.abs(lng).toFixed(2)}\u00b0W`;
  return `${latLabel}, ${lngLabel}`;
}

export default function LunarMap({
  regions,
  features = [],
  highlightRegionId,
}: LunarMapProps) {
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent, regionId: string) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setTooltipPos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
      setHoveredRegion(regionId);
    },
    [],
  );

  const hoveredData = hoveredRegion
    ? regions.find((r) => r.id === hoveredRegion)
    : null;

  /** Latitude grid lines at 30-degree intervals */
  const latLines = [-60, -30, 0, 30, 60];
  /** Longitude grid lines at 30-degree intervals */
  const lngLines = [-150, -120, -90, -60, -30, 0, 30, 60, 90, 120, 150];

  return (
    <div className="relative w-full" ref={containerRef}>
      {/* Coordinate edge labels */}
      <div className="flex items-center justify-between text-[9px] font-mono text-dim mb-1 px-1">
        <span>180&deg;W</span>
        <span>90&deg;N</span>
        <span>180&deg;E</span>
      </div>

      {/* Map container with 2:1 aspect ratio */}
      <div
        className="relative w-full border border-border overflow-hidden"
        style={{
          aspectRatio: "2 / 1",
          background: `
            radial-gradient(ellipse 80% 60% at 50% 100%, rgba(125,211,252,0.03) 0%, transparent 70%),
            radial-gradient(ellipse 120% 80% at 50% 50%, var(--surface-alt) 0%, var(--surface) 100%)
          `,
        }}
      >
        {/* SVG grid lines */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          {/* Latitude lines */}
          {latLines.map((lat) => {
            const { y } = toXY(lat, 0);
            return (
              <line
                key={`lat-${lat}`}
                x1="0"
                y1={y}
                x2="100"
                y2={y}
                stroke="var(--border-color)"
                strokeWidth="0.15"
                strokeDasharray="0.8 1.6"
                opacity="0.5"
              />
            );
          })}
          {/* Longitude lines */}
          {lngLines.map((lng) => {
            const { x } = toXY(0, lng);
            return (
              <line
                key={`lng-${lng}`}
                x1={x}
                y1="0"
                x2={x}
                y2="100"
                stroke="var(--border-color)"
                strokeWidth="0.15"
                strokeDasharray="0.8 1.6"
                opacity="0.5"
              />
            );
          })}
          {/* Equator — slightly more visible */}
          <line
            x1="0"
            y1="50"
            x2="100"
            y2="50"
            stroke="var(--border-color)"
            strokeWidth="0.2"
            opacity="0.7"
          />
          {/* Prime meridian */}
          <line
            x1="50"
            y1="0"
            x2="50"
            y2="100"
            stroke="var(--border-color)"
            strokeWidth="0.2"
            opacity="0.7"
          />
        </svg>

        {/* South pole exploration focus glow */}
        <div
          className="absolute bottom-0 left-0 right-0 pointer-events-none"
          style={{
            height: "25%",
            background:
              "linear-gradient(to top, rgba(125,211,252,0.04) 0%, transparent 100%)",
          }}
        />

        {/* Feature markers */}
        {features.map((feature) => {
          const { x, y } = toXY(
            feature.coordinates.lat,
            feature.coordinates.lng,
          );
          return (
            <div
              key={feature.id}
              className="absolute"
              style={{
                left: `${x}%`,
                top: `${y}%`,
                transform: "translate(-50%, -50%)",
              }}
            >
              <div
                className="rounded-full"
                style={{
                  width: "3px",
                  height: "3px",
                  backgroundColor: "var(--dim)",
                  opacity: 0.6,
                }}
              />
              {/* Label — large screens only */}
              <span
                className="hidden lg:block absolute left-2 top-1/2 -translate-y-1/2 whitespace-nowrap font-mono select-none pointer-events-none"
                style={{
                  fontSize: "8px",
                  color: "var(--dim)",
                  opacity: 0.7,
                }}
              >
                {feature.name}
              </span>
            </div>
          );
        })}

        {/* Region markers */}
        {regions.map((region) => {
          if (!region.coordinates) return null;
          const { x, y } = toXY(
            region.coordinates.lat,
            region.coordinates.lng,
          );
          const isHighlighted = region.id === highlightRegionId;
          const isHovered = region.id === hoveredRegion;

          return (
            <Link
              key={region.id}
              href={`/regions/${region.slug}`}
              className="absolute z-10 group"
              style={{
                left: `${x}%`,
                top: `${y}%`,
                transform: "translate(-50%, -50%)",
              }}
              onMouseMove={(e) => handleMouseMove(e, region.id)}
              onMouseLeave={() => setHoveredRegion(null)}
            >
              {/* Glow ring for highlighted region */}
              {isHighlighted && (
                <span
                  className="absolute rounded-full animate-pulse"
                  style={{
                    width: "18px",
                    height: "18px",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    background:
                      "radial-gradient(circle, rgba(125,211,252,0.25) 0%, transparent 70%)",
                    boxShadow: "0 0 12px 2px rgba(125,211,252,0.15)",
                  }}
                />
              )}
              {/* Hover glow */}
              {isHovered && !isHighlighted && (
                <span
                  className="absolute rounded-full"
                  style={{
                    width: "14px",
                    height: "14px",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    background:
                      "radial-gradient(circle, rgba(125,211,252,0.15) 0%, transparent 70%)",
                  }}
                />
              )}
              {/* Marker dot */}
              <span
                className="block rounded-full transition-all duration-200"
                style={{
                  width: "6px",
                  height: "6px",
                  backgroundColor: "var(--cold)",
                  opacity: isHighlighted ? 0.95 : isHovered ? 0.8 : 0.55,
                  boxShadow: isHighlighted
                    ? "0 0 8px 1px rgba(125,211,252,0.3)"
                    : "none",
                }}
              />
            </Link>
          );
        })}

        {/* Tooltip */}
        {hoveredData && hoveredData.coordinates && (
          <div
            className="absolute z-20 pointer-events-none"
            style={{
              left: `${tooltipPos.x}px`,
              top: `${tooltipPos.y}px`,
              transform: "translate(12px, -100%)",
            }}
          >
            <div
              className="rounded px-3 py-2 text-left border border-border shadow-lg"
              style={{
                backgroundColor: "var(--surface-alt)",
                minWidth: "140px",
              }}
            >
              <p className="text-[11px] font-semibold text-foreground leading-tight">
                {hoveredData.name}
              </p>
              <p className="text-[10px] font-mono text-muted mt-0.5">
                {formatCoord(
                  hoveredData.coordinates.lat,
                  hoveredData.coordinates.lng,
                )}
              </p>
              <p className="text-[10px] text-dim mt-1">
                {hoveredData.missionCount}{" "}
                {hoveredData.missionCount === 1 ? "mission" : "missions"}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Bottom coordinate labels */}
      <div className="flex items-center justify-between text-[9px] font-mono text-dim mt-1 px-1">
        <span>180&deg;W</span>
        <span>90&deg;S</span>
        <span>180&deg;E</span>
      </div>
    </div>
  );
}
