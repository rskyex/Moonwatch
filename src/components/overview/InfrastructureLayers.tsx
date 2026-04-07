import Link from "next/link";
import type { InfrastructureByLayer } from "@/lib/intelligence";

interface InfrastructureLayersProps {
  layers: InfrastructureByLayer[];
}

export default function InfrastructureLayers({ layers }: InfrastructureLayersProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
      {layers.map(({ category, label, count, items }) => (
        <Link
          key={category}
          href={`/infrastructure#${category}`}
          className="group p-3 rounded-lg border border-border bg-surface hover:border-accent/20 transition-all"
        >
          <p className="text-sm font-medium text-foreground group-hover:text-accent transition-colors">{label}</p>
          <p className="text-xs text-muted mt-1">
            <span className="text-foreground font-medium tabular-nums">{count}</span> {count === 1 ? "system" : "systems"}
          </p>
          <div className="mt-2 flex flex-wrap gap-1">
            {items.slice(0, 2).map(i => (
              <span key={i.id} className="text-[10px] text-muted/70 truncate max-w-full">{i.name}</span>
            ))}
            {items.length > 2 && <span className="text-[10px] text-muted/50">+{items.length - 2}</span>}
          </div>
        </Link>
      ))}
    </div>
  );
}
