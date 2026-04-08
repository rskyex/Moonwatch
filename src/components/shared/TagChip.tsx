import Link from "next/link";

interface TagChipProps {
  label: string;
  href?: string;
}

export default function TagChip({ label, href }: TagChipProps) {
  const classes = "text-[11px] text-dim hover:text-muted transition-colors";

  if (href) {
    return <Link href={href} className={classes}>{label}</Link>;
  }

  return <span className={classes}>{label}</span>;
}
