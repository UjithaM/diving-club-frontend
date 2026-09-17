"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Experience } from "@/lib/types";
import { FilterBar } from "@/components/ui/FilterBar";
import { Arrow } from "@/components/ui/Button";
import { activityPhotos } from "@/lib/photos";
import { Diver, Fish, Mask, Tang, Turtle } from "@/components/illustrations/Sea";

type ActivityType = Experience["type"] | "all";

const typeMeta: Record<string, { label: string; chip: string; art: React.ReactNode }> = {
  "try-diving":     { label: "Try Diving",     chip: "bg-shallow-water", art: <Diver className="w-40" /> },
  "fun-diving":     { label: "Fun Diving",     chip: "bg-sunrise",       art: <Diver className="w-40" /> },
  snorkeling:       { label: "Snorkeling",     chip: "bg-tropic-coral",  art: <Mask className="w-28" /> },
  "whale-watching": { label: "Whale Watching", chip: "bg-shallow-water", art: <Turtle className="w-32" /> },
  "jet-ski":        { label: "Jet Ski",        chip: "bg-sunrise",       art: <Tang className="w-20" /> },
  "boat-tour":      { label: "Boat Tour",      chip: "bg-shallow-water", art: <Fish className="w-24" /> },
  "sunset-tour":    { label: "Sunset Tour",    chip: "bg-tropic-coral",  art: <Fish className="w-24" /> },
};

/** Admin can add an activity type any day — an unmapped one must render, not crash the page. */
const defaultTypeMeta = { label: "Activity", chip: "bg-shallow-water", art: <Diver className="w-40" /> };

function ActivityCard({ experience }: { experience: Experience }) {
  const meta = typeMeta[experience.type] ?? defaultTypeMeta;
  const fallback = activityPhotos[experience.type];
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[14px] bg-warm-white text-charcoal-sea shadow-[0_22px_40px_-26px_rgba(15,30,37,0.55)] ring-1 ring-charcoal-sea/10 transition-[translate,box-shadow] duration-300 ease-(--ease-surface) hover:-translate-y-1.5">
      <div className="plate aspect-[4/3] rounded-none bg-shallow-water">
        {experience.image || fallback ? (
          <Image
            src={experience.image || fallback!.src}
            alt={experience.image ? `${experience.name} in Trincomalee, Sri Lanka` : fallback!.alt}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <span className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
            <span className="bob">{meta.art}</span>
          </span>
        )}
        <span className={`absolute left-0 top-0 ${meta.chip} px-3 py-2 text-label uppercase font-semibold text-surface-dark`}>
          {meta.label}
        </span>
        {experience.popular && (
          <span className="absolute right-3 top-3 rounded-full bg-surface-dark px-2.5 py-1 text-label uppercase font-semibold text-warm-white">
            Popular
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h2 className="text-sub font-extrabold leading-tight">
          <Link href={`/activities/${experience.slug}`} className="after:absolute after:inset-0 after:content-['']">
            {experience.name}
          </Link>
        </h2>
        <p className="mt-2 mb-4 flex-1 text-meta text-muted line-clamp-3">{experience.description}</p>

        <p className="mb-5 flex flex-wrap gap-1.5">
          <span className="rounded-full bg-charcoal-sea/8 px-2.5 py-1 text-xs font-semibold tabular">{experience.duration}</span>
          <span className="rounded-full bg-charcoal-sea/8 px-2.5 py-1 text-xs font-semibold tabular">Age {experience.minAge}+</span>
          {experience.divesIncluded && (
            <span className="rounded-full bg-shallow-water px-2.5 py-1 text-xs font-semibold text-surface-dark">
              {experience.divesIncluded} dive{experience.divesIncluded > 1 ? "s" : ""} included
            </span>
          )}
        </p>

        <div className="flex items-center justify-between gap-4 border-t-2 border-charcoal-sea pt-4">
          <p className="font-display text-readout font-extrabold tabular">
            ${experience.price}
            <span className="ml-1.5 align-middle font-sans text-label uppercase font-semibold text-muted">{experience.currency}</span>
          </p>
          <span
            className="inline-flex min-h-11 items-center gap-2 rounded-[10px] bg-surface-dark px-4 text-sm font-semibold text-warm-white transition-colors group-hover:bg-action group-hover:text-action-ink"
            aria-hidden="true"
          >
            View & Book <Arrow />
          </span>
        </div>
      </div>
    </article>
  );
}

const filterLabels: Record<string, string> = {
  all: "All Activities",
  "try-diving": "Try Diving",
  "fun-diving": "Fun Diving",
  snorkeling: "Snorkeling",
  "whale-watching": "Whale Watching",
  "jet-ski": "Jet Ski",
  "boat-tour": "Boat Tour",
  "sunset-tour": "Sunset Tour",
};

const types: ActivityType[] = ["all", "try-diving", "fun-diving", "snorkeling", "whale-watching", "jet-ski", "boat-tour", "sunset-tour"];

export default function ActivitiesGrid({ experiences }: { experiences: Experience[] }) {
  const [activeType, setActiveType] = useState<ActivityType>("all");
  const filtered = activeType === "all" ? experiences : experiences.filter((e) => e.type === activeType);

  return (
    <section className="zone-shallow py-12 lg:py-16 px-5 sm:px-8 min-h-[60vh]">
      <div className="max-w-6xl mx-auto">
        <FilterBar
          options={types.map((t) => ({
            value: t,
            label: filterLabels[t],
            count: t === "all" ? experiences.length : experiences.filter((e) => e.type === t).length,
          }))}
          active={activeType}
          onChange={setActiveType}
          summary={`${filtered.length} ${filtered.length === 1 ? "activity" : "activities"}${
            activeType !== "all" ? ` · ${filterLabels[activeType]}` : ""
          }`}
        />

        <ul key={activeType} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filtered.map((exp, i) => (
            <li key={exp.slug} className="rise-in" style={{ "--i": i % 6 } as React.CSSProperties}>
              <ActivityCard experience={exp} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
