import { motion } from 'framer-motion';
import { Heart, Rocket, Satellite, Globe, Code, Shield } from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';

// Custom Hook for Clock
const useClock = () => {
  const [time, setTime] = useState(new Date());
  
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);
  
  return time;
};

// Custom Hook for Signal Strength
const useSignal = () => {
  const [signal, setSignal] = useState(95);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setSignal(prev => {
        const change = Math.random() * 10 - 5;
        const newStrength = Math.min(100, Math.max(85, prev + change));
        return Math.round(newStrength);
      });
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);
  
  return signal;
};

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const currentTime = useClock();
  const signalStrength = useSignal();
  const [isHovered, setIsHovered] = useState(false);

  // تنسيق الوقت
  const formatTime = useCallback((date) => {
    return date.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  }, []);

  // روابط سريعة
  const quickLinks = [
    { label: 'Mission Control', href: '#contact' },
    { label: 'Orbital Deployments', href: '#projects' },
    { label: 'Space Log', href: '#about' },
    { label: 'Home Base', href: '#home' }
  ];

  // Satellite positions
  const satellites = Array.from({ length: 3 }, (_, i) => ({
    id: i,
    left: 10 + i * 30,
    top: 20 + i * 20,
    duration: 20 + i * 5
  }));

  return (
    <footer 
      className="relative overflow-hidden border-t border-neutral-800/50"
      aria-label="Website footer with contact information and system status"
    >
      {/* AI Monitoring Status */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="absolute top-4 left-1/2 transform -translate-x-1/2 z-20"
      >
        <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-neutral-900/80 backdrop-blur-sm border border-cyan-500/30">
          <motion.div
            className="w-1.5 h-1.5 rounded-full bg-emerald-500"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <span className="text-[10px] font-mono text-cyan-400">
            AI_MONITORING: STATION_STABLE
          </span>
        </div>
      </motion.div>

      {/* خلفية فضائية */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-primary-500/10 to-transparent"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-secondary-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* أقمار صناعية متحركة في الخلفية */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {satellites.map((satellite) => (
          <motion.div
            key={satellite.id}
            className="absolute text-2xl opacity-10"
            style={{
              left: `${satellite.left}%`,
              top: `${satellite.top}%`,
            }}
            animate={{
              rotate: 360,
              y: [0, -30, 0],
            }}
            transition={{
              duration: satellite.duration,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            🛰️
          </motion.div>
        ))}
      </div>

      {/* طبقة تمويه زجاجية */}
      <div className="glass-panel relative z-10">
        <div className="section-padding max-w-7xl mx-auto py-12 md:py-16">
          {/* محطة اتصال فضائية */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col lg:flex-row justify-between items-center gap-8 mb-12"
          >
            <div className="flex items-center gap-4">
              <div className="relative">
                <Rocket size={28} className="text-primary-400" />
                <motion.div 
                  className="absolute -inset-2 border border-primary-500/20 rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
              <div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-primary-400 via-cyan-400 to-secondary-400 bg-clip-text text-transparent">
                  SPACE_STATION_ALPHA
                </h3>
                <p className="text-neutral-500 font-mono text-sm tracking-wider">
                  MISSION_CONTROL • ORBITAL_DEVELOPMENT
                </p>
              </div>
            </div>

            {/* حالة النظام */}
            <div className="flex items-center gap-6">
              <div className="text-center">
                <div className="text-sm text-neutral-500 font-mono mb-1">EARTH_TIME</div>
                <div className="text-xl font-bold text-neutral-300 font-mono tracking-wider">
                  {formatTime(currentTime)}
                </div>
              </div>
              
              <div className="h-8 w-px bg-neutral-800"></div>
              
              <div className="text-center">
                <div className="text-sm text-neutral-500 font-mono mb-1 flex items-center justify-center gap-2">
                  <Satellite size={12} />
                  SIGNAL_STRENGTH
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-32 h-2 bg-neutral-800 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500"
                      animate={{ width: `${signalStrength}%` }}
                      transition={{ duration: 1 }}
                    />
                  </div>
                  <span className="text-emerald-400 font-mono text-sm">{signalStrength}%</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* محتوى الفوتر الرئيسي */}
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            {/* معلومات المهمة */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse"></div>
                <h4 className="text-lg font-bold text-white font-mono">MISSION_PARAMETERS</h4>
              </div>
              
              <p className="text-neutral-400 font-mono text-sm leading-relaxed">
                <span className="text-cyan-400">//</span> Advanced full-stack development operations. 
                Specializing in orbital deployment of cutting-edge digital solutions across the galaxy.
              </p>
              
              <div className="flex items-center gap-4 pt-4 border-t border-neutral-800/50">
                <div className="flex items-center gap-2">
                  <Code size={16} className="text-neutral-500" />
                  <span className="text-xs text-neutral-500 font-mono">REACT • NEXT.JS • NODE.JS</span>
                </div>
              </div>
            </motion.div>

            {/* روابط سريعة */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                <h4 className="text-lg font-bold text-white font-mono">NAVIGATION_GRID</h4>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                {quickLinks.map((link, index) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    aria-label={`Navigate to ${link.label}`}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                    whileHover={{ x: 5 }}
                    className="group flex items-center gap-2 p-3 rounded-lg hover:bg-neutral-900/50 transition-all duration-300"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 group-hover:animate-pulse"></div>
                    <span className="text-sm text-neutral-400 group-hover:text-white font-mono transition-colors">
                      {link.label}
                    </span>
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* اتصال */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></div>
                <h4 className="text-lg font-bold text-white font-mono">TRANSMISSION_CHANNELS</h4>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-purple-500/10">
                    <Globe size={16} className="text-purple-400" />
                  </div>
                  <div>
                    <div className="text-sm text-neutral-500 font-mono">EMAIL_FREQUENCY</div>
                    <a 
                      href="mailto:boussbimahmoud@gmail.com"
                      className="text-neutral-300 font-mono hover:text-cyan-400 transition-colors"
                      aria-label="Send email to boussbimahmoud@gmail.com"
                    >
                      boussbimahmoud@gmail.com
                    </a>
                  </div>
                </div>
                
                <div 
                  className="pt-3 border-t border-neutral-800/50 cursor-help"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  <div className="flex items-center gap-2">
                    <Shield size={14} className="text-cyan-400" />
                    <span className="text-xs text-neutral-500 font-mono">
                      {isHovered ? 'TLS_1.3_ACTIVE' : 'COMMUNICATIONS_ENCRYPTED • QUANTUM_SAFE'}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* خط فاصل */}
          <div className="h-px w-full bg-gradient-to-r from-transparent via-neutral-800/50 to-transparent mb-8"></div>

          {/* حقوق النشر والأخبار */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center md:text-left"
            >
              <div className="text-sm text-neutral-500 font-mono mb-1">
                © {currentYear} SPACE_STATION_ALPHA • MAHMOUD_BOUSBIH
              </div>
              <div className="text-xs text-neutral-600 font-mono">
                ALL_SYSTEMS_PROTECTED • INTERGALACTIC_COPYRIGHT
              </div>
            </motion.div>

            {/* إحصائيات النظام */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="flex items-center gap-6"
            >
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></div>
                <span className="text-xs text-neutral-500 font-mono">SYS_STATUS</span>
                <span className="text-emerald-400 font-mono text-sm">OPTIMAL</span>
              </div>
              
              <div className="w-px h-4 bg-neutral-800"></div>
              
              <div className="flex items-center gap-2">
                <Heart size={14} className="text-red-400 animate-pulse" />
                <span className="text-xs text-neutral-500 font-mono">CRAFTED_WITH</span>
                <span className="text-cyan-400 font-mono text-sm">REACT_VITE</span>
              </div>
            </motion.div>

            {/* نسخة النظام */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-900/50 border border-neutral-800">
                <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse"></div>
                <span className="text-xs text-neutral-500 font-mono">
                  VERSION • 2.0.1 • GALACTIC_EDITION
                </span>
              </div>
            </motion.div>
          </div>

          {/* رسالة خفية للمطورين */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-8 pt-6 border-t border-neutral-800/30"
          >
            <div className="text-xs text-neutral-700 font-mono">
              <span className="text-neutral-600">//</span> Thank you for exploring the digital cosmos. 
              This station is powered by curiosity and maintained with precision.
            </div>
            
            {/* مؤشر نهاية الرسالة */}
            <div className="flex justify-center gap-1 mt-4">
              {[1, 2, 3].map(i => (
                <motion.div
                  key={i}
                  className="w-1 h-1 rounded-full bg-neutral-700"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* تأثير إشعاع سفلي */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-500/20 to-transparent"></div>
    </footer>
  );
};

export default Footer;