import Section from "@/components/ui/Section";
import Link from "next/link";
import Button, { Arrow } from "@/components/ui/Button";
import BookCta from "@/components/ads/BookCta";
import Countdown from "@/components/home/Countdown";
import NotifyForm from "@/components/home/NotifyForm";
import Waterline from "@/components/illustrations/Waterline";
import { Bubbles, Fish, Tang, Turtle } from "@/components/illustrations/Sea";
import { getActivePromotions } from "@/lib/api/promotions";
import {
  formatDay,
  isLive,
  itemLabel,
  leadPromotion,
  narrowPromotion,
  promoLabel,
  promoPhrase,
  travelWindow,
  unitOff,
} from "@/lib/discount";
import { money } from "@/lib/money";
import type { Promotion, PromotionItem } from "@/lib/types";

/** How many covered items the home list shows before it points at the rest. */
const LIST_LIMIT = 6;

const ITEM_PATH: Record<PromotionItem["type"], string> = {
  course: "/courses",
  activity: "/activities",
  package: "/packages",
};

/**
 * The running deal, on a sunrise field so it reads as its own moment rather than more of the
 * surrounding warm white. Sunrise is an accent between zones, not a stage of the dive, so it
 * carries a log label but no depth. The countdown sits on a dark dive-computer slate, the one
 * instrument on the field.
 *
 * Every promotion covers its own items at its own value, so it has three shapes:
 * - home (no `scope`): "Up to 20% off" and the list of what's covered, each item's price
 *   struck through beside the deal price. With no deal running it shrinks to the "tell me
 *   first" form, so the mailing list keeps growing through the off-season.
 * - one item (course, activity, package and single-offer ad pages): only that item's deal,
 *   as the regular and deal price per person. Nothing renders when the item has no deal.
 * - a few items (/padi): the home layout, cut down to those items.
 */
