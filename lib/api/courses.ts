import { apiItem, apiList } from "./client";
import type { Course } from "@/lib/types";

const LEVELS: Course["level"][] = ["beginner", "advanced", "specialty", "professional"];

/**
 * `Course["level"]` is asserted by apiList, never validated, so the API is free to send
 * null — or a level added in admin that has no styling here. Every page then does
 * `levelMeta[course.level].accent` on undefined and the whole build fails to prerender,
 * because one row in the CMS had a blank dropdown.
 *
 * Falling back to "specialty" — PADI's own catch-all for anything off the core cert path,
 * which is what an unlabelled item usually is. Both course pages read through here, so
 * this is the one place that has to hold.
 */
function withLevel(course: Course): Course {
  return LEVELS.includes(course.level) ? course : { ...course, level: "specialty" };
}

export async function getCourses(): Promise<Course[]> {
  return (await apiList<Course>("/courses", ["courses"])).map(withLevel);
}

export async function getCourseBySlug(slug: string): Promise<Course | undefined> {
  const course = await apiItem<Course>(`/courses/${slug}`, ["courses", `course:${slug}`]);
  return course && withLevel(course);
}
