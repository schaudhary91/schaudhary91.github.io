import { cn } from '@/lib/utils';
import type React from 'react';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export function Container({ children, className, id }: ContainerProps) {
  return (
    <div id={id} className={cn('container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20', className)}>
      {children}
    </div>
  );
}
