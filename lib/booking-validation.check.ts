// node --experimental-strip-types lib/booking-validation.check.ts
import assert from "node:assert";
import { fieldErrorsFromApi, todayISO, validateField } from "./booking-validation.ts";

const ok = (f: Parameters<typeof validateField>[0], v: string, today?: string) =>
  assert.strictEqual(validateField(f, v, today), "", `${f}="${v}" should pass`);
const bad = (f: Parameters<typeof validateField>[0], v: string, today?: string) =>
  assert.notStrictEqual(validateField(f, v, today), "", `${f}="${v}" should fail`);

// Date is optional — the whole point of the change.
ok("date", "");
ok("date", "   ");
ok("date", "2026-08-01", "2026-08-01"); // today itself is allowed
ok("date", "2026-12-25", "2026-08-01");
bad("date", "2026-07-31", "2026-08-01"); // yesterday

ok("email", "sam@example.com");
ok("email", "  sam@example.co.uk  "); // trimmed before testing
bad("email", "");
bad("email", "sam@example"); // no TLD
bad("email", "sam example.com");
bad("email", "@example.com");

ok("name", "Al");
bad("name", "");
bad("name", " ");
bad("name", "A"); // one character isn't a name

ok("item", "Open Water Diver");
bad("item", "");

ok("phone", "+94743945010");
bad("phone", "");

// todayISO must be local, not UTC — a UTC-shifted date rejects "today" for anyone
// east of Greenwich, which is every visitor booking from Sri Lanka.
const d = new Date(2026, 0, 1, 2, 30); // 1 Jan, local
assert.strictEqual(todayISO(d), "2026-01-01");
assert.strictEqual(todayISO(new Date(2026, 11, 9)), "2026-12-09", "month and day are padded");

// Backend rejections have to land on the right input.
assert.deepStrictEqual(
  fieldErrorsFromApi({ date: "The date field is required.", country_code: "Required" }),
  { date: "The date field is required.", phone: "Required" }
);
assert.deepStrictEqual(fieldErrorsFromApi({ people: "Required" }), {}, "unknown fields ignored");
assert.deepStrictEqual(fieldErrorsFromApi({}), {});

// The payload is an items[] array now — indexed keys have to reach the single ad-form input.
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
assert.deepStrictEqual(fieldErrorsFromApi({ "items.0.unitPrice": "nope" }), {}, "unknown line fields ignored");

console.log("ok");
