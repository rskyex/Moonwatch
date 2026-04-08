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
    <div className="flex items-center justify-between border-b border-border pb-2">
      <div className="flex items-center gap-2">
        <span className="w-1 h-3 bg-cold/30 rounded-[1px]" />
        <h2 className="text-[10px] font-mono font-medium tracking-[0.25em] uppercase text-cold/70">
          {title}
        </h2>
      </div>
      {viewAllHref && (
        <Link
          href={viewAllHref}
          className="text-[9px] font-mono text-dim hover:text-cold/60 transition-colors tracking-[0.15em] uppercase"
        >
          {viewAllLabel} &rarr;
        </Link>
      )}
    </div>
  );
}
