"use client";

import { CONVERSIONS, trackConversion } from "@/lib/ads";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";

const WHATSAPP_NUMBER = "94743945010";

/**
 * WhatsApp green stays — it's the whole point of the button being recognisable — but the label
 * on it is ink, not white: white on #25D366 measures 1.98:1, surface-dark on it clears AA easily.
 * The text-weight variants use whatsapp-deep (#0F7A40, 5.14:1 on warm-white).
 *
 * `pill` and `pillLarge` carry a soft ring that pulses three times after load, then stops —
 * enough to find the primary action, not enough to nag (see .cta-pulse).
 */
const VARIANTS = {
  pill: "cta-pulse gap-3 min-h-14 bg-whatsapp text-surface-dark font-bold px-7 rounded-full hover:bg-whatsapp-hover active:scale-[0.98] transition-[background-color,scale] duration-200 text-lg",
  /** The closing CTA — deliberately the biggest button on the page. */
  pillLarge:
    "cta-pulse gap-3 min-h-16 bg-whatsapp text-surface-dark font-bold px-9 rounded-full hover:bg-whatsapp-hover active:scale-[0.98] transition-[background-color,scale] duration-200 text-xl",
  /** Text-weight, for sitting inside a sentence rather than owning its own block. */
  inline:
    "gap-1.5 text-whatsapp-deep font-bold underline underline-offset-2 hover:no-underline text-meta",
  /** Secondary weight on a light background, where booking is the primary action. */
  outline:
    "gap-3 min-h-14 text-whatsapp-deep font-bold px-7 rounded-full border-2 border-whatsapp-deep hover:bg-whatsapp-deep/10 transition-colors duration-200 text-lg",
  /** Same, on a dark zone — the ink green fails there, so this goes light. */
  outlineDark:
    "gap-3 min-h-14 text-warm-white font-bold px-7 rounded-full border-2 border-whatsapp hover:bg-whatsapp/20 transition-colors duration-200 text-lg",
  /** Compact fill for the mobile sticky bar, where two buttons share the width. */
  bar: "gap-2 w-full min-h-12 bg-whatsapp text-surface-dark font-bold px-4 rounded-full text-[15px] active:scale-[0.98] transition-[scale]",
} as const;

interface WhatsAppCtaProps {
  /** Prefill text, un-encoded. */
  message: string;
  /** GTM event label: "dive" | "padi", or "{page}_urgent" for the same-day path. */
  source: string;
  label?: string;
  className?: string;
  variant?: keyof typeof VARIANTS;
}

export default function WhatsAppCta({
  message,
  source,
  label = "Message us on WhatsApp",
  className = "",
  variant = "pill",
}: WhatsAppCtaProps) {
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  const isInline = variant === "inline";

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackConversion("whatsapp_click", CONVERSIONS.whatsapp, { data: { source } })}
      className={`relative inline-flex items-center justify-center ${VARIANTS[variant]} ${className}`}
    >
      <WhatsAppIcon size={isInline ? 15 : 22} className="shrink-0" />
      {label}
    </a>
  );
}
