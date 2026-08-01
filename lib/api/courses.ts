import { apiItem, apiList } from "./client";
import type { Course } from "@/lib/types";

export async function getCourses(): Promise<Course[]> {
  return apiList<Course>("/courses", ["courses"]);
}

export async function getCourseBySlug(slug: string): Promise<Course | undefined> {
  return apiItem<Course>(`/courses/${slug}`, ["courses", `course:${slug}`]);
}
