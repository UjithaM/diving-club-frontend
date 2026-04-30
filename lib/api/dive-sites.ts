import type { DiveSite } from "@/lib/types";
import { diveSites } from "@/lib/data/dive-sites";

export async function getDiveSites(): Promise<DiveSite[]> {
  return diveSites;
}

export async function getDiveSiteBySlug(slug: string): Promise<DiveSite | undefined> {
  return diveSites.find((d) => d.slug === slug);
}
