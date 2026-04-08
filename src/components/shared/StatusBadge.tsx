interface StatusBadgeProps {
  label: string;
  colorClass?: string;
}

export default function StatusBadge({ label, colorClass = "text-foreground" }: StatusBadgeProps) {
  return (
    <span className={`inline-flex items-center gap-1.5 text-[11px] font-semibold ${colorClass}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      {label}
    </span>
  );
}
