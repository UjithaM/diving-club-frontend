"use client";

import Image from "next/image";
import Link from "next/link";
import AnimatedSection from "@/components/ui/AnimatedSection";

const sites = [
  {
    name: "Coral Garden",
    depth: "5–18 m",
    level: "All levels",
    description:
      "A shallow reef teeming with parrotfish, triggerfish, and — if you move slowly and stay quiet — a sleeping turtle tucked into the coral.",
    tint: "bg-tropic-coral/20",
    direction: "left" as const,
    image: "/assets/scuba-diver-ok-signal-underwater-trincomalee.webp",
    imageAlt: "Scuba diver giving the OK signal underwater at Coral Garden reef, Trincomalee",
  },
  {
    name: "Powder Blue Bay",
    depth: "8–25 m",
    level: "Open Water+",
    description:
      "Named for the schools of powder blue surgeonfish that swirl through the water in formation. The visibility on a clear day is something you won't forget.",
    tint: "bg-blue-500/15",
    direction: "right" as const,
    image: "/assets/group-scuba-diving-trincomalee-sri-lanka.webp",
    imageAlt: "Group of scuba divers exploring Powder Blue Bay in Trincomalee, Sri Lanka",
  },
  {
    name: "Wreck of the Hermes",
    depth: "28–36 m",
    level: "Advanced",
    description:
      "A WWII-era vessel resting on a sandy bed. Lionfish guard the wheelhouse; reef sharks patrol the bow. One of Sri Lanka's most iconic wreck dives.",
    tint: "bg-tropic-coral/20",
    direction: "left" as const,
    image: "/assets/scuba-diver-exploring-shipwreck-trincomalee.webp",
    imageAlt: "Scuba diver exploring a historic shipwreck at the bottom of Trincomalee bay",
  },
];

export default function DiveSitesSection() {
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
              All 12 sites →
            </Link>
          </div>
        </AnimatedSection>

        {/* Alternating rows */}
        <div className="flex flex-col gap-12 lg:gap-20">
          {sites.map((site) => (
            <AnimatedSection key={site.name} direction={site.direction}>
              <div
                className={`flex flex-col lg:flex-row gap-8 lg:gap-16 items-center${site.direction === "right" ? " lg:flex-row-reverse" : ""}`}
              >
                {/* Dive site photo */}
                <div
                  className={`w-full lg:w-1/2 flex-shrink-0 aspect-[4/3] rounded-3xl ${site.tint} overflow-hidden relative`}
                >
                  <Image
                    src={site.image}
                    alt={site.imageAlt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-sea/30 to-transparent" />
                </div>

                {/* Text block */}
                <div className="flex-1">
                  <div className="flex gap-2 mb-5">
                    <span className="text-[10px] uppercase tracking-widest font-semibold text-tropic-coral/60 border border-shallow-water/20 px-3 py-1 rounded-full">
                      {site.depth}
                    </span>
                    <span className="text-[10px] uppercase tracking-widest font-semibold text-warm-white/30 border border-warm-white/10 px-3 py-1 rounded-full">
                      {site.level}
                    </span>
                  </div>

                  <h3 className="text-warm-white text-3xl font-extrabold font-display leading-tight mb-5">
                    {site.name}
                  </h3>

                  <div className="w-16 h-px border-t border-warm-white/15 mb-5" />

                  <p className="text-warm-white/55 text-base leading-relaxed mb-6">
                    {site.description}
                  </p>

                  <Link
                    href="/dive-sites"
                    className="text-sm font-semibold text-tropic-coral hover:text-warm-white transition-colors"
                  >
                    Learn more →
                  </Link>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
