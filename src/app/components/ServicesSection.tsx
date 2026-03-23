import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { FadeInOnScroll, TextScramble, BookAVisitButton } from "./shared";
import { font, sans, sage, imgThingA, imgThingB, imgThingC, imgRoR, imgZeroCarb, imgRRR } from "../lib/constants";

export function ServicesSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const services = [
    {
      title: "SQ Recycle HUB",
      subtitle: "Driving Towards Zero Landfills",
      desc: "Stops recyclable waste at the source (For Ex: Households, SMBs, Corporates, Government org and Industries) ensuring it never reaches landfills. It's a one-stop sustainability platform, transforming 100+ recyclable materials into valuable resources and making recycling truly effortless.",
      img: imgThingA,
    },
    {
      title: "SQ RoR",
      subtitle: "Recovery of Recyclables from MRFs",
      desc: "Innovative Material Recovery Facilities that reclaim recyclables from landfills, railway stations, events, and urban hubs. RoR reduces waste at the source, cutting landfill dependency while fueling the zero-waste mission.",
      img: imgRoR,
    },
    {
      title: "SQ Circulomony",
      subtitle: "True Epitome of a Circular Economy",
      desc: "A people-powered model that ensures fair earnings across the entire ecosystem \u2014 consumers, rag pickers, kabadiwalas, retailers, and wholesalers. By creating shared value, we drive a resilient and inclusive green economy.",
      img: imgThingB,
    },
    {
      title: "SQ Carbon Tech",
      subtitle: "Tech to calculate carbon footprint",
      desc: "Quantifies recycled carbon footprint, enlightens consumers, and empowers industries toward minimal emissions, nurturing a greener world.",
      img: imgThingC,
    },
    {
      title: "SQ Zero Carbon",
      subtitle: "Net zero through re-cycling",
      desc: "Aids industries in attaining their net-zero carbon & EPR objectives, promoting sustainability and eco-friendliness through our solutions.",
      img: imgZeroCarb,
    },
    {
      title: "SQ RRR",
      subtitle: "Establish Reduce Reuse Recycle centers",
      desc: "EcoStations, enabling effortless e-waste recycling, reduction, and reuse for consumers, fostering environmental stewardship and resource efficiency.",
      img: imgRRR,
    },
  ];

  return (
    <section className="bg-white py-24 lg:py-40 px-6 lg:px-18" id="book-appointment" ref={ref}>
      <FadeInOnScroll>
        <div className="max-w-[740px] mx-auto text-center mb-16 lg:mb-24">
          <p className="uppercase tracking-[0.15em] text-[#171411] mb-6" style={{ fontFamily: font, fontSize: "13.5px", color: sage }}>
            <TextScramble text="What We Do" inView={inView} />
          </p>
          <p className="text-[#171411]" style={{ fontFamily: font, fontSize: "clamp(24px, 3vw, 38px)", lineHeight: "1.55" }}>
            From doorstep collection to certified
            <br />
            recycling &mdash; we handle the full cycle
            <br />
            with care, precision, and purpose.
          </p>
        </div>
      </FadeInOnScroll>

      <div className="max-w-[1300px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
        {services.map((s, i) => (
          <FadeInOnScroll key={s.title} delay={i * 0.08} direction={i % 2 === 0 ? "left" : "right"}>
            <motion.div
              whileHover={{ y: -6, scale: 1.01 }}
              transition={{ duration: 0.35 }}
              className="relative rounded-xl overflow-hidden h-[340px] lg:h-[380px] group cursor-pointer"
            >
              <motion.div className="absolute inset-0" whileHover={{ scale: 1.08 }} transition={{ duration: 0.8 }}>
                <ImageWithFallback
                  src={s.img}
                  alt={s.title}
                  className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/65 to-black/30 group-hover:from-black/95 group-hover:via-black/70 transition-all duration-500" />

              <div className="relative z-10 flex flex-col justify-end h-full p-6 lg:p-8">
                <motion.h4
                  className="text-white uppercase mb-1"
                  style={{ fontFamily: font, fontSize: "clamp(20px, 2vw, 26px)", fontWeight: 400, lineHeight: 1.25, textShadow: "0 2px 12px rgba(0,0,0,0.6)" }}
                >
                  {s.title}
                </motion.h4>
                <p className="text-white/90 mb-3" style={{ fontFamily: font, fontSize: "14px", fontStyle: "italic" }}>
                  &ldquo;{s.subtitle}&rdquo;
                </p>
                <p className="text-white/80 mb-5 max-w-[440px]" style={{ fontFamily: sans, fontSize: "13.5px", lineHeight: 1.6 }}>
                  {s.desc}
                </p>
                <motion.span
                  whileHover={{ x: 6 }}
                  className="inline-flex items-center gap-2 text-white border border-white/30 rounded-full px-5 py-2 w-fit hover:bg-white/10 transition-colors cursor-pointer"
                  style={{ fontFamily: font, fontSize: "13px", letterSpacing: "0.04em" }}
                >
                  Read more <span className="text-sm">&rarr;</span>
                </motion.span>
              </div>
            </motion.div>
          </FadeInOnScroll>
        ))}
      </div>

      <FadeInOnScroll delay={0.1}>
        <div className="flex justify-center mt-20">
          <BookAVisitButton />
        </div>
      </FadeInOnScroll>
    </section>
  );
}