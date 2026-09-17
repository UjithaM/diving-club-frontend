import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import type { TouristDestination, BreadcrumbList, WithContext } from "schema-dts";
import { safeJsonLd } from "@/lib/jsonld";

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

const pageJsonLd: WithContext<TouristDestination> = {
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

const breadcrumbJsonLd: WithContext<BreadcrumbList> = {
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(pageJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(breadcrumbJsonLd) }} />

      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Scuba Diving in Trincomalee" }]}
        notes="East Coast · Sri Lanka · May–October"
        title={<>Scuba Diving in Trincomalee</>}
        lead={<>A bay full of WWII history. Coral reefs with Hindu deity statues at depth. Blue whales passing through in season. Trincomalee is one of Asia&apos;s genuinely exceptional dive destinations. Most people still haven&apos;t heard of it.</>}
        art="turtle"
      />

      {/* Article body */}
      <article className="zone-surface py-12 lg:py-20 px-5 sm:px-8 border-t-2 border-charcoal-sea/10">
        <div className="max-w-6xl mx-auto grid gap-10 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-16">
          <nav aria-label="Sections" className="hidden lg:block lg:sticky lg:top-24 lg:self-start border-l-2 border-shallow-water pl-2">
            <ol>
              <li><a href="#why-trincomalee" className="block rounded-[8px] px-3 py-2 text-sm font-semibold hover:bg-shallow-water/15 transition-colors">Why Trincomalee?</a></li>
              <li><a href="#when-to-dive-in-trincomalee" className="block rounded-[8px] px-3 py-2 text-sm font-semibold hover:bg-shallow-water/15 transition-colors">When to dive in Trincomalee</a></li>
              <li><a href="#top-dive-sites-in-trincomalee" className="block rounded-[8px] px-3 py-2 text-sm font-semibold hover:bg-shallow-water/15 transition-colors">Top dive sites in Trincomalee</a></li>
              <li><a href="#marine-life-in-trincomalee" className="block rounded-[8px] px-3 py-2 text-sm font-semibold hover:bg-shallow-water/15 transition-colors">Marine life in Trincomalee</a></li>
              <li><a href="#padi-courses-in-trincomalee" className="block rounded-[8px] px-3 py-2 text-sm font-semibold hover:bg-shallow-water/15 transition-colors">PADI courses in Trincomalee</a></li>
              <li><a href="#getting-to-trincomalee" className="block rounded-[8px] px-3 py-2 text-sm font-semibold hover:bg-shallow-water/15 transition-colors">Getting to Trincomalee</a></li>
              <li><a href="#water-conditions" className="block rounded-[8px] px-3 py-2 text-sm font-semibold hover:bg-shallow-water/15 transition-colors">Water conditions</a></li>
            </ol>
          </nav>
          <div className="max-w-[68ch]">

          <div className="reveal">
            <h2 id="why-trincomalee" className="scroll-mt-24 text-[1.75rem] lg:text-[2.25rem] leading-[1.05] tracking-[-0.02em] font-extrabold mb-5">Why Trincomalee?</h2>
            <p className="text-charcoal-sea/85 text-[1.0625rem] leading-[1.75] mb-4">
              Trincomalee sits on Sri Lanka&apos;s northeast coast, facing the Indian Ocean across a large, sheltered natural harbour. The bay itself is beautiful, one of the finest natural harbours in the world, which is why it&apos;s got so much WWII naval history sunk in it. The diving draws people for a different reason: the combination of reef, wall, and wreck diving in the same bay, with warm water (27-30°C) and visibility that regularly hits 15-25 m, is genuinely hard to find.
            </p>
            <p className="text-charcoal-sea/85 text-[1.0625rem] leading-[1.75] mb-4">
              We&apos;ve been diving here since 2010. In that time, the reefs have had good years and harder ones, a bleaching event here, sediment run-off there, but they&apos;re fundamentally healthy. The fish life is dense. Turtles are common at almost every site. And the wrecks just keep giving.
            </p>
          </div>

          <div className="reveal mt-14">
            <h2 id="when-to-dive-in-trincomalee" className="scroll-mt-24 text-[1.75rem] lg:text-[2.25rem] leading-[1.05] tracking-[-0.02em] font-extrabold mb-5">When to dive in Trincomalee</h2>
            <p className="text-charcoal-sea/85 text-[1.0625rem] leading-[1.75] mb-4">
              The diving season on the east coast runs <strong className="text-charcoal-sea">May to October</strong>. Outside those months, the northeast monsoon makes the sea too rough for safe diving, and the water visibility drops considerably.
            </p>
            <p className="text-charcoal-sea/85 text-[1.0625rem] leading-[1.75] mb-4">
              Within the season, June to September tend to have the calmest conditions, best visibility, and most consistent marine life activity. May is transitional: the monsoon is ending and conditions vary. October can be similar, good days mixed with rougher ones.
            </p>
            <p className="text-charcoal-sea/85 text-[1.0625rem] leading-[1.75] mb-4">
              For whale watching, the peak is late April to early May. Blue whales pass through on migration just as the diving season is opening. If you time it right, you can watch blue whales from the boat in the morning and dive coral reefs in the afternoon. That&apos;s a difficult day to beat.
            </p>
            <div className="rounded-[18px] bg-sunrise/30 border-2 border-sunrise p-6 mt-8">
              <p className="text-charcoal-sea/85 text-body">
                <strong className="text-charcoal-sea">Note:</strong> We only operate on the east coast (Trincomalee) from May to October. We don&apos;t run a second season location. When we&apos;re here, we&apos;re fully here: same instructors, same boats, same base at Sandy Cove.
              </p>
            </div>
          </div>

          <div className="reveal mt-14">
            <h2 id="top-dive-sites-in-trincomalee" className="scroll-mt-24 text-[1.75rem] lg:text-[2.25rem] leading-[1.05] tracking-[-0.02em] font-extrabold mb-5">Top dive sites in Trincomalee</h2>

            <h3 className="text-sub font-extrabold mb-3 mt-10 pt-6 border-t border-charcoal-sea/15">Swami Rock</h3>
            <p className="text-charcoal-sea/85 text-[1.0625rem] leading-[1.75] mb-4">
              The most iconic dive in the bay, and for good reason. The site sits directly below Koneswaram temple, one of the oldest Hindu temples in Sri Lanka, and Hindu deity statues (Shiva, Kali, Ganesh) rest on the reef at depth, half-covered in coral. A wall runs from 8 to 22 m with sea fans, soft corals, and hawksbill turtles on almost every dive. <Link href="/dive-sites/swami-rock" className="font-semibold text-coral-deep underline underline-offset-4 decoration-2 decoration-tropic-coral/40 hover:decoration-coral-deep">See full site details →</Link>
            </p>

            <h3 className="text-sub font-extrabold mb-3 mt-10 pt-6 border-t border-charcoal-sea/15">Pigeon Island</h3>
            <p className="text-charcoal-sea/85 text-[1.0625rem] leading-[1.75] mb-4">
              A national park, which means the reef is protected and it shows. Blacktip reef sharks cruise the outer wall. Hard coral gardens in excellent condition fill the shallower sections. It&apos;s a good dive for every certification level: beginners in the lagoon, Advanced divers on the outer wall at 14-21 m. <Link href="/dive-sites/pigeon-island" className="font-semibold text-coral-deep underline underline-offset-4 decoration-2 decoration-tropic-coral/40 hover:decoration-coral-deep">See full site details →</Link>
            </p>

            <h3 className="text-sub font-extrabold mb-3 mt-10 pt-6 border-t border-charcoal-sea/15">HMS Hermes</h3>
            <p className="text-charcoal-sea/85 text-[1.0625rem] leading-[1.75] mb-4">
              A Royal Navy aircraft carrier sunk in 1942, lying upside-down at 45-53 m. One of the largest diveable shipwrecks in the world. This is a technical dive. You&apos;ll need Deep Diving specialty and experience to attempt it, but it&apos;s genuinely extraordinary. Gun turrets, flight deck structures, 80+ years of coral growth. <Link href="/dive-sites/hms-hermes-wreck" className="font-semibold text-coral-deep underline underline-offset-4 decoration-2 decoration-tropic-coral/40 hover:decoration-coral-deep">See full site details →</Link>
            </p>

            <h3 className="text-sub font-extrabold mb-3 mt-10 pt-6 border-t border-charcoal-sea/15">SS British Sergeant Wreck</h3>
            <p className="text-charcoal-sea/85 text-[1.0625rem] leading-[1.75] mb-4">
              A WWII cargo vessel at 18-24 m, accessible to Advanced Open Water divers. Schools of batfish in the hull shadows. Large grouper near the bow. The site pairs well with Swami Rock for a full-day two-dive trip. <Link href="/dive-sites/ss-british-sergeant-wreck" className="font-semibold text-coral-deep underline underline-offset-4 decoration-2 decoration-tropic-coral/40 hover:decoration-coral-deep">See full site details →</Link>
            </p>

            <p className="text-charcoal-sea/85 text-[1.0625rem] leading-[1.75] mt-6">
              We dive <Link href="/dive-sites" className="font-semibold text-coral-deep underline underline-offset-4 decoration-2 decoration-tropic-coral/40 hover:decoration-coral-deep">12 sites in total around the bay</Link>, from the shallow Coral Garden (6-12 m) used for training and snorkelling, through to the deep Klathipa wall (28-40 m) with napoleon wrasse and barracuda schools.
            </p>
          </div>

          <div className="reveal mt-14">
            <h2 id="marine-life-in-trincomalee" className="scroll-mt-24 text-[1.75rem] lg:text-[2.25rem] leading-[1.05] tracking-[-0.02em] font-extrabold mb-5">Marine life in Trincomalee</h2>
            <p className="text-charcoal-sea/85 text-[1.0625rem] leading-[1.75] mb-4">
              The bay has good range. Hawksbill turtles are around on almost every dive: they rest in crevices in the walls or graze on the reef. Moray eels are everywhere. Lionfish hold their ground in the shallows and look menacing while doing nothing at all. Stingrays rest on the sandy patches beside the wrecks.
            </p>
            <p className="text-charcoal-sea/85 text-[1.0625rem] leading-[1.75] mb-4">
              Reef sharks, blacktips mostly, are common at Pigeon Island. At Klathipa Deep, there&apos;s a reasonable chance of napoleon wrasse and, in July and August, the occasional hammerhead passing through. Not guaranteed, but it happens.
            </p>
            <p className="text-charcoal-sea/85 text-[1.0625rem] leading-[1.75] mb-4">
              Above the water: blue whales and spinner dolphins are the headliners. Blue whales pass through on migration (peak late April to early May). Spinner dolphins are resident in the bay and we see them regularly on boat trips throughout the season.
            </p>
          </div>

          <div className="reveal mt-14">
            <h2 id="padi-courses-in-trincomalee" className="scroll-mt-24 text-[1.75rem] lg:text-[2.25rem] leading-[1.05] tracking-[-0.02em] font-extrabold mb-5">PADI courses in Trincomalee</h2>
            <p className="text-charcoal-sea/85 text-[1.0625rem] leading-[1.75] mb-4">
              We offer 15 PADI courses at Diving Club, from Discover Scuba Diving (no certification required, half-day, first breath underwater) through to Divemaster (four to eight weeks, the start of a professional diving career).
            </p>
            <p className="text-charcoal-sea/85 text-[1.0625rem] leading-[1.75] mb-4">
              For most first-timers, the choice comes down to two options. If you want to try diving without committing to a full course, the <Link href="/courses/discover-scuba-diving" className="font-semibold text-coral-deep underline underline-offset-4 decoration-2 decoration-tropic-coral/40 hover:decoration-coral-deep">Discover Scuba experience</Link> is a half-day programme that gets you underwater on Trincomalee&apos;s reefs with an instructor. No certification, no paperwork, just a dive. If you want a card at the end, something you can use at dive shops around the world, the <Link href="/courses/open-water-diver" className="font-semibold text-coral-deep underline underline-offset-4 decoration-2 decoration-tropic-coral/40 hover:decoration-coral-deep">PADI Open Water course</Link> is four days and certifies you to 18 m in 186 countries.
            </p>
            <p className="text-charcoal-sea/85 text-[1.0625rem] leading-[1.75] mb-4">
              Trincomalee is a particularly good place to do your Advanced Open Water. The Klathipa Deep site is excellent for the mandatory deep dive, and the wreck options for adventure dives are genuinely interesting rather than educational conveniences.
            </p>
          </div>

          <div className="reveal mt-14">
            <h2 id="getting-to-trincomalee" className="scroll-mt-24 text-[1.75rem] lg:text-[2.25rem] leading-[1.05] tracking-[-0.02em] font-extrabold mb-5">Getting to Trincomalee</h2>
            <p className="text-charcoal-sea/85 text-[1.0625rem] leading-[1.75] mb-4">
              From Colombo, you&apos;ve got a few options. The train from Colombo Fort takes about seven hours and passes through tea country, scenic and comfortable if you book second class. By car it&apos;s five to six hours on relatively good roads. Domestic flights from Colombo to Trincomalee (or to Batticaloa, slightly south) are available and cut the journey to 40 minutes, though availability is limited.
            </p>
            <p className="text-charcoal-sea/85 text-[1.0625rem] leading-[1.75] mb-4">
              We&apos;re based at Sandy Cove, which is on the Nilaveli Road heading north out of Trincomalee town. Most accommodation in the area is within 5-10 minutes of the base. When you enquire, ask us and we&apos;ll point you toward guesthouses and hotels at various price points.
            </p>
          </div>

          <div className="reveal mt-14">
            <h2 id="water-conditions" className="scroll-mt-24 text-[1.75rem] lg:text-[2.25rem] leading-[1.05] tracking-[-0.02em] font-extrabold mb-5">Water conditions</h2>
            <p className="text-charcoal-sea/85 text-[1.0625rem] leading-[1.75] mb-4">
              Sea temperature runs 27–30°C through the season. A 3 mm wetsuit is comfortable for most divers; some people prefer a 5 mm for multiple dives per day. We provide wetsuits with every course and fun dive.
            </p>
            <p className="text-charcoal-sea/85 text-[1.0625rem] leading-[1.75] mb-4">
              Visibility ranges from 10 m on a slow day to 25 m when conditions are ideal. The outer sites (Klathipa, Pigeon Island) tend to have cleaner water than the inner bay sites. Currents are generally light to moderate. There are a few sites where it runs stronger, and we brief on those before every dive.
            </p>
          </div>

          {/* CTAs */}
          <div className="reveal mt-16 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              href="/dive-sites"
              className="group zone-deep flex flex-col gap-2 rounded-[18px] p-6 transition-[translate] hover:-translate-y-1"
            >
              <span className="text-label uppercase font-semibold text-sunrise">Explore</span>
              <span className="text-sub font-extrabold">
                All 12 Dive Sites →
              </span>
            </Link>
            <Link
              href="/courses"
              className="group flex flex-col gap-2 rounded-[18px] p-6 bg-action text-action-ink hover:bg-action-hover transition-[background-color,translate] hover:-translate-y-1"
            >
              <span className="text-label uppercase font-semibold">Book</span>
              <span className="text-sub font-extrabold">
                PADI Courses →
              </span>
            </Link>
          </div>
          </div>
        </div>
      </article>
    </>
  );
}
