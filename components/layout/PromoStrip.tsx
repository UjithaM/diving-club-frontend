import Link from "next/link";
import { formatDay, promoLabel } from "@/lib/discount";
import type { Promotion } from "@/lib/types";

/**
 * A dark band above the header on every page, so an ad visitor landing on a course page still
 * sees the deal. It goes straight to the booking page, where the offer is explained. No dismiss
 * button: it scrolls away with the page. Motion (a light sweep) is CSS only and stops
 * under reduced motion.
 */
export default function PromoStrip({ promo }: { promo: Promotion | null }) {
  if (!promo) return null;

  return (
    <Link
      href="/book#offer-details"
      className="promo-shine group zone-abyss relative flex min-h-14 items-center justify-center gap-x-3 gap-y-2 flex-wrap overflow-hidden px-4 py-2.5 text-center sm:min-h-[4.5rem] sm:gap-x-4 sm:px-5 sm:py-3.5"
    >
      {/* Phones drop the label: the title already says "Early bird", and one line beats two. */}
      <span className="relative hidden sm:inline rounded-full bg-sunrise px-3 py-1 text-label uppercase font-bold text-surface-dark">
        {promo.travel_from || promo.travel_to ? "Early bird" : "Offer"}
      </span>
      <span className="relative text-[0.9375rem] font-bold sm:text-lg">
        {promo.title}: <span className="font-display font-extrabold text-sunrise">{promoLabel(promo)}</span>
        {promo.ends_at && (
          <span className="hidden md:inline font-semibold text-muted"> · book by {formatDay(promo.ends_at)}</span>
        )}
      </span>
      <span className="relative inline-flex min-h-9 items-center gap-1.5 rounded-[8px] bg-action px-3 text-sm font-bold sm:min-h-10 sm:gap-2 sm:px-4 text-action-ink transition-colors group-hover:bg-action-hover">
        Book now
        <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">→</span>
      </span>
    </Link>
  );
}
