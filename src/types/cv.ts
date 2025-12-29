export interface Experience {
  position: string;
  company: string;
  period: string;
  description: string;
  technologies: string[];
}

export interface Education {
  degree: string;
  institution: string;
  period: string;
}

export interface Award {
  title: string;
  description: string;
}

export interface PersonalInfo {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  github: string;
  linkedin: string;
  instagram: string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  githubLink: string;
  liveLink: string;
  featured: boolean;
  type?: 'Full Stack' | 'Frontend' | 'Backend' | 'Mobile' | 'DevOps' | 'AI/ML';
}

export interface Language {
  language: string;
  level: string;
}

export interface CVData {
  personalInfo: PersonalInfo;
  experience: Experience[];
  education: Education[];
  awards: Award[];
  certifications: string[];
  skills: Record<string, string[]>;
  projects: Project[];
  languages: Language[];
}