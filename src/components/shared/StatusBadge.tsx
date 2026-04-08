interface StatusBadgeProps {
  label: string;
  colorClass?: string;
}

export default function StatusBadge({ label, colorClass = "text-muted" }: StatusBadgeProps) {
  return (
    <span className={`inline-flex items-center gap-1.5 text-[10px] font-medium tracking-wide ${colorClass}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70" />
      {label}
    </span>
  );
}
