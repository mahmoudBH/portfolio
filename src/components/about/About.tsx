import { motion } from 'framer-motion';
import { Users, Award, FileText } from 'lucide-react';
import { cvData } from '../../data/cvData';
import ExperienceSection from './ExperienceSection';
import EducationSection from './EducationSection';
import AwardsSection from './AwardsSection';
import CertificationsSection from './CertificationsSection';
import SkillsSection from './SkillsSection';
import { fadeInUp } from '../../utils/variants';

const About = () => {
  const skillCategories = Object.entries(cvData.skills);

  return (
    <section id="about" className="py-32 relative overflow-hidden">
      <BackgroundEffects />
      
      <div className="section-padding max-w-7xl mx-auto relative z-10">
        <Header />
        
        <div className="grid lg:grid-cols-3 gap-8 mb-20">
          <ExperienceSection experiences={cvData.experience} />
          
          <div className="space-y-8">
            <EducationSection education={cvData.education} />
            <AwardsSection awards={cvData.awards} />
            <CertificationsSection certifications={cvData.certifications} />
          </div>
        </div>

        <SkillsSection 
          skillCategories={skillCategories}
          experiencesCount={cvData.experience.length}
        />
      </div>
    </section>
  );
};

const BackgroundEffects = () => (
  <>
    <div className="absolute inset-0 opacity-10">
      <div className="absolute top-1/4 left-10 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-10 w-64 h-64 bg-secondary-500/10 rounded-full blur-3xl"></div>
    </div>

    <motion.div 
      className="absolute top-20 right-20 text-2xl opacity-30"
      animate={{ rotate: 360 }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
    >
      🛰️
    </motion.div>
    
    <motion.div 
      className="absolute bottom-40 left-20 text-2xl opacity-30"
      animate={{ y: [0, -20, 0] }}
      transition={{ duration: 4, repeat: Infinity }}
    >
      🌟
    </motion.div>
  </>
);

const Header = () => (
  <motion.div
    variants={fadeInUp}
    initial="initial"
    whileInView="whileInView"
    viewport={{ once: true, margin: "0px 0px -100px 0px" }}
    className="text-center mb-16 relative"
  >
    <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-secondary-500/10 blur-3xl -z-10"></div>
    
    <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass-panel border border-primary-500/30 mb-6 group hover:border-primary-500/50 transition-all duration-300">
      <Users size={18} className="text-primary-400 group-hover:text-primary-300" />
      <span className="text-primary-300 font-mono text-sm tracking-wider">MISSION_PROFILE</span>
      <div className="ml-2 flex gap-1">
        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
        <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
        <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
      </div>
    </div>
    
    <div className="relative">
      <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary-400 via-cyan-400 to-secondary-400 bg-clip-text text-transparent">
        Space Mission Log
      </h2>
      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 text-3xl opacity-30">
        🚀
      </div>
    </div>
    
    <p className="text-neutral-400 max-w-3xl mx-auto text-lg md:text-xl font-mono leading-relaxed">
      <span className="text-primary-400">//</span> Full-Stack Developer navigating the digital cosmos since 2022
    </p>
  </motion.div>
);

export default About;