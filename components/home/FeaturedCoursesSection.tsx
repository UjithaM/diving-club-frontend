import type { HomeCourse, Promotion } from "@/lib/types";
import CourseCard from "@/components/ui/CourseCard";
import { cardDeal } from "@/lib/discount";
import Section from "@/components/ui/Section";
import Button from "@/components/ui/Button";
import { Fish, Tang } from "@/components/illustrations/Sea";

/** A small school, staggered so it reads as a group rather than a single fish. */
function School() {
  const fish = [
    { top: "0%", delay: "0s", w: "w-9", tang: false, rest: "46%" },
    { top: "30%", delay: "-1.2s", w: "w-7", tang: true, rest: "54%" },
    { top: "12%", delay: "-2.1s", w: "w-6", tang: false, rest: "62%" },
    { top: "52%", delay: "-0.6s", w: "w-8", tang: false, rest: "70%" },
    { top: "40%", delay: "-2.8s", w: "w-6", tang: true, rest: "78%" },
  ];
  return (
    <div className="ambient lane inset-x-0 top-0 h-10 lg:top-16 lg:h-24" aria-hidden="true">
      {fish.map((f, i) =>
        f.tang ? (
          <Tang key={i} body="var(--color-warm-white)" className={`swim absolute left-0 ${f.w}`} style={{ top: f.top, animationDelay: f.delay, "--swim-time": "28s", "--rest": f.rest } as React.CSSProperties} />
        ) : (
          <Fish key={i} className={`swim absolute left-0 ${f.w}`} style={{ top: f.top, animationDelay: f.delay, "--swim-time": "28s", "--rest": f.rest } as React.CSSProperties} />
        )
      )}
    </div>
  );
}

/** Dealt like a hand of cards on wide screens; straightens as you reach for one. */
const tilt = ["lg:-rotate-1 lg:translate-y-3", "lg:rotate-0", "lg:rotate-1 lg:translate-y-3"];

/** `promotions` are the live ones; each card finds its own deal, since each item has its own value. */
export default function FeaturedCoursesSection({ courses, promotions = [] }: { courses: HomeCourse[]; promotions?: Promotion[] }) {
  return (
    <Section zone="shallow" depth={6} log="PADI Certified" className="relative overflow-hidden">
      <School />
      <div className="relative flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8 lg:mb-14 reveal">
        <div>
          <h2 className="text-section font-extrabold">Earn Your PADI Certification</h2>
          <p className="text-lead mt-4 max-w-[46ch]">
            From your very first breath underwater to leading dive expeditions. We&apos;ll get you there.
          </p>
        </div>
        <Button href="/courses" variant="line" arrow className="shrink-0">
          View all courses
        </Button>
      </div>

      <ul className="rail relative md:grid-cols-3 md:gap-6 lg:gap-8 list-none pb-2">
        {courses.map((course, i) => (
          <li
            key={course.slug}
            className={`reveal transition-[rotate,translate] duration-300 ease-(--ease-surface) hover:rotate-0 hover:translate-y-0 ${tilt[i % tilt.length]}`}
          >
            <CourseCard course={course} deal={cardDeal(promotions, "course", course.slug)} />
          </li>
        ))}
      </ul>
    </Section>
  );
}
