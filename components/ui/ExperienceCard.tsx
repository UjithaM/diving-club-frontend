import Image from "next/image";
import Link from "next/link";
import type { HomeActivity, Promotion } from "@/lib/types";
import { activityPhotos } from "@/lib/photos";
import { Arrow } from "@/components/ui/Button";
import { currencySymbol, money } from "@/lib/money";
import { promoBadge, promoFinePrint, promoPrice } from "@/lib/discount";

const typeLabels: Record<string, string> = {
  "try-diving":     "Try Diving",
  "fun-diving":     "Fun Diving",
  snorkeling:       "Snorkeling",
  "whale-watching": "Whale Watching",
  "jet-ski":        "Jet Ski",
  "boat-tour":      "Boat Tour",
  "sunset-tour":    "Sunset Tour",
};

/**
 * An activity as a photo plate with its readouts underneath. `lead` is the big one on the left
 * of the home grid; the others sit beside it as horizontal plates on wide screens.
 */
export default function ExperienceCard({
  experience,
  lead = false,
  promo = null,
}: {
  experience: HomeActivity;
  lead?: boolean;
  /** A running deal for activities (see cardPromotion): shows the regular price struck through. */
  promo?: Promotion | null;
}) {
  const label = typeLabels[experience.type] ?? experience.type;
  const fallback = activityPhotos[experience.type];
  const href = `/activities/${experience.slug}`;

  return (
    <article className={`group relative flex flex-col h-full ${lead ? "" : "lg:grid lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-6"}`}>
      <div className={`plate ${lead ? "aspect-[4/3] lg:aspect-[5/6]" : "aspect-[4/3] lg:aspect-auto lg:min-h-full"}`}>
        {experience.image ? (
          <Image
            src={experience.image}
            alt={`${experience.name} in Trincomalee, Sri Lanka`}
            fill
            className="object-cover"
            sizes={lead ? "(max-width: 1024px) 100vw, 45vw" : "(max-width: 1024px) 100vw, 22vw"}
          />
        ) : fallback ? (
          <Image
            src={fallback.src}
            alt={fallback.alt}
            fill
            placeholder="blur"
            className="object-cover"
            sizes={lead ? "(max-width: 1024px) 100vw, 45vw" : "(max-width: 1024px) 100vw, 22vw"}
          />
        ) : null}
        <span className="absolute top-0 left-0 zone-sunrise text-label uppercase font-semibold px-3 py-2">
          {label}
        </span>
        {experience.divesIncluded ? (
          <span className="absolute top-0 right-0 zone-abyss text-label uppercase font-semibold px-3 py-2">
            {experience.divesIncluded} dives
          </span>
        ) : null}
        {promo && (
          <span className="pop-in absolute bottom-0 left-0 bg-tropic-coral text-surface-dark text-label uppercase font-semibold px-3 py-2">
            {promoBadge(promo)}
          </span>
        )}
      </div>

      <div className="flex flex-col flex-1 pt-5">
        <h3 className={`font-extrabold leading-tight mb-2 text-sub ${lead ? "lg:text-section" : ""}`}>
          <Link href={href} className="after:absolute after:inset-0 hover:underline">
            {experience.name}
          </Link>
        </h3>

        <p className="text-muted text-meta mb-5 flex-1 line-clamp-3 max-w-[52ch]">
          {experience.description}
        </p>

        {promo && promoFinePrint(promo) && <p className="text-xs text-muted -mt-3 mb-3">{promoFinePrint(promo)}</p>}

        <div className="flex items-end justify-between gap-4 border-t-2 border-current pt-3">
          <div className="flex gap-6">
            <div className="flex flex-col-reverse gap-1">
              <span className="text-label uppercase font-semibold text-muted">{experience.duration}</span>
              <span className="font-display font-bold text-readout tabular">
                {promo && (
                  <span className="font-sans text-meta font-semibold text-muted line-through mr-2">
                    {money(experience.price, experience.currency)}
                  </span>
                )}
                {promo ? money(promoPrice(experience.price, promo), experience.currency) : `${currencySymbol(experience.currency)}${experience.price}`}
                <span className="text-meta font-normal text-muted ml-1">{experience.currency}</span>
              </span>
            </div>
          </div>
          <span className="inline-flex items-center gap-2 min-h-11 text-sm font-semibold text-coral-deep group-hover:underline" aria-hidden="true">
            View <Arrow />
          </span>
        </div>
      </div>
    </article>
  );
}
