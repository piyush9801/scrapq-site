import { useState, useRef, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { RecycleIconLight } from "./KaleoIcon";
import { FloatingParticles } from "./shared";
import { font, sage, imgWestern } from "../lib/constants";

export function ZeroCarbonSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const quotes = [
    "We do not inherit the earth from our ancestors; we borrow it from our children.",
    "The greatest threat to our planet is the belief that someone else will save it.",
    "There is no such thing as 'away'. When we throw something away, it must go somewhere.",
    "Sustainability is no longer about doing less harm. It's about doing more good.",
  ];
  const [quoteIdx, setQuoteIdx] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setQuoteIdx((p) => (p + 1) % quotes.length), 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section ref={ref} className="relative bg-[#171411] h-screen min-h-[600px] max-h-[900px] overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 1.8, ease: "easeOut" }}
        className="absolute inset-0 overflow-hidden"
      >
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-[1]">
          <iframe
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-none"
            style={{ width: "300%", height: "300%", border: 0 }}
            src="https://www.youtube.com/embed/zsbxjmrd08Y?autoplay=1&mute=1&loop=1&playlist=zsbxjmrd08Y&controls=0&showinfo=0&modestbranding=1&rel=0&disablekb=1&iv_load_policy=3&playsinline=1&enablejsapi=1"
            title="Greener tomorrow background video"
            allow="autoplay; encrypted-media"
            frameBorder="0"
          />
        </div>
        <ImageWithFallback src={imgWestern} alt="" className="absolute inset-0 w-full h-full object-cover z-0" />
        <div className="absolute inset-0 bg-black/50 z-[2]" />
        <div className="absolute inset-0 z-[2]" style={{ background: "radial-gradient(ellipse at center, transparent 10%, rgba(0,0,0,0.65) 100%)" }} />
      </motion.div>

      <FloatingParticles count={12} color="rgba(255,255,255,0.15)" />

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
        <motion.div
          initial={{ scale: 0, opacity: 0, rotate: -180 }}
          animate={inView ? { scale: 1, opacity: 1, rotate: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3, type: "spring" }}
        >
          <RecycleIconLight size={30} />
        </motion.div>
        <motion.h2
          initial={{ y: 40, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-white uppercase mt-8"
          style={{ fontFamily: font, fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 400, lineHeight: "1.2", textShadow: "0 2px 20px rgba(0,0,0,0.6)" }}
        >
          a greener tomorrow
        </motion.h2>
        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-white mt-6 max-w-[460px]"
          style={{ fontFamily: font, fontSize: "15px", lineHeight: "1.6", textShadow: "0 1px 12px rgba(0,0,0,0.5)" }}
        >
          We help industries achieve their net-zero carbon and EPR objectives by delivering sustainability-focused solutions that promote eco-friendly operations at scale.
        </motion.p>

        <div className="mt-10 h-[60px] flex items-center max-w-[500px]">
          <AnimatePresence mode="wait">
            <motion.p
              key={quoteIdx}
              initial={{ opacity: 0, y: 15, filter: "blur(4px)" }}
              animate={{ opacity: 0.5, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -15, filter: "blur(4px)" }}
              transition={{ duration: 0.6 }}
              className="text-white italic text-center"
              style={{ fontFamily: font, fontSize: "13px", lineHeight: 1.6 }}
            >
              "{quotes[quoteIdx]}"
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}