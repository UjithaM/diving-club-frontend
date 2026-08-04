/**
 * Search matching for the country picker.
 *
 * Kept out of the component so it can be checked without a browser — see
 * country-search.check.ts.
 */

/** Lowercase, accent-stripped, so "curacao" finds "Curaçao" and "aland" finds "Åland". */
function fold(s: string): string {
  return s.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase().trim();
}

/**
 * True when the query matches the country's name, its two-letter code, or its dial code.
 *
 * People reach for whichever they know: "germany", "de", "+49", "49". A picker that only
 * matches the name sends anyone thinking in dial codes back to scrolling, which is the
 * thing this replaces.
 */
export function matchesCountry(
  label: string,
  iso: string,
  callingCode: string,
  query: string,
): boolean {
  const q = fold(query).replace(/^\+/, "");
  if (!q) return true;

  // Name matches anywhere: "kingdom" should find "United Kingdom".
  if (fold(label).includes(q)) return true;

  // Code matches from the start only. Substring here would make "in" match every country
  // whose dial code merely contains 1 — the noise buries the real answer.
  if (fold(iso).startsWith(q)) return true;
  return callingCode.startsWith(q);
}
