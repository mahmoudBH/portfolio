import { motion } from 'framer-motion';
import { Download, Mail, ChevronRight } from 'lucide-react';
import { fadeUp } from '../../utils/animations';

interface CTAButtonsProps {
  delay?: number;
}

const CTAButtons = ({ delay = 0 }: CTAButtonsProps) => {
  const handleContactClick = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      transition={{ delay }}
      className="flex flex-col sm:flex-row gap-3 pt-4"
    >
      <ContactButton onClick={handleContactClick} />
      <DownloadCVButton />
    </motion.div>
  );
};

interface ContactButtonProps {
  onClick: () => void;
}

const ContactButton = ({ onClick }: ContactButtonProps) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    aria-label="Contact Mahmoud Bousbih"
    className="group relative px-4 py-3 bg-gradient-to-r from-blue-600/20 to-blue-700/20 border border-blue-500/30 rounded-xl font-semibold text-white overflow-hidden transition-all duration-300 hover:border-blue-500/60"
  >
    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    <div className="relative flex items-center justify-center gap-2">
      <Mail size={18} />
      <span className="text-xs font-mono">CONTACT ME</span>
      <ChevronRight size={16} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
    </div>
  </motion.button>
);

const DownloadCVButton = () => (
  <motion.a
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    href="/EN_BOUSBIH_Mahmoud_Developpeur_FullStack.pdf"
    download="EN_BOUSBIH_Mahmoud_Developpeur_FullStack.pdf"
    aria-label="Download Mahmoud Bousbih's CV"
    className="group px-4 py-3 bg-black/50 backdrop-blur-sm border border-gray-800/20 rounded-xl font-semibold text-gray-300 hover:text-white hover:border-blue-500/50 transition-all duration-300 text-center"
  >
    <div className="flex items-center justify-center gap-2">
      <Download size={18} />
      <span className="text-xs font-mono">DOWNLOAD CV</span>
    </div>
  </motion.a>
);

export default CTAButtons;