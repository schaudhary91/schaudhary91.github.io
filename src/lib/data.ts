import type { EducationItem, ExperienceItem, SkillItem, NavLinkItem, ContactLinkItem } from './types';
import { Briefcase, GraduationCap, Code, Zap, Users, TrendingUp, Linkedin, Mail, FileText, Lightbulb, Settings, BarChartBig, Palette, Server, Cloud, Database, TestTube2, PenTool } from 'lucide-react';

export const navLinks: NavLinkItem[] = [
  { href: '#home', label: 'Home' },
  { href: '#overview', label: 'Overview' },
  { href: '#experience', label: 'Experience' },
  { href: '#education', label: 'Education' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contact' },
];

export const educationData: EducationItem[] = [
  {
    degree: 'Project Management Principles and Practices',
    uni: 'University of California, Irvine on Coursera',
    year: '2018',
    logo: 'https://placehold.co/40x40.png',
    dataAiHint: 'university logo'
  },
  {
    degree: 'Diploma in Advanced Computing',
    uni: 'Centre for Development of Advanced Computing (C-DAC)',
    year: '2008',
    logo: 'https://placehold.co/40x40.png',
    dataAiHint: 'institute logo'
  },
  {
    degree: 'B.Tech, Information Technology',
    uni: 'Krishna Institute of Engineering & Technology',
    year: '2003 - 2007',
    logo: 'https://placehold.co/40x40.png',
    dataAiHint: 'college logo'
  },
];

export const experienceData: ExperienceItem[] = [
  {
    company: 'Google',
    position: 'Manager II, UX / UI Engineering',
    duration: 'Jun, 2024 – Present',
    summary: 'Managing Ads Central UX Engineering teams with a focus on accessibility and Quantitative user research infrastructure.',
    logo: 'https://placehold.co/48x48.png',
    dataAiHint: 'Google logo'
  },
  {
    company: 'Google',
    position: 'Technical Lead Manager',
    duration: 'Nov, 2020 – Jun, 2024',
    summary: "Set and communicate team priorities that support the broader organization's goals. Align strategy, processes, and decision-making across teams. Set clear expectations with individuals based on their level and role. Meet regularly with individuals to discuss performance and development and provide feedback and coaching. Oversee systems designs within the scope of the broader area, and review product or system development code to solve ambiguous problems.",
    logo: 'https://placehold.co/48x48.png',
    dataAiHint: 'Google logo'
  },
  {
    company: 'LinkedIn',
    position: 'Staff Software Engineer - Frontend',
    duration: 'Apr, 2015 – Nov, 2020',
    summary: 'Own the front-end development for one or more of LinkedIn products lead key tracks/ teams and mentor team members, collaborate with visual/interaction designers, other engineers, and product managers to launch new products, iterate on existing features, and build a world-class user experience. Make the site delightful, secure, performant and accessible to all our members. Implement cutting-edge technologies and write state-of-the-art code to keep LinkedIn at the cutting edge of current technology.',
    logo: 'https://placehold.co/48x48.png',
    dataAiHint: 'LinkedIn logo'
  },
  {
    company: 'Sapient Global Markets',
    position: 'Senior Interactive Developer L2',
    duration: 'Sep, 2012 – Apr, 2015',
    summary: 'Responsible for leading key tracks/ teams and mentoring team members in key AJAX/Interactive technologies. This includes estimating and planning components to be delivered and following current Sapient development methodologies (SA3)',
    logo: 'https://placehold.co/48x48.png',
    dataAiHint: 'Sapient logo'
  },
  {
    company: 'Pubmatic',
    position: 'Senior Software Engineer',
    duration: 'Jan, 2012 – Sep, 2012',
    summary: 'Lead the track for creation of JavaScript UI Base Framework based on Scalable JavaScript application architecture.',
    logo: 'https://placehold.co/48x48.png',
    dataAiHint: 'Pubmatic logo'
  },
  {
    company: 'Cybage',
    position: 'Senior Software Engineer',
    duration: 'Sep, 2008 – Dec, 2011',
    summary: 'Build ecommerce websites using CSS, HTML, JavaScript, jQuery, AJAX, JSP and XML/XSL. Implement AB tests for site optimization purposes.',
    logo: 'https://placehold.co/48x48.png',
    dataAiHint: 'Cybage logo'
  },
];

export const skillsData: SkillItem[] = [
  { skill: 'Project Management', icon: Briefcase, level: 90 },
  { skill: 'Organizational leadership', icon: Users, level: 85 },
  { skill: 'Agile Methodologies', icon: Zap, level: 95 },
  { skill: 'JavaScript', icon: Code, level: 95 },
  { skill: 'TypeScript', icon: Code, level: 90 },
  { skill: 'React', icon: Code, level: 90 },
  { skill: 'Next.js', icon: Code, level: 85 },
  { skill: 'Node.js', icon: Server, level: 80 },
  { skill: 'CSS', icon: Palette, level: 90 },
  { skill: 'HTML', icon: Code, level: 95 },
  { skill: 'UI/UX Design', icon: PenTool, level: 75 },
  { skill: 'Web Applications', icon: Settings, level: 95 },
  { skill: 'Responsive Web Design', icon: BarChartBig, level: 90 },
  { skill: 'Ember.js', icon: Code, level: 70 },
  { skill: 'Angular.js', icon: Code, level: 70 },
  { skill: 'Backbone.js', icon: Code, level: 65 },
  { skill: 'Accessibility (A11Y)', icon: Lightbulb, level: 85 },
  { skill: 'Performance Optimization', icon: TrendingUp, level: 88 },
  { skill: 'API Design', icon: Server, level: 78 },
  { skill: 'Databases (SQL/NoSQL)', icon: Database, level: 70 },
  { skill: 'Cloud Platforms (GCP/AWS)', icon: Cloud, level: 75 },
  { skill: 'Testing Frameworks', icon: TestTube2, level: 82 },
];

export const contactLinks: ContactLinkItem[] = [
  { href: 'mailto:sachaudhary91@gmail.com', label: 'Email', icon: Mail },
  { href: 'https://linkedin.com/in/sandeepchaudhary', label: 'LinkedIn', icon: Linkedin },
  { href: '/resume.pdf', label: 'Resume (PDF)', icon: FileText }, // Assuming a resume PDF is in public folder
];

export const overviewContent = {
  title: "A Bit About Me",
  paragraphs: [
    "Hello! I'm Sandeep Chaudhary, a passionate and results-oriented UX Engineering Manager with over 15+ years of experience in building and leading high-performing teams to deliver exceptional user experiences. My expertise lies at the intersection of cutting-edge frontend technologies, user-centric design, and effective project management.",
    "Throughout my career at companies like Google and LinkedIn, I've been instrumental in developing scalable web applications, championing accessibility, and fostering collaborative environments. I thrive on solving complex problems and translating product visions into tangible, delightful digital products.",
    "I'm driven by a continuous learning mindset and a commitment to leveraging technology to create impactful solutions. When I'm not immersed in code or strategy, I enjoy [Your Hobby 1] and [Your Hobby 2]."
  ],
  imageUrl: "https://placehold.co/300x300.png",
  imageAlt: "A professional photo of Sandeep Chaudhary",
  dataAiHint: "professional portrait"
};
