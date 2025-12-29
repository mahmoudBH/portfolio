import { motion } from 'framer-motion';
import { Briefcase, Globe, Clock } from 'lucide-react';
import { Experience } from '../../types/cv';
import { fadeInUp, fadeInLeft, staggerChildren } from '../../utils/variants';

interface ExperienceSectionProps {
  experiences: Experience[];
}

const ExperienceSection = ({ experiences }: ExperienceSectionProps) => {
  return (
    <motion.div
      variants={fadeInLeft}
      initial="initial"
      whileInView="whileInView"
      viewport={{ once: false, margin: "0px" }}
      className="lg:col-span-2 space-y-8"
    >
      <div className="flex items-center gap-4 mb-8">
        <div className="relative">
          <Briefcase className="text-primary-400" size={28} />
          <motion.div 
            className="absolute -inset-2 border border-primary-500/20 rounded-full"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
        <div>
          <h3 className="text-3xl font-bold bg-gradient-to-r from-white to-primary-200 bg-clip-text text-transparent">
            Mission Experience
          </h3>
          <p className="text-neutral-500 font-mono text-sm">ORBITAL_DEVELOPMENT_HISTORY</p>
        </div>
      </div>
      
      <motion.div 
        className="space-y-6"
        variants={staggerChildren(0.1)}
        initial="initial"
        whileInView="whileInView"
        viewport={{ once: false, margin: "0px" }}
      >
        {experiences.map((exp, index) => (
          <ExperienceCard key={index} experience={exp} index={index} total={experiences.length} />
        ))}
      </motion.div>
    </motion.div>
  );
};

interface ExperienceCardProps {
  experience: Experience;
  index: number;
  total: number;
}

const ExperienceCard = ({ experience, index, total }: ExperienceCardProps) => {
  return (
    <motion.div
      variants={fadeInUp}
      className="group relative"
    >
      {/* خط المسار الزمني */}
      {index < total - 1 && (
        <div className="absolute left-6 top-20 w-0.5 h-24 bg-gradient-to-b from-primary-500/30 to-transparent"></div>
      )}
      
      <div className="glass-panel rounded-2xl p-8 hover:bg-neutral-900/60 transition-all duration-500 border border-neutral-800 hover:border-primary-500/30 hover:shadow-2xl hover:shadow-primary-500/10">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-3 h-3 rounded-full bg-primary-500 group-hover:animate-pulse"></div>
              <h4 className="text-2xl font-bold text-white group-hover:text-primary-300 transition-colors">
                {experience.position}
              </h4>
            </div>
            <div className="flex items-center gap-2 mb-3">
              <Globe size={16} className="text-cyan-400" />
              <p className="text-cyan-400 font-medium font-mono">{experience.company}</p>
            </div>
          </div>
          <div className="flex items-center mt-2 md:mt-0">
            <Clock size={16} className="mr-2 text-primary-400" />
            <span className="text-sm text-neutral-400 font-mono bg-neutral-900/50 px-3 py-1 rounded-full border border-neutral-800">
              {experience.period}
            </span>
          </div>
        </div>
        
        <p className="text-neutral-300 mb-6 leading-relaxed font-mono text-sm">
          <span className="text-primary-400">//</span> {experience.description}
        </p>
        
        <div className="flex flex-wrap gap-3">
          {experience.technologies.map((tech, i) => (
            <motion.span
              key={i}
              initial={{ scale: 0.9 }}
              whileHover={{ scale: 1.05 }}
              className="px-4 py-2 rounded-full bg-neutral-900/70 border border-neutral-800 text-sm font-mono hover:border-primary-500/50 hover:bg-primary-500/10 transition-all duration-300"
            >
              {tech}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ExperienceSection;