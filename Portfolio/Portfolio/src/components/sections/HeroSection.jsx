import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Youtube, Twitter, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { socialLinks } from "@/data/portfolio";
import { useSound } from "@/hooks/useSound";
import profilePhoto from "@/assets/profile.jpeg";
import { MagneticWrapper } from "@/components/MagneticWrapper";
import { useQuantumTransition } from "@/hooks/useQuantumTransition";
import { XLogo } from "@/components/ui/XLogo";
import { LeetCodeIcon } from "@/components/ui/LeetCodeIcon";

const socialIcons = [
  { icon: Github, href: socialLinks.github, label: "GitHub" },
  { icon: Linkedin, href: socialLinks.linkedin, label: "LinkedIn" },
  { icon: XLogo, href: socialLinks.twitter, label: "X (Twitter)" },
  { icon: Youtube, href: socialLinks.youtube, label: "YouTube" },
  { icon: LeetCodeIcon, href: socialLinks.leetcode, label: "LeetCode" },
];

export function HeroSection() {
  const { playClick } = useSound();
  const { warpTo } = useQuantumTransition();
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);



  const toRotate = [
    "Full Stack Web Developer",
    "MERN Stack Developer",
    "Frontend Specialist",
    "Tech Enthusiast"
  ];

  useEffect(() => {
    const ticker = setTimeout(() => {
      tick();
    }, typingSpeed);

    return () => clearTimeout(ticker);
  }, [text]);

  const tick = () => {
    const i = loopNum % toRotate.length;
    const fullText = toRotate[i];
    const updatedText = isDeleting
      ? fullText.substring(0, text.length - 1)
      : fullText.substring(0, text.length + 1);

    setText(updatedText);

    if (isDeleting) {
      setTypingSpeed((prev) => prev / 2);
    }

    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setTypingSpeed(2000); // Pause at end
    } else if (isDeleting && updatedText === "") {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setTypingSpeed(500); // Pause before new word
    } else {
      setTypingSpeed(100); // Normal typing speed
    }
  };

  const scrollTo = (href) => {
    playClick();
    warpTo(href);
  };

  return (
    <section id="home" className="min-h-screen flex items-center relative pt-20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Column — Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-6 text-center md:text-left order-1"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 mb-2"
            >
              <p className="text-foreground/80 text-lg font-medium">
                Hello, I'm
              </p>
              
              <button 
                onClick={() => {
                  document.dispatchEvent(new KeyboardEvent('keydown', { key: 'v', ctrlKey: true, bubbles: true }));
                }}
                className="group relative flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/80 border border-primary/30 text-xs font-semibold text-primary hover:bg-primary/10 transition-colors shadow-[0_0_15px_rgba(var(--primary-rgb),0.15)] hover:shadow-[0_0_20px_rgba(var(--primary-rgb),0.3)] animate-pulse hover:animate-none"
              >
                <span className="absolute inset-0 rounded-full bg-primary/5 blur-sm group-hover:bg-primary/20 transition-colors" />
                <div className="relative flex items-center gap-2">
                  <span className="font-mono bg-background/80 px-1.5 py-0.5 rounded-md text-[10px] border border-border">Ctrl+V</span>
                  <span>Voice Tour</span>
                </div>
              </button>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-display font-bold relative"
            >
              <span
                className="gradient-text tracking-tight cursor-default leading-tight"
              >
                Hemang Singh Solanki
              </span>
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-2xl md:text-3xl font-display text-foreground/80 h-[40px] flex items-center justify-center md:justify-start"
            >
              <span>{text}</span>
              <span className="animate-pulse ml-1">|</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="max-w-2xl text-muted-foreground text-lg"
            >
              Passionate about building beautiful, functional web applications.
              I love turning ideas into reality through clean code and creative design.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-col items-center md:items-start gap-4 pt-4"
            >
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-4">
                <MagneticWrapper strength={0.45} maxDistance={130}>
                  <Button
                    size="lg"
                    variant="ghost"
                    className="text-primary hover:text-primary-foreground transition-all duration-300 border-2 border-dashed border-primary/50 hover:border-primary hover:bg-primary/90 px-8 disabled:opacity-50 disabled:pointer-events-none ring-offset-background"
                    onClick={() => window.open("/Hemang_Resume.pdf", "_blank")}
                  >
                    View Resume
                  </Button>
                </MagneticWrapper>

                <MagneticWrapper strength={0.4} maxDistance={120}>
                  <Button
                    size="lg"
                    className="gradient-bg text-primary-foreground hover:opacity-90 transition-opacity"
                    onClick={() => scrollTo("#contact")}
                  >
                    Contact Me
                  </Button>
                </MagneticWrapper>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex items-center justify-center md:justify-start gap-4 pt-4"
            >
              {socialIcons.map(({ icon: Icon, href, label }) => (
                <MagneticWrapper key={label} strength={0.5} maxDistance={80}>
                  <motion.a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 flex items-center justify-center rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-colors shrink-0"
                    whileHover={{ scale: 1.1, y: -4 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={label}
                  >
                    <Icon className="h-5 w-5" />
                  </motion.a>
                </MagneticWrapper>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column — Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative group flex items-center justify-center order-2 w-full pt-8 md:pt-0"
          >
            <div className="relative w-full max-w-[280px] sm:max-w-[320px] md:max-w-[380px] aspect-square">
              <div className="absolute inset-0 rounded-2xl gradient-bg opacity-50 blur-xl group-hover:opacity-70 transition-opacity" />
              <img
                src={profilePhoto}
                alt="Hemang Singh Solanki"
                className="relative w-full h-full object-cover object-top rounded-2xl border-2 border-border shadow-2xl group-hover:scale-[1.02] transition-transform duration-500"
              />
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-0 left-1/2 -translate-x-1/2"
      >
        <motion.button
          onClick={() => scrollTo("#about")}
          className="p-2 rounded-full text-muted-foreground hover:text-primary transition-colors"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ArrowDown className="h-6 w-6" />
        </motion.button>
      </motion.div>
    </section>
  );
}
