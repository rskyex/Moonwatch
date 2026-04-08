interface PageHeaderProps {
  title: string;
  description?: string;
}

export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div className="relative pt-8 pb-10 mb-12 border-b border-border/40">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-1 h-5 rounded-full bg-cold/30" />
        <span className="text-[10px] tracking-[0.2em] uppercase text-cold/60 font-medium">
          Moonwatch
        </span>
      </div>
      <h1 className="text-3xl sm:text-4xl font-light tracking-[-0.02em] leading-[0.95] text-foreground">
        {title}
      </h1>
      {description && (
        <p className="mt-4 text-muted text-[14px] max-w-lg leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
