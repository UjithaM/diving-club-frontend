import type { Metadata } from "next";
import Link from "next/link";
import { getExperiences } from "@/lib/api/experiences";
import ActivitiesGrid from "@/components/activities/ActivitiesGrid";

export const metadata: Metadata = {
  title: "Water Activities in Trincomalee — Try Diving, Fun Diving, Snorkeling & Whale Watching",
  description:
    "Five ocean activities in Trincomalee, Sri Lanka — no experience needed for most. Try diving from $65, snorkeling from $35, whale watching from $55. All equipment included, small groups.",
  alternates: { canonical: "https://divingclub.lk/activities" },
  openGraph: {
    title: "Water Activities in Trincomalee, Sri Lanka — Diving Club",
    description:
      "Try diving, fun diving, snorkeling, and whale watching in Trincomalee. No experience needed for most activities. Small groups, all gear included.",
    url: "https://divingclub.lk/activities",
  },
};

export default async function ActivitiesPage() {
  const experiences = await getExperiences();

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Water Activities — Diving Club Trincomalee",
    numberOfItems: experiences.length,
    itemListElement: experiences.map((exp, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "TouristAttraction",
        name: exp.name,
        description: exp.description,
        url: `https://divingclub.lk/activities/${exp.slug}`,
        offers: {
          "@type": "Offer",
          price: exp.price,
          priceCurrency: exp.currency,
          availability: "https://schema.org/InStock",
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

      {/* Page hero */}
      <section className="bg-charcoal-sea py-16 lg:py-24 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-warm-white/35 text-xs mb-8">
            <Link href="/" className="hover:text-warm-white/60 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-warm-white/60">Activities</span>
          </nav>

          <div className="flex items-center gap-3 mb-5">
            <span className="h-px w-6 bg-tropic-coral" />
            <span className="text-tropic-coral text-[11px] font-semibold tracking-[0.22em] uppercase">
              No experience needed · Trincomalee
            </span>
          </div>

          <h1 className="text-warm-white font-display text-[clamp(2.5rem,6vw,5rem)] font-extrabold leading-tight mb-5">
            Activities
          </h1>
          <p className="text-warm-white/55 text-base leading-relaxed max-w-xl mb-10">
            Whether you&apos;ve never seen a tank before or you&apos;re logging your hundredth dive — there&apos;s
            something in Trincomalee&apos;s waters waiting for you.
          </p>

          {/* Stats row */}
          <div className="flex flex-wrap gap-8 pt-6 border-t border-warm-white/10">
            {[
              { value: "5", label: "Activities" },
              { value: "From $35", label: "Starting price" },
              { value: "All ages", label: "From age 4+" },
              { value: "Small groups", label: "Personal attention" },
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
      <ActivitiesGrid experiences={experiences} />

      {/* Bottom CTA */}
      <section className="bg-charcoal-sea py-20 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-12 h-px bg-tropic-coral mx-auto mb-8" />
          <span className="block text-[11px] uppercase tracking-[0.25em] font-semibold text-tropic-coral/70 mb-4">Need guidance?</span>
          <h2 className="text-warm-white font-display text-[clamp(2rem,5vw,3.5rem)] font-extrabold leading-tight mb-5">
            Not sure which activity to pick?
          </h2>
          <p className="text-warm-white/50 text-base leading-relaxed max-w-lg mx-auto mb-10">
            Give us a call and we&apos;ll match you to the right experience — whether it&apos;s your first time
            in the ocean or you&apos;re chasing blue whales.
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
              href="/contact"
              className="inline-flex items-center gap-2 text-warm-white/50 font-semibold text-sm hover:text-warm-white transition-colors"
            >
              Send a message →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
