import { useParams, Link } from "react-router";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { ArrowLeft, Leaf, Recycle, Factory, BarChart3, Building2, Cpu, Users, ShieldCheck, TrendingUp } from "lucide-react";
import { scrapqLogo } from "../lib/constants";
import sqRecycleHub from "@/assets/sq-recycle-hub.png";
import sqRor from "@/assets/sq-ror.png";
import sqCirculomony from "@/assets/sq-circulomony.jpeg";
import sqCarbonTech from "@/assets/sq-carbon-tech.png";

const font = "'Optima', 'Candara', 'Segoe UI', sans-serif";
const sans = "'DM Sans', 'Inter', sans-serif";
const sage = "#7b8b6f";

interface ServiceDetail {
  slug: string;
  title: string;
  subtitle: string;
  heroImg: string;
  intro: string;
  body: string[];
  highlights: { icon: React.ElementType; title: string; desc: string }[];
}

const serviceDetails: Record<string, ServiceDetail> = {
  "sq-recycle-hub": {
    slug: "sq-recycle-hub",
    title: "SQ Recycle HUB",
    subtitle: "Driving Towards Zero Landfills",
    heroImg: sqRecycleHub,
    intro:
      "SQ Recycle HUB is a one-stop sustainability platform that stops recyclable waste at the source — households, SMBs, corporates, and industries — ensuring it never reaches landfills.",
    body: [
      "By capturing recyclable materials before they enter the waste stream, SQ Recycle HUB transforms 100+ recyclable materials into valuable resources. Our network of collection points, trained recycling officers, and technology-driven logistics ensures maximum material recovery.",
      "From paper and plastics to metals and e-waste, every kilogram diverted from landfills contributes to a cleaner environment and a more circular economy. Our platform provides real-time tracking, transparent pricing, and instant payments to every stakeholder in the chain.",
    ],
    highlights: [
      { icon: Recycle, title: "100+ Materials", desc: "We handle over 100 types of recyclable materials across categories." },
      { icon: Users, title: "Doorstep Collection", desc: "Convenient pickup from your location at your preferred time." },
      { icon: TrendingUp, title: "Fair Pricing", desc: "Transparent, market-linked rates with instant digital payments." },
    ],
  },
  "sq-ror": {
    slug: "sq-ror",
    title: "SQ RoR",
    subtitle: "Recovery of Recyclables from MRFs",
    heroImg: sqRor,
    intro:
      "SQ RoR operates innovative Material Recovery Facilities that reclaim recyclables from landfills, railway stations, events, and urban hubs — cutting landfill dependency while fueling the zero-waste mission.",
    body: [
      "Our MRFs are strategically located to intercept waste before it reaches landfills. Using advanced sorting technology and skilled workforce, we achieve industry-leading recovery rates from mixed waste streams.",
      "SQ RoR partners with municipalities, railways, event organizers, and urban bodies to set up recovery operations that transform waste management economics while creating dignified employment opportunities.",
    ],
    highlights: [
      { icon: Factory, title: "Advanced MRFs", desc: "State-of-the-art Material Recovery Facilities with high recovery rates." },
      { icon: ShieldCheck, title: "Certified Process", desc: "ISO-certified operations ensuring responsible material handling." },
      { icon: Users, title: "Employment", desc: "Creating dignified jobs in the waste management ecosystem." },
    ],
  },
  "sq-circulomony": {
    slug: "sq-circulomony",
    title: "SQ Circulomony",
    subtitle: "True Epitome of a Circular Economy",
    heroImg: sqCirculomony,
    intro:
      "SQ Circulomony is more than a business model — it is a socio-economic revolution where environmental sustainability and economic prosperity flow together across every stakeholder.",
    body: [
      "By formalizing the unorganized waste sector, we have created a people-powered ecosystem that ensures going green is inclusive, dignified, and profitable.",
      "Our model ensures fair earnings across the entire value chain — from consumers and rag pickers to kabadiwalas, retailers, and wholesalers. Every participant benefits, creating a resilient and inclusive green economy that scales sustainably.",
    ],
    highlights: [
      { icon: Users, title: "Consumers", desc: "Turn domestic and corporate waste into digital assets with fair pricing and instant rewards." },
      { icon: ShieldCheck, title: "Rag Pickers", desc: "Provide dignity, safety, and formal employment to frontline waste workers." },
      { icon: TrendingUp, title: "Kabadiwalas", desc: "Transform local scrap dealers into tech-enabled micro-entrepreneurs." },
    ],
  },
  "sq-carbon-tech": {
    slug: "sq-carbon-tech",
    title: "SQ Carbon Tech",
    subtitle: "Tech to Calculate Carbon Footprint",
    heroImg: sqCarbonTech,
    intro:
      "SQ Carbon Tech quantifies recycled carbon footprint, enlightens consumers, and empowers industries toward minimal emissions, nurturing a greener world.",
    body: [
      "Our proprietary technology calculates the exact carbon offset achieved through recycling activities. Every kilogram of material recycled is translated into measurable environmental impact metrics.",
      "Industries and consumers can track their sustainability journey with real-time dashboards, certified carbon reports, and actionable insights that drive continuous improvement in environmental performance.",
    ],
    highlights: [
      { icon: BarChart3, title: "Carbon Tracking", desc: "Real-time measurement of carbon footprint reduction through recycling." },
      { icon: Leaf, title: "Green Reports", desc: "Certified sustainability reports for ESG compliance and reporting." },
      { icon: TrendingUp, title: "Impact Metrics", desc: "Actionable insights to drive continuous environmental improvement." },
    ],
  },
  "sq-zero-carbon": {
    slug: "sq-zero-carbon",
    title: "SQ Zero Carbon",
    subtitle: "Net Zero Through Recycling",
    heroImg: "https://images.unsplash.com/photo-1767740680600-3cb2408a6077?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
    intro:
      "SQ Zero Carbon aids industries in attaining their net-zero carbon & EPR objectives, promoting sustainability and eco-friendliness through our solutions.",
    body: [
      "We help organizations achieve their Extended Producer Responsibility (EPR) compliance by providing end-to-end recycling infrastructure and certified documentation.",
      "Our solutions are tailored to each industry's needs, ensuring that sustainability targets are met efficiently while creating measurable positive environmental impact.",
    ],
    highlights: [
      { icon: Building2, title: "EPR Compliance", desc: "Complete support for Extended Producer Responsibility obligations." },
      { icon: Leaf, title: "Net Zero Path", desc: "Structured roadmap to achieve net-zero emissions through recycling." },
      { icon: ShieldCheck, title: "Certification", desc: "Fully documented and certified waste management processes." },
    ],
  },
  "sq-rrr": {
    slug: "sq-rrr",
    title: "SQ RRR",
    subtitle: "Reduce · Reuse · Recycle Centers",
    heroImg: "https://images.unsplash.com/photo-1512237017014-1b4a7fa57654?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
    intro:
      "EcoStations enabling effortless e-waste recycling, reduction, and reuse for consumers, fostering environmental stewardship and resource efficiency.",
    body: [
      "SQ RRR centers are conveniently located drop-off points where consumers can responsibly dispose of electronic waste, old appliances, and other recyclable items.",
      "Each center is equipped to handle a wide range of materials and ensures that every item is processed through certified recycling channels, recovering precious metals and reducing environmental harm.",
    ],
    highlights: [
      { icon: Cpu, title: "E-Waste Handling", desc: "Specialized processing for electronic waste and appliances." },
      { icon: Recycle, title: "Material Recovery", desc: "Extraction of precious metals and reusable components." },
      { icon: Users, title: "Easy Drop-off", desc: "Convenient locations for consumers to responsibly dispose items." },
    ],
  },
};

