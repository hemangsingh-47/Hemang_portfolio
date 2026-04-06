import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, ChevronDown, ChevronUp, ExternalLink, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { certificates } from "@/data/portfolio";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";

const INITIAL_VISIBLE = 3;

export function CertificatesSection() {
  const [showAll, setShowAll] = useState(false);
  const visibleCertificates = showAll
    ? certificates
    : certificates.slice(0, INITIAL_VISIBLE);
  const hasMore = certificates.length > INITIAL_VISIBLE;

  return (
    <section id="certificates" className="section-padding bg-secondary/30 relative">
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            My <span className="gradient-text">Certificates</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Achievements, hackathons, and courses that define my journey.
          </p>
        </motion.div>

        {/* Certificate Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <AnimatePresence mode="popLayout">
            {visibleCertificates.map((cert, index) => (
              <Dialog key={cert.id}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="cert-card group"
                >
                  {/* ── DEFAULT VIEW (Image + Minimal Info) ── */}
                  <div className="cert-card__default">
                    {/* Image */}
                    <div className="cert-card__image-wrap">
                      {cert.url !== "#" ? (
                        <img
                          src={cert.url}
                          alt={cert.title}
                          className="cert-card__image"
                          loading="lazy"
                        />
                      ) : (
                        <div className="cert-card__placeholder">
                          <Award className="h-12 w-12 text-muted-foreground/40" />
                        </div>
                      )}
                      {/* Gradient overlay on image */}
                      <div className="cert-card__image-overlay" />
                    </div>

                    {/* Minimal info below image */}
                    <div className="cert-card__info">
                      {cert.tags && cert.tags.length > 0 && (
                        <span className="cert-card__category">
                          {cert.tags[0]}
                        </span>
                      )}
                      <h3 className="cert-card__title">{cert.title}</h3>
                    </div>
                  </div>

                  {/* ── HOVER VIEW (Split: Image Left + Details Right) ── */}
                  <div className="cert-card__hover-panel">
                    {/* Left: Image (shrunk) */}
                    <div className="cert-card__hover-image">
                      {cert.url !== "#" ? (
                        <img
                          src={cert.url}
                          alt={cert.title}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-secondary/30">
                          <Award className="h-10 w-10 text-muted-foreground/40" />
                        </div>
                      )}
                    </div>

                    {/* Right: Details */}
                    <div className="cert-card__hover-details">
                      <h3 className="cert-card__hover-title">{cert.title}</h3>
                      <p className="cert-card__hover-desc">{cert.description}</p>

                      {/* Tags */}
                      {cert.tags && cert.tags.length > 0 && (
                        <div className="cert-card__hover-tags">
                          {cert.tags.map((tag, i) => (
                            <span key={i} className="cert-card__tag">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* CTA */}
                      <div className="cert-card__hover-cta">
                        <DialogTrigger asChild>
                          <button className="cert-card__btn cert-card__btn--primary">
                            <Eye className="w-3.5 h-3.5" />
                            View Certificate
                          </button>
                        </DialogTrigger>
                      </div>
                    </div>
                  </div>

                  {/* Neon border glow (visible on hover) */}
                  <div className="cert-card__glow" />
                </motion.div>

                {/* ── DIALOG (Full Certificate View) ── */}
                <DialogContent className="max-w-5xl w-full p-2 md:p-4 overflow-hidden bg-background/95 backdrop-blur-xl border-border/50 rounded-2xl shadow-2xl">
                  <div className="relative w-full min-h-[50vh] flex flex-col items-center justify-center bg-black/5 rounded-xl overflow-hidden">
                    {cert.url !== "#" ? (
                      <img
                        src={cert.url}
                        alt={cert.title}
                        className="w-full h-auto max-h-[85vh] object-contain"
                      />
                    ) : (
                      <div className="text-center p-10">
                        <Award className="h-16 w-16 mx-auto text-muted-foreground mb-4 opacity-50" />
                        <p className="text-muted-foreground">
                          Certificate image not available
                        </p>
                      </div>
                    )}
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </AnimatePresence>
        </div>

        {/* Show More / Less Button */}
        {hasMore && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-12"
          >
            <Button
              variant="outline"
              size="lg"
              onClick={() => setShowAll(!showAll)}
              className="group rounded-full px-8 bg-card/50 backdrop-blur-sm border-border/50 hover:bg-primary hover:text-primary-foreground transition-all duration-300 shadow-sm"
            >
              {showAll ? (
                <>
                  <ChevronUp className="h-4 w-4 mr-2 group-hover:-translate-y-1 transition-transform" />
                  Show Less
                </>
              ) : (
                <>
                  <ChevronDown className="h-4 w-4 mr-2 group-hover:translate-y-1 transition-transform" />
                  See More ({certificates.length - INITIAL_VISIBLE} more)
                </>
              )}
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
