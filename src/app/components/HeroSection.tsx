import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { RecycleIconLight } from "./KaleoIcon";
import { FloatingParticles } from "./shared";
import { font, sans, sage, imgHero } from "../lib/constants";

export function HeroSection() {
  const [currentWord, setCurrentWord] = useState(0);
  const words = ["Sustainable", "Circular", "Responsible", "Greener"];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentWord((p) => (p + 1) % words.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full h-screen min-h-[700px] overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.8, ease: "easeOut" }}
        className="absolute inset-0 overflow-hidden"
      >
        {/* Background video */}
        <video
          className="absolute inset-0 w-full h-full object-cover z-[1]"
          src="https://github.com/piyush9801/scrapq-site/releases/download/v1.0.0/scrap.Q._01.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />
        {/* Fallback image while video loads */}
        <ImageWithFallback src={imgHero} alt="Sustainable landscape" className="absolute inset-0 w-full h-full object-cover z-0" />
        <div className="absolute inset-0 bg-black/40 z-[2]" />
        <div className="absolute inset-0 z-[2]" style={{ background: "radial-gradient(ellipse at center, transparent 20%, rgba(0,0,0,0.6) 100%)" }} />
        <div className="absolute inset-x-0 bottom-0 h-1/3 z-[2]" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.5), transparent)" }} />
      </motion.div>

      {/* Floating particles */}
      <FloatingParticles count={15} color="#ffffff" />

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
        <motion.div
          initial={{ scale: 0, opacity: 0, rotate: -180 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ duration: 1, delay: 0.6, type: "spring" }}
          className="mb-6"
        >
          <RecycleIconLight size={31} />
        </motion.div>

        <motion.h1
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="text-white max-w-[900px] mx-auto mb-6 text-center uppercase tracking-wider"
          style={{ fontFamily: font, fontSize: "clamp(28px, 5vw, 64px)", lineHeight: "1.2" }}
        >
          <span className="block">Leading the Way to a</span>
          <span className="inline-flex items-center justify-center">
            <span className="relative inline-block w-[5.5em] text-right">
              <AnimatePresence mode="wait">
                <motion.span
                  key={words[currentWord]}
                  initial={{ y: 16, opacity: 0, filter: "blur(4px)" }}
                  animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                  exit={{ y: -16, opacity: 0, filter: "blur(4px)" }}
                  transition={{ duration: 0.5 }}
                  style={{ color: sage }}
                  className="absolute inset-0 inline-flex items-center justify-end"
                >
                  {words[currentWord]}
                </motion.span>
              </AnimatePresence>
            </span>
            <span className="ml-3">Future.</span>
          </span>
        </motion.h1>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="text-white/70 text-center mx-auto mt-4"
          style={{ fontFamily: sans, fontSize: "clamp(13px, 1.5vw, 16px)", letterSpacing: "0.08em" }}
        >
          India's largest collection, segregation & aggregation enterprise.
        </motion.p>



        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.3 }}
          className="flex items-center justify-center mt-10"
        >
          <motion.a
            href="#discover"
            whileHover={{ scale: 1.05, backgroundColor: "#ffffff", color: "#171411" }}
            whileTap={{ scale: 0.96 }}
            className="px-8 py-3 rounded-full border border-white/30 text-white uppercase tracking-[0.15em] transition-colors duration-300 cursor-pointer"
            style={{ fontFamily: font, fontSize: "14px", backdropFilter: "blur(8px)", backgroundColor: "rgba(255,255,255,0.06)" }}
          >
            Discover
          </motion.a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="w-[1px] h-10 bg-gradient-to-b from-transparent via-white/50 to-transparent"
        />
        <span className="text-white/40" style={{ fontFamily: sans, fontSize: "10px", letterSpacing: "0.15em" }}>SCROLL</span>
      </motion.div>
    </section>
  );
}