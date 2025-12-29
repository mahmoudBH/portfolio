import { motion } from 'framer-motion';
import { fadeIn } from '../../utils/animations';

interface ScrollIndicatorProps {
  delay?: number;
}

const ScrollIndicator = ({ delay = 0 }: ScrollIndicatorProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay, duration: 0.8 }}
      className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20"
    >
      <div className="flex flex-col items-center gap-1">
        <span className="text-xs text-gray-500 tracking-widest uppercase font-mono">
          SCROLL_TO_EXPLORE
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-px h-10 bg-gradient-to-b from-blue-500 to-transparent"
          aria-hidden="true"
        />
      </div>
    </motion.div>
  );
};

export default ScrollIndicator;