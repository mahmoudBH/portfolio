import { ins } from "framer-motion/client";

export const cvData = {
  personalInfo: {
    name: "Mahmoud Bousbih",
    title: "Full-Stack JavaScript Developer (React/Node)",
    location: "Tunis",
    phone: "+216 22792742",
    email: "boussbimahmoud@gmail.com",
    github: "https://github.com/mahmoudBH",
    linkedin: "https://www.linkedin.com/in/mahmoudbh7/",
    instagram: "https://www.instagram.com/mahmoud__bh/",
    summary: "Full-Stack JavaScript Developer (3 years of experience) in web and mobile development (React, Node.js, React Native). Expert in secure APIs, MySQL optimization, and AI. Delivering reliable projects and solving issues efficiently."
  },

  experience: [
    {
      company: "Symatique - Tunis",
      position: "Full-Stack Developer Intern",
      period: "Feb 2025 – May 2025",
      description: "Designed and developed SymaFlow, a web and mobile application for automated invoice analysis. Built scalable front-end and back-end features using React, Node.js, and MySQL. Implemented Python/Flask microservices to automate workflows, reducing invoice processing time by approximately 30% and improving overall operational efficiency.",
      technologies: ["React", "React Native", "Node.js", "MySQL", "Python", "Flask"]
    },
    {
      company: "UIB Bank - Tunis",
      position: "Web Development Intern",
      period: "Jan 2024 – Feb 2024",
      description: "Developed an Electronic Document Management (GED) system to streamline document archiving and retrieval. Implemented advanced search and classification features, significantly improving document accessibility and employee productivity. Collaborated with stakeholders to align the solution with business and security requirements.",
      technologies: ["PHP", "MySQL", "Bootstrap", "Web Development", "Document Management"]
    },
    {
      company: "EL FOULADH - Bizerte",
      position: "Internship",
      period: "Jan 2023 - Feb 2023",
      description: "Developed internal web pages (HTML, CSS, JavaScript).",
      technologies: ["HTML", "CSS", "JavaScript"]
    }
  ],

  education: [
    {
      institution: "Higher Institute of Technological Studies of Kebili",
      degree: "Bachelor's Degree in Information Technology",
      period: "Sep 2022 - Jun 2025"
    },
    {
      institution: "Ibn Sina High School - Menzel Bourguiba",
      degree: "Baccalaureate in Technical Sciences",
      period: "2022"
    }
  ],

  skills: {
    frontend: ["React.js", "React Native", "Next.js", "Angular", "HTML", "CSS", "Bootstrap", "Tailwind CSS"],
    backend: ["Node.js", "Express.js", "PHP", "Laravel", "REST API", "JWT", "Authentication"],
    databases: ["MySQL", "SQL", "data modeling", "optimized queries"],
    tools: ["Git", "GitHub", "Docker", "AWS", "Visual Studio Code", "Postman", "Agile", "Scrum"],
    languages: ["JavaScript", "Python", "Java", "C++"]
  },

  projects: [
  {
    id: 1,
    title: "Symaflow",
    description: "Web and mobile project management platform featuring analytics, AI-powered invoice analysis, and real-time push notifications.",
    technologies: ["React.js", "Node.js", "React Native", "MySQL", "Python", "Flask", "AI", "Push Notifications"],
    githubLink: "https://github.com/mahmoudBH/syma-flow",
    liveLink: "#",
    featured: true
  },
  {
    id: 2,
    title: "Coffee Management",
    description: "Web application for café operations including table reservations, order handling, inventory tracking, and internal messaging.",
    technologies: ["React.js", "Node.js", "MySQL"],
    githubLink: "https://github.com/mahmoudBH/admin-coffee",
    liveLink: "#"
  },
  {
    id: 3,
    title: "Internship Platform",
    description: "Online assessment platform with QCM and coding tests, including automated evaluation and certificate generation.",
    technologies: ["React.js", "Node.js", "MySQL"],
    githubLink: "https://github.com/mahmoudBH/Candidate_Management",
    liveLink: "#"
  },
  {
    id: 4,
    title: "Student Management",
    description: "Integrated web and mobile system for managing students, courses, and grades with real-time consultation features.",
    technologies: ["React.js", "Node.js", "React Native", "MySQL"],
    githubLink: "https://github.com/mahmoudBH/Student-Management-System",
    liveLink: "#"
  },
  {
    id: 5,
    title: "Electronic Document Management (GED)",
    description: "Enterprise web-based Electronic Document Management system with secure authentication, document tracking, advanced search, archiving, and role-based dashboards to improve collaboration and productivity.",
    technologies: ["HTML", "CSS", "PHP", "MySQL", "PhpMyAdmin", "JavaScript", "Front-End Development", "Back-End Development"],
    githubLink: "https://github.com/mahmoudBH/Electronic-Document-Management-EDM",
    liveLink: "#"
  }
],


  awards: [
    {
      title: "1st Place - Hackathon Nefzawa 2025",
      description: "AI solution for media analysis"
    }
  ],

  certifications: [
    "Crash Course on Python - Coursera (Sep 2021)",
    "Responsive Web Design - freeCodeCamp (Jul 2023)",
    "JavaScript Basics - Coursera (Jul 2023)",
    "Front End Development Libraries - freeCodeCamp (Oct 2024)",
    "Docker Essentials - IBM (Aug 2025)",
    "DevOps and Jenkins Fundamentals - LearnKartS (Aug 2025)",
    "DevOps Culture and Mindset - University of California, Davis (Sep 2025)",
    "AI For Everyone - DeepLearning.AI (Sep 2025)"
  ],

  languages: [
    { language: "Arabic", level: "Native" },
    { language: "French", level: "Fluent (B2)" },
    { language: "English", level: "Fluent (B2)" },
    { language: "Italian", level: "Beginner (A1)" }
  ]
};