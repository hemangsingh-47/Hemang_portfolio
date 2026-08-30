import { motion } from "framer-motion";

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
            <p className="text-muted-foreground leading-relaxed text-base md:text-lg">
              I'm <strong className="text-foreground font-semibold">Hemang Singh Solanki</strong>, a <strong className="text-foreground font-semibold">Full Stack Web Developer</strong> and a 2nd-semester student passionate about building modern, responsive, and performance-driven web applications. I specialize in the <strong className="text-foreground font-semibold">MERN Stack</strong> (MongoDB, Express, React, Node.js) and enjoy crafting modern, scalable web applications with rich user interfaces.
            </p>
            <p className="text-muted-foreground leading-relaxed text-base md:text-lg">
              My core expertise lies in <strong className="text-foreground font-semibold">frontend development with React and Tailwind CSS</strong> — complemented by a growing understanding of <strong className="text-foreground font-semibold">backend technologies with Node.js and Express</strong>. I'm currently focused on improving my backend skills and building scalable APIs.
            </p>
            <p className="text-muted-foreground leading-relaxed text-base md:text-lg">
              I believe great software is built at the intersection of <strong className="text-foreground font-semibold">clean code</strong> and
              <strong className="text-foreground font-semibold"> thoughtful design</strong>. My goal is to keep learning, contribute to meaningful
              projects, and grow into a well-rounded engineer who builds products that
              people genuinely enjoy using.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
