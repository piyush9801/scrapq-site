import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { FadeInOnScroll } from "./shared";
import { font, sage, testimonials } from "../lib/constants";

export function TestimonialsSection() {
  const [featured, setFeatured] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setFeatured((p) => (p + 1) % testimonials.length), 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="bg-white py-24 lg:py-40 px-6">
      <div className="max-w-[1100px] mx-auto">
        <FadeInOnScroll>
          <p className="uppercase tracking-[0.15em] text-[#171411] mb-4 text-center" style={{ fontFamily: font, fontSize: "13.5px", color: sage }}>
            What Our Customers Say
          </p>
          <p className="text-[#171411] text-center mb-6" style={{ fontFamily: font, fontSize: "clamp(26px, 3.2vw, 42px)", lineHeight: "1.3" }}>
            Trusted by over 100,000 households,
            <br />
            businesses, and industries across India.
          </p>
          <div className="flex justify-center mb-16">
            <div className="w-12 h-[2px] rounded-full" style={{ backgroundColor: sage }} />
          </div>
        </FadeInOnScroll>

        <FadeInOnScroll delay={0.1}>
          <div className="max-w-[780px] mx-auto relative">
            <motion.div
              className="absolute -top-8 left-6 md:left-10 select-none pointer-events-none z-0"
              style={{ fontFamily: font, fontSize: "120px", lineHeight: 1, color: sage, opacity: 0.12 }}
              animate={{ rotate: [0, -3, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              &ldquo;
            </motion.div>

            <div
              className="relative z-10 rounded-2xl overflow-hidden"
              style={{ backgroundColor: "#171411", boxShadow: "0 25px 60px -15px rgba(0,0,0,0.25)" }}
            >
              <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, ${sage}, ${sage}88, ${sage}44)` }} />

              <div className="p-8 md:p-12 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 rounded-full opacity-5" style={{ background: `radial-gradient(circle, ${sage}, transparent 70%)`, filter: "blur(40px)" }} />

                <AnimatePresence mode="wait">
                  <motion.div
                    key={featured}
                    initial={{ opacity: 0, y: 30, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.97 }}
                    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                    className="relative z-10"
                  >
                    <div className="flex gap-1 mb-6">
                      {[...Array(5)].map((_, s) => (
                        <motion.svg
                          key={s}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.1 + s * 0.08, type: "spring", stiffness: 300 }}
                          width="18" height="18" viewBox="0 0 24 24" fill={sage}
                        >
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </motion.svg>
                      ))}
                    </div>

                    <p className="text-white/85 italic mb-8" style={{ fontFamily: font, fontSize: "clamp(17px, 2.2vw, 22px)", lineHeight: 1.7 }}>
                      &ldquo;{testimonials[featured].text}&rdquo;
                    </p>

                    <div className="flex items-center gap-4">
                      <motion.div
                        className="w-12 h-12 rounded-full flex items-center justify-center shrink-0"
                        style={{ backgroundColor: sage }}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                      >
                        <span className="text-white uppercase" style={{ fontFamily: font, fontSize: "16px", letterSpacing: "0.05em" }}>
                          {testimonials[featured].name.split(" ").map(w => w[0]).join("")}
                        </span>
                      </motion.div>
                      <div>
                        <p className="text-white uppercase tracking-wider" style={{ fontFamily: font, fontSize: "14px" }}>
                          {testimonials[featured].name}
                        </p>
                        <p className="text-white/40 mt-0.5" style={{ fontFamily: font, fontSize: "12px", letterSpacing: "0.08em" }}>
                          Verified Customer
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8 px-2">
              <button
                onClick={() => setFeatured((p) => (p - 1 + testimonials.length) % testimonials.length)}
                className="w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 cursor-pointer hover:scale-110"
                style={{ borderColor: "#171411", color: "#171411" }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
              </button>

              <div className="flex items-center gap-3">
                <span className="text-[#171411]/40" style={{ fontFamily: font, fontSize: "13px" }}>
                  {String(featured + 1).padStart(2, "0")}
                </span>
                <div className="flex gap-2">
                  {testimonials.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setFeatured(i)}
                      className="relative cursor-pointer overflow-hidden rounded-full transition-all duration-500"
                      style={{ width: i === featured ? 28 : 8, height: 8, backgroundColor: i === featured ? "transparent" : "#171411", opacity: i === featured ? 1 : 0.15 }}
                    >
                      {i === featured && (
                        <motion.div
                          className="absolute inset-0 rounded-full"
                          style={{ backgroundColor: sage }}
                          layoutId="testimonialDot"
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}
                    </button>
                  ))}
                </div>
                <span className="text-[#171411]/40" style={{ fontFamily: font, fontSize: "13px" }}>
                  {String(testimonials.length).padStart(2, "0")}
                </span>
              </div>

              <button
                onClick={() => setFeatured((p) => (p + 1) % testimonials.length)}
                className="w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 cursor-pointer hover:scale-110"
                style={{ borderColor: "#171411", color: "#171411" }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
              </button>
            </div>

            {/* Auto-rotate progress */}
            <div className="mt-6 mx-auto max-w-[200px] h-[2px] rounded-full overflow-hidden" style={{ backgroundColor: "#171411", opacity: 0.08 }}>
              <motion.div
                key={featured}
                className="h-full rounded-full"
                style={{ backgroundColor: sage }}
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 5, ease: "linear" }}
              />
            </div>
          </div>
        </FadeInOnScroll>
      </div>
    </section>
  );
}