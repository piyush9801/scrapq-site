import { useState, useRef, useEffect, useCallback } from "react";
import { motion, useInView, useScroll, useTransform, useSpring, AnimatePresence } from "motion/react";
import { Link } from "react-router";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { RecycleIconSmall, DividerSvg } from "./KaleoIcon";
import { font, sans, sage } from "../lib/constants";

/* ─── REUSABLE HOOKS ─── */
export function useCountUp(target: number, duration = 2000, startCounting = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!startCounting) return;
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration, startCounting]);
  return count;
}

/* ─── FLOATING PARTICLES ─── */
export function FloatingParticles({ count = 20, color = "#ffffff" }: { count?: number; color?: string }) {
  const particles = Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    duration: Math.random() * 15 + 10,
    delay: Math.random() * 5,
  }));
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            backgroundColor: color,
            opacity: 0,
          }}
          animate={{
            y: [0, -120, -60, -180],
            x: [0, 20, -15, 10],
            opacity: [0, 0.4, 0.2, 0],
            scale: [0.5, 1, 0.8, 0.3],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

/* ─── MAGNETIC HOVER ─── */
export function MagneticWrap({ children, strength = 0.3 }: { children: React.ReactNode; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMouse = useCallback(
    (e: React.MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) * strength;
      const y = (e.clientY - rect.top - rect.height / 2) * strength;
      setPos({ x, y });
    },
    [strength]
  );

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={() => setPos({ x: 0, y: 0 })}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15 }}
    >
      {children}
    </motion.div>
  );
}

/* ─── FADE IN ON SCROLL ─── */
export function FadeInOnScroll({
  children,
  delay = 0,
  direction = "up",
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "left" | "right" | "down";
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const initial = {
    opacity: 0,
    y: direction === "up" ? 50 : direction === "down" ? -50 : 0,
    x: direction === "left" ? -60 : direction === "right" ? 60 : 0,
  };
  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={inView ? { opacity: 1, y: 0, x: 0 } : {}}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── BOOK A VISIT BUTTON ─── */
export function BookAVisitButton({ className = "" }: { className?: string }) {
  return (
    <MagneticWrap strength={0.15}>
      <motion.div
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
      >
        <Link
          to="/book-appointment"
          className={`inline-flex items-center gap-3 bg-[#171411] text-white px-6 py-3 rounded-md hover:bg-[#2a2520] transition-colors cursor-pointer ${className}`}
          style={{ fontFamily: font }}
        >
          <span className="tracking-wide">Book an Appointment</span>
          <motion.span
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          >
            <RecycleIconSmall size={13} />
          </motion.span>
        </Link>
      </motion.div>
    </MagneticWrap>
  );
}

/* ─── TEXT SCRAMBLE EFFECT ─── */
export function TextScramble({ text, inView, delay = 0 }: { text: string; inView: boolean; delay?: number }) {
  const [displayed, setDisplayed] = useState(text);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  useEffect(() => {
    if (!inView) return;
    let iteration = 0;
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        setDisplayed(
          text
            .split("")
            .map((char, i) => {
              if (char === " ") return " ";
              if (i < iteration) return text[i];
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join("")
        );
        iteration += 1 / 2;
        if (iteration >= text.length) {
          setDisplayed(text);
          clearInterval(interval);
        }
      }, 40);
      return () => clearInterval(interval);
    }, delay * 1000);
    return () => clearTimeout(timeout);
  }, [inView, text, delay]);
  return <>{displayed}</>;
}

/* ─── SCROLL PROGRESS BAR ─── */
export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 80, damping: 30, restDelta: 0.001 });
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] origin-left z-[60]"
      style={{ scaleX, background: `linear-gradient(90deg, ${sage}, #a8b89e, ${sage})` }}
    />
  );
}

