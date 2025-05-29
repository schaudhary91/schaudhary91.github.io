import { Container } from '@/components/ui/container';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { experienceData } from '@/lib/data';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { Briefcase } from 'lucide-react';

export function ExperienceSection() {
  return (
    <Container id="experience" className="bg-muted/50">
      <SectionTitle>Work Experience</SectionTitle>
      <div className="relative space-y-12 before:absolute before:top-0 before:bottom-0 before:w-1 before:bg-border before:left-6 md:before:left-1/2 md:before:-translate-x-1/2">
        {experienceData.map((job, index) => (
          <div key={index} className="relative flex items-start md:space-x-6">
            <div className="hidden md:block md:w-1/2 md:text-right">
              {index % 2 === 0 && (
                 <JobCard job={job} index={index} alignment="right"/>
              )}
            </div>
            <div className="absolute top-1 left-6 w-3 h-3 bg-primary rounded-full transform -translate-x-1/2 border-4 border-background md:left-1/2 md:top-6"></div>
             <div className="md:hidden w-full ml-12">
               <JobCard job={job} index={index} alignment="left"/>
            </div>
            <div className="hidden md:block md:w-1/2">
              {index % 2 !== 0 && (
                <JobCard job={job} index={index} alignment="left"/>
              )}
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
}

function JobCard({ job, index, alignment }: { job: (typeof experienceData)[0], index: number, alignment: 'left' | 'right' }) {
  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 w-full">
      <CardHeader className="flex flex-row items-start gap-4">
        {job.logo ? (
          <Image 
            src={job.logo} 
            alt={`${job.company} logo`} 
            width={48} 
            height={48} 
            className="rounded-lg"
            data-ai-hint={job.dataAiHint || "company logo"}
          />
        ) : (
          <Briefcase className="h-12 w-12 text-primary" />
        )}
        <div>
          <CardTitle className="text-xl">{job.position}</CardTitle>
          <CardDescription className="text-accent">{job.company} | {job.duration}</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-foreground/80 leading-relaxed" dangerouslySetInnerHTML={{ __html: job.summary }} />
      </CardContent>
    </Card>
  );
}
