/**
 * Field rules for the ad booking form, kept separate so blur and submit run the exact
 * same checks — the usual bug is a field that passes on blur and fails on submit.
 *
 * The email pattern is copied verbatim from app/api/booking/route.ts. If the two ever
 * drift, a visitor passes client validation and then eats a 400 for no visible reason.
 */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type BookingField = "item" | "name" | "email" | "phone" | "date";

/** Local YYYY-MM-DD. Not toISOString(), which shifts the day either side of UTC. */
export function todayISO(now = new Date()): string {
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(
    now.getDate()
  ).padStart(2, "0")}`;
}

/** Returns an error message, or "" when the value is fine. */
export function validateField(field: BookingField, value: string, today = todayISO()): string {
  const v = value.trim();

  switch (field) {
    case "item":
      return v ? "" : "Pick what you'd like to book.";

    case "name":
      return v.length >= 2 ? "" : "Please tell us your name.";

    case "email":
      if (!v) return "We need an email to send your confirmation to.";
      return EMAIL_RE.test(v) ? "" : "That email address doesn't look right.";

    case "phone":
      // Presence only — the caller layers on isValidPhoneNumber, which needs the
      // country context the phone input holds.
      return v ? "" : "We need a number to reach you on.";

    case "date":
      // Optional: plenty of people enquire before they've fixed their dates.
      if (!v) return "";
      // input[type=date] gives YYYY-MM-DD, so string compare beats Date parsing here.
      return v < today ? "Please pick today or a later date." : "";
  }
}

/** Maps the backend's `fields` object onto our field names. */
export function fieldErrorsFromApi(fields: Record<string, string>): Partial<Record<BookingField, string>> {
  const out: Partial<Record<BookingField, string>> = {};
  for (const [key, message] of Object.entries(fields ?? {})) {
    // country_code and phone are one input as far as the visitor is concerned.
    const field = key === "country_code" ? "phone" : key;
    if (field === "item" || field === "name" || field === "email" || field === "phone" || field === "date") {
      out[field] ??= message;
    }
  }
  return out;
}
