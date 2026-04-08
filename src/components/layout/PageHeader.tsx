interface PageHeaderProps {
  title: string;
  description?: string;
}

export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div className="pb-8 mb-10">
      <h1 className="text-3xl sm:text-4xl font-light tracking-[-0.02em]">{title}</h1>
      {description && (
        <p className="mt-3 text-muted text-[14px] max-w-xl leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
