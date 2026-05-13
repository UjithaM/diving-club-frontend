import { apiList } from "./client";
import type { ApiFaq } from "@/lib/types";

export async function getFaqs(category?: string): Promise<ApiFaq[]> {
  const qs = category ? `?category=${encodeURIComponent(category)}` : "";
  return apiList<ApiFaq>(`/faqs${qs}`, ["faqs"]);
}
