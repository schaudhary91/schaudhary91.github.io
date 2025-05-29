import { cn } from '@/lib/utils';

interface SectionTitleProps {
  children: React.ReactNode;
  className?: string;
  subtitle?: string;
}

export function SectionTitle({ children, className, subtitle }: SectionTitleProps) {
  return (
    <div className="mb-12 text-center">
      <h2 className={cn('text-3xl sm:text-4xl font-bold text-primary tracking-tight', className)}>
        {children}
      </h2>
      {subtitle && <p className="mt-2 text-lg text-muted-foreground">{subtitle}</p>}
    </div>
  );
}
