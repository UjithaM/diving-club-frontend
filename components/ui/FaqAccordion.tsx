"use client";

import { useState } from "react";
import type { PageFaq } from "@/lib/types";

interface FaqAccordionProps {
  faqs: PageFaq[];
  heading?: string;
  /**
   * Render every answer open, with no toggles.
   *
   * The ad pages pass this. A visitor who came from an ad has one question in mind and won't
   * hunt for it behind eight closed rows — and an answer that's already on screen is one the
   * crawler reads too. Everywhere else the accordion stays, because those pages carry far more
   * FAQs and the list is a navigation aid rather than the objection handling itself.
   */
  defaultOpen?: boolean;
}

export default function FaqAccordion({
  faqs,
  heading = "Frequently asked questions",
  defaultOpen = false,
}: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (defaultOpen) {
    return (
      <section className="bg-warm-white border-t border-border-subtle py-16 lg:py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="type-display text-section font-extrabold text-charcoal-sea mb-10">
            {heading}
          </h2>

          {/* Hairline rules, not bordered cards — nine identical rounded boxes was the look
              this redesign is getting away from. */}
          <dl className="divide-y divide-border-medium border-t border-border-medium">
            {faqs.map((faq) => (
              <div key={faq.question} className="py-7">
                <dt className="text-sub font-bold text-charcoal-sea mb-2">{faq.question}</dt>
                <dd className="text-body text-charcoal-sea/75">{faq.answer}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-warm-white py-16 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <span className="h-px w-6 bg-tropic-coral" aria-hidden="true" />
          <span className="text-tropic-coral text-[11px] font-semibold tracking-[0.22em] uppercase">
            Questions
          </span>
        </div>
        <h2 className="text-charcoal-sea font-display text-3xl font-extrabold mb-10">
          {heading}
        </h2>

        <dl className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="border border-charcoal-sea/10 rounded-2xl overflow-hidden"
            >
              <dt>
                <button
                  type="button"
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                  aria-expanded={openIndex === i}
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                >
                  <span className="text-charcoal-sea font-semibold text-base leading-snug">
                    {faq.question}
                  </span>
                  <span
                    className="flex-shrink-0 w-6 h-6 rounded-full bg-tropic-coral/10 flex items-center justify-center transition-transform duration-200"
                    style={{ transform: openIndex === i ? "rotate(45deg)" : "rotate(0deg)" }}
                    aria-hidden="true"
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M6 2v8M2 6h8" stroke="#E76F51" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </span>
                </button>
              </dt>
              {openIndex === i && (
                <dd className="px-6 pb-5">
                  <p className="text-charcoal-sea/75 text-sm leading-relaxed">{faq.answer}</p>
                </dd>
              )}
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
