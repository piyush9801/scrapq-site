import { useState, useRef, useEffect } from "react";
import { motion, useInView, useScroll, useTransform, useSpring, AnimatePresence } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Newspaper, Box, Cog, Wine, CircleDot, Smartphone } from "lucide-react";

const font = "'Optima', 'Candara', 'Segoe UI', sans-serif";
const sans = "'DM Sans', 'Inter', sans-serif";
const sage = "#7b8b6f";

function TextScramble({ text, inView, delay = 0 }: { text: string; inView: boolean; delay?: number }) {
  const [display, setDisplay] = useState(text);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  useEffect(() => {
    if (!inView) return;
    let i = 0;
    const timeout = setTimeout(() => {
      const iv = setInterval(() => {
        setDisplay(
          text
            .split("")
            .map((c, j) => (j < i ? c : c === " " ? " " : chars[Math.floor(Math.random() * chars.length)]))
            .join("")
        );
        i += 0.5;
        if (i >= text.length) { setDisplay(text); clearInterval(iv); }
      }, 40);
      return () => clearInterval(iv);
    }, delay * 1000);
    return () => clearTimeout(timeout);
  }, [inView, text, delay]);
  return <>{display}</>;
}

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
  newspaper: <Newspaper size={20} strokeWidth={1.5} />,
  plastics: <Box size={20} strokeWidth={1.5} />,
  metals: <Cog size={20} strokeWidth={1.5} />,
  glass: <Wine size={20} strokeWidth={1.5} />,
  aluminium: <CircleDot size={20} strokeWidth={1.5} />,
  others: <Smartphone size={20} strokeWidth={1.5} />,
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

  // Scroll drives active index
  useEffect(() => {
    return scrollYProgress.on("change", (v) => {
      const idx = Math.min(Math.floor(v * count), count - 1);
      setActive(Math.max(0, idx));
    });
  }, [scrollYProgress, count]);

  // Click a tab → scroll to that position
  const scrollToIndex = (i: number) => {
    if (!containerRef.current) return;
    const sectionTop = containerRef.current.offsetTop;
    const totalHeight = containerRef.current.scrollHeight - window.innerHeight;
    const target = sectionTop + (totalHeight * i) / count;
    window.scrollTo({ top: target, behavior: "smooth" });
  };

  // Parallax for the active image
  const imageY = useTransform(smoothProgress, [0, 1], [0, -120]);
  // Watermark parallax
  const watermarkY = useTransform(smoothProgress, [0, 1], [60, -60]);

  const cat = recycleCategories[active];

  return (
    <section
      ref={containerRef}
      className="relative"
      style={{ height: `${(count + 1) * 100}vh` }}
    >
      {/* Sticky pinned viewport */}
      <div className="sticky top-0 h-screen bg-[#171411] overflow-hidden flex flex-col">
        {/* Ambient background glow */}
        <motion.div
          className="absolute inset-0 opacity-20 pointer-events-none"
          animate={{
            background: `radial-gradient(ellipse at 25% 40%, ${sage}35 0%, transparent 55%), radial-gradient(ellipse at 75% 70%, ${sage}18 0%, transparent 45%)`,
          }}
          transition={{ duration: 1 }}
        />

        {/* Oversized watermark index — parallax */}
        <motion.div
          className="absolute top-1/2 -right-4 lg:right-8 pointer-events-none select-none"
          style={{ y: watermarkY, translateY: "-50%" }}
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={active}
              initial={{ opacity: 0, y: 50, scale: 0.85 }}
              animate={{ opacity: 0.035, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -50, scale: 0.85 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              style={{ fontFamily: font, fontSize: "clamp(180px, 26vw, 380px)", fontWeight: 300, lineHeight: 1, color: "#ffffff", display: "block" }}
            >
              {String(active + 1).padStart(2, "0")}
            </motion.span>
          </AnimatePresence>
        </motion.div>

        {/* ─ Top bar: header + scroll progress + tabs ─ */}
        <div className="relative z-10 pt-10 lg:pt-14 px-6 flex-none">
          <div className="max-w-[1200px] mx-auto">
            {/* Compact header row */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.6 }}
              className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6"
            >
              <div>
                <p className="uppercase tracking-[0.2em] mb-1.5" style={{ fontFamily: sans, fontSize: "11px", color: sage, fontWeight: 500 }}>
                  <TextScramble text="Materials We Handle" inView={inView} />
                </p>
                <h2 style={{ fontFamily: font, fontSize: "clamp(26px, 3.8vw, 44px)", color: "#ffffff", lineHeight: 1.15 }}>
                  What We Recycle
                </h2>
              </div>
              {/* Scroll progress indicator */}
              <div className="flex items-center gap-3">
                <span style={{ fontFamily: sans, fontSize: "12px", color: "rgba(255,255,255,0.4)", fontWeight: 500 }}>
                  {String(active + 1).padStart(2, "0")}
                </span>
                <div className="w-24 h-[2px] rounded-full bg-white/10 overflow-hidden">
                  <motion.div className="h-full rounded-full" style={{ backgroundColor: sage, scaleX: smoothProgress, transformOrigin: "left" }} />
                </div>
                <span style={{ fontFamily: sans, fontSize: "12px", color: "rgba(255,255,255,0.4)", fontWeight: 500 }}>
                  {String(recycleCategories.length).padStart(2, "0")}
                </span>
              </div>
            </motion.div>

            {/* Circular tab strip */}
            <motion.div
              initial={{ y: 15, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="flex items-center gap-1.5 sm:gap-3 lg:gap-5 flex-wrap"
            >
              {recycleCategories.map((c, i) => {
                const isActive = active === i;
                return (
                  <motion.button
                    key={c.id}
                    onClick={() => scrollToIndex(i)}
                    className="relative cursor-pointer flex flex-col items-center gap-1.5 group"
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="recycleGlowScroll"
                        className="absolute -inset-2 rounded-full"
                        style={{ background: `radial-gradient(circle, ${sage}40 0%, transparent 70%)` }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                      />
                    )}
                    <div
                      className={`relative overflow-hidden rounded-full transition-all duration-500 ${isActive ? "w-[56px] h-[56px] lg:w-[68px] lg:h-[68px]" : "w-[40px] h-[40px] lg:w-[50px] lg:h-[50px]"}`}
                      style={{
                        outline: isActive ? `2px solid ${sage}` : "1px solid rgba(255,255,255,0.12)",
                        outlineOffset: isActive ? "3px" : "0px",
                      }}
                    >
                      <ImageWithFallback
                        src={c.thumb}
                        alt={c.label}
                        className={`w-full h-full object-cover transition-all duration-500 ${isActive ? "scale-110" : "grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-75"}`}
                      />
                      <div className={`absolute inset-0 transition-all duration-300 ${isActive ? "bg-black/10" : "bg-black/35 group-hover:bg-black/15"}`} />
                    </div>
                    <AnimatePresence>
                      {isActive && (
                        <motion.span
                          initial={{ opacity: 0, y: -3, scale: 0.8 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -3, scale: 0.8 }}
                          transition={{ duration: 0.25 }}
                          className="px-2.5 py-0.5 rounded-full whitespace-nowrap"
                          style={{ backgroundColor: sage, color: "#171411", fontFamily: sans, fontSize: "9px", fontWeight: 700, letterSpacing: "0.06em" }}
                        >
                          {c.label}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.button>
                );
              })}
            </motion.div>
          </div>
        </div>

        {/* ─ Main cinematic panel (fills remaining space) ─ */}
        <div className="relative z-10 flex-1 min-h-0 px-6 pt-6 pb-6 lg:pb-10">
          <div className="max-w-[1200px] mx-auto h-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={cat.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="relative h-full rounded-3xl overflow-hidden"
              >
                {/* Full image with parallax */}
                <motion.div className="absolute inset-0" style={{ y: imageY }}>
                  <motion.div
                    initial={{ scale: 1.12 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
                    className="w-full h-[120%] -mt-[10%]"
                  >
                    <ImageWithFallback src={cat.image} alt={cat.title} className="w-full h-full object-cover" />
                  </motion.div>
                </motion.div>

                {/* Gradient overlays */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#171411]/95 via-[#171411]/50 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#171411]/85 via-transparent to-[#171411]/30" />

                {/* Content overlay — staggered scroll-reveal */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-10 lg:p-14">
                  <div className="max-w-[620px]">
                    {/* Icon + counter */}
                    <motion.div
                      initial={{ x: -30, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.05 }}
                      className="flex items-center gap-3 mb-4"
                    >
                      <span
                        className="flex items-center justify-center w-10 h-10 rounded-full"
                        style={{ backgroundColor: "rgba(123,139,111,0.25)", backdropFilter: "blur(10px)", color: sage }}
                      >
                        {materialIcons[cat.id]}
                      </span>
                      <span style={{ fontFamily: sans, fontSize: "12px", color: sage, fontWeight: 600, letterSpacing: "0.1em" }}>
                        {String(active + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
                      </span>
                    </motion.div>

                    {/* Title */}
                    <motion.h3
                      initial={{ y: 25, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                      style={{ fontFamily: font, fontSize: "clamp(28px, 4vw, 48px)", color: "#ffffff", lineHeight: 1.1, marginBottom: "14px" }}
                    >
                      {cat.title}
                    </motion.h3>

                    {/* Sage line */}
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="h-[2px] w-16 mb-5 origin-left rounded-full"
                      style={{ backgroundColor: sage }}
                    />

                    {/* Description */}
                    <motion.p
                      initial={{ y: 18, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.55, delay: 0.25 }}
                      className="mb-3 hidden sm:block"
                      style={{ fontFamily: font, fontSize: "15px", lineHeight: 1.75, color: "#ffffff", opacity: 0.85 }}
                    >
                      {cat.desc}
                    </motion.p>

                    {/* Italic CTA quote */}
                    <motion.p
                      initial={{ y: 18, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.55, delay: 0.32 }}
                      className="mb-6 hidden md:block"
                      style={{ fontFamily: font, fontSize: "13.5px", lineHeight: 1.65, color: sage, fontStyle: "italic", opacity: 0.9 }}
                    >
                      {cat.cta}
                    </motion.p>

                    {/* Bottom bar: price + CTA */}
                    <motion.div
                      initial={{ y: 18, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.55, delay: 0.4 }}
                      className="flex items-center gap-5 flex-wrap"
                    >
                      {cat.price && (
                        <div
                          className="px-5 py-2.5 rounded-2xl"
                          style={{ backgroundColor: "rgba(255,255,255,0.08)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.1)" }}
                        >
                          <span style={{ fontFamily: sans, fontSize: "11px", opacity: 0.55, color: "#ffffff" }}>Rs. </span>
                          <span style={{ fontFamily: font, fontSize: "clamp(28px, 3vw, 38px)", fontWeight: 300, lineHeight: 1, color: "#ffffff" }}>
                            {cat.price}
                          </span>
                          <span style={{ fontFamily: sans, fontSize: "12px", opacity: 0.55, color: "#ffffff" }}> /Kg</span>
                        </div>
                      )}
                      <motion.button
                        whileHover={{ scale: 1.05, backgroundColor: "#ffffff", color: "#171411" }}
                        whileTap={{ scale: 0.97 }}
                        className="px-7 py-3 rounded-full border border-white/25 text-white cursor-pointer transition-colors duration-300"
                        style={{ fontFamily: sans, fontSize: "12.5px", fontWeight: 600, letterSpacing: "0.05em", backdropFilter: "blur(8px)" }}
                      >
                        Schedule Pickup →
                      </motion.button>
                    </motion.div>
                  </div>
                </div>

                {/* Vertical progress dots — right edge */}
                <div className="absolute right-5 sm:right-8 top-1/2 -translate-y-1/2 flex flex-col gap-2.5">
                  {recycleCategories.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => scrollToIndex(i)}
                      className="cursor-pointer relative group"
                    >
                      <div
                        className={`rounded-full transition-all duration-300 ${active === i ? "h-7 w-[5px]" : "h-[5px] w-[5px] group-hover:bg-white/50"}`}
                        style={{ backgroundColor: active === i ? sage : "rgba(255,255,255,0.25)" }}
                      />
                    </button>
                  ))}
                </div>

                {/* Scroll hint at bottom — only on first slide */}
                <motion.div
                  className="absolute bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
                  animate={{ opacity: active === 0 ? 0.5 : 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <span style={{ fontFamily: sans, fontSize: "9px", color: "#ffffff", letterSpacing: "0.15em", textTransform: "uppercase" }}>Scroll</span>
                  <motion.div
                    className="w-[1px] bg-white/30"
                    animate={{ height: [12, 24, 12] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  />
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile description below panel */}
        <div className="sm:hidden px-6 pb-4 relative z-10">
          <AnimatePresence mode="wait">
            <motion.p
              key={cat.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              style={{ fontFamily: font, fontSize: "13.5px", lineHeight: 1.65, color: "#ffffff", opacity: 0.75 }}
            >
              {cat.desc}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}