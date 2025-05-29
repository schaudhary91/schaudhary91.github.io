import { Container } from '@/components/ui/container';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { skillsData } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import type { SkillItem } from '@/lib/types';

export function SkillsSection() {
  // Categorize skills if needed, or display all
  // Example: Technical Skills, Soft Skills
  // For this example, all skills are shown together with progress bars

  return (
    <Container id="skills" className="bg-muted/50">
      <SectionTitle>Skills & Expertise</SectionTitle>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skillsData.map((skill, index) => (
          <SkillCard key={index} skill={skill} />
        ))}
      </div>
      
      <div className="mt-12">
        <h3 className="text-2xl font-semibold text-primary mb-6 text-center">Technologies & Tools</h3>
        <Card className="shadow-lg">
          <CardContent className="p-6">
            <div className="flex flex-wrap justify-center gap-3">
              {skillsData.map((skill, index) => (
                <Badge 
                  key={`${skill.skill}-${index}`} 
                  variant="secondary" 
                  className="px-4 py-2 text-sm hover:bg-accent hover:text-accent-foreground transition-colors cursor-default shadow"
                >
                  {skill.icon && <skill.icon className="mr-2 h-4 w-4" />}
                  {skill.skill}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Container>
  );
}

function SkillCard({ skill }: { skill: SkillItem }) {
  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-medium flex items-center">
            {skill.icon && <skill.icon className="mr-2 h-5 w-5 text-accent" />}
            {skill.skill}
          </CardTitle>
          {skill.level && (
            <span className="text-sm font-semibold text-primary">{skill.level}%</span>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {skill.level && (
          <Progress value={skill.level} className="h-2 w-full" aria-label={`${skill.skill} proficiency ${skill.level}%`} />
        )}
        {skill.description && (
          <p className="text-xs text-muted-foreground mt-2">{skill.description}</p>
        )}
      </CardContent>
    </Card>
  );
}
