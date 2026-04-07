import Link from "next/link";

interface TagChipProps {
  label: string;
  href?: string;
}

export default function TagChip({ label, href }: TagChipProps) {
  const classes =
    "inline-flex items-center rounded px-2 py-0.5 text-[11px] text-muted/80 bg-surface-alt border border-border/50 hover:text-foreground hover:border-border transition-colors";

  if (href) {
    return (
      <Link href={href} className={classes}>
        {label}
      </Link>
    );
  }

  return <span className={classes}>{label}</span>;
}
