// node --experimental-strip-types lib/booking-schema.check.ts
import assert from "node:assert";
import {
  dateError,
  emailError,
  fieldErrorsFromApi,
  itemError,
  nameError,
  phoneError,
  todayISO,
  validateBookingPayload,
} from "./booking-schema.ts";

const ok = (fn: (v: unknown) => string, v: unknown, why: string) =>
  assert.strictEqual(fn(v), "", `${why}: ${JSON.stringify(v)} should pass`);
const bad = (fn: (v: unknown) => string, v: unknown, why: string) =>
  assert.notStrictEqual(fn(v), "", `${why}: ${JSON.stringify(v)} should fail`);

/** Relative to the real today, so these never go stale or depend on the clock's timezone. */
const dayOffset = (n: number) => {
  const d = new Date();
  d.setDate(d.getDate() + n);
  return todayISO(d);
};

// ─── Date: optional, and today itself counts ─────────────────────────────────
ok(dateError, "", "date is optional");
ok(dateError, "   ", "whitespace is still empty");
ok(dateError, undefined, "a missing date is not an error");
ok(dateError, dayOffset(0), "today is bookable");
ok(dateError, dayOffset(30), "future dates are bookable");
bad(dateError, dayOffset(-1), "yesterday is not bookable");
// Explicit boundary, independent of the clock.
assert.strictEqual(dateError("2026-08-01", "2026-08-01"), "", "today itself is allowed");
assert.notStrictEqual(dateError("2026-07-31", "2026-08-01"), "", "yesterday is rejected");

// ─── Email ───────────────────────────────────────────────────────────────────
ok(emailError, "sam@example.com", "plain address");
ok(emailError, "  sam@example.co.uk  ", "trimmed before testing");
bad(emailError, "", "email is required");
bad(emailError, undefined, "a missing email is required");
bad(emailError, "sam@example", "no TLD");
bad(emailError, "sam example.com", "no @");
bad(emailError, "@example.com", "no local part");

// ─── Name ────────────────────────────────────────────────────────────────────
ok(nameError, "Al", "two characters is a name");
bad(nameError, "", "name is required");
bad(nameError, " ", "whitespace is not a name");
bad(nameError, "A", "one character isn't a name");
bad(nameError, undefined, "a missing name is required");

// ─── Item + phone ────────────────────────────────────────────────────────────
ok(itemError, "Open Water Diver", "a real item");
bad(itemError, "", "something has to be booked");
ok(phoneError, "+94743945010", "a number is present");
bad(phoneError, "", "phone is required");

// Non-strings must not throw — a hand-rolled payload can put anything here.
bad(nameError, 42, "a number is not a name");
bad(emailError, null, "null is not an email");
ok(dateError, {}, "a non-string date is treated as absent");

// todayISO must be local, not UTC — a UTC-shifted date rejects "today" for anyone east of
// Greenwich, which is every visitor booking from Sri Lanka.
assert.strictEqual(todayISO(new Date(2026, 0, 1, 2, 30)), "2026-01-01", "local date, not UTC");
assert.strictEqual(todayISO(new Date(2026, 11, 9)), "2026-12-09", "month and day are padded");

// ─── Payload: what the API route guards on ───────────────────────────────────
const valid = {
  name: "Sam Diver",
  email: "sam@example.com",
  phone: "743945010",
  country_code: "+94",
  date: dayOffset(3),
  items: [{ item: "Open Water Diver", bookingFor: "course" }],
};
assert.deepStrictEqual(validateBookingPayload(valid), {}, "a good booking passes");

// A blank date is fine — the ad form has always allowed enquiries with no fixed date.
assert.deepStrictEqual(validateBookingPayload({ ...valid, date: "" }), {}, "blank date accepted");
assert.deepStrictEqual(
  validateBookingPayload({ ...valid, date: undefined }),
  {},
  "missing date accepted"
);

// An empty cart is the one thing the route must never forward.
assert.deepStrictEqual(
  validateBookingPayload({ ...valid, items: [] }),
  { items: "Please add at least one thing to your booking." },
  "an empty cart is rejected"
);
assert.ok(validateBookingPayload({ ...valid, items: undefined }).items, "a missing cart is rejected");

// The email rule is shared, so the payload rejects exactly what the field rejects. This is
// the drift that used to let a visitor pass client validation and eat a 400.
assert.strictEqual(
  validateBookingPayload({ ...valid, email: "sam@example" }).email,
  emailError("sam@example"),
  "payload and field agree on emails"
);

// Line-level problems keep their index; fieldErrorsFromApi collapses it for the inputs.
assert.strictEqual(
  validateBookingPayload({ ...valid, items: [{ item: "", bookingFor: "course" }] })["items.0.item"],
  "Pick what you'd like to book."
);
assert.strictEqual(
  validateBookingPayload({ ...valid, items: [{ item: "Fun Dive", bookingFor: "nope" }] })[
    "items.0.bookingFor"
  ],
  "Required"
);

// An over-long discount code never reaches the backend.
assert.ok(
  validateBookingPayload({ ...valid, discount_code: "x".repeat(17) }).discount_code,
  "a 17-character code is rejected"
);
assert.deepStrictEqual(
  validateBookingPayload({ ...valid, discount_code: "x".repeat(16) }),
  {},
  "16 characters is still fine"
);

// A missing key must read as our copy, never a raw type error.
assert.deepStrictEqual(validateBookingPayload({}), {
  name: "Please tell us your name.",
  email: "We need an email to send your confirmation to.",
  phone: "We need a number to reach you on.",
  country_code: "We need a number to reach you on.",
  items: "Please add at least one thing to your booking.",
});

// ─── Backend rejections have to land on the right input ──────────────────────
assert.deepStrictEqual(
  fieldErrorsFromApi({ date: "The date field is required.", country_code: "Required" }),
  { date: "The date field is required.", phone: "Required" }
);
assert.deepStrictEqual(fieldErrorsFromApi({ people: "Required" }), {}, "unknown fields ignored");
assert.deepStrictEqual(fieldErrorsFromApi({}), {});

// The payload is an items[] array, so indexed keys have to reach the single form input.
assert.deepStrictEqual(
  fieldErrorsFromApi({ "items.0.item": "The selected item was not found." }),
  { item: "The selected item was not found." }
);
assert.deepStrictEqual(
  fieldErrorsFromApi({ "items.0.quantity": "You can book at most 4 of these at a time." }),
  { quantity: "You can book at most 4 of these at a time." }
);
// Whole-cart complaints (mixed currencies, missing array) show on the item select.
assert.deepStrictEqual(
  fieldErrorsFromApi({ items: "The items field is required." }),
  { item: "The items field is required." }
);
// First one wins, same as every other field.
assert.deepStrictEqual(
  fieldErrorsFromApi({ "items.0.item": "first", "items.1.item": "second" }),
  { item: "first" }
);
assert.deepStrictEqual(
  fieldErrorsFromApi({ "items.0.unitPrice": "nope" }),
  {},
  "unknown line fields ignored"
);

console.log("ok");
