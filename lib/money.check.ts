// node --experimental-strip-types lib/money.check.ts
import assert from "node:assert";
import { currencySymbol, money } from "./money.ts";

assert.strictEqual(money(395, "USD"), "$395");
assert.strictEqual(money(350, "EUR"), "€350");
assert.strictEqual(money(12.5, "EUR"), "€12.50");
assert.strictEqual(currencySymbol("EUR"), "€");
assert.strictEqual(money(10, "EURO"), "EURO 10", "a bad code must not crash the page");
console.log("money ok");
