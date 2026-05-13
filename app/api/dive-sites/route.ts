import { NextResponse } from "next/server";
import { getDiveSites } from "@/lib/api/dive-sites";

export async function GET() {
  const diveSites = await getDiveSites();
  return NextResponse.json({ data: diveSites });
}
