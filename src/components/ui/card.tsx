interface CardProps {
  className?: string;
  children: React.ReactNode;
}

export function Card({ className = "", children }: CardProps) {
  return (
    <div className={`depth-border corner-arch p-6 ${className}`}>
      {children}
    </div>
  );
}

export function CardHeader({ className = "", children }: CardProps) {
  return <div className={`mb-4 ${className}`}>{children}</div>;
}

export function CardContent({ className = "", children }: CardProps) {
  return <div className={className}>{children}</div>;
}

export function CardTitle({ className = "", children }: CardProps) {
  return (
    <h3 className={`display-serif text-lg font-semibold text-white ${className}`}>
      {children}
    </h3>
  );
}
