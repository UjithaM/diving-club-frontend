"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const stats = [
  { value: "9", label: "PADI Courses" },
  { value: "5", label: "Experiences" },
  { value: "7:30am", label: "Daily from" },
];

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
        const pct = Math.min((scrollY / 700) * 28, 28);
        bgRef.current.style.transform = `scale(1.1) translateY(${pct}%)`;
      }
      if (textRef.current) {
        const pct = Math.min((scrollY / 500) * 12, 12);
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
    <section className="relative h-[100svh] min-h-[600px] overflow-hidden flex items-center">

      {/* Parallax background layer */}
      <div
        ref={bgRef}
        className="parallax-layer absolute inset-0"
        style={{ transform: "scale(1.1)" }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 45% 45%, #1e5c54 0%, #16424c 40%, #0d2b35 80%, #091f28 100%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-40"
          style={{
            background:
              "linear-gradient(160deg, transparent 30%, #2A9D8F22 50%, transparent 70%), linear-gradient(210deg, transparent 20%, #2A9D8F18 45%, transparent 65%)",
          }}
        />
      </div>

      {/* Floating orbs */}
      <div
        className="absolute top-[18%] right-[8%] w-80 h-80 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, #2A9D8F30 0%, transparent 70%)",
          animation: "float-a 9s ease-in-out infinite",
        }}
      />
      <div
        className="absolute bottom-[22%] left-[-4%] w-64 h-64 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, #F4A26125 0%, transparent 70%)",
          animation: "float-b 12s ease-in-out 4s infinite",
        }}
      />
      <div
        className="absolute top-[60%] right-[20%] w-44 h-44 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, #E76F5120 0%, transparent 70%)",
          animation: "float-c 7s ease-in-out 2s infinite",
        }}
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#091f28]/80 via-transparent to-[#091f28]/20" />

      {/* Foreground content */}
      <div
        ref={textRef}
        className="relative z-10 w-full max-w-5xl mx-auto px-6"
      >
        {/* Tag */}
        <div
          className="flex items-center gap-3 mb-6"
          style={
            mounted
              ? { animation: `hero-slide-up 0.7s 0.2s ${ease} both` }
              : { opacity: 0 }
          }
        >
          <span className="h-px w-10 bg-shallow-water" />
          <span className="text-shallow-water text-sm font-semibold tracking-[0.2em] uppercase">
            Trincomalee · Sri Lanka
          </span>
        </div>

        {/* Heading with 3D entrance */}
        <div style={{ perspective: "1000px" }}>
          <h1
            className="text-warm-white text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] mb-6"
            style={
              mounted
                ? { animation: `hero-rotate-in 0.9s 0.1s ${ease} both` }
                : { opacity: 0 }
            }
          >
            Dive into<br />
            <span
              className="text-transparent bg-clip-text"
              style={{ backgroundImage: "linear-gradient(90deg, #2A9D8F, #4bbfb0)" }}
            >
              Trincomalee&apos;s
            </span>
            <br />
            Crystal Waters
          </h1>
        </div>

        {/* Subtitle — no opacity:0 so LCP fires immediately */}
        <p
          className="text-warm-white/75 text-lg sm:text-xl max-w-lg mb-9 leading-relaxed"
          style={
            mounted
              ? { animation: `hero-slide-up-only 0.8s ${ease} both` }
              : undefined
          }
        >
          PADI courses, guided reef dives, and whale watching — no experience necessary.
          The Indian Ocean is waiting right outside our door.
        </p>

        {/* CTAs */}
        <div
          className="flex flex-col sm:flex-row gap-4 mb-14"
          style={
            mounted
              ? { animation: `hero-slide-up 0.7s 0.4s ${ease} both` }
              : { opacity: 0 }
          }
        >
          <Link
            href="/courses"
            className="inline-flex items-center justify-center gap-2 bg-shallow-water text-warm-white font-bold px-8 py-4 rounded-full hover:bg-[#239085] transition-colors text-base"
          >
            Explore Courses
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center border-2 border-warm-white/40 text-warm-white font-semibold px-8 py-4 rounded-full hover:border-warm-white hover:bg-warm-white/10 transition-colors text-base"
          >
            Book a Dive
          </Link>
        </div>

        {/* Stats row */}
        <div
          className="flex flex-wrap gap-x-8 gap-y-4"
          style={
            mounted
              ? { animation: `hero-slide-up 0.7s 0.6s ${ease} both` }
              : { opacity: 0 }
          }
        >
          {stats.map((s, i) => (
            <div key={i} className="flex flex-col">
              <span className="text-warm-white text-2xl font-bold leading-none">{s.value}</span>
              <span className="text-warm-white/45 text-xs uppercase tracking-widest mt-1">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
        style={
          mounted
            ? { animation: `hero-slide-up 0.6s 1.5s ${ease} both` }
            : { opacity: 0 }
        }
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
