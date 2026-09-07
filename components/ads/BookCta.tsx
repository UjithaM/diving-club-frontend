"use client";

import type Lenis from "lenis";
import { trackConversion } from "@/lib/ads";

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

/** Breathing room above the form once the header question is settled. */
const GAP = 16;

/**
 * How far down the viewport the first input lands, as a fraction of the height.
 *
 * Landing on the top of the form put the visitor on the dark price card with every field
 * below the fold — they'd asked to book and got a number and nowhere to type. Aiming at the
 * first field instead, with roughly a third of the screen above it, keeps the price in view
 * and puts the fields under it.
 */
const FIELD_LEAD = 0.38;

/**
 * How much of the viewport the sticky header will be covering *once the scroll finishes*.
 *
 * This used to be a flat -96px paired with a hand-synced `scroll-mt-24` on the target, and it
 * was wrong in the common direction: the header hides itself on scroll-down (see Header.tsx),
 * and every "Book your spot" above the form scrolls down — so the 96px reserved for a header
 * that had just slid away landed as dead whitespace, pushing the fields below the fold.
 *
 * Scrolling up brings the header back, so that direction really does need the space.
 */
function headerOffset(goingDown: boolean) {
  if (goingDown) return 0;
  const header = document.querySelector("header");
  return header?.offsetHeight ?? 64;
}

interface BookCtaProps {
  /** GTM event label, e.g. "padi_sticky". */
  source: string;
  children: React.ReactNode;
  className?: string;
}

/** Is the visitor already looking at this element? */
function onScreen(el: HTMLElement) {
  const { top, bottom } = el.getBoundingClientRect();
  return bottom > 0 && top < window.innerHeight * 0.9;
}

/**
 * Takes the visitor to the booking form — or books, if they're already at it.
 *
 * Tapping "Book" while the form fills the screen used to do nothing at all: it scrolled to a
 * place the visitor was already standing. That reads as a broken button, and it's what people
 * meant by "I click Book and nothing happens". So when the fields are already in view, this
 * submits the form instead, which runs validation and reveals whatever is still required.
 *
 * From the hero or the closing CTA the form is far off-screen, so those still just scroll —
 * throwing four red errors at someone who hasn't seen the form yet would be worse than useless.
 *
 * No Ads conversion here either way: the form's own submit fires the real one. The dataLayer
 * event is only so the funnel is readable in GTM.
 *
 * Lenis owns the scroll on desktop and is skipped on mobile, so both paths are given the same
 * absolute target rather than one using an offset and the other a CSS scroll-margin.
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

        // The first control in the form, not the form itself — see FIELD_LEAD. Falls back to
        // the form when there is none, which is the success panel.
        const field = target.querySelector<HTMLElement>("input, select, textarea");

        const form = target.querySelector("form");
        if (form && field && onScreen(field)) {
          // requestSubmit, not submit(): submit() bypasses the submit event, so React's
          // handler — and with it all validation — would never run.
          form.requestSubmit();
          return;
        }

        const anchor = field ?? target;
        const top = anchor.getBoundingClientRect().top + window.scrollY;
        // Never less than the header clearance, however short the viewport is.
        const lead = Math.max(
          field ? window.innerHeight * FIELD_LEAD : 0,
          headerOffset(top > window.scrollY) + GAP
        );
        const y = Math.max(top - lead, 0);

        if (window.__lenis) {
          window.__lenis.scrollTo(y);
        } else {
          window.scrollTo({ top: y, behavior: "smooth" });
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
