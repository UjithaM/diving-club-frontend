import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/ui/PageHero";
import Readout from "@/components/ui/Readout";
import Button from "@/components/ui/Button";
import CtaBand, { BandLink } from "@/components/ui/CtaBand";
import Waterline from "@/components/illustrations/Waterline";
import { photos } from "@/lib/photos";
import { BranchCoral, BrainCoral, FanCoral, Seaweed } from "@/components/illustrations/Sea";
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
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    label: "Local Expertise",
    body: "We've been diving these reefs for over 15 years. We know the currents, the seasons, the spots the guidebooks don't mention. Knowledge that only comes from real time in the water.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
  {
    label: "Small Groups",
    body: "Maximum 2 divers per guide. We're not running a cattle operation. We're taking you diving. Your comfort, your pace, your experience.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
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
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
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
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "About Us" }]}
        notes="Sandy Cove · Trincomalee · Est. 2010"
        title="The ocean changed everything. We just want to share it."
        lead={
          <>
            We&rsquo;re a small dive center tucked into Sandy Cove, the kind of place where your
            instructor knows your name before the tank is even on your back.
          </>
        }
      />

      {/* ── 2. FOUNDER ───────────────────────────────────── */}
      <section className="zone-surface py-14 lg:py-24 px-5 sm:px-8 border-t-2 border-charcoal-sea/10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">

            {/* Photo */}
            <figure className="reveal relative m-0">
              <div className="plate aspect-[4/5] rounded-[18px]">
                <Image
                  src={photos.instructor.src}
                  alt={photos.instructor.alt}
                  fill
                  placeholder="blur"
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <figcaption className="absolute bottom-0 left-0 zone-abyss rounded-tr-[12px] px-4 py-3 text-label uppercase font-semibold">
                J Rockshan · Open Water graduates · Trincomalee beach
              </figcaption>
            </figure>

            {/* Story */}
            <div className="reveal">
              <p className="mb-5">
                <span className="inline-block rounded-full bg-sunrise px-3 py-1.5 text-label uppercase font-semibold text-surface-dark">
                  Our Founder
                </span>
              </p>

              <h2 className="text-section font-extrabold mb-6">
                Meet J Rockshan
              </h2>

              <div className="space-y-4 text-charcoal-sea/85 text-[1.0625rem] leading-[1.75]">
                <p>
                  J Rockshan became a PADI scuba instructor younger than anyone in Sri Lanka had
                  before. Not because he rushed it, but because the ocean had already been his
                  second home for years, and he couldn&rsquo;t imagine doing anything else.
                </p>
                <p>
                  Since then, he&rsquo;s certified over{" "}
                  <strong className="text-charcoal-sea font-bold bg-sunrise/35 px-1 rounded-[3px]">1,000 students</strong> —
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

              <div className="mt-8 inline-flex items-center gap-4 rounded-[14px] zone-deep px-5 py-4">
                <span className="w-10 h-10 rounded-full bg-tropic-coral text-surface-dark flex items-center justify-center flex-shrink-0">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
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
                  <p className="font-bold text-sm leading-tight">
                    PADI Certified Instructor
                  </p>
                  <p className="text-muted text-xs mt-0.5">
                    Sri Lanka&rsquo;s youngest, recognised in 186 countries
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 3. REBRAND ───────────────────────────────────── */}
      <Waterline from="surface" to="shallow" />
      <section className="zone-shallow py-14 lg:py-20 px-5 sm:px-8">
        <div className="max-w-3xl mx-auto text-center reveal">
          <p className="mb-5">
            <span className="inline-block rounded-full bg-surface-dark px-3 py-1.5 text-label uppercase font-semibold text-warm-white">
              Same Team · New Name
            </span>
          </p>

          <h2 className="text-section font-extrabold mb-6">
            We Were Sea World Diving Center
          </h2>

          <div className="space-y-4 text-lead max-w-2xl mx-auto">
            <p>
              For years, you might have found us at{" "}
              <span className="font-bold">seaworlddiving.com</span>. Same
              instructors, same boats, same reef. We&rsquo;ve just grown into a name that feels
              more like us.
            </p>
            <p>
              Diving Club. Simple, honest, exactly what we are. If you dove with us before —
              welcome back. If you&rsquo;re new, you picked a good time to show up.
            </p>
          </div>
        </div>
      </section>

      {/* ── 4. STATS STRIP ───────────────────────────────── */}
      <section className="zone-shallow relative overflow-hidden px-5 sm:px-8 pb-36 lg:pb-44">
        <div className="max-w-6xl mx-auto reveal">
          <Readout size="section" cells={stats} />
        </div>
        <div className="absolute inset-x-0 bottom-0 h-28 overflow-hidden" aria-hidden="true">
          {[
            { el: <Seaweed className="w-8 lg:w-10" />, left: "5%", t: "5.2s" },
            { el: <BranchCoral className="w-16 lg:w-24" />, left: "18%", t: "6.6s" },
            { el: <BrainCoral className="w-20 lg:w-28" />, left: "40%", t: "0s" },
            { el: <FanCoral className="w-16 lg:w-24" />, left: "62%", t: "5.9s" },
            { el: <BranchCoral className="w-14 lg:w-20" color="var(--color-sunrise)" />, left: "80%", t: "6.2s" },
            { el: <Seaweed className="w-8 lg:w-10" color="var(--color-sunrise)" />, left: "94%", t: "4.8s" },
          ].map((p, i) => (
            <div
              key={i}
              className={`absolute bottom-0 -translate-x-1/2 [&>svg]:block ${p.t !== "0s" ? "sway" : ""}`}
              style={{ left: p.left, "--sway-time": p.t, animationDelay: `-${i * 0.7}s` } as React.CSSProperties}
            >
              {p.el}
            </div>
          ))}
        </div>
      </section>

      {/* ── 5. VALUES ────────────────────────────────────── */}
      <section className="zone-deep py-14 lg:py-24 px-5 sm:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-10 lg:mb-12 reveal">
            <p className="mb-4">
              <span className="inline-block rounded-full bg-sunrise px-3 py-1.5 text-label uppercase font-semibold text-surface-dark">
                How We Dive
              </span>
            </p>
            <h2 className="text-section font-extrabold">
              What Matters to Us
            </h2>
            <p className="text-muted text-lead mt-3 max-w-lg">
              Four things we won&rsquo;t compromise on, ever.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-5">
            {values.map((v) => (
              <article key={v.label} className="reveal rounded-[18px] bg-warm-white/[0.06] p-6 lg:p-7 h-full ring-1 ring-warm-white/10 transition-[translate,background-color] duration-300 hover:-translate-y-1 hover:bg-warm-white/[0.1]">
                <div className="w-11 h-11 rounded-full bg-tropic-coral text-surface-dark flex items-center justify-center mb-5">
                  {v.icon}
                </div>
                <h3 className="text-sub font-extrabold mb-3">
                  {v.label}
                </h3>
                <p className="text-muted text-body">{v.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. CTA ───────────────────────────────────────── */}
      <CtaBand
        notes="Come Dive with Us"
        title="Ready to get in the water?"
        body={
          <>
            <p>
              Whether you want your PADI cert or want to see what&rsquo;s down there, come
              find us at Sandy Cove. We&rsquo;re open every day.
            </p>
            <p className="mt-4 text-sm">
              Or WhatsApp us:{" "}
              <a
                href="https://wa.me/94743945010"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-warm-white underline underline-offset-4 hover:no-underline tabular"
              >
                0743 945 010
              </a>
            </p>
          </>
        }
      >
        <Button href="/courses" size="lg">Browse PADI Courses</Button>
        <BandLink href="/book">Book a Dive →</BandLink>
      </CtaBand>
    </>
  );
}
