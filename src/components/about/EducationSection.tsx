import { motion } from 'framer-motion';
import { GraduationCap } from 'lucide-react';
import { Education } from '../../types/cv';
import { fadeInRight, staggerChildren } from '../../utils/variants';

interface EducationSectionProps {
  education: Education[];
}

const EducationSection = ({ education }: EducationSectionProps) => {
  return (
    <motion.div
      variants={fadeInRight}
      initial="initial"
      whileInView="whileInView"
      viewport={{ once: true, margin: "0px 0px -100px 0px" }}
      className="glass-panel rounded-2xl p-8 border border-neutral-800 hover:border-emerald-500/30 transition-all duration-300"
    >
      <div className="flex items-center gap-4 mb-8">
        <div className="relative">
          <GraduationCap className="text-emerald-400" size={28} />
          <div className="absolute -inset-2 bg-emerald-500/10 rounded-full blur-xl"></div>
        </div>
        <div>
          <h3 className="text-2xl font-bold text-white">Cosmic Education</h3>
          <p className="text-neutral-500 font-mono text-sm">KNOWLEDGE_ACQUISITION</p>
        </div>
      </div>
      
      <motion.div 
        className="space-y-6"
        variants={staggerChildren(0.1)}
        initial="initial"
        whileInView="whileInView"
        viewport={{ once: true, margin: "0px 0px -100px 0px" }}
      >
        {education.map((edu, index) => (
          <EducationCard key={index} education={edu} />
        ))}
      </motion.div>
    </motion.div>
  );
};

interface EducationCardProps {
  education: Education;
}

const EducationCard = ({ education }: EducationCardProps) => {
  return (
    <motion.div 
      variants={fadeInRight}
      className="pb-6 border-b border-neutral-800/50 last:border-0 last:pb-0 group"
    >
      <div className="flex items-start gap-3">
        <div className="w-2 h-2 rounded-full bg-emerald-500 mt-2 group-hover:animate-pulse"></div>
        <div className="flex-1">
          <h4 className="font-bold text-lg mb-2 group-hover:text-emerald-300 transition-colors">
            {education.degree}
          </h4>
          <p className="text-sm text-neutral-400 mb-2 font-mono">{education.institution}</p>
          <p className="text-xs text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full inline-block border border-emerald-500/20">
            {education.period}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default EducationSection;