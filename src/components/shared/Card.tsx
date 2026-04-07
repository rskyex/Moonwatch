import Link from "next/link";

interface CardProps {
  children: React.ReactNode;
  href?: string;
  className?: string;
}

export default function Card({ children, href, className = "" }: CardProps) {
  const baseClasses = `relative bg-surface border border-border rounded-lg p-5 transition-all duration-200 hover:border-accent/20 hover:shadow-[0_0_20px_var(--glow)] ${className}`;

  if (href) {
    return (
      <Link href={href} className={`block ${baseClasses}`}>
        {children}
      </Link>
    );
  }

  return <div className={baseClasses}>{children}</div>;
}
