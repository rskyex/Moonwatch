import Link from "next/link";
import type { InfrastructureByLayer } from "@/lib/intelligence";

interface InfrastructureLayersProps {
  layers: InfrastructureByLayer[];
}

export default function InfrastructureLayers({ layers }: InfrastructureLayersProps) {
  return (
    <div className="space-y-3">
      {layers.map(({ category, label, items }) => (
        <div key={category} className="flex items-baseline gap-4 py-1.5 border-b border-border/20">
          <span className="text-[10px] font-mono text-cold/40 tracking-wider uppercase w-36 shrink-0">
            {label}
          </span>
          <div className="flex-1 flex flex-wrap items-baseline gap-x-4 gap-y-1">
            {items.slice(0, 4).map(i => (
              <Link
                key={i.id}
                href={`/infrastructure/${i.slug}`}
                className="text-[12px] font-sans font-light text-muted hover:text-foreground transition-colors"
              >
                {i.name}
              </Link>
            ))}
            {items.length > 4 && (
              <span className="text-[10px] font-mono text-dim/40">+{items.length - 4}</span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
