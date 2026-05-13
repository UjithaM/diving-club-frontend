import Image from "next/image";
import Link from "next/link";
import AnimatedSection from "@/components/ui/AnimatedSection";
import type { GalleryImage } from "@/lib/types";

export default function GallerySection({ images }: { images: GalleryImage[] }) {
  const cells = images.slice(0, 6);

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

        {cells.length > 0 ? (
          <div className="gallery-grid">
            {cells.map((img, i) => (
              <AnimatedSection key={img.id} delay={i * 0.05}>
                <div className="rounded-2xl overflow-hidden aspect-square relative bg-charcoal-sea/10">
                  <Image
                    src={img.url}
                    alt={img.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-sea/60 to-transparent" />
                  <span className="absolute bottom-0 left-0 text-[10px] uppercase tracking-widest text-warm-white/70 p-4">
                    {img.title}
                  </span>
                </div>
              </AnimatedSection>
            ))}

            {/* Gallery CTA tile */}
            <AnimatedSection delay={cells.length * 0.05}>
              <Link
                href="/gallery"
                className="rounded-2xl overflow-hidden bg-tropic-coral/10 border border-shallow-water/20 aspect-square flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-tropic-coral/15 transition-colors"
              >
                <span className="text-tropic-coral font-semibold text-sm">See More</span>
                <span className="text-charcoal-sea/40 text-[11px] uppercase tracking-widest">View Gallery →</span>
              </Link>
            </AnimatedSection>
          </div>
        ) : null}
      </div>
    </section>
  );
}
