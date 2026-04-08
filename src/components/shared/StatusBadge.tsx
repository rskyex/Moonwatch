interface StatusBadgeProps {
  label: string;
  colorClass?: string;
}

export default function StatusBadge({ label, colorClass = "text-muted" }: StatusBadgeProps) {
  return (
    <span className={`inline-flex items-center gap-1.5 text-[9px] font-mono font-medium tracking-[0.1em] uppercase ${colorClass}`}>
      <span className="w-1 h-1 rounded-full bg-current opacity-60" />
      {label}
    </span>
  );
}
