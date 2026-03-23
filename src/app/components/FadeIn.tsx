import { motion, useInView } from "motion/react";
import { useRef, useEffect, type ReactNode } from "react";

export function FadeIn({
  children,
  delay = 0,
  direction = "up",
  className = "",
  once = true,
}: {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "left" | "right" | "down" | "none";
  className?: string;
  once?: boolean;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once, margin: "-60px" });

  const initial = {
    opacity: 0,
    y: direction === "up" ? 40 : direction === "down" ? -40 : 0,
    x: direction === "left" ? -50 : direction === "right" ? 50 : 0,
    scale: direction === "none" ? 0.95 : 1,
  };

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={inView ? { opacity: 1, y: 0, x: 0, scale: 1 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerChildren({
  children,
  className = "",
  staggerDelay = 0.1,
}: {
  children: ReactNode[];
  className?: string;
  staggerDelay?: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div ref={ref} className={className}>
      {children.map((child, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: 0.6,
            delay: i * staggerDelay,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {child}
        </motion.div>
      ))}
    </div>
  );
}

export function CountUp({
  target,
  suffix = "",
  prefix = "",
  duration = 2,
}: {
  target: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!inView || !ref.current || hasAnimated.current) return;
    hasAnimated.current = true;

    const el = ref.current;
    const end = target;
    const startTime = performance.now();
    const dur = duration * 1000;

    function update(currentTime: number) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / dur, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(end * eased);
      el.textContent = `${prefix}${current.toLocaleString()}${suffix}`;
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }, [inView, target, suffix, prefix, duration]);

  return (
    <span ref={ref}>
      {prefix}0{suffix}
    </span>
  );
}
