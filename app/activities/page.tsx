import type { Metadata } from "next";
import Link from "next/link";
import { getExperiences } from "@/lib/api/experiences";
import ActivitiesGrid from "@/components/activities/ActivitiesGrid";

export const metadata: Metadata = {
  title: "Water Activities in Trincomalee: Try Diving, Fun Diving, Snorkeling & Whale Watching",
  description:
    "Five ocean activities in Trincomalee, Sri Lanka. No experience needed for most. Try diving from $65, snorkeling from $35, whale watching from $55. All equipment included, small groups.",
  alternates: { canonical: "https://divingclub.lk/activities" },
  openGraph: {
    title: "Water Activities in Trincomalee, Sri Lanka | Diving Club",
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
    name: "Water Activities | Diving Club Trincomalee",
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
            Whether you&apos;ve never seen a tank before or you&apos;re logging your hundredth dive, there&apos;s
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
            Give us a call and we&apos;ll match you to the right experience, whether it&apos;s your first time
            in the ocean or you&apos;re chasing blue whales.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://wa.me/94743945010"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 bg-tropic-coral text-white font-bold px-8 py-3.5 rounded-full hover:bg-[#d4603f] transition-colors text-sm"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
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
