import { useEffect, useRef, useState } from "react";

/**
 * Reveal-on-scroll, as a progressive enhancement.
 *
 * `inView` starts true so the server HTML — and anything that can't run the observer:
 * no JS, no IntersectionObserver, a failed hydration, or a visitor who asked for less
 * motion — renders the content visible instead of a blank page. It only ever goes false
 * for an element we know is off-screen and can animate back into view, so the hidden
 * state happens where nobody can see it.
 */
export function useInView<T extends Element = HTMLDivElement>(margin = "-40px") {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Already on screen at mount: leave it alone. Hiding it now would blink content the
    // visitor is currently looking at, so above-the-fold blocks simply never animate.
    const box = el.getBoundingClientRect();
    if (box.top < window.innerHeight && box.bottom > 0) return;

    setInView(false);
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(el);
        }
      },
      { rootMargin: margin }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [margin]);

  return [ref, inView] as const;
}
