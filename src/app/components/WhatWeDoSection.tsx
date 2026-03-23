import { useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "motion/react";
import { RecycleIconLight } from "./KaleoIcon";
import { FadeInOnScroll, TextScramble, BookAVisitButton } from "./shared";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { font, sans, sage } from "../lib/constants";
import { ArrowRight, Leaf, Factory, BarChart3, Recycle, Building2, Cpu } from "lucide-react";
import sqRecycleHub from "@/assets/sq-recycle-hub.png";
import sqRor from "@/assets/sq-ror.png";
import sqCirculomony from "@/assets/sq-circulomony.png";
import sqCarbonTech from "@/assets/sq-carbon-tech.png";

const services = [
  {
    title: "SQ Recycle HUB",
    subtitle: "Driving Towards Zero Landfills",
    desc: "Stops recyclable waste at the source — households, SMBs, corporates, and industries — ensuring it never reaches landfills. A one-stop sustainability platform transforming 100+ recyclable materials into valuable resources.",
    img: sqRecycleHub,
    icon: Recycle,
  },
  {
    title: "SQ RoR",
    subtitle: "Recovery of Recyclables from MRFs",
    desc: "Innovative Material Recovery Facilities that reclaim recyclables from landfills, railway stations, events, and urban hubs — cutting landfill dependency while fueling the zero-waste mission.",
    img: sqRor,
    icon: Factory,
  },
  {
    title: "SQ Circulomony",
    subtitle: "True Epitome of a Circular Economy",
    desc: "A people-powered model that ensures fair earnings across the entire ecosystem — consumers, rag pickers, kabadiwalas, retailers, and wholesalers. Driving a resilient and inclusive green economy.",
    img: sqCirculomony,
    icon: Leaf,
  },
  {
    title: "SQ Carbon Tech",
    subtitle: "Tech to calculate carbon footprint",
    desc: "Quantifies recycled carbon footprint, enlightens consumers, and empowers industries toward minimal emissions, nurturing a greener world.",
    img: sqCarbonTech,
    icon: BarChart3,
  },
  {
    title: "SQ Zero Carbon",
    subtitle: "Net zero through re-cycling",
    desc: "Aids industries in attaining their net-zero carbon & EPR objectives, promoting sustainability and eco-friendliness through our solutions.",
    img: "https://images.unsplash.com/photo-1767740680600-3cb2408a6077?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZXQlMjB6ZXJvJTIwY2FyYm9uJTIwZW1pc3Npb25zJTIwZ3JlZW4lMjBpbmR1c3RyeXxlbnwxfHx8fDE3NzI4MDI2ODd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    icon: Building2,
  },
  {
    title: "SQ RRR",
    subtitle: "Reduce · Reuse · Recycle Centers",
    desc: "EcoStations enabling effortless e-waste recycling, reduction, and reuse for consumers, fostering environmental stewardship and resource efficiency.",
    img: "https://images.unsplash.com/photo-1512237017014-1b4a7fa57654?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlLXdhc3RlJTIwZWxlY3Ryb25pY3MlMjByZWN5Y2xpbmclMjBzdGF0aW9ufGVufDF8fHx8MTc3MjgwMjY4Nnww&ixlib=rb-4.1.0&q=80&w=1080",
    icon: Cpu,
  },
];

/* ─── SERVICE CARD ─── */
function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const Icon = service.icon;

  return (
    <FadeInOnScroll delay={index * 0.08} direction={index % 2 === 0 ? "left" : "right"}>
      <motion.div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ y: -4 }}
        transition={{ duration: 0.35 }}
        className="relative group cursor-pointer"
      >
        {/* Card container */}
        <div className="relative overflow-hidden rounded-xl bg-[#faf8f5]" style={{ boxShadow: "0 2px 20px rgba(23,20,17,0.06)" }}>
          {/* Image */}
          <div className="relative h-[220px] lg:h-[260px] overflow-hidden">
            <motion.div
              animate={{ scale: isHovered ? 1.06 : 1 }}
              transition={{ duration: 0.7 }}
              className="absolute inset-0"
            >
              <ImageWithFallback
                src={service.img}
                alt={service.title}
                className="w-full h-full object-cover"
              />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            
            {/* Floating icon badge */}
            <motion.div
              animate={{ y: isHovered ? -4 : 0 }}
              transition={{ duration: 0.3 }}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center"
              style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.1)" }}
            >
              <Icon size={18} color={sage} strokeWidth={1.5} />
            </motion.div>
          </div>

          {/* Content */}
          <div className="p-5 lg:p-6">
            <h4
              className="text-[#171411] mb-1"
              style={{ fontFamily: font, fontSize: "clamp(18px, 1.5vw, 22px)", lineHeight: 1.3 }}
            >
              {service.title}
            </h4>
            <p
              className="mb-3"
              style={{ fontFamily: font, fontSize: "13px", color: sage, fontStyle: "italic" }}
            >
              {service.subtitle}
            </p>

            {/* Description with expand animation */}
            <AnimatePresence initial={false}>
              <motion.div
                initial={false}
                animate={{ height: isHovered ? "auto" : 48, opacity: 1 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <p
                  className="text-[#171411]/70"
                  style={{ fontFamily: sans, fontSize: "13.5px", lineHeight: 1.65 }}
                >
                  {service.desc}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Arrow indicator */}
            <motion.div
              animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -8 }}
              transition={{ duration: 0.3 }}
              className="mt-3 flex items-center gap-1.5"
              style={{ color: sage, fontFamily: font, fontSize: "12.5px", letterSpacing: "0.04em" }}
            >
              <span>Learn more</span>
              <ArrowRight size={13} />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </FadeInOnScroll>
  );
}

