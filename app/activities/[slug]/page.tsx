import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { getExperiences, getExperienceBySlug } from "@/lib/api/experiences";
import ActivityDetailClient from "@/components/activities/ActivityDetailClient";
import FaqAccordion from "@/components/ui/FaqAccordion";
import GalleryStrip from "@/components/ui/GalleryStrip";
import TestimonialStrip from "@/components/ui/TestimonialStrip";
import RelatedGrid from "@/components/ui/RelatedGrid";
import { activityFaqs } from "@/lib/data/activity-faqs";
import { testimonials } from "@/lib/data/testimonials";

export async function generateStaticParams() {
  const experiences = await getExperiences();
  return experiences.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const experience = await getExperienceBySlug(slug);
  if (!experience) return {};

  const title = `${experience.name} in Trincomalee, Sri Lanka | Diving Club`;
  const description = `${experience.description.slice(0, 150).trimEnd()}…`;

  return {
    title,
    description,
    alternates: { canonical: `https://divingclub.lk/activities/${experience.slug}` },
    openGraph: {
      title,
      description,
      url: `https://divingclub.lk/activities/${experience.slug}`,
    },
  };
}

const typeMeta: Record<string, { label: string; accent: string; bgClass: string; textClass: string }> = {
  "try-diving":     { label: "Try Diving",     accent: "#2A9D8F", bgClass: "bg-shallow-water/15", textClass: "text-shallow-water" },
  "fun-diving":     { label: "Fun Diving",     accent: "#F4A261", bgClass: "bg-sunrise/15",       textClass: "text-sunrise"       },
  snorkeling:       { label: "Snorkeling",     accent: "#E76F51", bgClass: "bg-tropic-coral/15",  textClass: "text-tropic-coral"  },
  "whale-watching": { label: "Whale Watching", accent: "#264653", bgClass: "bg-charcoal-sea/10",  textClass: "text-charcoal-sea"  },
  "jet-ski":        { label: "Jet Ski",        accent: "#2A9D8F", bgClass: "bg-shallow-water/15", textClass: "text-shallow-water" },
  "boat-tour":      { label: "Boat Tour",      accent: "#F4A261", bgClass: "bg-sunrise/15",       textClass: "text-sunrise"       },
  "sunset-tour":    { label: "Sunset Tour",    accent: "#E76F51", bgClass: "bg-tropic-coral/15",  textClass: "text-tropic-coral"  },
};