export default function ServiceDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const service = slug ? serviceDetails[slug] : null;

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#faf8f5]">
        <div className="text-center">
          <h1 style={{ fontFamily: font, fontSize: "32px", color: "#171411" }}>Service not found</h1>
          <Link to="/" className="mt-4 inline-block underline" style={{ color: sage }}>
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf8f5]">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-black/5">
        <div className="max-w-[1200px] mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <img src={scrapqLogo} alt="ScrapQ" className="h-8 w-auto" />
          </Link>
          <div className="flex items-center gap-6" style={{ fontFamily: sans, fontSize: "13px" }}>
            <Link to="/" className="text-[#171411]/60 hover:text-[#171411] transition-colors">Home</Link>
            <Link to="/#discover" className="text-[#171411]/60 hover:text-[#171411] transition-colors">About ScrapQ</Link>
            <Link to="/book-appointment" className="px-5 py-2 rounded-full text-white text-sm" style={{ backgroundColor: sage }}>
              Book an Appointment
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <div ref={heroRef} className="relative h-[70vh] overflow-hidden">
        <motion.div className="absolute inset-0" style={{ y: heroY }}>
          <ImageWithFallback src={service.heroImg} alt={service.title} className="w-full h-full object-cover" />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#171411]/80 via-[#171411]/30 to-transparent" />

        <motion.div
          className="absolute bottom-0 left-0 right-0 p-8 lg:p-16"
          style={{ opacity: heroOpacity }}
        >
          <div className="max-w-[1200px] mx-auto">
            <Link
              to="/"
              className="inline-flex items-center gap-2 mb-6 text-white/70 hover:text-white transition-colors"
              style={{ fontFamily: sans, fontSize: "13px" }}
            >
              <ArrowLeft size={14} />
              Back to Home
            </Link>
            <motion.h1
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-white mb-3"
              style={{ fontFamily: font, fontSize: "clamp(32px, 5vw, 56px)", lineHeight: 1.15 }}
            >
              {service.title}
            </motion.h1>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-white/70"
              style={{ fontFamily: font, fontSize: "clamp(16px, 2vw, 22px)", fontStyle: "italic" }}
            >
              {service.subtitle}
            </motion.p>
          </div>
        </motion.div>
      </div>

      {/* Content */}
      <div className="max-w-[900px] mx-auto px-6 py-20 lg:py-28">
        {/* Intro */}
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10"
          style={{ fontFamily: font, fontSize: "clamp(18px, 2vw, 22px)", lineHeight: 1.7, color: "#171411" }}
        >
          {service.intro}
        </motion.p>

        <div className="w-16 h-px mb-10" style={{ backgroundColor: sage }} />

        {/* Body paragraphs */}
        {service.body.map((para, i) => (
          <motion.p
            key={i}
            initial={{ y: 15, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="mb-6"
            style={{ fontFamily: sans, fontSize: "15.5px", lineHeight: 1.8, color: "#171411", opacity: 0.75 }}
          >
            {para}
          </motion.p>
        ))}

        {/* Highlights */}
        <div className="mt-16">
          <motion.h3
            initial={{ y: 15, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="mb-10"
            style={{ fontFamily: font, fontSize: "clamp(22px, 2.5vw, 32px)", color: "#171411" }}
          >
            Key Highlights
          </motion.h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {service.highlights.map((h, i) => {
              const Icon = h.icon;
              return (
                <motion.div
                  key={h.title}
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="p-6 rounded-xl bg-white"
                  style={{ boxShadow: "0 2px 16px rgba(0,0,0,0.04)" }}
                >
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center mb-4"
                    style={{ backgroundColor: `${sage}18` }}
                  >
                    <Icon size={22} color={sage} strokeWidth={1.5} />
                  </div>
                  <h4 className="mb-2" style={{ fontFamily: font, fontSize: "17px", color: "#171411" }}>
                    {h.title}
                  </h4>
                  <p style={{ fontFamily: sans, fontSize: "13.5px", lineHeight: 1.65, color: "#171411", opacity: 0.65 }}>
                    {h.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <Link
            to="/book-appointment"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-white transition-transform hover:scale-105"
            style={{ backgroundColor: sage, fontFamily: sans, fontSize: "14px", fontWeight: 600 }}
          >
            Book an Appointment
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
