interface Stat {
  label: string;
  value: string | number;
}

interface StatsBarProps {
  stats: Stat[];
}

/** Telemetry readout bar */
export default function StatsBar({ stats }: StatsBarProps) {
  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-2 py-3 px-4 bg-surface border border-border rounded-sm">
      {stats.map((stat, i) => (
        <span key={stat.label} className="flex items-center gap-2">
          <span className="text-[9px] font-mono tracking-[0.15em] uppercase text-dim">
            {stat.label}
          </span>
          <span className="text-[12px] font-mono text-cold tabular-nums font-medium">
            {stat.value}
          </span>
          {i < stats.length - 1 && (
            <span className="hidden sm:inline w-px h-3 bg-border ml-4" />
          )}
        </span>
      ))}
    </div>
  );
}
