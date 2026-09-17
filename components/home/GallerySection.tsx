import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import Section from "@/components/ui/Section";
import { Arrow } from "@/components/ui/Button";
import { galleryFallback } from "@/lib/photos";
import { Bubbles } from "@/components/illustrations/Sea";
import type { GalleryImage } from "@/lib/types";

interface Cell {
  key: string;
  src: string | StaticImageData;
  alt: string;
  title?: string;
}

export default function GallerySection({ images }: { images: GalleryImage[] }) {
  // The admin gallery can be empty; the centre's own photos stand in rather than leaving a
  // heading over nothing.
  const cells: Cell[] = images.length
    ? images.slice(0, 6).map((img) => ({ key: String(img.id), src: img.url, alt: img.title, title: img.title }))
    : galleryFallback.map((p, i) => ({ key: `local-${i}`, src: p.src, alt: p.alt }));

  return (
    <Section zone="abyss" depth={16} log="Underwater World" className="relative">
      <div className="ambient right-4 top-0 h-full w-24 text-shallow-water/60 lg:right-16 lg:w-40" aria-hidden="true">
        <Bubbles count={8} />
      </div>
      <div className="mb-12 reveal">
        <h2 className="text-section font-extrabold">Moments Beneath the Surface</h2>
        <p className="text-lead text-muted mt-4 max-w-[48ch]">
          Every dive tells its own story. Here are a few glimpses from the waters around Trincomalee.
        </p>
      </div>

      <div className="gallery-grid">
        {cells.map((c, i) => (
          <figure key={c.key} className={`plate relative m-0 reveal ${i === 0 ? "col-span-2 aspect-[2/1] lg:aspect-auto" : "aspect-square"}`}>
            <Image
              src={c.src}
              alt={c.alt}
              fill
              placeholder={typeof c.src === "string" ? "empty" : "blur"}
              className="object-cover"
              sizes={i === 0 ? "(max-width: 1024px) 100vw, 50vw" : "(max-width: 1024px) 50vw, 25vw"}
            />
            {c.title && (
              <figcaption className="absolute bottom-0 left-0 zone-abyss text-label uppercase font-semibold px-3 py-2">
                {c.title}
              </figcaption>
            )}
          </figure>
        ))}

        <Link
          href="/gallery"
          className="group aspect-square flex flex-col justify-between p-5 lg:p-6 bg-action text-action-ink hover:bg-action-hover transition-colors reveal"
        >
          <span className="font-display font-extrabold text-sub lg:text-readout">See More</span>
          <span className="flex items-center justify-between text-label uppercase font-semibold">
            View Gallery <Arrow />
          </span>
        </Link>
      </div>
    </Section>
  );
}
