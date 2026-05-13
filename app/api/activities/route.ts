import { NextResponse } from "next/server";
import { getExperiences } from "@/lib/api/experiences";

export async function GET() {
  const experiences = await getExperiences();
  return NextResponse.json({ data: experiences });
}
