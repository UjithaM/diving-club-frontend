import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { getDiveSites, getDiveSiteBySlug } from "@/lib/api/dive-sites";
import { getCourseBySlug } from "@/lib/api/courses";
import DiveSiteDetailClient from "@/components/dive-sites/DiveSiteDetailClient";
import FaqAccordion from "@/components/ui/FaqAccordion";
import GoogleReviewsSection from "@/components/ui/GoogleReviewsSection";
import DetailHero, { type Tone } from "@/components/ui/DetailHero";
import TickDot from "@/components/ui/TickDot";
import RelatedGrid from "@/components/ui/RelatedGrid";
import { diveSiteFaqs } from "@/lib/data/dive-site-faqs";
import type { TouristAttraction, FAQPage, WithContext } from "schema-dts";
import { safeJsonLd } from "@/lib/jsonld";

import CtaBand, { BandLink, WhatsAppButton } from "@/components/ui/CtaBand";
export async function generateStaticParams() {
  const sites = await getDiveSites();
  return sites.map((s) => ({ slug: s.slug }));
}

const diveSiteTitles: Record<string, string> = {
  "hms-hermes-wreck": "HMS Hermes Wreck Dive Trincomalee | WWII Shipwreck | Diving Club",
  "pigeon-island": "Pigeon Island Scuba Diving, Trincomalee | Reef Sharks | Diving Club",
  "swami-rock": "Swami Rock Dive Site Trincomalee | Hindu Statues at Depth | Diving Club",
};

const diveSiteDescriptions: Record<string, string> = {
  "hms-hermes-wreck": "Dive the HMS Hermes — a WWII Royal Navy aircraft carrier resting upside-down at 45–53m off Trincomalee. One of the world's largest diveable wrecks.",
};

