import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "motion/react";
import { Link } from "react-router";
import { MapPin, Phone, Mail, ArrowUpRight } from "lucide-react";
import { FadeInOnScroll, MagneticWrap, BookAVisitButton } from "./shared";
import { font, sans, sage, scrapqLogo } from "../lib/constants";
import awardTrophy from "@/assets/award-trophy.png";
import awardTelangana from "@/assets/award-telangana.png";
import awardIso14001 from "@/assets/award-iso-14001.png";
import awardIso9001 from "@/assets/award-iso-9001.png";

const awards = [
  { src: awardTrophy, alt: "Award Winner", label: "Award Winner" },
  { src: awardTelangana, alt: "Telangana State Recognition", label: "Telangana State" },
  { src: awardIso14001, alt: "ISO 14001 Environmental Certified", label: "ISO 14001" },
  { src: awardIso9001, alt: "ISO 9001:2015 Certified", label: "ISO 9001:2015" },
];

export function FooterSection() {
  const ref = useRef(null);
  const footerScrollRef = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const { scrollYProgress: footerProgress } = useScroll({
    target: footerScrollRef,
    offset: ["start end", "end end"],
  });
  const bigTextX = useTransform(footerProgress, [0, 1], [120, 0]);
  const bigTextOpacity = useTransform(footerProgress, [0, 0.5, 1], [0, 0.3, 1]);

  const quickLinks = [
    { label: "About ScrapQ", href: "#about-scrapq" },
    { label: "Book Appointment", href: "/book-appointment", isRoute: true },
    { label: "Our Networks", href: "#our-networks" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <section ref={ref} className="bg-white overflow-hidden">
      {/* CTA banner */}
      <div className="px-4 sm:px-6 lg:px-20 pt-16 sm:pt-20 lg:pt-28">
        <div className="max-w-[1360px] mx-auto">
          <FadeInOnScroll>
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-[#171411] p-6 sm:p-10 lg:p-14">
              <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-10 pointer-events-none" style={{ background: `radial-gradient(circle, ${sage}, transparent 70%)`, filter: "blur(60px)" }} />
              <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full opacity-8 pointer-events-none" style={{ background: `radial-gradient(circle, ${sage}, transparent 70%)`, filter: "blur(50px)" }} />

              <div className="relative z-10">
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={inView ? { scale: 1, rotate: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2, type: "spring" }}
                  className="mb-5"
                >
                  <img
                    src={scrapqLogo}
                    alt="ScrapQ"
                    className="h-10 w-auto"
                  />
                </motion.div>
                <p className="text-white max-w-[600px]" style={{ fontFamily: font, fontSize: "clamp(20px, 2.5vw, 30px)", lineHeight: "1.5" }}>
                  Whether you're looking to recycle, reduce waste, or simply make a difference &mdash; ScrapQ is here.
                </p>
                <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <BookAVisitButton />
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors"
                    style={{ fontFamily: font, fontSize: "14px", letterSpacing: "0.04em" }}
                  >
                    Or send us a message <ArrowUpRight size={14} />
                  </a>
                </div>
              </div>
            </div>
          </FadeInOnScroll>
        </div>
      </div>

      {/* Contact info grid */}
      <div className="px-4 sm:px-6 lg:px-20 pt-10 sm:pt-14 lg:pt-16">
        <div className="max-w-[1360px] mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-6 lg:gap-10">
            <FadeInOnScroll delay={0.05}>
              <div>
                <p className="uppercase tracking-[0.15em] mb-4" style={{ fontFamily: sans, fontSize: "11px", color: sage, fontWeight: 600 }}>
                  Quick Links
                </p>
                <div className="flex flex-col gap-2.5">
                  {quickLinks.map((link) => {
                    return link.isRoute ? (
                      <motion.div key={link.label} whileHover={{ x: 4 }}>
                        <Link
                          to={link.href}
                          className="text-[#171411]/70 hover:text-[#171411] transition-colors inline-flex items-center gap-1.5 w-fit"
                          style={{ fontFamily: font, fontSize: "15px" }}
                        >
                          {link.label}
                        </Link>
                      </motion.div>
                    ) : (
                      <motion.a
                        key={link.label}
                        href={link.href}
                        whileHover={{ x: 4 }}
                        className="text-[#171411]/70 hover:text-[#171411] transition-colors inline-flex items-center gap-1.5 w-fit"
                        style={{ fontFamily: font, fontSize: "15px" }}
                      >
                        {link.label}
                      </motion.a>
                    );
                  })}
                </div>
              </div>
            </FadeInOnScroll>

            <FadeInOnScroll delay={0.1}>
              <div>
                <p className="uppercase tracking-[0.15em] mb-4" style={{ fontFamily: sans, fontSize: "11px", color: sage, fontWeight: 600 }}>
                  Corporate Office
                </p>
                <div className="flex gap-3">
                  <MapPin size={16} className="text-[#171411]/30 flex-none mt-1" />
                  <div className="text-[#171411]/70" style={{ fontFamily: font, fontSize: "14px", lineHeight: "1.7" }}>
                    <p className="text-[#171411]" style={{ fontSize: "15px" }}>SCRAPQ HUB PVT LTD</p>
                    <p>6-3-1090/A/10/1/2, Office 504</p>
                    <p>Somajiguda, Hyderabad &mdash; 500082</p>
                  </div>
                </div>
              </div>
            </FadeInOnScroll>

            <FadeInOnScroll delay={0.15}>
              <div>
                <p className="uppercase tracking-[0.15em] mb-4" style={{ fontFamily: sans, fontSize: "11px", color: sage, fontWeight: 600 }}>
                  Get In Touch
                </p>
                <div className="space-y-3">
                  <a href="tel:+919030727277" className="flex items-center gap-3 text-[#171411] hover:opacity-70 transition-opacity group">
                    <span className="w-9 h-9 rounded-full flex items-center justify-center flex-none group-hover:scale-105 transition-transform" style={{ backgroundColor: `${sage}18` }}>
                      <Phone size={14} style={{ color: sage }} />
                    </span>
                    <span style={{ fontFamily: font, fontSize: "15px" }}>+91 903 072 7277</span>
                  </a>
                  <a href="mailto:support@scrapq.com" className="flex items-center gap-3 text-[#171411]/70 hover:text-[#171411] transition-colors group">
                    <span className="w-9 h-9 rounded-full flex items-center justify-center flex-none group-hover:scale-105 transition-transform" style={{ backgroundColor: `${sage}18` }}>
                      <Mail size={14} style={{ color: sage }} />
                    </span>
                    <span style={{ fontFamily: font, fontSize: "14px" }}>support@scrapq.com</span>
                  </a>
                </div>
              </div>
            </FadeInOnScroll>

            <FadeInOnScroll delay={0.2}>
              <div>
                <p className="uppercase tracking-[0.15em] mb-4" style={{ fontFamily: sans, fontSize: "11px", color: sage, fontWeight: 600 }}>
                  Download the App
                </p>
                <p className="text-[#171411]/60 mb-4" style={{ fontFamily: font, fontSize: "13.5px", lineHeight: 1.6 }}>
                  Schedule pickups, track earnings, and recycle on-the-go.
                </p>
                <div className="flex gap-2">
                  <motion.a
                    href="#"
                    whileHover={{ y: -2, scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#171411] text-white cursor-pointer"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/></svg>
                    <div>
                      <span style={{ fontFamily: sans, fontSize: "8px", opacity: 0.7, display: "block", lineHeight: 1 }}>Download on</span>
                      <span style={{ fontFamily: sans, fontSize: "12px", fontWeight: 600, lineHeight: 1.2 }}>App Store</span>
                    </div>
                  </motion.a>
                  <motion.a
                    href="#"
                    whileHover={{ y: -2, scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#171411] text-white cursor-pointer"
                  >
                    <svg width="14" height="16" viewBox="0 0 16 18" fill="currentColor"><path d="M1.22 0L9.05 8.3l-7.83 8.3c-.16-.1-.28-.3-.28-.57V.57c0-.27.12-.47.28-.57zm.98-.57l8.8 4.95-2.18 2.31L2.2-.57zm0 17.14l6.62-7.02 2.18 2.31-8.8 4.95v-.24zm10.12-5.97L14.75 9l-2.43-1.6-2.36 2.5 2.36 2.5z"/></svg>
                    <div>
                      <span style={{ fontFamily: sans, fontSize: "8px", opacity: 0.7, display: "block", lineHeight: 1 }}>Get it on</span>
                      <span style={{ fontFamily: sans, fontSize: "12px", fontWeight: 600, lineHeight: 1.2 }}>Google Play</span>
                    </div>
                  </motion.a>
                </div>
              </div>
            </FadeInOnScroll>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="px-4 sm:px-6 lg:px-20 mt-10 sm:mt-14">
        <div className="max-w-[1360px] mx-auto">
          <div className="h-[1px]" style={{ background: `linear-gradient(90deg, transparent, ${sage}30, ${sage}15, transparent)` }} />
        </div>
      </div>

      {/* Awards & Certifications */}
      <div className="px-4 sm:px-6 lg:px-20 pt-8 sm:pt-10">
        <div className="max-w-[1360px] mx-auto">
          <FadeInOnScroll delay={0.1}>
            <p
              className="uppercase tracking-[0.15em] mb-6 text-center"
              style={{ fontFamily: sans, fontSize: "11px", color: sage, fontWeight: 600 }}
            >
              Awards & Certifications
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 lg:gap-14">
              {awards.map((award, i) => (
                <motion.div
                  key={award.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                  whileHover={{ y: -4, scale: 1.05 }}
                  className="flex flex-col items-center gap-2 group cursor-default"
                >
                  <div
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl flex items-center justify-center p-2 transition-shadow duration-300 group-hover:shadow-md"
                    style={{ backgroundColor: `${sage}08`, border: `1px solid ${sage}15` }}
                  >
                    <img
                      src={award.src}
                      alt={award.alt}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <span
                    className="text-[#171411]/40 group-hover:text-[#171411]/60 transition-colors text-center"
                    style={{ fontFamily: font, fontSize: "11px" }}
                  >
                    {award.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </FadeInOnScroll>
        </div>
      </div>

      {/* Divider 2 */}
      <div className="px-4 sm:px-6 lg:px-20 mt-8 sm:mt-10">
        <div className="max-w-[1360px] mx-auto">
          <div className="h-[1px]" style={{ background: `linear-gradient(90deg, transparent, ${sage}30, ${sage}15, transparent)` }} />
        </div>
      </div>

      {/* Bottom wordmark + copyright */}
      <div className="px-4 sm:px-6 lg:px-20 pt-8 sm:pt-10 pb-10 sm:pb-14 lg:pb-16">
        <div className="max-w-[1360px] mx-auto">
          <motion.div
            ref={footerScrollRef}
            style={{ x: bigTextX, opacity: bigTextOpacity }}
            className="flex items-end justify-between"
          >
            <MagneticWrap strength={0.05}>
              <img
                src={scrapqLogo}
                alt="ScrapQ"
                className="w-auto"
                style={{ height: "clamp(60px, 14vw, 180px)" }}
              />
            </MagneticWrap>
          </motion.div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-6 sm:mt-8">
            <p className="text-[#171411]/40" style={{ fontFamily: font, fontSize: "13px" }}>
              &copy; 2020&ndash;2026 ScrapQ Hub Pvt Ltd. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              {["Privacy", "Terms", "Sitemap"].map((t) => (
                <a key={t} href="#" className="text-[#171411]/35 hover:text-[#171411]/60 transition-colors" style={{ fontFamily: sans, fontSize: "12px" }}>
                  {t}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}