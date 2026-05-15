import type { Metadata } from "next";
import Link from "next/link";
import AnimatedSection from "@/components/ui/AnimatedSection";

export const metadata: Metadata = {
  title: "Scuba Diving in Sri Lanka | Reefs, Wrecks & Seasons | Diving Club",
  description:
    "Scuba diving in Sri Lanka: best destinations, seasons, PADI courses, and what you'll see. From Trincomalee wrecks to southern reef dives.",
  alternates: { canonical: "https://divingclub.lk/scuba-diving-in-sri-lanka" },
  openGraph: {
    title: "Scuba Diving in Sri Lanka | Reefs, Wrecks & Seasons | Diving Club",
    description:
      "Scuba diving in Sri Lanka: best destinations, seasons, PADI courses, and what you'll see. From Trincomalee wrecks to southern reef dives.",
    url: "https://divingclub.lk/scuba-diving-in-sri-lanka",
  },
};

const pageJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Scuba Diving in Sri Lanka: Complete Guide",
  description: "A comprehensive guide to scuba diving in Sri Lanka, covering dive destinations, seasons, marine life, and PADI courses.",
  url: "https://divingclub.lk/scuba-diving-in-sri-lanka",
  author: {
    "@type": "Organization",
    name: "Diving Club Trincomalee",
    url: "https://divingclub.lk",
  },
  publisher: {
    "@type": "Organization",
    name: "Diving Club",
    url: "https://divingclub.lk",
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, item: { "@id": "https://divingclub.lk", name: "Home" } },
    { "@type": "ListItem", position: 2, item: { "@id": "https://divingclub.lk/scuba-diving-in-sri-lanka", name: "Scuba Diving in Sri Lanka" } },
  ],
};

