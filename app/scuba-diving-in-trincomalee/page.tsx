import type { Metadata } from "next";
import Link from "next/link";
import AnimatedSection from "@/components/ui/AnimatedSection";

export const metadata: Metadata = {
  title: "Scuba Diving in Trincomalee | Complete Guide | Diving Club",
  description:
    "Complete guide to scuba diving in Trincomalee: best season, top dive sites, PADI courses, marine life, and local tips from 15 years on the water.",
  alternates: { canonical: "https://divingclub.lk/scuba-diving-in-trincomalee" },
  openGraph: {
    title: "Scuba Diving in Trincomalee | Complete Guide | Diving Club",
    description:
      "Complete guide to scuba diving in Trincomalee: best season, top dive sites, PADI courses, marine life, and local tips from 15 years on the water.",
    url: "https://divingclub.lk/scuba-diving-in-trincomalee",
  },
};

const pageJsonLd = {
  "@context": "https://schema.org",
  "@type": "TouristDestination",
  name: "Trincomalee, Sri Lanka",
  description: "A premier scuba diving destination on Sri Lanka's east coast, offering WWII wrecks, coral reefs, marine life, and PADI diving courses.",
  url: "https://divingclub.lk/scuba-diving-in-trincomalee",
  touristType: "Scuba Diving",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Trincomalee",
    addressRegion: "Eastern Province",
    addressCountry: "LK",
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, item: { "@id": "https://divingclub.lk", name: "Home" } },
    { "@type": "ListItem", position: 2, item: { "@id": "https://divingclub.lk/scuba-diving-in-trincomalee", name: "Scuba Diving in Trincomalee" } },
  ],
};

