"use client";

import Link from "next/link";
import AnimatedSection from "@/components/ui/AnimatedSection";

export default function ContactCtaSection() {
  return (
    <section className="relative overflow-hidden py-28 px-6 bg-tropic-coral">
      {/* Background decorative orbs */}
      <div
        className="absolute top-[-20%] right-[-10%] w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(255,255,255,0.12) 0%, transparent 70%)",
          animation: "orb-pulse-1 10s ease-in-out infinite",
        }}
      />
      <div
        className="absolute bottom-[-25%] left-[-8%] w-80 h-80 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(42,157,143,0.25) 0%, transparent 70%)",
          animation: "orb-pulse-2 8s ease-in-out 3s infinite",
        }}
      />

      <div className="max-w-3xl mx-auto text-center relative z-10">
        <AnimatedSection>
          <span className="inline-block text-warm-white/60 text-xs font-semibold tracking-[0.2em] uppercase mb-5">
            Trincomalee · Open 7 days
          </span>
          <h2 className="text-warm-white text-4xl sm:text-6xl font-bold mb-6 leading-tight">
            Ready to Dive?
          </h2>
          <p className="text-warm-white/80 text-lg sm:text-xl leading-relaxed mb-12 max-w-xl mx-auto">
            The water is warm, the viz is clear, and your instructor is waiting.
            Join us any day of the week — no experience necessary.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <a
              href="tel:0743945010"
              className="inline-flex items-center gap-2.5 bg-warm-white text-tropic-coral font-bold px-9 py-4 rounded-full text-base shadow-lg hover:scale-105 hover:-translate-y-0.5 active:scale-[0.97] transition-transform duration-150 ease-out"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              0743 945 010
            </a>
            <Link
              href="/contact"
              className="inline-block border-2 border-warm-white text-warm-white font-bold px-9 py-4 rounded-full hover:bg-warm-white hover:text-tropic-coral hover:scale-105 hover:-translate-y-0.5 active:scale-[0.97] transition-all duration-150 ease-out text-base"
            >
              Get in Touch
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
