// node --experimental-strip-types lib/country-search.check.ts
import assert from "node:assert";
import { matchesCountry } from "./country-search.ts";

const lk = (q: string) => matchesCountry("Sri Lanka", "LK", "94", q);
const de = (q: string) => matchesCountry("Germany", "DE", "49", q);
const gb = (q: string) => matchesCountry("United Kingdom", "GB", "44", q);

// The four things someone might type for their own country.
assert.ok(lk("sri"), "by name");
assert.ok(lk("Sri Lanka"), "full name, original case");
assert.ok(lk("lk"), "by ISO code");
assert.ok(lk("94"), "by dial code");
assert.ok(lk("+94"), "dial code with the plus they see in the field");

assert.ok(gb("kingdom"), "name matches mid-string");
assert.ok(gb("united"), "name matches from the start");

// Accents must not be a barrier — nobody types the cedilla.
assert.ok(matchesCountry("Curaçao", "CW", "599", "curacao"));
assert.ok(matchesCountry("Åland Islands", "AX", "358", "aland"));

// Empty query shows everything, which is what an untouched search box should do.
assert.ok(lk(""));
assert.ok(lk("   "));

// Codes match by prefix, so the list narrows as you type: "4" still shows every +4x
// country, "49" lands on Germany.
assert.ok(de("4"), "mid-typing a dial code keeps the country in view");
assert.ok(de("49"));
assert.ok(gb("44"));

// But a prefix only — substring matching on codes would drag in half the list.
assert.ok(!de("9"), "9 is inside 49 but isn't its prefix");
assert.ok(!matchesCountry("Japan", "JP", "81", "1"), "1 is inside 81 but isn't its prefix");

// ISO codes likewise match from the start.
assert.ok(de("de"));
assert.ok(!de("x"), "a letter in neither the name nor the code matches nothing");

assert.ok(!lk("germany"), "no false positives across countries");
assert.ok(!de("44"), "Germany must not answer the UK's dial code");

console.log("ok");
