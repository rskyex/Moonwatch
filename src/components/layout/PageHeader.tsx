interface PageHeaderProps {
  title: string;
  description?: string;
}

export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div className="relative pt-8 pb-12 mb-12">
      {/* Subtle top glow */}
      <div
        className="pointer-events-none absolute -top-20 left-0 right-0 h-40"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 60% 100% at 20% 0%, var(--glow) 0%, transparent 70%)",
        }}
      />
      <div className="relative">
        <h1 className="text-4xl sm:text-5xl font-extralight tracking-[-0.03em] leading-[0.95]">
          {title}
        </h1>
        {description && (
          <p className="mt-4 text-muted text-[14px] max-w-lg leading-relaxed font-light">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
