import type { Metadata } from "next";
import { getFaqs } from "@/lib/api/faqs";
import type { ApiFaq } from "@/lib/types";
import type { FAQPage, WithContext } from "schema-dts";
import { safeJsonLd } from "@/lib/jsonld";

import PageHero from "@/components/ui/PageHero";
import Waterline from "@/components/illustrations/Waterline";
import CtaBand, { BandLink, WhatsAppButton } from "@/components/ui/CtaBand";

/** The API sends category slugs; show them as words. */
const categoryLabels: Record<string, string> = {
  "diving-basics": "Diving basics",
  trincomalee: "Trincomalee",
  "booking-travel": "Booking & travel",
  "safety-eco": "Safety & eco",
};
const label = (c: string) => categoryLabels[c] ?? c;

const slug = (c: string) => `faq-${c.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

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
    <section id={slug(category)} className="scroll-mt-24 rounded-[18px] bg-warm-white p-5 sm:p-8 text-charcoal-sea reveal">
      <h2 className="text-sub lg:text-[1.75rem] font-extrabold mb-4 pb-4 border-b-2 border-charcoal-sea">{label(category)}</h2>
      <dl>
        {items.map((faq) => (
          <div key={faq.id} className="py-5 border-b border-charcoal-sea/12 last:border-0 last:pb-0">
            <dt className="font-bold text-base mb-2">{faq.question}</dt>
            <dd className="text-charcoal-sea/80 text-body">{faq.answer}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

export default async function FaqPage() {
  const faqs = await getFaqs();

  const faqJsonLd: WithContext<FAQPage> = {
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
        dangerouslySetInnerHTML={{ __html: safeJsonLd(faqJsonLd) }}
      />

      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "FAQ" }]}
        notes="Honest answers"
        title={<>Scuba Diving FAQ</>}
        lead={<>We get asked a lot of the same questions. Here are the answers, straight, no padding. If something&apos;s not here, just WhatsApp us on <a href="https://wa.me/94743945010" target="_blank" rel="noopener noreferrer" className="font-semibold text-whatsapp-deep underline underline-offset-4 hover:no-underline">0743 945 010</a>.</>}
      />
      <Waterline from="surface" to="shallow" />

      {/* FAQ content */}
      <div className="zone-shallow py-12 lg:py-16 px-5 sm:px-8">
        <div className="max-w-6xl mx-auto grid gap-6 lg:grid-cols-[14rem_minmax(0,1fr)] lg:gap-12">
          {/* Jump list: sideways chips on a phone, a sticky index beside the answers on desktop. */}
          <nav aria-label="FAQ topics" className="min-w-0 lg:sticky lg:top-24 lg:self-start">
            <ul className="-mx-5 px-5 flex gap-2 overflow-x-auto [scrollbar-width:none] lg:mx-0 lg:px-0 lg:flex-col lg:overflow-visible">
              {categories.map((cat) => (
                <li key={cat} className="shrink-0">
                  <a
                    href={`#${slug(cat)}`}
                    className="flex items-center justify-between gap-3 min-h-11 whitespace-nowrap rounded-full lg:rounded-[10px] bg-warm-white/85 px-4 text-sm font-bold text-charcoal-sea hover:bg-warm-white transition-colors"
                  >
                    {label(cat)}
                    <span className="rounded-full bg-charcoal-sea/10 px-1.5 text-xs tabular">{grouped[cat].length}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="min-w-0 space-y-5 max-w-3xl">
            {categories.map((cat) => (
              <CategorySection key={cat} category={cat} items={grouped[cat]} />
            ))}
          </div>
        </div>
      </div>

      <CtaBand
        notes="Still got questions?"
        title={<>WhatsApp us</>}
        body={<p>Honestly, a five-minute conversation answers more than any FAQ. We&apos;re at Sandy Cove every day during the season.</p>}
      >
        <WhatsAppButton>0743 945 010</WhatsAppButton>
        <BandLink href="/contact">Send a message →</BandLink>
      </CtaBand>
    </>
  );
}
