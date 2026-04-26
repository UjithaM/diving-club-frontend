"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import type { Course } from "@/lib/types";
import CourseCard from "@/components/ui/CourseCard";
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

export default function FeaturedCoursesSection({ courses }: { courses: Course[] }) {
  return (
    <section className="bg-shallow-water py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection className="mb-14">
          <span className="flex items-center gap-3 mb-4">
            <span className="h-px w-8 bg-warm-white/50" />
            <span className="text-warm-white/70 text-xs font-semibold tracking-[0.2em] uppercase">
              PADI Certified
            </span>
          </span>
          <h2 className="text-warm-white text-3xl sm:text-5xl font-bold mb-4">
            Earn Your PADI Certification
          </h2>
          <p className="text-warm-white/65 text-lg max-w-lg">
            From your very first breath underwater to leading dive expeditions — we&apos;ll get you there.
          </p>
        </AnimatedSection>

        <ul
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-0"
          style={{ perspective: "900px" }}
        >
          {courses.map((course, i) => (
            <AnimatedCard key={course.slug} index={i}>
              <CourseCard course={course} />
            </AnimatedCard>
          ))}
        </ul>

        <AnimatedSection className="mt-12 text-center" delay={0.2}>
          <Link
            href="/courses"
            className="inline-flex items-center gap-2 text-warm-white font-semibold hover:text-warm-white/70 transition-colors"
          >
            View All Courses
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}
