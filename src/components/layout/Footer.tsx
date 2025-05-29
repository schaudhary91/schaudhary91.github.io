import Link from 'next/link';
import { contactLinks } from '@/lib/data';
import { Button } from '@/components/ui/button';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted text-muted-foreground py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex justify-center space-x-4 mb-4">
          {contactLinks.filter(link => ['LinkedIn', 'GitHub', 'Email'].includes(link.label)).map((link) => (
            <Button key={link.label} variant="ghost" size="icon" asChild>
              <Link href={link.href} target="_blank" rel="noopener noreferrer" aria-label={link.label}>
                <link.icon className="h-6 w-6" />
              </Link>
            </Button>
          ))}
        </div>
        <p className="text-sm">
          &copy; {currentYear} Sandeep Chaudhary. All rights reserved.
        </p>
        <p className="text-xs mt-1">
          Built with Next.js and Tailwind CSS. Designed by sandeepchaudhary.com.
        </p>
      </div>
    </footer>
  );
}
