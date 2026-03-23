import { ScrollProgressBar, ScrollMarquee } from "../components/shared";
import { Navbar } from "../components/Navbar";
import { HeroSection } from "../components/HeroSection";
import { LiveImpactTicker } from "../components/LiveImpactTicker";
import { WhatWeDoSection } from "../components/WhatWeDoSection";
import { ZeroLandfillSection } from "../components/ZeroLandfillSection";
import { WhatWeRecycleScrollytelling } from "../components/WhatWeRecycleSection";
import { HowItWorksSection } from "../components/HowItWorksSection";
import { ClienteleSection } from "../components/ClienteleSection";
import { ZeroCarbonSection } from "../components/ZeroCarbonSection";
import { TestimonialsSection } from "../components/TestimonialsSection";
import { ContactSection } from "../components/ContactSection";
import { FooterSection } from "../components/FooterSection";
import { ScrollToTop } from "../components/ScrollToTop";
import { FloatingContactPanel } from "../components/FloatingContactPanel";
import { recycleCategories } from "../lib/constants";

function WhatWeRecycleSection() {
  return <WhatWeRecycleScrollytelling recycleCategories={recycleCategories} />;
}

export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-white">
      <ScrollProgressBar />
      <Navbar />
      <HeroSection />
      <LiveImpactTicker />
      <WhatWeDoSection />
      <div className="bg-white overflow-hidden">
        <ScrollMarquee text="REDUCE • REUSE • RECYCLE • " />
      </div>
      <ZeroLandfillSection />
      <ZeroCarbonSection />
      <WhatWeRecycleSection />
      <div className="bg-[#171411] overflow-hidden">
        <ScrollMarquee text="DOORSTEP • COLLECTION • WEIGHING • PAYMENT • " reverse light />
      </div>
      <HowItWorksSection />
      <ClienteleSection />
      <div className="bg-white overflow-hidden">
        <ScrollMarquee text="SUSTAINABILITY • CIRCULAR ECONOMY • NET ZERO • EPR • " />
      </div>
      <TestimonialsSection />
      <ContactSection />
      <FooterSection />
      <FloatingContactPanel />
      <ScrollToTop />
    </div>
  );
}