import { motion } from 'framer-motion';
import { HERO_TIMING } from '../constants/timing';
import TypingWelcome from '../TypingWelcome';
import Description from './Description';
import ExpertiseTags from './ExpertiseTags';
import StatsGrid from './StatsGrid';
import CTAButtons from './CTAButtons';
import HeroAvatar from './HeroAvatar';
import ScrollIndicator from './ScrollIndicator';
import { fadeIn } from '../../utils/animations';

const Hero = () => {
  return (
    <section 
      id="home" 
      className="relative min-h-screen overflow-hidden"
      aria-label="Hero section - Introduction to Mahmoud Bousbih, Full-Stack Developer"
    >
      <div className="relative z-10 container mx-auto px-4 md:px-6 lg:px-8 pt-16 md:pt-20">
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-center">
          {/* Content Column */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            {/* Terminal Indicator */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: HERO_TIMING.terminal, duration: 0.5 }}
              className="flex items-center gap-2 mb-3"
            >
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-white font-mono text-xs tracking-wider opacity-70">
                TERMINAL
              </span>
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse"></div>
            </motion.div>

            {/* Typing Welcome */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: HERO_TIMING.typing, duration: 0.3 }}
            >
              <TypingWelcome />
            </motion.div>

            {/* Description */}
            <motion.div
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              transition={{ delay: HERO_TIMING.description }}
            >
              <Description />
            </motion.div>

            {/* Expertise Tags */}
            <ExpertiseTags delay={HERO_TIMING.expertise} />

            {/* Stats Grid */}
            <StatsGrid delay={HERO_TIMING.stats} />

            {/* CTA Buttons */}
            <CTAButtons delay={HERO_TIMING.cta} />
          </motion.div>

          {/* Avatar Column */}
          <HeroAvatar delay={HERO_TIMING.avatar} />
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <ScrollIndicator delay={HERO_TIMING.scroll} />

      {/* Background Effects */}
      <BackgroundEffects />
    </section>
  );
};

const BackgroundEffects = () => (
  <>
    <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-black to-purple-900/10" />
    <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl" />
    <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-purple-500/5 rounded-full blur-3xl" />
  </>
);

export default Hero;