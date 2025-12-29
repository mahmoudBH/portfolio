import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';
import { fadeInRight, staggerChildren } from '../../utils/variants';

interface CertificationsSectionProps {
  certifications: string[];
}

const CertificationsSection = ({ certifications }: CertificationsSectionProps) => {
  return (
    <motion.div
      variants={fadeInRight}
      initial="initial"
      whileInView="whileInView"
      viewport={{ once: true, margin: "0px" }}
      transition={{ delay: 0.2 }}
      className="glass-panel rounded-2xl p-8 border border-neutral-800 hover:border-violet-500/30 transition-all duration-300"
    >
      <div className="flex items-center gap-4 mb-8">
        <div className="relative">
          <FileText className="text-violet-400" size={28} />
          <div className="absolute -inset-2 bg-violet-500/10 rounded-full blur-xl"></div>
        </div>
        <div>
          <h3 className="text-2xl font-bold text-white">Cosmic Certifications</h3>
          <p className="text-neutral-500 font-mono text-sm">TECHNICAL_VALIDATION</p>
        </div>
      </div>
      
      <motion.div 
        className="space-y-4"
        variants={staggerChildren(0.1)}
        initial="initial"
        whileInView="whileInView"
        viewport={{ once: true, margin: "0px" }}
      >
        {certifications.slice(0, 4).map((cert, index) => (
          <CertificationItem key={index} certification={cert} />
        ))}
      </motion.div>
    </motion.div>
  );
};

interface CertificationItemProps {
  certification: string;
}

const CertificationItem = ({ certification }: CertificationItemProps) => (
  <motion.div 
    variants={fadeInRight}
    className="flex items-center gap-3 group cursor-pointer"
  >
    <div className="w-2 h-2 rounded-full bg-violet-500 group-hover:animate-pulse"></div>
    <div className="text-sm text-neutral-300 group-hover:text-violet-300 transition-colors font-mono">
      • {certification}
    </div>
  </motion.div>
);

export default CertificationsSection;