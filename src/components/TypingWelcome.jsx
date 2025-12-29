import { motion } from 'framer-motion';
import { useTypingAnimation } from '../hooks/useTypingAnimation';
import { fadeUp } from '../utils/animations';

const LINES = [
  "Hello, welcome to my website.",
  "My name is Mahmoud Bousbih,",
  "a Full-Stack Developer."
];

const TypingWelcome = () => {
  const { display, showFinal } = useTypingAnimation({
    lines: LINES,
    charDelay: 50,
    linePause: 700,
    finalDelay: 800
  });

  return (
    <div className="relative font-mono">
      {/* Typing Animation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-2xl md:text-3xl lg:text-4xl text-white leading-relaxed"
        aria-live="polite"
        aria-atomic="true"
      >
        {display}
        <span className="ml-1 animate-pulse text-cyan-400" aria-hidden="true">|</span>
      </motion.div>

      {/* Final static content */}
      {showFinal && (
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mt-6 space-y-2"
        >
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
            Mahmoud Bousbih
          </h1>
          <div className="text-cyan-400 font-mono text-xl md:text-2xl">
            Full-Stack Developer
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default TypingWelcome;