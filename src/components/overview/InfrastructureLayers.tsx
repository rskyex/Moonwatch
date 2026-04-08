import Link from "next/link";
import type { InfrastructureByLayer } from "@/lib/intelligence";

interface InfrastructureLayersProps {
  layers: InfrastructureByLayer[];
}

export default function InfrastructureLayers({ layers }: InfrastructureLayersProps) {
  return (
    <div className="space-y-3">
      {layers.map(({ category, label, items }) => (
        <div key={category} className="flex items-baseline gap-6 py-2 border-b border-border/20">
          <span className="text-[11px] text-cold/50 tracking-wide w-40 shrink-0">
            {label}
          </span>
          <div className="flex-1 flex flex-wrap items-baseline gap-x-4 gap-y-1.5">
            {items.slice(0, 4).map(i => (
              <Link
                key={i.id}
                href={`/infrastructure/${i.slug}`}
                className="text-[13px] text-muted hover:text-foreground transition-colors"
              >
                {i.name}
              </Link>
            ))}
            {items.length > 4 && (
              <span className="text-[11px] text-dim/50">+{items.length - 4}</span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
