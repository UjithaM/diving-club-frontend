import { apiFetch, apiList } from "./client";
import type { DiveSite } from "@/lib/types";

export async function getDiveSites(): Promise<DiveSite[]> {
  return apiList<DiveSite>("/dive-sites", ["dive-sites"]);
}

export async function getDiveSiteBySlug(slug: string): Promise<DiveSite | undefined> {
  try {
    const json = await apiFetch<{ data: DiveSite }>(`/dive-sites/${slug}`, ["dive-sites", `dive-site:${slug}`]);
    return json.data;
  } catch {
    return undefined;
  }
}
