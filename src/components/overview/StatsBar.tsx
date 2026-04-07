interface Stat {
  label: string;
  value: string | number;
}

interface StatsBarProps {
  stats: Stat[];
}

export default function StatsBar({ stats }: StatsBarProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="relative overflow-hidden bg-surface border border-border rounded-lg px-4 py-4 group"
        >
          {/* Subtle top accent line */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
          <p className="text-2xl font-semibold tracking-tight text-foreground tabular-nums">
            {stat.value}
          </p>
          <p className="mt-1.5 text-[10px] text-muted uppercase tracking-[0.15em] font-medium">
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  );
}
