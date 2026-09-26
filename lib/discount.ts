import type { Deposit, Promotion, PromotionItem } from "@/lib/types";
import { money } from "@/lib/money";

/**
 * Client-side discount maths for the *preview* shown before submitting.
 *
 * The server is authoritative: after POST /api/booking, use its `total_price` (already
 * discounted) and `discount_amount`. This exists only so the customer sees the number
 * before they commit.
 */

/** `people` can be the literal string "7+", and Number("7+") is NaN. */
export function headcount(people: string | number): number {
  const n = typeof people === "number" ? people : parseInt(people, 10);
  return Number.isFinite(n) && n > 0 ? n : 1;
}

/** `quantity` is per person — 2 people × 3 dives at $40 is $240, same as the backend. */
export function subtotal(
  price: number,
  people: string | number,
  quantity: string | number = 1
): number {
  return round2(price * headcount(people) * headcount(quantity));
}

/** Same headcount across every line — one booking, one group of people. */
export function cartSubtotal(
  lines: { price?: number; quantity: string | number }[],
  people: string | number
): number {
  return round2(lines.reduce((sum, l) => sum + subtotal(l.price ?? 0, people, l.quantity), 0));
}

/**
 * Amount off, given the whole booking subtotal.
 *
 * A "fixed" discount is a flat amount off the WHOLE total — NOT per person. (A "fixed"
 * *deposit* is per person. Same word, opposite meaning; do not copy this function for
 * deposits, and do not compute deposits at all.)
 *
 * Clamped to the subtotal so a $500 discount on a $300 booking never goes negative.
 */
export function previewDiscount(
  sub: number,
  type: "percentage" | "fixed",
  value: number
): number {
  if (!(sub > 0) || !(value > 0)) return 0;
  const raw = type === "percentage" ? (sub * value) / 100 : value;
  return round2(Math.min(Math.max(raw, 0), sub));
}

/**
 * How to describe the advance before a booking exists — a label, not arithmetic.
 * Returns null when deposits are off.
 */
export function depositRuleLabel(
  deposit: Deposit | undefined,
  currency = "USD"
): string | null {
  if (!deposit?.enabled) return null;
  return deposit.type === "percentage"
    ? `${deposit.value}% to reserve`
    : `${currency} ${deposit.value.toFixed(2)} per person to reserve`;
}

// ─── Promotions ──────────────────────────────────────────────────────────────
// Mirrors App\Models\Promotion::discountFor and the best-of pick in Api\BookingController.
// Preview only: the server applies promotions itself and its total wins.

export type PromoLine = {
  price?: number;
  quantity: string | number;
  kind: PromotionItem["type"];
  slug?: string;
};

/** The promotion's entry for this item, or undefined when the item isn't on the deal. */
export function promoItem(promo: Promotion, kind: PromotionItem["type"], slug?: string): PromotionItem | undefined {
  return slug ? promo.items.find((i) => i.type === kind && i.slug === slug) : undefined;
}

/** Off ONE person's price: a percent of it, or a fixed amount clamped to it. */
export function unitOff(price: number, type: Promotion["discount_type"], value: number): number {
  if (!(price > 0) || !(value > 0)) return 0;
  return round2(type === "percentage" ? (price * Math.min(value, 100)) / 100 : Math.min(value, price));
}

/** Still bookable right now? The API list is cached for an hour, so re-check the book-by time. */
export function isLive(promo: Promotion, now = Date.now()): boolean {
  return !promo.ends_at || new Date(promo.ends_at).getTime() > now;
}

/** The deal to headline: the early bird (it has a deadline), else any deal for everyone. */
export function leadPromotion(promos: Promotion[]): Promotion | null {
  return (
    promos.find((p) => p.travel_from || p.travel_to) ?? promos.find((p) => !p.min_people) ?? promos[0] ?? null
  );
}

/** Amount a promotion takes off this booking, or 0 when its rules don't match. Mirrors Promotion::discountFor. */
export function promotionDiscount(
  promo: Promotion,
  lines: PromoLine[],
  people: string | number,
  date?: string | null
): number {
  if (promo.min_people && headcount(people) < promo.min_people) return 0;
  if (promo.travel_from || promo.travel_to) {
    if (!date) return 0;
    const day = date.slice(0, 10);
    if (promo.travel_from && day < promo.travel_from) return 0;
    if (promo.travel_to && day > promo.travel_to) return 0;
  }
  // Per item, per person: each unit of a listed item gets that item's own value off.
  return round2(
    lines.reduce((sum, l) => {
      const item = promoItem(promo, l.kind, l.slug);
      return item ? sum + unitOff(l.price ?? 0, promo.discount_type, item.discount_value) * headcount(people) * headcount(l.quantity) : sum;
    }, 0)
  );
}

/** Promotions don't stack with each other — the booking gets the single best one. */
export function bestPromotion(
  promos: Promotion[],
  lines: PromoLine[],
  people: string | number,
  date?: string | null
): { promo: Promotion; amount: number } | null {
  let best: { promo: Promotion; amount: number } | null = null;
  for (const promo of promos) {
    const amount = promotionDiscount(promo, lines, people, date);
    if (amount > (best?.amount ?? 0)) best = { promo, amount };
  }
  return best;
}

/**
 * "What would unlock a better deal?" — a dive date in the early-bird window, or a bigger group.
 * Only offered when it would beat what the booking already gets.
 */
