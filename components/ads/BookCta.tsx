"use client";

import type Lenis from "lenis";
import { trackConversion } from "@/lib/ads";

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

/** Matches scroll-mt-24 on the #book section, so the heading isn't hidden behind it. */
const SCROLL_OFFSET = -96;

interface BookCtaProps {
  /** GTM event label, e.g. "padi_sticky". */
  source: string;
  children: React.ReactNode;
  className?: string;
}

/**
 * Scrolls to the booking form. No Ads conversion — it's navigation, and the form's own
 * submit fires the real one. The dataLayer event is only so the funnel is readable in GTM.
 *
 * Lenis owns the scroll on desktop, so a plain href jumps instead of gliding; on mobile
 * Lenis is skipped and scrollIntoView is the native smooth path.
 */
export default function BookCta({ source, children, className = "" }: BookCtaProps) {
  return (
    <a
      href="#book"
      onClick={(e) => {
        trackConversion("book_click", "", { data: { source } });

        const target = document.getElementById("book");
        if (!target) return; // let the browser handle it

        e.preventDefault();
        if (window.__lenis) {
          window.__lenis.scrollTo(target, { offset: SCROLL_OFFSET });
        } else {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
        // The hash is what makes Back work and the link shareable.
        history.replaceState(null, "", "#book");
      }}
      className={className}
    >
      {children}
    </a>
  );
}
