import Link from "next/link";
import type { InfrastructureByLayer } from "@/lib/intelligence";

interface InfrastructureLayersProps {
  layers: InfrastructureByLayer[];
}

/** Infrastructure by layer — horizontal rows, not card grid */
export default function InfrastructureLayers({ layers }: InfrastructureLayersProps) {
  return (
    <div className="space-y-4">
      {layers.map(({ category, label, count, items }) => (
        <div key={category} className="flex items-start gap-4">
          <Link
            href={`/infrastructure`}
            className="text-[13px] font-medium text-foreground hover:text-accent transition-colors w-40 shrink-0 pt-0.5"
          >
            {label}
          </Link>
          <div className="flex-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px] text-muted">
            {items.slice(0, 3).map(i => (
              <Link
                key={i.id}
                href={`/infrastructure/${i.slug}`}
                className="hover:text-foreground transition-colors"
              >
                {i.name}
              </Link>
            ))}
            {items.length > 3 && (
              <span className="text-dim">+{items.length - 3}</span>
            )}
          </div>
          <span className="text-[11px] text-dim tabular-nums shrink-0">{count}</span>
        </div>
      ))}
    </div>
  );
}
