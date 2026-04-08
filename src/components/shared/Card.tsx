import Link from "next/link";

interface CardProps {
  children: React.ReactNode;
  href?: string;
  className?: string;
}

export default function Card({ children, href, className = "" }: CardProps) {
  const baseClasses = `relative bg-surface/50 border border-border/50 rounded p-5 transition-all duration-200 hover:bg-surface hover:border-border ${className}`;

  if (href) {
    return (
      <Link href={href} className={`block ${baseClasses}`}>
        {children}
      </Link>
    );
  }

  return <div className={baseClasses}>{children}</div>;
}
