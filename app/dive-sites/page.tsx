import type { Metadata } from "next";
import Link from "next/link";
import { getDiveSites } from "@/lib/api/dive-sites";
import DiveSiteGrid from "@/components/dive-sites/DiveSiteGrid";

export const metadata: Metadata = {
  title: "Dive Sites in Trincomalee, Sri Lanka",
  description:
    "Explore 12 world-class dive sites in Trincomalee — from Swami Rock's Hindu statues and hawksbill turtles to the HMS Hermes aircraft carrier wreck. Reefs, walls, and WWII wrecks.",
  alternates: { canonical: "https://divingclub.lk/dive-sites" },
  openGraph: {
    title: "Dive Sites in Trincomalee — Reefs, Wrecks & Marine Life",
    description:
      "12 dive sites around Trincomalee Bay — Swami Rock, Pigeon Island, HMS Hermes wreck, SS British Sergeant, Coral Garden, and more. All levels, May–October season.",
    url: "https://divingclub.lk/dive-sites",
  },
};

export default async function DiveSitesPage() {
  const sites = await getDiveSites();

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Dive Sites in Trincomalee, Sri Lanka — Diving Club",
    numberOfItems: sites.length,
    itemListElement: sites.map((site, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "TouristAttraction",
        name: site.name,
        description: site.description.slice(0, 160).trimEnd() + "…",
        url: `https://divingclub.lk/dive-sites/${site.slug}`,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Trincomalee",
          addressCountry: "LK",
        },
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />

      {/* Hero */}
      <section className="bg-charcoal-sea py-16 lg:py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <nav className="flex items-center gap-2 text-warm-white/35 text-xs mb-8">
            <Link href="/" className="hover:text-warm-white/60 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-warm-white/60">Dive Sites</span>
          </nav>

          <div className="flex items-center gap-3 mb-5">
            <span className="h-px w-6 bg-tropic-coral" aria-hidden="true" />
            <span className="text-tropic-coral text-[11px] font-semibold tracking-[0.22em] uppercase">
              Trincomalee · East Coast Sri Lanka
            </span>
          </div>

          <h1 className="text-warm-white font-display text-[clamp(2.5rem,6vw,5rem)] font-extrabold leading-tight mb-5">
            Dive Sites
          </h1>
          <p className="text-warm-white/55 text-base leading-relaxed max-w-xl mb-10">
            WWII wrecks. Coral gardens. Reef walls with Hindu deity statues at depth. Blacktip sharks at a national park. Trincomalee has genuinely extraordinary diving — here&apos;s what&apos;s waiting.
          </p>

          <div className="flex flex-wrap gap-8 pt-6 border-t border-warm-white/10">
            {[
              { value: "12", label: "Dive Sites" },
              { value: "5–53 m", label: "Depth Range" },
              { value: "May–Oct", label: "Best Season" },
              { value: "10–25 m", label: "Avg. Visibility" },
            ].map((s) => (
              <div key={s.label} className="flex flex-col">
                <span className="text-warm-white text-2xl font-extrabold font-display leading-none">{s.value}</span>
                <span className="text-warm-white/35 text-[10px] uppercase tracking-widest mt-1">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <DiveSiteGrid sites={sites} />

      {/* Bottom CTA */}
      <section className="bg-charcoal-sea py-20 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-12 h-px bg-tropic-coral mx-auto mb-8" />
          <span className="block text-[11px] uppercase tracking-[0.25em] font-semibold text-tropic-coral/70 mb-4">
            Not sure where to start?
          </span>
          <h2 className="text-warm-white font-display text-[clamp(2rem,5vw,3.5rem)] font-extrabold leading-tight mb-5">
            We&apos;ll pick the right site for you
          </h2>
          <p className="text-warm-white/50 text-base leading-relaxed max-w-lg mx-auto mb-10">
            Tell us your certification level and what kind of diving you&apos;re after — wrecks, coral, big fish, photography — and we&apos;ll build the day around it.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="tel:0743945010"
              className="inline-flex items-center gap-2.5 bg-tropic-coral text-white font-bold px-8 py-3.5 rounded-full hover:bg-[#d4603f] transition-colors text-sm"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              0743 945 010
            </a>
            <Link
              href="/courses"
              className="inline-flex items-center gap-2 text-warm-white/50 font-semibold text-sm hover:text-warm-white transition-colors"
            >
              Browse PADI courses →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
