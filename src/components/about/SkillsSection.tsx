import { motion } from 'framer-motion';
import { Cpu, Zap, Rocket } from 'lucide-react';
import { getSkillIcon } from '../../utils/skillIcons';
import { fadeInUp, fadeInScale, staggerChildren } from '../../utils/variants';

interface SkillsSectionProps {
  skillCategories: [string, string[]][];
  experiencesCount: number;
}

const SkillsSection = ({ skillCategories, experiencesCount }: SkillsSectionProps) => {
  const totalSkills = skillCategories.reduce((total, [_, skills]) => total + skills.length, 0);
  
  return (
    <motion.div
      variants={fadeInUp}
      initial="initial"
      whileInView="whileInView"
      viewport={{ once: true }}
      className="mt-24"
    >
      <Header />
      
      <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
        {skillCategories.map(([category, skills], index) => (
          <SkillCategoryCard 
            key={category} 
            category={category} 
            skills={skills}
            index={index}
          />
        ))}
      </div>

      <Footer 
        totalSkills={totalSkills}
        categoriesCount={skillCategories.length}
        missionsCount={experiencesCount}
      />
    </motion.div>
  );
};

const Header = () => (
  <div className="text-center mb-16 relative">
    <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full glass-panel border border-cyan-500/30 mb-6">
      <Cpu size={20} className="text-cyan-400" />
      <span className="text-cyan-300 font-mono text-sm tracking-wider">TECHNICAL_CAPABILITIES</span>
      <Zap size={16} className="text-amber-400 animate-pulse ml-2" />
    </div>
    
    <h3 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-primary-400 to-cyan-400 bg-clip-text text-transparent">
      Technical Arsenal
    </h3>
    <p className="text-neutral-400 max-w-2xl mx-auto text-lg font-mono">
      <span className="text-cyan-400">//</span> Advanced systems and technologies powering digital exploration
    </p>
  </div>
);

interface SkillCategoryCardProps {
  category: string;
  skills: string[];
  index: number;
}

const SkillCategoryCard = ({ category, skills, index }: SkillCategoryCardProps) => (
  <motion.div
    variants={fadeInScale}
    whileHover={{ y: -5 }}
    className="glass-panel rounded-2xl p-6 border border-neutral-800 hover:border-cyan-500/30 transition-all duration-300 group"
  >
    <div className="flex items-center gap-3 mb-6">
      <div className="w-2 h-2 rounded-full bg-cyan-500 group-hover:animate-pulse"></div>
      <h4 className="text-lg font-bold text-cyan-300 font-mono tracking-wider">
        {category.toUpperCase()}
      </h4>
    </div>
    
    <motion.div 
      className="space-y-4"
      variants={staggerChildren(0.05)}
      initial="initial"
      whileInView="whileInView"
      viewport={{ once: true }}
    >
      {skills.map((skill, i) => (
        <SkillItem key={i} skill={skill} index={i} />
      ))}
    </motion.div>
  </motion.div>
);

interface SkillItemProps {
  skill: string;
  index: number;
}

const SkillItem = ({ skill, index }: SkillItemProps) => (
  <motion.div
    variants={fadeInScale}
    whileHover={{ x: 5 }}
    className="flex items-center gap-3 p-3 rounded-lg hover:bg-neutral-900/50 transition-all duration-300 group/item"
  >
    <div className="flex-shrink-0 group-hover/item:scale-110 transition-transform duration-300">
      {getSkillIcon(skill)}
    </div>
    
    <div className="flex-1 min-w-0">
      <span className="text-sm text-neutral-300 group-hover/item:text-white font-mono truncate block">
        {skill}
      </span>
    </div>
    
    <div className="flex items-center gap-1">
      <div className="w-1 h-1 rounded-full bg-cyan-500 opacity-50"></div>
      <div className="w-2 h-2 rounded-full bg-cyan-500 group-hover/item:animate-pulse"></div>
      <div className="w-1 h-1 rounded-full bg-cyan-500 opacity-50"></div>
    </div>
  </motion.div>
);

interface FooterProps {
  totalSkills: number;
  categoriesCount: number;
  missionsCount: number;
}

const Footer = ({ totalSkills, categoriesCount, missionsCount }: FooterProps) => (
  <motion.div
    initial={{ opacity: 0, scale: 0 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    className="text-center mt-16 pt-8 border-t border-neutral-800/50"
  >
    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-900/30 border border-neutral-800">
      <Rocket size={16} className="text-primary-400" />
      <span className="text-xs text-neutral-500 font-mono">SYSTEM_STATUS: OPTIMAL</span>
    </div>
    
    <Stats 
      totalSkills={totalSkills}
      categoriesCount={categoriesCount}
      missionsCount={missionsCount}
    />
  </motion.div>
);

interface StatsProps {
  totalSkills: number;
  categoriesCount: number;
  missionsCount: number;
}

const Stats = ({ totalSkills, categoriesCount, missionsCount }: StatsProps) => (
  <div className="mt-8 grid grid-cols-3 gap-4 max-w-md mx-auto">
    <StatCard value={totalSkills} label="TECHNOLOGIES" color="text-primary-400" />
    <StatCard value={categoriesCount} label="CATEGORIES" color="text-emerald-400" />
    <StatCard value={missionsCount} label="MISSIONS" color="text-cyan-400" />
  </div>
);

interface StatCardProps {
  value: number;
  label: string;
  color: string;
}

const StatCard = ({ value, label, color }: StatCardProps) => (
  <div className="text-center">
    <div className={`text-2xl font-bold ${color} font-mono`}>
      {value}
    </div>
    <div className="text-xs text-neutral-500 font-mono">{label}</div>
  </div>
);

export default SkillsSection;