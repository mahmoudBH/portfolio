// utils/techIcons.ts
import { 
  SiReact, SiNodedotjs, SiTypescript, SiJavascript, SiPython,
  SiNextdotjs, SiMongodb, SiPostgresql, SiMysql, SiDocker,
  SiKubernetes, SiAmazon, SiGraphql,
  SiTailwindcss, SiRedux, SiReactquery, SiSocketdotio,
  SiFirebase, SiSupabase, SiFastapi, SiDjango, SiFlask,
  SiLaravel, SiPhp, SiDotnet, SiSpring,
  SiVuedotjs, SiAngular, SiSvelte, SiFlutter,
  SiGit, SiGithub, SiGitlab, SiJest, SiCypress,
  SiFigma, SiPostman, SiSwagger
} from 'react-icons/si';

import {
  FaAws, FaJava, FaPython, FaDocker, FaDatabase,
  FaServer, FaMobileAlt, FaCloud, FaReact,
  FaHtml5, FaCss3Alt, FaNodeJs, FaLinux, FaMicrosoft
} from 'react-icons/fa';

export const TECH_ICONS: Record<string, { icon: JSX.Element; label: string }> = {
  // Frontend
  'React': { 
    icon: <SiReact className="text-cyan-400" size={20} />, 
    label: 'React' 
  },
  'Next.js': { 
    icon: <SiNextdotjs className="text-white" size={20} />, 
    label: 'Next.js' 
  },
  'TypeScript': { 
    icon: <SiTypescript className="text-blue-600" size={20} />, 
    label: 'TypeScript' 
  },
  'JavaScript': { 
    icon: <SiJavascript className="text-yellow-400" size={20} />, 
    label: 'JavaScript' 
  },
  'Tailwind CSS': { 
    icon: <SiTailwindcss className="text-teal-400" size={20} />, 
    label: 'Tailwind CSS' 
  },
  'Redux': { 
    icon: <SiRedux className="text-purple-500" size={20} />, 
    label: 'Redux' 
  },
  'Vue.js': { 
    icon: <SiVuedotjs className="text-green-500" size={20} />, 
    label: 'Vue.js' 
  },
  'Angular': { 
    icon: <SiAngular className="text-red-600" size={20} />, 
    label: 'Angular' 
  },
  'Svelte': { 
    icon: <SiSvelte className="text-orange-500" size={20} />, 
    label: 'Svelte' 
  },
  
  // Backend
  'Node.js': { 
    icon: <SiNodedotjs className="text-green-600" size={20} />, 
    label: 'Node.js' 
  },
  'Python': { 
    icon: <SiPython className="text-yellow-500" size={20} />, 
    label: 'Python' 
  },
  'FastAPI': { 
    icon: <SiFastapi className="text-teal-500" size={20} />, 
    label: 'FastAPI' 
  },
  'Django': { 
    icon: <SiDjango className="text-green-700" size={20} />, 
    label: 'Django' 
  },
  'Flask': { 
    icon: <SiFlask className="text-gray-300" size={20} />, 
    label: 'Flask' 
  },
  'Java': { 
    icon: <FaJava className="text-red-500" size={20} />, 
    label: 'Java' 
  },
  'Spring Boot': { 
    icon: <SiSpring className="text-green-500" size={20} />, 
    label: 'Spring Boot' 
  },
  '.NET': { 
    icon: <SiDotnet className="text-purple-500" size={20} />, 
    label: '.NET' 
  },
  'PHP': { 
    icon: <SiPhp className="text-purple-400" size={20} />, 
    label: 'PHP' 
  },
  'Laravel': { 
    icon: <SiLaravel className="text-red-500" size={20} />, 
    label: 'Laravel' 
  },
  'GraphQL': { 
    icon: <SiGraphql className="text-pink-600" size={20} />, 
    label: 'GraphQL' 
  },
  
  // Databases
  'MongoDB': { 
    icon: <SiMongodb className="text-green-500" size={20} />, 
    label: 'MongoDB' 
  },
  'PostgreSQL': { 
    icon: <SiPostgresql className="text-blue-400" size={20} />, 
    label: 'PostgreSQL' 
  },
  'MySQL': { 
    icon: <SiMysql className="text-orange-500" size={20} />, 
    label: 'MySQL' 
  },
  'Firebase': { 
    icon: <SiFirebase className="text-yellow-500" size={20} />, 
    label: 'Firebase' 
  },
  'Supabase': { 
    icon: <SiSupabase className="text-green-400" size={20} />, 
    label: 'Supabase' 
  },
  'Redis': { 
    icon: <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center">
      <span className="text-xs text-white">R</span>
    </div>, 
    label: 'Redis' 
  },
  
  // DevOps & Cloud
  'Docker': { 
    icon: <SiDocker className="text-blue-500" size={20} />, 
    label: 'Docker' 
  },
  'Kubernetes': { 
    icon: <SiKubernetes className="text-blue-600" size={20} />, 
    label: 'Kubernetes' 
  },
  'AWS': { 
    icon: <FaAws className="text-orange-400" size={20} />, 
    label: 'AWS' 
  },
  'Azure': { 
    icon: <FaMicrosoft className="text-blue-500" size={20} />,
    label: 'Azure' 
  },
  'Google Cloud': { 
    icon: <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
      <span className="text-xs text-white">G</span>
    </div>, 
    label: 'Google Cloud' 
  },
  'Linux': { 
    icon: <FaLinux className="text-yellow-500" size={20} />, 
    label: 'Linux' 
  },
  
  // Mobile
  'React Native': { 
    icon: <FaReact className="text-cyan-400" size={20} />, 
    label: 'React Native' 
  },
  'Flutter': { 
    icon: <SiFlutter className="text-blue-400" size={20} />, 
    label: 'Flutter' 
  },
  
  // Other
  'AI': { 
    icon: <div className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center">
      <span className="text-xs text-white">AI</span>
    </div>, 
    label: 'Artificial Intelligence' 
  },
  'Machine Learning': { 
    icon: <div className="w-5 h-5 rounded-full bg-pink-500 flex items-center justify-center">
      <span className="text-xs text-white">ML</span>
    </div>, 
    label: 'Machine Learning' 
  },
  'React Query': { 
    icon: <SiReactquery className="text-red-500" size={20} />, 
    label: 'React Query' 
  },
  'Socket.io': { 
    icon: <SiSocketdotio className="text-white" size={20} />, 
    label: 'Socket.io' 
  },
  'HTML5': { 
    icon: <FaHtml5 className="text-orange-500" size={20} />, 
    label: 'HTML5' 
  },
  'CSS3': { 
    icon: <FaCss3Alt className="text-blue-500" size={20} />, 
    label: 'CSS3' 
  },
  'Git': { 
    icon: <SiGit className="text-orange-500" size={20} />, 
    label: 'Git' 
  },
  'GitHub': { 
    icon: <SiGithub className="text-white" size={20} />, 
    label: 'GitHub' 
  },
  'GitLab': { 
    icon: <SiGitlab className="text-orange-500" size={20} />, 
    label: 'GitLab' 
  },
  'Jest': { 
    icon: <SiJest className="text-red-800" size={20} />, 
    label: 'Jest' 
  },
  'Cypress': { 
    icon: <SiCypress className="text-gray-300" size={20} />, 
    label: 'Cypress' 
  },
  'Figma': { 
    icon: <SiFigma className="text-purple-600" size={20} />, 
    label: 'Figma' 
  },
  'Postman': { 
    icon: <SiPostman className="text-orange-500" size={20} />, 
    label: 'Postman' 
  },
  'Swagger': { 
    icon: <SiSwagger className="text-green-500" size={20} />, 
    label: 'Swagger' 
  }
};

export const getTechIcon = (tech: string) => {
  return TECH_ICONS[tech] || {
    icon: <div className="w-5 h-5 rounded-full bg-neutral-600 flex items-center justify-center">
      <span className="text-xs text-white">?</span>
    </div>,
    label: tech
  };
};