"use client";

import { usePathname } from "next/navigation";
import { AD_ROUTES } from "@/lib/ads";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";

const WHATSAPP_NUMBER = "94743945010";
const WHATSAPP_MESSAGE = "Hi! I'd like to book a dive or find out more about your courses.";

export default function WhatsAppFab() {
  const pathname = usePathname();

  // Ad pages carry their own WhatsApp CTA with the message pre-filled for that
  // page; a generic floating one is a second chat route competing with the form.
  if (AD_ROUTES.has(pathname)) return null;

  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  // The label slides out on hover/focus with CSS alone — no state, no re-render.
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="group fixed bottom-5 right-5 z-40 flex items-center gap-3"
    >
      <span className="hidden sm:block bg-surface-dark text-warm-white text-xs font-semibold px-3 py-2 rounded-[2px] whitespace-nowrap opacity-0 translate-x-2 transition-[opacity,translate] duration-200 group-hover:opacity-100 group-hover:translate-x-0 group-focus-visible:opacity-100 group-focus-visible:translate-x-0">
        Chat with us
      </span>
      <span className="w-14 h-14 rounded-full bg-whatsapp text-white flex items-center justify-center shadow-[0_6px_20px_-6px_rgba(15,30,37,0.45)] transition-transform duration-200 group-hover:scale-105">
        <WhatsAppIcon size={26} />
      </span>
    </a>
  );
}
