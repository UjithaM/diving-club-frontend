import Image from "next/image";

interface GalleryImage {
  src: string;
  alt: string;
}

interface GalleryStripProps {
  images: GalleryImage[];
  heading?: string;
}

export default function GalleryStrip({ images, heading }: GalleryStripProps) {
  if (images.length === 0) return null;

  return (
    <section className="bg-charcoal-sea/5 py-14 px-6">
      <div className="max-w-6xl mx-auto">
        {heading && (
          <div className="flex items-center gap-3 mb-8">
            <span className="h-px w-6 bg-tropic-coral" aria-hidden="true" />
            <h2 className="text-charcoal-sea font-display text-2xl font-extrabold">{heading}</h2>
          </div>
        )}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {images.slice(0, 4).map((img, i) => (
            <div
              key={i}
              className={`relative overflow-hidden rounded-2xl bg-charcoal-sea/10 ${
                i === 0 ? "col-span-2 row-span-2 aspect-square md:aspect-auto md:h-72" : "aspect-square h-[140px] md:h-[138px]"
              }`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
                sizes={i === 0 ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 50vw, 25vw"}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
