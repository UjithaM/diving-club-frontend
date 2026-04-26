import Link from "next/link";

interface SectionHeroProps {
  title: string;
  subtitle?: string;
  ctaLabel?: string;
  ctaHref?: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
  bgColor?: string;
}

export default function SectionHero({
  title,
  subtitle,
  ctaLabel,
  ctaHref,
  secondaryCtaLabel,
  secondaryCtaHref,
  bgColor = "bg-charcoal-sea",
}: SectionHeroProps) {
  return (
    <section className={`${bgColor} text-warm-white py-20 px-4 text-center`}>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">{title}</h1>
        {subtitle && (
          <p className="text-lg md:text-xl text-warm-white/80 mb-8 max-w-2xl mx-auto">{subtitle}</p>
        )}
        {(ctaLabel || secondaryCtaLabel) && (
          <div className="flex flex-wrap gap-4 justify-center">
            {ctaLabel && ctaHref && (
              <Link
                href={ctaHref}
                className="bg-tropic-coral text-white font-semibold px-8 py-3 rounded-full hover:bg-sunrise transition-colors text-lg"
              >
                {ctaLabel}
              </Link>
            )}
            {secondaryCtaLabel && secondaryCtaHref && (
              <Link
                href={secondaryCtaHref}
                className="border-2 border-warm-white text-warm-white font-semibold px-8 py-3 rounded-full hover:bg-warm-white hover:text-charcoal-sea transition-colors text-lg"
              >
                {secondaryCtaLabel}
              </Link>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
