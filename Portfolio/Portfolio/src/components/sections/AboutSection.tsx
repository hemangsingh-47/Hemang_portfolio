import { motion } from "framer-motion";
import { interests } from "@/data/portfolio";

export function AboutSection() {
  return (
    <section id="about" className="py-28 md:py-40">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            About <span className="gradient-text">Me</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Get to know the person behind the code
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl mx-auto space-y-8"
        >
          <div className="space-y-6">
            <p className="text-muted-foreground leading-relaxed text-lg">
              I'm <strong className="text-foreground font-semibold">Hemang Singh Solanki</strong>, a <strong className="text-foreground font-semibold">Full Stack Web Developer</strong> and a 2nd-semester student passionate about building modern, responsive, and performance-driven web applications. I specialize in the <strong className="text-foreground font-semibold">MERN Stack</strong> (MongoDB, Express, React, Node.js) and enjoy crafting immersive digital experiences using tools like <strong className="text-foreground font-semibold">GSAP and Three.js</strong>.
            </p>
            <p className="text-muted-foreground leading-relaxed text-lg">
              My core expertise lies in <strong className="text-foreground font-semibold">frontend development with React, Tailwind CSS, and
              GSAP</strong> — complemented by a growing understanding of <strong className="text-foreground font-semibold">backend technologies
              with Node.js and Express</strong>. I'm currently focused on improving my backend skills and building scalable APIs.
            </p>
            <p className="text-muted-foreground leading-relaxed text-lg">
              I believe great software is built at the intersection of <strong className="text-foreground font-semibold">clean code</strong> and
              <strong className="text-foreground font-semibold"> thoughtful design</strong>. My goal is to keep learning, contribute to meaningful
              projects, and grow into a well-rounded engineer who builds products that
              people genuinely enjoy using.
            </p>
          </div>

          <div className="pt-6">
            <h4 className="text-lg font-display font-semibold mb-4 text-center">
              My Interests
            </h4>
            <div className="flex flex-wrap justify-center gap-3">
              {interests.map((interest, index) => (
                <motion.span
                  key={interest.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="px-4 py-2 rounded-full bg-secondary text-secondary-foreground flex items-center gap-2 cursor-default"
                >
                  <span>{interest.icon}</span>
                  <span className="text-sm font-medium">{interest.name}</span>
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
