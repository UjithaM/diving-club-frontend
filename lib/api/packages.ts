import { apiItem, apiList } from "./client";
import type { TravelPackage } from "@/lib/types";

export async function getPackages(): Promise<TravelPackage[]> {
  return apiList<TravelPackage>("/packages", ["packages"]);
}

export async function getPackageBySlug(slug: string): Promise<TravelPackage | undefined> {
  return apiItem<TravelPackage>(`/packages/${slug}`, ["packages", `package:${slug}`]);
}