/* ─── MAIN SECTION ─── */
export function WhatWeDoSection() {
  const textRef = useRef(null);
  const parallaxRef = useRef(null);
  const textInView = useInView(textRef, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({
    target: parallaxRef,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
  const imgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.15, 1.08, 1.15]);

  return (
    <section id="discover" className="relative bg-white overflow-hidden">
      {/* ── PART 1: Our Mission — cinematic image + overlay ── */}
      <div ref={parallaxRef} className="relative min-h-[85vh] lg:min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Parallax background image */}
        <motion.div className="absolute inset-0" style={{ y: imgY, scale: imgScale }}>
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1743485753903-379f8aa68ad1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZXJpYWwlMjBsdXNoJTIwZ3JlZW4lMjBmb3Jlc3QlMjBjYW5vcHklMjBkcm9uZXxlbnwxfHx8fDE3NzI4MDMxMjB8MA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Aerial forest canopy"
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Dark overlay with gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#171411]/60 via-[#171411]/55 to-[#171411]/70" />

        {/* Subtle grain texture */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")", backgroundSize: "128px 128px" }} />

        {/* Content */}
        <div ref={textRef} className="relative z-10 max-w-[1080px] mx-auto px-6 text-center py-24 lg:py-40">
          {/* Badge */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={textInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 mb-10 border border-white/20 rounded-full px-5 py-2 backdrop-blur-sm bg-white/5"
          >
            <motion.div animate={{ rotate: [0, 360] }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}>
              <RecycleIconLight size={14} />
            </motion.div>
            <span
              className="uppercase tracking-[0.2em] text-white/80"
              style={{ fontFamily: font, fontSize: "11.5px" }}
            >
              <TextScramble text="Our Mission" inView={textInView} />
            </span>
          </motion.div>

          {/* Headline */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={textInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2
              className="text-white mb-6"
              style={{ fontFamily: font, fontSize: "clamp(28px, 4vw, 54px)", lineHeight: 1.25 }}
            >
              ScrapQ is more than a service
              <br className="hidden md:block" />
              <span className="text-white/60"> &mdash; </span>it's a movement.
            </h2>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ y: 40, opacity: 0 }}
            animate={textInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="text-white/75 max-w-[680px] mx-auto"
            style={{ fontFamily: font, fontSize: "clamp(16px, 1.8vw, 21px)", lineHeight: 1.7 }}
          >
            We stop recyclable waste at the source &mdash; households, SMBs, corporates,
            and industries &mdash; ensuring it never reaches landfills.
          </motion.p>

          {/* Decorative line */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={textInView ? { scaleX: 1, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-10 mx-auto w-16 h-px origin-center"
            style={{ background: `linear-gradient(90deg, transparent, ${sage}, transparent)` }}
          />

          {/* Small stat highlights */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={textInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-8 lg:gap-14"
          >
            {[
              { value: "100+", label: "Materials Recycled" },
              { value: "50+", label: "Cities Served" },
              { value: "0", label: "Waste to Landfill" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-white" style={{ fontFamily: font, fontSize: "clamp(26px, 3vw, 38px)" }}>{stat.value}</p>
                <p className="text-white/50 uppercase tracking-[0.12em] mt-1" style={{ fontFamily: font, fontSize: "11px" }}>{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ── PART 2: What We Do — Services Grid ── */}
      <div className="py-24 lg:py-36 px-6 lg:px-12" id="book-appointment">
        <FadeInOnScroll>
          <div className="max-w-[740px] mx-auto text-center mb-16 lg:mb-24">
            <p
              className="uppercase tracking-[0.15em] mb-6"
              style={{ fontFamily: font, fontSize: "13.5px", color: sage }}
            >
              What We Do
            </p>
            <p
              className="text-[#171411]"
              style={{ fontFamily: font, fontSize: "clamp(24px, 3vw, 38px)", lineHeight: "1.55" }}
            >
              From doorstep collection to certified
              <br className="hidden sm:block" />
              {" "}recycling &mdash; we handle the full cycle
              <br className="hidden sm:block" />
              {" "}with care, precision, and purpose.
            </p>
          </div>
        </FadeInOnScroll>

        <div className="max-w-[1300px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {services.map((s, i) => (
            <ServiceCard key={s.title} service={s} index={i} />
          ))}
        </div>

        <FadeInOnScroll delay={0.1}>
          <div className="flex justify-center mt-20">
            <BookAVisitButton />
          </div>
        </FadeInOnScroll>
      </div>
    </section>
  );
}