const defaultTypeMeta = { label: "Activity", accent: "#2A9D8F", bgClass: "bg-shallow-water/15", textClass: "text-shallow-water" };

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
        badgeColor: eMeta.accent,
        href: `/activities/${e.slug}`,
      };
    });

  // Pick 1–2 testimonials
  const activityTestimonials = testimonials
    .filter((t) => t.course === "Discover Scuba Diving" || !t.course?.includes("Diver"))
    .slice(0, 2);

  const isSeasonalEvent = experience.type === "whale-watching" || experience.type === "try-diving" || experience.type === "fun-diving";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": isSeasonalEvent ? ["TouristAttraction", "SportsEvent"] : "TouristAttraction",
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
      eventSchedule: {
        "@type": "Schedule",
        startDate: "2025-05-01",
        endDate: "2025-10-31",
        repeatFrequency: "P1D",
      },
      organizer: {
        "@type": "LocalBusiness",
        name: "Diving Club",
        url: "https://divingclub.lk",
      },
    }),
    offers: {
      "@type": "Offer",
      price: experience.price,
      priceCurrency: experience.currency,
      availability: "https://schema.org/InStock",
      validFrom: "2025-05-01",
    },
    provider: {
      "@type": "LocalBusiness",
      name: "Diving Club",
      url: "https://divingclub.lk",
    },
  };

  const faqJsonLd = pageFaqs.length > 0
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}

      {/* Hero */}
      <section className="bg-charcoal-sea py-16 lg:py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <nav className="flex items-center gap-2 text-warm-white/35 text-xs mb-7">
            <Link href="/" className="hover:text-warm-white/60 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/activities" className="hover:text-warm-white/60 transition-colors">Activities</Link>
            <span>/</span>
            <span className="text-warm-white/60">{experience.name}</span>
          </nav>

          <span
            className="inline-block text-xs font-bold px-3 py-1.5 rounded-full text-white mb-5"
            style={{ background: meta.accent }}
          >
            {meta.label}
          </span>

          <h1 className="text-warm-white text-4xl sm:text-5xl font-bold mb-5 leading-tight max-w-2xl">
            {experience.name}
          </h1>

          <div className="flex flex-wrap gap-2 mb-8">
            <span className="text-xs text-warm-white/60 bg-white/10 px-3 py-1.5 rounded-full">
              ⏱ {experience.duration}
            </span>
            <span className="text-xs text-warm-white/60 bg-white/10 px-3 py-1.5 rounded-full">
              Age {experience.minAge}+
            </span>
            {experience.divesIncluded && (
              <span className="text-xs text-warm-white/60 bg-white/10 px-3 py-1.5 rounded-full">
                🫧 {experience.divesIncluded} dive{experience.divesIncluded > 1 ? "s" : ""} included
              </span>
            )}
          </div>

          <div>
            <span className="text-warm-white/50 text-sm uppercase tracking-widest">From</span>
            <p className="text-warm-white text-5xl font-bold leading-none mt-1">
              ${experience.price}
              <span className="text-warm-white/40 text-xl font-normal ml-2">{experience.currency}</span>
            </p>
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="bg-warm-white py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

            <div className="lg:col-span-2 space-y-10">

              <div>
                <h2 className="text-charcoal-sea text-2xl font-bold mb-4">About this activity</h2>
                {experience.description.split("\n\n").map((para, i) => (
                  <p key={i} className="text-charcoal-sea/70 leading-relaxed mb-4">{para}</p>
                ))}
              </div>

              <div>
                <h2 className="text-charcoal-sea text-2xl font-bold mb-4">What&apos;s included</h2>
                <ul className="space-y-3">
                  {experience.includes.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span
                        className="mt-0.5 w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center"
                        style={{ background: meta.accent }}
                      >
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                          <path d="M2 5l2.5 2.5L8 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      <span className="text-charcoal-sea/75 leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className={`rounded-2xl p-6 ${meta.bgClass}`}>
                <h2 className={`text-lg font-bold mb-2 ${meta.textClass}`}>Who can join</h2>
                <p className="text-charcoal-sea/70 leading-relaxed">{experience.requirements}</p>
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
                metaTextClass={meta.textClass}
                metaLabel={meta.label}
              />
            </div>

          </div>
        </div>
      </section>

      {/* Gallery */}
      <GalleryStrip images={[]} heading={`${experience.name} Photos`} />

      {/* FAQ */}
      {pageFaqs.length > 0 && (
        <FaqAccordion faqs={pageFaqs} heading={`Questions about ${experience.name}`} />
      )}

      {/* Testimonials */}
      {activityTestimonials.length > 0 && (
        <TestimonialStrip testimonials={activityTestimonials} />
      )}

      {/* Related activities */}
      <RelatedGrid items={relatedActivities} heading="More things to do" />

      {/* Bottom CTA */}
      <section className="bg-charcoal-sea py-20 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-12 h-px bg-tropic-coral mx-auto mb-8" />
          <span className="block text-[11px] uppercase tracking-[0.25em] font-semibold text-tropic-coral/70 mb-4">Ready to go?</span>
          <h2 className="text-warm-white font-display text-[clamp(2rem,5vw,3.5rem)] font-extrabold leading-tight mb-5">
            Let&apos;s get you in the water
          </h2>
          <p className="text-warm-white/50 text-base leading-relaxed max-w-lg mx-auto mb-10">
            WhatsApp us or send a message and we&apos;ll sort the dates, answer any questions, and get you booked in.
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
              href="/activities"
              className="inline-flex items-center gap-2 text-warm-white/50 font-semibold text-sm hover:text-warm-white transition-colors"
            >
              ← View all activities
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
