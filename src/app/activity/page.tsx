import type { Metadata } from "next";
import type { Entity, Mission } from "@/types";

import { PageHeader } from "@/components/layout/PageHeader";
import UpdateCard from "@/components/activity/UpdateCard";

import {
  getAllUpdates,
  getAllMissions,
  getAllEntities,
  getSourceById,
} from "@/lib/data-access";

export const metadata: Metadata = {
  title: "Activity — Moonwatch",
};

// ---------------------------------------------------------------------------
// Helpers – resolve IDs to display names
// ---------------------------------------------------------------------------

function buildMissionNameMap(missions: Mission[]): Map<string, string> {
  const map = new Map<string, string>();
  for (const m of missions) {
    map.set(m.id, m.name);
  }
  return map;
}

function buildEntityNameMap(entities: Entity[]): Map<string, string> {
  const map = new Map<string, string>();
  for (const e of entities) {
    map.set(e.id, e.shortName ?? e.name);
  }
  return map;
}

function resolveNames(
  ids: string[],
  nameMap: Map<string, string>,
): string[] {
  return ids
    .map((id) => nameMap.get(id))
    .filter((n): n is string => n != null);
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function ActivityPage() {
  const allUpdates = getAllUpdates();
  const missionNameMap = buildMissionNameMap(getAllMissions());
  const entityNameMap = buildEntityNameMap(getAllEntities());

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <PageHeader
        title="Activity"
        description="Structured updates across all tracked lunar missions and entities."
      />

      <div className="flex flex-col gap-4">
        {allUpdates.map((update) => {
          const source = getSourceById(update.sourceId);
          return (
            <UpdateCard
              key={update.id}
              update={update}
              sourceName={source?.name}
              missionNames={resolveNames(update.missionIds, missionNameMap)}
              entityNames={resolveNames(update.entityIds, entityNameMap)}
            />
          );
        })}
      </div>
    </div>
  );
}
