import { useState, useRef, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";
import { Link } from "react-router";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { MagneticWrap } from "../components/shared";
import { font, sans, sage, scrapqLogo } from "../lib/constants";
import {
  ArrowLeft,
  CalendarDays,
  Clock,
  MapPin,
  Phone,
  User,
  Mail,
  Building2,
  Package,
  CheckCircle2,
  Recycle,
  ChevronDown,
  Truck,
  Scale,
  Banknote,
} from "lucide-react";

/* ─── Data ─── */
const serviceTypes = [
  { id: "household", label: "Household Pickup", icon: Package, desc: "Newspapers, plastics, metals, glass & more" },
  { id: "corporate", label: "Corporate / Office", icon: Building2, desc: "Bulk recycling for businesses & offices" },
  { id: "industrial", label: "Industrial Scrap", icon: Scale, desc: "Factory & manufacturing waste collection" },
  { id: "ewaste", label: "E-Waste Disposal", icon: Recycle, desc: "Electronics, appliances & circuit boards" },
];

const timeSlots = [
  "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
  "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM",
];

const cities = [
  "Hyderabad", "Bangalore", "Chennai", "Mumbai", "Delhi NCR", "Pune", "Kolkata", "Ahmedabad",
];

const processSteps = [
  { icon: CalendarDays, title: "Book", desc: "Choose your date & time" },
  { icon: Truck, title: "We Arrive", desc: "Our team comes to you" },
  { icon: Scale, title: "Weigh & Sort", desc: "Precise digital weighing" },
  { icon: Banknote, title: "Get Paid", desc: "Instant on-spot payment" },
];

/* ─── Main Page ─── */
export default function BookAppointmentPage() {
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", address: "", notes: "" });
  const [submitted, setSubmitted] = useState(false);
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });

  // Scroll to top on mount
  useEffect(() => { window.scrollTo(0, 0); }, []);

  // Generate next 14 days
  const dates = Array.from({ length: 14 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i + 1);
    return d;
  });

  const canProceedStep1 = !!selectedService;
  const canProceedStep2 = !!selectedDate && !!selectedTime && !!selectedCity;
  const canSubmit = formData.name && formData.phone && formData.address;

  const handleSubmit = () => {
    setSubmitted(true);
  };

  return (
    <div className="relative min-h-screen bg-white">
      {/* ─── Sticky Navbar ─── */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 lg:px-14 py-3.5 border-b"
        style={{ backgroundColor: "rgba(255,255,255,0.92)", backdropFilter: "blur(14px)", borderColor: "rgba(23,20,17,0.08)" }}
      >
        <MagneticWrap strength={0.2}>
          <Link to="/" className="flex items-center">
            <img src={scrapqLogo} alt="ScrapQ" className="h-8 sm:h-9 w-auto" />
          </Link>
        </MagneticWrap>
        <Link
          to="/"
          className="flex items-center gap-2 text-[#171411]/60 hover:text-[#171411] transition-colors"
          style={{ fontFamily: sans, fontSize: "13.5px" }}
        >
          <ArrowLeft size={15} />
          <span>Back to Home</span>
        </Link>
      </nav>

      {/* ─── Hero Banner ─── */}
      <div ref={heroRef} className="relative pt-[70px]">
        <div className="relative h-[340px] lg:h-[420px] overflow-hidden">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1558957543-ab3e457707a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWN5Y2xpbmclMjB3b3JrZXIlMjBncmVlbiUyMHVuaWZvcm0lMjBwaWNrdXAlMjB0cnVja3xlbnwxfHx8fDE3NzI4MDM2MDR8MA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="ScrapQ collection team"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#171411]/50 via-[#171411]/40 to-[#171411]/70" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={heroInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center gap-2 mb-5 border border-white/20 rounded-full px-4 py-1.5 backdrop-blur-sm bg-white/5"
            >
              <CalendarDays size={13} className="text-white/70" />
              <span className="uppercase tracking-[0.2em] text-white/70" style={{ fontFamily: font, fontSize: "11px" }}>
                Schedule a Pickup
              </span>
            </motion.div>
            <motion.h1
              initial={{ y: 40, opacity: 0 }}
              animate={heroInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="text-white"
              style={{ fontFamily: font, fontSize: "clamp(28px, 4vw, 52px)", lineHeight: 1.2 }}
            >
              Book Your Appointment
            </motion.h1>
            <motion.p
              initial={{ y: 30, opacity: 0 }}
              animate={heroInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-white/65 mt-3 max-w-[520px]"
              style={{ fontFamily: font, fontSize: "clamp(14px, 1.5vw, 18px)", lineHeight: 1.6 }}
            >
              We come to your doorstep. Choose a service, pick a time, and we'll handle the rest.
            </motion.p>
          </div>
        </div>
      </div>

      {/* ─── Process Steps Mini Bar ─── */}
      <div className="border-b" style={{ borderColor: "rgba(23,20,17,0.06)" }}>
        <div className="max-w-[960px] mx-auto px-6 py-5">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {processSteps.map((ps, i) => (
              <motion.div
                key={ps.title}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                className="flex items-center gap-3"
              >
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${sage}15` }}
                >
                  <ps.icon size={16} style={{ color: sage }} />
                </div>
                <div>
                  <p className="text-[#171411]" style={{ fontFamily: font, fontSize: "13.5px" }}>{ps.title}</p>
                  <p className="text-[#171411]/40" style={{ fontFamily: sans, fontSize: "11.5px" }}>{ps.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ─── Main Form Area ─── */}
      <div className="max-w-[960px] mx-auto px-6 py-12 lg:py-16">
        {!submitted ? (
          <>
            {/* Step Indicator */}
            <div className="flex items-center justify-center gap-3 mb-12">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center gap-3">
                  <motion.button
                    onClick={() => {
                      if (s < step) setStep(s);
                    }}
                    animate={{ scale: step === s ? 1 : 0.9 }}
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                      step === s
                        ? "text-white"
                        : step > s
                        ? "text-white"
                        : "text-[#171411]/30 border border-[#171411]/10"
                    }`}
                    style={{
                      backgroundColor: step === s ? sage : step > s ? `${sage}90` : "transparent",
                      fontFamily: font,
                      fontSize: "14px",
                    }}
                  >
                    {step > s ? <CheckCircle2 size={18} /> : s}
                  </motion.button>
                  {s < 3 && (
                    <div className="w-16 lg:w-24 h-px" style={{ backgroundColor: step > s ? sage : "rgba(23,20,17,0.1)" }} />
                  )}
                </div>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {/* ─── STEP 1: Select Service ─── */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="text-center mb-10">
                    <p className="uppercase tracking-[0.15em] mb-2" style={{ fontFamily: font, fontSize: "12px", color: sage }}>
                      Step 1 of 3
                    </p>
                    <h2 className="text-[#171411]" style={{ fontFamily: font, fontSize: "clamp(22px, 2.5vw, 32px)" }}>
                      What would you like to recycle?
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-[700px] mx-auto">
                    {serviceTypes.map((svc) => {
                      const active = selectedService === svc.id;
                      return (
                        <motion.button
                          key={svc.id}
                          onClick={() => setSelectedService(svc.id)}
                          whileHover={{ y: -3 }}
                          whileTap={{ scale: 0.98 }}
                          className={`relative p-5 lg:p-6 rounded-xl text-left transition-all cursor-pointer ${
                            active ? "ring-2" : "hover:bg-[#faf8f5]"
                          }`}
                          style={{
                            border: `1px solid ${active ? sage : "rgba(23,20,17,0.08)"}`,
                            ringColor: active ? sage : "transparent",
                            backgroundColor: active ? `${sage}08` : "white",
                          }}
                        >
                          <div className="flex items-start gap-4">
                            <div
                              className="w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0"
                              style={{ backgroundColor: active ? `${sage}20` : "rgba(23,20,17,0.04)" }}
                            >
                              <svc.icon size={20} style={{ color: active ? sage : "#171411" }} strokeWidth={1.5} />
                            </div>
                            <div>
                              <p className="text-[#171411] mb-0.5" style={{ fontFamily: font, fontSize: "16px" }}>
                                {svc.label}
                              </p>
                              <p className="text-[#171411]/45" style={{ fontFamily: sans, fontSize: "13px", lineHeight: 1.5 }}>
                                {svc.desc}
                              </p>
                            </div>
                          </div>
                          {active && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="absolute top-3 right-3"
                            >
                              <CheckCircle2 size={18} style={{ color: sage }} />
                            </motion.div>
                          )}
                        </motion.button>
                      );
                    })}
                  </div>

                  <div className="flex justify-center mt-10">
                    <motion.button
                      onClick={() => canProceedStep1 && setStep(2)}
                      whileHover={canProceedStep1 ? { scale: 1.03 } : {}}
                      whileTap={canProceedStep1 ? { scale: 0.97 } : {}}
                      className="px-8 py-3 rounded-lg text-white transition-all cursor-pointer"
                      style={{
                        fontFamily: font,
                        fontSize: "15px",
                        letterSpacing: "0.03em",
                        backgroundColor: canProceedStep1 ? sage : "#ccc",
                      }}
                    >
                      Continue to Scheduling
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {/* ─── STEP 2: Date, Time, City ─── */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="text-center mb-10">
                    <p className="uppercase tracking-[0.15em] mb-2" style={{ fontFamily: font, fontSize: "12px", color: sage }}>
                      Step 2 of 3
                    </p>
                    <h2 className="text-[#171411]" style={{ fontFamily: font, fontSize: "clamp(22px, 2.5vw, 32px)" }}>
                      Choose your date & time
                    </h2>
                  </div>

                  <div className="max-w-[700px] mx-auto space-y-8">
                    {/* City selector */}
                    <div>
                      <label className="block mb-3 uppercase tracking-[0.12em]" style={{ fontFamily: font, fontSize: "11.5px", color: sage }}>
                        <MapPin size={13} className="inline mr-1.5 -mt-0.5" /> Select City
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {cities.map((city) => (
                          <motion.button
                            key={city}
                            onClick={() => setSelectedCity(city)}
                            whileHover={{ y: -1 }}
                            whileTap={{ scale: 0.97 }}
                            className="px-4 py-2 rounded-full transition-all cursor-pointer"
                            style={{
                              fontFamily: font,
                              fontSize: "13.5px",
                              border: `1px solid ${selectedCity === city ? sage : "rgba(23,20,17,0.1)"}`,
                              backgroundColor: selectedCity === city ? `${sage}12` : "transparent",
                              color: selectedCity === city ? sage : "#171411",
                            }}
                          >
                            {city}
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    {/* Date picker */}
                    <div>
                      <label className="block mb-3 uppercase tracking-[0.12em]" style={{ fontFamily: font, fontSize: "11.5px", color: sage }}>
                        <CalendarDays size={13} className="inline mr-1.5 -mt-0.5" /> Select Date
                      </label>
                      <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1 scrollbar-hide">
                        {dates.map((d) => {
                          const key = d.toISOString().split("T")[0];
                          const isActive = selectedDate === key;
                          const dayName = d.toLocaleDateString("en-IN", { weekday: "short" });
                          const dayNum = d.getDate();
                          const month = d.toLocaleDateString("en-IN", { month: "short" });
                          return (
                            <motion.button
                              key={key}
                              onClick={() => setSelectedDate(key)}
                              whileHover={{ y: -2 }}
                              whileTap={{ scale: 0.96 }}
                              className="flex-shrink-0 w-[72px] py-3 rounded-xl text-center transition-all cursor-pointer"
                              style={{
                                border: `1px solid ${isActive ? sage : "rgba(23,20,17,0.08)"}`,
                                backgroundColor: isActive ? sage : "transparent",
                              }}
                            >
                              <p style={{ fontFamily: sans, fontSize: "10.5px", color: isActive ? "rgba(255,255,255,0.7)" : "rgba(23,20,17,0.4)" }}>
                                {dayName}
                              </p>
                              <p className="my-0.5" style={{ fontFamily: font, fontSize: "20px", color: isActive ? "white" : "#171411" }}>
                                {dayNum}
                              </p>
                              <p style={{ fontFamily: sans, fontSize: "10px", color: isActive ? "rgba(255,255,255,0.6)" : "rgba(23,20,17,0.35)" }}>
                                {month}
                              </p>
                            </motion.button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Time slots */}
                    <div>
                      <label className="block mb-3 uppercase tracking-[0.12em]" style={{ fontFamily: font, fontSize: "11.5px", color: sage }}>
                        <Clock size={13} className="inline mr-1.5 -mt-0.5" /> Select Time Slot
                      </label>
                      <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                        {timeSlots.map((t) => {
                          const isActive = selectedTime === t;
                          return (
                            <motion.button
                              key={t}
                              onClick={() => setSelectedTime(t)}
                              whileHover={{ y: -1 }}
                              whileTap={{ scale: 0.97 }}
                              className="py-2.5 rounded-lg text-center transition-all cursor-pointer"
                              style={{
                                fontFamily: font,
                                fontSize: "13px",
                                border: `1px solid ${isActive ? sage : "rgba(23,20,17,0.08)"}`,
                                backgroundColor: isActive ? `${sage}12` : "transparent",
                                color: isActive ? sage : "#171411",
                              }}
                            >
                              {t}
                            </motion.button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-center gap-3 mt-10">
                    <motion.button
                      onClick={() => setStep(1)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      className="px-6 py-3 rounded-lg border transition-all cursor-pointer"
                      style={{ fontFamily: font, fontSize: "14px", borderColor: "rgba(23,20,17,0.12)", color: "#171411" }}
                    >
                      Back
                    </motion.button>
                    <motion.button
                      onClick={() => canProceedStep2 && setStep(3)}
                      whileHover={canProceedStep2 ? { scale: 1.03 } : {}}
                      whileTap={canProceedStep2 ? { scale: 0.97 } : {}}
                      className="px-8 py-3 rounded-lg text-white transition-all cursor-pointer"
                      style={{
                        fontFamily: font,
                        fontSize: "15px",
                        letterSpacing: "0.03em",
                        backgroundColor: canProceedStep2 ? sage : "#ccc",
                      }}
                    >
                      Continue to Details
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {/* ─── STEP 3: Contact Details ─── */}
              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="text-center mb-10">
                    <p className="uppercase tracking-[0.15em] mb-2" style={{ fontFamily: font, fontSize: "12px", color: sage }}>
                      Step 3 of 3
                    </p>
                    <h2 className="text-[#171411]" style={{ fontFamily: font, fontSize: "clamp(22px, 2.5vw, 32px)" }}>
                      Your details
                    </h2>
                  </div>

                  <div className="max-w-[600px] mx-auto">
                    {/* Summary card */}
                    <div
                      className="rounded-xl p-5 mb-8"
                      style={{ backgroundColor: `${sage}08`, border: `1px solid ${sage}20` }}
                    >
                      <p className="uppercase tracking-[0.12em] mb-3" style={{ fontFamily: font, fontSize: "11px", color: sage }}>
                        Appointment Summary
                      </p>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="flex items-center gap-2">
                          <Package size={14} style={{ color: sage }} />
                          <span className="text-[#171411]/70" style={{ fontFamily: sans, fontSize: "13px" }}>
                            {serviceTypes.find((s) => s.id === selectedService)?.label}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin size={14} style={{ color: sage }} />
                          <span className="text-[#171411]/70" style={{ fontFamily: sans, fontSize: "13px" }}>{selectedCity}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CalendarDays size={14} style={{ color: sage }} />
                          <span className="text-[#171411]/70" style={{ fontFamily: sans, fontSize: "13px" }}>
                            {selectedDate && new Date(selectedDate).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock size={14} style={{ color: sage }} />
                          <span className="text-[#171411]/70" style={{ fontFamily: sans, fontSize: "13px" }}>{selectedTime}</span>
                        </div>
                      </div>
                    </div>

                    {/* Form fields */}
                    <div className="space-y-4">
                      {[
                        { key: "name", label: "Full Name", icon: User, type: "text", placeholder: "Enter your full name", required: true },
                        { key: "phone", label: "Phone Number", icon: Phone, type: "tel", placeholder: "+91 XXXXX XXXXX", required: true },
                        { key: "email", label: "Email (optional)", icon: Mail, type: "email", placeholder: "your@email.com", required: false },
                        { key: "address", label: "Pickup Address", icon: MapPin, type: "text", placeholder: "Full address with landmark", required: true },
                      ].map((field) => (
                        <div key={field.key}>
                          <label className="flex items-center gap-1.5 mb-2" style={{ fontFamily: font, fontSize: "13px", color: "#171411" }}>
                            <field.icon size={13} style={{ color: sage }} />
                            {field.label}
                            {field.required && <span style={{ color: sage }}>*</span>}
                          </label>
                          <input
                            type={field.type}
                            placeholder={field.placeholder}
                            value={(formData as any)[field.key]}
                            onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                            className="w-full px-4 py-3 rounded-lg outline-none transition-all focus:ring-2"
                            style={{
                              fontFamily: sans,
                              fontSize: "14px",
                              border: "1px solid rgba(23,20,17,0.1)",
                              backgroundColor: "rgba(23,20,17,0.015)",
                              // @ts-ignore
                              "--tw-ring-color": sage,
                            }}
                          />
                        </div>
                      ))}

                      <div>
                        <label className="flex items-center gap-1.5 mb-2" style={{ fontFamily: font, fontSize: "13px", color: "#171411" }}>
                          Additional Notes
                        </label>
                        <textarea
                          rows={3}
                          placeholder="Approximate quantity, special instructions, etc."
                          value={formData.notes}
                          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                          className="w-full px-4 py-3 rounded-lg outline-none transition-all focus:ring-2 resize-none"
                          style={{
                            fontFamily: sans,
                            fontSize: "14px",
                            border: "1px solid rgba(23,20,17,0.1)",
                            backgroundColor: "rgba(23,20,17,0.015)",
                          }}
                        />
                      </div>
                    </div>

                    <div className="flex justify-center gap-3 mt-10">
                      <motion.button
                        onClick={() => setStep(2)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.97 }}
                        className="px-6 py-3 rounded-lg border transition-all cursor-pointer"
                        style={{ fontFamily: font, fontSize: "14px", borderColor: "rgba(23,20,17,0.12)", color: "#171411" }}
                      >
                        Back
                      </motion.button>
                      <motion.button
                        onClick={() => canSubmit && handleSubmit()}
                        whileHover={canSubmit ? { scale: 1.03 } : {}}
                        whileTap={canSubmit ? { scale: 0.97 } : {}}
                        className="px-8 py-3 rounded-lg text-white transition-all cursor-pointer"
                        style={{
                          fontFamily: font,
                          fontSize: "15px",
                          letterSpacing: "0.03em",
                          backgroundColor: canSubmit ? sage : "#ccc",
                        }}
                      >
                        Confirm Appointment
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        ) : (
          /* ─── Success State ─── */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center py-10 lg:py-16"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2, type: "spring" }}
              className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center"
              style={{ backgroundColor: `${sage}15` }}
            >
              <CheckCircle2 size={40} style={{ color: sage }} />
            </motion.div>
            <h2 className="text-[#171411] mb-3" style={{ fontFamily: font, fontSize: "clamp(24px, 3vw, 36px)" }}>
              Appointment Confirmed!
            </h2>
            <p className="text-[#171411]/55 max-w-[440px] mx-auto mb-3" style={{ fontFamily: font, fontSize: "16px", lineHeight: 1.6 }}>
              Thank you, {formData.name}! Our recycling team will be at your doorstep on the scheduled date and time.
            </p>

            {/* Summary */}
            <div
              className="max-w-[400px] mx-auto rounded-xl p-5 mt-8 mb-8 text-left"
              style={{ backgroundColor: `${sage}08`, border: `1px solid ${sage}20` }}
            >
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Package size={15} style={{ color: sage }} />
                  <span className="text-[#171411]/70" style={{ fontFamily: sans, fontSize: "14px" }}>
                    {serviceTypes.find((s) => s.id === selectedService)?.label}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin size={15} style={{ color: sage }} />
                  <span className="text-[#171411]/70" style={{ fontFamily: sans, fontSize: "14px" }}>{selectedCity}</span>
                </div>
                <div className="flex items-center gap-3">
                  <CalendarDays size={15} style={{ color: sage }} />
                  <span className="text-[#171411]/70" style={{ fontFamily: sans, fontSize: "14px" }}>
                    {selectedDate && new Date(selectedDate).toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" })}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock size={15} style={{ color: sage }} />
                  <span className="text-[#171411]/70" style={{ fontFamily: sans, fontSize: "14px" }}>{selectedTime}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone size={15} style={{ color: sage }} />
                  <span className="text-[#171411]/70" style={{ fontFamily: sans, fontSize: "14px" }}>{formData.phone}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                to="/"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-white transition-all hover:opacity-90"
                style={{ fontFamily: font, fontSize: "14px", backgroundColor: sage }}
              >
                <ArrowLeft size={15} />
                Back to Homepage
              </Link>
              <a
                href="tel:+919030727277"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border transition-all hover:bg-[#faf8f5]"
                style={{ fontFamily: font, fontSize: "14px", borderColor: "rgba(23,20,17,0.1)", color: "#171411" }}
              >
                <Phone size={14} />
                Call Us: 903 072 7277
              </a>
            </div>
          </motion.div>
        )}
      </div>

      {/* ─── Footer strip ─── */}
      <div className="border-t mt-8" style={{ borderColor: "rgba(23,20,17,0.06)" }}>
        <div className="max-w-[960px] mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[#171411]/35" style={{ fontFamily: font, fontSize: "12.5px" }}>
            &copy; 2020&ndash;2026 ScrapQ Hub Pvt Ltd
          </p>
          <div className="flex items-center gap-2 text-[#171411]/40" style={{ fontFamily: sans, fontSize: "12px" }}>
            <Phone size={12} />
            <span>+91 903 072 7277</span>
            <span className="mx-1">&middot;</span>
            <Mail size={12} />
            <span>support@scrapq.com</span>
          </div>
        </div>
      </div>
    </div>
  );
}
