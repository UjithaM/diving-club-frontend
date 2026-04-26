import Link from "next/link";
import type { Experience } from "@/lib/types";

const typeColors: Record<Experience["type"], string> = {
  "try-diving": "bg-shallow-water text-white",
  "fun-diving": "bg-sunrise text-white",
  snorkeling: "bg-tropic-coral text-white",
  "whale-watching": "bg-charcoal-sea text-white",
};

const typeLabels: Record<Experience["type"], string> = {
  "try-diving": "Try Diving",
  "fun-diving": "Fun Diving",
  snorkeling: "Snorkeling",
  "whale-watching": "Whale Watching",
};

const typeEmoji: Record<Experience["type"], string> = {
  "try-diving": "🤿",
  "fun-diving": "🐠",
  snorkeling: "🐟",
  "whale-watching": "🐋",
};

export default function ExperienceCard({ experience }: { experience: Experience }) {
  return (
    <article className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col">
      {/* Image placeholder */}
      <div className="h-48 bg-sunrise/10 flex items-center justify-center">
        <span className="text-5xl">{typeEmoji[experience.type]}</span>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-bold text-charcoal-sea text-lg leading-tight">{experience.name}</h3>
          <span className={`shrink-0 text-xs font-semibold px-2 py-1 rounded-full ${typeColors[experience.type]}`}>
            {typeLabels[experience.type]}
          </span>
        </div>

        <p className="text-charcoal-sea/70 text-sm leading-relaxed mb-4 flex-1 line-clamp-3">
          {experience.description}
        </p>

        <div className="flex items-center justify-between text-sm text-charcoal-sea/60 mb-4">
          <span>⏱ {experience.duration}</span>
          <span className="font-semibold text-charcoal-sea text-base">
            ${experience.price} <span className="text-xs font-normal">{experience.currency}</span>
          </span>
        </div>

        {experience.divesIncluded && (
          <p className="text-xs text-shallow-water font-medium mb-3">
            🫧 {experience.divesIncluded} dive{experience.divesIncluded > 1 ? "s" : ""} included
          </p>
        )}

        <Link
          href={`/activities/${experience.slug}`}
          className="block text-center bg-charcoal-sea text-warm-white font-semibold py-2.5 rounded-full hover:bg-shallow-water transition-colors text-sm"
        >
          View & Book
        </Link>
      </div>
    </article>
  );
}
