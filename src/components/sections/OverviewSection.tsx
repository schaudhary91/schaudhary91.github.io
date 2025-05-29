import { Container } from '@/components/ui/container';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { overviewContent } from '@/lib/data';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';

export function OverviewSection() {
  return (
    <Container id="overview">
      <SectionTitle>{overviewContent.title}</SectionTitle>
      <Card className="overflow-hidden shadow-xl">
        <div className="md:flex">
          <div className="md:w-1/3 md:shrink-0">
            <Image
              src={overviewContent.imageUrl}
              alt={overviewContent.imageAlt}
              width={400}
              height={400}
              className="h-full w-full object-cover"
              data-ai-hint={overviewContent.dataAiHint}
            />
          </div>
          <CardContent className="p-6 sm:p-8 md:w-2/3">
            {overviewContent.paragraphs.map((paragraph, index) => (
              <p key={index} className="text-foreground/80 mb-4 last:mb-0 leading-relaxed">
                {paragraph.replace("[Your Name]", "Your Name").replace("[Number]", "15+")} 
                {/* Replace placeholders with actual data or make them dynamic */}
              </p>
            ))}
          </CardContent>
        </div>
      </Card>
    </Container>
  );
}
