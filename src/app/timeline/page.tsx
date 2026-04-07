import type { Metadata } from "next";
import { getAllMilestones, getAllMissions, getAllEntities } from "@/lib/data-access";
import { PageHeader } from "@/components/layout";
import MilestoneCard from "@/components/timeline/MilestoneCard";
import { Milestone, MilestoneStatus } from "@/types";

export const metadata: Metadata = {
  title: "Timeline — Moonwatch",
};

const THEMATIC_LABELS: Record<string, string> = {
  "artemis-program": "Artemis Program",
  "chang-e-program": "Chang'e Program",
  "commercial-lunar": "Commercial Lunar",
  "international-cooperation": "International Cooperation",
  "infrastructure": "Infrastructure",
};

function classifyHorizon(milestone: Milestone): "recent" | "upcoming" | "long-term" {
  if (milestone.horizon === "recent" || milestone.status === MilestoneStatus.Achieved) {
    return "recent";
  }
  if (
    milestone.horizon === "upcoming" ||
    milestone.status === MilestoneStatus.Upcoming ||
    milestone.status === MilestoneStatus.Delayed
  ) {
    return "upcoming";
  }
  if (milestone.horizon === "long-term") {
    return "long-term";
  }
  return "long-term";
}

const HORIZON_SECTIONS = [
  { key: "recent" as const, heading: "Recent Achievements" },
  { key: "upcoming" as const, heading: "Upcoming Milestones" },
  { key: "long-term" as const, heading: "Long-term Roadmap" },
];

export default function TimelinePage() {
  const milestones = getAllMilestones();
  const missions = getAllMissions();
  const entities = getAllEntities();

  const missionNames: Record<string, string> = {};
  for (const m of missions) {
    missionNames[m.id] = m.name;
  }

  const entityNames: Record<string, string> = {};
  for (const e of entities) {
    entityNames[e.id] = e.shortName ?? e.name;
  }

  // Sort chronologically
  const sorted = [...milestones].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  );

  // Group into horizons
  const groups: Record<string, Milestone[]> = {
    recent: [],
    upcoming: [],
    "long-term": [],
  };
  for (const m of sorted) {
    const horizon = classifyHorizon(m);
    groups[horizon].push(m);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <PageHeader
        title="Timeline"
        description="Key milestones in humanity's return to the Moon — achieved, imminent, and on the horizon."
      />

      <div className="space-y-2">
        {HORIZON_SECTIONS.map(({ key, heading }) => {
          const items = groups[key];
          if (!items || items.length === 0) return null;

          return (
            <section key={key}>
              <h2 className="text-xs font-medium tracking-[0.15em] uppercase text-muted mb-4 mt-10">
                {heading}
              </h2>

              <div>
                {items.map((milestone) => (
                  <div key={milestone.id}>
                    {milestone.thematicGroup && (
                      <span className="inline-block text-[10px] font-medium uppercase tracking-wider text-muted/60 bg-muted/10 rounded px-1.5 py-0.5 mb-1 ml-[3.75rem]">
                        {THEMATIC_LABELS[milestone.thematicGroup] ?? milestone.thematicGroup}
                      </span>
                    )}
                    <MilestoneCard
                      milestone={milestone}
                      missionNames={milestone.missionIds
                        .map((id) => missionNames[id])
                        .filter(Boolean)}
                      entityNames={milestone.entityIds
                        .map((id) => entityNames[id])
                        .filter(Boolean)}
                    />
                    {milestone.whyItMatters && (
                      <p className="italic text-sm text-muted ml-[3.75rem] -mt-4 mb-6 max-w-2xl leading-relaxed">
                        {milestone.whyItMatters}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
