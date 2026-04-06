export interface Skill {
  name: string;
  icon: string;
  invertDark?: boolean;
}

export interface SkillCategory {
  title: string;
  skills: Skill[];
}

export const socialLinks = {
  github: "https://github.com/hemangsingh-47",
  linkedin: "https://www.linkedin.com/in/hemang-singh-solanki-b866b23ab/",
  youtube: "https://www.youtube.com/@DevWithHemang",
  leetcode: "https://leetcode.com/u/hemang47/",
  email: "hemang.solanki.cg@gmail.com",
  twitter: "https://x.com/Hemang1541063",
};

export const skillCategories: SkillCategory[] = [
  {
    title: "Frontend",
    skills: [
      { name: "HTML", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
      { name: "CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
      { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
      { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
    ],
  },
  {
    title: "Backend & Database",
    skills: [
      { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
      { name: "Express", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg", invertDark: true },
      { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
    ],
  },
  {
    title: "Languages",
    skills: [
      { name: "C Language", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg" },
      { name: "C++", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" },
    ],
  },
  {
    title: "Tools & Deployment",
    skills: [
      { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
      { name: "GitHub", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg", invertDark: true },
      { name: "Vercel", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg", invertDark: true },
      { name: "Render", icon: "https://cdn.simpleicons.org/render/46E3B7" },
    ],
  },
];

export const interests = [
  { name: "Coding", icon: "💻" },
  { name: "Gaming", icon: "🎮" },
  { name: "Video Editing", icon: "🎬" },
  { name: "Chess", icon: "♟️" },
];

export const projects = [
  {
    id: 1,
    title: "FleetFlow Dashboard",
    description: "Architected a modern, data-driven fleet management dashboard with real-time analytics and interactive visualizations.",
    image: "/fleet.png",
    techStack: ["React", "Tailwind CSS", "Chart.js"],
    liveUrl: "https://fleet-flow-coding-gita.netlify.app/",
    githubUrl: "https://github.com/hemangsingh-47/oddo_01",
    featured: true,
  },
  {
    id: 2,
    title: "Eufy Security Clone",
    description: "Engineered a fully responsive clone of the Eufy e-commerce platform, demonstrating strong proficiency in advanced CSS layouts.",
    image: "/eufy.png",
    techStack: ["HTML5", "CSS3", "UI/UX"],
    liveUrl: "https://eufyclone.netlify.app/",
    githubUrl: "https://github.com/hemangsingh-47/clone_assignment",
    featured: true,
  },
  {
    id: 3,
    title: "Moglix Platform Clone",
    description: "Developed a structural clone of the Moglix industrial e-commerce site, focusing on complex navigation and product grids.",
    image: "/moglix.png",
    techStack: ["HTML5", "CSS3", "Layout Design"],
    liveUrl: "https://moglix-by-hemang.netlify.app/",
    githubUrl: "https://github.com/hemangsingh-47/clone_assignment",
    featured: true,
  },
  {
    id: 4,
    title: "The Farmer's Dog Clone",
    description: "A sleek clone of The Farmer's Dog homepage, focusing on subscription-based e-commerce UI.",
    image: "/thefarmardog.png",
    techStack: ["HTML5", "CSS3", "UI/UX"],
    liveUrl: "https://clonewebsite-one.vercel.app/Clone/Thefarmerdog/index.html",
    githubUrl: "https://github.com/hemangsingh-47/clone_assignment",
    featured: false,
  },
  {
    id: 5,
    title: "Zepto Clone",
    description: "Developed a structural clone of the Zepto quick-commerce landing page with a focus on UI/UX.",
    image: "/zepto.png",
    techStack: ["HTML5", "CSS3", "UI/UX"],
    liveUrl: "https://clonewebsite-one.vercel.app/Clone/zepto-clone/index.html",
    githubUrl: "https://github.com/hemangsingh-47/clone_assignment",
    featured: false,
  },
  {
    id: 6,
    title: "Stacks Clone",
    description: "Engineered a responsive clone of the Stacks platform, showcasing modern grid layouts and design.",
    image: "/stack.png",
    techStack: ["HTML5", "CSS3", "UI/UX"],
    liveUrl: "https://clonewebsite-one.vercel.app/Clone/stacks-clone/index.html",
    githubUrl: "https://github.com/hemangsingh-47/clone_assignment",
    featured: false,
  },
];

export const certificates = [
  {
    id: 1,
    title: "Appian AI Application Challenge 2026",
    issuer: "Indian Institute of Technology (IIT), Madras",
    description: "Participated in the Appian AI Application Challenge 2026 of Shaastra 2026.",
    date: "2026",
    url: "/Screenshot 2026-04-03 135235.jpg",
  },
  {
    id: 2,
    title: "ArtPark CodeForge Hackathon",
    issuer: "Indian Institute of Science (IISc), Bangalore",
    description: "Participated as Team Code Blooder in the Build & Submit Prototype Development Round.",
    date: "2026",
    url: "/Screenshot 2026-04-03 135305.jpg",
  },
  {
    id: 3,
    title: "FinAgent Hackathon",
    issuer: "Indian Institute of Technology (IIT), Bombay",
    description: "Participated in the FinAgent Hackathon organized by IIT Bombay.",
    date: "2026",
    url: "/finagent_cer.jpg",
  },
];

export const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Certificates", href: "#certificates" },
  { label: "Contact", href: "#contact" },
];
