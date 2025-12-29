import { motion } from 'framer-motion';
import { Cpu } from 'lucide-react';
import { fadeUp } from '../../utils/animations';

const ProjectsHeader = () => {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="text-center mb-20 relative"
    >
      {/* تأثير التوهج */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 blur-3xl -z-10"></div>
      
      <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass-panel border border-cyan-500/30 mb-6 group hover:border-cyan-500/50 transition-all duration-300">
        <Cpu size={18} className="text-cyan-400 group-hover:text-cyan-300" />
        <span className="text-cyan-300 font-mono text-sm tracking-wider">
          SPACE_MISSIONS
        </span>
        <div className="ml-2 flex gap-1">
          <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse"></div>
          <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>
      
      <div className="relative">
        <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-primary-400 to-purple-400 bg-clip-text text-transparent">
          Orbital Deployments
        </h2>
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 text-3xl opacity-30" aria-hidden="true">
          🌌
        </div>
      </div>
      
      <p className="text-neutral-400 max-w-3xl mx-auto text-lg md:text-xl font-mono leading-relaxed">
        <span className="text-cyan-400">//</span> Advanced systems deployed across the digital galaxy
      </p>
    </motion.div>
  );
};

export default ProjectsHeader;