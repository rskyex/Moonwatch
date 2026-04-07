"use client";

import { useState, useMemo } from "react";
import type { Mission, Entity, LunarRegion } from "@/types";
import { MissionCard } from "@/components/missions";
import { MissionFilters } from "@/components/missions";
import { EmptyState } from "@/components/shared";
import { getMissionEntities } from "@/lib/relations";

interface MissionsPageClientProps {
  missions: Mission[];
  entities: Entity[];
  regions: LunarRegion[];
}

export default function MissionsPageClient({
  missions,
  entities,
  regions,
}: MissionsPageClientProps) {
  const [filters, setFilters] = useState({
    status: "",
    type: "",
    entityId: "",
    regionId: "",
  });

  const entityOptions = useMemo(
    () => entities.map((e) => ({ value: e.id, label: e.name })),
    [entities],
  );

  const regionOptions = useMemo(
    () => regions.map((r) => ({ value: r.id, label: r.name })),
    [regions],
  );

  const entitiesByMission = useMemo(() => {
    const map = new Map<string, Entity[]>();
    for (const mission of missions) {
      map.set(mission.id, getMissionEntities(mission));
    }
    return map;
  }, [missions]);

  const filteredMissions = useMemo(() => {
    return missions.filter((m) => {
      if (filters.status && m.status !== filters.status) return false;
      if (filters.type && m.type !== filters.type) return false;
      if (filters.entityId && !m.entityIds.includes(filters.entityId))
        return false;
      if (filters.regionId && m.regionId !== filters.regionId) return false;
      return true;
    });
  }, [missions, filters]);

  return (
    <>
      <MissionFilters
        entityOptions={entityOptions}
        regionOptions={regionOptions}
        onFilterChange={setFilters}
      />

      {filteredMissions.length === 0 ? (
        <EmptyState message="No missions match the selected filters." />
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredMissions.map((mission) => (
            <MissionCard
              key={mission.id}
              mission={mission}
              entities={entitiesByMission.get(mission.id)}
            />
          ))}
        </div>
      )}
    </>
  );
}
