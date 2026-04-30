import type { Testimonial } from "@/lib/types";

interface TestimonialStripProps {
  testimonials: Testimonial[];
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill={i < rating ? "#F4A261" : "none"}
          stroke="#F4A261"
          strokeWidth="1"
          aria-hidden="true"
        >
          <path d="M7 1l1.54 3.12L12 4.72l-2.5 2.44.59 3.44L7 8.77l-3.09 1.83.59-3.44L2 4.72l3.46-.6z" />
        </svg>
      ))}
    </div>
  );
}

export default function TestimonialStrip({ testimonials }: TestimonialStripProps) {
  if (!testimonials || testimonials.length === 0) return null;

  return (
    <section className="bg-warm-white py-14 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-10">
          <span className="h-px w-6 bg-tropic-coral" aria-hidden="true" />
          <span className="text-tropic-coral text-[11px] font-semibold tracking-[0.22em] uppercase">
            Guest experiences
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <figure
              key={i}
              className="bg-charcoal-sea/[0.03] border border-charcoal-sea/8 rounded-2xl p-6"
            >
              <StarRating rating={t.rating} />
              <blockquote className="mt-4">
                <p className="text-charcoal-sea/70 text-sm leading-relaxed">
                  &ldquo;{t.text}&rdquo;
                </p>
              </blockquote>
              <figcaption className="mt-4 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-tropic-coral/15 flex items-center justify-center flex-shrink-0">
                  <span className="text-tropic-coral font-bold text-sm">
                    {t.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="text-charcoal-sea font-semibold text-sm leading-tight">{t.name}</p>
                  <p className="text-charcoal-sea/40 text-xs">
                    {t.country}{t.course ? ` · ${t.course}` : ""}
                  </p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
