import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import type { Article, BreadcrumbList, WithContext } from "schema-dts";
import { safeJsonLd } from "@/lib/jsonld";

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

const pageJsonLd: WithContext<Article> = {
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

const breadcrumbJsonLd: WithContext<BreadcrumbList> = {
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(pageJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(breadcrumbJsonLd) }} />

      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Scuba Diving in Sri Lanka" }]}
        notes="Sri Lanka · Indian Ocean"
        title={<>Scuba Diving in Sri Lanka</>}
        lead={<>Sri Lanka gets overlooked for diving. Most divers flying through Asia think Maldives or Thailand, and both are great. But Sri Lanka has WWII wrecks, year-round warm water (south coast October-April, east coast May-October), blue whale watching, and reef quality that competes with anywhere in the region. And a fraction of the crowds.</>}
        art="turtle"
      />

      {/* Article */}
      <article className="zone-surface py-12 lg:py-20 px-5 sm:px-8 border-t-2 border-charcoal-sea/10">
        <div className="max-w-6xl mx-auto grid gap-10 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-16">
          <nav aria-label="Sections" className="hidden lg:block lg:sticky lg:top-24 lg:self-start border-l-2 border-shallow-water pl-2">
            <ol>
              <li><a href="#why-dive-in-sri-lanka" className="block rounded-[8px] px-3 py-2 text-sm font-semibold hover:bg-shallow-water/15 transition-colors">Why dive in Sri Lanka?</a></li>
              <li><a href="#best-time-to-dive-in-sri-lanka" className="block rounded-[8px] px-3 py-2 text-sm font-semibold hover:bg-shallow-water/15 transition-colors">Best time to dive in Sri Lanka</a></li>
              <li><a href="#marine-life-in-sri-lanka" className="block rounded-[8px] px-3 py-2 text-sm font-semibold hover:bg-shallow-water/15 transition-colors">Marine life in Sri Lanka</a></li>
              <li><a href="#padi-courses-in-sri-lanka" className="block rounded-[8px] px-3 py-2 text-sm font-semibold hover:bg-shallow-water/15 transition-colors">PADI courses in Sri Lanka</a></li>
              <li><a href="#trincomalee-vs-south-coast-diving" className="block rounded-[8px] px-3 py-2 text-sm font-semibold hover:bg-shallow-water/15 transition-colors">Trincomalee vs. south coast diving</a></li>
              <li><a href="#practical-information" className="block rounded-[8px] px-3 py-2 text-sm font-semibold hover:bg-shallow-water/15 transition-colors">Practical information</a></li>
            </ol>
          </nav>
          <div className="max-w-[68ch]">

          <div className="reveal">
            <h2 id="why-dive-in-sri-lanka" className="scroll-mt-24 text-[1.75rem] lg:text-[2.25rem] leading-[1.05] tracking-[-0.02em] font-extrabold mb-5">Why dive in Sri Lanka?</h2>
            <p className="text-charcoal-sea/85 text-[1.0625rem] leading-[1.75] mb-4">
              A few things set Sri Lanka apart from the more popular Southeast Asian diving destinations.
            </p>
            <p className="text-charcoal-sea/85 text-[1.0625rem] leading-[1.75] mb-4">
              First, the marine diversity. The island sits at the crossroads of the Indian Ocean, with warm, nutrient-rich water on both coasts. You get tropical reef fish, turtles, reef sharks, mantas (seasonal), and on the east coast one of the best blue whale watching routes in the world. Blue whales. Not whale sharks. Actual blue whales, the largest animals on Earth, passing within a few kilometres of the coastline on annual migration.
            </p>
            <p className="text-charcoal-sea/85 text-[1.0625rem] leading-[1.75] mb-4">
              Second, the wrecks. Sri Lanka has serious naval history. The east coast saw significant action in WWII. The Japanese air raid of 1942 sank several Royal Navy vessels in Trincomalee Bay, including HMS Hermes (aircraft carrier, 45-53 m) and HMS Vampire (destroyer). These are among the most historically significant wrecks in Asia, and they&apos;re diveable.
            </p>
            <p className="text-charcoal-sea/85 text-[1.0625rem] leading-[1.75] mb-4">
              Third, and honestly most practically, Sri Lanka is not overcrowded. The dive sites don&apos;t have queues. You&apos;re not fighting for space on the reef. The marine life hasn&apos;t been harassed into hiding by thirty divers at a time. It&apos;s the kind of diving that&apos;s getting harder to find.
            </p>
          </div>

          <div className="reveal mt-14">
            <h2 id="best-time-to-dive-in-sri-lanka" className="scroll-mt-24 text-[1.75rem] lg:text-[2.25rem] leading-[1.05] tracking-[-0.02em] font-extrabold mb-5">Best time to dive in Sri Lanka</h2>
            <p className="text-charcoal-sea/85 text-[1.0625rem] leading-[1.75] mb-4">
              Sri Lanka has two coastlines, and two monsoon seasons, which means diving is available somewhere on the island almost year-round.
            </p>

            <div className="space-y-6 mt-6">
              <div className="border-l-4 border-shallow-water pl-5">
                <h3 className="text-sub font-extrabold mb-2">East Coast (Trincomalee): May–October</h3>
                <p className="text-charcoal-sea/85 text-body">
                  The northeast monsoon (November-April) makes the east coast rough. May to October is the diving season, best conditions June to September. This is where we operate, from Sandy Cove in Trincomalee Bay. The WWII wrecks, Swami Rock, Pigeon Island National Park, and blue whale watching are all here.
                </p>
              </div>
              <div className="rounded-[14px] bg-white p-5 ring-1 ring-charcoal-sea/10">
                <h3 className="text-sub font-extrabold mb-2">South Coast (Unawatuna, Mirissa, Hikkaduwa): October–April</h3>
                <p className="text-charcoal-sea/85 text-body">
                  The southwest monsoon reverses things. South coast diving is best from October through April. Unawatuna and Hikkaduwa have good reef diving. Mirissa is the main whale watching destination on the south coast (blue and sperm whales, October to April). Dive quality varies more than the east coast, but access from Colombo is easier.
                </p>
              </div>
            </div>

            <p className="text-charcoal-sea/85 text-[1.0625rem] leading-[1.75] mt-6">
              If you&apos;re planning a dedicated diving trip and want the best of what Sri Lanka offers, especially the wrecks and blue whales, the east coast in June or July is the call.
            </p>
          </div>

          <div className="reveal mt-14">
            <h2 id="marine-life-in-sri-lanka" className="scroll-mt-24 text-[1.75rem] lg:text-[2.25rem] leading-[1.05] tracking-[-0.02em] font-extrabold mb-5">Marine life in Sri Lanka</h2>
            <p className="text-charcoal-sea/85 text-[1.0625rem] leading-[1.75] mb-4">
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
                  <span className="mt-2 w-2.5 h-2.5 rounded-full bg-shallow-water flex-shrink-0" />
                  <span className="text-charcoal-sea/85 text-body">
                    <strong className="text-charcoal-sea font-semibold">{item.heading}:</strong> {item.detail}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="reveal mt-14">
            <h2 id="padi-courses-in-sri-lanka" className="scroll-mt-24 text-[1.75rem] lg:text-[2.25rem] leading-[1.05] tracking-[-0.02em] font-extrabold mb-5">PADI courses in Sri Lanka</h2>
            <p className="text-charcoal-sea/85 text-[1.0625rem] leading-[1.75] mb-4">
              Most reputable dive operators in Sri Lanka are PADI affiliated, so your certification, wherever you do it, is internationally recognised. We offer 15 PADI courses in Trincomalee, from the beginner-friendly <Link href="/courses/discover-scuba-diving" className="font-semibold text-coral-deep underline underline-offset-4 decoration-2 decoration-tropic-coral/40 hover:decoration-coral-deep">Discover Scuba experience</Link> through to <Link href="/courses/divemaster" className="font-semibold text-coral-deep underline underline-offset-4 decoration-2 decoration-tropic-coral/40 hover:decoration-coral-deep">Divemaster</Link> training.
            </p>
            <p className="text-charcoal-sea/85 text-[1.0625rem] leading-[1.75] mb-4">
              The most popular course for tourists is <Link href="/courses/open-water-diver" className="font-semibold text-coral-deep underline underline-offset-4 decoration-2 decoration-tropic-coral/40 hover:decoration-coral-deep">PADI Open Water</Link>: four days, certifies you to 18 m, valid worldwide. Sri Lanka is a good place to do it because the conditions are generally forgiving for beginners: warm water, reasonable visibility, no strong currents on most training sites.
            </p>
            <p className="text-charcoal-sea/85 text-[1.0625rem] leading-[1.75] mb-4">
              Specialty courses worth doing in Trincomalee specifically: <Link href="/courses/wreck-diving" className="font-semibold text-coral-deep underline underline-offset-4 decoration-2 decoration-tropic-coral/40 hover:decoration-coral-deep">Wreck Diving</Link> (the WWII wrecks here are the reason to do this specialty in Sri Lanka rather than elsewhere), <Link href="/courses/deep-diving" className="font-semibold text-coral-deep underline underline-offset-4 decoration-2 decoration-tropic-coral/40 hover:decoration-coral-deep">Deep Diving</Link> (the Klathipa wall and access to deeper wreck sections), and <Link href="/courses/underwater-photography" className="font-semibold text-coral-deep underline underline-offset-4 decoration-2 decoration-tropic-coral/40 hover:decoration-coral-deep">Underwater Photography</Link> (the visual diversity and good light make this a genuinely productive photography destination).
            </p>
          </div>

          <div className="reveal mt-14">
            <h2 id="trincomalee-vs-south-coast-diving" className="scroll-mt-24 text-[1.75rem] lg:text-[2.25rem] leading-[1.05] tracking-[-0.02em] font-extrabold mb-5">Trincomalee vs. south coast diving</h2>
            <p className="text-charcoal-sea/85 text-[1.0625rem] leading-[1.75] mb-4">
              The honest comparison: the east coast (Trincomalee) has the better diving. The wrecks are more significant, the reef fish density is higher, the blue whale experience in season is extraordinary, and the dive sites aren&apos;t overcrowded.
            </p>
            <p className="text-charcoal-sea/85 text-[1.0625rem] leading-[1.75] mb-4">
              The south coast is more convenient from Colombo (3–4 hours vs. 5–7 hours), and if you&apos;re combining diving with a cultural tour or limited to the October–April window, Unawatuna or Hikkaduwa are solid options. But if diving is the main reason you&apos;re in Sri Lanka, get yourself to Trincomalee.
            </p>
          </div>

          <div className="reveal mt-14">
            <h2 id="practical-information" className="scroll-mt-24 text-[1.75rem] lg:text-[2.25rem] leading-[1.05] tracking-[-0.02em] font-extrabold mb-5">Practical information</h2>
            <p className="text-charcoal-sea/85 text-[1.0625rem] leading-[1.75] mb-4">
              <strong className="text-charcoal-sea">Water temperature:</strong> 27–30°C year-round on the east coast. A 3 mm wetsuit is fine for most people; some prefer 5 mm for multiple dives per day.
            </p>
            <p className="text-charcoal-sea/85 text-[1.0625rem] leading-[1.75] mb-4">
              <strong className="text-charcoal-sea">Visibility:</strong> 10–25 m in season on the east coast, depending on site and conditions.
            </p>
            <p className="text-charcoal-sea/85 text-[1.0625rem] leading-[1.75] mb-4">
              <strong className="text-charcoal-sea">Currency:</strong> Sri Lankan Rupees (LKR). Most dive operators accept USD. We do.
            </p>
            <p className="text-charcoal-sea/85 text-[1.0625rem] leading-[1.75] mb-4">
              <strong className="text-charcoal-sea">Flights:</strong> Colombo (Bandaranaike International) is the main hub. Multiple daily flights from most Asian cities, and direct routes from the UK, Middle East, and Australia.
            </p>
            <p className="text-charcoal-sea/85 text-[1.0625rem] leading-[1.75] mb-4">
              <strong className="text-charcoal-sea">Getting to Trincomalee:</strong> Train (7 hours from Colombo Fort, scenic and comfortable), car hire (5–6 hours), or domestic flight (40 minutes, limited availability).
            </p>
          </div>

          {/* CTAs */}
          <div className="reveal mt-16 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              href="/scuba-diving-in-trincomalee"
              className="group zone-deep flex flex-col gap-2 rounded-[18px] p-6 transition-[translate] hover:-translate-y-1"
            >
              <span className="text-label uppercase font-semibold text-sunrise">Deep dive</span>
              <span className="text-sub font-extrabold">
                Diving in Trincomalee →
              </span>
            </Link>
            <Link
              href="/dive-sites"
              className="group flex flex-col gap-2 rounded-[18px] p-6 bg-action text-action-ink hover:bg-action-hover transition-[background-color,translate] hover:-translate-y-1"
            >
              <span className="text-label uppercase font-semibold">Explore</span>
              <span className="text-sub font-extrabold">
                All Dive Sites →
              </span>
            </Link>
          </div>
          </div>
        </div>
      </article>
    </>
  );
}
