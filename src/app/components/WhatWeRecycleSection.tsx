import { useState, useRef, useEffect } from "react";
import { motion, useInView, useScroll, useSpring, AnimatePresence } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Newspaper, Box, Cog, Wine, CircleDot, Smartphone, ArrowRight } from "lucide-react";

const font = "'Optima', 'Candara', 'Segoe UI', sans-serif";
const sans = "'DM Sans', 'Inter', sans-serif";
const sage = "#7b8b6f";

interface RecycleCategory {
  id: string;
  label: string;
  title: string;
  thumb: string;
  image: string;
  desc: string;
  price: string;
  cta: string;
}

const materialIcons: Record<string, React.ReactNode> = {
  newspaper: <Newspaper size={22} strokeWidth={1.5} />,
  plastics: <Box size={22} strokeWidth={1.5} />,
  metals: <Cog size={22} strokeWidth={1.5} />,
  glass: <Wine size={22} strokeWidth={1.5} />,
  aluminium: <CircleDot size={22} strokeWidth={1.5} />,
  others: <Smartphone size={22} strokeWidth={1.5} />,
};

export function WhatWeRecycleScrollytelling({ recycleCategories }: { recycleCategories: RecycleCategory[] }) {
  const count = recycleCategories.length;
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: true, margin: "-100px" });
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 80, damping: 20 });

  useEffect(() => {
    return scrollYProgress.on("change", (v) => {
      const idx = Math.min(Math.floor(v * count), count - 1);
      setActive(Math.max(0, idx));
    });
  }, [scrollYProgress, count]);

  const scrollToIndex = (i: number) => {
    if (!containerRef.current) return;
    const sectionTop = containerRef.current.offsetTop;
    const totalHeight = containerRef.current.scrollHeight - window.innerHeight;
    const target = sectionTop + (totalHeight * i) / count;
    window.scrollTo({ top: target, behavior: "smooth" });
  };

  const cat = recycleCategories[active];

  return (
    <section
      ref={containerRef}
      className="relative"
      style={{ height: `${(count + 1) * 100}vh` }}
    >
      <div className="sticky top-0 h-screen bg-[#faf8f5] overflow-hidden">
        <div className="h-full max-w-[1400px] mx-auto flex flex-col lg:flex-row">

          {/* ── LEFT: Content panel ── */}
          <div className="flex-1 flex flex-col justify-center px-8 lg:px-16 py-10 lg:py-0 relative z-10">
            {/* Header */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.6 }}
              className="mb-8 lg:mb-12"
            >
              <p
                className="uppercase tracking-[0.2em] mb-2"
                style={{ fontFamily: sans, fontSize: "11px", color: sage, fontWeight: 600 }}
              >
                Materials We Handle
              </p>
              <h2 style={{ fontFamily: font, fontSize: "clamp(28px, 3.5vw, 44px)", color: "#171411", lineHeight: 1.15 }}>
                What We Recycle
              </h2>
            </motion.div>

            {/* Tab pills */}
            <motion.div
              initial={{ y: 15, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex flex-wrap gap-2 mb-10"
            >
              {recycleCategories.map((c, i) => {
                const isActive = active === i;
                return (
                  <motion.button
                    key={c.id}
                    onClick={() => scrollToIndex(i)}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    className="cursor-pointer relative px-4 py-2 rounded-full transition-all duration-300"
                    style={{
                      fontFamily: sans,
                      fontSize: "12px",
                      fontWeight: 600,
                      letterSpacing: "0.03em",
                      backgroundColor: isActive ? sage : "transparent",
                      color: isActive ? "#fff" : "#171411",
                      border: isActive ? `1px solid ${sage}` : "1px solid rgba(23,20,17,0.15)",
                    }}
                  >
                    {c.label}
                  </motion.button>
                );
              })}
            </motion.div>

            {/* Active content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Icon + counter */}
                <div className="flex items-center gap-3 mb-5">
                  <span
                    className="flex items-center justify-center w-11 h-11 rounded-full"
                    style={{ backgroundColor: `${sage}15`, color: sage }}
                  >
                    {materialIcons[cat.id]}
                  </span>
                  <div>
                    <span
                      className="block"
                      style={{ fontFamily: sans, fontSize: "10px", color: "rgba(23,20,17,0.4)", fontWeight: 500, letterSpacing: "0.1em" }}
                    >
                      {String(active + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h3
                  className="mb-3"
                  style={{ fontFamily: font, fontSize: "clamp(26px, 3vw, 40px)", color: "#171411", lineHeight: 1.15 }}
                >
                  {cat.title}
                </h3>

                <div className="h-[2px] w-12 mb-5 rounded-full" style={{ backgroundColor: sage }} />

                {/* Description */}
                <p
                  className="mb-4 max-w-[520px]"
                  style={{ fontFamily: font, fontSize: "15px", lineHeight: 1.75, color: "#171411", opacity: 0.7 }}
                >
                  {cat.desc}
                </p>

                {/* CTA italic */}
                <p
                  className="mb-8 max-w-[480px] hidden sm:block"
                  style={{ fontFamily: font, fontSize: "13.5px", lineHeight: 1.65, color: sage, fontStyle: "italic" }}
                >
                  {cat.cta}
                </p>

                {/* Price + button */}
                <div className="flex items-center gap-5 flex-wrap">
                  {cat.price && (
                    <div className="flex items-baseline gap-1">
                      <span style={{ fontFamily: sans, fontSize: "12px", color: "#171411", opacity: 0.4 }}>Rs.</span>
                      <span style={{ fontFamily: font, fontSize: "clamp(30px, 3vw, 42px)", fontWeight: 300, color: "#171411", lineHeight: 1 }}>
                        {cat.price}
                      </span>
                      <span style={{ fontFamily: sans, fontSize: "13px", color: "#171411", opacity: 0.4 }}>/Kg</span>
                    </div>
                  )}
                  <motion.button
                    whileHover={{ scale: 1.04, backgroundColor: "#171411", color: "#faf8f5" }}
                    whileTap={{ scale: 0.97 }}
                    className="px-6 py-3 rounded-full cursor-pointer flex items-center gap-2 transition-all duration-300"
                    style={{
                      fontFamily: sans,
                      fontSize: "12.5px",
                      fontWeight: 600,
                      letterSpacing: "0.04em",
                      backgroundColor: sage,
                      color: "#fff",
                    }}
                  >
                    Schedule Pickup
                    <ArrowRight size={14} />
                  </motion.button>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Progress bar at bottom */}
            <div className="mt-auto pt-8 lg:pt-12">
              <div className="flex items-center gap-3">
                <div className="flex-1 h-[2px] rounded-full bg-black/5 overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: sage, scaleX: smoothProgress, transformOrigin: "left" }}
                  />
                </div>
                <span style={{ fontFamily: sans, fontSize: "11px", color: "rgba(23,20,17,0.35)", fontWeight: 500 }}>
                  {String(active + 1).padStart(2, "0")}/{String(count).padStart(2, "0")}
                </span>
              </div>
            </div>
          </div>

          {/* ── RIGHT: Image panel ── */}
          <div className="flex-1 relative hidden lg:block">
            <AnimatePresence mode="wait">
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-4 rounded-3xl overflow-hidden"
                style={{ boxShadow: "0 8px 40px rgba(23,20,17,0.08)" }}
              >
                <ImageWithFallback
                  src={cat.image}
                  alt={cat.title}
                  className="w-full h-full object-cover"
                />
                {/* Subtle bottom gradient for depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent" />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Mobile image — shown below tabs on small screens */}
          <div className="lg:hidden px-6 pb-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={cat.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="rounded-2xl overflow-hidden h-[240px]"
              >
                <ImageWithFallback
                  src={cat.image}
                  alt={cat.title}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
