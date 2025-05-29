"use client";
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

type AnimatedSectionProps = {
  children: ReactNode;
  className?: string; // Add a prop for className
  as?: keyof JSX.IntrinsicElements; // Add a prop to specify the element type
  id?: string;
  delay?: number; // delay in milliseconds
};
export function AnimatedSection({ children, className, as: Component = 'section', id, delay = 0 }: AnimatedSectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setIsVisible(true);
            }, delay);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 } // Trigger when 10% of the section is visible
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [delay]); // Add delay to the dependency array
  
  return (
    <Component
      ref={sectionRef}
      id={id}
      className={cn(
        'transition-all duration-700 ease-out',
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
        className
      )}
    >
      {children}
    </Component>
  );
}

