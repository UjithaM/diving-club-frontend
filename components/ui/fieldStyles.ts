/**
 * One definition of what a form field looks like.
 *
 * These were three near-identical strings at three different heights — the wizard at 52px,
 * the ad form at 48px, and the contact form with no min-height at all (~42px, under the
 * 44px minimum touch target, on forms that mostly get tapped on phones). 52px wins: it
 * clears the target on every field and matches the tallest of the three, so nothing shrinks.
 */
export const inputClass =
  "w-full min-h-[52px] border border-charcoal-sea/60 rounded-xl px-4 py-3 text-charcoal-sea placeholder:text-charcoal-sea/75 focus:outline-none focus:ring-2 focus:ring-shallow-water text-sm bg-white";

export const labelClass = "block text-sm font-semibold text-charcoal-sea mb-1.5";

/** Border + tint, not just a ring — colour alone shouldn't be the only signal. */
export const errorInputClass =
  "border-tropic-coral focus:ring-tropic-coral bg-tropic-coral/[0.03]";

export const hintClass = "text-xs text-charcoal-sea/75 mt-1.5";

/** `field` → `field-error`, the id an input points its aria-describedby at. */
export const errorId = (field: string) => `${field}-error`;
