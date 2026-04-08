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
      <div className="flex items-center gap-3">
        <div className="w-0.5 h-0.5 rounded-full bg-cold/40" />
        <h2 className="text-[10px] font-medium tracking-[0.3em] uppercase text-dim">
          {title}
        </h2>
      </div>
      {viewAllHref && (
        <Link
          href={viewAllHref}
          className="text-[10px] text-dim/60 hover:text-muted transition-colors tracking-wider"
        >
          {viewAllLabel} &rarr;
        </Link>
      )}
    </div>
  );
}
