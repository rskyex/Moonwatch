import Link from "next/link";

interface TagChipProps {
  label: string;
  href?: string;
}

export default function TagChip({ label, href }: TagChipProps) {
  const classes =
    "inline-flex items-center rounded-full bg-surface-alt px-2.5 py-0.5 text-xs text-muted hover:text-foreground transition";

  if (href) {
    return (
      <Link href={href} className={classes}>
        {label}
      </Link>
    );
  }

  return <span className={classes}>{label}</span>;
}