const diveSiteH1s: Record<string, string> = {
  "hms-hermes-wreck": "HMS Hermes Wreck Dive — Trincomalee",
  "pigeon-island": "Pigeon Island Diving — Trincomalee",
  "swami-rock": "Swami Rock Dive Site — Trincomalee",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const site = await getDiveSiteBySlug(slug);
  if (!site) return {};

  const title = diveSiteTitles[slug] ?? `${site.name} Dive Site | Trincomalee, Sri Lanka | Diving Club`;
  const description = diveSiteDescriptions[slug] ?? site.description.slice(0, 155).trimEnd();

  return {
    title,
    description,
    alternates: { canonical: `https://divingclub.lk/dive-sites/${site.slug}` },
    openGraph: {
      title,
      description,
      url: `https://divingclub.lk/dive-sites/${site.slug}`,
      images: [
        {
          url: "/images/og-home.jpg",
          width: 1200,
          height: 630,
          alt: `${site.name} scuba dive site in Trincomalee, Sri Lanka`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/images/og-home.jpg"],
    },
  };
}

const difficultyMeta: Record<string, { accent: Tone; textClass: string; bgClass: string }> = {
  beginner:     { accent: "shallow", textClass: "text-shallow-water", bgClass: "bg-shallow-water/15" },
  Beginner:     { accent: "shallow", textClass: "text-shallow-water", bgClass: "bg-shallow-water/15" },
  intermediate: { accent: "sunrise", textClass: "text-sunrise",       bgClass: "bg-sunrise/15"       },
  Intermediate: { accent: "sunrise", textClass: "text-sunrise",       bgClass: "bg-sunrise/15"       },
  advanced:     { accent: "coral", textClass: "text-tropic-coral",  bgClass: "bg-tropic-coral/15"  },
  Advanced:     { accent: "coral", textClass: "text-tropic-coral",  bgClass: "bg-tropic-coral/15"  },
  technical:    { accent: "ink", textClass: "text-charcoal-sea",  bgClass: "bg-charcoal-sea/10"  },
  Technical:    { accent: "ink", textClass: "text-charcoal-sea",  bgClass: "bg-charcoal-sea/10"  },
};

const defaultDifficultyMeta: { accent: Tone; textClass: string; bgClass: string } = { accent: "shallow", textClass: "text-shallow-water", bgClass: "bg-shallow-water/15" };

export default async function DiveSiteDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const site = await getDiveSiteBySlug(slug);
  if (!site) notFound();

  const meta = difficultyMeta[site.difficulty] ?? defaultDifficultyMeta;
  const pageFaqs = diveSiteFaqs[site.slug] ?? [];

  // Related dive sites (up to 3, exclude self)
  const allDiveSites = await getDiveSites();
  const relatedSites = allDiveSites
    .filter((s) => s.slug !== site.slug)
    .slice(0, 3)
    .map((s) => ({
      slug: s.slug,
      name: s.name,
      description: s.description.slice(0, 120),
      badge: s.difficulty,
      badgeTone: (difficultyMeta[s.difficulty] ?? defaultDifficultyMeta).accent,
      href: `/dive-sites/${s.slug}`,
    }));

  // Related courses
  const relatedCourses = (
    await Promise.all(site.relatedCourses.map((slug) => getCourseBySlug(slug)))
  ).filter(Boolean);

  const siteJsonLd: WithContext<TouristAttraction> = {
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    name: site.name,
    description: site.description.slice(0, 300),
    url: `https://divingclub.lk/dive-sites/${site.slug}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Trincomalee",
      addressRegion: "Eastern Province",
      addressCountry: "LK",
    },
    touristType: "Scuba Diving",
    amenityFeature: site.highlights.map((h) => ({
      "@type": "LocationFeatureSpecification",
      name: h,
    })),
    additionalProperty: [
      { "@type": "PropertyValue", name: "Depth", value: site.depth },
      { "@type": "PropertyValue", name: "Difficulty", value: site.difficulty },
      { "@type": "PropertyValue", name: "Best Season", value: site.season },
      { "@type": "PropertyValue", name: "Boat Transfer", value: site.boatTime },
      { "@type": "PropertyValue", name: "Currents & Visibility", value: site.currentsVisibility },
    ],
  };

  const pageFaqsJsonLd: WithContext<FAQPage> | null = pageFaqs.length > 0
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: pageFaqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      }
    : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(siteJsonLd) }}
      />
      {pageFaqsJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: safeJsonLd(pageFaqsJsonLd) }}
        />
      )}

      <DetailHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Dive Sites", href: "/dive-sites" }, { label: site.name }]}
        badge={{ label: site.difficulty, tone: meta.accent }}
        title={diveSiteH1s[site.slug] ?? `${site.name} — Trincomalee`}
        chips={[site.depth, `${site.boatTime} by boat`, site.season]}
        image={{ src: site.image, alt: `${site.name} dive site in Trincomalee, Sri Lanka` }}
      />

      {/* Body */}
      <section className="zone-surface py-12 lg:py-16 px-5 sm:px-8 border-t-2 border-charcoal-sea/10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">

            {/* Left: content */}
            <div className="lg:col-span-2 space-y-12">

              <div>
                <h2 className="text-[1.75rem] lg:text-[2.25rem] leading-[1.05] tracking-[-0.02em] font-extrabold mb-5 reveal">About this dive site</h2>
                {site.description.split("\n\n").map((para, i) => (
                  <p key={i} className="text-charcoal-sea/85 text-lead mb-4 max-w-[65ch]">{para}</p>
                ))}
              </div>

              <div>
                <h2 className="text-[1.75rem] lg:text-[2.25rem] leading-[1.05] tracking-[-0.02em] font-extrabold mb-5 reveal">What you&apos;ll see</h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {site.marineLife.map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <TickDot />
                      <span className="text-charcoal-sea/85 text-sm pt-1">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-[1.75rem] lg:text-[2.25rem] leading-[1.05] tracking-[-0.02em] font-extrabold mb-5 reveal">Site highlights</h2>
                <ul className="space-y-2">
                  {site.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-3">
                      <TickDot />
                      <span className="text-charcoal-sea/85 leading-relaxed pt-0.5">{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-[18px] p-6 sm:p-7 bg-sunrise/30 border-2 border-sunrise reveal">
                <h2 className="text-sub font-extrabold mb-2">Currents &amp; Visibility</h2>
                <p className="text-charcoal-sea/85 leading-relaxed">{site.currentsVisibility}</p>
              </div>

              {relatedCourses.length > 0 && (
                <div>
                  <h2 className="text-[1.75rem] lg:text-[2.25rem] leading-[1.05] tracking-[-0.02em] font-extrabold mb-5 reveal">Recommended courses for this site</h2>
                  <div className="flex flex-wrap gap-3">
                    {relatedCourses.map((course) =>
                      course ? (
                        <Link
                          key={course.slug}
                          href={`/courses/${course.slug}`}
                          className="inline-flex items-center gap-2 min-h-11 bg-shallow-water/15 hover:bg-shallow-water border-2 border-shallow-water px-4 rounded-full text-sm font-bold text-charcoal-sea hover:text-surface-dark transition-colors"
                        >
                          {course.name} →
                        </Link>
                      ) : null
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Right: booking card */}
            <div className="lg:col-span-1">
              <DiveSiteDetailClient
                siteName={site.name}
                depth={site.depth}
                boatTime={site.boatTime}
                season={site.season}
                difficulty={site.difficulty}
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      {pageFaqs.length > 0 && (
        <FaqAccordion
          zone="shallow"
          faqs={pageFaqs}
          heading={`Questions about ${site.name}`}
        />
      )}

      <GoogleReviewsSection zone="deep" />

      {/* Related dive sites */}
      <RelatedGrid
        items={relatedSites}
        heading="More dive sites"
      />

      <CtaBand
        notes="Ready to dive?"
        title={<>Let&apos;s get you in the water</>}
        body={<p>WhatsApp us or send a message. We&apos;ll sort the dates, answer questions, and get you booked in.</p>}
      >
        <WhatsAppButton>0743 945 010</WhatsAppButton>
        <BandLink href="/dive-sites">← All dive sites</BandLink>
      </CtaBand>
    </>
  );
}
