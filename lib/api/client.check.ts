// node --experimental-strip-types lib/api/client.check.ts
import assert from "node:assert";
import { isItem } from "./client.ts";

// The one that broke the build: an unknown slug answered 200 {"data": []}, and the
// empty array was truthy enough to render as a course until item.includes.map threw.
assert.strictEqual(isItem([]), false);
assert.strictEqual(isItem(undefined), false);
assert.strictEqual(isItem(null), false);
assert.strictEqual(isItem(""), false);
assert.strictEqual(isItem({}), false, "an object with no slug is not an item");
assert.strictEqual(isItem([{ slug: "open-water-diver" }]), false, "a list is not an item");

assert.strictEqual(isItem({ slug: "open-water-diver", price: 395 }), true);

console.log("ok");
