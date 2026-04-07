import type { Metadata } from "next";
import type { Entity, Mission, Update } from "@/types";

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
// Category configuration
// ---------------------------------------------------------------------------

const CATEGORY_ORDER: { key: string; label: string }[] = [
  { key: "in-flight", label: "In Flight" },
  { key: "surface-operations", label: "Surface Operations" },
  { key: "preparing-for-launch", label: "Preparing for Launch" },
  { key: "program-development", label: "Program Development" },
  { key: "infrastructure-planning", label: "Infrastructure Planning" },
  { key: "international-coordination", label: "International Coordination" },
];

const UNCATEGORIZED_LABEL = "General Updates";

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
// Grouping
// ---------------------------------------------------------------------------

function groupByCategory(
  updates: Update[],
): Map<string, Update[]> {
  const groups = new Map<string, Update[]>();

  for (const update of updates) {
    const key = update.operationalCategory ?? "__uncategorized__";
    const list = groups.get(key);
    if (list) {
      list.push(update);
    } else {
      groups.set(key, [update]);
    }
  }

  // Sort each group newest-first by date
  for (const list of groups.values()) {
    list.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

  return groups;
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function ActivityPage() {
  const allUpdates = getAllUpdates();
  const missionNameMap = buildMissionNameMap(getAllMissions());
  const entityNameMap = buildEntityNameMap(getAllEntities());

  const grouped = groupByCategory(allUpdates);

  // Determine whether any update actually has a category set.
  const hasAnyCategorized = allUpdates.some((u) => u.operationalCategory);

  // If no updates have categories, fall back to a simple chronological list.
  if (!hasAnyCategorized) {
    const sorted = [...allUpdates].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );

    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <PageHeader
          title="Activity"
          description="Operational status across all tracked lunar missions and programs."
        />

        <div className="flex flex-col gap-4">
          {sorted.map((update) => {
            const source = getSourceById(update.sourceId);
            return (
              <div key={update.id}>
                <UpdateCard
                  update={update}
                  sourceName={source?.name}
                  missionNames={resolveNames(update.missionIds, missionNameMap)}
                  entityNames={resolveNames(update.entityIds, entityNameMap)}
                />
                {update.whyItMatters && (
                  <p className="ml-12 mt-1 mb-3 text-xs text-muted/70 italic leading-relaxed max-w-2xl">
                    {update.whyItMatters}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // Build ordered sections: known categories first, then uncategorized.
  const sections: { label: string; updates: Update[] }[] = [];

  for (const { key, label } of CATEGORY_ORDER) {
    const list = grouped.get(key);
    if (list && list.length > 0) {
      sections.push({ label, updates: list });
    }
  }

  const uncategorized = grouped.get("__uncategorized__");
  if (uncategorized && uncategorized.length > 0) {
    sections.push({ label: UNCATEGORIZED_LABEL, updates: uncategorized });
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <PageHeader
        title="Activity"
        description="Operational status across all tracked lunar missions and programs."
      />

      {sections.map((section) => (
        <section key={section.label} className="border-l border-border pl-6">
          <h2 className="text-xs font-medium tracking-[0.15em] uppercase text-muted mb-4 mt-10">
            {section.label}
          </h2>

          <div className="flex flex-col gap-4">
            {section.updates.map((update) => {
              const source = getSourceById(update.sourceId);
              return (
                <div key={update.id}>
                  <UpdateCard
                    update={update}
                    sourceName={source?.name}
                    missionNames={resolveNames(update.missionIds, missionNameMap)}
                    entityNames={resolveNames(update.entityIds, entityNameMap)}
                  />
                  {update.whyItMatters && (
                    <p className="ml-12 mt-1 mb-3 text-xs text-muted/70 italic leading-relaxed max-w-2xl">
                      {update.whyItMatters}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
