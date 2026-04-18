import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { projects } from "@/data/portfolio";
import { MagneticWrapper } from "@/components/MagneticWrapper";
import { HolographicCard } from "@/components/HolographicCard";

const categories = [
  "All",
  "Games Created by Me",
  "Full Stack Applications",
  "Frontend Projects",
  "Figma / UI-UX Design Projects",
  "Clones"
];

export function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState("All");

  // Custom sorting to make Eufy Security Clone (ID: 2) the featured flagship project when "All" is selected!
  // Otherwise, filter by category.
  const filteredProjects = activeCategory === "All" 
    ? [
        projects.find(p => p.id === 1), // FleetFlow Dashboard
        ...projects.filter(p => p.id !== 1).sort((a, b) => b.featured - a.featured)
      ].filter(Boolean)
    : projects.filter(p => p.category === activeCategory);

  return (
    <section id="projects" className="section-padding bg-secondary/10 relative overflow-hidden">
      {/* Premium background styling */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] rounded-full bg-purple-500/5 blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
           initial={{ opacity: 0, y: 40 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, margin: "-100px" }}
           transition={{ duration: 0.6 }}
           className="text-center mb-10 md:mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4">
            Creative <span className="gradient-text">Showcase</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A curated collection of my best work, spanning across frontend UI, full-stack architectures, interactive games, and premium design prototypes.
          </p>
        </motion.div>

        {/* Animated Custom Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12 md:mb-16 max-w-5xl mx-auto">
          {categories.map((category) => (
             <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`relative px-5 py-2.5 rounded-full text-sm font-semibold transition-colors duration-300 ${
                  activeCategory === category ? "text-primary-foreground" : "text-muted-foreground bg-secondary/30 hover:bg-secondary/50 hover:text-foreground"
                } border border-border/50`}
             >
                {activeCategory === category && (
                  <motion.div
                    layoutId="activeCategoryTab"
                    className="absolute inset-0 bg-primary rounded-full z-0 shadow-lg shadow-primary/20"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">{category}</span>
             </button>
          ))}
        </div>

        {/* 12-Column Grid for precise Bento layouts */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-8 max-w-6xl mx-auto min-h-[600px]"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => {
              // Dynamically style based on count of filtered projects
              const totalItems = filteredProjects.length;
              
              // Only make the first item "featured" spanning full width if it's "All" or there are enough items
              const isFeatured = index === 0 && (activeCategory === "All" || totalItems > 2 || activeCategory === "Full Stack Applications" || activeCategory === "Frontend Projects");
              const isHalfWidth = !isFeatured && (totalItems <= 2 || index === 1 || index === 2);

              return (
                <motion.div
                  layout
                  key={project.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                  transition={{ duration: 0.4, type: "spring", bounce: 0.3 }}
                  className={`col-span-1 transition-all duration-500 ease-out relative ${
                    isFeatured 
                      ? "md:col-span-2 lg:col-span-12" 
                      : isHalfWidth 
                        ? "md:col-span-1 lg:col-span-6" 
                        : "md:col-span-1 lg:col-span-4"
                  } z-10 hover:z-[40]`}
                >
                  <HolographicCard className="h-full">
                    <div className={`group h-full bg-card rounded-3xl border overflow-hidden shadow-sm hover:shadow-2xl transition-colors flex ${
                      isFeatured 
                        ? "flex-col lg:flex-row border-primary/20 hover:border-primary/50" 
                        : "flex-col border-border hover:border-primary/30"
                    } ${project.id === 1 ? "bg-[#1A0F0D] border-red-900/30 hover:shadow-red-500/10 hover:border-red-500/40" : "hover:shadow-primary/20"}`}>
                      {/* Visuals (Image Side) */}
                      <div className={`relative overflow-hidden bg-transparent flex items-center justify-center ${
                        isFeatured ? "lg:w-[60%] h-64 md:h-80 lg:h-[400px]" : "w-full h-56 md:h-64"
                      }`}>
                        {project.category && activeCategory === "All" && (
                           <div className="absolute top-4 left-4 z-20 px-3 py-1 bg-black/60 backdrop-blur-md text-white text-[10px] sm:text-xs font-semibold rounded-full border border-white/10 uppercase tracking-widest pointer-events-none">
                             {project.category}
                           </div>
                        )}
                        
                        {project.liveUrl !== "#" ? (
                          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="cursor-pointer w-full h-full block">
                            <img
                              src={project.image}
                              alt={project.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                            />
                          </a>
                        ) : (
                          <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                          />
                        )}
                      </div>

                      {/* Details (Text Side) */}
                      <div className={`relative flex flex-col justify-center p-6 md:p-8 ${
                        isFeatured ? "lg:w-[40%] lg:p-12" : "w-full flex-grow"
                      }`}>
                        <h3 className={`font-display font-bold group-hover:text-primary transition-colors mb-3 md:mb-4 ${
                          isFeatured ? "text-2xl md:text-3xl lg:text-4xl" : "text-xl md:text-2xl"
                        } ${project.id === 1 ? "text-[#FF4D4D] group-hover:text-[#FF6666]" : ""}`}>
                          {project.title}
                        </h3>
                        <p className="text-muted-foreground text-sm md:text-base mb-6 md:mb-8 line-clamp-4 leading-relaxed flex-grow">
                          {project.description}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-8 md:mb-10">
                          {project.techStack.map((tech) => (
                            <span
                              key={tech}
                              className="px-3 py-1.5 text-[11px] font-medium tracking-wide rounded-full bg-secondary/50 text-secondary-foreground border border-border/50 uppercase whitespace-nowrap"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3 mt-auto w-full">
                          {project.liveUrl !== "#" && (
                            <MagneticWrapper strength={0.15} maxDistance={40} className="flex-1 flex">
                              <Button
                                variant="default"
                                className="gradient-bg rounded-xl w-full shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all font-semibold h-11"
                                asChild
                              >
                                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                                  <ExternalLink className="h-4 w-4 mr-2" />
                                  {project.category?.includes("Figma") ? "Prototype" : "Demo"}
                                </a>
                              </Button>
                            </MagneticWrapper>
                          )}
                          {project.githubUrl !== "#" && (
                            <MagneticWrapper strength={0.15} maxDistance={40} className="flex-1 flex">
                              <Button 
                                variant="outline" 
                                className="w-full rounded-xl hover:bg-secondary hover:text-foreground hover:scale-[1.02] transition-all text-muted-foreground font-semibold h-11 border-border/50" 
                                asChild
                              >
                                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                                  <Github className="h-4 w-4 mr-2" />
                                  GitHub
                                </a>
                              </Button>
                            </MagneticWrapper>
                          )}
                          {project.videoUrl && (
                            <MagneticWrapper strength={0.15} maxDistance={40} className="flex-1 flex">
                              <Button 
                                variant="outline" 
                                className="w-full rounded-xl hover:bg-secondary/80 hover:scale-[1.02] transition-all text-muted-foreground font-semibold hover:border-red-500/50 hover:text-red-500 h-11 border-border/50" 
                                asChild
                              >
                                <a href={project.videoUrl} target="_blank" rel="noopener noreferrer">
                                  <Youtube className="h-4 w-4 mr-2 text-red-500" />
                                  Video
                                </a>
                              </Button>
                            </MagneticWrapper>
                          )}
                          {project.apiDocUrl && (
                            <MagneticWrapper strength={0.15} maxDistance={40} className="flex-1 flex">
                              <Button 
                                variant="outline" 
                                className="w-full rounded-xl hover:bg-secondary hover:text-foreground hover:scale-[1.02] transition-all text-muted-foreground font-semibold h-11 border-border/50" 
                                asChild
                              >
                                <a href={project.apiDocUrl} target="_blank" rel="noopener noreferrer">
                                  <ExternalLink className="h-4 w-4 mr-2" />
                                  API Docs
                                </a>
                              </Button>
                            </MagneticWrapper>
                          )}
                        </div>
                      </div>
                    </div>
                  </HolographicCard>
                </motion.div>
              );
            })}
          </AnimatePresence>
          
          {filteredProjects.length === 0 && (
            <div className="col-span-full py-20 text-center">
              <p className="text-muted-foreground text-xl">More projects coming soon.</p>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
