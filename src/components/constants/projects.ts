// constants/projects.ts
export const PROJECT_STATS = [
  { 
    icon: '🛰️', 
    label: 'Orbital Projects', 
    value: '6+', 
    color: 'text-cyan-400',
    description: 'Deployed missions'
  },
  { 
    icon: '⚡', 
    label: 'Tech Stack', 
    value: '15+', 
    color: 'text-amber-400',
    description: 'Technologies mastered'
  },
  { 
    icon: '🗄️', 
    label: 'Databases', 
    value: '4', 
    color: 'text-emerald-400',
    description: 'Database systems'
  },
  { 
    icon: '🌐', 
    label: 'Deployments', 
    value: '12+', 
    color: 'text-primary-400',
    description: 'Live deployments'
  }
] as const;

export const PROJECT_TYPES = {
  'Full Stack': {
    label: 'FULL_STACK',
    color: 'bg-purple-500/20 text-purple-300 border-purple-500/30'
  },
  'Frontend': {
    label: 'FRONTEND',
    color: 'bg-blue-500/20 text-blue-300 border-blue-500/30'
  },
  'Backend': {
    label: 'BACKEND',
    color: 'bg-green-500/20 text-green-300 border-green-500/30'
  },
  'Mobile': {
    label: 'MOBILE',
    color: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30'
  },
  'DevOps': {
    label: 'DEVOPS',
    color: 'bg-orange-500/20 text-orange-300 border-orange-500/30'
  },
  'AI/ML': {
    label: 'AI_ML',
    color: 'bg-pink-500/20 text-pink-300 border-pink-500/30'
  }
} as const;