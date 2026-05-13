import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { getDiveSites, getDiveSiteBySlug } from "@/lib/api/dive-sites";
import { getCourseBySlug } from "@/lib/api/courses";
import DiveSiteDetailClient from "@/components/dive-sites/DiveSiteDetailClient";
import FaqAccordion from "@/components/ui/FaqAccordion";
import GalleryStrip from "@/components/ui/GalleryStrip";
import TestimonialStrip from "@/components/ui/TestimonialStrip";
import RelatedGrid from "@/components/ui/RelatedGrid";
import { diveSiteFaqs } from "@/lib/data/dive-site-faqs";
import { testimonials } from "@/lib/data/testimonials";

export async function generateStaticParams() {
  const sites = await getDiveSites();
  return sites.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const site = await getDiveSiteBySlug(slug);
  if (!site) return {};

  const title = `${site.name} Dive Site — Trincomalee, Sri Lanka`;
  const description = site.description.slice(0, 155).trimEnd() + "…";

  return {
    title,
    description,
    alternates: { canonical: `https://divingclub.lk/dive-sites/${site.slug}` },
    openGraph: {
      title,
      description,
      url: `https://divingclub.lk/dive-sites/${site.slug}`,
    },
  };
}

const difficultyMeta: Record<string, { accent: string; textClass: string; bgClass: string }> = {
  beginner:     { accent: "#2A9D8F", textClass: "text-shallow-water", bgClass: "bg-shallow-water/15" },
  Beginner:     { accent: "#2A9D8F", textClass: "text-shallow-water", bgClass: "bg-shallow-water/15" },
  intermediate: { accent: "#F4A261", textClass: "text-sunrise",       bgClass: "bg-sunrise/15"       },
  Intermediate: { accent: "#F4A261", textClass: "text-sunrise",       bgClass: "bg-sunrise/15"       },
  advanced:     { accent: "#E76F51", textClass: "text-tropic-coral",  bgClass: "bg-tropic-coral/15"  },
  Advanced:     { accent: "#E76F51", textClass: "text-tropic-coral",  bgClass: "bg-tropic-coral/15"  },
  technical:    { accent: "#264653", textClass: "text-charcoal-sea",  bgClass: "bg-charcoal-sea/10"  },
  Technical:    { accent: "#264653", textClass: "text-charcoal-sea",  bgClass: "bg-charcoal-sea/10"  },
};