/* ─── SCROLL-DRIVEN HORIZONTAL MARQUEE ─── */
export function ScrollMarquee({ text = "RECYCLE \u2022 REUSE \u2022 RECOVER \u2022 RENEW \u2022 ", reverse = false, light = false }: { text?: string; reverse?: boolean; light?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const x = useTransform(scrollYProgress, [0, 1], reverse ? ["-25%", "0%"] : ["0%", "-25%"]);

  return (
    <div ref={ref} className="overflow-hidden py-6 lg:py-10">
      <motion.div style={{ x }} className="flex whitespace-nowrap w-max">
        {[...Array(4)].map((_, i) => (
          <span
            key={i}
            className={`uppercase select-none ${light ? "text-white/[0.06]" : "text-[#171411]/[0.04]"}`}
            style={{ fontFamily: font, fontSize: "clamp(60px, 10vw, 140px)", fontWeight: 400, letterSpacing: "0.04em" }}
          >
            {text}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/* ─── SCROLL-LINKED SECTION REVEAL ─── */
export function ScrollRevealSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start 0.3"],
  });
  const opacity = useTransform(scrollYProgress, [0, 1], [0.3, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [60, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.97, 1]);

  return (
    <motion.div ref={ref} style={{ opacity, y, scale }} className={className}>
      {children}
    </motion.div>
  );
}

/* ─── POLAROID CARD ─── */
export function PolaroidCard({
  img, label, finalRotate, finalX, finalY, startRotate, startX, delay, zIndex,
}: {
  img: string; label: string; finalRotate: number; finalX: number; finalY: number;
  startRotate: number; startX: number; delay: number; zIndex: number;
}) {
  return (
    <motion.div
      initial={{ y: 500, x: startX, rotate: startRotate, opacity: 0, scale: 0.65 }}
      animate={{ y: finalY, x: finalX, rotate: finalRotate, opacity: 1, scale: 1 }}
      transition={{ duration: 1.1, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: finalY - 15, scale: 1.03, zIndex: 10, transition: { duration: 0.3 } }}
      className="absolute cursor-pointer"
      style={{ zIndex, filter: `drop-shadow(0 25px 50px rgba(23,20,17,0.28))` }}
    >
      <div
        className="bg-[#faf8f5] p-2.5 pb-10 md:p-3.5 md:pb-14 rounded-sm"
        style={{ boxShadow: "0 2px 20px rgba(23,20,17,0.12), 0 8px 40px rgba(23,20,17,0.08)" }}
      >
        <div className="w-[220px] h-[155px] md:w-[360px] md:h-[240px] lg:w-[440px] lg:h-[295px] overflow-hidden rounded-[1px]">
          <motion.div whileHover={{ scale: 1.08 }} transition={{ duration: 0.6 }} className="w-full h-full">
            <ImageWithFallback src={img} alt={label} className="w-full h-full object-cover" />
          </motion.div>
        </div>
        <p
          className="absolute bottom-2.5 md:bottom-4 left-4 md:left-5 text-[#171411]/50"
          style={{ fontFamily: font, fontSize: "clamp(12px, 1.5vw, 16px)", fontStyle: "italic" }}
        >
          {label}
        </p>
      </div>
    </motion.div>
  );
}

/* ─── ANIMATED IMAGE WITH TILT + SCROLL PARALLAX ─── */
export function AnimatedImageBlock({ src, alt, direction }: { src: string; alt: string; direction: "left" | "right" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  const handleMouse = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 8;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 8;
    setTilt({ x: -y, y: x });
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: direction === "left" ? -80 : 80, scale: 0.92 }}
      animate={inView ? { opacity: 1, x: 0, scale: 1 } : {}}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMouse}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      className="rounded-2xl overflow-hidden h-[400px] lg:h-[592px]"
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: "transform 0.15s ease-out",
      }}
    >
      <motion.div style={{ y: imgY, scale: 1.15 }} className="w-full h-full">
        <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.6 }} className="w-full h-full">
          <ImageWithFallback src={src} alt={alt} className="w-full h-full object-cover" />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

/* ─── ANIMATED TEXT BLOCK ─── */
export function AnimatedTextBlock({ title, text, delay = 0.2 }: { title: string; text: string; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <div ref={ref} className="flex flex-col justify-center pt-4 lg:pt-16">
      <motion.h2
        initial={{ y: 30, opacity: 0 }}
        animate={inView ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
        className="text-[#171411] uppercase mb-4"
        style={{ fontFamily: font, fontSize: "clamp(32px, 3.5vw, 48px)", fontWeight: 400, lineHeight: 1.2 }}
      >
        {title}
      </motion.h2>
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={inView ? { scaleX: 1, opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: delay + 0.15 }}
        className="mb-6 origin-left"
      >
        <DividerSvg />
      </motion.div>
      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={inView ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: delay + 0.3 }}
        className="text-[#171411] max-w-[485px]"
        style={{ fontFamily: font, fontSize: "17px", lineHeight: "1.6" }}
      >
        {text}
      </motion.p>
    </div>
  );
}