import { apiFetch } from "./client";
import type { HomeData } from "@/lib/types";

// Not wrapped in { data: … }, so apiFetch rather than apiList.
// Tagged with the content tags so /api/revalidate already busts this too.
export async function getHome(): Promise<HomeData> {
  return apiFetch<HomeData>("/home", ["home", "courses", "activities", "dive-sites"]);
}
