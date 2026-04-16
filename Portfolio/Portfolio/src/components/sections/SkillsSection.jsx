import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  SiHtml5, SiCss, SiJavascript, SiReact, SiNextdotjs,
  SiTailwindcss, SiNodedotjs, SiExpress, SiMongodb,
  SiGit, SiGithub, SiFigma,
  SiPostman, SiVercel, SiNetlify, SiC, SiCplusplus
} from "react-icons/si";
import { TbApi, TbBrandVscode } from "react-icons/tb";

/* ──────────────────────────────────────────
   DATA
   ────────────────────────────────────────── */
const techStack = [
  // Frontend
  { name: "HTML5",        icon: <SiHtml5 />,              color: "#E34F26", category: "Frontend" },
  { name: "CSS3",         icon: <SiCss />,                color: "#1572B6", category: "Frontend" },
  { name: "JavaScript",   icon: <SiJavascript />,         color: "#F7DF1E", category: "Frontend" },
  { name: "React",        icon: <SiReact />,              color: "#61DAFB", category: "Frontend" },
  { name: "Tailwind CSS", icon: <SiTailwindcss />,        color: "#06B6D4", category: "Frontend" },
  // Backend
  { name: "Node.js",      icon: <SiNodedotjs />,          color: "#339933", category: "Backend" },
  { name: "Express.js",   icon: <SiExpress />,            color: "#FFFFFF", category: "Backend" },
  { name: "REST API",     icon: <TbApi />,                color: "#FF6C37", category: "Backend" },
  // Database
  { name: "MongoDB",      icon: <SiMongodb />,            color: "#47A248", category: "Database" },
  // Languages
  { name: "C",            icon: <SiC />,                  color: "#A8B9CC", category: "Languages" },
  { name: "C++",          icon: <SiCplusplus />,          color: "#00599C", category: "Languages" },
  { name: "JavaScript",   icon: <SiJavascript />,         color: "#F7DF1E", category: "Languages" },
  // Tools & Cloud
  { name: "Git",          icon: <SiGit />,                color: "#F05032", category: "Tools" },
  { name: "GitHub",       icon: <SiGithub />,             color: "#FFFFFF", category: "Tools" },
  { name: "VS Code",      icon: <TbBrandVscode />,        color: "#007ACC", category: "Tools" },
  { name: "Postman",      icon: <SiPostman />,            color: "#FF6C37", category: "Tools" },
  { name: "Figma",        icon: <SiFigma />,              color: "#F24E1E", category: "Tools" },
  { name: "Vercel",       icon: <SiVercel />,             color: "#FFFFFF", category: "Tools" },
  { name: "Netlify",      icon: <SiNetlify />,           color: "#00C7B7", category: "Tools" },
];

const categories = ["All", "Frontend", "Backend", "Database", "Languages", "Tools"];

const tickerItems = [
  "Frontend Developer",
  "React Specialist",
  "MERN Stack Builder",
  "UI Engineer",
  "JavaScript Enthusiast",
  "Tailwind CSS Expert",
  "Creative Coder",
  "Problem Solver",
  "Performance Optimizer",
  "Full Stack Developer",
];

/* ──────────────────────────────────────────
   COMPONENT
   ────────────────────────────────────────── */
export function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState("All");
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const filteredTech =
    activeCategory === "All"
      ? techStack
      : techStack.filter((t) => t.category === activeCategory);

  // Duplicate ticker for seamless loop
  const tickerContent = [...tickerItems, ...tickerItems];

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="section-padding bg-secondary/30 overflow-hidden relative"
    >
      {/* ── Ambient glow blobs ── */}
      <div className="arsenal-blob arsenal-blob--1" />
      <div className="arsenal-blob arsenal-blob--2" />

      <div className="container mx-auto px-4 relative z-10">

        {/* ══════════ SECTION HEADER ══════════ */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-6"
        >
          <span className="arsenal-label">TECH ARSENAL</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mt-3 mb-4">
            Tools I <span className="gradient-text">Build With</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A curated stack of technologies I use to craft modern, fast, and
            scalable digital experiences.
          </p>
        </motion.div>

        {/* ══════════ ANIMATED TICKER ══════════ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="arsenal-ticker-wrap"
        >
          <div className="arsenal-ticker">
            <div className="arsenal-ticker__track">
              {tickerContent.map((item, i) => (
                <span key={i} className="arsenal-ticker__item">
                  <span className="arsenal-ticker__dot" />
                  {item}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ══════════ CATEGORY FILTER ══════════ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="flex flex-wrap items-center justify-center gap-2 md:gap-3 mt-10 mb-10"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`arsenal-filter-btn ${
                activeCategory === cat ? "arsenal-filter-btn--active" : ""
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* ══════════ TECH GRID ══════════ */}
        <motion.div
          layout
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-5 max-w-6xl mx-auto"
        >
          {filteredTech.map((tech, index) => (
            <motion.div
              key={`${tech.name}-${tech.category}`}
              layout
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{
                duration: 0.45,
                delay: 0.4 + index * 0.04,
                layout: { duration: 0.3 },
              }}
              className="arsenal-card group"
              style={
                {
                  "--brand-color": tech.color,
                }
              }
            >
              {/* Icon */}
              <div className="arsenal-card__icon">
                {tech.icon}
              </div>

              {/* Name */}
              <span className="arsenal-card__name">{tech.name}</span>

              {/* Category label */}
              <span className="arsenal-card__cat">{tech.category}</span>

              {/* Hover glow */}
              <div className="arsenal-card__glow" />

              {/* Shine sweep */}
              <div className="arsenal-card__shine" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
