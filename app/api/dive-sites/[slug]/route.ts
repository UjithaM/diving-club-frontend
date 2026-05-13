import { NextResponse } from "next/server";
import { getDiveSiteBySlug } from "@/lib/api/dive-sites";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const site = await getDiveSiteBySlug(slug);
  if (!site) {
    return NextResponse.json({ error: "Dive site not found", slug }, { status: 404 });
  }
  return NextResponse.json({ data: site });
}
