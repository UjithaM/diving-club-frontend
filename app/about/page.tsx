import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import AnimatedSection from "@/components/ui/AnimatedSection";
import type { AboutPage, Person, WithContext } from "schema-dts";
import { safeJsonLd } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "About Diving Club | PADI Dive Centre, Trincomalee",
  description:
    "Meet J Rockshan, Sri Lanka's youngest PADI instructor, and the story behind Diving Club. 1,000+ certified divers, 15+ years on Trincomalee's reefs.",
  alternates: { canonical: "https://divingclub.lk/about" },
  openGraph: {
    title: "About Diving Club: Our Story",
    description:
      "Meet J Rockshan, Sri Lanka's youngest PADI scuba instructor, and the story behind Diving Club. 1,000+ students certified since 2010 in Trincomalee.",
    url: "https://divingclub.lk/about",
    images: [
      {
        url: "/assets/J-rockshan-with-open-water-students.webp",
        width: 1200,
        height: 630,
        alt: "J Rockshan with two newly certified Open Water students on the beach in Trincomalee",
      },
    ],
  },
};

const personJsonLd: WithContext<Person> = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "J Rockshan",
  jobTitle: "PADI Scuba Instructor",
  description:
    "Sri Lanka's youngest certified PADI scuba instructor, based in Trincomalee. Over 1,000 students certified and 15+ years of ocean experience.",
  worksFor: {
    "@type": "LocalBusiness",
    "@id": "https://divingclub.lk",
    name: "Diving Club",
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: "74/9, Sandy Cove",
    postalCode: "31000",
    addressLocality: "Trincomalee",
    addressCountry: "LK",
  },
  hasCredential: {
    "@type": "EducationalOccupationalCredential",
    credentialCategory: "certification",
    name: "PADI Scuba Instructor Certification",
    recognizedBy: {
      "@type": "Organization",
      name: "Professional Association of Diving Instructors (PADI)",
    },
  },
};

const aboutPageJsonLd: WithContext<AboutPage> = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "About Diving Club Trincomalee",
  url: "https://divingclub.lk/about",
  description:
    "The story of Diving Club Trincomalee, founded by J Rockshan, Sri Lanka's youngest PADI scuba instructor.",
  mainEntity: {
    "@type": "LocalBusiness",
    "@id": "https://divingclub.lk",
    name: "Diving Club",
    foundingDate: "2010",
    founder: { "@type": "Person", name: "J Rockshan" },
    address: {
      "@type": "PostalAddress",
      streetAddress: "74/9, Sandy Cove",
      postalCode: "31000",
      addressLocality: "Trincomalee",
      addressCountry: "LK",
    },
    sameAs: ["https://www.seaworlddiving.com"],
  },
};

const stats = [
  { value: "1,000+", label: "Students Certified" },
  { value: "15+", label: "Years on the Water" },
  { value: "25+", label: "Dive Sites Explored" },
  { value: "PADI", label: "Certified Instructors" },
];