const defaultDifficultyMeta = { accent: "#2A9D8F", textClass: "text-shallow-water", bgClass: "bg-shallow-water/15" };

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
      badgeColor: (difficultyMeta[s.difficulty] ?? defaultDifficultyMeta).accent,
      href: `/dive-sites/${s.slug}`,
    }));

  // Related courses
  const relatedCourses = (
    await Promise.all(site.relatedCourses.map((slug) => getCourseBySlug(slug)))
  ).filter(Boolean);

  const siteJsonLd = {
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
  };

  const pageFaqsJsonLd = pageFaqs.length > 0
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

  // Filter 1–2 relevant testimonials
  const siteTestimonials = testimonials.filter((t) =>
    t.course === "Fun Diving" || t.course === "Advanced Open Water Diver"
  ).slice(0, 2);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd) }}
      />
      {pageFaqsJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(pageFaqsJsonLd) }}
        />
      )}

      {/* Hero */}
      <section className="bg-charcoal-sea py-16 lg:py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <nav className="flex items-center gap-2 text-warm-white/35 text-xs mb-7">
            <Link href="/" className="hover:text-warm-white/60 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/dive-sites" className="hover:text-warm-white/60 transition-colors">Dive Sites</Link>
            <span>/</span>
            <span className="text-warm-white/60">{site.name}</span>
          </nav>

          <span
            className="inline-block text-xs font-bold px-3 py-1.5 rounded-full text-white mb-5"
            style={{ background: meta.accent }}
          >
            {site.difficulty}
          </span>

          <h1 className="text-warm-white text-4xl sm:text-5xl font-bold mb-5 leading-tight max-w-2xl">
            {site.name}
          </h1>

          <div className="flex flex-wrap gap-2 mb-8">
            <span className="text-xs text-warm-white/60 bg-white/10 px-3 py-1.5 rounded-full">
              ↓ {site.depth}
            </span>
            <span className="text-xs text-warm-white/60 bg-white/10 px-3 py-1.5 rounded-full">
              ⏱ {site.boatTime} by boat
            </span>
            <span className="text-xs text-warm-white/60 bg-white/10 px-3 py-1.5 rounded-full">
              📅 {site.season}
            </span>
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="bg-warm-white py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

            {/* Left: content */}
            <div className="lg:col-span-2 space-y-10">

              <div>
                <h2 className="text-charcoal-sea text-2xl font-bold mb-4">About this dive site</h2>
                {site.description.split("\n\n").map((para, i) => (
                  <p key={i} className="text-charcoal-sea/70 leading-relaxed mb-4">{para}</p>
                ))}
              </div>

              <div>
                <h2 className="text-charcoal-sea text-2xl font-bold mb-4">What you&apos;ll see</h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {site.marineLife.map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <span
                        className="w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center"
                        style={{ background: meta.accent }}
                      >
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                          <path d="M2 5l2.5 2.5L8 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      <span className="text-charcoal-sea/75 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-charcoal-sea text-2xl font-bold mb-4">Site highlights</h2>
                <ul className="space-y-2">
                  {site.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-3">
                      <span className="mt-0.5 text-tropic-coral text-lg leading-none">✓</span>
                      <span className="text-charcoal-sea/75 leading-relaxed">{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className={`rounded-2xl p-6 ${meta.bgClass}`}>
                <h2 className={`text-lg font-bold mb-2 ${meta.textClass}`}>Currents &amp; Visibility</h2>
                <p className="text-charcoal-sea/70 leading-relaxed">{site.currentsVisibility}</p>
              </div>

              {relatedCourses.length > 0 && (
                <div>
                  <h2 className="text-charcoal-sea text-2xl font-bold mb-4">Recommended courses for this site</h2>
                  <div className="flex flex-wrap gap-3">
                    {relatedCourses.map((course) =>
                      course ? (
                        <Link
                          key={course.slug}
                          href={`/courses/${course.slug}`}
                          className="inline-flex items-center gap-2 bg-charcoal-sea/5 hover:bg-charcoal-sea/10 border border-charcoal-sea/10 px-4 py-2 rounded-full text-sm font-semibold text-charcoal-sea transition-colors"
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
                difficultyTextClass={meta.textClass}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <GalleryStrip
        images={[]}
        heading={`Photos — ${site.name}`}
      />

      {/* FAQ */}
      {pageFaqs.length > 0 && (
        <FaqAccordion
          faqs={pageFaqs}
          heading={`Questions about ${site.name}`}
        />
      )}

      {/* Testimonials */}
      {siteTestimonials.length > 0 && (
        <TestimonialStrip testimonials={siteTestimonials} />
      )}

      {/* Related dive sites */}
      <RelatedGrid
        items={relatedSites}
        heading="More dive sites"
      />

      {/* Bottom CTA */}
      <section className="bg-charcoal-sea py-20 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-12 h-px bg-tropic-coral mx-auto mb-8" />
          <span className="block text-[11px] uppercase tracking-[0.25em] font-semibold text-tropic-coral/70 mb-4">
            Ready to dive?
          </span>
          <h2 className="text-warm-white font-display text-[clamp(2rem,5vw,3.5rem)] font-extrabold leading-tight mb-5">
            Let&apos;s get you in the water
          </h2>
          <p className="text-warm-white/50 text-base leading-relaxed max-w-lg mx-auto mb-10">
            Call us or send a message — we&apos;ll sort the dates, answer questions, and get you booked in.
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
              href="/dive-sites"
              className="inline-flex items-center gap-2 text-warm-white/50 font-semibold text-sm hover:text-warm-white transition-colors"
            >
              ← All dive sites
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
