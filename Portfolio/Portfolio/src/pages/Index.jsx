import { SEO } from "@/components/SEO";
import { Navbar } from "@/components/Navbar";
import { CustomCursor } from "@/components/CustomCursor";
import { BackgroundEffects } from "@/components/BackgroundEffects";
import { Preloader } from "@/components/Preloader";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { CertificatesSection } from "@/components/sections/CertificatesSection";
import { LeetCodeSection } from "@/components/sections/LeetCodeSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { Footer } from "@/components/sections/Footer";

const Index = () => {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <SEO 
        title="Hemang Singh | Software Engineer & Creative Developer"
        description="Portfolio of Hemang Singh, a passionate Software Engineer building high-performance modern web apps, scalable APIs, and interactive UI experiences."
        url="https://hemangsingh-tau.vercel.app"
      />
      <Preloader />
      <CustomCursor />
      <BackgroundEffects />
      <Navbar />

      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <CertificatesSection />
        <LeetCodeSection />
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
