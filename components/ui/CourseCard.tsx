import Link from "next/link";
import type { Course } from "@/lib/types";

const levelColors: Record<Course["level"], string> = {
  beginner: "bg-shallow-water text-white",
  advanced: "bg-sunrise text-white",
  specialty: "bg-tropic-coral text-white",
  professional: "bg-charcoal-sea text-white",
};

const levelLabels: Record<Course["level"], string> = {
  beginner: "Beginner",
  advanced: "Advanced",
  specialty: "Specialty",
  professional: "Professional",
};

export default function CourseCard({ course }: { course: Course }) {
  return (
    <article className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col">
      {/* Image placeholder */}
      <div className="h-48 bg-shallow-water/20 flex items-center justify-center">
        <span className="text-shallow-water text-5xl">🤿</span>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-bold text-charcoal-sea text-lg leading-tight">{course.name}</h3>
          <span className={`shrink-0 text-xs font-semibold px-2 py-1 rounded-full ${levelColors[course.level]}`}>
            {levelLabels[course.level]}
          </span>
        </div>

        <p className="text-charcoal-sea/70 text-sm leading-relaxed mb-4 flex-1 line-clamp-3">
          {course.description}
        </p>

        <div className="flex items-center justify-between text-sm text-charcoal-sea/60 mb-4">
          <span>⏱ {course.duration}</span>
          <span className="font-semibold text-charcoal-sea text-base">
            ${course.price} <span className="text-xs font-normal">{course.currency}</span>
          </span>
        </div>

        <Link
          href={`/courses/${course.slug}`}
          className="block text-center bg-charcoal-sea text-warm-white font-semibold py-2.5 rounded-full hover:bg-shallow-water transition-colors text-sm"
        >
          View & Book
        </Link>
      </div>
    </article>
  );
}
