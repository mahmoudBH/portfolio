import { motion } from 'framer-motion';
import { useState } from 'react';

type ContactInfo = {
  icon: React.ReactNode;
  title: string;
  value: string;
  link: string;
  color: string;
  description: string;
};

type ContactInfoCardProps = {
  info: ContactInfo;
  index: number;
};

const ContactInfoCard = ({ info, index }: ContactInfoCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.a
      href={info.link}
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ x: 10 }}
      className="glass-panel rounded-2xl p-6 border border-neutral-800 hover:border-cyan-500/30 transition-all duration-300 group block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-start gap-4">
        <div className={`p-4 rounded-xl ${info.color.replace('text', 'bg')}/10 group-hover:scale-110 transition-transform duration-300`}>
          <div className={info.color}>
            {info.icon}
          </div>
        </div>
        
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <div className="text-sm font-mono text-neutral-500 tracking-wider">
              {info.title}
            </div>
            <div className="flex gap-1">
              <motion.div 
                className="w-1.5 h-1.5 rounded-full bg-cyan-500"
                animate={{ scale: isHovered ? [1, 1.5, 1] : 1 }}
                transition={{ duration: 1, repeat: Infinity }}
              />
            </div>
          </div>
          <div className="font-medium text-lg text-white font-mono mb-1 group-hover:text-cyan-300 transition-colors">
            {info.value}
          </div>
          <div className="text-sm text-neutral-400 font-mono">
            {info.description}
          </div>
        </div>
        
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="text-2xl opacity-30">→</div>
        </div>
      </div>
    </motion.a>
  );
};

export default ContactInfoCard;