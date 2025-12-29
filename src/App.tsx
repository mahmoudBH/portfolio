import { useState, useEffect, useRef, useCallback } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/hero/Hero';
import About from './components/about/About';
import Projects from './components/projects/Projects';
import Contact from './components/contact/Contact';
import Footer from './components/Footer';
import AnimatedBackground from './components/AnimatedBackground';
import { ChevronUp, Sparkles, Zap, Cpu, Satellite, Terminal, Brain } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Sections configuration
const SECTIONS = [
  { section: 'home', label: 'Home', icon: '🚀', color: 'bg-blue-500' },
  { section: 'about', label: 'About', icon: '⭐', color: 'bg-emerald-500' },
  { section: 'projects', label: 'Projects', icon: '🛰️', color: 'bg-purple-500' },
  { section: 'contact', label: 'Contact', icon: '📡', color: 'bg-cyan-500' },
];

// Loading messages for the AI loader
const LOADING_MESSAGES = [
  'Initializing neural network...',
  'Analyzing portfolio data...',
  'Optimizing user experience...',
  'Deploying interface...',
  'Establishing secure connection...',
  'Calibrating visual systems...',
  'Preparing mission control...',
  'System check complete!',
];

function App() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [currentLoadingMessage, setCurrentLoadingMessage] = useState(0);
  const [activeSection, setActiveSection] = useState('home');
  const [systemStatus, setSystemStatus] = useState('INITIALIZING');
  const tickingRef = useRef(false);
  const loadingIntervalRef = useRef<number | null>(null);

  // Handle scroll events with requestAnimationFrame for performance
  const handleScroll = useCallback(() => {
    if (!tickingRef.current) {
      tickingRef.current = true;
      window.requestAnimationFrame(() => {
        // Show scroll to top button
        setShowScrollTop(window.scrollY > 300);
        
        // Calculate scroll progress
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight || 1;
        const progress = Math.min(100, (window.scrollY / totalHeight) * 100);
        setScrollProgress(progress);
        
        // Determine active section
        const sections = SECTIONS.map(s => s.section);
        const current = sections.find(section => {
          const element = document.getElementById(section);
          if (element) {
            const rect = element.getBoundingClientRect();
            return rect.top <= 100 && rect.bottom >= 100;
          }
          return false;
        });
        
        if (current) {
          setActiveSection(current);
          // Update system status based on active section
          switch(current) {
            case 'home': setSystemStatus('NEURAL_LINK: STABLE'); break;
            case 'about': setSystemStatus('ANALYZING_PROFILE'); break;
            case 'projects': setSystemStatus('DEPLOYMENT_ACTIVE'); break;
            case 'contact': setSystemStatus('CONNECTING'); break;
            default: setSystemStatus('SYSTEM_OK • AI_ACTIVE');
          }
        }
        
        tickingRef.current = false;
      });
    }
  }, []);

  // Setup scroll listener with throttling
  useEffect(() => {
    const throttledScroll = () => handleScroll();
    window.addEventListener('scroll', throttledScroll, { passive: true });
    
    return () => window.removeEventListener('scroll', throttledScroll);
  }, [handleScroll]);

  // Handle loading state and messages
  useEffect(() => {
    if (isLoading) {
      let messageIndex = 0;
      setCurrentLoadingMessage(0);
      
      loadingIntervalRef.current = setInterval(() => {
        messageIndex = (messageIndex + 1) % LOADING_MESSAGES.length;
        setCurrentLoadingMessage(messageIndex);
      }, 800);

      // Simulate loading completion
      const timer = setTimeout(() => {
        setIsLoading(false);
        setSystemStatus('NEURAL_LINK: STABLE');
        if (loadingIntervalRef.current !== null) {
          if (loadingIntervalRef.current !== null) {
            clearInterval(loadingIntervalRef.current);
          }
        }
      }, 2800);

      return () => {
        clearTimeout(timer);
        if (loadingIntervalRef.current !== null) {
          clearInterval(loadingIntervalRef.current);
        }
      };
    }
  }, [isLoading]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  // Get scroll indicator color based on active section
  const getScrollColor = () => {
    const section = SECTIONS.find(s => s.section === activeSection);
    if (section) {
      switch(section.section) {
        case 'home': return 'from-blue-500 to-cyan-500';
        case 'about': return 'from-emerald-500 to-green-500';
        case 'projects': return 'from-purple-500 to-pink-500';
        case 'contact': return 'from-cyan-500 to-blue-500';
        default: return 'from-blue-500 to-purple-500';
      }
    }
    return 'from-blue-500 to-purple-500';
  };

  // Easter egg: AI Mode
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.shiftKey && e.key === 'A') {
        console.log('%c🤖 AI MODE ENABLED', 'color: #00ff00; font-size: 24px; font-weight: bold;');
        console.log('%cNeural network activated. All systems optimal.', 'color: #00ffff;');
        setSystemStatus('AI_MODE_ACTIVE • NEURAL_MAX');
        
        // Reset after 5 seconds
        setTimeout(() => {
          setSystemStatus('NEURAL_LINK: STABLE');
        }, 5000);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  // Loading screen with advanced AI animation
  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-neutral-950 flex items-center justify-center z-50">
        {/* Background effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        </div>

        <div className="relative z-10 text-center max-w-md">
          {/* AI Brain Animation */}
          <div className="relative w-32 h-32 mx-auto mb-8">
            <div className="absolute inset-0 border-4 border-blue-500/20 rounded-full animate-ping"></div>
            <div className="absolute inset-0 border-4 border-transparent rounded-full animate-spin">
              <div className="absolute inset-0 border-t-4 border-blue-500 rounded-full"></div>
            </div>
            <div className="absolute inset-6 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center">
              <Brain className="w-16 h-16 text-blue-400 animate-pulse" />
            </div>
          </div>
          
          {/* Code Typing Animation */}
          <div className="font-mono mb-6 h-8">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.8, ease: "easeInOut" }}
              className="overflow-hidden whitespace-nowrap border-r-2 border-blue-500"
            >
              <span className="text-blue-400">const</span>{' '}
              <span className="text-purple-400">aiPortfolio</span>{' '}
              <span className="text-gray-300">=</span>{' '}
              <span className="text-green-400">await</span>{' '}
              <span className="text-cyan-400">loadExperience</span>
              <span className="text-gray-300">()</span>
              <span className="text-yellow-400">;</span>
            </motion.div>
          </div>
          
          {/* Dynamic Loading Message */}
          <motion.div
            key={currentLoadingMessage}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-lg font-medium text-blue-400 mb-2 h-8"
          >
            {LOADING_MESSAGES[currentLoadingMessage]}
          </motion.div>
          
          {/* Loading Progress */}
          <div className="w-64 h-1 bg-neutral-800 rounded-full overflow-hidden mt-4 mx-auto">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 2.5, ease: "easeInOut" }}
            />
          </div>
          
          {/* Hint Text */}
          <div className="mt-6 text-xs text-neutral-600 font-mono">
            <span className="text-neutral-600">//</span> Press Shift + A for AI mode
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-transparent overflow-x-hidden">
      {/* Animated Starry Background with JavaScript Elements */}
      <AnimatedBackground />

      {/* Main Content - z-index 10 */}
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <About />
        <Projects />
        <Contact />
        <Footer />
      </div>

      {/* Scroll Progress Indicator - z-index 40 */}
      <div className="fixed left-4 top-1/2 transform -translate-y-1/2 hidden lg:block z-40">
        <div className="flex flex-col items-center space-y-3">
          <div 
            className="relative h-40 w-0.5 bg-gray-900/30 backdrop-blur-sm rounded-full overflow-hidden border border-gray-800/30"
            role="progressbar"
            aria-valuenow={Math.round(scrollProgress)}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <motion.div
              className={`w-full bg-gradient-to-b ${getScrollColor()}`}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: scrollProgress / 100 }}
              style={{ originY: 1 }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
            />
          </div>
          <motion.div
            className="text-xs font-mono text-gray-300 bg-gray-900/50 backdrop-blur-sm px-2 py-1 rounded border border-gray-800/30"
            animate={{
              scale: scrollProgress === 0 || scrollProgress === 100 ? 1 : 1.05,
            }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {Math.round(scrollProgress)}%
          </motion.div>
        </div>
      </div>

      {/* Navigation Dots - z-index 40 */}
      <div className="fixed right-4 top-1/2 transform -translate-y-1/2 hidden lg:block z-40">
        <div className="flex flex-col items-center space-y-4">
          {SECTIONS.map((item) => {
            const isActive = activeSection === item.section;
            return (
              <motion.button
                key={item.section}
                onClick={() => scrollToSection(item.section)}
                className="relative group"
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300 }}
                aria-label={`Go to ${item.label} section`}
                aria-current={isActive ? 'page' : undefined}
              >
                <div className="relative">
                  {/* Active indicator */}
                  {isActive && (
                    <motion.div
                      className={`absolute -inset-2 ${item.color.replace('bg', 'bg')}/20 rounded-full`}
                      layoutId="active-dot"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  
                  {/* Dot */}
                  <div className={`w-3 h-3 rounded-full transition-colors duration-200 flex items-center justify-center
                    ${isActive ? `${item.color} ring-2 ring-white/20` : 'bg-gray-800 group-hover:bg-gray-700'}`}>
                    <span className={`text-[10px] transition-opacity ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                      {item.icon}
                    </span>
                  </div>
                  
                  {/* Tooltip */}
                  <div className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    <div className="bg-gray-900/90 backdrop-blur-sm text-white text-xs font-mono px-2 py-1 rounded whitespace-nowrap">
                      {item.label}
                    </div>
                    <div className="absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-gray-900/90 rotate-45"></div>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Scroll to Top Button - z-index 40 */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0, y: 30 }}
            onClick={scrollToTop}
            className="fixed bottom-4 right-4 p-3 bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-full hover:border-blue-500/50 transition-all z-40 group"
            aria-label="Scroll to top"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            <div className="relative">
              <ChevronUp size={20} className="text-gray-300 group-hover:text-blue-400 transition-colors" />
              <motion.div
                className="absolute -inset-2 bg-blue-500/10 rounded-full opacity-0 group-hover:opacity-100"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* System Status - z-index 40 */}
      <div className="fixed bottom-4 left-4 hidden lg:block z-40">
        <motion.div 
          className="flex items-center gap-2 px-3 py-1.5 bg-gray-900/70 backdrop-blur-sm border border-gray-800/50 rounded-full group cursor-help"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1 }}
          title="AI System Status - Real-time monitoring active"
        >
          <div className="flex items-center gap-1">
            <Brain size={12} className="text-emerald-400 group-hover:animate-pulse" />
            <span className="text-xs text-emerald-400 font-mono">
              {systemStatus}
            </span>
          </div>
          <div className="flex gap-0.5 ml-1">
            <motion.div 
              className="w-1.5 h-1.5 bg-emerald-500 rounded-full"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <motion.div 
              className="w-1.5 h-1.5 bg-cyan-500 rounded-full"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
            />
            <motion.div 
              className="w-1.5 h-1.5 bg-purple-500 rounded-full"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default App;