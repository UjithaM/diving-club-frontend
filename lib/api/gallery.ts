import { apiList } from "./client";
import type { GalleryImage } from "@/lib/types";

export async function getGalleryImages(category?: string): Promise<GalleryImage[]> {
  const qs = category ? `?category=${encodeURIComponent(category)}` : "";
  return apiList<GalleryImage>(`/gallery${qs}`, ["gallery"]);
}
