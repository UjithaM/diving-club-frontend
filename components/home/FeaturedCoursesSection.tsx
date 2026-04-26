"use client";

import Link from "next/link";
import type { Course } from "@/lib/types";
import CourseCard from "@/components/ui/CourseCard";
import AnimatedSection from "@/components/ui/AnimatedSection";

export default function FeaturedCoursesSection({ courses }: { courses: Course[] }) {
  return (
    <section className="bg-charcoal-sea py-16 lg:py-28 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-14">
          <AnimatedSection>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-6 h-px bg-tropic-coral" />
              <span className="text-[11px] uppercase tracking-[0.22em] font-semibold text-tropic-coral">
                PADI Certified
              </span>
            </div>
            <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-extrabold leading-tight text-warm-white font-display">
              Earn Your PADI Certification
            </h2>
            <p className="text-warm-white/55 text-base leading-relaxed mt-3 max-w-lg">
              From your very first breath underwater to leading dive expeditions — we&apos;ll get you there.
            </p>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <Link
              href="/courses"
              className="text-sm font-semibold text-warm-white/40 hover:text-warm-white transition-colors whitespace-nowrap"
            >
              View all courses →
            </Link>
          </AnimatedSection>
        </div>

        {/* Cards */}
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 p-0">
          {courses.map((course, i) => (
            <AnimatedSection key={course.slug} delay={i * 0.1} className="list-none">
              <CourseCard course={course} />
            </AnimatedSection>
          ))}
        </ul>
      </div>
    </section>
  );
}
