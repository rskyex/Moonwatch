interface PageHeaderProps {
  title: string;
  description?: string;
}

export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div className="relative border-b border-border pb-8 mb-10">
      {/* Subtle top glow */}
      <div
        className="pointer-events-none absolute -top-16 left-0 right-0 h-32"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 60% 100% at 30% 0%, var(--glow) 0%, transparent 70%)",
        }}
      />
      <div className="relative">
        <p className="text-[10px] font-medium tracking-[0.2em] uppercase text-muted/60 mb-3">
          Moonwatch
        </p>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">{title}</h1>
        {description && (
          <p className="mt-3 text-muted text-sm sm:text-base max-w-2xl leading-relaxed">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
