import { motion } from 'framer-motion';
import { Globe, Rocket } from 'lucide-react';
import { fadeUp, staggerChildren } from '../../utils/animations';

interface Language {
  language: string;
  level: string;
}

interface LanguagesSectionProps {
  languages: Language[];
}

const LanguagesSection = ({ languages }: LanguagesSectionProps) => {
  const getLevelValue = (level: string): number => {
    if (level.includes('Native')) return 5;
    if (level.includes('Fluent')) return 4;
    if (level.includes('Intermediate')) return 3;
    if (level.includes('Beginner')) return 2;
    return 1;
  };

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="mt-32"
    >
      <Header />
      
      <div className="glass-panel rounded-2xl p-8 border border-neutral-800">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {languages?.map((lang, index) => (
            <LanguageCard 
              key={lang.language} 
              language={lang} 
              index={index}
              levelValue={getLevelValue(lang.level)}
            />
          ))}
        </div>
      </div>

      <Footer />
    </motion.div>
  );
};

const Header = () => (
  <div className="text-center mb-12 relative">
    <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full glass-panel border border-emerald-500/30 mb-6">
      <Globe size={20} className="text-emerald-400" />
      <span className="text-emerald-300 font-mono text-sm tracking-wider">
        COMMUNICATION_PROTOCOLS
      </span>
    </div>
    
    <h3 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
      Linguistic Systems
    </h3>
    <p className="text-neutral-400 max-w-2xl mx-auto text-lg font-mono">
      <span className="text-emerald-400">//</span> Multilingual communication protocols for global operations
    </p>
  </div>
);

interface LanguageCardProps {
  language: Language;
  index: number;
  levelValue: number;
}

const LanguageCard = ({ language, index, levelValue }: LanguageCardProps) => (
  <motion.div
    variants={fadeUp}
    initial="hidden"
    whileInView="visible"
    transition={{ delay: index * 0.1 }}
    whileHover={{ scale: 1.05 }}
    className="text-center group"
  >
    <div className="text-4xl font-bold text-white font-mono mb-3 group-hover:text-emerald-300 transition-colors">
      {language.language}
    </div>
    
    <div className="text-sm text-neutral-400 font-mono mb-4">
      {language.level.toUpperCase()}
    </div>
    
    <LevelIndicator levelValue={levelValue} />
    
    <ProgressBar levelValue={levelValue} index={index} />
  </motion.div>
);

interface LevelIndicatorProps {
  levelValue: number;
}

const LevelIndicator = ({ levelValue }: LevelIndicatorProps) => (
  <div className="mt-2 flex justify-center gap-1">
    {[1, 2, 3, 4, 5].map((level) => (
      <motion.div
        key={level}
        className={`w-3 h-3 rounded-full ${
          level <= levelValue ? 'bg-emerald-500' : 'bg-neutral-800'
        }`}
        whileHover={{ scale: 1.5 }}
        transition={{ type: "spring", stiffness: 400 }}
      />
    ))}
  </div>
);

interface ProgressBarProps {
  levelValue: number;
  index: number;
}

const ProgressBar = ({ levelValue, index }: ProgressBarProps) => (
  <div className="mt-4">
    <div className="h-1.5 bg-neutral-800 rounded-full overflow-hidden">
      <motion.div 
        className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500"
        initial={{ width: 0 }}
        whileInView={{ width: `${levelValue * 20}%` }}
        transition={{ duration: 1, delay: index * 0.2 }}
      />
    </div>
  </div>
);

const Footer = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    className="text-center mt-16 pt-8 border-t border-neutral-800/50"
  >
    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-900/30 border border-neutral-800">
      <Rocket size={16} className="text-cyan-400" />
      <span className="text-xs text-neutral-500 font-mono">
        MISSION_CONTROL: ALL_SYSTEMS_OPERATIONAL
      </span>
    </div>
  </motion.div>
);

export default LanguagesSection;