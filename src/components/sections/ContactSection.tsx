import { Container } from '@/components/ui/container';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { contactLinks } from '@/lib/data';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export function ContactSection() {
  return (
    <Container id="contact" className="bg-muted/50">
      <SectionTitle subtitle="Let's connect and discuss how I can contribute to your team.">
        Get In Touch
      </SectionTitle>
      <div className="max-w-2xl mx-auto">
        <Card className="shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Reach Out</CardTitle>
            <CardDescription>
              I&apos;m always open to new opportunities and collaborations.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-6">
            <p className="text-center text-foreground/80">
              Feel free to connect with me through any of the platforms below, or download my resume for a more detailed overview of my experience.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {contactLinks.map((link) => (
                <Button key={link.label} variant="outline" size="lg" asChild className="shadow hover:shadow-md transition-shadow">
                  <Link href={link.href} target={link.label === 'Email' ? '_self' : '_blank'} rel="noopener noreferrer">
                    <link.icon className="mr-2 h-5 w-5" />
                    {link.label}
                  </Link>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Container>
  );
}
