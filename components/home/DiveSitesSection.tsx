"use client";

import Image from "next/image";
import Link from "next/link";
import AnimatedSection from "@/components/ui/AnimatedSection";
import type { DiveSite } from "@/lib/types";

const directions = ["left", "right", "left"] as const;
const tints = ["bg-tropic-coral/20", "bg-blue-500/15", "bg-tropic-coral/20"];

export default function DiveSitesSection({ sites }: { sites: DiveSite[] }) {
  if (sites.length === 0) return null;

  return (
    <section className="bg-charcoal-sea py-16 lg:py-28 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <AnimatedSection className="mb-12 lg:mb-20">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-6 h-px bg-tropic-coral" />
            <span className="text-[11px] uppercase tracking-[0.22em] font-semibold text-tropic-coral">
              Explore Below
            </span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-extrabold leading-tight text-warm-white font-display">
                Trincomalee&apos;s Best Dive Sites
              </h2>
              <p className="text-warm-white/50 text-base leading-relaxed mt-4 max-w-xl">
                Every site has its own personality. Here are three that keep divers coming back year after year.
              </p>
            </div>
            <Link
              href="/dive-sites"
              className="text-sm font-semibold text-tropic-coral hover:text-warm-white transition-colors flex-shrink-0"
            >
              All dive sites →
            </Link>
          </div>
        </AnimatedSection>

        {/* Alternating rows */}
        <div className="flex flex-col gap-12 lg:gap-20">
          {sites.map((site, i) => {
            const dir = directions[i % directions.length];
            const tint = tints[i % tints.length];
            return (
              <AnimatedSection key={site.slug} direction={dir}>
                <div
                  className={`flex flex-col lg:flex-row gap-8 lg:gap-16 items-center${dir === "right" ? " lg:flex-row-reverse" : ""}`}
                >
                  {/* Dive site photo */}
                  <div className={`w-full lg:w-1/2 flex-shrink-0 aspect-[4/3] rounded-3xl ${tint} overflow-hidden relative`}>
                    {site.image ? (
                      <Image
                        src={site.image}
                        alt={`${site.name} dive site in Trincomalee, Sri Lanka`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                    ) : null}
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal-sea/30 to-transparent" />
                  </div>

                  {/* Text block */}
                  <div className="flex-1">
                    <div className="flex gap-2 mb-5">
                      <span className="text-[10px] uppercase tracking-widest font-semibold text-tropic-coral/60 border border-shallow-water/20 px-3 py-1 rounded-full">
                        {site.depth}
                      </span>
                      <span className="text-[10px] uppercase tracking-widest font-semibold text-warm-white/30 border border-warm-white/10 px-3 py-1 rounded-full">
                        {site.difficulty}
                      </span>
                    </div>

                    <h3 className="text-warm-white text-3xl font-extrabold font-display leading-tight mb-5">
                      {site.name}
                    </h3>

                    <div className="w-16 h-px border-t border-warm-white/15 mb-5" />

                    <p className="text-warm-white/55 text-base leading-relaxed mb-6 line-clamp-4">
                      {site.description}
                    </p>

                    <Link
                      href={`/dive-sites/${site.slug}`}
                      className="text-sm font-semibold text-tropic-coral hover:text-warm-white transition-colors"
                    >
                      Learn more →
                    </Link>
                  </div>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}
