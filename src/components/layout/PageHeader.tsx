interface PageHeaderProps {
  title: string;
  description?: string;
}

export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div className="relative pt-8 pb-10 mb-12 border-b border-border">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-1.5 h-5 rounded-full bg-cold/40" />
        <span className="text-[11px] tracking-[0.15em] uppercase text-cold/70 font-medium">
          Moonwatch
        </span>
      </div>
      <h1 className="text-3xl sm:text-4xl font-bold tracking-[-0.02em] leading-[0.95] text-white">
        {title}
      </h1>
      {description && (
        <p className="mt-4 text-foreground text-[15px] max-w-lg leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
