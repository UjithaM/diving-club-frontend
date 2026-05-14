"use client";

import Link from "next/link";
import AnimatedSection from "@/components/ui/AnimatedSection";

export default function ContactCtaSection() {
  return (
    <section className="bg-charcoal-sea py-20 lg:py-32 px-6">
      <div className="max-w-2xl mx-auto text-center">
        <AnimatedSection>
          {/* Decorative rule */}
          <div className="w-16 h-px bg-tropic-coral mx-auto mb-8 lg:mb-12" />

          <span className="block text-[11px] uppercase tracking-[0.25em] font-semibold text-tropic-coral/60 mb-5">
            Book Your Dive Today
          </span>

          <h2 className="text-warm-white text-[clamp(2.5rem,6vw,5rem)] font-extrabold font-display leading-[1.05] mb-6">
            Ready to Dive?
          </h2>

          <p className="text-warm-white/50 text-lg leading-relaxed max-w-lg mx-auto mb-8 lg:mb-12">
            The water is warm, the viz is clear, and your instructor is waiting.
            Join us any day of the week — no experience necessary.
          </p>

          <Link
            href="/book"
            className="inline-block bg-tropic-coral text-white font-bold px-10 py-4 rounded-full text-base hover:bg-[#d4603f] transition-colors duration-200"
          >
            Book a Dive
          </Link>

          <p className="text-warm-white/30 text-sm mt-6">
            Or WhatsApp us:{" "}
            <a
              href="https://wa.me/94743945010"
              target="_blank"
              rel="noopener noreferrer"
              className="text-warm-white/50 hover:text-warm-white transition-colors underline underline-offset-2"
            >
              0743 945 010
            </a>
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}
