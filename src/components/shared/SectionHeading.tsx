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
    <div className="flex items-center justify-between pb-3 border-b border-border">
      <div className="flex items-center gap-3">
        <div className="w-1.5 h-5 rounded-full bg-cold/40" />
        <h2 className="text-[14px] font-semibold tracking-wide text-white">
          {title}
        </h2>
      </div>
      {viewAllHref && (
        <Link
          href={viewAllHref}
          className="text-[12px] text-cold/70 hover:text-cold transition-colors"
        >
          {viewAllLabel} &rarr;
        </Link>
      )}
    </div>
  );
}
