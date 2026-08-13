import type { Deposit } from "@/lib/types";

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

function round2(n: number): number {
  return Math.round((n + Number.EPSILON) * 100) / 100;
}
