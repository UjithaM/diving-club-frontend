"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Native touch scroll on mobile is faster — skip Lenis
    if (window.matchMedia("(max-width: 767px)").matches) return;

    let lenis: Lenis | undefined;
    let rafId: number;

    // Defer until browser is idle so Lenis doesn't compete with LCP rendering
    const scheduleInit = (cb: () => void) => {
      if (typeof requestIdleCallback !== "undefined") {
        requestIdleCallback(cb, { timeout: 2000 });
      } else {
        setTimeout(cb, 200);
      }
    };

    scheduleInit(() => {
      lenis = new Lenis({ lerp: 0.08 });
      function raf(time: number) {
        lenis!.raf(time);
        rafId = requestAnimationFrame(raf);
      }
      rafId = requestAnimationFrame(raf);
    });

    return () => {
      cancelAnimationFrame(rafId);
      lenis?.destroy();
    };
  }, []);

  return <>{children}</>;
}
