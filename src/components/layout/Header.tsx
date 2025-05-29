"use client";
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { navLinks } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Menu, X, Briefcase } from 'lucide-react'; // Using Briefcase as a placeholder logo
import { cn } from '@/lib/utils';

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      let currentSection = '';
      navLinks.forEach(link => {
        const sectionId = link.href.substring(1); // remove #
        const sectionElement = document.getElementById(sectionId);
        if (sectionElement) {
          const rect = sectionElement.getBoundingClientRect();
          // Check if section is in viewport (top is above half screen, bottom is below half screen)
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            currentSection = sectionId;
          }
        }
      });
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Call on mount to set initial active section

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      isScrolled ? "bg-card/90 shadow-lg backdrop-blur-md" : "bg-transparent"
    )}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="#home" className="flex items-center text-primary hover:text-accent transition-colors">
            <Briefcase className="h-8 w-8" />
          </Link>

          <nav className="hidden md:flex space-x-1">
            {navLinks.map((link) => (
              <Link key={link.label} href={link.href} passHref legacyBehavior>
                <a
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-accent/10 hover:text-accent",
                    activeSection === link.href.substring(1) ? "text-accent font-semibold" : "text-foreground/80"
                  )}
                >
                  {link.label}
                </a>
              </Link>
            ))}
          </nav>

          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={toggleMenu} aria-label="Toggle menu">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-card shadow-lg">
          <nav className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link key={link.label} href={link.href} passHref legacyBehavior>
                <a
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "block px-3 py-2 rounded-md text-base font-medium transition-colors hover:bg-accent/10 hover:text-accent",
                     activeSection === link.href.substring(1) ? "text-accent bg-accent/5" : "text-foreground/80"
                  )}
                >
                  {link.label}
                </a>
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
