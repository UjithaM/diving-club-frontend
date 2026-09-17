/**
 * One definition of what a form field looks like.
 *
 * These were three near-identical strings at three different heights — the wizard at 52px,
 * the ad form at 48px, and the contact form with no min-height at all (~42px, under the
 * 44px minimum touch target, on forms that mostly get tapped on phones). 52px wins: it
 * clears the target on every field and matches the tallest of the three, so nothing shrinks.
 */
export const inputClass =
  "w-full min-h-[52px] border-2 border-charcoal-sea/25 rounded-[10px] px-4 py-3 text-charcoal-sea text-sm bg-white transition-[border-color,box-shadow] duration-150 hover:border-charcoal-sea/45 focus:outline-none focus:border-shallow-water focus:shadow-[0_0_0_4px_color-mix(in_srgb,var(--color-shallow-water)_22%,transparent)]";

export const labelClass = "block text-sm font-semibold text-charcoal-sea mb-2";

/** Border + tint, not just a ring — colour alone shouldn't be the only signal. */
export const errorInputClass =
  "border-coral-deep! bg-tropic-coral/[0.04] focus:shadow-[0_0_0_4px_color-mix(in_srgb,var(--color-tropic-coral)_22%,transparent)]";

export const hintClass = "text-xs text-charcoal-sea/80 mt-2";

/** `field` → `field-error`, the id an input points its aria-describedby at. */
export const errorId = (field: string) => `${field}-error`;
