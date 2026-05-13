import type { Metadata } from "next";
import Link from "next/link";
import { getFaqs } from "@/lib/api/faqs";
import type { ApiFaq } from "@/lib/types";

export const metadata: Metadata = {
  title: "Frequently Asked Questions — Scuba Diving in Trincomalee",
  description:
    "Honest answers to the questions we get asked most — diving basics, Trincomalee seasons, marine life, booking, safety, and eco practices. No fluff.",
  alternates: { canonical: "https://divingclub.lk/faq" },
  openGraph: {
    title: "Diving Club FAQ — Trincomalee, Sri Lanka",
    description: "Answers to the most common questions about scuba diving in Trincomalee — from 'can I dive if I can't swim?' to 'when should I book?'",
    url: "https://divingclub.lk/faq",
  },
};

function CategorySection({
  category,
  items,
}: {
  category: string;
  items: ApiFaq[];
}) {
  return (
    <section className="mb-14">
      <div className="flex items-center gap-3 mb-2">
        <span className="h-px w-6 bg-tropic-coral flex-shrink-0" aria-hidden="true" />
        <h2 className="text-charcoal-sea font-display text-2xl font-extrabold">{category}</h2>
      </div>
      <dl className="space-y-5 ml-0 sm:ml-9">
        {items.map((faq) => (
          <div key={faq.id} className="border-b border-charcoal-sea/8 pb-5 last:border-0">
            <dt className="text-charcoal-sea font-semibold text-base mb-2">{faq.question}</dt>
            <dd className="text-charcoal-sea/65 text-sm leading-relaxed">{faq.answer}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

export default async function FaqPage() {
  const faqs = await getFaqs();

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  // Group FAQs by category, preserving sort_order within each group
  const grouped = faqs.reduce<Record<string, ApiFaq[]>>((acc, faq) => {
    const key = faq.category ?? "General";
    if (!acc[key]) acc[key] = [];
    acc[key].push(faq);
    return acc;
  }, {});

  const categories = Object.keys(grouped);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Hero */}
      <section className="bg-charcoal-sea py-16 lg:py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <nav className="flex items-center gap-2 text-warm-white/35 text-xs mb-8">
            <Link href="/" className="hover:text-warm-white/60 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-warm-white/60">FAQ</span>
          </nav>

          <div className="flex items-center gap-3 mb-5">
            <span className="h-px w-6 bg-tropic-coral" aria-hidden="true" />
            <span className="text-tropic-coral text-[11px] font-semibold tracking-[0.22em] uppercase">
              Honest answers
            </span>
          </div>

          <h1 className="text-warm-white font-display text-[clamp(2.5rem,6vw,5rem)] font-extrabold leading-tight mb-5">
            Questions
          </h1>
          <p className="text-warm-white/55 text-base leading-relaxed max-w-xl">
            We get asked a lot of the same questions. Here are the answers — straight, no padding. If something&apos;s not here, just call us on <a href="tel:0743945010" className="text-warm-white/80 hover:text-warm-white transition-colors">0743 945 010</a>.
          </p>
        </div>
      </section>

      {/* FAQ content */}
      <div className="bg-warm-white py-16 px-6">
        <div className="max-w-3xl mx-auto">
          {categories.map((cat) => (
            <CategorySection key={cat} category={cat} items={grouped[cat]} />
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <section className="bg-charcoal-sea py-20 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-12 h-px bg-tropic-coral mx-auto mb-8" />
          <span className="block text-[11px] uppercase tracking-[0.25em] font-semibold text-tropic-coral/70 mb-4">
            Still got questions?
          </span>
          <h2 className="text-warm-white font-display text-[clamp(2rem,5vw,3.5rem)] font-extrabold leading-tight mb-5">
            Just call us
          </h2>
          <p className="text-warm-white/50 text-base leading-relaxed max-w-lg mx-auto mb-10">
            Honestly, a five-minute conversation answers more than any FAQ. We&apos;re at Sandy Cove every day during the season.
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
              href="/contact"
              className="inline-flex items-center gap-2 text-warm-white/50 font-semibold text-sm hover:text-warm-white transition-colors"
            >
              Send a message →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
