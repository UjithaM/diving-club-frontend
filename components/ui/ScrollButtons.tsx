"use client";

import { useEffect, useState } from "react";

/**
 * Previous / next for a horizontal scroll strip rendered elsewhere on the server. Moves by one
 * card, and disables each button at its end so it's clear when there's nothing more.
 */
export default function ScrollButtons({ target, label }: { target: string; label: string }) {
  const [edge, setEdge] = useState({ start: true, end: false });

  useEffect(() => {
    const el = document.getElementById(target);
    if (!el) return;
    const update = () =>
      setEdge({
        start: el.scrollLeft <= 4,
        end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4,
      });
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [target]);

  function move(dir: 1 | -1) {
    const el = document.getElementById(target);
    const card = el?.firstElementChild as HTMLElement | null;
    if (!el || !card) return;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: dir * (card.offsetWidth + gap), behavior: still ? "auto" : "smooth" });
  }

  const btn =
    "flex items-center justify-center w-11 h-11 rounded-full border-2 border-current transition-[opacity,background-color] hover:bg-rule disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer disabled:cursor-default";

  return (
    <div className="flex gap-2" role="group" aria-label={label}>
      <button type="button" className={btn} onClick={() => move(-1)} disabled={edge.start} aria-label="Previous review" aria-controls={target}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="square" aria-hidden="true"><path d="M20 12H5M11 6l-6 6 6 6" /></svg>
      </button>
      <button type="button" className={btn} onClick={() => move(1)} disabled={edge.end} aria-label="Next review" aria-controls={target}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="square" aria-hidden="true"><path d="M4 12h15M13 6l6 6-6 6" /></svg>
      </button>
    </div>
  );
}
