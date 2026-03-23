import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { RecycleIconLight } from "./KaleoIcon";
import { FadeInOnScroll } from "./shared";
import { font, sage, imgDualA, imgDualB } from "../lib/constants";

export function ImpactSection() {
  const ref = useRef(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const cardAY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const cardBY = useTransform(scrollYProgress, [0, 1], [80, -20]);

  return (
    <section id="about-scrapq" className="bg-white py-24 lg:py-40 px-6 lg:px-10" ref={ref}>
      <FadeInOnScroll>
        <div className="max-w-[740px] mx-auto text-center mb-16 lg:mb-24">
          <p className="uppercase tracking-[0.15em] text-[#171411] mb-6" style={{ fontFamily: font, fontSize: "13.5px", color: sage }}>
            Impact Created So Far
          </p>
          <p className="text-[#171411]" style={{ fontFamily: font, fontSize: "clamp(24px, 3vw, 38px)", lineHeight: "1.55" }}>
            Driving measurable change across
            <br />
            environment, economy, and society &mdash;
            <br />
            one collection at a time.
          </p>
        </div>
      </FadeInOnScroll>

      <div ref={sectionRef} className="max-w-[1360px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card A */}
        <motion.div style={{ y: cardAY }}>
        <FadeInOnScroll direction="left">
          <motion.div
            whileHover={{ y: -8 }}
            transition={{ duration: 0.4 }}
            className="relative rounded-lg overflow-hidden h-[500px] lg:h-[630px] group"
          >
            <motion.div className="absolute inset-0" whileHover={{ scale: 1.05 }} transition={{ duration: 0.8 }}>
              <ImageWithFallback src={imgDualA} alt="Environmental impact" className="absolute inset-0 w-full h-full object-cover" />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="relative z-10 flex flex-col justify-end h-full p-8">
              <motion.div animate={inView ? { rotate: 360 } : {}} transition={{ duration: 1.5, delay: 0.5 }}>
                <RecycleIconLight size={32} />
              </motion.div>
              <h3 className="text-white uppercase mt-6" style={{ fontFamily: font, fontSize: "clamp(28px, 3vw, 40px)", lineHeight: "1.3", fontWeight: 400 }}>
                6,000+ Tonnes
                <br />arrested at source
                <br />&mdash;
              </h3>
              <p className="text-white mt-3 max-w-[500px]" style={{ fontFamily: font, fontSize: "15px", lineHeight: "1.6" }}>
                500+ tonnes recovered from landfills by rag pickers in Varanasi in just 6 months. 40,000+ tCO2e reduction in carbon footprint through recycling and reuse.
              </p>
            </div>
          </motion.div>
        </FadeInOnScroll>
        </motion.div>

        {/* Card B */}
        <motion.div style={{ y: cardBY }}>
        <FadeInOnScroll direction="right" delay={0.2}>
          <motion.div
            whileHover={{ y: -8 }}
            transition={{ duration: 0.4 }}
            className="relative rounded-lg overflow-hidden h-[500px] lg:h-[630px] group"
          >
            <motion.div className="absolute inset-0" whileHover={{ scale: 1.05 }} transition={{ duration: 0.8 }}>
              <ImageWithFallback src={imgDualB} alt="Social impact" className="absolute inset-0 w-full h-full object-cover" />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="relative z-10 flex flex-col justify-end h-full p-8">
              <motion.div animate={inView ? { rotate: 360 } : {}} transition={{ duration: 1.5, delay: 0.7 }}>
                <RecycleIconLight size={32} />
              </motion.div>
              <h3 className="text-white uppercase mt-6" style={{ fontFamily: font, fontSize: "clamp(28px, 3vw, 40px)", lineHeight: "1.3", fontWeight: 400 }}>
                Rs. 160+ Million
                <br />earned by the
                <br />community
                <br />&mdash;
              </h3>
              <p className="text-white mt-3 max-w-[510px]" style={{ fontFamily: font, fontSize: "15px", lineHeight: "1.6" }}>
                100,000+ households educated on recycling. 400+ jobs created for rag pickers, kabadiwalas, and drivers. 150% increase in agent earnings &mdash; transforming lives.
              </p>
            </div>
          </motion.div>
        </FadeInOnScroll>
        </motion.div>
      </div>
    </section>
  );
}