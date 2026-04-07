interface PageHeaderProps {
  title: string;
  description?: string;
}

export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div className="border-b border-border pb-6 mb-8">
      <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">{title}</h1>
      {description && (
        <p className="mt-2 text-muted text-sm sm:text-base max-w-2xl">{description}</p>
      )}
    </div>
  );
}
