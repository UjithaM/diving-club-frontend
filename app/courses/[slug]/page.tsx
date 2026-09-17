import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getCourses, getCourseBySlug } from "@/lib/api/courses";
import type { Course } from "@/lib/types";
import CourseDetailClient from "@/components/courses/CourseDetailClient";
import FaqAccordion from "@/components/ui/FaqAccordion";
import GoogleReviewsSection from "@/components/ui/GoogleReviewsSection";
import DetailHero, { type Tone } from "@/components/ui/DetailHero";
import TickDot from "@/components/ui/TickDot";
import RelatedGrid from "@/components/ui/RelatedGrid";
import { courseFaqs } from "@/lib/data/course-faqs";
import type { Course as SchemaCourse, FAQPage, WithContext } from "schema-dts";
import { safeJsonLd } from "@/lib/jsonld";

import CtaBand, { BandLink, WhatsAppButton } from "@/components/ui/CtaBand";
export async function generateStaticParams() {
  const courses = await getCourses();
  return courses.map((c) => ({ slug: c.slug }));
}

const courseTitles: Record<string, string> = {
  "discover-scuba-diving": "Discover Scuba Diving Trincomalee | Try Diving from $75 | Diving Club",
  "open-water-diver": "PADI Open Water Course Trincomalee | Certification from $395 | Diving Club",
  "advanced-open-water": "PADI Advanced Open Water Trincomalee | Dive to 30m | Diving Club",
  "rescue-diver": "PADI Rescue Diver Course Trincomalee | Diving Club",
  "divemaster": "PADI Divemaster Trincomalee, Sri Lanka | Diving Club",
  "deep-diving": "Deep Diving Specialty Course Trincomalee | Diving Club",
  "underwater-photography": "Underwater Photography Course Trincomalee | Diving Club",
};

const courseDescriptions: Record<string, string> = {
  "discover-scuba-diving": "Try scuba diving in Trincomalee with no experience needed. Our Discover Scuba course gets you underwater on coral reefs in one day. From $75.",
  "open-water-diver": "Get PADI Open Water certified in Trincomalee, Sri Lanka. 4 days, real reef dives, worldwide certification. From $395. Small groups, all gear included.",
  "advanced-open-water": "Take your PADI Advanced Open Water course in Trincomalee. Dive to 30m, explore WWII wrecks and outer reef walls. From $295. Book today.",
  "divemaster": "Train as a PADI Divemaster in Trincomalee, Sri Lanka. Intern with our team on 12 dive sites including WWII wrecks and protected reefs.",
};

