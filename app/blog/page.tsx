import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Diving Blog — Tips, Stories & Guides from Trincomalee",
  description:
    "Honest diving guides, species spotlights, gear reviews, and stories from the water — written by the team at Diving Club, Sandy Cove, Trincomalee.",
  alternates: { canonical: "https://divingclub.lk/blog" },
  openGraph: {
    title: "Diving Club Blog — Trincomalee, Sri Lanka",
    description:
      "Dive guides, marine life spotlights, and trip stories from one of Sri Lanka's best dive centres. No fluff, no stock photos.",
    url: "https://divingclub.lk/blog",
  },
};

const blogIndexJsonLd = {
  "@context": "https://schema.org",
  "@type": "Blog",
  name: "Diving Club Blog",
  description: "Diving guides, marine life spotlights, and trip stories from Trincomalee, Sri Lanka.",
  url: "https://divingclub.lk/blog",
  publisher: {
    "@type": "Organization",
    name: "Diving Club",
    url: "https://divingclub.lk",
  },
};

export default function BlogIndexPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogIndexJsonLd) }}
      />

      {/* Hero */}
      <section className="bg-charcoal-sea py-16 lg:py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <nav className="flex items-center gap-2 text-warm-white/35 text-xs mb-8">
            <Link href="/" className="hover:text-warm-white/60 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-warm-white/60">Blog</span>
          </nav>

          <div className="flex items-center gap-3 mb-5">
            <span className="h-px w-6 bg-tropic-coral" aria-hidden="true" />
            <span className="text-tropic-coral text-[11px] font-semibold tracking-[0.22em] uppercase">
              From the water
            </span>
          </div>

          <h1 className="text-warm-white font-display text-[clamp(2.5rem,6vw,5rem)] font-extrabold leading-tight mb-5">
            Blog
          </h1>
          <p className="text-warm-white/55 text-base leading-relaxed max-w-xl">
            Dive guides, species spotlights, gear notes, and stories from the season. Written by the instructors who actually live on these reefs.
          </p>
        </div>
      </section>

      {/* Coming soon placeholder */}
      <section className="bg-warm-white py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="w-12 h-px bg-tropic-coral mx-auto mb-8" />
          <h2 className="text-charcoal-sea font-display text-3xl font-extrabold mb-5">
            Posts coming soon
          </h2>
          <p className="text-charcoal-sea/60 text-base leading-relaxed max-w-lg mx-auto mb-10">
            We&apos;re writing up guides on the best dive sites, when to come, what to expect on your first dive, and a few honest takes on the PADI certification path. Check back when the season starts.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/faq"
              className="inline-flex items-center gap-2 bg-charcoal-sea text-warm-white font-bold px-8 py-3.5 rounded-full hover:bg-shallow-water transition-colors text-sm"
            >
              Read our FAQ
            </Link>
            <Link
              href="/scuba-diving-in-trincomalee"
              className="inline-flex items-center gap-2 text-charcoal-sea/50 font-semibold text-sm hover:text-charcoal-sea transition-colors"
            >
              Trincomalee dive guide →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
