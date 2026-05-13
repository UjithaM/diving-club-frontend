import Image from "next/image";
import Link from "next/link";
import type { Experience } from "@/lib/types";

const typeLabels: Record<string, string> = {
  "try-diving":     "Try Diving",
  "fun-diving":     "Fun Diving",
  snorkeling:       "Snorkeling",
  "whale-watching": "Whale Watching",
  "jet-ski":        "Jet Ski",
  "boat-tour":      "Boat Tour",
  "sunset-tour":    "Sunset Tour",
};

const typeTints: Record<string, string> = {
  "try-diving":     "bg-shallow-water/10",
  "fun-diving":     "bg-sunrise/10",
  snorkeling:       "bg-tropic-coral/10",
  "whale-watching": "bg-charcoal-sea/10",
  "jet-ski":        "bg-sunrise/10",
  "boat-tour":      "bg-shallow-water/10",
  "sunset-tour":    "bg-tropic-coral/10",
};

export default function ExperienceCard({ experience }: { experience: Experience }) {
  const tint = typeTints[experience.type] ?? "bg-shallow-water/10";
  const label = typeLabels[experience.type] ?? experience.type;

  return (
    <article className="bg-white border border-charcoal-sea/10 rounded-2xl overflow-hidden flex flex-col hover:-translate-y-1 hover:border-charcoal-sea/25 transition-all duration-200 cursor-pointer">
      {/* Image header */}
      <div className={`aspect-video ${tint} flex-shrink-0 relative overflow-hidden`}>
        {experience.image ? (
          <Image
            src={experience.image}
            alt={`${experience.name} in Trincomalee, Sri Lanka`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-sea/40 to-transparent" />
        <span className="absolute top-4 left-4 text-[10px] uppercase tracking-widest font-semibold text-warm-white/80">
          {label}
        </span>
        {experience.divesIncluded ? (
          <span className="absolute top-4 right-4 text-[10px] uppercase tracking-widest font-semibold text-warm-white/70">
            {experience.divesIncluded} dives
          </span>
        ) : null}
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
            className="inline-block bg-tropic-coral text-white text-sm font-semibold px-5 py-2 rounded-full hover:bg-[#d4603f] transition-colors duration-200"
          >
            View
          </Link>
        </div>
      </div>
    </article>
  );
}
