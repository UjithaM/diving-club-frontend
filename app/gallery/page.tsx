import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getGalleryImages } from "@/lib/api/gallery";

export const metadata: Metadata = {
  title: "Gallery — Diving Club Trincomalee",
  description:
    "Photos from our dive sites, courses, and activities in Trincomalee, Sri Lanka. Swami Rock, Pigeon Island, whale watching, Open Water training, and more.",
  alternates: { canonical: "https://divingclub.lk/gallery" },
  openGraph: {
    title: "Diving Club Trincomalee — Gallery",
    description: "Underwater and above-water photography from Trincomalee's best dive sites, PADI courses, whale watching, and water activities.",
    url: "https://divingclub.lk/gallery",
  },
};

export default async function GalleryPage() {
  const apiImages = await getGalleryImages().catch(() => []);
  const images = apiImages.map((img) => ({ src: img.url, alt: img.title, caption: img.title }));

  const galleryJsonLd = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name: "Diving Club Trincomalee — Gallery",
    url: "https://divingclub.lk/gallery",
    description: "Photos from scuba diving, PADI courses, whale watching, and water activities in Trincomalee, Sri Lanka.",
    image: images.map((img) => ({
      "@type": "ImageObject",
      contentUrl: img.src,
      description: img.alt,
      name: img.caption,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(galleryJsonLd) }}
      />

      {/* Hero */}
      <section className="bg-charcoal-sea py-16 lg:py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <nav className="flex items-center gap-2 text-warm-white/35 text-xs mb-8">
            <Link href="/" className="hover:text-warm-white/60 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-warm-white/60">Gallery</span>
          </nav>

          <div className="flex items-center gap-3 mb-5">
            <span className="h-px w-6 bg-tropic-coral" aria-hidden="true" />
            <span className="text-tropic-coral text-[11px] font-semibold tracking-[0.22em] uppercase">
              Sandy Cove · Trincomalee
            </span>
          </div>

          <h1 className="text-warm-white font-display text-[clamp(2.5rem,6vw,5rem)] font-extrabold leading-tight mb-5">
            Gallery
          </h1>
          <p className="text-warm-white/55 text-base leading-relaxed max-w-xl">
            A few frames from the water. Reef dives, whale watches, freshly certified students, and the light you only get in Trincomalee in June.
          </p>
        </div>
      </section>

      {/* Gallery grid */}
      <section className="bg-warm-white py-16 px-6">
        <div className="max-w-6xl mx-auto">
          {images.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {images.map((img, i) => (
                <figure
                  key={i}
                  className={`relative overflow-hidden rounded-2xl bg-charcoal-sea/10 group ${
                    i === 0 ? "sm:col-span-2 lg:col-span-2 aspect-[16/9]" : "aspect-[4/3]"
                  }`}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes={i === 0 ? "(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 66vw" : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"}
                    loading={i === 0 ? "eager" : "lazy"}
                    priority={i === 0}
                  />
                  <figcaption className="absolute bottom-0 left-0 right-0 px-5 py-3 bg-gradient-to-t from-charcoal-sea/70 to-transparent">
                    <span className="text-warm-white/90 text-sm font-medium">{img.caption}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          ) : (
            <p className="text-charcoal-sea/40 text-sm text-center py-16">Photos coming soon.</p>
          )}

          <p className="text-charcoal-sea/40 text-sm text-center mt-10">
            More photos on our{" "}
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-tropic-coral hover:text-tropic-coral/80 transition-colors"
            >
              Facebook page
            </a>{" "}
            and{" "}
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-tropic-coral hover:text-tropic-coral/80 transition-colors"
            >
              Instagram
            </a>
            .
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-charcoal-sea py-20 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-12 h-px bg-tropic-coral mx-auto mb-8" />
          <span className="block text-[11px] uppercase tracking-[0.25em] font-semibold text-tropic-coral/70 mb-4">
            Ready to make your own?
          </span>
          <h2 className="text-warm-white font-display text-[clamp(2rem,5vw,3.5rem)] font-extrabold leading-tight mb-5">
            Come dive with us
          </h2>
          <p className="text-warm-white/50 text-base leading-relaxed max-w-lg mx-auto mb-10">
            The photos only tell part of it. The rest happens underwater.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/courses"
              className="inline-flex items-center gap-2 bg-tropic-coral text-white font-bold px-8 py-3.5 rounded-full hover:bg-[#d4603f] transition-colors text-sm"
            >
              Browse courses
            </Link>
            <Link
              href="/dive-sites"
              className="inline-flex items-center gap-2 text-warm-white/50 font-semibold text-sm hover:text-warm-white transition-colors"
            >
              See dive sites →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
