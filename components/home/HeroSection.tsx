"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const ease = "cubic-bezier(0.16, 1, 0.3, 1)";

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const bgRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const check = () => setIsMobile(mq.matches);
    check();
    mq.addEventListener("change", check);
    setMounted(true);
    return () => mq.removeEventListener("change", check);
  }, []);

  useEffect(() => {
    if (isMobile) return;
    let rafId: number;
    let ticking = false;

    function update() {
      const scrollY = window.scrollY;
      if (bgRef.current) {
        const pct = Math.min((scrollY / 700) * 12, 12);
        bgRef.current.style.transform = `scale(1.05) translateY(${pct}%)`;
      }
      if (textRef.current) {
        const pct = Math.min((scrollY / 500) * 5, 5);
        textRef.current.style.transform = `translateY(${pct}%)`;
      }
      ticking = false;
    }

    function onScroll() {
      if (!ticking) {
        rafId = requestAnimationFrame(update);
        ticking = true;
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, [isMobile]);

  return (
    <section className="relative min-h-[100svh] bg-charcoal-sea overflow-hidden flex items-center">
      {/* Subtle background gradient layer */}
      <div
        ref={bgRef}
        className="parallax-layer absolute inset-0"
        style={{ transform: "scale(1.05)" }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 70% 40%, #1e4a5a 0%, #264653 50%, #1a3540 100%)",
          }}
        />
      </div>

      {/* Content grid */}
      <div
        ref={textRef}
        className="relative z-10 w-full max-w-6xl mx-auto px-6 pt-24 pb-16 lg:py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center"
      >
        {/* Left — heading + CTAs */}
        <div>
          {/* Label */}
          <div
            className="flex items-center gap-3 mb-5 lg:mb-8"
            style={mounted ? { animation: `hero-slide-up 0.7s 0.2s ${ease} both` } : { opacity: 0 }}
          >
            <span className="h-px w-6 bg-tropic-coral/60" />
            <span className="text-[11px] uppercase tracking-[0.25em] font-semibold text-tropic-coral/80">
              Trincomalee · Sri Lanka
            </span>
          </div>

          {/* H1 */}
          <h1
            className="font-display leading-[1.05] mb-6"
            style={
              mounted
                ? {
                    fontSize: "clamp(2.8rem, 8vw, 7rem)",
                    animation: `hero-slide-up 0.9s 0.1s ${ease} both`,
                  }
                : { opacity: 0, fontSize: "clamp(3.5rem, 8vw, 7rem)" }
            }
          >
            <span className="block font-light text-warm-white/40">Dive</span>
            <span className="block font-bold text-warm-white">into</span>
            <span className="block font-extrabold italic text-shallow-water">
              Trincomalee
            </span>
          </h1>

          {/* Fine rule */}
          <div
            className="w-24 border-t border-warm-white/15 mb-6"
            style={mounted ? { animation: `hero-slide-up 0.6s 0.3s ${ease} both` } : { opacity: 0 }}
          />

          {/* Subtitle */}
          <p
            className="text-warm-white/55 text-base leading-relaxed max-w-[38ch] mb-8 lg:mb-10"
            style={mounted ? { animation: `hero-slide-up 0.8s 0.35s ${ease} both` } : { opacity: 0 }}
          >
            PADI courses, guided reef dives, and whale watching — no experience necessary.
            The Indian Ocean is waiting right outside our door.
          </p>

          {/* CTAs */}
          <div
            className="flex flex-col sm:flex-row gap-4"
            style={mounted ? { animation: `hero-slide-up 0.7s 0.45s ${ease} both` } : { opacity: 0 }}
          >
            <Link
              href="/courses"
              className="inline-flex items-center justify-center bg-tropic-coral text-white font-semibold px-8 py-3.5 rounded-full text-sm hover:bg-[#d4603f] transition-colors duration-200"
            >
              Explore Courses
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-1.5 text-warm-white/60 text-sm font-semibold hover:text-tropic-coral transition-colors"
            >
              Book a Dive
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>

        {/* Right — photo placeholder + stat card */}
        <div
          className="hidden lg:block relative"
          style={mounted ? { animation: `hero-slide-up 0.9s 0.3s ${ease} both` } : { opacity: 0 }}
        >
          {/* Hero photo */}
          <div className="rounded-3xl overflow-hidden aspect-[3/4] bg-[#1a3540] relative">
            <Image
              src="/assets/couple-scuba-diving-trincomalee.webp"
              alt="Couple scuba diving together in the clear waters of Trincomalee, Sri Lanka"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 0px, 45vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal-sea/40 to-transparent" />
          </div>

          {/* Floating stat card */}
          <div className="absolute bottom-8 -left-6 bg-warm-white rounded-2xl p-5 shadow-xl">
            <p className="text-charcoal-sea font-extrabold font-display text-2xl leading-none">15+</p>
            <p className="text-charcoal-sea/40 text-[11px] uppercase tracking-widest mt-1">Years · Trincomalee</p>
            <div className="w-8 h-0.5 bg-tropic-coral mt-3" />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
        style={mounted ? { animation: `hero-slide-up 0.6s 1.5s ${ease} both` } : { opacity: 0 }}
      >
        <span className="text-warm-white/30 text-[10px] tracking-[0.2em] uppercase">Scroll</span>
        <div
          className="w-px h-8 bg-gradient-to-b from-warm-white/40 to-transparent"
          style={{ transformOrigin: "top", animation: "scroll-line 1.8s ease-in-out infinite" }}
        />
      </div>
    </section>
  );
}
