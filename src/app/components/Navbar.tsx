import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router";
import { MagneticWrap, BookAVisitButton } from "./shared";
import { font, sans, scrapqLogo } from "../lib/constants";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const links = ["About ScrapQ", "Book Appointment", "Our Networks", "Contact"];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-10 lg:px-18 py-4 border-b transition-all duration-500"
        style={{
          backgroundColor: scrolled ? "rgba(123,139,111,0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderColor: scrolled ? "rgba(255,255,255,0.15)" : "transparent",
        }}
      >
        <MagneticWrap strength={0.2}>
          <a href="#" className="flex items-center">
            <img
              src={scrapqLogo}
              alt="ScrapQ"
              className="h-9 sm:h-10 w-auto"
            />
          </a>
        </MagneticWrap>
        <div className="hidden md:flex items-center gap-2">
          {links.map((link, i) => {
            const isBookAppt = link === "Book Appointment";
            return isBookAppt ? (
              <motion.div
                key={link}
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 + i * 0.08 }}
              >
                <Link
                  to="/book-appointment"
                  className="text-white/80 px-3 py-1.5 rounded hover:text-white hover:bg-white/10 transition-all"
                  style={{ fontFamily: sans, fontSize: "13px", letterSpacing: "0.03em" }}
                >
                  {link}
                </Link>
              </motion.div>
            ) : (
              <motion.a
                key={link}
                href={`#${link.toLowerCase().replace(/\s/g, "-")}`}
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 + i * 0.08 }}
                whileHover={{ y: -2 }}
                className="text-white/80 px-3 py-1.5 rounded hover:text-white hover:bg-white/10 transition-all"
                style={{ fontFamily: sans, fontSize: "13px", letterSpacing: "0.03em" }}
              >
                {link}
              </motion.a>
            );
          })}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="ml-4"
          >
            <BookAVisitButton />
          </motion.div>
        </div>
        {/* Mobile */}
        <button className="md:hidden text-white" onClick={() => setOpen(!open)}>
          {open ? "\u2715" : "\u2630"}
        </button>
      </motion.nav>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-[#171411] flex flex-col items-center justify-center gap-6"
          >
            {links.map((l, i) => {
              const isBookAppt = l === "Book Appointment";
              return isBookAppt ? (
                <motion.div
                  key={l}
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    to="/book-appointment"
                    className="text-white text-2xl"
                    style={{ fontFamily: font }}
                    onClick={() => setOpen(false)}
                  >
                    {l}
                  </Link>
                </motion.div>
              ) : (
                <motion.a
                  key={l}
                  href={`#${l.toLowerCase().replace(/\s/g, "-")}`}
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="text-white text-2xl"
                  style={{ fontFamily: font }}
                  onClick={() => setOpen(false)}
                >
                  {l}
                </motion.a>
              );
            })}
            <img
              src={scrapqLogo}
              alt="ScrapQ"
              className="h-12 w-auto mb-4"
            />
            <BookAVisitButton />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}