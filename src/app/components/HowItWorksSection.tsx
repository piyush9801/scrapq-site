import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";
import { TextScramble } from "./shared";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { font, sans, sage } from "../lib/constants";
import { Phone, Truck, Scale, Banknote, Recycle, ArrowRight } from "lucide-react";
import howContactUs from "@/assets/how-contact-us.png";
import howOnsiteCollection from "@/assets/how-onsite-collection.png";
import howAccurateWeighing from "@/assets/how-accurate-weighing.png";
import howInstantPayment from "@/assets/how-instant-payment.png";

const steps = [
  {
    num: "01",
    title: "Contact Us",
    desc: "Call 90 30 72 72 77 or download the ScrapQ app to schedule a pickup at your convenience.",
    icon: Phone,
    img: howContactUs,
    mockup: true,
  },
  {
    num: "02",
    title: "Onsite Collection",
    desc: "Our trained team arrives at your location — home, office, or factory — to collect all recyclables.",
    icon: Truck,
    img: howOnsiteCollection,
  },
  {
    num: "03",
    title: "Accurate Weighing",
    desc: "Every item is weighed precisely using calibrated digital scales — full transparency, no guesswork.",
    icon: Scale,
    img: howAccurateWeighing,
  },
  {
    num: "04",
    title: "Instant Payment",
    desc: "Get paid on the spot via UPI, cash, or bank transfer — no delays, no deductions.",
    icon: Banknote,
    img: howInstantPayment,
  },
  {
    num: "05",
    title: "Responsible Recycling",
    desc: "Materials are processed through certified recycling channels — zero waste to landfill.",
    icon: Recycle,
    img: "https://images.unsplash.com/photo-1715541275956-4845a5cf74c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWN5Y2xpbmclMjBmYWNpbGl0eSUyMHNvcnRpbmclMjBjb252ZXlvciUyMGdyZWVufGVufDF8fHx8MTc3MjgwMzQ2Nnww&ixlib=rb-4.1.0&q=80&w=1080",
  },
];

/* ─── Phone Mockup ─── */
function PhoneMockup({ src, alt, hovered }: { src: string; alt: string; hovered: boolean }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#1a1f2e] via-[#171411] to-[#0f1218]">
      {/* Ambient glow behind phone */}
      <div
        className="absolute w-64 h-64 rounded-full opacity-25 blur-3xl"
        style={{ background: `radial-gradient(circle, ${sage}, transparent 70%)` }}
      />
      <motion.div
        animate={{ y: hovered ? -6 : 0, rotateY: hovered ? 3 : 0 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 120 }}
        className="relative h-[85%]"
        style={{ perspective: "800px" }}
      >
        {/* Phone frame */}
        <div
          className="relative h-full aspect-[9/19] rounded-[28px] overflow-hidden"
          style={{
            border: "4px solid rgba(255,255,255,0.15)",
            boxShadow: `0 25px 70px rgba(0,0,0,0.6), 0 0 40px ${sage}15, inset 0 0 0 1px rgba(255,255,255,0.05)`,
          }}
        >
          {/* Notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-[18px] bg-black rounded-b-2xl z-10" />

          {/* Screen content */}
          <img
            src={src}
            alt={alt}
            className="w-full h-full object-cover object-top"
          />
        </div>
      </motion.div>
    </div>
  );
}

