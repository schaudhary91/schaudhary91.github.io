
"use client";
import Link from 'next/link';
import { useState, useEffect, type MouseEvent } from 'react';
import { navLinks } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Menu, X, Briefcase } from 'lucide-react'; // Using Briefcase as a placeholder logo
import { cn } from '@/lib/utils';
import NProgress from 'nprogress';
import { useRouter, usePathname } from 'next/navigation';

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      let currentSectionId = '';
      // Check which section is in view
      navLinks.forEach(link => {
        if (link.href.startsWith('/#')) {
          const sectionId = link.href.substring(2); // remove /#
          const sectionElement = document.getElementById(sectionId);
          if (sectionElement) {
            const rect = sectionElement.getBoundingClientRect();
            if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
              currentSectionId = sectionId;
            }
          }
        }
      });
      if (currentSectionId) {
        setActiveSection(currentSectionId);
      } else if (pathname === '/') {
         // If no section is explicitly in the middle, but we are on the homepage,
         // 'home' could be considered active if at the top.
         // For simplicity, if at top and on home, set home section.
         if (window.scrollY < window.innerHeight / 2) {
            setActiveSection('home');
         }
      } else {
        setActiveSection(''); // Clear if not on a section or not on home page
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Call on mount

    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]); // Re-run on pathname change

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLinkClick = (href: string, e: MouseEvent<HTMLAnchorElement>) => {
    NProgress.start();
    setIsOpen(false);

    if (href.startsWith('/#')) {
      const sectionId = href.substring(2);
      setActiveSection(sectionId); // Optimistically set active section

      if (pathname === '/') { // If already on the homepage
        e.preventDefault(); // Prevent NextLink's default behavior for same-page hash
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
          // Update URL without full page reload, for better UX and back button behavior
          window.history.pushState(null, '', href);
        }
        NProgress.done(); // Stop progress bar for same-page smooth scroll
        return; // Important: stop further processing by NextLink if we handled it
      }
      // If not on homepage, let NextLink handle navigation to /#sectionId
      // TopProgressBar will call NProgress.done() after page load
    }
    // For full page links like /blog, NextLink handles it.
    // TopProgressBar will call NProgress.done() after page load.
  };
  
  const handleLogoClick = (e: MouseEvent<HTMLAnchorElement>) => {
    NProgress.start();
    setActiveSection('home');
     if (pathname === '/') {
        e.preventDefault();
        const element = document.getElementById('home');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
          window.history.pushState(null, '', '/#home');
        }
        NProgress.done();
     } else {
        router.push('/#home');
     }
  };


  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      isScrolled ? "bg-card/90 shadow-lg backdrop-blur-md" : "bg-transparent"
    )}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/#home" onClick={handleLogoClick} className="flex items-center text-primary hover:text-accent transition-colors">
            <Briefcase className="h-8 w-8" />
          </Link>

          <nav className="hidden md:flex space-x-1">
            {navLinks.map((link) => {
              const sectionNameFromHref = link.href.startsWith('/#') ? link.href.substring(2) : null;
              const isBlogActive = link.href === '/blog' && (pathname === '/blog' || pathname.startsWith('/blog/'));
              const isSectionActive = sectionNameFromHref && activeSection === sectionNameFromHref && pathname === '/';
              const isLinkActive = isBlogActive || isSectionActive;

              return (
                <Link key={link.label} href={link.href} passHref legacyBehavior>
                  <a
                    onClick={(e) => handleLinkClick(link.href, e)}
                    className={cn(
                      "px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-accent/10 hover:text-accent",
                      isLinkActive
                        ? "text-accent font-semibold" 
                        : "text-foreground/80"
                    )}
                  >
                    {link.label}
                  </a>
                </Link>
              );
            })}
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
            {navLinks.map((link) => {
               const sectionNameFromHref = link.href.startsWith('/#') ? link.href.substring(2) : null;
               const isBlogActive = link.href === '/blog' && (pathname === '/blog' || pathname.startsWith('/blog/'));
               const isSectionActive = sectionNameFromHref && activeSection === sectionNameFromHref && pathname === '/';
               const isLinkActive = isBlogActive || isSectionActive;

              return (
                <Link key={link.label} href={link.href} passHref legacyBehavior>
                  <a
                    onClick={(e) => handleLinkClick(link.href, e)}
                    className={cn(
                      "block px-3 py-2 rounded-md text-base font-medium transition-colors hover:bg-accent/10 hover:text-accent",
                      isLinkActive
                        ? "text-accent bg-accent/5" 
                        : "text-foreground/80"
                    )}
                  >
                    {link.label}
                  </a>
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
