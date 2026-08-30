import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { navItems } from "@/data/portfolio";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useSound } from "@/hooks/useSound";
import { ThemePicker } from "@/components/ThemePicker";
import { cn } from "@/lib/utils";
import { useQuantumTransition } from "@/hooks/useQuantumTransition";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { activeSection, setActiveSection } = useActiveSection();
  const { playClick } = useSound();
  const { warpTo } = useQuantumTransition();

  const handleClick = (href) => {
    playClick();
    setIsOpen(false);
    
    const targetSection = href.slice(1);
    
    if (activeSection === targetSection) return;
    
    // Instantly update the UI so it doesn't wait for scroll to finish
    setActiveSection(targetSection);
    warpTo(href);
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 glass"
    >
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <motion.a
          href="#home"
          className="flex items-center gap-2 text-xl font-display font-bold gradient-text"
          whileHover={{ scale: 1.05 }}
          onClick={(e) => {
            e.preventDefault();
            handleClick("#home");
          }}
        >
          <img src="/new-logo.jpg" alt="Hemang Singh Logo" className="h-14 w-auto object-contain theme-logo-blend" />
        </motion.a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-6">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleClick(item.href);
                  }}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary relative py-2",
                    activeSection === item.href.slice(1)
                      ? "text-primary"
                      : "text-muted-foreground"
                  )}
                >
                  {item.label}
                  {activeSection === item.href.slice(1) && (
                    <motion.span
                      layoutId="activeSection"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"
                    />
                  )}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" className="rounded-full font-medium" asChild>
              <a href="/Hemang_Resume.pdf" download="Hemang_Resume.pdf" target="_blank" rel="noopener noreferrer" onClick={() => playClick()}>
                <Download className="mr-2 h-4 w-4" />
                Resume
              </a>
            </Button>
            <ThemePicker />
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemePicker />
          <Button variant="ghost" size="icon" className="h-11 w-11" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -10 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden glass border-t border-border overflow-hidden shadow-lg"
          >
            <ul className="container mx-auto px-6 py-6 flex flex-col gap-5">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={(e) => {
                       e.preventDefault();
                       handleClick(item.href);
                    }}
                    className={cn(
                      "block py-3 text-lg font-medium transition-colors hover:text-primary rounded-lg",
                      activeSection === item.href.slice(1)
                        ? "text-primary bg-primary/5 px-4"
                        : "text-muted-foreground px-2"
                    )}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li className="pt-4 mt-2 border-t border-border/50">
                <Button variant="outline" className="w-full rounded-full h-12" asChild onClick={() => { playClick(); setIsOpen(false); }}>
                  <a href="/Hemang_Resume.pdf" download="Hemang_Resume.pdf" target="_blank" rel="noopener noreferrer">
                    <Download className="mr-2 h-5 w-5" />
                    Download Resume
                  </a>
                </Button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
