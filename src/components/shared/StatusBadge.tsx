interface StatusBadgeProps {
  label: string;
  colorClass?: string;
}

export default function StatusBadge({ label, colorClass = "text-muted" }: StatusBadgeProps) {
  return (
    <span className={`inline-flex items-center text-[11px] font-medium ${colorClass}`}>
      {label}
    </span>
  );
}