/* ─── Step Card ─── */
function StepCard({ step, index, inView }: { step: typeof steps[0]; index: number; inView: boolean }) {
  const [hovered, setHovered] = useState(false);
  const Icon = step.icon;
  const isEven = index % 2 === 0;
  const isMockup = "mockup" in step && step.mockup;

  return (
    <motion.div
      initial={{ y: 60, opacity: 0 }}
      animate={inView ? { y: 0, opacity: 1 } : {}}
      transition={{ duration: 0.8, delay: 0.2 + index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group cursor-default"
    >
      <div
        className={`flex flex-col ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"} gap-0 rounded-2xl overflow-hidden`}
        style={{ backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}
      >
        {/* Image side */}
        <div className="relative w-full lg:w-[45%] h-[240px] lg:h-[320px] overflow-hidden flex-shrink-0">
          <motion.div
            animate={{ scale: hovered ? 1.06 : 1 }}
            transition={{ duration: 0.7 }}
            className="absolute inset-0"
          >
            <ImageWithFallback
              src={step.img}
              alt={step.title}
              className="w-full h-full object-cover"
            />
          </motion.div>
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#171411]/70 via-[#171411]/20 to-transparent lg:bg-none" />
          <div className={`hidden lg:block absolute inset-0 bg-gradient-to-${isEven ? "r" : "l"} from-transparent via-transparent to-[#171411]/40`} />

          {/* Step number overlay on image */}
          <div className="absolute top-5 left-5 lg:top-6 lg:left-6">
            <motion.div
              animate={{ scale: hovered ? 1.05 : 1 }}
              transition={{ duration: 0.3 }}
              className="w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-md"
              style={{ backgroundColor: `${sage}cc`, border: `1px solid ${sage}` }}
            >
              <span className="text-white" style={{ fontFamily: font, fontSize: "14px" }}>
                {step.num}
              </span>
            </motion.div>
          </div>

          {/* Floating icon badge */}
          <motion.div
            animate={{ y: hovered ? -3 : 0, rotate: hovered ? 8 : 0 }}
            transition={{ duration: 0.4 }}
            className="absolute bottom-5 right-5 lg:bottom-6 lg:right-6 w-14 h-14 rounded-xl flex items-center justify-center backdrop-blur-md"
            style={{ backgroundColor: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.15)" }}
          >
            <Icon size={24} color="white" strokeWidth={1.5} />
          </motion.div>
        </div>

        {/* Content side */}
        <div className="flex-1 flex flex-col justify-center p-6 lg:p-10 xl:p-12">
          {/* Decorative line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.4 + index * 0.12 }}
            className="w-10 h-[2px] mb-5 origin-left rounded-full"
            style={{ backgroundColor: sage }}
          />

          <motion.h3
            animate={{ x: hovered ? 6 : 0 }}
            transition={{ duration: 0.3 }}
            className="text-white uppercase tracking-[0.03em] mb-3"
            style={{ fontFamily: font, fontSize: "clamp(20px, 2vw, 28px)", lineHeight: 1.25 }}
          >
            {step.title}
          </motion.h3>

          <p
            className="text-white/55 mb-5"
            style={{ fontFamily: sans, fontSize: "15px", lineHeight: 1.7 }}
          >
            {step.desc}
          </p>

          {/* Hover reveal arrow */}
          <motion.div
            animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : -10 }}
            transition={{ duration: 0.3 }}
            className="flex items-center gap-2"
            style={{ color: sage }}
          >
            <div className="w-8 h-px" style={{ backgroundColor: sage }} />
            <ArrowRight size={14} />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Main Section ─── */
export function HowItWorksSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="bg-[#171411] relative overflow-hidden" ref={ref}>
      {/* Subtle background pattern */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative py-24 lg:py-40 px-6">
        {/* Header */}
        <div className="max-w-[900px] mx-auto text-center mb-16 lg:mb-24">
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="uppercase tracking-[0.15em] mb-6"
            style={{ fontFamily: font, fontSize: "13.5px", color: sage }}
          >
            <TextScramble text="How It Works" inView={inView} />
          </motion.p>
          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="text-white"
            style={{ fontFamily: font, fontSize: "clamp(24px, 3vw, 38px)", lineHeight: "1.55" }}
          >
            A simple 5&#8209;step process from your
            <br className="hidden sm:block" />
            doorstep to responsible recycling.
          </motion.p>
        </div>

        {/* Steps */}
        <div className="max-w-[1100px] mx-auto relative">
          {/* Vertical connecting line (desktop) */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 2.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px origin-top -translate-x-1/2"
            style={{ background: `linear-gradient(to bottom, transparent, ${sage}30, ${sage}30, transparent)` }}
          />

          <div className="flex flex-col gap-5 lg:gap-6">
            {steps.map((step, i) => (
              <StepCard key={step.num} step={step} index={i} inView={inView} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
