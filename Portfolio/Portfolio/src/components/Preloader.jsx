import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const Preloader = () => {
  const [phase, setPhase] = useState(1); // 1: terminal, 2: progress, 3: welcome, 4: identity, 5: exit
  const [progress, setProgress] = useState(0);
  const [terminalText, setTerminalText] = useState([
    "> initializing system...",
    "> loading modules...",
    "> compiling assets..."
  ]);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    // Progress counter animation
    const startTime = Date.now();
    const duration = 1500;
    const startDelay = 800;

    const timer1 = setTimeout(() => {
      const interval = setInterval(() => {
        const elapsed = Date.now() - (startTime + startDelay);
        const p = Math.min(100, Math.floor((elapsed / duration) * 100));
        setProgress(p);

        if (p >= 100) {
          clearInterval(interval);
          setPhase(3); // welcome
          setTimeout(() => {
            setPhase(4); // identity
            setTimeout(() => {
              setPhase(5); // exit
              setTimeout(() => {
                setIsComplete(true);
                document.body.style.overflow = "auto";
              }, 600);
            }, 1200);
          }, 600);
        }
      }, 20);
    }, startDelay);

    return () => {
      clearTimeout(timer1);
      document.body.style.overflow = "auto";
    };
  }, []);

  if (isComplete) return null;

  const name = "Hemang Singh Solanki";

  return (
    <AnimatePresence>
      {phase < 5 && (
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: "-100%" }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black overflow-hidden"
        >
          {/* Phase 1: Terminal */}
          <motion.div
            animate={{ opacity: phase > 1 ? 0.3 : 1 }}
            transition={{ duration: 0.5 }}
            className="absolute top-8 left-8 text-[#00d4ff] font-['JetBrains_Mono'] text-sm md:text-base z-10 flex flex-col gap-1 tracking-wider"
          >
            {terminalText.map((line, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.25, duration: 0.3 }}
              >
                {line}
              </motion.div>
            ))}
          </motion.div>

          {/* Phase 2: Counter & Progress */}
          {phase <= 2 && (
            <motion.div
              exit={{ scale: 1.2, opacity: 0, filter: "blur(10px)" }}
              className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none"
            >
              <div
                className="text-white font-['Space_Grotesk'] font-bold tracking-tighter"
                style={{ fontSize: "clamp(4rem, 15vw, 12rem)" }}
              >
                {progress}%
              </div>
              <div className="w-[60%] md:w-[40%] h-1 relative mt-4 bg-white/10 overflow-hidden rounded-full block">
                <div
                  className="h-full bg-neon-blue relative transition-all duration-75"
                  style={{ width: `${progress}%` }}
                >
                  <div className="absolute top-1/2 right-0 w-2 h-2 bg-white rounded-full -translate-y-1/2 translate-x-1/2 shadow-[0_0_15px_5px_rgba(0,212,255,1)]" />
                </div>
              </div>
            </motion.div>
          )}

          {/* Phase 3: WELCOME */}
          {phase === 3 && (
            <motion.div
              initial={{ scale: 2, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0, filter: "blur(5px)" }}
              transition={{ duration: 0.35, ease: "backOut" }}
              className="absolute z-30 pointer-events-none"
            >
              <span
                className="glitch-text text-white font-['Space_Grotesk'] font-bold text-6xl md:text-9xl tracking-widest uppercase"
                data-text="WELCOME"
              >
                WELCOME
              </span>
            </motion.div>
          )}

          {/* Phase 4: Identity */}
          {phase === 4 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute z-40 flex flex-col items-center pointer-events-none"
            >
              <div className="flex overflow-hidden pb-4" style={{ perspective: "1000px" }}>
                {name.split("").map((char, i) => (
                  char === " " ? (
                    <span key={i} className="inline-block w-3 md:w-6" />
                  ) : (
                    <motion.span
                      key={i}
                      initial={{ y: 50, opacity: 0, rotateX: -90 }}
                      animate={{ y: 0, opacity: 1, rotateX: 0 }}
                      transition={{ delay: i * 0.03, duration: 0.4, ease: "backOut" }}
                      className="inline-block text-white font-['Space_Grotesk'] font-bold text-4xl md:text-7xl"
                    >
                      {char}
                    </motion.span>
                  )
                ))}
              </div>

              <div className="relative mt-2">
                <motion.div
                  initial={{ clipPath: "inset(0 100% 0 0)", opacity: 0 }}
                  animate={{ clipPath: "inset(0 0% 0 0)", opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                  className="text-white/80 font-['Inter'] font-light text-sm md:text-xl tracking-[0.2em] uppercase flex items-center"
                >
                  Full Stack Developer
                  <div className="typewriter-cursor ml-2" />
                </motion.div>
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                  className="absolute -bottom-2 left-0 w-full h-[2px] bg-neon-blue origin-left"
                />
              </div>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
