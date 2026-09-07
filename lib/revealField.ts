/**
 * Bring the field that's blocking submit onto the screen and make it obvious.
 *
 * react-hook-form's own `shouldFocusError` only calls `ref.focus()`, and it does so after
 * `handleSubmit` has awaited validation — by which point iOS Safari has unwound the
 * user-gesture stack and ignores programmatic focus entirely. On an iPhone, tapping submit
 * with an empty name did nothing at all.
 *
 * `scrollIntoView` carries no such restriction, so it is what actually guarantees the reveal.
 * Centring also clears the sticky header on /book and the fixed CTA bar on the ad pages, which
 * a plain `.focus()` scroll parks the field behind.
 */

/** Long enough to notice, short enough not to linger. Matches the keyframe in globals.css. */
const FLASH_MS = 1000;

/**
 * @param form   the <form> to search within
 * @param fields names of the fields that failed validation
 */
export function revealField(form: HTMLFormElement | null, fields: string[]) {
  if (!form || fields.length === 0) return;

  // DOM order, not the order of the errors object — the visitor should land on the first
  // problem they can see, and key order isn't guaranteed to match the layout.
  const el = Array.from(form.elements).find(
    (node): node is HTMLElement =>
      node instanceof HTMLElement && fields.includes((node as HTMLInputElement).name)
  );
  if (!el) return;

  el.scrollIntoView({ behavior: "smooth", block: "center" });
  // preventScroll so this doesn't fight the smooth scroll above. Silently ignored on iOS,
  // which is the whole reason the scroll is separate.
  el.focus({ preventScroll: true });

  // Class toggled directly rather than through React state: it's a one-shot visual, and
  // routing it through a re-render would mean threading a timer through both forms.
  const target = el.closest("[data-field]") ?? el;
  target.classList.remove("field-flash");
  // Reading offsetWidth restarts the animation if the same field is flashed twice.
  void (target as HTMLElement).offsetWidth;
  target.classList.add("field-flash");
  setTimeout(() => target.classList.remove("field-flash"), FLASH_MS);
}
