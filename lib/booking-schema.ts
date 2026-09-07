/**
 * The one definition of what a valid booking looks like.
 *
 * Plain predicates, no validation library. The rules are five small string checks; a schema
 * library to express them cost ~18-20 KB gzipped on landing pages we pay per click for, and
 * fixed none of the bugs it was brought in for — the focus behaviour comes from
 * react-hook-form, which stays. Each returns "" when the value is fine, or the message to
 * show, which is exactly the shape react-hook-form's `validate` option wants and exactly what
 * the API route puts in its `fields` map.
 *
 * The email pattern used to live in three places and the copies had drifted: one form required
 * a date the other treated as optional, and computed "tomorrow" with toISOString(), which
 * lands on the wrong day for every visitor east of Greenwich. Both the browser and
 * app/api/booking/route.ts call these same functions now, so a visitor can't pass client
 * validation and then eat a 400 they can't act on.
 *
 * Deliberately free of `react-phone-number-input`: the API route imports this module, and
 * dragging libphonenumber's metadata into a serverless route to re-check a number the browser
 * already checked isn't worth the cold start. The country-aware phone check is layered on in
 * the browser by BookingFields.
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Local YYYY-MM-DD. Not toISOString(), which shifts the day either side of UTC. */
export function todayISO(now = new Date()): string {
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(
    now.getDate()
  ).padStart(2, "0")}`;
}

/** Every rule takes an unknown so a missing key reads as a friendly message, not a crash. */
const text = (v: unknown) => (typeof v === "string" ? v.trim() : "");

export const nameError = (v: unknown) =>
  text(v).length >= 2 ? "" : "Please tell us your name.";

export const emailError = (v: unknown) => {
  const s = text(v);
  if (!s) return "We need an email to send your confirmation to.";
  return EMAIL_RE.test(s) ? "" : "That email address doesn't look right.";
};

export const itemError = (v: unknown) =>
  text(v) ? "" : "Pick what you'd like to book.";

/** Presence only. BookingFields layers on isValidPhoneNumber, which needs country context. */
export const phoneError = (v: unknown) =>
  text(v) ? "" : "We need a number to reach you on.";

/**
 * Optional on purpose — plenty of people enquire before they've fixed their dates, and a
 * required date was one more wall between an ad click and a lead. input[type=date] gives
 * YYYY-MM-DD, so a string compare beats parsing.
 */
export const dateError = (v: unknown, today = todayISO()) => {
  const s = text(v);
  if (!s) return "";
  return s < today ? "Please pick today or a later date." : "";
};

export type BookingField =
  | "item"
  | "quantity"
  | "name"
  | "email"
  | "phone"
  | "date"
  | "slot_id";

// snake_case for slot_id, unlike the rest of the form, because fieldErrorsFromApi matches on
// the backend's own key — `items.0.slot_id` has to land on the picker without a translation
// table in between.
const FIELDS: BookingField[] = [
  "item",
  "quantity",
  "name",
  "email",
  "phone",
  "date",
  "slot_id",
];

interface BookingPayload {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  country_code?: unknown;
  date?: unknown;
  items?: unknown;
  discount_code?: unknown;
}

/**
 * What POST /api/booking accepts before forwarding to Laravel, as a flat
 * `{ field: message }` map — empty when the payload is fine.
 *
 * Validation only: the route still forwards the original body, because the backend also reads
 * `people`, `notes` and `attribution`.
 */
export function validateBookingPayload(body: BookingPayload): Record<string, string> {
  const fields: Record<string, string> = {};
  const set = (key: string, message: string) => {
    if (message) fields[key] = message;
  };

  set("name", nameError(body.name));
  set("email", emailError(body.email));
  set("phone", phoneError(body.phone));
  // The visitor sees one phone input, so this message has to make sense on that input —
  // fieldErrorsFromApi maps country_code onto it.
  set("country_code", phoneError(body.country_code));
  set("date", dateError(body.date));

  const items = body.items;
  if (!Array.isArray(items) || items.length === 0) {
    set("items", "Please add at least one thing to your booking.");
  } else {
    // The backend owns the catalogue, the per-item caps and the one-currency rule; this only
    // catches a line that could never resolve.
    items.forEach((line, i) => {
      const row = (line ?? {}) as { item?: unknown; bookingFor?: unknown };
      set(`items.${i}.item`, itemError(row.item));
      if (row.bookingFor !== "course" && row.bookingFor !== "activity") {
        set(`items.${i}.bookingFor`, "Required");
      }
    });
  }

  // Validity is the backend's call — it owns redemption state, expiry and the item lock, and
  // deliberately hard-errors rather than silently charging full price.
  if (typeof body.discount_code === "string" && body.discount_code.length > 16) {
    set("discount_code", "This discount code is not valid.");
  }

  return fields;
}

/**
 * Maps the backend's `fields` object onto our field names.
 *
 * The booking payload is an `items` array, so rejections come back keyed `items.0.item`,
 * `items.0.quantity`, or a bare `items` for whole-cart complaints (mixed currencies).
 * The forms show one line at a time, so the index is dropped and the message lands on the
 * single input.
 */
export function fieldErrorsFromApi(
  fields: Record<string, string>
): Partial<Record<BookingField, string>> {
  const out: Partial<Record<BookingField, string>> = {};
  for (const [key, message] of Object.entries(fields ?? {})) {
    const field =
      // country_code and phone are one input as far as the visitor is concerned.
      key === "country_code" ? "phone"
      : key === "items" ? "item"
      : key.replace(/^items\.\d+\./, "");
    if ((FIELDS as string[]).includes(field)) {
      out[field as BookingField] ??= message;
    }
  }
  return out;
}
