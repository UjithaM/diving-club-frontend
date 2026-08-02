// node --experimental-strip-types lib/attribution.check.ts
import assert from "node:assert";
import { getAttribution } from "./attribution.ts";

/** Stand in for the two browser globals getAttribution reads. */
function browser(stored: string | null, cookie = "") {
  (globalThis as Record<string, unknown>).localStorage = { getItem: () => stored };
  (globalThis as Record<string, unknown>).document = { cookie };
}

const fresh = JSON.stringify({
  gclid: "CjwKCAj",
  utm_campaign: "trinco-diving",
  clicked_at: new Date().toISOString(),
});

browser(null);
assert.strictEqual(getAttribution(), undefined, "organic traffic sends nothing");

browser(fresh);
assert.strictEqual(getAttribution()?.gclid, "CjwKCAj");
assert.strictEqual(getAttribution()?.utm_campaign, "trinco-diving");

// Expiry drops the whole record, not just the gclid — a 6-month-old campaign name is a lie too.
browser(JSON.stringify({ gclid: "old", utm_campaign: "last-season", clicked_at: "2020-01-01T00:00:00.000Z" }));
assert.strictEqual(getAttribution(), undefined, "past the 90-day window it's all discarded");

// The cookie is a fallback, never an override.
browser(fresh, "_ga=1; _gcl_aw=GCL.1754000000.COOKIEVAL; other=x");
assert.strictEqual(getAttribution()?.gclid, "CjwKCAj", "storage wins over the cookie");

browser(null, "_ga=1; _gcl_aw=GCL.1754000000.COOKIEVAL; other=x");
assert.deepStrictEqual(getAttribution(), { gclid: "COOKIEVAL" }, "cookie recovers a pre-capture click");

browser("{not json", "_gcl_aw=GCL.1754000000.COOKIEVAL");
assert.deepStrictEqual(getAttribution(), { gclid: "COOKIEVAL" }, "a corrupt record still yields the cookie");

browser(null, "_gclid=notours; foo=_gcl_aw=fake");
assert.strictEqual(getAttribution(), undefined, "only a real _gcl_aw counts");

console.log("ok");
