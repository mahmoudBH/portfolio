import { motion } from 'framer-motion';
import { fadeUp } from '../../utils/animations';

interface DescriptionProps {
  delay?: number;
}

const Description = ({ delay = 0 }: DescriptionProps) => {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      transition={{ delay }}
      className="space-y-3"
    >
      <DescriptionItem
        iconColor="bg-blue-500"
        text={
          <>
            Navigating the digital cosmos since 2020. I architect and deploy 
            <span className="text-blue-400"> cutting-edge solutions</span> across the 
            full-stack spectrum.
          </>
        }
      />
      
      <DescriptionItem
        iconColor="bg-purple-500"
        text={
          <>
            Specializing in <span className="text-purple-400">React, Node.js, and cloud infrastructure</span>. 
            Transforming complex challenges into elegant, scalable digital experiences.
          </>
        }
      />
    </motion.div>
  );
};

interface DescriptionItemProps {
  iconColor: string;
  text: React.ReactNode;
}

const DescriptionItem = ({ iconColor, text }: DescriptionItemProps) => (
  <div className="flex items-start gap-2">
    <div className={`w-1.5 h-1.5 rounded-full ${iconColor} mt-1.5 animate-pulse`} />
    <p className="text-base md:text-lg text-gray-400 leading-relaxed">
      {text}
    </p>
  </div>
);

export default Description;