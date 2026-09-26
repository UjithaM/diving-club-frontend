import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getExperiences, getExperienceBySlug } from "@/lib/api/experiences";
import ActivityDetailClient from "@/components/activities/ActivityDetailClient";
import FaqAccordion from "@/components/ui/FaqAccordion";
import GoogleReviewsSection from "@/components/ui/GoogleReviewsSection";
import DetailHero, { type Tone } from "@/components/ui/DetailHero";
import TickDot from "@/components/ui/TickDot";
import RelatedGrid from "@/components/ui/RelatedGrid";
import { activityFaqs } from "@/lib/data/activity-faqs";
import type { TouristAttraction, FAQPage, WithContext } from "schema-dts";
import { safeJsonLd } from "@/lib/jsonld";

import CtaBand, { BandLink, WhatsAppButton } from "@/components/ui/CtaBand";
import { money } from "@/lib/money";
export async function generateStaticParams() {
  const experiences = await getExperiences();
  return experiences.map((e) => ({ slug: e.slug }));
}

const activityTitles: Record<string, string> = {
  "try-diving": "Try Scuba Diving Trincomalee | No Experience Needed | Diving Club",
  "fun-diving-2": "Fun Diving Trincomalee | 2-Dive Package | Diving Club",
  "fun-diving-4": "Fun Diving Trincomalee | 4-Dive Package | Diving Club",
  "whale-watching": "Whale Watching Trincomalee | Blue Whales & Dolphins | Diving Club",
  "snorkeling-tour": "Snorkeling Tour Trincomalee | Coral Reefs & Marine Life | Diving Club",
};

const activityDescriptions: Record<string, string> = {
  "try-diving": "Try diving in Trincomalee — no certification needed. Breathe underwater on a coral reef with an instructor beside you the whole time. From $65.",
  "whale-watching": "Whale watching in Trincomalee. Blue whales, spinner dolphins, and one of Asia's best migration routes. 3-hour boat trips from $55.",
};

