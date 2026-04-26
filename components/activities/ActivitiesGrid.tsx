"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import type { Experience } from "@/lib/types";

type ActivityType = Experience["type"] | "all";

const typeMeta: Record<Experience["type"], { label: string; accent: string; textClass: string; bgClass: string; emoji: string }> = {
  "try-diving":     { label: "Try Diving",     accent: "#2A9D8F", textClass: "text-shallow-water", bgClass: "bg-shallow-water/10", emoji: "🤿" },
  "fun-diving":     { label: "Fun Diving",     accent: "#F4A261", textClass: "text-sunrise",       bgClass: "bg-sunrise/10",       emoji: "🐠" },
  snorkeling:       { label: "Snorkeling",     accent: "#E76F51", textClass: "text-tropic-coral",  bgClass: "bg-tropic-coral/10",  emoji: "🐟" },
  "whale-watching": { label: "Whale Watching", accent: "#264653", textClass: "text-charcoal-sea",  bgClass: "bg-charcoal-sea/10",  emoji: "🐋" },
};

const ease = "cubic-bezier(0.16, 1, 0.3, 1)";

function ActivityCard({ experience, index }: { experience: Experience; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const meta = typeMeta[experience.type];

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
        {/* Type-coloured top bar */}
        <div className="h-1.5 w-full flex-shrink-0" style={{ background: meta.accent }} />

        {/* Decorative header */}
        <div
          className="h-32 flex items-center justify-center relative overflow-hidden flex-shrink-0"
          style={{ background: `${meta.accent}0d` }}
        >
          <span className="text-6xl select-none">{meta.emoji}</span>
          {experience.popular && (
            <span className="absolute top-3 right-3 text-[10px] font-bold tracking-widest uppercase px-2 py-1 rounded-full text-white" style={{ background: meta.accent }}>
              Popular
            </span>
          )}
        </div>

        <div className="p-6 flex flex-col flex-1">
          {/* Type badge + price */}
          <div className="flex items-center justify-between mb-3">
            <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${meta.bgClass} ${meta.textClass}`}>
              {meta.label}
            </span>
            <div className="text-right">
              <span className="font-bold text-charcoal-sea text-xl leading-none">${experience.price}</span>
              <span className="text-charcoal-sea/35 text-xs ml-0.5">{experience.currency}</span>
            </div>
          </div>

          {/* Name */}
          <h2 className="font-bold text-charcoal-sea text-lg leading-snug mb-3 group-hover:text-shallow-water transition-colors">
            {experience.name}
          </h2>

          {/* Description */}
          <p className="text-charcoal-sea/55 text-sm leading-relaxed mb-5 flex-1 line-clamp-3">
            {experience.description}
          </p>

          {/* Meta chips */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            <span className="text-xs text-charcoal-sea/50 bg-charcoal-sea/5 px-2.5 py-1 rounded-full">
              ⏱ {experience.duration}
            </span>
            <span className="text-xs text-charcoal-sea/50 bg-charcoal-sea/5 px-2.5 py-1 rounded-full">
              Age {experience.minAge}+
            </span>
            {experience.divesIncluded && (
              <span className="text-xs text-shallow-water bg-shallow-water/10 px-2.5 py-1 rounded-full font-medium">
                {experience.divesIncluded} dive{experience.divesIncluded > 1 ? "s" : ""} included
              </span>
            )}
          </div>

          {/* CTA */}
          <Link
            href={`/activities/${experience.slug}`}
            className="block text-center font-semibold py-3 rounded-full text-sm text-white bg-charcoal-sea hover:bg-shallow-water transition-colors"
          >
            View & Book
          </Link>
        </div>
      </article>
    </div>
  );
}

const filterLabels: Record<ActivityType, string> = {
  all:              "All Activities",
  "try-diving":     "Try Diving",
  "fun-diving":     "Fun Diving",
  snorkeling:       "Snorkeling",
  "whale-watching": "Whale Watching",
};

export default function ActivitiesGrid({ experiences }: { experiences: Experience[] }) {
  const [activeType, setActiveType] = useState<ActivityType>("all");

  const types: ActivityType[] = ["all", "try-diving", "fun-diving", "snorkeling", "whale-watching"];

  const counts: Record<ActivityType, number> = {
    all:              experiences.length,
    "try-diving":     experiences.filter((e) => e.type === "try-diving").length,
    "fun-diving":     experiences.filter((e) => e.type === "fun-diving").length,
    snorkeling:       experiences.filter((e) => e.type === "snorkeling").length,
    "whale-watching": experiences.filter((e) => e.type === "whale-watching").length,
  };

  const filtered = activeType === "all" ? experiences : experiences.filter((e) => e.type === activeType);

  return (
    <section className="bg-warm-white py-12 px-6 min-h-[60vh]">
      <div className="max-w-6xl mx-auto">

        {/* Filter pills */}
        <div className="flex flex-wrap gap-2 mb-10">
          {types.map((type) => (
            <button
              key={type}
              onClick={() => setActiveType(type)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                activeType === type
                  ? "bg-charcoal-sea text-warm-white"
                  : "bg-charcoal-sea/8 text-charcoal-sea/60 hover:bg-charcoal-sea/15 hover:text-charcoal-sea"
              }`}
            >
              {filterLabels[type]}
              <span className={`ml-1.5 text-xs ${activeType === type ? "opacity-60" : "opacity-40"}`}>
                {counts[type]}
              </span>
            </button>
          ))}
        </div>

        {/* Result count */}
        <p className="text-charcoal-sea/40 text-sm mb-6">
          {filtered.length} {filtered.length === 1 ? "activity" : "activities"}
          {activeType !== "all" && ` · ${filterLabels[activeType]}`}
        </p>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((exp, i) => (
            <ActivityCard key={exp.slug} experience={exp} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
