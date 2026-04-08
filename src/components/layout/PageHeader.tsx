interface PageHeaderProps {
  title: string;
  description?: string;
}

export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div className="relative pt-6 pb-10 mb-10 border-b border-border/50">
      <div className="relative">
        <div className="flex items-center gap-2 mb-4">
          <span className="w-1 h-3 bg-cold/25 rounded-[1px]" />
          <span className="text-[9px] font-mono tracking-[0.3em] uppercase text-cold/50">
            Moonwatch
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-sans font-extralight tracking-[-0.02em] leading-[0.95]">
          {title}
        </h1>
        {description && (
          <p className="mt-3 text-muted text-[12px] font-mono max-w-lg leading-relaxed">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
