import type { LucideIcon } from 'lucide-react';

export interface NavLinkItem {
  href: string;
  label: string;
}

export interface EducationItem {
  degree: string;
  uni: string;
  year: string;
  logo?: string;
  dataAiHint?: string;
}

export interface ExperienceItem {
  company: string;
  position: string;
  duration: string;
  summary: string;
  logo?: string;
  dataAiHint?: string;
}

export interface SkillItem {
  skill: string;
  description?: string;
  icon?: LucideIcon;
  level?: number; // Optional: for skill proficiency, e.g., 1-5 or 1-100 for progress bar
}

export interface ContactLinkItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

export interface BlogPost {
  slug: string;
  title: string;
  date: string; // Store as string, format in component
  author: string;
  summary: string;
  coverImage?: string;
  coverImageAlt?: string;
  dataAiHint?: string;
  tags?: string[];
  contentHtml?: string; // For individual post, generated from markdown
}
