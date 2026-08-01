"use client";

import { trackConversion } from "@/lib/ads";

interface BookCtaProps {
  /** GTM event label, e.g. "padi_sticky". */
  source: string;
  children: React.ReactNode;
  className?: string;
}

/**
 * Scrolls to the booking form. No Ads conversion — it's navigation, and the form's own
 * submit fires the real one. The dataLayer event is only so the funnel is readable in GTM.
 */
export default function BookCta({ source, children, className = "" }: BookCtaProps) {
  return (
    <a
      href="#book"
      onClick={() => trackConversion("book_click", "", { data: { source } })}
      className={className}
    >
      {children}
    </a>
  );
}
