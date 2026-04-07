import { Milestone, MilestoneStatus } from "@/types";
import MilestoneCard from "./MilestoneCard";

interface TimelineViewProps {
  milestones: Milestone[];
  missionNames: Record<string, string>;
  entityNames: Record<string, string>;
}

/**
 * Groups milestones by year and renders them in a vertical timeline.
 * Achieved milestones are slightly muted; upcoming ones are prominent.
 */
export default function TimelineView({
  milestones,
  missionNames,
  entityNames,
}: TimelineViewProps) {
  // Sort chronologically (earliest first)
  const sorted = [...milestones].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  );

  // Group by year
  const groups: Record<string, Milestone[]> = {};
  for (const m of sorted) {
    const year = String(new Date(m.date).getUTCFullYear());
    if (!groups[year]) groups[year] = [];
    groups[year].push(m);
  }

  const years = Object.keys(groups).sort();

  return (
    <div className="space-y-10">
      {years.map((year) => (
        <section key={year}>
          <h2 className="text-lg font-semibold text-foreground tracking-tight mb-4 border-b border-border pb-2">
            {year}
          </h2>

          <div>
            {groups[year].map((milestone) => {
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
