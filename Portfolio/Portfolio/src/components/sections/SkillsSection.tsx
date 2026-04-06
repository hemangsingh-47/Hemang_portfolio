import { motion } from "framer-motion";
import { skillCategories } from "@/data/portfolio";
import { Layout, Server, Database, Code, Cloud } from "lucide-react";

// Map icon names to Lucide components
const iconMap: Record<string, React.ReactNode> = {
  Layout: <Layout className="w-5 h-5" />,
  Server: <Server className="w-5 h-5" />,
  Database: <Database className="w-5 h-5" />,
  Code: <Code className="w-5 h-5" />,
  Cloud: <Cloud className="w-5 h-5" />,
};

export function SkillsSection() {
  return (
    <section id="skills" className="section-padding bg-secondary/30 overflow-hidden relative">
      <div className="container mx-auto px-4 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-20"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4">
            Tech <span className="text-neon-blue">Arsenal</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Showcase my technical stack in a clean and organized way.
          </p>
        </motion.div>

        {/* Tech Arsenal Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="tech-card group"
            >
              <div className="relative h-full bg-card/60 backdrop-blur-xl border border-border/50 rounded-2xl p-6 md:p-8 overflow-hidden z-10 hover:border-primary/50 transition-colors duration-500 flex flex-col shadow-lg">
                
                {/* Neon Top Glow Effect */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Category Header */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 shadow-[0_0_15px_rgba(var(--primary),0.1)] group-hover:shadow-[0_0_20px_rgba(var(--primary),0.4)]">
                    {iconMap[category.iconName] || <Code className="w-5 h-5" />}
                  </div>
                  <h3 className="text-xl md:text-2xl font-display font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                    {category.title}
                  </h3>
                </div>

                {/* Skill Pills */}
                <div className="flex flex-wrap gap-2.5 mt-auto">
                  {category.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="tech-badge"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

              </div>
              
              {/* Backlight Glow on Card Hover */}
              <div className="absolute inset-0 bg-primary/5 blur-3xl rounded-2xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
