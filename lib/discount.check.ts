// node --experimental-strip-types lib/discount.check.ts
import assert from "node:assert";
import { cartSubtotal, depositRuleLabel, headcount, previewDiscount, subtotal } from "./discount.ts";

// "7+" is a real option in the booking form's people select.
assert.strictEqual(headcount("7+"), 7);
assert.strictEqual(headcount("3"), 3);
assert.strictEqual(headcount(2), 2);
assert.strictEqual(headcount(""), 1, "empty falls back to one person");
assert.strictEqual(headcount("abc"), 1);
assert.strictEqual(headcount("0"), 1);
assert.strictEqual(headcount("-4"), 1);

assert.strictEqual(subtotal(350, "2"), 700);
assert.strictEqual(subtotal(40, "7+"), 280);
assert.strictEqual(subtotal(79.9, "3"), 239.7, "no floating-point dust");

// A cart shares one headcount across every line.
assert.strictEqual(
  cartSubtotal([{ price: 350, quantity: 1 }, { price: 40, quantity: 3 }], "2"),
  940,
  "2 × (350 + 40×3)"
);
assert.strictEqual(cartSubtotal([], "2"), 0, "empty cart costs nothing");
assert.strictEqual(cartSubtotal([{ quantity: 1 }], "2"), 0, "an item with no price yet is free");
assert.strictEqual(cartSubtotal([{ price: 79.9, quantity: 1 }], "3"), 239.7, "no floating-point dust");

// Percentage is straightforward.
assert.strictEqual(previewDiscount(790, "percentage", 10), 79);
assert.strictEqual(previewDiscount(711, "percentage", 20), 142.2);

// THE ONE THAT MATTERS: a fixed discount comes off the whole total, NOT per person.
// (A fixed *deposit* is per person — opposite rule, same word.)
assert.strictEqual(previewDiscount(700, "fixed", 10), 10, "flat off the total, not ×people");

// Clamped: a discount larger than the booking never produces a negative total.
assert.strictEqual(previewDiscount(300, "fixed", 500), 300);
assert.strictEqual(previewDiscount(300, "percentage", 150), 300);

// Degenerate inputs stay at zero rather than throwing.
assert.strictEqual(previewDiscount(0, "fixed", 50), 0);
assert.strictEqual(previewDiscount(100, "fixed", 0), 0);
assert.strictEqual(previewDiscount(100, "percentage", -5), 0);

// Deposit is described, never calculated.
assert.strictEqual(
  depositRuleLabel({ enabled: true, type: "percentage", value: 10 }),
  "10% to reserve"
);
assert.strictEqual(
  depositRuleLabel({ enabled: true, type: "fixed", value: 50 }, "USD"),
  "USD 50.00 per person to reserve"
);
assert.strictEqual(depositRuleLabel({ enabled: false, type: "percentage", value: 10 }), null);
assert.strictEqual(depositRuleLabel(undefined), null);

console.log("ok");
