
"use client";
import { useEffect, useRef, useState, type ReactNode, type ComponentPropsWithoutRef, type ElementRef } from 'react';
import { cn } from '@/lib/utils';

// Use keyof JSX.IntrinsicElements for C to represent valid HTML/SVG tag names.
// Default to 'section' if 'as' prop is not provided.
type AnimatedSectionProps<C extends keyof JSX.IntrinsicElements = 'section'> = {
  children: ReactNode;
  className?: string;
  as?: C; // The 'as' prop determines the HTML element type to render.
  id?: string;
  delay?: number; // delay in milliseconds
} & Omit<ComponentPropsWithoutRef<C>, 'as' | 'children' | 'className' | 'id' | 'delay'>; // Allow passing other valid props for the element type C.


export function AnimatedSection<C extends keyof JSX.IntrinsicElements = 'section'>({
  children,
  className,
  as, // 'as' prop value (e.g., 'div', 'article')
  id,
  delay = 0,
  ...props // Capture any other props to pass to the underlying element
}: AnimatedSectionProps<C>) {
  const [isVisible, setIsVisible] = useState(false);
  // The ref's type (ElementRef<C>) will now correctly match the element type C.
  // For example, if C is 'div', sectionRef will be RefObject<HTMLDivElement>.
  // If C is 'svg', sectionRef will be RefObject<SVGSVGElement>.
  const sectionRef = useRef<ElementRef<C>>(null);
  
  // Determine the component to render. If 'as' is provided, use it, otherwise default to 'section'.
  // The type of ComponentToRender will be C (e.g., 'div', 'section', 'symbol').
  const ComponentToRender = as || 'section';

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
      if (currentRef instanceof Element) observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
 if (currentRef instanceof Element) observer.unobserve(currentRef);
      }
    };
  }, [delay]); // Add delay to the dependency array
  
  return (
    <ComponentToRender
      ref={sectionRef} // The ref is now correctly typed for ComponentToRender
      id={id}
      className={cn(
        'transition-all duration-700 ease-out',
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
        className
      )}
      {...props} // Spread the rest of the props onto the element
    >
      {children}
    </ComponentToRender>
  );
}
