import AnimatedSection from "@/components/ui/AnimatedSection";

const cells = [
  { label: "Coral Garden · 12m", bg: "bg-tropic-coral/15" },
  { label: "Turtle · Powder Blue Bay", bg: "bg-charcoal-sea/10" },
  { label: "Reef Sharks · Hermes Wreck", bg: "bg-charcoal-sea/15" },
  { label: "Whale Watching · Open Sea", bg: "bg-tropic-coral/10" },
  { label: "Night Dive · Sandy Cove", bg: "bg-charcoal-sea/12" },
  { label: "Snorkelling · Coral Garden", bg: "bg-tropic-coral/10" },
];

export default function GallerySection() {
  return (
    <section className="bg-warm-white py-16 lg:py-28 px-6 border-t border-charcoal-sea/8">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-6 h-px bg-tropic-coral" />
            <span className="text-[11px] uppercase tracking-[0.22em] font-semibold text-tropic-coral">
              Underwater World
            </span>
          </div>
          <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-extrabold leading-tight text-charcoal-sea font-display">
            Moments Beneath the Surface
          </h2>
          <p className="text-charcoal-sea/55 text-base leading-relaxed mt-4 max-w-xl">
            Every dive tells its own story. Here are a few glimpses from the waters around Trincomalee.
          </p>
        </div>

        {/* Gallery grid */}
        <div className="gallery-grid">
          {cells.map((cell, i) => (
            <AnimatedSection key={cell.label} delay={i * 0.05}>
              <div
                className={`rounded-2xl overflow-hidden ${cell.bg} aspect-square flex items-end`}
              >
                <span className="text-[10px] uppercase tracking-widest text-charcoal-sea/30 p-4">
                  {cell.label}
                </span>
              </div>
            </AnimatedSection>
          ))}

          {/* Instagram CTA tile */}
          <AnimatedSection delay={cells.length * 0.05}>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-2xl overflow-hidden bg-tropic-coral/10 border border-shallow-water/20 aspect-square flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-tropic-coral/15 transition-colors"
            >
              <span className="text-tropic-coral font-semibold text-sm">See More</span>
              <span className="text-charcoal-sea/40 text-[11px] uppercase tracking-widest">on Instagram →</span>
            </a>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
