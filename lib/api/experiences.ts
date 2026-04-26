import type { Experience } from "@/lib/types";
import { experiences } from "@/lib/data/experiences";

export async function getExperiences(): Promise<Experience[]> {
  return experiences;
}

export async function getExperienceBySlug(slug: string): Promise<Experience | undefined> {
  return experiences.find((e) => e.slug === slug);
}
