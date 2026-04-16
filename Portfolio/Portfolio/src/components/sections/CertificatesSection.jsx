import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, ChevronDown, ChevronUp, Calendar, Building2 } from "lucide-react";
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
                  {/* ── Full Certificate Image (Always Visible) ── */}
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
                  </div>

                  {/* ── Bottom Title Bar (Always Visible) ── */}
                  <div className="cert-card__bottom-bar">
                    {cert.tags && cert.tags.length > 0 && (
                      <span className="cert-card__category">
                        {cert.tags[0]}
                      </span>
                    )}
                    <h3 className="cert-card__title">{cert.title}</h3>
                  </div>

                  {/* ── Hover Overlay (Details on top of image) ── */}
                  <div className="cert-card__overlay">
                    <div className="cert-card__overlay-content">
                      <h3 className="cert-card__overlay-title">{cert.title}</h3>

                      {/* Issuer */}
                      <div className="cert-card__overlay-meta">
                        <Building2 className="w-3.5 h-3.5 flex-shrink-0" />
                        <span>{cert.issuer}</span>
                      </div>

                      {/* Date */}
                      <div className="cert-card__overlay-meta">
                        <Calendar className="w-3.5 h-3.5 flex-shrink-0" />
                        <span>{cert.date}</span>
                      </div>

                      {/* Description */}
                      <p className="cert-card__overlay-desc">{cert.description}</p>

                      {/* Tags */}
                      {cert.tags && cert.tags.length > 0 && (
                        <div className="cert-card__overlay-tags">
                          {cert.tags.map((tag, i) => (
                            <span key={i} className="cert-card__tag">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* View Certificate CTA */}
                      <DialogTrigger asChild>
                        <button className="cert-card__btn cert-card__btn--primary">
                          <Award className="w-3.5 h-3.5" />
                          View Certificate
                        </button>
                      </DialogTrigger>
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
