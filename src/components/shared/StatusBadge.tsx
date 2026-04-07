interface StatusBadgeProps {
  label: string;
  colorClass?: string;
}

export default function StatusBadge({ label, colorClass = "text-muted" }: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-medium tracking-wide border border-current/10 ${colorClass}`}
      style={{ backgroundColor: "color-mix(in srgb, currentColor 8%, transparent)" }}
    >
      {label}
    </span>
  );
}
