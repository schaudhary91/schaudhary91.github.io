import { Container } from '@/components/ui/container';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { educationData } from '@/lib/data';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { GraduationCap } from 'lucide-react';

export function EducationSection() {
  return (
    <Container id="education">
      <SectionTitle>Education</SectionTitle>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {educationData.map((edu, index) => (
          <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
            <CardHeader className="flex flex-row items-center gap-4">
              {edu.logo ? (
                <Image 
                  src={edu.logo} 
                  alt={`${edu.uni} logo`} 
                  width={40} 
                  height={40} 
                  className="rounded-full"
                  data-ai-hint={edu.dataAiHint || "education logo"}
                />
              ) : (
                <GraduationCap className="h-10 w-10 text-primary" />
              )}
              <div>
                <CardTitle className="text-lg leading-tight">{edu.degree}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-sm text-accent">{edu.uni}</p>
              <p className="text-sm text-muted-foreground mt-1">{edu.year}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </Container>
  );
}
