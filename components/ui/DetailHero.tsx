import Image from "next/image";
import Link from "next/link";
import type { Crumb } from "@/components/ui/PageHero";
import ReefScene from "@/components/illustrations/ReefScene";
import { Bubbles, Diver } from "@/components/illustrations/Sea";

export type Tone = "shallow" | "sunrise" | "coral" | "ink";

export const toneClass: Record<Tone, string> = {
  shallow: "bg-shallow-water text-surface-dark",
  sunrise: "bg-sunrise text-surface-dark",
  coral: "bg-tropic-coral text-surface-dark",
  ink: "bg-charcoal-sea text-warm-white",
};

/**
 * The top of a course / activity / dive-site / package page. The item's own photo when the admin
 * has one (the LCP image, so priority), otherwise a live reef window — never a stock stand-in.
 */
export default function DetailHero({
  crumbs,
  badge,
  title,
  lead,
  chips,
  price,
  image,
}: {
  crumbs: Crumb[];
  badge?: { label: string; tone: Tone };
  title: React.ReactNode;
  lead?: React.ReactNode;
  chips: React.ReactNode[];
  price?: { amount: React.ReactNode; currency: string; prefix?: string; was?: React.ReactNode; note?: string };
  image?: { src?: string | null; alt: string };
}) {
  const hasImage = Boolean(image?.src);
  return (
    <section className="zone-surface relative overflow-hidden px-5 sm:px-8 pt-8 pb-12 lg:pt-12 lg:pb-16">
      <div className="max-w-6xl mx-auto grid gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-14 lg:items-center">
        <div className="relative">
          <nav aria-label="Breadcrumb" className="mb-7">
            <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-charcoal-sea/80">
              {crumbs.map((c, i) => (
                <li key={c.label} className="flex items-center gap-2">
                  {i > 0 && <span aria-hidden="true">/</span>}
                  {c.href ? (
                    <Link href={c.href} className="underline-offset-4 hover:underline hover:text-charcoal-sea">{c.label}</Link>
                  ) : (
                    <span className="font-semibold text-charcoal-sea" aria-current="page">{c.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>

          {!hasImage && (
            <div className="lg:hidden absolute right-0 top-10 w-28 sm:w-40 pointer-events-none" aria-hidden="true">
              <div className="enter-swim">
                <div className="bob relative">
                  <Diver className="block w-full h-auto" />
                  <div className="absolute right-[4%] bottom-[55%] h-24 w-8 text-shallow-water">
                    <Bubbles count={4} />
                  </div>
                </div>
              </div>
            </div>
          )}

          {badge && (
            <span className={`inline-block rounded-full px-3 py-1.5 mb-5 text-label uppercase font-semibold ${toneClass[badge.tone]}`}>
              {badge.label}
            </span>
          )}

          <h1 className={`text-hero font-extrabold max-w-[18ch] rise-in ${hasImage ? "" : "pr-24 sm:pr-36 lg:pr-0"}`}>
            {title}
          </h1>

          {lead && <p className="mt-5 text-lead text-muted max-w-[46ch]">{lead}</p>}

          <p className="mt-6 flex flex-wrap gap-2">
            {chips.map((c, i) => (
              <span key={i} className="rounded-full border-2 border-charcoal-sea/15 bg-white px-3 py-1.5 text-sm font-semibold tabular">
                {c}
              </span>
            ))}
          </p>

          {price && (
            <div className="mt-8 inline-flex items-stretch overflow-hidden rounded-[14px] border-2 border-charcoal-sea">
              {price.prefix && (
                <span className="flex items-center px-4 text-label uppercase font-semibold">{price.prefix}</span>
              )}
              <span className="flex items-center gap-2 bg-charcoal-sea px-5 py-3">
                <span className="font-display text-figure font-extrabold text-tropic-coral tabular">{price.amount}</span>
                <span className="text-meta font-semibold text-warm-white/80">{price.currency}</span>
              </span>
              {(price.was || price.note) && (
                <span className="flex flex-col justify-center px-4 text-sm">
                  {price.was && <span className="line-through text-muted tabular">{price.was}</span>}
                  {price.note && <span className="text-muted">{price.note}</span>}
                </span>
              )}
            </div>
          )}
        </div>

        {hasImage ? (
          <div className="plate aspect-[4/3] lg:aspect-[4/5] rounded-[18px] -mx-5 sm:mx-0 rounded-none sm:rounded-[18px]">
            <Image src={image!.src!} alt={image!.alt} fill priority sizes="(max-width: 1024px) 100vw, 42vw" className="object-cover" />
          </div>
        ) : (
          <ReefScene className="hidden lg:block aspect-[4/5]" />
        )}
      </div>
    </section>
  );
}
