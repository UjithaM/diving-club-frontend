import Link from "next/link";
import type { Experience } from "@/lib/types";

const typeLabels: Record<Experience["type"], string> = {
  "try-diving": "Try Diving",
  "fun-diving": "Fun Diving",
  snorkeling: "Snorkeling",
  "whale-watching": "Whale Watching",
};

const typeTints: Record<Experience["type"], string> = {
  "try-diving": "bg-shallow-water/10",
  "fun-diving": "bg-sunrise/10",
  snorkeling: "bg-tropic-coral/10",
  "whale-watching": "bg-charcoal-sea/10",
};

export default function ExperienceCard({ experience }: { experience: Experience }) {
  return (
    <article className="bg-white border border-charcoal-sea/10 rounded-2xl overflow-hidden flex flex-col hover:-translate-y-1 hover:border-charcoal-sea/25 transition-all duration-200 cursor-pointer">
      {/* Image header placeholder */}
      <div className={`aspect-video ${typeTints[experience.type]} flex-shrink-0 relative`}>
        <span className="absolute top-4 left-4 text-[10px] uppercase tracking-widest font-semibold text-charcoal-sea/40">
          {typeLabels[experience.type]}
        </span>
        {experience.divesIncluded && (
          <span className="absolute top-4 right-4 text-[10px] uppercase tracking-widest font-semibold text-charcoal-sea/40">
            {experience.divesIncluded} dives
          </span>
        )}
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-bold text-charcoal-sea text-lg leading-tight mb-2">
          {experience.name}
        </h3>

        <p className="text-charcoal-sea/60 text-sm leading-relaxed mb-5 flex-1 line-clamp-3">
          {experience.description}
        </p>

        <div className="flex items-end justify-between">
          <div>
            <span className="text-[11px] uppercase tracking-widest text-charcoal-sea/40 block mb-0.5">
              {experience.duration}
            </span>
            <span className="text-2xl font-extrabold text-charcoal-sea leading-none">
              ${experience.price}
              <span className="text-sm font-normal text-charcoal-sea/40 ml-1">{experience.currency}</span>
            </span>
          </div>
          <Link
            href={`/activities/${experience.slug}`}
            className="text-sm font-semibold text-tropic-coral underline underline-offset-4 hover:text-charcoal-sea transition-colors"
          >
            View &amp; Book
          </Link>
        </div>
      </div>
    </article>
  );
}
