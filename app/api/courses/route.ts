import { NextResponse } from "next/server";
import { getCourses } from "@/lib/api/courses";

export async function GET() {
  const courses = await getCourses();
  return NextResponse.json({ data: courses });
}
