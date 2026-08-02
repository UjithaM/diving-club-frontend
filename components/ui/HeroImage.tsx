import Image from "next/image";

interface HeroImageProps {
  /** Item image from the API. Usually null — most items have no upload yet. */
  src?: string | null;
  /** Descriptive, not the bare item name. It's the alt text for the page's lead image. */
  alt: string;
}

/**
 * Full-bleed hero photo with the charcoal gradient over it.
 *
 * Returns null when there's no image, so the parent `<section>` just keeps its
 * `bg-charcoal-sea` and the page looks exactly as it did before. That's the whole
 * fallback strategy — no stock photo standing in for a real one.
 *
 * The parent needs `relative overflow-hidden`, and its content wrapper needs `relative`
 * so the text sits above this.
 */
export default function HeroImage({ src, alt }: HeroImageProps) {
  if (!src) return null;

  return (
    <>
      <Image
        src={src}
        alt={alt}
        fill
        // This is the LCP element on these pages.
        priority
        sizes="100vw"
        className="object-cover opacity-40"
      />
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(to top, rgba(38,70,83,0.95), rgba(38,70,83,0.55))" }}
        aria-hidden="true"
      />
    </>
  );
}
