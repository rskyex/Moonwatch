import Link from "next/link";

interface SectionHeadingProps {
  title: string;
  viewAllHref?: string;
  viewAllLabel?: string;
}

export default function SectionHeading({
  title,
  viewAllHref,
  viewAllLabel = "View all",
}: SectionHeadingProps) {
  return (
    <div className="flex items-center justify-between pb-3 border-b border-border/60">
      <div className="flex items-center gap-3">
        <div className="w-1 h-4 rounded-full bg-cold/30" />
        <h2 className="text-[13px] font-semibold tracking-wide text-foreground">
          {title}
        </h2>
      </div>
      {viewAllHref && (
        <Link
          href={viewAllHref}
          className="text-[11px] text-muted hover:text-cold transition-colors"
        >
          {viewAllLabel} &rarr;
        </Link>
      )}
    </div>
  );
}
