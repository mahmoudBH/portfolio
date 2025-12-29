import { motion } from 'framer-motion';
import { ExternalLink, Github, Folder } from 'lucide-react';
import { getTechIcon } from '../../utils/techIcons';
import { PROJECT_TYPES } from '../constants/projects';

interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  githubLink: string;
  liveLink: string;
  featured: boolean;
  type?: keyof typeof PROJECT_TYPES;
}

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard = ({ project, index }: ProjectCardProps) => {
  const projectType = project.type || 'Full Stack';
  const typeConfig = PROJECT_TYPES[projectType] || PROJECT_TYPES['Full Stack'];

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -10 }}
      className={`group relative ${project.featured ? 'md:col-span-2' : ''}`}
    >
      {/* تأثير إشعاعي خلفي */}
      <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/5 via-transparent to-purple-500/5 rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
      
      <div className="glass-panel rounded-2xl overflow-hidden border border-neutral-800 hover:border-cyan-500/50 transition-all duration-500 relative z-10">
        <div className="p-8">
          <HeaderSection project={project} typeConfig={typeConfig} />
          
          <TechnologiesSection technologies={project.technologies} />
          
          <ProjectPreview featured={project.featured} />
        </div>
      </div>
    </motion.div>
  );
};

interface HeaderSectionProps {
  project: Project;
  typeConfig: typeof PROJECT_TYPES[keyof typeof PROJECT_TYPES];
}

const HeaderSection = ({ project, typeConfig }: HeaderSectionProps) => (
  <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 mb-8">
    <div className="flex items-start gap-4">
      <div className={`p-4 rounded-xl relative ${
        project.featured 
          ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20' 
          : 'bg-neutral-900/50'
      }`}>
        <Folder className={project.featured ? "text-cyan-400" : "text-neutral-400"} size={28} />
        {project.featured && (
          <div className="absolute -top-2 -right-2">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="text-yellow-400"
            >
              ⭐
            </motion.div>
          </div>
        )}
      </div>
      
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-3">
          <h3 className="text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors">
            {project.title}
          </h3>
          
          {/* Badge for project type */}
          <span className={`text-xs px-3 py-1.5 rounded-full ${typeConfig.color} border font-mono tracking-wider`}>
            {typeConfig.label}
          </span>
          
          {project.featured && (
            <motion.span 
              className="text-xs px-4 py-1.5 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-mono tracking-wider"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              FLAGSHIP_MISSION
            </motion.span>
          )}
        </div>
        <p className="text-neutral-400 font-mono text-sm leading-relaxed">
          <span className="text-cyan-400">//</span> {project.description}
        </p>
      </div>
    </div>
    
    <ActionButtons 
      githubLink={project.githubLink}
      liveLink={project.liveLink}
    />
  </div>
);

interface ActionButtonsProps {
  githubLink: string;
  liveLink: string;
}

const ActionButtons = ({ githubLink, liveLink }: ActionButtonsProps) => (
  <div className="flex gap-3">
    <motion.a
      href={githubLink}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`View ${githubLink.includes('github') ? 'GitHub repository' : 'source code'}`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="p-3 rounded-full glass-panel border border-neutral-800 hover:border-emerald-500/50 hover:bg-emerald-500/10 transition-all duration-300"
    >
      <Github size={20} className="text-neutral-300 hover:text-emerald-400 transition-colors" />
    </motion.a>
    
    <motion.a
      href={liveLink}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="View live project"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="p-3 rounded-full glass-panel border border-neutral-800 hover:border-primary-500/50 hover:bg-primary-500/10 transition-all duration-300"
    >
      <ExternalLink size={20} className="text-neutral-300 hover:text-primary-400 transition-colors" />
    </motion.a>
  </div>
);

interface TechnologiesSectionProps {
  technologies: string[];
}

const TechnologiesSection = ({ technologies }: TechnologiesSectionProps) => (
  <div className="mb-8">
    <div className="flex items-center gap-3 mb-4">
      <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
      <h4 className="text-sm font-medium text-cyan-300 font-mono tracking-wider">
        ORBITAL_SYSTEMS
      </h4>
    </div>
    <div className="flex flex-wrap gap-3">
      {technologies?.map((tech) => {
        const techIcon = getTechIcon(tech);
        return (
          <motion.div
            key={tech}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            whileHover={{ scale: 1.05, y: -2 }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-full glass-panel border border-neutral-800 hover:border-cyan-500/30 transition-all duration-300 group/tech cursor-help"
            title={techIcon.label}
          >
            <div className="flex-shrink-0">
              {techIcon.icon}
            </div>
            <span className="text-sm font-mono text-neutral-300 group-hover/tech:text-white transition-colors">
              {tech}
            </span>
          </motion.div>
        );
      })}
    </div>
  </div>
);

interface ProjectPreviewProps {
  featured: boolean;
}

const ProjectPreview = ({ featured }: ProjectPreviewProps) => (
  <div className={`rounded-xl overflow-hidden relative bg-gradient-to-br from-neutral-950 to-black border border-neutral-800 ${
    featured ? 'h-56' : 'h-48'
  }`}>
    {/* تأثير شبكة خلفية */}
    <div className="absolute inset-0 opacity-5">
      <div className="absolute inset-0" style={{
        backgroundImage: `linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px),
                         linear-gradient(180deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
        backgroundSize: '40px 40px',
      }} />
    </div>
    
    <div className="w-full h-full flex flex-col items-center justify-center p-8 relative z-10">
      <motion.div 
        className="text-6xl mb-4 opacity-30"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        {featured ? '🚀' : '🛰️'}
      </motion.div>
      <div className="text-center">
        <div className="text-sm text-neutral-500 font-mono mb-2">
          {featured ? 'AI-POWERED SYSTEM ACTIVE' : 'SYSTEM_ACTIVE'}
        </div>
        <div className="flex items-center justify-center gap-2">
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-cyan-500"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
            />
          ))}
        </div>
      </div>
    </div>
    
    {/* تأثير إشعاعي */}
    <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/5 via-transparent to-transparent" />
  </div>
);

export default ProjectCard;