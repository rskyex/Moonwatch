import Link from "next/link";

interface CardProps {
  children: React.ReactNode;
  href?: string;
  className?: string;
}

export default function Card({ children, href, className = "" }: CardProps) {
  const baseClasses = `relative bg-surface border border-border rounded-lg p-5 transition-all duration-200 hover:border-cold/25 hover:shadow-[0_0_30px_rgba(34,211,238,0.06)] ${className}`;

  if (href) {
    return (
      <Link href={href} className={`block ${baseClasses}`}>
        {children}
      </Link>
    );
  }

  return <div className={baseClasses}>{children}</div>;
}
