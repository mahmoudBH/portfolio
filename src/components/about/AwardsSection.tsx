import { motion } from 'framer-motion';
import { Award, Star } from 'lucide-react';
import { Award as AwardType } from '../../types/cv';
import { fadeInRight, staggerChildren } from '../../utils/variants';

interface AwardsSectionProps {
  awards: AwardType[];
}

const AwardsSection = ({ awards }: AwardsSectionProps) => {
  return (
    <motion.div
      variants={fadeInRight}
      initial="initial"
      whileInView="whileInView"
      viewport={{ once: true }}
      transition={{ delay: 0.1 }}
      className="glass-panel rounded-2xl p-8 border border-neutral-800 hover:border-amber-500/30 transition-all duration-300"
    >
      <div className="flex items-center gap-4 mb-8">
        <div className="relative">
          <Award className="text-amber-400" size={28} />
          <div className="absolute -inset-2 bg-amber-500/10 rounded-full blur-xl"></div>
        </div>
        <div>
          <h3 className="text-2xl font-bold text-white">Space Achievements</h3>
          <p className="text-neutral-500 font-mono text-sm">GALACTIC_RECOGNITION</p>
        </div>
      </div>
      
      <motion.div 
        className="space-y-6"
        variants={staggerChildren(0.1)}
        initial="initial"
        whileInView="whileInView"
        viewport={{ once: true }}
      >
        {awards.map((award, index) => (
          <AwardCard key={index} award={award} />
        ))}
      </motion.div>
    </motion.div>
  );
};

interface AwardCardProps {
  award: AwardType;
}

const AwardCard = ({ award }: AwardCardProps) => (
  <motion.div 
    variants={fadeInRight}
    className="flex items-start gap-4 group"
  >
    <Star size={20} className="text-amber-400 mt-1 flex-shrink-0 group-hover:animate-spin transition-transform" />
    <div>
      <h4 className="font-bold text-white mb-2 group-hover:text-amber-300 transition-colors">
        {award.title}
      </h4>
      <p className="text-sm text-neutral-400 font-mono">{award.description}</p>
    </div>
  </motion.div>
);

export default AwardsSection;