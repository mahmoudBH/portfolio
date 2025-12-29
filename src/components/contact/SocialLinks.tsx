import { motion } from 'framer-motion';

type SocialLink = {
  icon: React.ReactNode;
  href: string;
  label: string;
  color: string;
};

const SocialLinks = ({ socialLinks }: { socialLinks: SocialLink[] }) => {
  return (
    <div className="glass-panel rounded-2xl p-8 border border-neutral-800">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
        <h3 className="text-xl font-bold text-white font-mono tracking-wider">
          NETWORK_NODES
        </h3>
      </div>
      
      <p className="text-neutral-400 font-mono text-sm mb-6">
        <span className="text-emerald-400">//</span> Connect through alternative communication protocols
      </p>
      
      <div className="flex gap-4">
        {socialLinks.map((social) => (
          <SocialLinkButton key={social.label} social={social} />
        ))}
      </div>
    </div>
  );
};

// Component optimisé pour chaque lien social
const SocialLinkButton = ({ social }: { social: SocialLink }) => {
  return (
    <motion.a
      href={social.href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0.9 }}
      whileInView={{ scale: 1 }}
      whileHover={{ scale: 1.1, y: -5 }}
      whileTap={{ scale: 0.95 }}
      className={`flex-1 p-4 glass-panel rounded-xl border border-neutral-800 flex flex-col items-center justify-center gap-3 transition-all duration-300 ${social.color}`}
      aria-label={social.label}
    >
      <div className="p-3 rounded-lg bg-neutral-900/50 group-hover:scale-110 transition-transform duration-300">
        {social.icon}
      </div>
      <span className="text-sm font-mono tracking-wider">{social.label}</span>
    </motion.a>
  );
};

export default SocialLinks;