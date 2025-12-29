// utils/skillIcons.ts
import { 
  SiJavascript, SiTypescript, SiReact, SiNextdotjs, SiNodedotjs, 
  SiExpress, SiMongodb, SiPostgresql, SiRedis, SiDocker, 
  SiKubernetes, SiGooglecloud, SiGit, SiGithub, SiGitlab,
  SiJenkins, SiCircleci, SiJest, SiCypress, SiStorybook,
  SiTailwindcss, SiSass, SiBootstrap, SiMui, SiChakraui,
  SiFigma, SiAdobe, SiWebpack, SiVite, SiEslint, SiPrettier,
  SiPython, SiDjango, SiFastapi, SiFlask, SiSpring,
  SiDotnet, SiPhp, SiLaravel, SiGraphql, SiApollographql,
  SiRedux, SiReactquery, SiSocketdotio, SiFirebase, SiSupabase,
  SiVuedotjs, SiAngular, SiSvelte, SiElectron, SiExpo, 
  SiIonic, SiFlutter, SiDart, SiGo, SiRust, SiTensorflow, 
  SiPytorch, SiPandas, SiNumpy, SiJupyter, SiLinux, SiUbuntu,
  SiApple, SiAndroid, SiNginx, SiApache, SiPostman, SiSwagger,
  SiMarkdown, SiNotion, SiSlack, SiDiscord, SiZoom,
  SiAmazon
} from 'react-icons/si';

import { 
  FaJava, FaAws, FaWindows, FaMicrosoft as FaMicrosoftTeams,
  FaDatabase, FaServer, FaMobileAlt, FaDesktop, FaCloud,
  FaCode, FaHtml5, FaCss3Alt, FaGitAlt, FaTerminal,
  FaLinux, FaApple, FaAndroid, FaRobot,
  FaChartLine, FaShieldAlt, FaLock, FaGlobe, FaNetworkWired,
  FaReact
} from 'react-icons/fa';

import { 
  TbBrandNextjs, TbBrandVue, TbBrandSvelte, TbBrandAngular, 
  TbBrandNodejs, TbBrandMongodb, TbBrandDocker,
  TbBrandAws, TbBrandAzure, TbBrandGithub, TbBrandGitlab, TbBrandFigma
} from 'react-icons/tb';

