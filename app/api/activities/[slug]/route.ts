import { NextResponse } from "next/server";
import { getExperienceBySlug } from "@/lib/api/experiences";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const activity = await getExperienceBySlug(slug);
  if (!activity) {
    return NextResponse.json({ error: "Activity not found", slug }, { status: 404 });
  }
  return NextResponse.json({ data: activity });
}
