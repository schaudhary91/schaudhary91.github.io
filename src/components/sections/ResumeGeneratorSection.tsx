import { Container } from '@/components/ui/container';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { ResumeGeneratorForm } from '@/components/ResumeGeneratorForm';

export function ResumeGeneratorSection() {
  return (
    <Container id="resume-generator" className="bg-background">
      <SectionTitle subtitle="Leverage AI to craft the perfect intro for your resume.">
        Tailor Your Summary
      </SectionTitle>
      <ResumeGeneratorForm />
    </Container>
  );
}
