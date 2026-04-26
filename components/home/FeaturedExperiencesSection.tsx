"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import type { Experience } from "@/lib/types";
import ExperienceCard from "@/components/ui/ExperienceCard";
import AnimatedSection from "@/components/ui/AnimatedSection";

const ease = "cubic-bezier(0.16, 1, 0.3, 1)";

function AnimatedCard({ children, index }: { children: React.ReactNode; index: number }) {
  const ref = useRef<HTMLLIElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
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

  return (
    <li
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView
          ? "perspective(900px) rotateX(0deg) translateY(0)"
          : "perspective(900px) rotateX(22deg) translateY(80px)",
        transformOrigin: "50% 100%",
        transition: `opacity 0.85s ${index * 0.15}s ${ease}, transform 0.85s ${index * 0.15}s ${ease}`,
        listStyle: "none",
      }}
    >
      <div className="hover:-translate-y-3 hover:scale-[1.02] transition-transform duration-300 ease-out">
        {children}
      </div>
    </li>
  );
}

export default function FeaturedExperiencesSection({ experiences }: { experiences: Experience[] }) {
  return (
    <section
      className="py-24 px-6"
      style={{ background: "linear-gradient(160deg, #1a3a40 0%, #0f2a30 100%)" }}
    >
      <div className="max-w-6xl mx-auto">
        <AnimatedSection className="mb-14">
          <span className="flex items-center gap-3 mb-4">
            <span className="h-px w-8 bg-shallow-water" />
            <span className="text-shallow-water text-xs font-semibold tracking-[0.2em] uppercase">
              Get in the Water
            </span>
          </span>
          <h2 className="text-warm-white text-3xl sm:text-5xl font-bold mb-4">Dive Right In</h2>
          <p className="text-warm-white/55 text-lg max-w-lg">
            First-timers and experienced divers alike — there&apos;s something in these waters for everyone.
          </p>
        </AnimatedSection>

        <ul
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-0"
          style={{ perspective: "900px" }}
        >
          {experiences.map((experience, i) => (
            <AnimatedCard key={experience.slug} index={i}>
              <ExperienceCard experience={experience} />
            </AnimatedCard>
          ))}
        </ul>

        <AnimatedSection className="mt-12 text-center" delay={0.2}>
          <Link
            href="/activities"
            className="inline-flex items-center gap-2 text-shallow-water font-semibold hover:text-warm-white transition-colors"
          >
            See All Activities
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}
