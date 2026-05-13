import type { MetadataRoute } from "next";
import { getCourses } from "@/lib/api/courses";
import { getExperiences } from "@/lib/api/experiences";
import { getDiveSites } from "@/lib/api/dive-sites";

const BASE = "https://divingclub.lk";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [courses, experiences, diveSites] = await Promise.all([
    getCourses(),
    getExperiences(),
    getDiveSites(),
  ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/courses`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/activities`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/dive-sites`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/scuba-diving-in-sri-lanka`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/scuba-diving-in-trincomalee`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.95 },
    { url: `${BASE}/faq`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/gallery`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE}/contact`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.6 },
    { url: `${BASE}/book`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.8 },
  ];

  const courseRoutes: MetadataRoute.Sitemap = courses.map((c) => ({
    url: `${BASE}/courses/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.85,
  }));

  const activityRoutes: MetadataRoute.Sitemap = experiences.map((e) => ({
    url: `${BASE}/activities/${e.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const diveSiteRoutes: MetadataRoute.Sitemap = diveSites.map((d) => ({
    url: `${BASE}/dive-sites/${d.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.85,
  }));

  return [...staticRoutes, ...courseRoutes, ...activityRoutes, ...diveSiteRoutes];
}
