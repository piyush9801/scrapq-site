import { useRef } from "react";
import { Link } from "react-router";
import { motion, useInView, useScroll, useTransform } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { RecycleIconSmall } from "./KaleoIcon";
import { FloatingParticles, MagneticWrap } from "./shared";
import { font, sage, imgBanner } from "../lib/constants";

export function ZeroLandfillSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentInView = useInView(sectionRef, { once: true, margin: "-120px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.85", "start 0.15"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.65, 1]);
  const borderRadius = useTransform(scrollYProgress, [0, 0.6, 1], [72, 32, 16]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.25, 1]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5], [0.7, 0.45]);

  return (
    <section
      ref={sectionRef}
      className="relative bg-white py-24 lg:py-40 flex items-center justify-center px-4"
    >
      <motion.div
        style={{ scale, borderRadius }}
        className="relative bg-[#171411] overflow-hidden w-full max-w-[1100px] aspect-[16/9] md:aspect-[735/400]"
      >
        <motion.div style={{ scale: imgScale }} className="absolute inset-0">
          <ImageWithFallback src={imgBanner} alt="Aerial forest canopy" className="absolute inset-0 w-full h-full object-cover" />
        </motion.div>
        <motion.div style={{ opacity: overlayOpacity }} className="absolute inset-0 bg-black" />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, transparent 20%, rgba(0,0,0,0.55) 100%)" }} />

        <FloatingParticles count={8} color="rgba(255,255,255,0.3)" />

        <div className="relative z-10 flex flex-col items-center justify-center h-full gap-6">
          <motion.h3
            initial={{ letterSpacing: "0.6em", opacity: 0 }}
            animate={contentInView ? { letterSpacing: "0.08em", opacity: 1 } : {}}
            transition={{ duration: 1.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="text-white uppercase text-center"
            style={{ fontFamily: font, fontSize: "clamp(32px, 5vw, 68px)", fontWeight: 400, lineHeight: 1.15 }}
          >
            Zero Landfill
          </motion.h3>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={contentInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 1 }}
            className="text-white/60 text-center max-w-[420px] px-4"
            style={{ fontFamily: font, fontSize: "clamp(13px, 1.5vw, 16px)", lineHeight: 1.6 }}
          >
            Every material recovered is a step closer to a world where nothing goes to waste.
          </motion.p>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={contentInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 1.3 }}
          >
            <MagneticWrap strength={0.15}>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}>
                <Link
                  to="/book-appointment"
                  className="inline-flex items-center gap-3 bg-white text-[#171411] px-7 py-3 rounded-md hover:bg-white/90 transition-colors cursor-pointer"
                  style={{ fontFamily: font }}
                >
                  <span className="tracking-wide">Start Recycling</span>
                  <span className="text-[#171411]"><RecycleIconSmall size={13} /></span>
                </Link>
              </motion.div>
            </MagneticWrap>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}