import type { Metadata } from "next";
import { getCourses } from "@/lib/api/courses";
import CourseGrid from "@/components/courses/CourseGrid";

export const metadata: Metadata = {
  title: "PADI Dive Courses",
  description:
    "Nine PADI-certified scuba courses in Trincomalee, Sri Lanka — from Discover Scuba to Divemaster. All levels welcome. Small groups, all equipment included. From $75.",
  alternates: { canonical: "https://divingclub.lk/courses" },
  openGraph: {
    title: "PADI Dive Courses in Trincomalee, Sri Lanka",
    description:
      "Nine PADI courses — Discover Scuba, Open Water, Advanced, Rescue Diver, Divemaster and more. Small groups, local guides, all gear included.",
    url: "https://divingclub.lk/courses",
  },
};

export default async function CoursesPage() {
  const courses = await getCourses();

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "PADI Scuba Diving Courses — Diving Club Trincomalee",
    numberOfItems: courses.length,
    itemListElement: courses.map((course, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
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
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />

      {/* Page hero */}
      <section
        className="py-20 px-6 relative overflow-hidden"
        style={{ background: "linear-gradient(160deg, #0d2028 0%, #162830 60%, #0f1e26 100%)" }}
      >
        {/* Decorative orbs */}
        <div
          className="absolute top-[-15%] right-[-5%] w-96 h-96 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, #2A9D8F25 0%, transparent 70%)" }}
        />
        <div
          className="absolute bottom-[-20%] left-[-8%] w-72 h-72 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, #F4A26115 0%, transparent 70%)" }}
        />

        <div className="max-w-6xl mx-auto relative">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-warm-white/35 text-xs mb-7">
            <a href="/" className="hover:text-warm-white/60 transition-colors">Home</a>
            <span>/</span>
            <span className="text-warm-white/60">Courses</span>
          </nav>

          <div className="flex items-center gap-3 mb-5">
            <span className="h-px w-8 bg-shallow-water" />
            <span className="text-shallow-water text-xs font-semibold tracking-[0.2em] uppercase">
              PADI Certified · Trincomalee
            </span>
          </div>

          <h1 className="text-warm-white text-4xl sm:text-6xl font-bold mb-5 leading-tight">
            Dive Courses
          </h1>
          <p className="text-warm-white/55 text-lg max-w-xl leading-relaxed mb-10">
            From your very first breath underwater to your Divemaster certification — all of it here, in
            Trincomalee&apos;s warm, crystal-clear water.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap gap-8">
            {[
              { value: "9", label: "PADI Courses" },
              { value: "All levels", label: "Beginner to Pro" },
              { value: "From $75", label: "Starting price" },
              { value: "186", label: "Countries cert. valid" },
            ].map((s) => (
              <div key={s.label} className="flex flex-col">
                <span className="text-warm-white text-2xl font-bold leading-none">{s.value}</span>
                <span className="text-warm-white/35 text-xs uppercase tracking-widest mt-1">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Filter + grid */}
      <CourseGrid courses={courses} />

      {/* Bottom CTA */}
      <section className="py-16 px-6 bg-tropic-coral">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-white/70 text-sm mb-2 uppercase tracking-widest">Need guidance?</p>
          <h2 className="text-white text-2xl sm:text-3xl font-bold mb-4">
            Not sure which course to start with?
          </h2>
          <p className="text-white/80 mb-8 leading-relaxed">
            Drop us a call and we&apos;ll figure out the right fit — whether you&apos;ve never seen a tank before
            or you&apos;re working towards your Divemaster.
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
            <a
              href="/contact"
              className="inline-flex items-center gap-2 border border-white/40 text-white/80 font-semibold px-8 py-3.5 rounded-full hover:border-white hover:text-white transition-colors text-sm"
            >
              Send a message
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
