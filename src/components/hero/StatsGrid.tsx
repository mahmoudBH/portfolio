import { motion } from 'framer-motion';
import { fadeUp, staggerChildren } from '../../utils/animations';

const STATS = [
  { value: '2022–2025', label: 'Experience', sublabel: 'Years Active' },
  { value: '10+', label: 'Projects', sublabel: 'Successfully Delivered' },
  { value: '98%', label: 'Satisfaction', sublabel: 'Client Rate' },
  { value: '15+', label: 'Technologies', sublabel: 'Mastered' },
];

interface StatsGridProps {
  delay?: number;
}

const StatsGrid = ({ delay = 0 }: StatsGridProps) => {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      transition={{ delay }}
      className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-3"
    >
      {STATS.map((stat, index) => (
        <StatCard key={index} stat={stat} index={index} />
      ))}
    </motion.div>
  );
};

interface StatCardProps {
  stat: typeof STATS[0];
  index: number;
}

const StatCard = ({ stat, index }: StatCardProps) => (
  <motion.div
    variants={fadeUp}
    whileHover={{ scale: 1.05, y: -5 }}
    className="text-center p-3 rounded-xl bg-black/50 backdrop-blur-sm border border-gray-800/20 hover:border-blue-500/30 transition-all duration-300 cursor-default"
  >
    <div className="text-xl md:text-2xl font-bold bg-gradient-to-b from-white to-gray-300 bg-clip-text text-transparent">
      {stat.value}
    </div>
    <div className="text-xs font-medium text-gray-400 mt-1">{stat.label}</div>
    <div className="text-xs text-gray-500 mt-0.5 font-mono">{stat.sublabel}</div>
  </motion.div>
);

export default StatsGrid;