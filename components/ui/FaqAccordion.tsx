import type { PageFaq } from "@/lib/types";
import type { Zone } from "@/components/ui/Section";

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
  zone?: Zone;
}

/**
 * Server-rendered. The accordion is native <details> sharing one `name`, so opening one closes
 * the others with no JavaScript, and every answer is in the HTML either way.
 */
export default function FaqAccordion({
  faqs,
  heading = "Frequently asked questions",
  defaultOpen = false,
  zone = "surface",
}: FaqAccordionProps) {
  const dark = zone === "deep" || zone === "abyss";

  return (
    <section className={`zone-${zone} py-16 lg:py-24 px-5 sm:px-8`}>
      <div className="max-w-3xl mx-auto">
        <h2 className="text-section font-extrabold mb-10 reveal">{heading}</h2>

        {defaultOpen ? (
          <dl className="border-t-2 border-current">
            {faqs.map((faq) => (
              <div key={faq.question} className="reveal py-7 border-b border-rule">
                <dt className="text-sub font-bold mb-2">{faq.question}</dt>
                <dd className="text-body text-muted">{faq.answer}</dd>
              </div>
            ))}
          </dl>
        ) : (
          <div className="border-t-2 border-current">
            {faqs.map((faq, i) => (
              <details key={i} name="faq" className="group border-b border-rule">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-left [&::-webkit-details-marker]:hidden">
                  <span className="font-semibold text-base leading-snug">{faq.question}</span>
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-[rotate,background-color] duration-300 ease-(--ease-surface) group-open:rotate-45 ${dark ? "bg-warm-white/10 group-open:bg-sunrise group-open:text-surface-dark" : "bg-charcoal-sea/8 group-open:bg-shallow-water"}`}
                    aria-hidden="true"
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M6 1.5v9M1.5 6h9" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
                    </svg>
                  </span>
                </summary>
                <p className="faq-answer pb-6 pr-12 text-body text-muted">{faq.answer}</p>
              </details>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
