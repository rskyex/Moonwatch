import Link from "next/link";

interface CardProps {
  children: React.ReactNode;
  href?: string;
  className?: string;
}

export default function Card({ children, href, className = "" }: CardProps) {
  const baseClasses = `relative bg-surface border border-border rounded-sm p-4 transition-all duration-150 hover:border-cold/20 hover:bg-surface-alt ${className}`;

  if (href) {
    return (
      <Link href={href} className={`block ${baseClasses}`}>
        {/* Corner accents — instrument panel feel */}
        <span className="absolute top-0 left-0 w-2 h-px bg-cold/20" />
        <span className="absolute top-0 left-0 w-px h-2 bg-cold/20" />
        {children}
      </Link>
    );
  }

  return (
    <div className={baseClasses}>
      <span className="absolute top-0 left-0 w-2 h-px bg-cold/20" />
      <span className="absolute top-0 left-0 w-px h-2 bg-cold/20" />
      {children}
    </div>
  );
}
