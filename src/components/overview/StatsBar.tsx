interface Stat {
  label: string;
  value: string | number;
}

interface StatsBarProps {
  stats: Stat[];
}

export default function StatsBar({ stats }: StatsBarProps) {
  return (
    <div className="flex flex-wrap items-center gap-x-8 gap-y-3 py-4 px-5 bg-surface backdrop-blur-lg border border-border rounded-lg">
      {stats.map((stat, i) => (
        <span key={stat.label} className="flex items-center gap-2.5">
          <span className="text-[10px] tracking-wide uppercase text-dim">
            {stat.label}
          </span>
          <span className="text-[13px] font-mono text-cold tabular-nums font-medium">
            {stat.value}
          </span>
          {i < stats.length - 1 && (
            <span className="hidden sm:inline w-px h-4 bg-border ml-5" />
          )}
        </span>
      ))}
    </div>
  );
}
