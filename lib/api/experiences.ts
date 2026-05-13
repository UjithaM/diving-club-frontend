import { apiFetch, apiList } from "./client";
import type { Experience } from "@/lib/types";

export async function getExperiences(): Promise<Experience[]> {
  return apiList<Experience>("/activities", ["activities"]);
}

export async function getExperienceBySlug(slug: string): Promise<Experience | undefined> {
  try {
    const json = await apiFetch<{ data: Experience }>(`/activities/${slug}`, ["activities", `activity:${slug}`]);
    return json.data;
  } catch {
    return undefined;
  }
}
