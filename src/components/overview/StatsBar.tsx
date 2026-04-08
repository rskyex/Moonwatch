interface Stat {
  label: string;
  value: string | number;
}

interface StatsBarProps {
  stats: Stat[];
}

/** Quiet inline stats — not a KPI dashboard, just context */
export default function StatsBar({ stats }: StatsBarProps) {
  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[12px] text-dim">
      {stats.map((stat, i) => (
        <span key={stat.label}>
          <span className="text-foreground tabular-nums font-medium">{stat.value}</span>
          {" "}
          <span className="lowercase">{stat.label}</span>
          {i < stats.length - 1 && (
            <span className="hidden sm:inline text-border ml-6">&middot;</span>
          )}
        </span>
      ))}
    </div>
  );
}