export default function DivingTrincolmalee() {
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
            <span className="text-warm-white/60">Scuba Diving in Trincomalee</span>
          </nav>

          <div className="flex items-center gap-3 mb-5">
            <span className="h-px w-6 bg-tropic-coral" aria-hidden="true" />
            <span className="text-tropic-coral text-[11px] font-semibold tracking-[0.22em] uppercase">
              East Coast · Sri Lanka · May–October
            </span>
          </div>

          <h1 className="text-warm-white font-display text-[clamp(2.5rem,6vw,4.5rem)] font-extrabold leading-tight mb-6">
            Scuba Diving in Trincomalee
          </h1>
          <p className="text-warm-white/60 text-lg leading-relaxed">
            A bay full of WWII history. Coral reefs with Hindu deity statues at depth. Blue whales passing through in season. Trincomalee is one of Asia&apos;s genuinely exceptional dive destinations. Most people still haven&apos;t heard of it.
          </p>
        </div>
      </section>

      {/* Article body */}
      <article className="bg-warm-white py-16 lg:py-24 px-6">
        <div className="max-w-3xl mx-auto prose-custom">

          <AnimatedSection>
            <h2 className="text-charcoal-sea font-display text-3xl font-extrabold mb-5">Why Trincomalee?</h2>
            <p className="text-charcoal-sea/70 leading-relaxed mb-4">
              Trincomalee sits on Sri Lanka&apos;s northeast coast, facing the Indian Ocean across a large, sheltered natural harbour. The bay itself is beautiful, one of the finest natural harbours in the world, which is why it&apos;s got so much WWII naval history sunk in it. The diving draws people for a different reason: the combination of reef, wall, and wreck diving in the same bay, with warm water (27-30°C) and visibility that regularly hits 15-25 m, is genuinely hard to find.
            </p>
            <p className="text-charcoal-sea/70 leading-relaxed mb-4">
              We&apos;ve been diving here since 2010. In that time, the reefs have had good years and harder ones, a bleaching event here, sediment run-off there, but they&apos;re fundamentally healthy. The fish life is dense. Turtles are common at almost every site. And the wrecks just keep giving.
            </p>
          </AnimatedSection>

          <AnimatedSection className="mt-14">
            <h2 className="text-charcoal-sea font-display text-3xl font-extrabold mb-5">When to dive in Trincomalee</h2>
            <p className="text-charcoal-sea/70 leading-relaxed mb-4">
              The diving season on the east coast runs <strong className="text-charcoal-sea">May to October</strong>. Outside those months, the northeast monsoon makes the sea too rough for safe diving, and the water visibility drops considerably.
            </p>
            <p className="text-charcoal-sea/70 leading-relaxed mb-4">
              Within the season, June to September tend to have the calmest conditions, best visibility, and most consistent marine life activity. May is transitional: the monsoon is ending and conditions vary. October can be similar, good days mixed with rougher ones.
            </p>
            <p className="text-charcoal-sea/70 leading-relaxed mb-4">
              For whale watching, the peak is late April to early May. Blue whales pass through on migration just as the diving season is opening. If you time it right, you can watch blue whales from the boat in the morning and dive coral reefs in the afternoon. That&apos;s a difficult day to beat.
            </p>
            <div className="bg-charcoal-sea/5 rounded-2xl p-6 mt-6">
              <p className="text-charcoal-sea/70 text-sm leading-relaxed">
                <strong className="text-charcoal-sea">Note:</strong> We only operate on the east coast (Trincomalee) from May to October. We don&apos;t run a second season location. When we&apos;re here, we&apos;re fully here: same instructors, same boats, same base at Sandy Cove.
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection className="mt-14">
            <h2 className="text-charcoal-sea font-display text-3xl font-extrabold mb-5">Top dive sites in Trincomalee</h2>

            <h3 className="text-charcoal-sea font-bold text-xl mb-3 mt-8">Swami Rock</h3>
            <p className="text-charcoal-sea/70 leading-relaxed mb-4">
              The most iconic dive in the bay, and for good reason. The site sits directly below Koneswaram temple, one of the oldest Hindu temples in Sri Lanka, and Hindu deity statues (Shiva, Kali, Ganesh) rest on the reef at depth, half-covered in coral. A wall runs from 8 to 22 m with sea fans, soft corals, and hawksbill turtles on almost every dive. <Link href="/dive-sites/swami-rock" className="text-tropic-coral hover:text-tropic-coral/80 transition-colors">See full site details →</Link>
            </p>

            <h3 className="text-charcoal-sea font-bold text-xl mb-3 mt-8">Pigeon Island</h3>
            <p className="text-charcoal-sea/70 leading-relaxed mb-4">
              A national park, which means the reef is protected and it shows. Blacktip reef sharks cruise the outer wall. Hard coral gardens in excellent condition fill the shallower sections. It&apos;s a good dive for every certification level: beginners in the lagoon, Advanced divers on the outer wall at 14-21 m. <Link href="/dive-sites/pigeon-island" className="text-tropic-coral hover:text-tropic-coral/80 transition-colors">See full site details →</Link>
            </p>

            <h3 className="text-charcoal-sea font-bold text-xl mb-3 mt-8">HMS Hermes</h3>
            <p className="text-charcoal-sea/70 leading-relaxed mb-4">
              A Royal Navy aircraft carrier sunk in 1942, lying upside-down at 45-53 m. One of the largest diveable shipwrecks in the world. This is a technical dive. You&apos;ll need Deep Diving specialty and experience to attempt it, but it&apos;s genuinely extraordinary. Gun turrets, flight deck structures, 80+ years of coral growth. <Link href="/dive-sites/hms-hermes-wreck" className="text-tropic-coral hover:text-tropic-coral/80 transition-colors">See full site details →</Link>
            </p>

            <h3 className="text-charcoal-sea font-bold text-xl mb-3 mt-8">SS British Sergeant Wreck</h3>
            <p className="text-charcoal-sea/70 leading-relaxed mb-4">
              A WWII cargo vessel at 18-24 m, accessible to Advanced Open Water divers. Schools of batfish in the hull shadows. Large grouper near the bow. The site pairs well with Swami Rock for a full-day two-dive trip. <Link href="/dive-sites/ss-british-sergeant-wreck" className="text-tropic-coral hover:text-tropic-coral/80 transition-colors">See full site details →</Link>
            </p>

            <p className="text-charcoal-sea/70 leading-relaxed mt-6">
              We dive <Link href="/dive-sites" className="text-tropic-coral hover:text-tropic-coral/80 transition-colors">12 sites in total around the bay</Link>, from the shallow Coral Garden (6-12 m) used for training and snorkelling, through to the deep Klathipa wall (28-40 m) with napoleon wrasse and barracuda schools.
            </p>
          </AnimatedSection>

          <AnimatedSection className="mt-14">
            <h2 className="text-charcoal-sea font-display text-3xl font-extrabold mb-5">Marine life in Trincomalee</h2>
            <p className="text-charcoal-sea/70 leading-relaxed mb-4">
              The bay has good range. Hawksbill turtles are around on almost every dive: they rest in crevices in the walls or graze on the reef. Moray eels are everywhere. Lionfish hold their ground in the shallows and look menacing while doing nothing at all. Stingrays rest on the sandy patches beside the wrecks.
            </p>
            <p className="text-charcoal-sea/70 leading-relaxed mb-4">
              Reef sharks, blacktips mostly, are common at Pigeon Island. At Klathipa Deep, there&apos;s a reasonable chance of napoleon wrasse and, in July and August, the occasional hammerhead passing through. Not guaranteed, but it happens.
            </p>
            <p className="text-charcoal-sea/70 leading-relaxed mb-4">
              Above the water: blue whales and spinner dolphins are the headliners. Blue whales pass through on migration (peak late April to early May). Spinner dolphins are resident in the bay and we see them regularly on boat trips throughout the season.
            </p>
          </AnimatedSection>

          <AnimatedSection className="mt-14">
            <h2 className="text-charcoal-sea font-display text-3xl font-extrabold mb-5">PADI courses in Trincomalee</h2>
            <p className="text-charcoal-sea/70 leading-relaxed mb-4">
              We offer 15 PADI courses at Diving Club, from Discover Scuba Diving (no certification required, half-day, first breath underwater) through to Divemaster (four to eight weeks, the start of a professional diving career).
            </p>
            <p className="text-charcoal-sea/70 leading-relaxed mb-4">
              For most first-timers, the choice comes down to two options. If you want to try diving without committing to a full course, the <Link href="/courses/discover-scuba-diving" className="text-tropic-coral hover:text-tropic-coral/80 transition-colors">Discover Scuba experience</Link> is a half-day programme that gets you underwater on Trincomalee&apos;s reefs with an instructor. No certification, no paperwork, just a dive. If you want a card at the end, something you can use at dive shops around the world, the <Link href="/courses/open-water-diver" className="text-tropic-coral hover:text-tropic-coral/80 transition-colors">PADI Open Water course</Link> is four days and certifies you to 18 m in 186 countries.
            </p>
            <p className="text-charcoal-sea/70 leading-relaxed mb-4">
              Trincomalee is a particularly good place to do your Advanced Open Water. The Klathipa Deep site is excellent for the mandatory deep dive, and the wreck options for adventure dives are genuinely interesting rather than educational conveniences.
            </p>
          </AnimatedSection>

          <AnimatedSection className="mt-14">
            <h2 className="text-charcoal-sea font-display text-3xl font-extrabold mb-5">Getting to Trincomalee</h2>
            <p className="text-charcoal-sea/70 leading-relaxed mb-4">
              From Colombo, you&apos;ve got a few options. The train from Colombo Fort takes about seven hours and passes through tea country, scenic and comfortable if you book second class. By car it&apos;s five to six hours on relatively good roads. Domestic flights from Colombo to Trincomalee (or to Batticaloa, slightly south) are available and cut the journey to 40 minutes, though availability is limited.
            </p>
            <p className="text-charcoal-sea/70 leading-relaxed mb-4">
              We&apos;re based at Sandy Cove, which is on the Nilaveli Road heading north out of Trincomalee town. Most accommodation in the area is within 5-10 minutes of the base. When you enquire, ask us and we&apos;ll point you toward guesthouses and hotels at various price points.
            </p>
          </AnimatedSection>

          <AnimatedSection className="mt-14">
            <h2 className="text-charcoal-sea font-display text-3xl font-extrabold mb-5">Water conditions</h2>
            <p className="text-charcoal-sea/70 leading-relaxed mb-4">
              Sea temperature runs 27–30°C through the season. A 3 mm wetsuit is comfortable for most divers; some people prefer a 5 mm for multiple dives per day. We provide wetsuits with every course and fun dive.
            </p>
            <p className="text-charcoal-sea/70 leading-relaxed mb-4">
              Visibility ranges from 10 m on a slow day to 25 m when conditions are ideal. The outer sites (Klathipa, Pigeon Island) tend to have cleaner water than the inner bay sites. Currents are generally light to moderate. There are a few sites where it runs stronger, and we brief on those before every dive.
            </p>
          </AnimatedSection>

          {/* CTAs */}
          <AnimatedSection className="mt-16 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              href="/dive-sites"
              className="group flex flex-col gap-2 bg-charcoal-sea rounded-2xl p-6 hover:bg-shallow-water transition-colors"
            >
              <span className="text-warm-white/50 text-xs uppercase tracking-widest">Explore</span>
              <span className="text-warm-white font-bold text-lg leading-snug group-hover:text-warm-white transition-colors">
                All 12 Dive Sites →
              </span>
            </Link>
            <Link
              href="/courses"
              className="group flex flex-col gap-2 bg-tropic-coral rounded-2xl p-6 hover:bg-[#d4603f] transition-colors"
            >
              <span className="text-white/70 text-xs uppercase tracking-widest">Book</span>
              <span className="text-white font-bold text-lg leading-snug">
                PADI Courses →
              </span>
            </Link>
          </AnimatedSection>
        </div>
      </article>
    </>
  );
}
