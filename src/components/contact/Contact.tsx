import { motion } from 'framer-motion';
import { Satellite, SatelliteDish, Radio, MapPin, Zap, Signal, Github, Linkedin, Instagram } from 'lucide-react';
import { cvData } from '../../data/cvData';
import ContactForm from './ContactForm';
import ContactInfoCard from './ContactInfoCard';
import SocialLinks from './SocialLinks';

const Contact = () => {
  const contactInfo = [
    {
      icon: <SatelliteDish size={28} />,
      title: 'TRANSMISSION_FREQUENCY',
      value: cvData.personalInfo.email,
      link: `mailto:${cvData.personalInfo.email}`,
      color: 'text-cyan-400',
      description: 'Primary communication channel'
    },
    {
      icon: <Radio size={28} />,
      title: 'VOICE_COM_LINK',
      value: cvData.personalInfo.phone,
      link: `tel:${cvData.personalInfo.phone.replace(/\s+/g, '')}`,
      color: 'text-emerald-400',
      description: 'Secure audio transmission'
    },
    {
      icon: <MapPin size={28} />,
      title: 'ORBITAL_LOCATION',
      value: cvData.personalInfo.location,
      link: '#',
      color: 'text-purple-400',
      description: 'Planetary coordinates'
    }
  ];

  const socialLinks = [
    { 
      icon: <Github size={22} />, 
      href: cvData.personalInfo.github, 
      label: 'GitHub', 
      color: 'hover:text-white hover:bg-neutral-800' 
    },
    { 
      icon: <Linkedin size={22} />, 
      href: cvData.personalInfo.linkedin, 
      label: 'LinkedIn', 
      color: 'hover:text-blue-400 hover:bg-blue-900/20' 
    },
    { 
      icon: <Instagram size={22} />, 
      href: cvData.personalInfo.instagram, 
      label: 'Instagram', 
      color: 'hover:text-pink-400 hover:bg-pink-900/20' 
    }
  ];

  // Handlers for form events
  const handleFormSuccess = () => {
    console.log('Form submitted successfully!');
    // يمكنك إضافة أي إجراء إضافي هنا مثل:
    // - عرض إشعار
    // - تحديث حالة المكون
    // - إرسال بيانات تحليلية
  };

  const handleFormError = (error: string) => {
    console.error('Form submission error:', error);
    // يمكنك إضافة معالجة الأخطاء هنا
  };

  return (
    <section id="contact" className="py-32 relative overflow-hidden">
      {/* Background Effects */}
      <BackgroundEffects />
      
      <div className="section-padding max-w-7xl mx-auto relative z-10">
        <Header />
        
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            className="relative"
          >
            <ContactForm 
              onSuccess={handleFormSuccess}
              onError={handleFormError}
            />
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            className="space-y-8"
          >
            {/* Contact Channels */}
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <ContactInfoCard key={info.title} info={info} index={index} />
              ))}
            </div>

            <SocialLinks socialLinks={socialLinks} />

            <SystemStatus />
          </motion.div>
        </div>

        <Footer />
      </div>
    </section>
  );
};

// Composants séparés pour les effets
const BackgroundEffects = () => (
  <>
    <div className="absolute inset-0 opacity-10">
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/3 right-10 w-96 h-96 bg-secondary-500/5 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl"></div>
    </div>

    <motion.div 
      className="absolute top-40 right-20 text-3xl opacity-30"
      animate={{ rotate: 360 }}
      transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      aria-hidden="true"
    >
      📡
    </motion.div>
    
    <motion.div 
      className="absolute bottom-60 left-20 text-3xl opacity-30"
      animate={{ y: [0, -30, 0] }}
      transition={{ duration: 4, repeat: Infinity }}
      aria-hidden="true"
    >
      🛰️
    </motion.div>

    {/* خطوط اتصال متحركة */}
    <div className="absolute inset-0 pointer-events-none opacity-5">
      <svg className="w-full h-full">
        <defs>
          <linearGradient id="connection-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.1" />
            <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        <line x1="20%" y1="0" x2="80%" y2="100%" stroke="url(#connection-gradient)" strokeWidth="1" strokeDasharray="5,5">
          <animate attributeName="stroke-dashoffset" from="0" to="100" dur="10s" repeatCount="indefinite" />
        </line>
        <line x1="80%" y1="0" x2="20%" y2="100%" stroke="url(#connection-gradient)" strokeWidth="1" strokeDasharray="5,5">
          <animate attributeName="stroke-dashoffset" from="100" to="0" dur="10s" repeatCount="indefinite" />
        </line>
      </svg>
    </div>
  </>
);

