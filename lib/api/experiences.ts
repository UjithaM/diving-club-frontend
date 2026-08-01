import { apiItem, apiList } from "./client";
import type { Experience } from "@/lib/types";

export async function getExperiences(): Promise<Experience[]> {
  return apiList<Experience>("/activities", ["activities"]);
}

export async function getExperienceBySlug(slug: string): Promise<Experience | undefined> {
  return apiItem<Experience>(`/activities/${slug}`, ["activities", `activity:${slug}`]);
}
