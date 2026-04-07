import { Milestone, MilestoneStatus } from "@/types";
import MilestoneCard from "./MilestoneCard";

interface TimelineViewProps {
  milestones: Milestone[];
  missionNames: Record<string, string>;
  entityNames: Record<string, string>;
  groupBy?: "year" | "horizon" | "theme";
}

const HORIZON_LABELS: Record<string, string> = {
  recent: "Recent Achievements",
  upcoming: "Upcoming Milestones",
  "long-term": "Long-term Roadmap",
};

const THEME_LABELS: Record<string, string> = {
  "artemis-program": "Artemis Program",
  "chang-e-program": "Chang'e Program",
  "commercial-lunar": "Commercial Lunar",
  "international-cooperation": "International Cooperation",
  "infrastructure": "Infrastructure",
};

function getGroupKey(
  milestone: Milestone,
  groupBy: "year" | "horizon" | "theme",
): string {
  if (groupBy === "year") {
    return String(new Date(milestone.date).getUTCFullYear());
  }
  if (groupBy === "horizon") {
    return milestone.horizon ?? "upcoming";
  }
  // theme
  return milestone.thematicGroup ?? "other";
}

function getGroupLabel(key: string, groupBy: "year" | "horizon" | "theme"): string {
  if (groupBy === "year") return key;
  if (groupBy === "horizon") return HORIZON_LABELS[key] ?? key;
  return THEME_LABELS[key] ?? key;
}

/**
 * Groups milestones by year, horizon, or theme and renders them in a vertical timeline.
 * Achieved milestones are slightly muted; upcoming ones are prominent.
 */
export default function TimelineView({
  milestones,
  missionNames,
  entityNames,
  groupBy = "year",
}: TimelineViewProps) {
  // Sort chronologically (earliest first)
  const sorted = [...milestones].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  );

  // Group milestones
  const groups: Record<string, Milestone[]> = {};
  for (const m of sorted) {
    const key = getGroupKey(m, groupBy);
    if (!groups[key]) groups[key] = [];
    groups[key].push(m);
  }

  // Determine ordering of group keys
  let keys: string[];
  if (groupBy === "horizon") {
    // Fixed order for horizons
    keys = ["recent", "upcoming", "long-term"].filter((k) => groups[k]);
  } else {
    keys = Object.keys(groups).sort();
  }

  return (
    <div className="space-y-10">
      {keys.map((key) => (
        <section key={key}>
          <h2 className="text-lg font-semibold text-foreground tracking-tight mb-4 border-b border-border pb-2">
            {getGroupLabel(key, groupBy)}
          </h2>

          <div>
            {groups[key].map((milestone) => {
              const isAchieved = milestone.status === MilestoneStatus.Achieved;

              return (
                <div key={milestone.id} className={isAchieved ? "opacity-60" : ""}>
                  <MilestoneCard
                    milestone={milestone}
                    missionNames={milestone.missionIds
                      .map((id) => missionNames[id])
                      .filter(Boolean)}
                    entityNames={milestone.entityIds
                      .map((id) => entityNames[id])
                      .filter(Boolean)}
                  />
                </div>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
