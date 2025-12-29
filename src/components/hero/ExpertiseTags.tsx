import { motion } from 'framer-motion';
import { Terminal, Cpu, Database, Server, Satellite } from 'lucide-react';
import { fadeUp, staggerChildren } from '../../utils/animations';

const EXPERTISE_ITEMS = [
  { icon: <Terminal size={16} />, label: 'Full-Stack Development', color: 'border-blue-500' },
  { icon: <Cpu size={16} />, label: 'System Architecture', color: 'border-purple-500' },
  { icon: <Database size={16} />, label: 'Database Design', color: 'border-green-500' },
  { icon: <Server size={16} />, label: 'DevOps & Cloud', color: 'border-yellow-500' },
];

interface ExpertiseTagsProps {
  delay?: number;
}

const ExpertiseTags = ({ delay = 0 }: ExpertiseTagsProps) => {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      transition={{ delay }}
      className="pt-3"
    >
      <div className="flex items-center gap-2 mb-3">
        <Satellite size={16} className="text-blue-400" />
        <span className="text-xs font-medium text-gray-400 tracking-wider font-mono">
          SPECIALIZATIONS
        </span>
      </div>
      
      <motion.div 
        className="flex flex-wrap gap-2"
        variants={staggerChildren(0.1)}
        initial="hidden"
        animate="visible"
      >
        {EXPERTISE_ITEMS.map((item, index) => (
          <ExpertiseTag key={item.label} item={item} index={index} />
        ))}
      </motion.div>
    </motion.div>
  );
};

interface ExpertiseTagProps {
  item: typeof EXPERTISE_ITEMS[0];
  index: number;
}

const ExpertiseTag = ({ item, index }: ExpertiseTagProps) => (
  <motion.div
    variants={fadeUp}
    className={`flex items-center gap-2 px-3 py-2 bg-gray-900/40 backdrop-blur-sm rounded-lg border ${item.color} hover:bg-gray-800/50 transition-all duration-300 group cursor-pointer`}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    <div className="text-blue-400 group-hover:scale-110 transition-transform">
      {item.icon}
    </div>
    <span className="text-xs font-medium text-gray-300">{item.label}</span>
  </motion.div>
);

export default ExpertiseTags;