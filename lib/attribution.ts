/** Where the localStorage record written by the capture snippet in app/layout.tsx lives. */
const KEY = "dc_attr";

/** Google's click-conversion window. A click older than this can't be uploaded anyway. */
const MAX_AGE_MS = 90 * 864e5;

/**
 * The ad click details captured when the visitor landed, for the booking record.
 *
 * `undefined` on organic traffic, so `JSON.stringify` drops the key entirely rather than
 * posting an empty object the backend would have to special-case.
 */
export function getAttribution(): Record<string, string> | undefined {
  let stored: Record<string, string> = {};
  try {
    stored = JSON.parse(localStorage.getItem(KEY) || "{}");
  } catch {
    // Private mode, or a corrupt value. Fall through to the cookie.
  }

  // Attributing a booking to a year-old click is worse than attributing it to nothing.
  if (stored.clicked_at && Date.now() - Date.parse(stored.clicked_at) > MAX_AGE_MS) stored = {};

  // ponytail: gtag keeps `_gcl_aw=GCL.<ts>.<gclid>` for 90 days on its own, so this is a free
  // fallback — and for the first 90 days it recovers clicks from before capture shipped.
  const gclid = stored.gclid ?? document.cookie.match(/(?:^|;\s*)_gcl_aw=GCL\.\d+\.([^;]+)/)?.[1];

  const out = { ...stored, ...(gclid ? { gclid } : {}) };
  return Object.keys(out).length > 0 ? out : undefined;
}