const activityH1s: Record<string, string> = {
  "try-diving": "Try Scuba Diving in Trincomalee",
  "whale-watching": "Whale Watching in Trincomalee",
  "fun-diving-2": "Fun Diving in Trincomalee",
  "fun-diving-4": "Fun Diving in Trincomalee",
  "snorkeling-tour": "Snorkeling in Trincomalee",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const experience = await getExperienceBySlug(slug);
  if (!experience) return {};

  const title = activityTitles[slug] ?? `${experience.name} in Trincomalee | Diving Club`;
  const description = activityDescriptions[slug] ?? experience.description.slice(0, 150).trimEnd();

  return {
    title,
    description,
    alternates: { canonical: `https://divingclub.lk/activities/${experience.slug}` },
    openGraph: {
      title,
      description,
      url: `https://divingclub.lk/activities/${experience.slug}`,
      images: [
        {
          url: "/images/og-home.jpg",
          width: 1200,
          height: 630,
          alt: `${experience.name} in Trincomalee, Sri Lanka`,
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

const typeMeta: Record<string, { label: string; accent: Tone; bgClass: string; textClass: string }> = {
  "try-diving":     { label: "Try Diving",     accent: "shallow", bgClass: "bg-shallow-water/15", textClass: "text-shallow-water" },
  "fun-diving":     { label: "Fun Diving",     accent: "sunrise", bgClass: "bg-sunrise/15",       textClass: "text-sunrise"       },
  snorkeling:       { label: "Snorkeling",     accent: "coral", bgClass: "bg-tropic-coral/15",  textClass: "text-tropic-coral"  },
  "whale-watching": { label: "Whale Watching", accent: "ink", bgClass: "bg-charcoal-sea/10",  textClass: "text-charcoal-sea"  },
  "jet-ski":        { label: "Jet Ski",        accent: "shallow", bgClass: "bg-shallow-water/15", textClass: "text-shallow-water" },
  "boat-tour":      { label: "Boat Tour",      accent: "sunrise", bgClass: "bg-sunrise/15",       textClass: "text-sunrise"       },
  "sunset-tour":    { label: "Sunset Tour",    accent: "coral", bgClass: "bg-tropic-coral/15",  textClass: "text-tropic-coral"  },
};

const defaultTypeMeta: { label: string; accent: Tone; bgClass: string; textClass: string } = { label: "Activity", accent: "shallow", bgClass: "bg-shallow-water/15", textClass: "text-shallow-water" };

export default async function ActivityDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const experience = await getExperienceBySlug(slug);
  if (!experience) notFound();

  const meta = typeMeta[experience.type] ?? defaultTypeMeta;
  const pageFaqs = activityFaqs[experience.slug] ?? [];

  // Related activities (up to 3, exclude self)
  const allExperiences = await getExperiences();
  const relatedActivities = allExperiences
    .filter((e) => e.slug !== experience.slug)
    .slice(0, 3)
    .map((e) => {
      const eMeta = typeMeta[e.type] ?? defaultTypeMeta;
      return {
        slug: e.slug,
        name: e.name,
        description: e.description.slice(0, 120),
        badge: eMeta.label,
        badgeTone: eMeta.accent,
        href: `/activities/${e.slug}`,
      };
    });

  const isSeasonalEvent = experience.type === "whale-watching" || experience.type === "try-diving" || experience.type === "fun-diving";

  const jsonLd: WithContext<TouristAttraction> = {
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    name: experience.name,
    description: experience.description.slice(0, 300),
    url: `https://divingclub.lk/activities/${experience.slug}`,
    ...(isSeasonalEvent && {
      location: {
        "@type": "Place",
        name: "Trincomalee Bay, Sri Lanka",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Trincomalee",
          addressCountry: "LK",
        },
      },
    }),
  };

  const faqJsonLd: WithContext<FAQPage> | null = pageFaqs.length > 0
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
        dangerouslySetInnerHTML={{ __html: safeJsonLd(jsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: safeJsonLd(faqJsonLd) }}
        />
      )}

      <DetailHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Activities", href: "/activities" }, { label: experience.name }]}
        badge={{ label: meta.label, tone: meta.accent }}
        title={activityH1s[experience.slug] ?? `${experience.name} in Trincomalee`}
        chips={[
          experience.duration,
          `Age ${experience.minAge}+`,
          ...(experience.divesIncluded
            ? [`${experience.divesIncluded} dive${experience.divesIncluded > 1 ? "s" : ""} included`]
            : []),
        ]}
        price={{ prefix: "From", amount: money(experience.price, experience.currency), currency: experience.currency }}
        image={{ src: experience.image, alt: `${experience.name} with Diving Club in Trincomalee, Sri Lanka` }}
      />

      {/* Body */}
      <section className="zone-surface py-12 lg:py-16 px-5 sm:px-8 border-t-2 border-charcoal-sea/10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">

            <div className="lg:col-span-2 space-y-12">

              <div>
                <h2 className="text-[1.75rem] lg:text-[2.25rem] leading-[1.05] tracking-[-0.02em] font-extrabold mb-5 reveal">About this activity</h2>
                {experience.description.split("\n\n").map((para, i) => (
                  <p key={i} className="text-charcoal-sea/85 text-lead mb-4 max-w-[65ch]">{para}</p>
                ))}
              </div>

              <div>
                <h2 className="text-[1.75rem] lg:text-[2.25rem] leading-[1.05] tracking-[-0.02em] font-extrabold mb-5 reveal">What&apos;s included</h2>
                <ul className="space-y-3.5">
                  {experience.includes.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <TickDot />
                      <span className="text-charcoal-sea/85 leading-relaxed pt-0.5">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-[18px] p-6 sm:p-7 bg-sunrise/30 border-2 border-sunrise reveal">
                <h2 className="text-sub font-extrabold mb-2">Who can join</h2>
                <p className="text-charcoal-sea/85 leading-relaxed">{experience.requirements}</p>
              </div>
            </div>

            <div className="lg:col-span-1">
              <ActivityDetailClient
                experienceName={experience.name}
                price={experience.price}
                currency={experience.currency}
                duration={experience.duration}
                minAge={experience.minAge}
                divesIncluded={experience.divesIncluded}
                metaLabel={meta.label}
              />
            </div>

          </div>
        </div>
      </section>

      {/* FAQ */}
      {pageFaqs.length > 0 && (
        <FaqAccordion zone="shallow" faqs={pageFaqs} heading={`Questions about ${experience.name}`} />
      )}

      <GoogleReviewsSection zone="deep" />

      {/* Related activities */}
      <RelatedGrid items={relatedActivities} heading="More things to do" />

      <CtaBand
        notes="Ready to go?"
        title={<>Let&apos;s get you in the water</>}
        body={<p>WhatsApp us or send a message and we&apos;ll sort the dates, answer any questions, and get you booked in.</p>}
      >
        <WhatsAppButton>0743 945 010</WhatsAppButton>
        <BandLink href="/activities">← View all activities</BandLink>
      </CtaBand>
    </>
  );
}
