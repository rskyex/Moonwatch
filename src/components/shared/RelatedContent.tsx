import Link from "next/link";
import type { Mission, Entity, InfrastructureProject } from "@/types";
import { getMissionStatusLabel, getMissionStatusColor, getEntityTypeLabel } from "@/lib/formatting";
import { StatusBadge } from "@/components/shared";

interface RelatedItem {
  href: string;
  title: string;
  subtitle?: string;
  badge?: { label: string; colorClass: string };
}

interface RelatedContentProps {
  title?: string;
  items: RelatedItem[];
}

export default function RelatedContent({ title = "Related", items }: RelatedContentProps) {
  if (items.length === 0) return null;
  return (
    <div className="border-t border-border pt-8 mt-8">
      <h2 className="text-xs font-medium tracking-[0.15em] uppercase text-muted mb-4">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-start gap-3 p-3 rounded-lg border border-border bg-surface hover:border-accent/20 hover:shadow-[0_0_20px_var(--glow)] transition-all"
          >
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-foreground truncate">{item.title}</p>
              {item.subtitle && <p className="text-xs text-muted mt-0.5 truncate">{item.subtitle}</p>}
            </div>
            {item.badge && <StatusBadge label={item.badge.label} colorClass={item.badge.colorClass} />}
          </Link>
        ))}
      </div>
    </div>
  );
}

// Helper converters — turn typed entities into RelatedItems
export function missionsToRelatedItems(missions: Mission[]): RelatedItem[] {
  return missions.map(m => ({
    href: `/missions/${m.slug}`,
    title: m.name,
    subtitle: m.program || m.type.replace("-", " "),
    badge: { label: getMissionStatusLabel(m.status), colorClass: getMissionStatusColor(m.status) },
  }));
}

export function entitiesToRelatedItems(entities: Entity[]): RelatedItem[] {
  return entities.map(e => ({
    href: `/entities/${e.slug}`,
    title: e.shortName || e.name,
    subtitle: getEntityTypeLabel(e.type),
  }));
}

export function infrastructureToRelatedItems(projects: InfrastructureProject[]): RelatedItem[] {
  return projects.map(p => ({
    href: `/infrastructure/${p.slug}`,
    title: p.name,
    subtitle: p.category?.replace("-", " ") || p.type.replace("-", " "),
  }));
}
