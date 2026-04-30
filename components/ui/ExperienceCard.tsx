import Image from "next/image";
import Link from "next/link";
import type { Experience } from "@/lib/types";

const typeLabels: Record<Experience["type"], string> = {
  "try-diving":     "Try Diving",
  "fun-diving":     "Fun Diving",
  snorkeling:       "Snorkeling",
  "whale-watching": "Whale Watching",
  "jet-ski":        "Jet Ski",
  "boat-tour":      "Boat Tour",
  "sunset-tour":    "Sunset Tour",
};

const typeTints: Record<Experience["type"], string> = {
  "try-diving":     "bg-shallow-water/10",
  "fun-diving":     "bg-sunrise/10",
  snorkeling:       "bg-tropic-coral/10",
  "whale-watching": "bg-charcoal-sea/10",
  "jet-ski":        "bg-sunrise/10",
  "boat-tour":      "bg-shallow-water/10",
  "sunset-tour":    "bg-tropic-coral/10",
};

const typeImages: Record<Experience["type"], { src: string; alt: string }> = {
  "try-diving": {
    src: "/assets/couple-scuba-diving-trincomalee.webp",
    alt: "Couple try diving together in Trincomalee, Sri Lanka",
  },
  "fun-diving": {
    src: "/assets/group-scuba-diving-trincomalee-sri-lanka.webp",
    alt: "Group of divers on a fun diving trip in Trincomalee, Sri Lanka",
  },
  snorkeling: {
    src: "/assets/scuba-diver-ok-signal-underwater-trincomalee.webp",
    alt: "Diver underwater giving OK signal during snorkeling tour in Trincomalee",
  },
  "whale-watching": {
    src: "/assets/sunrise-trincomalee-beach-sri-lanka.webp",
    alt: "Sunrise over Trincomalee beach, perfect for early morning whale watching",
  },
  "jet-ski": {
    src: "/assets/sunrise-trincomalee-beach-sri-lanka.webp",
    alt: "Jet ski on the water off Trincomalee, Sri Lanka",
  },
  "boat-tour": {
    src: "/assets/sunrise-trincomalee-beach-sri-lanka.webp",
    alt: "Boat tour along the Trincomalee coastline, Sri Lanka",
  },
  "sunset-tour": {
    src: "/assets/sunrise-trincomalee-beach-sri-lanka.webp",
    alt: "Sunset over Trincomalee bay during a coastal sunset tour",
  },
};

export default function ExperienceCard({ experience }: { experience: Experience }) {
  return (
    <article className="bg-white border border-charcoal-sea/10 rounded-2xl overflow-hidden flex flex-col hover:-translate-y-1 hover:border-charcoal-sea/25 transition-all duration-200 cursor-pointer">
      {/* Image header */}
      <div className={`aspect-video ${typeTints[experience.type]} flex-shrink-0 relative overflow-hidden`}>
        <Image
          src={typeImages[experience.type].src}
          alt={typeImages[experience.type].alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-sea/40 to-transparent" />
        <span className="absolute top-4 left-4 text-[10px] uppercase tracking-widest font-semibold text-warm-white/80">
          {typeLabels[experience.type]}
        </span>
        {experience.divesIncluded && (
          <span className="absolute top-4 right-4 text-[10px] uppercase tracking-widest font-semibold text-warm-white/70">
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
            className="inline-block bg-tropic-coral text-white text-sm font-semibold px-5 py-2 rounded-full hover:bg-[#d4603f] transition-colors duration-200"
          >
            View
          </Link>
        </div>
      </div>
    </article>
  );
}
