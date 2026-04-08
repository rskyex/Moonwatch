"use client";

import { useState, useRef, useEffect, useCallback } from "react";

interface FeatureSearchProps {
  features: {
    id: string;
    name: string;
    featureType: string;
    coordinates: { lat: number; lng: number };
  }[];
  onSelect?: (feature: {
    id: string;
    name: string;
    coordinates: { lat: number; lng: number };
  }) => void;
}

function formatCoord(lat: number, lng: number) {
  const latLabel = lat >= 0 ? `${lat.toFixed(2)}\u00b0N` : `${Math.abs(lat).toFixed(2)}\u00b0S`;
  const lngLabel = lng >= 0 ? `${lng.toFixed(2)}\u00b0E` : `${Math.abs(lng).toFixed(2)}\u00b0W`;
  return `${latLabel}, ${lngLabel}`;
}

export default function FeatureSearch({
  features,
  onSelect,
}: FeatureSearchProps) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const filtered =
    query.length > 0
      ? features
          .filter((f) =>
            f.name.toLowerCase().includes(query.toLowerCase()),
          )
          .slice(0, 5)
      : [];

  const handleSelect = useCallback(
    (feature: (typeof features)[number]) => {
      setQuery(feature.name);
      setIsOpen(false);
      onSelect?.({
        id: feature.id,
        name: feature.name,
        coordinates: feature.coordinates,
      });
    },
    [onSelect],
  );

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={wrapperRef} className="relative w-full max-w-xs">
      <input
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setIsOpen(true);
        }}
        onFocus={() => {
          if (query.length > 0) setIsOpen(true);
        }}
        placeholder="Search lunar features..."
        className="w-full bg-surface border border-border text-[13px] text-foreground placeholder-dim rounded px-3 py-2 outline-none focus:border-cold/40 transition-colors"
      />

      {isOpen && filtered.length > 0 && (
        <ul className="absolute z-30 mt-1 w-full bg-surface-alt border border-border rounded shadow-lg overflow-hidden">
          {filtered.map((feature) => (
            <li key={feature.id}>
              <button
                type="button"
                onClick={() => handleSelect(feature)}
                className="w-full text-left px-3 py-2 hover:bg-surface transition-colors border-b border-border last:border-b-0"
              >
                <span className="block text-[13px] text-foreground leading-tight">
                  {feature.name}
                </span>
                <span className="block text-[11px] text-muted font-mono mt-0.5">
                  {feature.featureType} &middot;{" "}
                  {formatCoord(
                    feature.coordinates.lat,
                    feature.coordinates.lng,
                  )}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}

      {isOpen && query.length > 0 && filtered.length === 0 && (
        <div className="absolute z-30 mt-1 w-full bg-surface-alt border border-border rounded shadow-lg px-3 py-3">
          <p className="text-[12px] text-dim">No features found</p>
        </div>
      )}
    </div>
  );
}
