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
    <div className="flex items-center justify-between">
      <h2 className="text-xs font-medium tracking-[0.15em] uppercase text-muted">
        {title}
      </h2>
      {viewAllHref && (
        <Link
          href={viewAllHref}
          className="text-xs text-accent/70 hover:text-accent transition-colors tracking-wide"
        >
          {viewAllLabel} &rarr;
        </Link>
      )}
    </div>
  );
}
