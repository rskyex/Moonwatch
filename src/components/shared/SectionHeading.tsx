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
    <div className="flex items-baseline justify-between">
      <h2 className="text-[11px] font-medium tracking-[0.2em] uppercase text-dim">
        {title}
      </h2>
      {viewAllHref && (
        <Link
          href={viewAllHref}
          className="text-[11px] text-dim hover:text-foreground transition-colors"
        >
          {viewAllLabel} &rarr;
        </Link>
      )}
    </div>
  );
}
