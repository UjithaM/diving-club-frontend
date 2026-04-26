import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { getCourses, getCourseBySlug } from "@/lib/api/courses";
import type { Course } from "@/lib/types";

export async function generateStaticParams() {
  const courses = await getCourses();
  return courses.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);
  if (!course) return {};

  const title = `${course.name} in Trincomalee, Sri Lanka — Diving Club`;
  const description = `${course.description.slice(0, 150).trimEnd()}…`;

  return {
    title,
    description,
    alternates: { canonical: `https://divingclub.lk/courses/${course.slug}` },
    openGraph: {
      title,
      description,
      url: `https://divingclub.lk/courses/${course.slug}`,
    },
  };
}

const levelMeta: Record<Course["level"], { label: string; accent: string; bgClass: string; textClass: string }> = {
  beginner:     { label: "Beginner",     accent: "#2A9D8F", bgClass: "bg-shallow-water/15", textClass: "text-shallow-water" },
  advanced:     { label: "Advanced",     accent: "#F4A261", bgClass: "bg-sunrise/15",       textClass: "text-sunrise"       },
  specialty:    { label: "Specialty",    accent: "#E76F51", bgClass: "bg-tropic-coral/15",  textClass: "text-tropic-coral"  },
  professional: { label: "Professional", accent: "#264653", bgClass: "bg-charcoal-sea/10",  textClass: "text-charcoal-sea"  },
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

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: course.name,
    description: course.description,
    url: `https://divingclub.lk/courses/${course.slug}`,
    provider: {
      "@type": "Organization",
      name: "Diving Club",
      url: "https://divingclub.lk",
    },
    offers: {
      "@type": "Offer",
      price: course.price,
      priceCurrency: course.currency,
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section
        className="py-20 px-6 relative overflow-hidden"
        style={{ background: "linear-gradient(160deg, #0d2028 0%, #162830 60%, #0f1e26 100%)" }}
      >
        <div
          className="absolute top-[-10%] right-[-5%] w-80 h-80 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, #2A9D8F20 0%, transparent 70%)" }}
        />

        <div className="max-w-6xl mx-auto relative">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-warm-white/35 text-xs mb-7">
            <Link href="/" className="hover:text-warm-white/60 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/courses" className="hover:text-warm-white/60 transition-colors">Courses</Link>
            <span>/</span>
            <span className="text-warm-white/60">{course.name}</span>
          </nav>

          {/* Level badge */}
          <span
            className="inline-block text-xs font-bold px-3 py-1.5 rounded-full text-white mb-5"
            style={{ background: meta.accent }}
          >
            {meta.label}
          </span>

          <h1 className="text-warm-white text-4xl sm:text-5xl font-bold mb-5 leading-tight max-w-2xl">
            {course.name}
          </h1>

          {/* Meta chips */}
          <div className="flex flex-wrap gap-2 mb-8">
            <span className="text-xs text-warm-white/60 bg-white/10 px-3 py-1.5 rounded-full">
              ⏱ {course.duration}
            </span>
            {course.maxDepth !== "N/A" && (
              <span className="text-xs text-warm-white/60 bg-white/10 px-3 py-1.5 rounded-full">
                ↓ to {course.maxDepth}
              </span>
            )}
            <span className="text-xs text-warm-white/60 bg-white/10 px-3 py-1.5 rounded-full">
              Age {course.minAge}+
            </span>
          </div>

          {/* Price */}
          <div>
            <span className="text-warm-white/50 text-sm uppercase tracking-widest">From</span>
            <p className="text-warm-white text-5xl font-bold leading-none mt-1">
              ${course.price}
              <span className="text-warm-white/40 text-xl font-normal ml-2">{course.currency}</span>
            </p>
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="bg-warm-white py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

            {/* Left: content */}
            <div className="lg:col-span-2 space-y-10">

              {/* Description */}
              <div>
                <h2 className="text-charcoal-sea text-2xl font-bold mb-4">About this course</h2>
                <p className="text-charcoal-sea/70 leading-relaxed">{course.description}</p>
              </div>

              {/* What you'll learn */}
              <div>
                <h2 className="text-charcoal-sea text-2xl font-bold mb-4">What you&apos;ll learn</h2>
                <ul className="space-y-3">
                  {course.whatYouLearn.map((item) => (
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

              {/* What's included */}
              <div>
                <h2 className="text-charcoal-sea text-2xl font-bold mb-4">What&apos;s included</h2>
                <ul className="space-y-3">
                  {course.includes.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-0.5 text-shallow-water text-lg leading-none">✓</span>
                      <span className="text-charcoal-sea/75 leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Requirements */}
              <div className={`rounded-2xl p-6 ${meta.bgClass}`}>
                <h2 className={`text-lg font-bold mb-2 ${meta.textClass}`}>Requirements</h2>
                <p className="text-charcoal-sea/70 leading-relaxed">{course.requirements}</p>
              </div>
            </div>

            {/* Right: booking card */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 bg-white rounded-2xl shadow-md p-7 border border-charcoal-sea/8">
                <div className="mb-6">
                  <p className="text-charcoal-sea/45 text-xs uppercase tracking-widest mb-1">Course price</p>
                  <p className="text-charcoal-sea text-4xl font-bold leading-none">
                    ${course.price}
                    <span className="text-charcoal-sea/35 text-base font-normal ml-1">{course.currency}</span>
                  </p>
                </div>

                <div className="space-y-3 mb-7 text-sm text-charcoal-sea/60">
                  <div className="flex justify-between">
                    <span>Duration</span>
                    <span className="font-semibold text-charcoal-sea">{course.duration}</span>
                  </div>
                  {course.maxDepth !== "N/A" && (
                    <div className="flex justify-between">
                      <span>Max depth</span>
                      <span className="font-semibold text-charcoal-sea">{course.maxDepth}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Min age</span>
                    <span className="font-semibold text-charcoal-sea">{course.minAge}+</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Level</span>
                    <span className={`font-semibold ${meta.textClass}`}>{meta.label}</span>
                  </div>
                </div>

                <a
                  href="tel:0743945010"
                  className="block w-full text-center bg-charcoal-sea text-warm-white font-bold py-3.5 rounded-full hover:bg-shallow-water transition-colors text-sm mb-3"
                >
                  Book This Course
                </a>
                <a
                  href="/contact"
                  className="block w-full text-center border border-charcoal-sea/20 text-charcoal-sea/70 font-semibold py-3.5 rounded-full hover:border-charcoal-sea/40 hover:text-charcoal-sea transition-colors text-sm"
                >
                  Ask a question
                </a>

                <p className="text-center text-xs text-charcoal-sea/35 mt-4 leading-relaxed">
                  All equipment included · Small groups · PADI certified
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 px-6 bg-tropic-coral">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-white/70 text-sm mb-2 uppercase tracking-widest">Ready to dive?</p>
          <h2 className="text-white text-2xl sm:text-3xl font-bold mb-4">
            Let&apos;s get you in the water
          </h2>
          <p className="text-white/80 mb-8 leading-relaxed">
            Call us or send a message and we&apos;ll sort the dates, answer any questions, and get you booked in.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="tel:0743945010"
              className="inline-flex items-center gap-2.5 bg-charcoal-sea text-warm-white font-bold px-8 py-3.5 rounded-full hover:bg-[#1a3340] transition-colors text-sm"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              0743 945 010
            </a>
            <Link
              href="/courses"
              className="inline-flex items-center gap-2 border border-white/40 text-white/80 font-semibold px-8 py-3.5 rounded-full hover:border-white hover:text-white transition-colors text-sm"
            >
              ← View all courses
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
