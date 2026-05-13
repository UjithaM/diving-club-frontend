import { NextResponse } from "next/server";
import { getCourseBySlug } from "@/lib/api/courses";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);
  if (!course) {
    return NextResponse.json({ error: "Course not found", slug }, { status: 404 });
  }
  return NextResponse.json({ data: course });
}
