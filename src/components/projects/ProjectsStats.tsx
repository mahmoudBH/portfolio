import { motion } from 'framer-motion';
import { PROJECT_STATS } from '../constants/projects';
import { staggerChildren, fadeUp } from '../../utils/animations';

const ProjectsStats = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
    >
      {PROJECT_STATS.map((stat, index) => (
        <StatCard key={stat.label} stat={stat} index={index} />
      ))}
    </motion.div>
  );
};

interface StatCardProps {
  stat: typeof PROJECT_STATS[number];
  index: number;
}

const StatCard = ({ stat, index }: StatCardProps) => (
  <motion.div
    variants={fadeUp}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    transition={{ delay: index * 0.1 }}
    whileHover={{ y: -5, scale: 1.02 }}
    className="glass-panel rounded-2xl p-6 text-center border border-neutral-800 hover:border-cyan-500/30 transition-all duration-300 group cursor-default"
  >
    <div className={`text-3xl mb-4 group-hover:scale-110 transition-transform duration-300`}>
      {stat.icon}
    </div>
    <div className={`text-3xl font-bold font-mono mb-2 ${stat.color}`}>
      {stat.value}
    </div>
    <div className="text-xs font-medium text-neutral-400 mb-1">{stat.label}</div>
    <div className="text-xs text-neutral-500 font-mono tracking-wider">
      {stat.description}
    </div>
  </motion.div>
);

export default ProjectsStats;