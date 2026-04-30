"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import type { DiveSite } from "@/lib/types";

type Difficulty = DiveSite["difficulty"] | "all";

const difficultyMeta: Record<DiveSite["difficulty"], { label: string; accent: string; textClass: string; bgClass: string }> = {
  Beginner:     { label: "Beginner",     accent: "#2A9D8F", textClass: "text-shallow-water", bgClass: "bg-shallow-water/10" },
  Intermediate: { label: "Intermediate", accent: "#F4A261", textClass: "text-sunrise",       bgClass: "bg-sunrise/10"       },
  Advanced:     { label: "Advanced",     accent: "#E76F51", textClass: "text-tropic-coral",  bgClass: "bg-tropic-coral/10"  },
  Technical:    { label: "Technical",    accent: "#264653", textClass: "text-charcoal-sea",  bgClass: "bg-charcoal-sea/10"  },
};

const ease = "cubic-bezier(0.16, 1, 0.3, 1)";

function DiveSiteCard({ site, index }: { site: DiveSite; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const meta = difficultyMeta[site.difficulty];

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); observer.unobserve(el); } },
      { rootMargin: "-30px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="h-full"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(40px)",
        transition: `opacity 0.6s ${(index % 3) * 0.1}s ${ease}, transform 0.6s ${(index % 3) * 0.1}s ${ease}`,
      }}
    >
      <article className="bg-white rounded-2xl overflow-hidden flex flex-col h-full shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
        <div className="h-1.5 w-full flex-shrink-0" style={{ background: meta.accent }} />

        <div
          className="h-32 flex items-center justify-center relative overflow-hidden flex-shrink-0"
          style={{ background: `${meta.accent}0d` }}
        >
          <svg width="56" height="56" viewBox="0 0 56 56" fill="none" aria-hidden="true" style={{ opacity: 0.12 }}>
            <ellipse cx="28" cy="38" rx="18" ry="8" fill={meta.accent} />
            <path d="M10 28 Q28 8 46 28" stroke={meta.accent} strokeWidth="3" fill="none" />
            <circle cx="28" cy="22" r="6" fill={meta.accent} />
          </svg>
          {site.popular && (
            <span className="absolute top-3 right-3 text-[10px] font-bold tracking-widest uppercase px-2 py-1 rounded-full text-white" style={{ background: meta.accent }}>
              Popular
            </span>
          )}
        </div>

        <div className="p-6 flex flex-col flex-1">
          <div className="flex items-center justify-between mb-3">
            <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${meta.bgClass} ${meta.textClass}`}>
              {meta.label}
            </span>
            <span className="text-charcoal-sea/40 text-xs font-medium">{site.depth}</span>
          </div>

          <h2 className="font-bold text-charcoal-sea text-lg leading-snug mb-3 group-hover:text-shallow-water transition-colors">
            {site.name}
          </h2>

          <p className="text-charcoal-sea/55 text-sm leading-relaxed mb-5 flex-1 line-clamp-3">
            {site.description}
          </p>

          <div className="flex flex-wrap gap-1.5 mb-5">
            <span className="text-xs text-charcoal-sea/50 bg-charcoal-sea/5 px-2.5 py-1 rounded-full">
              ⏱ {site.boatTime}
            </span>
            <span className="text-xs text-charcoal-sea/50 bg-charcoal-sea/5 px-2.5 py-1 rounded-full">
              {site.season}
            </span>
          </div>

          <Link
            href={`/dive-sites/${site.slug}`}
            className="block text-center font-semibold py-3 rounded-full text-sm text-white bg-charcoal-sea hover:bg-shallow-water transition-colors"
          >
            Explore Site
          </Link>
        </div>
      </article>
    </div>
  );
}

const filterLabels: Record<Difficulty, string> = {
  all: "All Sites",
  Beginner: "Beginner",
  Intermediate: "Intermediate",
  Advanced: "Advanced",
  Technical: "Technical",
};

export default function DiveSiteGrid({ sites }: { sites: DiveSite[] }) {
  const [activeDifficulty, setActiveDifficulty] = useState<Difficulty>("all");

  const difficulties: Difficulty[] = ["all", "Beginner", "Intermediate", "Advanced", "Technical"];

  const counts: Record<Difficulty, number> = {
    all: sites.length,
    Beginner:     sites.filter((s) => s.difficulty === "Beginner").length,
    Intermediate: sites.filter((s) => s.difficulty === "Intermediate").length,
    Advanced:     sites.filter((s) => s.difficulty === "Advanced").length,
    Technical:    sites.filter((s) => s.difficulty === "Technical").length,
  };

  const filtered = activeDifficulty === "all" ? sites : sites.filter((s) => s.difficulty === activeDifficulty);

  return (
    <section className="bg-warm-white py-12 px-6 min-h-[60vh]">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-wrap gap-2 mb-10">
          {difficulties.map((d) => (
            <button
              key={d}
              onClick={() => setActiveDifficulty(d)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                activeDifficulty === d
                  ? "bg-charcoal-sea text-warm-white"
                  : "bg-charcoal-sea/8 text-charcoal-sea/60 hover:bg-charcoal-sea/15 hover:text-charcoal-sea"
              }`}
            >
              {filterLabels[d]}
              <span className={`ml-1.5 text-xs ${activeDifficulty === d ? "opacity-60" : "opacity-40"}`}>
                {counts[d]}
              </span>
            </button>
          ))}
        </div>

        <p className="text-charcoal-sea/40 text-sm mb-6">
          {filtered.length} {filtered.length === 1 ? "dive site" : "dive sites"}
          {activeDifficulty !== "all" && ` · ${filterLabels[activeDifficulty]}`}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((site, i) => (
            <DiveSiteCard key={site.slug} site={site} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
