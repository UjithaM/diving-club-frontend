const BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000/api";

export async function apiFetch<T>(path: string, tags: string[] = [], init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    next: { revalidate: 3600, tags },
    ...init,
  });
  if (!res.ok) throw new Error(`API ${res.status}: ${path}`);
  return res.json();
}

export async function apiList<T>(path: string, tags: string[] = []): Promise<T[]> {
  const json = await apiFetch<{ data: T[] }>(path, tags);
  return Array.isArray(json.data) ? json.data : [];
}

/**
 * One item by slug, or undefined.
 *
 * The backend answers an unknown slug with 200 `{"data": []}` rather than a 404, and an
 * empty array is truthy — it sailed through as a "course" and every `item.includes.map`
 * downstream resolved to Array.prototype.includes and threw at render. Anything that
 * isn't an object with a slug is not an item.
 */
export function isItem(data: unknown): boolean {
  return !!data && typeof data === "object" && !Array.isArray(data) && "slug" in data;
}

export async function apiItem<T>(path: string, tags: string[] = []): Promise<T | undefined> {
  try {
    const json = await apiFetch<{ data: T }>(path, tags);
    return isItem(json?.data) ? json.data : undefined;
  } catch {
    return undefined;
  }
}
