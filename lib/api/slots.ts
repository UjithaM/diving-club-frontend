import type { Slot } from "@/lib/types";

const BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000/api";

/**
 * The times an item can be booked on a date, with what's left on each.
 *
 * Not apiFetch: that caches for an hour against a tag, and a seat count an hour old is worse
 * than no seat count — it invites a click that the backend then has to refuse.
 *
 * An empty array is the meaningful answer, not a failure: it means the shop hasn't set times
 * for this item, and the form falls back to booking by date alone, exactly as it did before
 * slots existed. Network errors return empty for the same reason — a booking form that can't
 * reach the slots endpoint should still take a lead.
 */
export async function getSlots(
  type: "course" | "activity",
  item: string,
  date: string
): Promise<Slot[]> {
  if (!item || !date) return [];

  const query = new URLSearchParams({ type, item, date });

  try {
    const res = await fetch(`${BASE}/slots?${query}`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (!res.ok) return [];
    const json = (await res.json()) as { data?: Slot[] };
    return Array.isArray(json.data) ? json.data : [];
  } catch {
    return [];
  }
}
