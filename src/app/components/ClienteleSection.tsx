import { useState } from "react";
import { motion } from "motion/react";
import { FadeInOnScroll } from "./shared";
import { font, sage, clienteleRow1, clienteleRow2 } from "../lib/constants";
import type { Client } from "../lib/constants";

function ClientPill({ name, domain }: Client) {
  const [logoLoaded, setLogoLoaded] = useState(false);
  const [logoFailed, setLogoFailed] = useState(false);
  const faviconUrl = `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;

  return (
    <div className="flex items-center gap-2.5">
      {!logoFailed && (
        <img
          src={faviconUrl}
          alt=""
          width={20}
          height={20}
          className={`rounded-sm flex-none transition-opacity duration-300 ${logoLoaded ? "opacity-70" : "opacity-0"}`}
          style={{ width: 20, height: 20 }}
          onLoad={() => setLogoLoaded(true)}
          onError={() => setLogoFailed(true)}
        />
      )}
      <span
        className="text-[#171411]/70 whitespace-nowrap"
        style={{ fontFamily: font, fontSize: "14px", letterSpacing: "0.02em" }}
      >
        {name}
      </span>
    </div>
  );
}

function MarqueeRow({ clients, direction, speed = 35 }: { clients: Client[]; direction: "left" | "right"; speed?: number }) {
  const doubled = [...clients, ...clients];
  return (
    <div className="overflow-hidden">
      <motion.div
        animate={{ x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"] }}
        transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
        className="flex gap-3 w-max"
      >
        {doubled.map((client, i) => (
          <motion.div
            key={`${client.name}-${i}`}
            whileHover={{ scale: 1.05, y: -2 }}
            className="flex-none px-5 py-2.5 rounded-md border border-[#171411]/10 flex items-center h-[46px] cursor-default"
            style={{ backgroundColor: "rgba(23,20,17,0.04)" }}
          >
            <ClientPill {...client} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

export function ClienteleSection() {
  return (
    <section className="bg-white py-20 lg:py-32 overflow-hidden">
      <FadeInOnScroll>
        <div className="max-w-[740px] mx-auto text-center mb-14 px-6">
          <p
            className="uppercase tracking-[0.15em] mb-6"
            style={{ fontFamily: font, fontSize: "13.5px", color: sage }}
          >
            Our Clientele
          </p>
          <p
            className="text-[#171411]"
            style={{ fontFamily: font, fontSize: "clamp(24px, 3vw, 38px)", lineHeight: "1.55" }}
          >
            Trusted by leading brands, enterprises,
            <br />
            and institutions across India.
          </p>
        </div>
      </FadeInOnScroll>

      <div className="space-y-3">
        <MarqueeRow clients={clienteleRow1} direction="left" speed={40} />
        <MarqueeRow clients={clienteleRow2} direction="right" speed={45} />
      </div>
    </section>
  );
}