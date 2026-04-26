"use client";

import AnimatedSection from "@/components/ui/AnimatedSection";

const items = [
  {
    num: "01",
    title: "PADI Certified",
    body: "Every course follows official PADI standards. Your certification is recognised in 186 countries — dive anywhere in the world.",
  },
  {
    num: "02",
    title: "Small Groups",
    body: "Maximum 5 divers per guided dive. Your instructor knows your name, your comfort level, and exactly where you want to go.",
  },
  {
    num: "03",
    title: "Local Expertise",
    body: "We've been diving Trincomalee's reefs for years. We know where the turtles sleep, where the whale sharks feed, and when the water is clearest.",
  },
  {
    num: "04",
    title: "All Levels Welcome",
    body: "First dive or your 500th — we have something for you. Try diving needs zero experience. Divemaster training takes you as far as you want to go.",
  },
];

export default function WhyChooseUsSection() {
  return (
    <section className="bg-warm-white py-16 lg:py-28 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <AnimatedSection className="mb-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-6 h-px bg-tropic-coral" />
            <span className="text-[11px] uppercase tracking-[0.22em] font-semibold text-tropic-coral">
              What Sets Us Apart
            </span>
          </div>
          <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-extrabold leading-tight text-charcoal-sea font-display">
            Why Dive with Us
          </h2>
        </AnimatedSection>

        {/* Numbered items */}
        <div className="grid grid-cols-1 lg:grid-cols-2 mt-12">
          {items.map((item, i) => (
            <AnimatedSection key={item.title} delay={i * 0.1}>
              <div className="flex gap-4 lg:gap-6 items-start py-8 lg:py-10 border-b border-charcoal-sea/8 last:border-0 lg:[&:nth-last-child(-n+2)]:border-0">
                <span
                  className="text-[3.5rem] lg:text-[5rem] font-extrabold font-display text-charcoal-sea/[0.06] leading-none flex-shrink-0 w-14 lg:w-20 text-right select-none"
                  aria-hidden="true"
                >
                  {item.num}
                </span>
                <div className="pt-2">
                  <h3 className="text-charcoal-sea text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-charcoal-sea/60 text-sm leading-relaxed">{item.body}</p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
