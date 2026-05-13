import { apiList } from "./client";
import type { Promotion } from "@/lib/types";

export async function getActivePromotions(): Promise<Promotion[]> {
  return apiList<Promotion>("/promotions", ["promotions"]);
}
