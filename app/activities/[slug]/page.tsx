import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { getExperiences, getExperienceBySlug } from "@/lib/api/experiences";
import type { Experience } from "@/lib/types";
import ActivityDetailClient from "@/components/activities/ActivityDetailClient";
import FaqAccordion from "@/components/ui/FaqAccordion";
import GalleryStrip from "@/components/ui/GalleryStrip";
import TestimonialStrip from "@/components/ui/TestimonialStrip";
import RelatedGrid from "@/components/ui/RelatedGrid";
import { activityFaqs } from "@/lib/data/activity-faqs";
import { testimonials } from "@/lib/data/testimonials";
import { experiences as allExperiences } from "@/lib/data/experiences";

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

  const title = `${experience.name} in Trincomalee, Sri Lanka — Diving Club`;
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

const typeMeta: Record<
  Experience["type"],
  { label: string; accent: string; bgClass: string; textClass: string }
> = {
  "try-diving":     { label: "Try Diving",     accent: "#2A9D8F", bgClass: "bg-shallow-water/15", textClass: "text-shallow-water" },
  "fun-diving":     { label: "Fun Diving",     accent: "#F4A261", bgClass: "bg-sunrise/15",       textClass: "text-sunrise"       },
  snorkeling:       { label: "Snorkeling",     accent: "#E76F51", bgClass: "bg-tropic-coral/15",  textClass: "text-tropic-coral"  },
  "whale-watching": { label: "Whale Watching", accent: "#264653", bgClass: "bg-charcoal-sea/10",  textClass: "text-charcoal-sea"  },
  "jet-ski":        { label: "Jet Ski",        accent: "#2A9D8F", bgClass: "bg-shallow-water/15", textClass: "text-shallow-water" },
  "boat-tour":      { label: "Boat Tour",      accent: "#F4A261", bgClass: "bg-sunrise/15",       textClass: "text-sunrise"       },
  "sunset-tour":    { label: "Sunset Tour",    accent: "#E76F51", bgClass: "bg-tropic-coral/15",  textClass: "text-tropic-coral"  },
};

export default async function ActivityDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const experience = await getExperienceBySlug(slug);
  if (!experience) notFound();

  const meta = typeMeta[experience.type];
  const pageFaqs = activityFaqs[experience.slug] ?? [];

  // Related activities (up to 3, exclude self)
  const relatedActivities = allExperiences
    .filter((e) => e.slug !== experience.slug)
    .slice(0, 3)
    .map((e) => ({
      slug: e.slug,
      name: e.name,
      description: e.description.slice(0, 120),
      badge: typeMeta[e.type].label,
      badgeColor: typeMeta[e.type].accent,
      href: `/activities/${e.slug}`,
    }));

  // Pick 1–2 testimonials
  const activityTestimonials = testimonials
    .filter((t) => t.course === "Discover Scuba Diving" || !t.course?.includes("Diver"))
    .slice(0, 2);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    name: experience.name,
    description: experience.description.slice(0, 300),
    url: `https://divingclub.lk/activities/${experience.slug}`,
    offers: {
      "@type": "Offer",
      price: experience.price,
      priceCurrency: experience.currency,
      availability: "https://schema.org/InStock",
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
      <GalleryStrip images={[]} heading={`${experience.name} — Photos`} />

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
            Call us or send a message and we&apos;ll sort the dates, answer any questions, and get you booked in.
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