export default function DivingInSriLanka() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      {/* Hero */}
      <section className="bg-charcoal-sea py-16 lg:py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <nav className="flex items-center gap-2 text-warm-white/35 text-xs mb-8">
            <Link href="/" className="hover:text-warm-white/60 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-warm-white/60">Scuba Diving in Sri Lanka</span>
          </nav>

          <div className="flex items-center gap-3 mb-5">
            <span className="h-px w-6 bg-tropic-coral" aria-hidden="true" />
            <span className="text-tropic-coral text-[11px] font-semibold tracking-[0.22em] uppercase">
              Sri Lanka · Indian Ocean
            </span>
          </div>

          <h1 className="text-warm-white font-display text-[clamp(2.5rem,6vw,4.5rem)] font-extrabold leading-tight mb-6">
            Scuba Diving in Sri Lanka
          </h1>
          <p className="text-warm-white/60 text-lg leading-relaxed">
            Sri Lanka gets overlooked for diving. Most divers flying through Asia think Maldives or Thailand, and both are great. But Sri Lanka has WWII wrecks, year-round warm water (south coast October-April, east coast May-October), blue whale watching, and reef quality that competes with anywhere in the region. And a fraction of the crowds.
          </p>
        </div>
      </section>

      {/* Article */}
      <article className="bg-warm-white py-16 lg:py-24 px-6">
        <div className="max-w-3xl mx-auto">

          <AnimatedSection>
            <h2 className="text-charcoal-sea font-display text-3xl font-extrabold mb-5">Why dive in Sri Lanka?</h2>
            <p className="text-charcoal-sea/70 leading-relaxed mb-4">
              A few things set Sri Lanka apart from the more popular Southeast Asian diving destinations.
            </p>
            <p className="text-charcoal-sea/70 leading-relaxed mb-4">
              First, the marine diversity. The island sits at the crossroads of the Indian Ocean, with warm, nutrient-rich water on both coasts. You get tropical reef fish, turtles, reef sharks, mantas (seasonal), and on the east coast one of the best blue whale watching routes in the world. Blue whales. Not whale sharks. Actual blue whales, the largest animals on Earth, passing within a few kilometres of the coastline on annual migration.
            </p>
            <p className="text-charcoal-sea/70 leading-relaxed mb-4">
              Second, the wrecks. Sri Lanka has serious naval history. The east coast saw significant action in WWII. The Japanese air raid of 1942 sank several Royal Navy vessels in Trincomalee Bay, including HMS Hermes (aircraft carrier, 45-53 m) and HMS Vampire (destroyer). These are among the most historically significant wrecks in Asia, and they&apos;re diveable.
            </p>
            <p className="text-charcoal-sea/70 leading-relaxed mb-4">
              Third, and honestly most practically, Sri Lanka is not overcrowded. The dive sites don&apos;t have queues. You&apos;re not fighting for space on the reef. The marine life hasn&apos;t been harassed into hiding by thirty divers at a time. It&apos;s the kind of diving that&apos;s getting harder to find.
            </p>
          </AnimatedSection>

          <AnimatedSection className="mt-14">
            <h2 className="text-charcoal-sea font-display text-3xl font-extrabold mb-5">Best time to dive in Sri Lanka</h2>
            <p className="text-charcoal-sea/70 leading-relaxed mb-4">
              Sri Lanka has two coastlines, and two monsoon seasons, which means diving is available somewhere on the island almost year-round.
            </p>

            <div className="space-y-6 mt-6">
              <div className="border-l-4 border-shallow-water pl-5">
                <h3 className="text-charcoal-sea font-bold text-lg mb-2">East Coast (Trincomalee): May–October</h3>
                <p className="text-charcoal-sea/70 text-sm leading-relaxed">
                  The northeast monsoon (November-April) makes the east coast rough. May to October is the diving season, best conditions June to September. This is where we operate, from Sandy Cove in Trincomalee Bay. The WWII wrecks, Swami Rock, Pigeon Island National Park, and blue whale watching are all here.
                </p>
              </div>
              <div className="border-l-4 border-tropic-coral pl-5">
                <h3 className="text-charcoal-sea font-bold text-lg mb-2">South Coast (Unawatuna, Mirissa, Hikkaduwa): October–April</h3>
                <p className="text-charcoal-sea/70 text-sm leading-relaxed">
                  The southwest monsoon reverses things. South coast diving is best from October through April. Unawatuna and Hikkaduwa have good reef diving. Mirissa is the main whale watching destination on the south coast (blue and sperm whales, October to April). Dive quality varies more than the east coast, but access from Colombo is easier.
                </p>
              </div>
            </div>

            <p className="text-charcoal-sea/70 leading-relaxed mt-6">
              If you&apos;re planning a dedicated diving trip and want the best of what Sri Lanka offers, especially the wrecks and blue whales, the east coast in June or July is the call.
            </p>
          </AnimatedSection>

          <AnimatedSection className="mt-14">
            <h2 className="text-charcoal-sea font-display text-3xl font-extrabold mb-5">Marine life in Sri Lanka</h2>
            <p className="text-charcoal-sea/70 leading-relaxed mb-4">
              The list is long. Here&apos;s what you can realistically expect:
            </p>
            <ul className="space-y-3 mt-4">
              {[
                { heading: "Sea turtles", detail: "Both hawksbill and green turtles on most dives. Common year-round on both coasts." },
                { heading: "Reef sharks", detail: "Blacktip reef sharks at Pigeon Island. Occasional whitetips on deeper dives. Non-aggressive." },
                { heading: "Blue whales", detail: "East coast late April–early May; south coast (Mirissa) October–April. One of the best whale watching locations in the world." },
                { heading: "Spinner dolphins", detail: "Regular in Trincomalee Bay throughout the diving season. Often visible from the dive boats." },
                { heading: "Napoleon wrasse", detail: "At Klathipa Deep on the east coast. Large, curious, unhurried." },
                { heading: "Manta rays", detail: "Seasonal, more reliable in the Maldives, but sightings happen at deeper sites in Sri Lanka." },
                { heading: "Moray eels", detail: "Everywhere. Every dive, every site. Spotted, giant, and snowflake morays all represented." },
                { heading: "Nudibranchs", detail: "Good diversity on the wrecks and rocky sites. Worth bringing a macro lens." },
              ].map((item) => (
                <li key={item.heading} className="flex items-start gap-3">
                  <span className="mt-1.5 w-2 h-2 rounded-full bg-tropic-coral flex-shrink-0" />
                  <span className="text-charcoal-sea/70 text-sm leading-relaxed">
                    <strong className="text-charcoal-sea font-semibold">{item.heading}:</strong> {item.detail}
                  </span>
                </li>
              ))}
            </ul>
          </AnimatedSection>

          <AnimatedSection className="mt-14">
            <h2 className="text-charcoal-sea font-display text-3xl font-extrabold mb-5">PADI courses in Sri Lanka</h2>
            <p className="text-charcoal-sea/70 leading-relaxed mb-4">
              Most reputable dive operators in Sri Lanka are PADI affiliated, so your certification, wherever you do it, is internationally recognised. We offer 15 PADI courses in Trincomalee, from the beginner-friendly <Link href="/courses/discover-scuba-diving" className="text-tropic-coral hover:text-tropic-coral/80">Discover Scuba experience</Link> through to <Link href="/courses/divemaster" className="text-tropic-coral hover:text-tropic-coral/80">Divemaster</Link> training.
            </p>
            <p className="text-charcoal-sea/70 leading-relaxed mb-4">
              The most popular course for tourists is <Link href="/courses/open-water-diver" className="text-tropic-coral hover:text-tropic-coral/80">PADI Open Water</Link>: four days, certifies you to 18 m, valid worldwide. Sri Lanka is a good place to do it because the conditions are generally forgiving for beginners: warm water, reasonable visibility, no strong currents on most training sites.
            </p>
            <p className="text-charcoal-sea/70 leading-relaxed mb-4">
              Specialty courses worth doing in Trincomalee specifically: <Link href="/courses/wreck-diving" className="text-tropic-coral hover:text-tropic-coral/80">Wreck Diving</Link> (the WWII wrecks here are the reason to do this specialty in Sri Lanka rather than elsewhere), <Link href="/courses/deep-diving" className="text-tropic-coral hover:text-tropic-coral/80">Deep Diving</Link> (the Klathipa wall and access to deeper wreck sections), and <Link href="/courses/underwater-photography" className="text-tropic-coral hover:text-tropic-coral/80">Underwater Photography</Link> (the visual diversity and good light make this a genuinely productive photography destination).
            </p>
          </AnimatedSection>

          <AnimatedSection className="mt-14">
            <h2 className="text-charcoal-sea font-display text-3xl font-extrabold mb-5">Trincomalee vs. south coast diving</h2>
            <p className="text-charcoal-sea/70 leading-relaxed mb-4">
              The honest comparison: the east coast (Trincomalee) has the better diving. The wrecks are more significant, the reef fish density is higher, the blue whale experience in season is extraordinary, and the dive sites aren&apos;t overcrowded.
            </p>
            <p className="text-charcoal-sea/70 leading-relaxed mb-4">
              The south coast is more convenient from Colombo (3–4 hours vs. 5–7 hours), and if you&apos;re combining diving with a cultural tour or limited to the October–April window, Unawatuna or Hikkaduwa are solid options. But if diving is the main reason you&apos;re in Sri Lanka, get yourself to Trincomalee.
            </p>
          </AnimatedSection>

          <AnimatedSection className="mt-14">
            <h2 className="text-charcoal-sea font-display text-3xl font-extrabold mb-5">Practical information</h2>
            <p className="text-charcoal-sea/70 leading-relaxed mb-4">
              <strong className="text-charcoal-sea">Water temperature:</strong> 27–30°C year-round on the east coast. A 3 mm wetsuit is fine for most people; some prefer 5 mm for multiple dives per day.
            </p>
            <p className="text-charcoal-sea/70 leading-relaxed mb-4">
              <strong className="text-charcoal-sea">Visibility:</strong> 10–25 m in season on the east coast, depending on site and conditions.
            </p>
            <p className="text-charcoal-sea/70 leading-relaxed mb-4">
              <strong className="text-charcoal-sea">Currency:</strong> Sri Lankan Rupees (LKR). Most dive operators accept USD. We do.
            </p>
            <p className="text-charcoal-sea/70 leading-relaxed mb-4">
              <strong className="text-charcoal-sea">Flights:</strong> Colombo (Bandaranaike International) is the main hub. Multiple daily flights from most Asian cities, and direct routes from the UK, Middle East, and Australia.
            </p>
            <p className="text-charcoal-sea/70 leading-relaxed mb-4">
              <strong className="text-charcoal-sea">Getting to Trincomalee:</strong> Train (7 hours from Colombo Fort, scenic and comfortable), car hire (5–6 hours), or domestic flight (40 minutes, limited availability).
            </p>
          </AnimatedSection>

          {/* CTAs */}
          <AnimatedSection className="mt-16 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              href="/scuba-diving-in-trincomalee"
              className="group flex flex-col gap-2 bg-charcoal-sea rounded-2xl p-6 hover:bg-shallow-water transition-colors"
            >
              <span className="text-warm-white/50 text-xs uppercase tracking-widest">Deep dive</span>
              <span className="text-warm-white font-bold text-lg leading-snug group-hover:text-warm-white">
                Diving in Trincomalee →
              </span>
            </Link>
            <Link
              href="/dive-sites"
              className="group flex flex-col gap-2 bg-tropic-coral rounded-2xl p-6 hover:bg-[#d4603f] transition-colors"
            >
              <span className="text-white/70 text-xs uppercase tracking-widest">Explore</span>
              <span className="text-white font-bold text-lg leading-snug">
                All Dive Sites →
              </span>
            </Link>
          </AnimatedSection>
        </div>
      </article>
    </>
  );
}
