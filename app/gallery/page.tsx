import type { Metadata } from "next";
import Image, { type StaticImageData } from "next/image";
import { galleryFallback, photos } from "@/lib/photos";
import { getGalleryImages } from "@/lib/api/gallery";
import type { ImageGallery, WithContext } from "schema-dts";
import { safeJsonLd } from "@/lib/jsonld";

import PageHero from "@/components/ui/PageHero";
import Waterline from "@/components/illustrations/Waterline";
import CtaBand, { BandLink } from "@/components/ui/CtaBand";
import Button from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Gallery | Diving Club",
  description:
    "Photos from our dive sites, courses, and activities in Trincomalee, Sri Lanka. Swami Rock, Pigeon Island, whale watching, Open Water training, and more.",
  alternates: { canonical: "https://divingclub.lk/gallery" },
  openGraph: {
    title: "Gallery | Diving Club, Trincomalee",
    description: "Underwater and above-water photography from Trincomalee's best dive sites, PADI courses, whale watching, and water activities.",
    url: "https://divingclub.lk/gallery",
  },
};

export default async function GalleryPage() {
  const apiImages = await getGalleryImages().catch(() => []);
  const images = apiImages.map((img) => ({ src: img.url, alt: img.title, caption: img.title }));
  const shown: { src: string | StaticImageData; alt: string; caption?: string }[] = images.length
    ? images
    : galleryFallback.concat([photos.instructor, photos.diver, photos.boatSunrise, photos.jetSki]).map((p) => ({ src: p.src, alt: p.alt }));

  const galleryJsonLd: WithContext<ImageGallery> = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name: "Diving Club Trincomalee | Gallery",
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
        dangerouslySetInnerHTML={{ __html: safeJsonLd(galleryJsonLd) }}
      />

      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Gallery" }]}
        notes="Sandy Cove · Trincomalee"
        title={<>Gallery</>}
        lead={<>A few frames from the water. Reef dives, whale watches, freshly certified students, and the light you only get in Trincomalee in June.</>}
      />
      <Waterline from="surface" to="shallow" />

      {/* Gallery grid. When the admin gallery is empty, the centre's own photos fill it rather
          than a "coming soon" line — the structured data above still lists only admin images. */}
      <section className="zone-shallow py-12 lg:py-16 px-5 sm:px-8">
        <div className="max-w-6xl mx-auto">
          {shown.length > 0 ? (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 [grid-auto-flow:dense]">
              {shown.map((img, i) => (
                <figure
                  key={i}
                  className={`plate group rise-in m-0 rounded-[12px] ${
                    i % 5 === 0 ? "col-span-2 aspect-[16/10]" : i % 5 === 3 ? "row-span-2 aspect-[3/4] lg:aspect-auto" : "aspect-square"
                  }`}
                  style={{ "--i": i % 6 } as React.CSSProperties}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover"
                    placeholder={typeof img.src === "string" ? "empty" : "blur"}
                    sizes={i % 5 === 0 ? "(max-width: 1024px) 100vw, 66vw" : "(max-width: 1024px) 50vw, 33vw"}
                    loading={i === 0 ? "eager" : "lazy"}
                    priority={i === 0}
                  />
                  {img.caption && (
                    <figcaption className="absolute bottom-0 left-0 zone-abyss px-3 py-2 text-label uppercase font-semibold">
                      {img.caption}
                    </figcaption>
                  )}
                </figure>
              ))}
            </div>
          ) : (
            <p className="text-sm text-center py-16">Photos coming soon.</p>
          )}

          <p className="text-sm text-center mt-10">
            More photos on our{" "}
            <a
              href="https://www.facebook.com/profile.php?id=100092324331693"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold underline underline-offset-4 hover:no-underline"
            >
              Facebook page
            </a>{" "}
            and{" "}
            <a
              href="https://www.instagram.com/diving_club_s30212/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold underline underline-offset-4 hover:no-underline"
            >
              Instagram
            </a>
            .
          </p>
        </div>
      </section>

      <CtaBand
        notes="Ready to make your own?"
        title={<>Come dive with us</>}
        body={<p>The photos only tell part of it. The rest happens underwater.</p>}
      >
        <Button href="/courses" size="lg">Browse courses</Button>
        <BandLink href="/dive-sites">See dive sites →</BandLink>
      </CtaBand>
    </>
  );
}
