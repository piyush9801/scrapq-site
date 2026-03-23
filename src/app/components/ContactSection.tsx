import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { FadeInOnScroll, MagneticWrap } from "./shared";
import { font, sage } from "../lib/constants";

export function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  return (
    <section id="contact" className="bg-[#171411] py-24 lg:py-40 px-6">
      <div className="max-w-[640px] mx-auto">
        <FadeInOnScroll>
          <p className="uppercase tracking-[0.15em] text-white/50 mb-6 text-center" style={{ fontFamily: font, fontSize: "13.5px" }}>
            Contact Us
          </p>
          <p className="text-white text-center mb-12" style={{ fontFamily: font, fontSize: "clamp(24px, 3vw, 36px)", lineHeight: "1.55" }}>
            Have a question or want to partner with us?
          </p>
        </FadeInOnScroll>

        <FadeInOnScroll delay={0.15}>
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-16"
              >
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", duration: 0.8 }}
                  className="w-16 h-16 rounded-full mx-auto flex items-center justify-center mb-6"
                  style={{ backgroundColor: sage }}
                >
                  <span className="text-white text-2xl">{"\u2713"}</span>
                </motion.div>
                <p className="text-white" style={{ fontFamily: font, fontSize: "24px" }}>
                  Thank you! We'll be in touch soon.
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSubmitted(false)}
                  className="mt-6 text-white/50 underline cursor-pointer"
                  style={{ fontFamily: font, fontSize: "14px" }}
                >
                  Send another message
                </motion.button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                className="space-y-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmitted(true);
                }}
              >
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    { name: "name", type: "text", placeholder: "Name" },
                    { name: "mobile", type: "tel", placeholder: "Mobile Number" },
                  ].map((f) => (
                    <motion.div key={f.name} className="relative" animate={{ scale: focused === f.name ? 1.02 : 1 }} transition={{ duration: 0.2 }}>
                      <input
                        type={f.type}
                        placeholder={f.placeholder}
                        onFocus={() => setFocused(f.name)}
                        onBlur={() => setFocused(null)}
                        className="w-full bg-white/10 border text-white px-4 py-3 rounded-md placeholder:text-white/30 focus:outline-none transition-all duration-300"
                        style={{
                          fontFamily: font,
                          fontSize: "15px",
                          borderColor: focused === f.name ? sage : `${sage}30`,
                          boxShadow: focused === f.name ? `0 0 20px ${sage}20` : "none",
                        }}
                      />
                    </motion.div>
                  ))}
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    { name: "email", type: "email", placeholder: "Email ID" },
                    { name: "org", type: "text", placeholder: "Organization Name" },
                  ].map((f) => (
                    <motion.div key={f.name} className="relative" animate={{ scale: focused === f.name ? 1.02 : 1 }} transition={{ duration: 0.2 }}>
                      <input
                        type={f.type}
                        placeholder={f.placeholder}
                        onFocus={() => setFocused(f.name)}
                        onBlur={() => setFocused(null)}
                        className="w-full bg-white/10 border text-white px-4 py-3 rounded-md placeholder:text-white/30 focus:outline-none transition-all duration-300"
                        style={{
                          fontFamily: font,
                          fontSize: "15px",
                          borderColor: focused === f.name ? sage : `${sage}30`,
                          boxShadow: focused === f.name ? `0 0 20px ${sage}20` : "none",
                        }}
                      />
                    </motion.div>
                  ))}
                </div>
                {/* Inquiry Type Dropdown */}
                <motion.div
                  className="relative"
                  animate={{ scale: focused === "inquiry" ? 1.02 : 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <select
                    defaultValue=""
                    onFocus={() => setFocused("inquiry")}
                    onBlur={() => setFocused(null)}
                    className="w-full bg-white/10 border text-white px-4 py-3 rounded-md focus:outline-none transition-all duration-300 appearance-none cursor-pointer"
                    style={{
                      fontFamily: font,
                      fontSize: "15px",
                      borderColor: focused === "inquiry" ? sage : `${sage}30`,
                      boxShadow: focused === "inquiry" ? `0 0 20px ${sage}20` : "none",
                    }}
                  >
                    <option value="" disabled className="bg-[#171411] text-white/30">
                      Select Inquiry Type
                    </option>
                    <option value="recycling" className="bg-[#171411]">Recycling Services</option>
                    <option value="partnership" className="bg-[#171411]">Partnership / Collaboration</option>
                    <option value="corporate" className="bg-[#171411]">Corporate Solutions</option>
                    <option value="epr" className="bg-[#171411]">EPR Compliance</option>
                    <option value="ewaste" className="bg-[#171411]">E-Waste Collection</option>
                    <option value="other" className="bg-[#171411]">Other</option>
                  </select>
                  {/* Custom dropdown arrow */}
                  <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2.5 4.5L6 8L9.5 4.5" stroke={focused === "inquiry" ? sage : "rgba(255,255,255,0.3)"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </motion.div>

                <MagneticWrap strength={0.1}>
                  <motion.button
                    whileHover={{ scale: 1.02, boxShadow: `0 0 30px ${sage}40` }}
                    whileTap={{ scale: 0.97 }}
                    type="submit"
                    className="w-full text-white py-3 rounded-md hover:opacity-90 transition-colors cursor-pointer"
                    style={{ fontFamily: font, fontSize: "16px", backgroundColor: sage }}
                  >
                    Submit
                  </motion.button>
                </MagneticWrap>
              </motion.form>
            )}
          </AnimatePresence>
        </FadeInOnScroll>
      </div>
    </section>
  );
}