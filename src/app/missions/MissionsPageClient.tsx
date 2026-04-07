"use client";

import { useState, useMemo } from "react";
import type { Mission, Entity, LunarRegion } from "@/types";
import { MissionStatus, MissionType } from "@/types";
import MissionCard from "@/components/missions/MissionCard";
import EmptyState from "@/components/shared/EmptyState";
import { getMissionStatusLabel } from "@/lib/formatting";
import { getMissionEntities } from "@/lib/relations";

interface MissionsPageClientProps {
  missions: Mission[];
  entities: Entity[];
  regions: LunarRegion[];
}

type GroupBy = "status" | "program";

const selectClass =
  "bg-surface border border-border rounded-md px-3 py-1.5 text-sm text-foreground";

export default function MissionsPageClient({
  missions,
  entities,
  regions,
}: MissionsPageClientProps) {
  const [statusFilter, setStatusFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [entityFilter, setEntityFilter] = useState("");
  const [regionFilter, setRegionFilter] = useState("");
  const [programFilter, setProgramFilter] = useState("");
  const [groupBy, setGroupBy] = useState<GroupBy>("status");

  // Derive unique programs from the mission list
  const programs = useMemo(() => {
    const set = new Set<string>();
    for (const m of missions) {
      if (m.program) set.add(m.program);
    }
    return Array.from(set).sort();
  }, [missions]);

  // Pre-compute entities per mission
  const entitiesByMission = useMemo(() => {
    const map = new Map<string, Entity[]>();
    for (const mission of missions) {
      map.set(mission.id, getMissionEntities(mission));
    }
    return map;
  }, [missions]);

  // Apply all filters
  const filteredMissions = useMemo(() => {
    return missions.filter((m) => {
      if (statusFilter && m.status !== statusFilter) return false;
      if (typeFilter && m.type !== typeFilter) return false;
      if (entityFilter && !m.entityIds.includes(entityFilter)) return false;
      if (regionFilter && m.regionId !== regionFilter) return false;
      if (programFilter && m.program !== programFilter) return false;
      return true;
    });
  }, [missions, statusFilter, typeFilter, entityFilter, regionFilter, programFilter]);

  // Group missions
  const grouped = useMemo(() => {
    const map = new Map<string, Mission[]>();

    if (groupBy === "status") {
      // Use a stable ordering based on the MissionStatus enum values
      const statusOrder = Object.values(MissionStatus) as string[];
      for (const status of statusOrder) {
        const label = getMissionStatusLabel(status as MissionStatus);
        const group = filteredMissions.filter((m) => m.status === status);
        if (group.length > 0) {
          map.set(label, group);
        }
      }
    } else {
      // Group by program
      const withProgram = new Map<string, Mission[]>();
      const noProgram: Mission[] = [];

      for (const m of filteredMissions) {
        if (m.program) {
          const list = withProgram.get(m.program) ?? [];
          list.push(m);
          withProgram.set(m.program, list);
        } else {
          noProgram.push(m);
        }
      }

      // Sort program names alphabetically
      const sortedKeys = Array.from(withProgram.keys()).sort();
      for (const key of sortedKeys) {
        map.set(key, withProgram.get(key)!);
      }
      if (noProgram.length > 0) {
        map.set("No Program", noProgram);
      }
    }

    return map;
  }, [filteredMissions, groupBy]);

  return (
    <>
      {/* Filters row */}
      <div className="mt-6 flex flex-wrap items-center gap-3">
        <select
          className={selectClass}
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All Statuses</option>
          {Object.values(MissionStatus).map((s) => (
            <option key={s} value={s}>
              {getMissionStatusLabel(s)}
            </option>
          ))}
        </select>

        <select
          className={selectClass}
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
        >
          <option value="">All Types</option>
          {Object.values(MissionType).map((t) => (
            <option key={t} value={t}>
              {t.charAt(0).toUpperCase() + t.slice(1).replace("-", " ")}
            </option>
          ))}
        </select>

        <select
          className={selectClass}
          value={entityFilter}
          onChange={(e) => setEntityFilter(e.target.value)}
        >
          <option value="">All Entities</option>
          {entities.map((e) => (
            <option key={e.id} value={e.id}>
              {e.name}
            </option>
          ))}
        </select>

        <select
          className={selectClass}
          value={regionFilter}
          onChange={(e) => setRegionFilter(e.target.value)}
        >
          <option value="">All Regions</option>
          {regions.map((r) => (
            <option key={r.id} value={r.id}>
              {r.name}
            </option>
          ))}
        </select>

        <select
          className={selectClass}
          value={programFilter}
          onChange={(e) => setProgramFilter(e.target.value)}
        >
          <option value="">All Programs</option>
          {programs.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
      </div>

      {/* Result count + grouping toggle */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground">
          Showing {filteredMissions.length} of {missions.length} missions
        </p>

        <div className="flex items-center gap-1 rounded-md border border-border p-0.5">
          <button
            type="button"
            onClick={() => setGroupBy("status")}
            className={`rounded px-3 py-1 text-xs font-medium transition-colors ${
              groupBy === "status"
                ? "bg-foreground text-background"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            By Status
          </button>
          <button
            type="button"
            onClick={() => setGroupBy("program")}
            className={`rounded px-3 py-1 text-xs font-medium transition-colors ${
              groupBy === "program"
                ? "bg-foreground text-background"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            By Program
          </button>
        </div>
      </div>

      {/* Mission list */}
      {filteredMissions.length === 0 ? (
        <EmptyState message="No missions match the selected filters." />
      ) : (
        <div className="mt-6 space-y-10">
          {Array.from(grouped.entries()).map(([heading, group]) => (
            <section key={heading}>
              <h2 className="mb-4 text-lg font-semibold text-foreground">
                {heading}
                <span className="ml-2 text-sm font-normal text-muted-foreground">
                  ({group.length})
                </span>
              </h2>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {group.map((mission) => (
                  <MissionCard
                    key={mission.id}
                    mission={mission}
                    entities={entitiesByMission.get(mission.id)}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </>
  );
}
