import type { Course } from "@/lib/types";
import { courses } from "@/lib/data/courses";

export async function getCourses(): Promise<Course[]> {
  return courses;
}

export async function getCourseBySlug(slug: string): Promise<Course | undefined> {
  return courses.find((c) => c.slug === slug);
}
