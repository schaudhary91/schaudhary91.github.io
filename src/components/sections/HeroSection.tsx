import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { ArrowDown, FileText, Mail } from 'lucide-react'; 
import Link from 'next/link';
import Image from 'next/image';

export function HeroSection() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted to-background text-center overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        {/* You can add a subtle background pattern or image here if desired */}
        {/* Example: <Image src="/path/to/pattern.svg" layout="fill" objectFit="cover" alt="Background pattern" /> */}
      </div>
      <Container className="relative z-10 !py-0">
        <div className="max-w-3xl mx-auto">
          <Image 
            src="/images/profile-image.JPG" 
            alt="Sandeep Chaudhary profile picture" 
            width={150} 
            height={150} 
            className="rounded-full mx-auto mb-8 shadow-xl border-4 border-accent"
            data-ai-hint="profile picture" 
          />
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">
            <span className="block text-primary">Hello, I&apos;m Sandeep Chaudhary</span>
            <span className="block text-accent mt-2 sm:mt-3">UX Engineering Manager</span>
          </h1>
          <p className="mt-6 max-w-xl mx-auto text-lg sm:text-xl text-foreground/80">
            Crafting seamless digital experiences and leading innovative teams to build impactful, user-centric web solutions.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
            <Button size="lg" asChild className="shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
              <Link href="#contact">
                Get in Touch <Mail className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild className="shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
              <Link href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                Download CV <FileText className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </Container>
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden sm:block">
        <ArrowDown className="h-8 w-8 text-primary/50 animate-bounce" />
      </div>
    </section>
  );
}
