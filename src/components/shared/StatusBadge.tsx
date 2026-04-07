interface StatusBadgeProps {
  label: string;
  colorClass?: string;
}

export default function StatusBadge({ label, colorClass = "text-muted" }: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full bg-foreground/5 px-2.5 py-0.5 text-xs font-medium ${colorClass}`}
    >
      {label}
    </span>
  );
}