const values = [
  {
    label: "Safety First",
    body: "Every dive brief, every equipment check, every call in the water: safety comes before anything else. That doesn't mean being boring. It means everyone gets home happy.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#E76F51" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    label: "Local Expertise",
    body: "We've been diving these reefs for over 15 years. We know the currents, the seasons, the spots the guidebooks don't mention. Knowledge that only comes from real time in the water.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#E76F51" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
  {
    label: "Small Groups",
    body: "Maximum 5 divers per dive. We're not running a cattle operation. We're taking you diving. Your comfort, your pace, your experience.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#E76F51" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
  },
  {
    label: "All Ages Welcome",
    body: "First-timers, nervous beginners, sixty-somethings trying scuba for the first time: everyone belongs here. The ocean doesn't care how old you are, and neither do we.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#E76F51" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
      </svg>
    ),
  },
];

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(personJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(aboutPageJsonLd) }}
      />

      {/* ── 1. HERO ──────────────────────────────────────── */}
      <section className="bg-charcoal-sea py-16 lg:py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <nav
            className="flex items-center gap-2 text-warm-white/35 text-xs mb-8"
            aria-label="Breadcrumb"
          >
            <Link href="/" className="hover:text-warm-white/60 transition-colors">
              Home
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-warm-white/60">About Us</span>
          </nav>

          <div className="flex items-center gap-3 mb-5">
            <span className="h-px w-6 bg-tropic-coral" aria-hidden="true" />
            <span className="text-tropic-coral text-[11px] font-semibold tracking-[0.22em] uppercase">
              Sandy Cove · Trincomalee · Est. 2010
            </span>
          </div>

          <h1 className="text-warm-white font-display text-[clamp(2.5rem,6vw,5rem)] font-extrabold leading-tight mb-5 max-w-3xl">
            The ocean changed everything. We just want to share it.
          </h1>

          <p className="text-warm-white/55 text-base leading-relaxed max-w-xl">
            We&rsquo;re a small dive center tucked into Sandy Cove, the kind of place where your
            instructor knows your name before the tank is even on your back.
          </p>
        </div>
      </section>

      {/* ── 2. FOUNDER ───────────────────────────────────── */}
      <section className="bg-warm-white py-16 lg:py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* Photo */}
            <AnimatedSection direction="left">
              <div className="relative rounded-3xl overflow-hidden aspect-[4/5] bg-charcoal-sea/10">
                <Image
                  src="/assets/J-rockshan-with-open-water-students.webp"
                  alt="J Rockshan with two newly certified Open Water students on the beach in Trincomalee, Sri Lanka"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-charcoal-sea/50 to-transparent"
                  aria-hidden="true"
                />
                <p className="absolute bottom-0 left-0 right-0 px-6 py-4 text-warm-white/80 text-xs uppercase tracking-widest">
                  J Rockshan · Open Water graduates · Trincomalee beach
                </p>
              </div>
            </AnimatedSection>

            {/* Story */}
            <AnimatedSection direction="right">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-6 h-px bg-tropic-coral" aria-hidden="true" />
                <span className="text-[11px] uppercase tracking-[0.22em] font-semibold text-tropic-coral">
                  Our Founder
                </span>
              </div>

              <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-extrabold leading-tight text-charcoal-sea font-display mb-6">
                Meet J Rockshan
              </h2>

              <div className="space-y-4 text-charcoal-sea/70 text-base leading-relaxed">
                <p>
                  J Rockshan became a PADI scuba instructor younger than anyone in Sri Lanka had
                  before. Not because he rushed it, but because the ocean had already been his
                  second home for years, and he couldn&rsquo;t imagine doing anything else.
                </p>
                <p>
                  Since then, he&rsquo;s certified over{" "}
                  <strong className="text-charcoal-sea font-semibold">1,000 students</strong> —
                  first-timers who came in nervous and left with a certification card and a grin
                  they couldn&rsquo;t hide. Families, solo travellers, people in their sixties
                  trying scuba for the first time. Age, he&rsquo;ll tell you, has nothing to do
                  with it.
                </p>
                <p>
                  He set up at Sandy Cove because the diving here is genuinely special: coral
                  gardens, WWII wrecks, whale sharks passing through in season. And he wanted to
                  share all of it properly, with small groups and real attention.
                </p>
              </div>

              <div className="mt-8 inline-flex items-center gap-3 bg-charcoal-sea/5 rounded-2xl px-5 py-3">
                <span className="w-8 h-8 rounded-full bg-tropic-coral/15 flex items-center justify-center flex-shrink-0">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#E76F51"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                </span>
                <div>
                  <p className="text-charcoal-sea font-semibold text-sm leading-tight">
                    PADI Certified Instructor
                  </p>
                  <p className="text-charcoal-sea/45 text-xs">
                    Sri Lanka&rsquo;s youngest, recognised in 186 countries
                  </p>
                </div>
              </div>
            </AnimatedSection>

          </div>
        </div>
      </section>

      {/* ── 3. REBRAND ───────────────────────────────────── */}
      <section className="bg-charcoal-sea py-16 lg:py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <AnimatedSection>
            <div className="flex items-center justify-center gap-3 mb-5">
              <div className="w-6 h-px bg-tropic-coral" aria-hidden="true" />
              <span className="text-[11px] uppercase tracking-[0.22em] font-semibold text-tropic-coral">
                Same Team · New Name
              </span>
              <div className="w-6 h-px bg-tropic-coral" aria-hidden="true" />
            </div>

            <h2 className="text-warm-white font-display text-[clamp(2rem,4vw,3.5rem)] font-extrabold leading-tight mb-6">
              We Were Sea World Diving Center
            </h2>

            <div className="space-y-4 text-warm-white/60 text-base leading-relaxed max-w-2xl mx-auto">
              <p>
                For years, you might have found us at{" "}
                <span className="text-warm-white/80 font-medium">seaworlddiving.com</span>. Same
                instructors, same boats, same reef. We&rsquo;ve just grown into a name that feels
                more like us.
              </p>
              <p>
                Diving Club. Simple, honest, exactly what we are. If you dove with us before —
                welcome back. If you&rsquo;re new, you picked a good time to show up.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── 4. STATS STRIP ───────────────────────────────── */}
      <section className="bg-warm-white py-10 lg:py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <hr className="border-t border-charcoal-sea/10 mb-8 lg:mb-12" />
          <div className="grid grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, i) => (
              <AnimatedSection key={stat.label} delay={i * 0.08}>
                <div
                  className={`px-4 sm:px-6 py-6 text-center${
                    i === 0
                      ? " border-r border-charcoal-sea/10"
                      : i === 1
                      ? " lg:border-r lg:border-charcoal-sea/10"
                      : i === 2
                      ? " border-r border-charcoal-sea/10 lg:border-r lg:border-charcoal-sea/10"
                      : ""
                  }`}
                >
                  <span className="block text-[clamp(2.5rem,5vw,4rem)] font-extrabold font-display leading-none text-charcoal-sea">
                    {stat.value}
                  </span>
                  <span className="block text-[11px] uppercase tracking-[0.2em] text-charcoal-sea/45 mt-2">
                    {stat.label}
                  </span>
                </div>
              </AnimatedSection>
            ))}
          </div>
          <hr className="border-t border-charcoal-sea/10 mt-8 lg:mt-12" />
        </div>
      </section>

      {/* ── 5. VALUES ────────────────────────────────────── */}
      <section className="bg-charcoal-sea py-16 lg:py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-6 h-px bg-tropic-coral" aria-hidden="true" />
              <span className="text-[11px] uppercase tracking-[0.22em] font-semibold text-tropic-coral">
                How We Dive
              </span>
            </div>
            <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-extrabold leading-tight text-warm-white font-display">
              What Matters to Us
            </h2>
            <p className="text-warm-white/50 text-base leading-relaxed mt-3 max-w-lg">
              Four things we won&rsquo;t compromise on, ever.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {values.map((v, i) => (
              <AnimatedSection key={v.label} delay={i * 0.1}>
                <article className="bg-white/5 border border-white/10 rounded-2xl p-7 h-full">
                  <div className="w-10 h-10 rounded-full bg-tropic-coral/15 flex items-center justify-center mb-5">
                    {v.icon}
                  </div>
                  <h3 className="text-warm-white font-bold text-xl font-display mb-3">
                    {v.label}
                  </h3>
                  <p className="text-warm-white/55 text-sm leading-relaxed">{v.body}</p>
                </article>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. CTA ───────────────────────────────────────── */}
      <section className="bg-warm-white py-20 lg:py-28 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <AnimatedSection>
            <div className="w-12 h-px bg-tropic-coral mx-auto mb-8" aria-hidden="true" />
            <span className="block text-[11px] uppercase tracking-[0.25em] font-semibold text-tropic-coral/70 mb-4">
              Come Dive with Us
            </span>

            <h2 className="text-charcoal-sea font-display text-[clamp(2rem,5vw,3.5rem)] font-extrabold leading-tight mb-5">
              Ready to get in the water?
            </h2>

            <p className="text-charcoal-sea/55 text-base leading-relaxed max-w-lg mx-auto mb-10">
              Whether you want your PADI cert or want to see what&rsquo;s down there, come
              find us at Sandy Cove. We&rsquo;re open every day.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/courses"
                className="inline-flex items-center gap-2 bg-tropic-coral text-white font-bold px-8 py-3.5 rounded-full hover:bg-[#d4603f] transition-colors text-sm"
              >
                Browse PADI Courses
              </Link>
              <Link
                href="/book"
                className="inline-flex items-center gap-2 text-charcoal-sea/60 font-semibold text-sm hover:text-charcoal-sea transition-colors"
              >
                Book a Dive →
              </Link>
            </div>

            <p className="text-charcoal-sea/30 text-sm mt-7">
              Or WhatsApp us:{" "}
              <a
                href="https://wa.me/94743945010"
                target="_blank"
                rel="noopener noreferrer"
                className="text-charcoal-sea/50 hover:text-charcoal-sea transition-colors underline underline-offset-2"
              >
                0743 945 010
              </a>
            </p>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
