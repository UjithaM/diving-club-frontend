import type { Metadata } from "next";
import Link from "next/link";
import { getFaqs } from "@/lib/api/faqs";
import type { ApiFaq } from "@/lib/types";

export const metadata: Metadata = {
  title: "Scuba Diving FAQ | Trincomalee | Diving Club",
  description:
    "Honest answers to the questions we get asked most: diving basics, Trincomalee seasons, marine life, booking, safety, and eco practices. No fluff.",
  alternates: { canonical: "https://divingclub.lk/faq" },
  openGraph: {
    title: "Scuba Diving FAQ | Trincomalee | Diving Club",
    description: "Answers to the most common questions about scuba diving in Trincomalee, from 'can I dive if I can't swim?' to 'when should I book?'",
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
            Scuba Diving FAQ
          </h1>
          <p className="text-warm-white/55 text-base leading-relaxed max-w-xl">
            We get asked a lot of the same questions. Here are the answers, straight, no padding. If something&apos;s not here, just WhatsApp us on <a href="https://wa.me/94743945010" target="_blank" rel="noopener noreferrer" className="text-warm-white/80 hover:text-warm-white transition-colors">0743 945 010</a>.
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
            WhatsApp us
          </h2>
          <p className="text-warm-white/50 text-base leading-relaxed max-w-lg mx-auto mb-10">
            Honestly, a five-minute conversation answers more than any FAQ. We&apos;re at Sandy Cove every day during the season.
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
