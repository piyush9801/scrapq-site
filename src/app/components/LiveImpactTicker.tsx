import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { useCountUp } from "./shared";
import { font, sans, sage } from "../lib/constants";

export function LiveImpactTicker() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const tonnes = useCountUp(6000, 2500, inView);
  const households = useCountUp(100000, 3000, inView);
  const co2 = useCountUp(40000, 2800, inView);
  const jobs = useCountUp(400, 2000, inView);

  const stats = [
    { value: tonnes, suffix: "+", label: "Tonnes Recovered" },
    { value: households, suffix: "+", label: "Households Served" },
    { value: co2, suffix: "+", label: "tCO2e Reduced" },
    { value: jobs, suffix: "+", label: "Jobs Created" },
  ];

  return (
    <section ref={ref} className="bg-[#171411] py-6 overflow-hidden border-y border-white/5">
      <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ y: 20, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: i * 0.15 }}
            className="text-center"
          >
            <div className="flex items-baseline justify-center gap-0.5">
              <span className="text-white tabular-nums" style={{ fontFamily: font, fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 300 }}>
                {s.value.toLocaleString()}
              </span>
              <span style={{ fontFamily: font, fontSize: "20px", color: sage }}>{s.suffix}</span>
            </div>
            <p className="text-white/40 mt-1" style={{ fontFamily: sans, fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase" }}>
              {s.label}
            </p>
            <motion.div
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
              className="w-1.5 h-1.5 rounded-full mx-auto mt-2"
              style={{ backgroundColor: sage }}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}