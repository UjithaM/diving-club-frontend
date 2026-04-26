"use client";

import AnimatedSection from "@/components/ui/AnimatedSection";

const testimonials = [
  {
    quote:
      "I'd never put on a tank before. Three hours later I was 12 metres underwater staring at a turtle. Still can't really believe it.",
    name: "Sarah M.",
    origin: "UK",
  },
  {
    quote:
      "The instructor was with me the whole time and never made me feel rushed. The Open Water course here was the best decision of my holiday.",
    name: "Marco T.",
    origin: "Germany",
  },
  {
    quote:
      "We booked the whale watching on a whim the morning of. Saw three blue whales. Nothing will ever top that.",
    name: "Priya K.",
    origin: "Canada",
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:divide-x md:divide-charcoal-sea/8">
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
