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
  return json.data;
}