export function promotionHint(
  promos: Promotion[],
  lines: PromoLine[],
  people: string | number,
  date: string | null | undefined,
  current: number
): string | null {
  let best: { text: string; amount: number } | null = null;
  for (const promo of promos) {
    if (promotionDiscount(promo, lines, people, date) > 0) continue;
    const needsDate = Boolean(promo.travel_from || promo.travel_to);
    const needsPeople = Boolean(promo.min_people && headcount(people) < promo.min_people);
    // One nudge at a time: asking for both a new date and more people is not a hint.
    if (needsDate && needsPeople) continue;
    // Compared per person: a group deal's total grows with the group it asks for, so "add 3
    // divers for 10%" would otherwise outbid "move your date for 15%".
    const amount = needsPeople
      ? promotionDiscount(promo, lines, promo.min_people!, date) / promo.min_people!
      : promotionDiscount(promo, lines, people, promo.travel_from ?? promo.travel_to) / headcount(people);
    if (amount <= Math.max(current / headcount(people), best?.amount ?? 0)) continue;
    // Worded for what's in the cart: "10% off", not the deal's headline "up to 20% off".
    const inCart = narrowPromotion(promo, lines.flatMap((l) => (l.slug ? [{ type: l.kind, slug: l.slug }] : [])));
    const off = promoPhrase(inCart ?? promo);
    const text = needsPeople
      ? `Add ${promo.min_people! - headcount(people)} more ${promo.min_people! - headcount(people) === 1 ? "diver" : "divers"} to get ${off} (${promo.title}).`
      : `Pick a dive date ${travelWindow(promo)} to get ${off} (${promo.title}).`;
    best = { text, amount };
  }
  return best?.text ?? null;
}

export type ItemDeal = { promo: Promotion; item: PromotionItem; off: number };

/**
 * Every running deal on one item, the one to headline first: deals anyone can get before group
 * deals, then the biggest saving per person.
 */
export function itemDeals(promos: Promotion[], kind: PromotionItem["type"], slug: string): ItemDeal[] {
  return promos
    .flatMap((promo) => {
      const item = promoItem(promo, kind, slug);
      return item ? [{ promo, item, off: unitOff(item.price, promo.discount_type, item.discount_value) }] : [];
    })
    .filter((d) => d.off > 0)
    .sort((a, b) => Number(Boolean(a.promo.min_people)) - Number(Boolean(b.promo.min_people)) || b.off - a.off);
}

/** For cards: the deal price anyone gets. Group-only deals are not a card price. */
export function cardDeal(promos: Promotion[], kind: PromotionItem["type"], slug: string): ItemDeal | null {
  return itemDeals(promos, kind, slug).find((d) => !d.promo.min_people) ?? null;
}

/** "20% off" or "$15 off" — one item's value. */
export function itemLabel(promo: Promotion, item: PromotionItem): string {
  return promo.discount_type === "percentage" ? `${item.discount_value}% off` : `${money(item.discount_value, item.currency)} off`;
}

/** promoLabel for mid-sentence: "get up to 20% off". */
export function promoPhrase(promo: Promotion): string {
  return promoLabel(promo).replace(/^Up/, "up");
}

/** The promotion cut down to the given items, or null when it covers none of them. */
export function narrowPromotion(promo: Promotion, scope: { type: PromotionItem["type"]; slug: string }[]): Promotion | null {
  const items = promo.items.filter((i) => scope.some((s) => s.type === i.type && s.slug === i.slug));
  return items.length > 0 ? { ...promo, items, max_discount: Math.max(...items.map((i) => i.discount_value)) } : null;
}

/** The chip on a card: "Early bird · 15% off". */
export function promoBadge(deal: ItemDeal): string {
  return `${deal.promo.travel_from || deal.promo.travel_to ? "Early bird · " : ""}${itemLabel(deal.promo, deal.item)}`;
}

/** Under a card price, so a struck-through price never reads as today's price for any date. */
export function promoFinePrint(promo: Promotion): string | null {
  return promo.travel_from || promo.travel_to ? `Early-bird price for dives ${travelWindow(promo)}` : null;
}

/**
 * "Up to 20% off", or "20% off" when every item gets the same. Items are per person, so a fixed
 * deal reads "Up to $50 off" in the item's own currency, never a guessed "$".
 */
export function promoLabel(promo: Promotion): string {
  const values = new Set(promo.items.map((i) => i.discount_value));
  const top = promo.items[0];
  const value =
    promo.discount_type === "percentage" ? `${promo.max_discount}%` : money(promo.max_discount, top?.currency);
  return `${values.size > 1 ? "Up to " : ""}${value} off`;
}

/**
 * "1 May 2027" from "2027-05-01" or an ISO moment. Read in UTC, the backend's clock: a book-by
 * of 31 March ends 23:59:59 UTC, which in Colombo is already 1 April — the day the admin picked
 * is the one to show.
 */
export function formatDay(value: string): string {
  return new Date(value.length === 10 ? `${value}T00:00:00Z` : value).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

/** "between 1 May 2027 and 31 Oct 2027", "from 1 May 2027", "until 31 Oct 2027". */
export function travelWindow(promo: Promotion): string {
  if (promo.travel_from && promo.travel_to) return `between ${formatDay(promo.travel_from)} and ${formatDay(promo.travel_to)}`;
  if (promo.travel_from) return `from ${formatDay(promo.travel_from)}`;
  return promo.travel_to ? `until ${formatDay(promo.travel_to)}` : "";
}

function round2(n: number): number {
  return Math.round((n + Number.EPSILON) * 100) / 100;
}
