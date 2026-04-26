"use client";

import { useRef, useEffect, useState } from "react";
import AnimatedSection from "@/components/ui/AnimatedSection";

const ease = "cubic-bezier(0.16, 1, 0.3, 1)";

const testimonials = [
  {
    quote:
      "I'd never put on a tank before. Three hours later I was 12 metres underwater staring at a turtle. Still can't really believe it.",
    name: "Sarah M.",
    origin: "UK",
    accent: "#2A9D8F",
  },
  {
    quote:
      "The instructor was with me the whole time and never made me feel rushed. The Open Water course here was the best decision of my holiday.",
    name: "Marco T.",
    origin: "Germany",
    accent: "#F4A261",
  },
  {
    quote:
      "We booked the whale watching on a whim the morning of. Saw three blue whales. Nothing will ever top that.",
    name: "Priya K.",
    origin: "Canada",
    accent: "#E76F51",
  },
];

function TestimonialCard({ t, index }: { t: (typeof testimonials)[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setInView(true); observer.unobserve(el); }
      },
      { rootMargin: "-40px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView
          ? "perspective(900px) rotateX(0deg) translateY(0)"
          : "perspective(900px) rotateX(16deg) translateY(60px)",
        transformOrigin: "50% 100%",
        transition: `opacity 0.8s ${index * 0.12}s ${ease}, transform 0.8s ${index * 0.12}s ${ease}`,
      }}
    >
      <div className="hover:-translate-y-2 hover:scale-[1.01] transition-transform duration-300 ease-out h-full">
        <blockquote
          className="bg-white rounded-2xl p-8 h-full flex flex-col border-t-[3px] shadow-sm"
          style={{ borderTopColor: t.accent }}
        >
          <span
            className="text-6xl font-bold leading-none mb-5 block"
            style={{ color: t.accent, opacity: 0.7 }}
          >
            &ldquo;
          </span>
          <p className="text-charcoal-sea/80 text-base leading-relaxed flex-1 italic">
            {t.quote}
          </p>
          <footer className="mt-6 pt-5 border-t border-charcoal-sea/8">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full" style={{ background: t.accent }} />
              <span className="font-semibold text-charcoal-sea text-sm">{t.name}</span>
              <span className="text-charcoal-sea/35 text-sm">· {t.origin}</span>
            </div>
          </footer>
        </blockquote>
      </div>
    </div>
  );
}

export default function TestimonialsSection() {
  return (
    <section className="bg-warm-white py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection className="mb-14">
          <span className="flex items-center gap-3 mb-4">
            <span className="h-px w-8 bg-shallow-water" />
            <span className="text-shallow-water text-xs font-semibold tracking-[0.2em] uppercase">
              Real Stories
            </span>
          </span>
          <h2 className="text-charcoal-sea text-3xl sm:text-5xl font-bold">What Divers Say</h2>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <TestimonialCard key={t.name} t={t} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
