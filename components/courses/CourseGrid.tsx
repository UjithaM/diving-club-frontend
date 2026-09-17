"use client";

import { useState } from "react";
import type { Course } from "@/lib/types";
import CourseCard from "@/components/ui/CourseCard";
import { FilterBar } from "@/components/ui/FilterBar";

type Level = Course["level"] | "all";

const filterLabels: Record<Level, string> = {
  all: "All Courses",
  beginner: "Beginner",
  advanced: "Advanced",
  specialty: "Specialty",
  professional: "Professional",
};

const levels: Level[] = ["all", "beginner", "advanced", "specialty", "professional"];

export default function CourseGrid({ courses }: { courses: Course[] }) {
  const [activeLevel, setActiveLevel] = useState<Level>("all");

  const filtered = activeLevel === "all" ? courses : courses.filter((c) => c.level === activeLevel);

  return (
    <section className="zone-shallow py-12 lg:py-16 px-5 sm:px-8 min-h-[60vh]">
      <div className="max-w-6xl mx-auto">
        <FilterBar
          options={levels.map((level) => ({
            value: level,
            label: filterLabels[level],
            count: level === "all" ? courses.length : courses.filter((c) => c.level === level).length,
          }))}
          active={activeLevel}
          onChange={(v) => setActiveLevel(v as Level)}
          summary={`${filtered.length} ${filtered.length === 1 ? "course" : "courses"}${
            activeLevel !== "all" ? ` · ${filterLabels[activeLevel]}` : ""
          }`}
        />

        {/* key on the filter so the cards re-enter when the set changes */}
        <ul key={activeLevel} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filtered.map((course, i) => (
            <li key={course.slug} className="rise-in" style={{ "--i": i % 6 } as React.CSSProperties}>
              <CourseCard
                course={course}
                headingLevel={2}
                cta="View Course"
                meta={[
                  ...(course.maxDepth !== "N/A" ? [`to ${course.maxDepth}`] : []),
                  `Age ${course.minAge}+`,
                ]}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
