"use client";

import WhatsAppCta from "./WhatsAppCta";
import BookCta from "./BookCta";

interface StickyCtaProps {
  /** WhatsApp prefill text, un-encoded. */
  message: string;
  /** GTM event label: "dive" | "padi". Suffixed with _sticky so the bar is separable. */
  source: string;
}

/**
 * Mobile-only bottom bar for the paid landing pages.
 *
 * 90% of ad spend is mobile and average scroll depth is ~47%, so without this a visitor
 * who scrolls past the hero has no CTA in view until they reach the form. The floating
 * WhatsApp FAB is disabled on ad routes (see AD_ROUTES in lib/ads.ts), so this is the
 * only persistent CTA — no double chat route.
 *
 * z-40, not z-50: CountrySelect renders a full-screen picker at z-50 from inside the
 * booking form's phone field, and it has to sit above this bar.
 */
export default function StickyCta({ message, source }: StickyCtaProps) {
  return (
    <div className="sticky-cta sm:hidden fixed bottom-0 inset-x-0 z-40 bg-warm-white border-t-2 border-charcoal-sea pb-[env(safe-area-inset-bottom)] shadow-[0_-12px_30px_-18px_rgba(15,30,37,0.45)]">
      <div className="flex gap-2.5 px-4 py-3">
        <WhatsAppCta
          message={message}
          source={`${source}_sticky`}
          label="WhatsApp us"
          variant="bar"
          className="flex-1"
        />
        {/* Coral fill with ink text: the site's one "act" colour, 5.51:1. */}
        <BookCta
          source={`${source}_sticky`}
          className="flex-1 inline-flex items-center justify-center min-h-12 px-4 rounded-full bg-action text-action-ink font-bold text-[15px] active:scale-[0.98] transition-[scale]"
        >
          Book
        </BookCta>
      </div>
    </div>
  );
}
