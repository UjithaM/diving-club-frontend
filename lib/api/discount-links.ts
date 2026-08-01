const BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000/api";

/** Tokens the admin panel generates: 10 uppercase alphanumerics. */
const TOKEN_RE = /^[A-Z0-9]{10}$/;

export type DiscountReason = "not_found" | "expired" | "redeemed";

export interface DiscountItem {
  type: "course" | "activity";
  slug: string;
  name: string;
}

/**
 * A discriminated union, because the backend answers an unusable link with HTTP **200**
 * and `valid: false` — not a 404. Treating that as an error would show a network failure
 * to someone whose only problem is that they already used their link.
 */
export type DiscountLink =
  | {
      valid: true;
      discount_type: "percentage" | "fixed";
      discount_value: number;
      label: string;
      expires_at: string | null;
      /** null = works on any booking. Set = ONLY that item; anything else is rejected. */
      item: DiscountItem | null;
    }
  | { valid: false; reason: DiscountReason };

/**
 * Looks up a discount token.
 *
 * Returns `null` only when we genuinely couldn't check (network, bad JSON, malformed
 * token). That's deliberately distinct from `{ valid: false }`, which is a real answer.
 *
 * Uncached on purpose: a link dies the moment it's redeemed, and `apiFetch` would cache
 * it for an hour and happily keep calling a spent link valid.
 */
export async function getDiscountLink(token: string): Promise<DiscountLink | null> {
  if (!TOKEN_RE.test(token)) return null;

  try {
    const res = await fetch(`${BASE}/discount-links/${token}`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (!res.ok) return null;

    const json = await res.json();
    if (json?.valid === true) return json as DiscountLink;
    if (json?.valid === false) {
      const reason: DiscountReason =
        json.reason === "expired" || json.reason === "redeemed" ? json.reason : "not_found";
      return { valid: false, reason };
    }
    return null;
  } catch {
    return null;
  }
}

/** Customer-facing wording. Never blames them, and never sounds like a site error. */
export function discountReasonMessage(reason: DiscountReason): string {
  switch (reason) {
    case "redeemed":
      return "This discount link has already been used. You can still book below at the normal price.";
    case "expired":
      return "This discount link has expired. You can still book below at the normal price.";
    case "not_found":
      return "We didn't recognise that discount link. You can still book below at the normal price.";
  }
}
