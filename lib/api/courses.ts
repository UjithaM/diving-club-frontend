import { apiFetch, apiList } from "./client";
import type { Course } from "@/lib/types";

export async function getCourses(): Promise<Course[]> {
  return apiList<Course>("/courses", ["courses"]);
}

export async function getCourseBySlug(slug: string): Promise<Course | undefined> {
  try {
    const json = await apiFetch<{ data: Course }>(`/courses/${slug}`, ["courses", `course:${slug}`]);
    return json.data;
  } catch {
    return undefined;
  }
}
