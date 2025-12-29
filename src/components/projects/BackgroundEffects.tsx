import { motion } from 'framer-motion';

const BackgroundEffects = () => {
  return (
    <>
      {/* خلفية فضائية */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* أقمار صناعية متحركة */}
      <motion.div 
        className="absolute top-40 left-10 text-3xl opacity-30"
        animate={{ rotate: 360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        aria-hidden="true"
      >
        🛰️
      </motion.div>
      
      <motion.div 
        className="absolute bottom-60 right-16 text-3xl opacity-30"
        animate={{ y: [0, -30, 0], rotate: [0, 10, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
        aria-hidden="true"
      >
        🚀
      </motion.div>
    </>
  );
};

export default BackgroundEffects;