const courseH1s: Record<string, string> = {
  "open-water-diver": "PADI Open Water Diver Course in Trincomalee",
  "advanced-open-water": "PADI Advanced Open Water Course in Trincomalee",
  "discover-scuba-diving": "Discover Scuba Diving in Trincomalee",
  "rescue-diver": "PADI Rescue Diver Course in Trincomalee",
  "divemaster": "PADI Divemaster in Trincomalee",
  "deep-diving": "Deep Diving Specialty Course in Trincomalee",
  "underwater-photography": "Underwater Photography Course in Trincomalee",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);
  if (!course) return {};

  const title = courseTitles[slug] ?? `${course.name} in Trincomalee | Diving Club`;
  const description = courseDescriptions[slug] ?? course.description.slice(0, 150).trimEnd();

  return {
    title,
    description,
    alternates: { canonical: `https://divingclub.lk/courses/${course.slug}` },
    openGraph: {
      title,
      description,
      url: `https://divingclub.lk/courses/${course.slug}`,
      images: [
        {
          url: "/images/og-home.jpg",
          width: 1200,
          height: 630,
          alt: `${course.name} — PADI scuba diving course in Trincomalee, Sri Lanka`,
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

const levelMeta: Record<Course["level"], { label: string; accent: Tone; bgClass: string; textClass: string }> = {
  beginner:     { label: "Beginner",     accent: "shallow", bgClass: "bg-shallow-water/15", textClass: "text-shallow-water" },
  advanced:     { label: "Advanced",     accent: "sunrise", bgClass: "bg-sunrise/15",       textClass: "text-sunrise"       },
  specialty:    { label: "Specialty",    accent: "coral", bgClass: "bg-tropic-coral/15",  textClass: "text-tropic-coral"  },
  professional: { label: "Professional", accent: "ink", bgClass: "bg-charcoal-sea/10",  textClass: "text-charcoal-sea"  },
};

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);
  if (!course) notFound();

  const meta = levelMeta[course.level];
  const pageFaqs = courseFaqs[course.slug] ?? [];

  // Related courses: same level first (exclude self), up to 3
  const allCourses = await getCourses();
  const relatedCourses = allCourses
    .filter((c) => c.slug !== course.slug && c.level === course.level)
    .concat(allCourses.filter((c) => c.slug !== course.slug && c.level !== course.level))
    .slice(0, 3)
    .map((c) => ({
      slug: c.slug,
      name: c.name,
      description: c.description.slice(0, 120),
      badge: levelMeta[c.level].label,
      badgeTone: levelMeta[c.level].accent,
      href: `/courses/${c.slug}`,
    }));

  const isCredentialCourse = course.level !== "beginner" || course.slug !== "discover-scuba-diving";

  const jsonLd: WithContext<SchemaCourse> = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: course.name,
    description: course.description,
    url: `https://divingclub.lk/courses/${course.slug}`,
    keywords: `PADI courses Trincomalee, scuba diving Sri Lanka, ${course.name.toLowerCase()} Trincomalee`,
    provider: {
      "@type": "Organization",
      name: "Diving Club",
      url: "https://divingclub.lk",
    },
    ...(isCredentialCourse && {
      educationalCredentialAwarded: `PADI ${course.name} Certification`,
    }),
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "Blended",
      location: {
        "@type": "Place",
        name: "Diving Club",
        address: {
          "@type": "PostalAddress",
          streetAddress: "74/9, Sandy Cove",
          addressLocality: "Trincomalee",
          addressCountry: "LK",
        },
      },
      courseSchedule: {
        "@type": "Schedule",
        startDate: "2026-05-01",
        endDate: "2026-10-31",
        repeatFrequency: "P1W",
      },
    },
    offers: {
      "@type": "Offer",
      price: course.price,
      priceCurrency: course.currency,
      availability: "https://schema.org/InStock",
      url: `https://divingclub.lk/courses/${course.slug}`,
      validFrom: "2026-05-01",
    },
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
        crumbs={[{ label: "Home", href: "/" }, { label: "Courses", href: "/courses" }, { label: course.name }]}
        badge={{ label: meta.label, tone: meta.accent }}
        title={courseH1s[course.slug] ?? `${course.name} in Trincomalee`}
        chips={[
          course.duration,
          ...(course.maxDepth !== "N/A" ? [`to ${course.maxDepth}`] : []),
          `Age ${course.minAge}+`,
        ]}
        price={{ prefix: "From", amount: `$${course.price}`, currency: course.currency }}
        image={{ src: course.image, alt: `${course.name} course with Diving Club in Trincomalee, Sri Lanka` }}
      />

      {/* Body */}
      <section className="zone-surface py-12 lg:py-16 px-5 sm:px-8 border-t-2 border-charcoal-sea/10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">

            <div className="lg:col-span-2 space-y-12">

              <div>
                <h2 className="text-[1.75rem] lg:text-[2.25rem] leading-[1.05] tracking-[-0.02em] font-extrabold mb-5 reveal">About this course</h2>
                {course.description.split("\n\n").map((para, i) => (
                  <p key={i} className="text-charcoal-sea/85 text-lead mb-4 max-w-[65ch]">{para}</p>
                ))}
              </div>

              <div>
                <h2 className="text-[1.75rem] lg:text-[2.25rem] leading-[1.05] tracking-[-0.02em] font-extrabold mb-5 reveal">What you&apos;ll learn</h2>
                <ul className="space-y-3.5">
                  {course.whatYouLearn.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <TickDot />
                      <span className="text-charcoal-sea/85 leading-relaxed pt-0.5">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-[1.75rem] lg:text-[2.25rem] leading-[1.05] tracking-[-0.02em] font-extrabold mb-5 reveal">What&apos;s included</h2>
                <ul className="space-y-3.5">
                  {course.includes.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <TickDot />
                      <span className="text-charcoal-sea/85 leading-relaxed pt-0.5">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-[18px] p-6 sm:p-7 bg-sunrise/30 border-2 border-sunrise reveal">
                <h2 className="text-sub font-extrabold mb-2">Requirements</h2>
                <p className="text-charcoal-sea/85 leading-relaxed">{course.requirements}</p>
              </div>
            </div>

            <div className="lg:col-span-1">
              <CourseDetailClient
                courseName={course.name}
                price={course.price}
                currency={course.currency}
                duration={course.duration}
                maxDepth={course.maxDepth}
                minAge={course.minAge}
                metaLabel={meta.label}
              />
            </div>

          </div>
        </div>
      </section>

      {/* FAQ */}
      {pageFaqs.length > 0 && (
        <FaqAccordion zone="shallow" faqs={pageFaqs} heading={`Questions about the ${course.name} course`} />
      )}

      <GoogleReviewsSection zone="deep" />

      {/* Related courses */}
      <RelatedGrid items={relatedCourses} heading="Other courses you might like" />

      <CtaBand
        notes="Ready to dive?"
        title={<>Let&apos;s get you in the water</>}
        body={<p>WhatsApp us or send a message and we&apos;ll sort the dates, answer any questions, and get you booked in.</p>}
      >
        <WhatsAppButton>0743 945 010</WhatsAppButton>
        <BandLink href="/courses">← View all courses</BandLink>
      </CtaBand>
    </>
  );
}
