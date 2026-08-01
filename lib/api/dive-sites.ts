import { apiItem, apiList } from "./client";
import type { DiveSite } from "@/lib/types";

export async function getDiveSites(): Promise<DiveSite[]> {
  return apiList<DiveSite>("/dive-sites", ["dive-sites"]);
}

export async function getDiveSiteBySlug(slug: string): Promise<DiveSite | undefined> {
  return apiItem<DiveSite>(`/dive-sites/${slug}`, ["dive-sites", `dive-site:${slug}`]);
}