export default function PromoSection({
  promotions,
  serverNow,
  scope,
  ctaSource,
  joinBelow = false,
}: {
  promotions: Promotion[];
  serverNow: number;
  /** Only these items. Leave out for the whole deal (home). */
  scope?: { type: PromotionItem["type"]; slug: string }[];
  /** Ad pages: the CTA scrolls to their own form (#book) and is tracked under this label. */
  ctaSource?: string;
  /** The next section is sunrise too, so no waterline back to the surface. */
  joinBelow?: boolean;
}) {
  const running = scope
    ? promotions.flatMap((p) => narrowPromotion(p, scope) ?? [])
    : promotions.filter((p) => p.items.length > 0);
  const lead = leadPromotion(running);

  if (!lead) {
    if (scope) return null;

    return (
      <>
        <Waterline from="surface" to="sunrise" />
        <Section zone="sunrise" log="Next Season" className="relative overflow-hidden">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:items-end reveal">
            <div>
              <h2 className="text-section font-extrabold">Be first in the water next season</h2>
              <p className="text-lead text-muted mt-4 max-w-[44ch]">
                Early-bird prices go to the list first. One email when booking opens, nothing else.
              </p>
            </div>
            <NotifyForm source="home-offseason" label="Your email" />
          </div>
        </Section>
        <Waterline from="sunrise" to="surface" />
      </>
    );
  }

  const single = scope?.length === 1 ? lead.items[0] : null;
  const others = running.filter((p) => p !== lead);
  const dives = travelWindow(lead);
  const early = Boolean(lead.travel_from || lead.travel_to);

  const ctaLabel = single ? `Book with ${itemLabel(lead, single)}` : dives ? "Book early-bird dates" : "Book with the offer";
  const ctaClass =
    "group inline-flex w-auto items-center justify-between gap-4 min-h-14 rounded-[3px] border-2 border-surface-dark bg-warm-white py-2 pl-6 pr-2 text-base font-bold text-surface-dark shadow-[0_18px_30px_-20px_rgba(15,30,37,0.7)] transition-colors duration-200 hover:bg-surface-dark hover:text-warm-white";
  const ctaInner = (
    <>
      {ctaLabel}
      <span
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-surface-dark text-sunrise transition-[translate,background-color] duration-200 group-hover:translate-x-0.5 group-hover:bg-sunrise group-hover:text-surface-dark"
        aria-hidden="true"
      >
        <Arrow />
      </span>
    </>
  );

  return (
    <>
      <Waterline from="surface" to="sunrise" />
      <Section
        id="offer"
        zone="sunrise"
        log={early ? "Early Bird" : "Special Offer"}
        className="lane relative overflow-hidden scroll-mt-20"
      >
        {/* A small school crossing low behind the offer, desktop only: on a phone it would sit on the form. */}
        <div className="ambient hidden lg:block inset-x-0 bottom-10 h-14" aria-hidden="true">
          <Fish className="swim absolute left-0 top-0 w-9" style={{ "--swim-time": "31s", "--rest": "58%" } as React.CSSProperties} />
          <Tang body="var(--color-warm-white)" className="swim absolute left-0 top-6 w-7" style={{ "--swim-time": "31s", animationDelay: "-1.3s", "--rest": "64%" } as React.CSSProperties} />
        </div>

        <div className="relative grid gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-14 lg:items-start">
          <div className="reveal">
            <div className="relative">
              {/* The turtle treads water beside the number. */}
              <Turtle className="bob absolute right-0 -top-3 w-20 sm:w-24 lg:-right-4 lg:w-32 -rotate-6 pointer-events-none" />
              {/* White on sunrise is 1.96:1, too faint to read, so white is the highlight material here,
                  not the ink: a warm-white tag carrying the number, marker swipes on the dates. */}
              <p className="mr-24 sm:mr-28 lg:mr-36">
                <span className="pop-in inline-block -rotate-2 rounded-[3px] bg-warm-white px-4 pt-2 pb-3 font-display font-extrabold text-display leading-[0.85] text-surface-dark shadow-[0_22px_34px_-22px_rgba(15,30,37,0.7)]">
                  {single ? itemLabel(lead, single) : promoLabel(lead)}
                </span>
              </p>
            </div>
            <h2 className="text-section font-extrabold mt-5 text-balance">
              {single ? `${lead.title} on ${single.name}` : lead.title}
            </h2>
            {lead.description && <p className="text-lead text-muted mt-4 max-w-[46ch]">{lead.description}</p>}

            <p className="mt-6 max-w-[46ch] text-lg font-bold leading-snug">
              {lead.travel_from && lead.travel_to ? (
                <>
                  For dives between <Mark>{formatDay(lead.travel_from)}</Mark> and <Mark>{formatDay(lead.travel_to)}</Mark>.
                </>
              ) : dives ? (
                `For dives ${dives}.`
              ) : (
                "On any dive date."
              )}
            </p>

            {single ? <ItemPrice promo={lead} item={single} /> : <ItemList promo={lead} />}

            <p className="text-meta text-muted mt-4 max-w-[46ch]">
              Cancel 48 hours or more before your start time and the advance comes back in full.
            </p>

            {others.length > 0 && (
              <ul className="mt-6 flex flex-wrap gap-2 list-none">
                {others.map((p) => (
                  <li key={p.id} className="flex items-center gap-2.5 rounded-full bg-warm-white py-1.5 pl-1.5 pr-4 text-sm font-semibold text-surface-dark">
                    <span className="rounded-full bg-surface-dark px-2.5 py-1 text-label uppercase font-bold text-sunrise">
                      {p.min_people ? `${p.min_people}+ divers` : p.title}
                    </span>
                    {p.min_people ? `Book together, get ${promoPhrase(p)}` : promoLabel(p)}
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-3">
              {/* Warm white like the tag, so the section's two highlights read as one set: the deal,
                  and the way to take it. Inverts to dark on hover. */}
              {ctaSource ? (
                <BookCta source={`${ctaSource}_offer`} className={ctaClass}>
                  {ctaInner}
                </BookCta>
              ) : (
                <Link
                  href={single ? `/book?type=${single.type}&item=${encodeURIComponent(single.name)}#offer-details` : "/book#offer-details"}
                  className={ctaClass}
                >
                  {ctaInner}
                </Link>
              )}
              {!scope && (
                <Button href="/courses" variant="ghost" arrow>
                  See courses
                </Button>
              )}
            </div>
          </div>

          {lead.ends_at && (
            <div className="reveal zone-abyss relative overflow-hidden rounded-[18px] p-5 sm:p-7 shadow-[0_24px_50px_-30px_rgba(15,30,37,0.7)]">
              <div className="ambient right-5 top-0 h-full w-8 text-shallow-water" aria-hidden="true">
                <Bubbles count={5} />
              </div>
              <p className="relative flex items-center gap-2.5 text-label uppercase font-semibold">
                <span className="h-2 w-2 rounded-full bg-sunrise" aria-hidden="true" />
                Offer ends {formatDay(lead.ends_at)}
              </p>
              <div className="relative mt-4 text-sunrise">
                <Countdown endsAt={lead.ends_at} serverNow={serverNow} />
              </div>
              <p className="relative mt-4 text-meta text-muted">
                {dives
                  ? "The discount comes off each person's price when you pick a date in the window. No code needed."
                  : "The discount comes off each person's price automatically. No code needed."}
              </p>
            </div>
          )}
        </div>

        {/* The quieter way in, for planners not ready to commit: its own ruled row, not a card.
            Home only; an item or ad page keeps the visitor on its own booking. */}
        {!scope && (
          <div className="relative mt-12 lg:mt-16 grid gap-5 border-t-2 border-current pt-6 lg:grid-cols-[minmax(0,6fr)_minmax(0,6fr)] lg:items-center lg:gap-14">
            <div>
              <h3 className="text-sub font-extrabold">Not ready to book yet?</h3>
              <p className="text-meta text-muted mt-1 max-w-[44ch]">
                Leave your email and we&apos;ll send the next deal and the date next season opens.
              </p>
            </div>
            <NotifyForm source="home-promo" label="Your email for deals" />
          </div>
        )}
      </Section>
      {!joinBelow && <Waterline from="sunrise" to="surface" />}
    </>
  );
}

/**
 * What the deal covers, biggest discount first: each item's price struck through beside what
 * one person pays. Items with no margin simply aren't on it.
 */
function ItemList({ promo }: { promo: Promotion }) {
  const shown = promo.items.slice(0, LIST_LIMIT);
  const more = promo.items.length - shown.length;

  return (
    <ul className="mt-7 max-w-xl list-none border-t-2 border-current" aria-label={`What ${promo.title} covers`}>
      {shown.map((item, i) => {
        const deal = item.price - unitOff(item.price, promo.discount_type, item.discount_value);
        return (
          <li
            key={`${item.type}-${item.slug}`}
            className="rise-in grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 gap-y-1 border-b border-rule py-3.5 sm:grid-cols-[minmax(0,1fr)_auto_auto]"
            style={{ "--i": i } as React.CSSProperties}
          >
            <Link
              href={`${ITEM_PATH[item.type]}/${item.slug}`}
              className="min-w-0 font-bold leading-snug underline-offset-4 decoration-2 hover:underline"
            >
              {item.name}
            </Link>
            <span className="row-span-2 self-center justify-self-end rounded-[3px] bg-warm-white px-2.5 py-1 font-display text-lg font-extrabold leading-none text-surface-dark tabular-nums sm:order-last sm:row-span-1">
              {itemLabel(promo, item)}
            </span>
            <span className="text-meta tabular-nums text-muted sm:text-right">
              <s className="decoration-2">{money(item.price, item.currency)}</s>{" "}
              <span className="font-display text-base font-extrabold text-surface-dark">{money(deal, item.currency)}</span> per person
            </span>
          </li>
        );
      })}
      {more > 0 && (
        <li className="py-3.5 text-meta font-semibold">
          <Link href="/book#offer-details" className="underline decoration-2 underline-offset-4 hover:decoration-[3px]">
            And {more} more {more === 1 ? "item" : "items"}, see them when you book
          </Link>
        </li>
      )}
    </ul>
  );
}

/** One item's deal as two readouts: the usual price and what each person pays with the offer. */
function ItemPrice({ promo, item }: { promo: Promotion; item: PromotionItem }) {
  const off = unitOff(item.price, promo.discount_type, item.discount_value);
  const early = promo.travel_from || promo.travel_to;
  // A group deal's example is its smallest qualifying group; anything else, a couple.
  const group = promo.min_people ?? 2;

  return (
    <>
      <dl className="mt-7 grid max-w-md grid-cols-2 border-t-2 border-current">
        <div className="flex flex-col-reverse gap-1.5 border-r border-rule py-4 pr-4">
          <dt className="text-label uppercase font-semibold text-muted">Usual price</dt>
          <dd className="font-display text-readout font-bold tabular-nums text-muted">
            <s className="decoration-[3px]">{money(item.price, item.currency)}</s>
          </dd>
        </div>
        <div className="flex flex-col-reverse gap-1.5 py-4 pl-5">
          <dt className="text-label uppercase font-semibold text-muted">
            {promo.min_people ? `In a group of ${promo.min_people}+` : early ? "Early-bird price" : "Offer price"}
          </dt>
          <dd className="font-display text-readout font-extrabold tabular-nums">{money(item.price - off, item.currency)}</dd>
        </div>
      </dl>
      {/* Spelled out because it's the question people ask: it's per person, not per booking. */}
      <p className="mt-3 max-w-[46ch] text-meta font-semibold">
        Per person, so {group === 2 ? "two" : group} of you save <Mark>{money(off * group, item.currency)}</Mark> together.
      </p>
    </>
  );
}

/** A warm-white marker swipe: the highlight on sunrise, where white text itself can't be read. */
function Mark({ children }: { children: React.ReactNode }) {
  return (
    <mark className="rounded-[3px] bg-warm-white px-1.5 text-surface-dark [box-decoration-break:clone] whitespace-nowrap">
      {children}
    </mark>
  );
}

/**
 * PromoSection for one page's own items, fetching the running deals itself so item and ad pages
 * don't each repeat the fetch and the book-by check. Renders nothing when none of them is on a deal.
 */
export async function ScopedPromo(props: {
  scope: { type: PromotionItem["type"]; slug: string }[];
  ctaSource?: string;
  joinBelow?: boolean;
}) {
  const all = await getActivePromotions().catch(() => []);
  // Same as the home page: the list is cached for an hour, so re-check the book-by moment.
  // eslint-disable-next-line react-hooks/purity
  const serverNow = Date.now();
  return <PromoSection promotions={all.filter((p) => isLive(p, serverNow))} serverNow={serverNow} {...props} />;
}
