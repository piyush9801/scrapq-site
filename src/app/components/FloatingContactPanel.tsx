import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CalendarDays, Phone, MessageSquare, Download } from "lucide-react";
import { sage } from "../lib/constants";
import { useNavigate } from "react-router";

/* ─── WhatsApp SVG (Lucide doesn't have a brand icon) ─── */
function WhatsAppIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

const PHONE = "90 30 72 72 77";

const actions = [
  {
    id: "book",
    icon: CalendarDays,
    label: "Book an Appointment",
    color: sage,
    action: "navigate",
  },
  {
    id: "call",
    icon: Phone,
    label: `Missed Call ${PHONE}`,
    color: "#3b82f6",
    action: "tel",
  },
  {
    id: "sms",
    icon: MessageSquare,
    label: `Message ${PHONE}`,
    color: "#8b5cf6",
    action: "sms",
  },
  {
    id: "whatsapp",
    icon: WhatsAppIcon,
    label: `WhatsApp ${PHONE}`,
    color: "#25D366",
    action: "whatsapp",
  },
  {
    id: "download",
    icon: Download,
    label: "Get the App",
    color: "#f59e0b",
    action: "download",
  },
] as const;

export function FloatingContactPanel() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleAction = (action: string) => {
    const num = PHONE.replace(/\s/g, "");
    switch (action) {
      case "navigate":
        navigate("/book-appointment");
        break;
      case "tel":
        window.open(`tel:${num}`, "_self");
        break;
      case "sms":
        window.open(`sms:${num}`, "_self");
        break;
      case "whatsapp":
        window.open(`https://wa.me/91${num}`, "_blank");
        break;
      case "download":
        window.open("https://play.google.com/store", "_blank");
        break;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1.2, duration: 0.5, type: "spring", stiffness: 120 }}
      className="fixed right-0 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-1"
    >
      {actions.map((item, i) => {
        const isHovered = hoveredId === item.id;
        const IconComp = item.icon;

        return (
          <motion.button
            key={item.id}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.4 + i * 0.08, type: "spring", stiffness: 200 }}
            onMouseEnter={() => setHoveredId(item.id)}
            onMouseLeave={() => setHoveredId(null)}
            onClick={() => handleAction(item.action)}
            className="relative flex items-center justify-end cursor-pointer group"
          >
            {/* Expanding label */}
            <AnimatePresence>
              {isHovered && (
                <motion.span
                  initial={{ opacity: 0, width: 0, x: 10 }}
                  animate={{ opacity: 1, width: "auto", x: 0 }}
                  exit={{ opacity: 0, width: 0, x: 10 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="overflow-hidden whitespace-nowrap mr-0 px-4 py-2 rounded-l-lg text-white text-sm font-medium shadow-lg"
                  style={{ backgroundColor: item.color }}
                >
                  {item.label}
                </motion.span>
              )}
            </AnimatePresence>

            {/* Icon button */}
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-11 h-11 flex items-center justify-center text-white rounded-l-lg shadow-md transition-colors"
              style={{
                backgroundColor: isHovered ? item.color : "#1e293b",
                boxShadow: isHovered
                  ? `0 4px 15px ${item.color}50`
                  : "0 2px 8px rgba(0,0,0,0.3)",
              }}
            >
              <IconComp size={20} />
            </motion.div>
          </motion.button>
        );
      })}
    </motion.div>
  );
}