export const skillIcons: Record<string, JSX.Element> = {
  // Frontend
  'JavaScript': <SiJavascript className="text-yellow-400" size={20} />,
  'TypeScript': <SiTypescript className="text-blue-600" size={20} />,
  'React': <SiReact className="text-cyan-400" size={20} />,
  'Next.js': <SiNextdotjs className="text-white" size={20} />,
  'Vue.js': <SiVuedotjs className="text-green-500" size={20} />,
  'Angular': <SiAngular className="text-red-600" size={20} />,
  'Svelte': <SiSvelte className="text-orange-500" size={20} />,
  'HTML5': <FaHtml5 className="text-orange-500" size={20} />,
  'CSS3': <FaCss3Alt className="text-blue-500" size={20} />,
  'Tailwind CSS': <SiTailwindcss className="text-teal-400" size={20} />,
  'SASS/SCSS': <SiSass className="text-pink-500" size={20} />,
  'Bootstrap': <SiBootstrap className="text-purple-500" size={20} />,
  'Material-UI': <SiMui className="text-blue-400" size={20} />,
  'Chakra UI': <SiChakraui className="text-teal-300" size={20} />,
  
  // Backend
  'Node.js': <SiNodedotjs className="text-green-600" size={20} />,
  'Express.js': <SiExpress className="text-gray-300" size={20} />,
  'Python': <SiPython className="text-yellow-500" size={20} />,
  'Django': <SiDjango className="text-green-700" size={20} />,
  'FastAPI': <SiFastapi className="text-teal-500" size={20} />,
  'Flask': <SiFlask className="text-gray-300" size={20} />,
  'Java': <FaJava className="text-red-500" size={20} />,
  'Spring Boot': <SiSpring className="text-green-500" size={20} />,
  'C#': <SiDotnet className="text-purple-500" size={20} />,
  '.NET': <SiDotnet className="text-purple-500" size={20} />,
  'PHP': <SiPhp className="text-purple-400" size={20} />,
  'Laravel': <SiLaravel className="text-red-500" size={20} />,
  'GraphQL': <SiGraphql className="text-pink-600" size={20} />,
  
  // Databases
  'MongoDB': <SiMongodb className="text-green-500" size={20} />,
  'PostgreSQL': <SiPostgresql className="text-blue-400" size={20} />,
  'MySQL': <FaDatabase className="text-blue-300" size={20} />,
  'Redis': <SiRedis className="text-red-500" size={20} />,
  'Firebase': <SiFirebase className="text-yellow-500" size={20} />,
  'Supabase': <SiSupabase className="text-green-400" size={20} />,
  
  // DevOps & Cloud
  'Docker': <SiDocker className="text-blue-500" size={20} />,
  'Kubernetes': <SiKubernetes className="text-blue-600" size={20} />,
  'AWS': <FaAws className="text-orange-400" size={20} />,
  'Azure': <TbBrandAzure className="text-blue-500" size={20} />,
  'Google Cloud': <SiGooglecloud className="text-blue-400" size={20} />,
  'Git': <SiGit className="text-orange-500" size={20} />,
  'GitHub': <SiGithub className="text-white" size={20} />,
  'GitLab': <SiGitlab className="text-orange-500" size={20} />,
  'CI/CD': <SiCircleci className="text-gray-300" size={20} />,
  'Jenkins': <SiJenkins className="text-red-400" size={20} />,
  'Linux': <SiLinux className="text-yellow-500" size={20} />,
  'Nginx': <SiNginx className="text-green-500" size={20} />,
  
  // Testing & Tools
  'Jest': <SiJest className="text-red-800" size={20} />,
  'Cypress': <SiCypress className="text-gray-300" size={20} />,
  'Storybook': <SiStorybook className="text-pink-500" size={20} />,
  'Webpack': <SiWebpack className="text-blue-400" size={20} />,
  'Vite': <SiVite className="text-purple-500" size={20} />,
  'ESLint': <SiEslint className="text-purple-400" size={20} />,
  'Prettier': <SiPrettier className="text-gray-400" size={20} />,
  'Figma': <SiFigma className="text-purple-600" size={20} />,
  'Postman': <SiPostman className="text-orange-500" size={20} />,
  
  // Mobile & Desktop
  'React Native': <FaReact className="text-cyan-400" size={20} />,
  'Flutter': <SiFlutter className="text-blue-400" size={20} />,
  'Electron': <SiElectron className="text-blue-500" size={20} />,
  'Ionic': <SiIonic className="text-blue-600" size={20} />,
  
  // State Management
  'Redux': <SiRedux className="text-purple-500" size={20} />,
  'React Query': <SiReactquery className="text-red-500" size={20} />,
  'Socket.io': <SiSocketdotio className="text-white" size={20} />,
  
  // Other
  'REST API': <FaGlobe className="text-green-400" size={20} />,
  'Microservices': <FaNetworkWired className="text-blue-400" size={20} />,
  'Agile/Scrum': <FaChartLine className="text-orange-400" size={20} />,
  'Security': <FaLock className="text-yellow-400" size={20} />,
  'Machine Learning': <FaRobot className="text-purple-400" size={20} />,
  'AI': <FaRobot className="text-pink-400" size={20} />,
  'Windows': <FaWindows className="text-blue-500" size={20} />,
  'Microsoft Teams': <FaMicrosoftTeams className="text-blue-600" size={20} />,
};

export const getSkillIcon = (skillName: string): JSX.Element => {
  const icon = skillIcons[skillName];
  if (icon) {
    return icon;
  }
  
  // أيقونة افتراضية للمهارات غير المعروفة
  return <FaCode className="text-gray-400" size={20} />;
};