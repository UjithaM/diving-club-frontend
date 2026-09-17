"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { DiveSite } from "@/lib/types";
import { FilterBar } from "@/components/ui/FilterBar";
import { Arrow } from "@/components/ui/Button";
import { Diver } from "@/components/illustrations/Sea";
import { parseDepth } from "@/lib/depth";

type Difficulty = DiveSite["difficulty"] | "all";

const chip: Record<string, string> = {
  Beginner: "bg-shallow-water",
  Intermediate: "bg-sunrise",
  Advanced: "bg-tropic-coral",
  Technical: "bg-warm-white",
};

/** A small vertical gauge: the site's depth range on a 0–30 m (or deeper) scale. */
function MiniGauge({ depth }: { depth: string }) {
  const r = parseDepth(depth);
  if (!r) return null;
  const floor = Math.max(30, Math.ceil(r[1] / 10) * 10);
  const pct = (m: number) => `${(m / floor) * 100}%`;
  return (
    <div className="relative h-full w-10 shrink-0" aria-hidden="true">
      <span className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-warm-white/25" />
      <span
        className="absolute left-1/2 w-2.5 -translate-x-1/2 rounded-full bg-sunrise transition-colors group-hover:bg-tropic-coral"
        style={{ top: pct(r[0]), height: pct(r[1] - r[0]) }}
      />
      <span className="absolute left-1/2 w-9 -translate-x-1/2 -translate-y-1/2" style={{ top: pct(r[1]) }}>
        <Diver className="block w-full rotate-90" suit="var(--color-shallow-water)" line="var(--color-surface-dark)" />
      </span>
    </div>
  );
}

function DiveSiteCard({ site }: { site: DiveSite }) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[14px] zone-deep ring-1 ring-warm-white/10 transition-[translate] duration-300 ease-(--ease-surface) hover:-translate-y-1.5">
      {site.image && (
        <div className="plate aspect-[16/9] rounded-none">
          <Image
            src={site.image}
            alt={`${site.name} dive site in Trincomalee, Sri Lanka`}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
      )}
      <div className="flex flex-1 gap-4 p-5 sm:p-6">
        <div className="flex flex-1 flex-col">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <span className={`rounded-full px-2.5 py-1 text-label uppercase font-semibold text-surface-dark ${chip[site.difficulty] ?? "bg-shallow-water"}`}>
              {site.difficulty}
            </span>
            {site.popular && (
              <span className="rounded-full border border-warm-white/40 px-2.5 py-0.5 text-label uppercase font-semibold">Popular</span>
            )}
          </div>

          <p className="font-display text-readout font-extrabold tabular text-sunrise">{site.depth}</p>

          <h2 className="mt-2 text-sub font-extrabold leading-tight">
            <Link href={`/dive-sites/${site.slug}`} className="after:absolute after:inset-0 after:content-['']">
              {site.name}
            </Link>
          </h2>

          <p className="mt-2 mb-4 flex-1 text-meta text-muted line-clamp-3">{site.description}</p>

          <p className="mb-5 flex flex-wrap gap-1.5">
            <span className="rounded-full bg-warm-white/10 px-2.5 py-1 text-xs font-semibold tabular">{site.boatTime}</span>
            <span className="rounded-full bg-warm-white/10 px-2.5 py-1 text-xs font-semibold">{site.season}</span>
          </p>

          <span className="inline-flex min-h-11 w-fit items-center gap-2 text-sm font-bold text-sunrise group-hover:text-warm-white" aria-hidden="true">
            Explore Site <Arrow />
          </span>
        </div>
        <MiniGauge depth={site.depth} />
      </div>
    </article>
  );
}

const filterLabels: Record<string, string> = {
  all: "All Sites",
  Beginner: "Beginner",
  Intermediate: "Intermediate",
  Advanced: "Advanced",
  Technical: "Technical",
};

const difficulties: Difficulty[] = ["all", "Beginner", "Intermediate", "Advanced", "Technical"];

export default function DiveSiteGrid({ sites }: { sites: DiveSite[] }) {
  const [active, setActive] = useState<Difficulty>("all");
  const filtered = active === "all" ? sites : sites.filter((s) => s.difficulty === active);

  return (
    <section className="zone-shallow py-12 lg:py-16 px-5 sm:px-8 min-h-[60vh]">
      <div className="max-w-6xl mx-auto">
        <FilterBar
          options={difficulties.map((d) => ({
            value: d,
            label: filterLabels[d],
            count: d === "all" ? sites.length : sites.filter((s) => s.difficulty === d).length,
          }))}
          active={active}
          onChange={setActive}
          summary={`${filtered.length} ${filtered.length === 1 ? "dive site" : "dive sites"}${
            active !== "all" ? ` · ${filterLabels[active]}` : ""
          }`}
        />

        <ul key={active} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filtered.map((site, i) => (
            <li key={site.slug} className="rise-in" style={{ "--i": i % 6 } as React.CSSProperties}>
              <DiveSiteCard site={site} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
