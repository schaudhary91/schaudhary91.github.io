import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/sections/HeroSection';
import { OverviewSection } from '@/components/sections/OverviewSection';
import { ExperienceSection } from '@/components/sections/ExperienceSection';
import { EducationSection } from '@/components/sections/EducationSection';
import { SkillsSection } from '@/components/sections/SkillsSection';
import { ResumeGeneratorSection } from '@/components/sections/ResumeGeneratorSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { AnimatedSection } from '@/components/AnimatedSection';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <HeroSection /> 
        {/* Hero section is usually above the fold, so direct animation might be jarring.
            If AnimatedSection is used, it should be for content within it.
            For this example, HeroSection manages its own entry.
        */}
        
        <AnimatedSection as="div" id="overview-wrapper">
          <OverviewSection />
        </AnimatedSection>
        
        <AnimatedSection as="div" id="experience-wrapper" delay={100}>
          <ExperienceSection />
        </AnimatedSection>
        
        <AnimatedSection as="div" id="education-wrapper" delay={200}>
          <EducationSection />
        </AnimatedSection>
        
        <AnimatedSection as="div" id="skills-wrapper" delay={300}>
          <SkillsSection />
        </AnimatedSection>
        
        <AnimatedSection as="div" id="resume-generator-wrapper" delay={400}>
          <ResumeGeneratorSection />
        </AnimatedSection>
        
        <AnimatedSection as="div" id="contact-wrapper" delay={500}>
          <ContactSection />
        </AnimatedSection>
      </main>
      <Footer />
    </div>
  );
}
