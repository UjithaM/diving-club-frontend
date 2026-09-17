import Image from "next/image";
import Link from "next/link";
import type { Course, HomeCourse } from "@/lib/types";
import { Arrow } from "@/components/ui/Button";
import { Diver, Fins, Mask, Turtle } from "@/components/illustrations/Sea";

const levels: Record<Course["level"], { label: string; band: string; art: React.ReactNode }> = {
  beginner: { label: "Beginner", band: "bg-sunrise text-surface-dark", art: <Mask className="w-11" /> },
  advanced: { label: "Advanced", band: "bg-tropic-coral text-surface-dark", art: <Fins className="w-7" /> },
  specialty: { label: "Specialty", band: "bg-shallow-water text-surface-dark", art: <Turtle className="w-12" /> },
  professional: { label: "Professional", band: "bg-charcoal-sea text-warm-white", art: <Diver className="w-16" /> },
};

/**
 * A course as the card a diver gets at the end of it: a certification card with a photo, the
 * level band across the top, and the two numbers that decide it — how long, how much. The whole
 * card is the link (via the name).
 */
export default function CourseCard({
  course,
  meta = [],
  cta = "View",
  headingLevel = 3,
}: {
  course: HomeCourse;
  /** Extra facts shown as chips under the description (listing page: depth, minimum age). */
  meta?: string[];
  cta?: string;
  /** h3 under a section heading; h2 when the card sits directly under the page's h1. */
  headingLevel?: 2 | 3;
}) {
  const level = levels[course.level];
  const Heading = headingLevel === 2 ? "h2" : "h3";
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[14px] bg-warm-white text-charcoal-sea shadow-[0_22px_40px_-26px_rgba(15,30,37,0.7)] transition-[translate,rotate,box-shadow] duration-300 ease-(--ease-surface) hover:-translate-y-2 hover:shadow-[0_30px_50px_-26px_rgba(15,30,37,0.75)]">
      <div className={`${level.band} flex items-center justify-between gap-3 px-5 h-11`}>
        <p className="text-label uppercase font-semibold flex items-center gap-2.5">
          {level.label}
          {course.popular && (
            <span className="bg-surface-dark text-warm-white px-1.5 py-0.5 rounded-[3px]">Popular</span>
          )}
        </p>
        <span aria-hidden="true" className="flex items-center">{level.art}</span>
      </div>

      <div className="p-4 pb-0">
        <div className="plate aspect-[16/10] rounded-[8px] bg-shallow-water/20">
          {course.image ? (
            <Image
              src={course.image}
              alt={`${course.name} scuba diving course in Trincomalee, Sri Lanka`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 82vw, 30vw"
            />
          ) : (
            // No photo in the admin yet: the level's own drawing, not an empty grey box.
            <span className="absolute inset-0 flex items-center justify-center bg-shallow-water/25" aria-hidden="true">
              <span className="bob scale-[2.2]">{level.art}</span>
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col px-5 pt-5 pb-5">
        <Heading className="text-sub font-extrabold leading-tight">
          <Link href={`/courses/${course.slug}`} className="after:absolute after:inset-0 after:content-['']">
            {course.name}
          </Link>
        </Heading>
        <p className="text-meta text-muted mt-2 line-clamp-2">{course.description}</p>
        {meta.length > 0 && (
          <p className="mt-3 flex flex-wrap gap-1.5">
            {meta.map((m) => (
              <span key={m} className="rounded-full bg-charcoal-sea/8 px-2.5 py-1 text-xs font-semibold text-charcoal-sea tabular">
                {m}
              </span>
            ))}
          </p>
        )}

        <div className="mt-auto pt-5">
          <div className="grid grid-cols-2 border-y-2 border-charcoal-sea divide-x divide-charcoal-sea/15">
            <p className="font-display font-extrabold text-sub tabular py-3">{course.duration}</p>
            <p className="font-display font-extrabold text-sub tabular py-3 pl-4">
              ${course.price}
              <span className="font-sans text-label uppercase font-semibold ml-1.5 align-middle text-muted">{course.currency}</span>
            </p>
          </div>
          <span
            className="mt-4 flex items-center justify-between min-h-11 px-4 rounded-[6px] bg-surface-dark text-warm-white text-sm font-semibold transition-colors group-hover:bg-action group-hover:text-action-ink"
            aria-hidden="true"
          >
            {cta} <Arrow />
          </span>
        </div>
      </div>
    </article>
  );
}
