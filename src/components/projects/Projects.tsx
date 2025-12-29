import { motion, LazyMotion, domAnimation } from 'framer-motion';
import { cvData } from '../../data/cvData';
import ProjectsHeader from './ProjectsHeader';
import ProjectsStats from './ProjectsStats';
import ProjectCard from './ProjectCard';
import LanguagesSection from './LanguagesSection';
import BackgroundEffects from './BackgroundEffects';

const Projects = () => {
  // Use optional chaining to prevent runtime errors
  const projects = (cvData.projects || []).map(project => ({
    ...project,
    featured: project.featured ?? false
  }));
  const languages = cvData.languages || [];

  return (
    <LazyMotion features={domAnimation}>
      <section 
        id="projects" 
        className="py-32 relative overflow-hidden"
        aria-label="Projects portfolio - Mahmoud Bousbih's projects and linguistic skills"
      >
        <BackgroundEffects />
        
        <div className="section-padding max-w-7xl mx-auto relative z-10">
          <ProjectsHeader />
          
          <ProjectsStats />
          
          {/* قائمة المشاريع */}
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <ProjectCard 
                key={project.id || index} 
                project={project} 
                index={index} 
              />
            ))}
          </div>
          
          {/* قسم اللغات */}
          <LanguagesSection languages={languages} />
        </div>
      </section>
    </LazyMotion>
  );
};

export default Projects;