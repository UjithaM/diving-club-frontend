"use client";

import { useRef, useEffect, useState } from "react";
import AnimatedSection from "@/components/ui/AnimatedSection";

const ease = "cubic-bezier(0.16, 1, 0.3, 1)";

const sites = [
  {
    name: "Coral Garden",
    depth: "5–18 m",
    level: "All levels",
    description:
      "A shallow reef teeming with parrotfish, triggerfish, and — if you move slowly and stay quiet — a sleeping turtle tucked into the coral.",
    fromColor: "#1e5c54",
    toColor: "#0d2b35",
    accentHex: "#2A9D8F",
    badge: "bg-shallow-water",
  },
  {
    name: "Powder Blue Bay",
    depth: "8–25 m",
    level: "Open Water+",
    description:
      "Named for the schools of powder blue surgeonfish that swirl through the water in formation. The visibility on a clear day is something you won't forget.",
    fromColor: "#1a3a50",
    toColor: "#0d2230",
    accentHex: "#3B82F6",
    badge: "bg-blue-500",
  },
  {
    name: "Wreck of the Hermes",
    depth: "28–36 m",
    level: "Advanced",
    description:
      "A WWII-era vessel resting on a sandy bed. Lionfish guard the wheelhouse; reef sharks patrol the bow. One of Sri Lanka's most iconic wreck dives.",
    fromColor: "#4a2020",
    toColor: "#1a1520",
    accentHex: "#E76F51",
    badge: "bg-tropic-coral",
  },
];

function SiteCard({
  site,
  index,
  enableParallax,
}: {
  site: (typeof sites)[0];
  index: number;
  enableParallax: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setInView(true); observer.unobserve(el); }
      },
      { rootMargin: "-40px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!enableParallax) return;
    let rafId: number;
    let ticking = false;

    function update() {
      const card = cardRef.current;
      const bg = bgRef.current;
      const text = textRef.current;
      if (!card || !bg || !text) return;

      const rect = card.getBoundingClientRect();
      const progress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
      const clamped = Math.max(0, Math.min(1, progress));
      bg.style.transform = `translateY(${-12 + clamped * 24}%)`;
      text.style.transform = `translateY(${4 - clamped * 8}%)`;
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
  }, [enableParallax]);

  return (
    <div
      ref={cardRef}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView
          ? "perspective(1000px) rotateX(0deg) translateY(0)"
          : "perspective(1000px) rotateX(18deg) translateY(70px)",
        transformOrigin: "50% 100%",
        transition: `opacity 0.9s ${index * 0.12}s ${ease}, transform 0.9s ${index * 0.12}s ${ease}`,
      }}
    >
      <div className="rounded-2xl overflow-hidden relative h-96 group cursor-default hover:-translate-y-2.5 hover:scale-[1.02] transition-transform duration-300 ease-out">
        {/* Parallax background gradient */}
        <div
          ref={bgRef}
          className="parallax-layer absolute inset-[-12%]"
          style={{
            background: `linear-gradient(160deg, ${site.fromColor} 0%, ${site.toColor} 100%)`,
          }}
        />

        {/* Radial glow */}
        <div
          className="absolute inset-0 opacity-50"
          style={{
            background: `radial-gradient(ellipse at 30% 60%, ${site.accentHex}35 0%, transparent 60%)`,
          }}
        />

        {/* Grid texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(255,248,240,0.5) 40px), repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(255,248,240,0.5) 40px)`,
          }}
        />

        {/* Accent line at top */}
        <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: site.accentHex }} />

        {/* Content */}
        <div
          ref={textRef}
          className="parallax-layer absolute inset-0 p-7 flex flex-col justify-end"
        >
          <div className="mb-3 flex gap-2">
            <span className={`text-xs font-bold ${site.badge} text-warm-white px-3 py-1 rounded-full`}>
              {site.depth}
            </span>
            <span className="text-xs font-semibold bg-warm-white/15 text-warm-white px-3 py-1 rounded-full backdrop-blur-sm">
              {site.level}
            </span>
          </div>
          <h3 className="text-warm-white font-bold text-2xl mb-3">{site.name}</h3>
          <p className="text-warm-white/65 text-sm leading-relaxed max-w-xs">
            {site.description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function DiveSitesSection() {
  const [enableParallax, setEnableParallax] = useState(false);

  useEffect(() => {
    setEnableParallax(window.matchMedia("(min-width: 768px)").matches);
  }, []);

  return (
    <section
      className="py-24 px-6 relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, #0d2028 0%, #111c24 100%)" }}
    >
      <div className="max-w-6xl mx-auto">
        <AnimatedSection className="mb-14">
          <span className="flex items-center gap-3 mb-4">
            <span className="h-px w-8 bg-shallow-water" />
            <span className="text-shallow-water text-xs font-semibold tracking-[0.2em] uppercase">
              Explore Below
            </span>
          </span>
          <h2 className="text-warm-white text-3xl sm:text-5xl font-bold mb-4">
            Trincomalee&apos;s Best Dive Sites
          </h2>
          <p className="text-warm-white/50 text-lg max-w-lg">
            Every site has its own personality. Here are three that keep divers coming back year after year.
          </p>
        </AnimatedSection>

        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          style={{ perspective: "1000px" }}
        >
          {sites.map((site, i) => (
            <SiteCard key={site.name} site={site} index={i} enableParallax={enableParallax} />
          ))}
        </div>
      </div>
    </section>
  );
}
