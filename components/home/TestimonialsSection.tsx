"use client";

import AnimatedSection from "@/components/ui/AnimatedSection";

const testimonials = [
  {
    quote:
      "We went on a boat tour to see dolphins and it was such an amazing experience! The whole trip was really well organised, and seeing the dolphins up close in their natural environment was unforgettable. The crew was super friendly and made sure everyone felt comfortable and safe.",
    name: "Lavaenya Manirupan",
    origin: "Google Review · 2 weeks ago",
  },
  {
    quote:
      "We visited Trinco Diving Club — awesome experience and the staff are very friendly. Reasonable price and we really enjoyed it. If you visit Trinco you must try this diving club.",
    name: "Bad Ass",
    origin: "Google Review · 3 weeks ago",
  },
  {
    quote:
      "Wonderful experience — a great place to go snorkelling. People are very polite and really make you feel the experience of the sea and its habitat.",
    name: "Dinesh Kumar",
    origin: "Local Guide · Google Review · 4 weeks ago",
  },
  {
    quote:
      "Very nice experience, friendly and helpful staff. Will recommend to everyone who wishes to enjoy a lovely boat ride.",
    name: "S. D. Liyanage",
    origin: "Google Review · 1 month ago",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="bg-warm-white py-16 lg:py-28 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <AnimatedSection className="mb-10 lg:mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-6 h-px bg-tropic-coral" />
            <span className="text-[11px] uppercase tracking-[0.22em] font-semibold text-tropic-coral">
              Real Stories
            </span>
          </div>
          <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-extrabold leading-tight text-charcoal-sea font-display">
            What Divers Say
          </h2>

          {/* Decorative large quote mark */}
          <div
            className="text-[8rem] font-extrabold font-display leading-none text-charcoal-sea/5 select-none -mb-10 mt-2"
            aria-hidden="true"
          >
            &ldquo;
          </div>
        </AnimatedSection>

        {/* Testimonials grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:divide-x md:divide-charcoal-sea/8">
          {testimonials.map((t, i) => (
            <AnimatedSection key={t.name} delay={i * 0.1}>
              <blockquote className="md:px-8 first:pl-0 last:pr-0">
                <div className="text-tropic-coral text-xs mb-4" aria-label="5 out of 5 stars">
                  ★★★★★
                </div>
                <p className="text-charcoal-sea text-lg leading-relaxed font-medium italic mb-8">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <footer className="flex items-center gap-3">
                  <div className="w-8 h-px bg-tropic-coral flex-shrink-0" />
                  <div>
                    <p className="text-charcoal-sea font-semibold text-sm">{t.name}</p>
                    <p className="text-charcoal-sea/40 text-xs tracking-wide">{t.origin}</p>
                  </div>
                </footer>
              </blockquote>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
