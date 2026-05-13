import Image from "next/image";
import Link from "next/link";
import type { Course } from "@/lib/types";

const levelLabels: Record<Course["level"], string> = {
  beginner: "Beginner",
  advanced: "Advanced",
  specialty: "Specialty",
  professional: "Professional",
};

const levelHeaderGradients: Record<Course["level"], string> = {
  beginner: "from-tropic-coral/20 to-charcoal-sea/50",
  advanced: "from-sunrise/20 to-charcoal-sea/50",
  specialty: "from-tropic-coral/20 to-charcoal-sea/50",
  professional: "from-charcoal-sea/40 to-charcoal-sea/70",
};

const levelAccents: Record<Course["level"], string> = {
  beginner: "text-tropic-coral",
  advanced: "text-sunrise",
  specialty: "text-tropic-coral",
  professional: "text-warm-white/60",
};

export default function CourseCard({ course }: { course: Course }) {
  return (
    <article className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden flex flex-col hover:-translate-y-1 hover:border-white/25 transition-all duration-200 cursor-pointer">
      {/* Image header */}
      <div
        className={`aspect-video flex-shrink-0 relative overflow-hidden bg-gradient-to-br ${levelHeaderGradients[course.level]}`}
      >
        {course.image ? (
          <Image
            src={course.image}
            alt={`${course.name} scuba diving course in Trincomalee, Sri Lanka`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-sea/50 to-transparent" />
        <span className={`absolute top-4 left-4 text-[10px] uppercase tracking-widest font-semibold ${levelAccents[course.level]}`}>
          {levelLabels[course.level]}
        </span>
        {course.popular && (
          <span className="absolute top-4 right-4 text-[10px] uppercase tracking-widest font-semibold text-warm-white/70">
            Popular
          </span>
        )}
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-bold text-warm-white text-lg leading-tight mb-2">
          {course.name}
        </h3>

        <p className="text-warm-white/50 text-sm leading-relaxed mb-5 flex-1 line-clamp-3">
          {course.description}
        </p>

        <div className="flex items-end justify-between">
          <div>
            <span className="text-[11px] uppercase tracking-widest text-warm-white/30 block mb-0.5">
              {course.duration}
            </span>
            <span className="text-2xl font-extrabold text-warm-white leading-none">
              ${course.price}
              <span className="text-sm font-normal text-warm-white/30 ml-1">{course.currency}</span>
            </span>
          </div>
          <Link
            href={`/courses/${course.slug}`}
            className="inline-block bg-tropic-coral text-white text-sm font-semibold px-5 py-2 rounded-full hover:bg-[#d4603f] transition-colors duration-200"
          >
            View
          </Link>
        </div>
      </div>
    </article>
  );
}
