"use client";

import { useState, useMemo } from "react";
import type { Entity } from "@/types";
import { EntityType } from "@/types";
import EntityCard from "@/components/entities/EntityCard";
import EmptyState from "@/components/shared/EmptyState";

interface EntitiesPageClientProps {
  entities: Entity[];
  missionCounts: Record<string, number>;
}

type SortBy = "name" | "missions";

const selectClass =
  "bg-surface border border-border rounded-md px-3 py-1.5 text-sm text-foreground";

const entityTypeLabels: Record<string, string> = {
  "government-agency": "Government Agency",
  "private-company": "Private Company",
  "consortium": "Consortium",
  "research-institution": "Research Institution",
  "international-program": "International Program",
};

export default function EntitiesPageClient({
  entities,
  missionCounts,
}: EntitiesPageClientProps) {
  const [typeFilter, setTypeFilter] = useState("");
  const [countryFilter, setCountryFilter] = useState("");
  const [sortBy, setSortBy] = useState<SortBy>("name");

  const countries = useMemo(() => {
    const set = new Set<string>();
    for (const e of entities) {
      if (e.country) set.add(e.country);
    }
    return Array.from(set).sort();
  }, [entities]);

  const filteredEntities = useMemo(() => {
    let result = entities.filter((e) => {
      if (typeFilter && e.type !== typeFilter) return false;
      if (countryFilter && e.country !== countryFilter) return false;
      return true;
    });

    if (sortBy === "name") {
      result = [...result].sort((a, b) => a.name.localeCompare(b.name));
    } else {
      result = [...result].sort(
        (a, b) => (missionCounts[b.id] ?? 0) - (missionCounts[a.id] ?? 0)
      );
    }

    return result;
  }, [entities, typeFilter, countryFilter, sortBy, missionCounts]);

  return (
    <>
      {/* Filters row */}
      <div className="mt-6 flex flex-wrap items-center gap-3">
        <select
          className={selectClass}
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
        >
          <option value="">All Types</option>
          {Object.values(EntityType).map((t) => (
            <option key={t} value={t}>
              {entityTypeLabels[t] ?? t}
            </option>
          ))}
        </select>

        <select
          className={selectClass}
          value={countryFilter}
          onChange={(e) => setCountryFilter(e.target.value)}
        >
          <option value="">All Countries</option>
          {countries.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {/* Result count + sort toggle */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground">
          Showing {filteredEntities.length} of {entities.length} entities
        </p>

        <div className="flex items-center gap-1 rounded-md border border-border p-0.5">
          <button
            type="button"
            onClick={() => setSortBy("name")}
            className={`rounded px-3 py-1 text-xs font-medium transition-colors ${
              sortBy === "name"
                ? "bg-foreground text-background"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            By Name
          </button>
          <button
            type="button"
            onClick={() => setSortBy("missions")}
            className={`rounded px-3 py-1 text-xs font-medium transition-colors ${
              sortBy === "missions"
                ? "bg-foreground text-background"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            By Missions
          </button>
        </div>
      </div>

      {/* Entity grid */}
      {filteredEntities.length === 0 ? (
        <EmptyState message="No entities match the selected filters." />
      ) : (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredEntities.map((entity) => (
            <EntityCard
              key={entity.id}
              entity={entity}
              missionCount={missionCounts[entity.id]}
            />
          ))}
        </div>
      )}
    </>
  );
}
