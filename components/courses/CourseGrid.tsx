"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import type { Course } from "@/lib/types";

type Level = Course["level"] | "all";

const levelMeta: Record<Course["level"], { label: string; accent: string; textClass: string; bgClass: string }> = {
  beginner:     { label: "Beginner",     accent: "#2A9D8F", textClass: "text-shallow-water", bgClass: "bg-shallow-water/10" },
  advanced:     { label: "Advanced",     accent: "#F4A261", textClass: "text-sunrise",       bgClass: "bg-sunrise/10"       },
  specialty:    { label: "Specialty",    accent: "#E76F51", textClass: "text-tropic-coral",  bgClass: "bg-tropic-coral/10"  },
  professional: { label: "Professional", accent: "#264653", textClass: "text-charcoal-sea",  bgClass: "bg-charcoal-sea/10"  },
};

const ease = "cubic-bezier(0.16, 1, 0.3, 1)";

function CourseCard({ course, index }: { course: Course; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const meta = levelMeta[course.level];

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
        {/* Level-coloured top bar */}
        <div className="h-1.5 w-full flex-shrink-0" style={{ background: meta.accent }} />

        {/* Decorative card header */}
        <div
          className="h-32 flex items-center justify-center relative overflow-hidden flex-shrink-0"
          style={{ background: `${meta.accent}0d` }}
        >
          <span
            className="text-7xl font-bold select-none"
            style={{ color: meta.accent, opacity: 0.07 }}
          >
            PADI
          </span>
          {course.popular && (
            <span className="absolute top-3 right-3 text-[10px] font-bold tracking-widest uppercase px-2 py-1 rounded-full text-white" style={{ background: meta.accent }}>
              Popular
            </span>
          )}
        </div>

        <div className="p-6 flex flex-col flex-1">
          {/* Level badge + price */}
          <div className="flex items-center justify-between mb-3">
            <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${meta.bgClass} ${meta.textClass}`}>
              {meta.label}
            </span>
            <div className="text-right">
              <span className="font-bold text-charcoal-sea text-xl leading-none">${course.price}</span>
              <span className="text-charcoal-sea/35 text-xs ml-0.5">{course.currency}</span>
            </div>
          </div>

          {/* Course name */}
          <h2 className="font-bold text-charcoal-sea text-lg leading-snug mb-3 group-hover:text-shallow-water transition-colors">
            {course.name}
          </h2>

          {/* Description */}
          <p className="text-charcoal-sea/55 text-sm leading-relaxed mb-5 flex-1 line-clamp-3">
            {course.description}
          </p>

          {/* Meta chips */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            <span className="text-xs text-charcoal-sea/50 bg-charcoal-sea/5 px-2.5 py-1 rounded-full">
              {course.duration}
            </span>
            {course.maxDepth !== "N/A" && (
              <span className="text-xs text-charcoal-sea/50 bg-charcoal-sea/5 px-2.5 py-1 rounded-full">
                to {course.maxDepth}
              </span>
            )}
            <span className="text-xs text-charcoal-sea/50 bg-charcoal-sea/5 px-2.5 py-1 rounded-full">
              Age {course.minAge}+
            </span>
          </div>

          {/* CTA */}
          <Link
            href={`/courses/${course.slug}`}
            className="block text-center font-semibold py-3 rounded-full text-sm text-white bg-charcoal-sea hover:bg-shallow-water transition-colors"
          >
            View Course
          </Link>
        </div>
      </article>
    </div>
  );
}

const filterLabels: Record<Level, string> = {
  all: "All Courses",
  beginner: "Beginner",
  advanced: "Advanced",
  specialty: "Specialty",
  professional: "Professional",
};

export default function CourseGrid({ courses }: { courses: Course[] }) {
  const [activeLevel, setActiveLevel] = useState<Level>("all");

  const levels: Level[] = ["all", "beginner", "advanced", "specialty", "professional"];

  const counts: Record<Level, number> = {
    all: courses.length,
    beginner:     courses.filter((c) => c.level === "beginner").length,
    advanced:     courses.filter((c) => c.level === "advanced").length,
    specialty:    courses.filter((c) => c.level === "specialty").length,
    professional: courses.filter((c) => c.level === "professional").length,
  };

  const filtered = activeLevel === "all" ? courses : courses.filter((c) => c.level === activeLevel);

  return (
    <section className="bg-warm-white py-12 px-6 min-h-[60vh]">
      <div className="max-w-6xl mx-auto">

        {/* Filter pills */}
        <div className="flex flex-wrap gap-2 mb-10">
          {levels.map((level) => (
            <button
              key={level}
              onClick={() => setActiveLevel(level)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                activeLevel === level
                  ? "bg-charcoal-sea text-warm-white"
                  : "bg-charcoal-sea/8 text-charcoal-sea/60 hover:bg-charcoal-sea/15 hover:text-charcoal-sea"
              }`}
            >
              {filterLabels[level]}
              <span className={`ml-1.5 text-xs ${activeLevel === level ? "opacity-60" : "opacity-40"}`}>
                {counts[level]}
              </span>
            </button>
          ))}
        </div>

        {/* Result count */}
        <p className="text-charcoal-sea/40 text-sm mb-6">
          {filtered.length} {filtered.length === 1 ? "course" : "courses"}
          {activeLevel !== "all" && ` · ${filterLabels[activeLevel]}`}
        </p>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((course, i) => (
            <CourseCard key={course.slug} course={course} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
