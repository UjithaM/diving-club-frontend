"use client";

import Link from "next/link";
import type { Experience } from "@/lib/types";
import ExperienceCard from "@/components/ui/ExperienceCard";
import AnimatedSection from "@/components/ui/AnimatedSection";

export default function FeaturedExperiencesSection({ experiences }: { experiences: Experience[] }) {
  return (
    <section className="bg-warm-white py-16 lg:py-28 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-14">
          <AnimatedSection>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-6 h-px bg-tropic-coral" />
              <span className="text-[11px] uppercase tracking-[0.22em] font-semibold text-tropic-coral">
                Get in the Water
              </span>
            </div>
            <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-extrabold leading-tight text-charcoal-sea font-display">
              Dive Right In
            </h2>
            <p className="text-charcoal-sea/55 text-base leading-relaxed mt-3 max-w-lg">
              First-timers and experienced divers alike, there&apos;s something in these waters for everyone.
            </p>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <Link
              href="/activities"
              className="text-sm font-semibold text-charcoal-sea/40 hover:text-charcoal-sea transition-colors whitespace-nowrap"
            >
              See all activities →
            </Link>
          </AnimatedSection>
        </div>

        {/* Cards */}
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 p-0">
          {experiences.map((experience, i) => (
            <AnimatedSection key={experience.slug} delay={i * 0.1} className="list-none">
              <ExperienceCard experience={experience} />
            </AnimatedSection>
          ))}
        </ul>
      </div>
    </section>
  );
}