const Header = () => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    className="text-center mb-20 relative"
  >
    {/* تأثير التوهج */}
    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-purple-500/5 blur-3xl -z-10"></div>
    
    <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass-panel border border-cyan-500/30 mb-6 group hover:border-cyan-500/50 transition-all duration-300">
      <Satellite size={18} className="text-cyan-400 group-hover:text-cyan-300" />
      <span className="text-cyan-300 font-mono text-sm tracking-wider">COMMUNICATION_PROTOCOL</span>
      <div className="ml-2 flex gap-1">
        <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse"></div>
        <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
      </div>
    </div>
    
    <div className="relative">
      <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-primary-400 to-purple-400 bg-clip-text text-transparent">
        Mission Control
      </h2>
      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 text-3xl opacity-30" aria-hidden="true">
        📡
      </div>
    </div>
    
    <p className="text-neutral-400 max-w-3xl mx-auto text-lg md:text-xl font-mono leading-relaxed">
      <span className="text-cyan-400">//</span> Establish secure connection for collaborative space missions
    </p>
  </motion.div>
);

const SystemStatus = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.3 }}
    className="glass-panel rounded-2xl p-8 border border-emerald-500/20 bg-gradient-to-br from-emerald-500/5 to-transparent"
  >
    <div className="flex items-center gap-3 mb-6">
      <motion.div
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <Zap size={24} className="text-emerald-400" />
      </motion.div>
      <div>
        <h3 className="text-xl font-bold text-white mb-1">MISSION_STATUS</h3>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
          <span className="text-emerald-400 font-mono text-sm">READY_FOR_COLLABORATION</span>
        </div>
      </div>
    </div>
    
    <p className="text-neutral-400 text-sm font-mono mb-4">
      <span className="text-emerald-400">//</span> Currently accepting new collaborative missions and orbital partnerships. Signal processing active.
    </p>
    
    <div className="space-y-3">
      <ProgressBar label="AVAILABILITY" value="IMMEDIATE" width="80%" color="from-emerald-500 to-cyan-500" delay={0.5} />
      <ProgressBar label="RESPONSE_TIME" value="24h" width="100%" color="from-cyan-500 to-blue-500" delay={0.7} />
    </div>
  </motion.div>
);

interface ProgressBarProps {
  label: string;
  value: string;
  width: string;
  color: string;
  delay: number;
}

const ProgressBar = ({ label, value, width, color, delay }: ProgressBarProps) => (
  <>
    <div className="flex items-center justify-between text-sm">
      <span className="text-neutral-500 font-mono">{label}</span>
      <span className="text-emerald-400 font-mono">{value}</span>
    </div>
    <div className="h-1.5 bg-neutral-800 rounded-full overflow-hidden">
      <motion.div 
        className={`h-full bg-gradient-to-r ${color}`}
        initial={{ width: 0 }}
        whileInView={{ width }}
        transition={{ duration: 1, delay }}
      />
    </div>
  </>
);

const Footer = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    className="text-center mt-20 pt-8 border-t border-neutral-800/50"
  >
    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-900/30 border border-neutral-800">
      <Signal size={16} className="text-cyan-400" />
      <span className="text-xs text-neutral-500 font-mono">TRANSMISSION_PROTOCOL: ENCRYPTED • SECURE • ACTIVE</span>
    </div>
    
    <p className="text-neutral-600 text-sm font-mono mt-4 max-w-2xl mx-auto">
      <span className="text-cyan-400">//</span> All communications are encrypted using quantum-safe protocols. Response guaranteed within 24 Earth hours.
    </p>
  </motion.div>
);

export default Contact;