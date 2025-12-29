import { useState, useEffect, useRef } from 'react';
import { Menu, X, Home, User, FolderKanban, Mail, Code2, Satellite } from 'lucide-react';
import { motion } from 'framer-motion';

// Helper function to extract section from href
const getSectionFromHref = (href) => href.replace('#', '');

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [navStatus, setNavStatus] = useState('IDLE');
  const observerRef = useRef(null);
  const navItemsRef = useRef([]);

  const navItems = [
    { name: 'Home', icon: <Home size={18} />, href: '#home' },
    { name: 'About', icon: <User size={18} />, href: '#about' },
    { name: 'Projects', icon: <FolderKanban size={18} />, href: '#projects' },
    { name: 'Contact', icon: <Mail size={18} />, href: '#contact' },
  ];

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  // Update navigation status based on active section
  useEffect(() => {
    switch (activeSection) {
      case 'home':
        setNavStatus('IDLE');
        break;
      case 'about':
        setNavStatus('ANALYZING_PROFILE');
        break;
      case 'projects':
        setNavStatus('ANALYZING_MISSIONS');
        break;
      case 'contact':
        setNavStatus('CONNECTING');
        break;
      default:
        setNavStatus('ONLINE');
    }
  }, [activeSection]);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // IntersectionObserver for active section detection
  useEffect(() => {
    const sections = ['home', 'about', 'projects', 'contact'];
    
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        root: null,
        rootMargin: '-50% 0px -50% 0px',
        threshold: 0,
      }
    );

    // Observe all sections
    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observerRef.current.observe(element);
      }
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      const mobileMenu = document.querySelector('.mobile-menu');
      const menuButton = document.querySelector('.menu-button');
      
      if (
        isOpen &&
        mobileMenu &&
        !mobileMenu.contains(event.target) &&
        menuButton &&
        !menuButton.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Handle navigation click
  const handleNavClick = (href) => {
    const sectionId = getSectionFromHref(href);
    setActiveSection(sectionId);
    setIsOpen(false);
    
    // Smooth scroll to section
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed w-full z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-neutral-950/95 backdrop-blur-xl py-3 border-b border-neutral-800/50 shadow-lg shadow-black/20' 
          : 'py-5 bg-gradient-to-b from-neutral-950/90 via-neutral-950/80 to-transparent'
      }`}
      aria-label="Main navigation"
    >
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <motion.div
            whileHover={{ rotate: -2, scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => handleNavClick('#home')}
          >
            <div className="relative">
              <Code2 className="text-primary-400 group-hover:text-cyan-400 transition-colors" size={24} />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                className="absolute -top-1 -right-1"
              >
                <Satellite size={12} className="text-cyan-400" />
              </motion.div>
            </div>
            <div>
              <div className="text-xl font-bold bg-gradient-to-r from-primary-400 to-cyan-400 bg-clip-text text-transparent">
                Mahmoud Bousbih
              </div>
              <div className="flex items-center gap-2">
                <div className="text-xs text-neutral-500 font-mono">Full-Stack Developer</div>
                <div className="flex items-center gap-1">
                  <motion.div
                    className="w-1.5 h-1.5 rounded-full bg-emerald-500"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <span className="text-[10px] font-mono text-emerald-400">
                    AI_NAV: {navStatus}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const section = getSectionFromHref(item.href);
              const isActive = activeSection === section;
              
              return (
                <motion.button
                  key={item.name}
                  onClick={() => handleNavClick(item.href)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative flex items-center space-x-2 px-4 py-2.5 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-primary-500/30"
                  aria-label={`Navigate to ${item.name} section`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute inset-0 rounded-full bg-primary-500/10 border border-primary-500/30"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  
                  <span className={`relative z-10 ${isActive ? 'text-primary-400' : 'text-neutral-400 hover:text-white'}`}>
                    {item.icon}
                  </span>
                  <span className={`relative z-10 text-sm font-medium ${isActive ? 'text-primary-400' : 'text-neutral-400 hover:text-white'}`}>
                    {item.name}
                  </span>
                </motion.button>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden p-2 bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 rounded-lg menu-button"
            onClick={() => setIsOpen(!isOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden mt-4 bg-neutral-900/95 backdrop-blur-xl rounded-xl border border-neutral-800 overflow-hidden mobile-menu"
          >
            <div className="py-2 flex flex-col space-y-1">
              {navItems.map((item) => {
                const section = getSectionFromHref(item.href);
                const isActive = activeSection === section;
                
                return (
                  <button
                    key={item.name}
                    onClick={() => handleNavClick(item.href)}
                    className={`flex items-center space-x-3 py-3 px-4 transition-all text-left ${
                      isActive
                        ? 'bg-primary-500/10 text-primary-400 border-l-4 border-primary-500'
                        : 'hover:bg-neutral-800/50'
                    }`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <span className={isActive ? 'text-primary-400' : 'text-neutral-400'}>
                      {item.icon}
                    </span>
                    <span className={isActive ? 'text-primary-400 font-medium' : 'text-neutral-300'}>
                      {item.name}
                    </span>
                    {isActive && (
                      <motion.div
                        className="ml-auto w-2 h-2 rounded-full bg-primary-500"
                        animate={{ scale: [1, 1.5, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
            
            {/* Mobile Status */}
            <div className="border-t border-neutral-800/50 p-4">
              <div className="flex items-center justify-between">
                <div className="text-xs text-neutral-500 font-mono">NAV_STATUS</div>
                <div className="flex items-center gap-2">
                  <motion.div
                    className="w-2 h-2 rounded-full bg-emerald-500"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                  <span className="text-xs font-mono text-emerald-400">
                    {navStatus}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
      
      {/* Connection Line Animation */}
      <svg className="absolute bottom-0 left-0 right-0 h-px overflow-hidden">
        <motion.line
          x1="0"
          y1="0"
          x2="100%"
          y2="0"
          stroke="url(#nav-gradient)"
          strokeWidth="1"
          strokeDasharray="10,5"
          initial={{ strokeDashoffset: 0 }}
          animate={{ 
            strokeDashoffset: scrolled ? 100 : 0,
            opacity: scrolled ? 1 : 0.5
          }}
          transition={{ 
            strokeDashoffset: { duration: scrolled ? 20 : 40, repeat: Infinity, ease: "linear" },
            opacity: { duration: 0.3 }
          }}
        />
        <defs>
          <linearGradient id="nav-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0ea5e9" />
            <stop offset="50%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#0ea5e9" />
          </linearGradient>
        </defs>
      </svg>
      
      {/* Scroll Progress Indicator */}
      <motion.div
        className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary-500 to-cyan-500"
        animate={{ 
          width: scrolled ? `${Math.min((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100, 100)}%` : '0%' 
        }}
        transition={{ duration: 0.1 }}
      />
    </motion.nav>
  );
};

export default Navbar;