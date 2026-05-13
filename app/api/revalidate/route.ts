import { NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";

// POST https://divingclub.lk/api/revalidate
// Body: { "secret": "...", "type": "course", "slug": "open-water-diver" }
//
// type values: "course" | "activity" | "dive-site" | "gallery" | "faq" | "promotion" | "all"
// slug is optional — omit to revalidate the entire list page for that type

export async function POST(req: Request) {
  const secret = process.env.REVALIDATE_SECRET;
  if (!secret) {
    return NextResponse.json({ error: "Revalidation not configured" }, { status: 500 });
  }

  let body: { secret?: string; type?: string; slug?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (body.secret !== secret) {
    return NextResponse.json({ error: "Invalid secret" }, { status: 401 });
  }

  const { type, slug } = body;

  const revalidated: string[] = [];

  function tag(t: string) {
    revalidateTag(t, "default");
    revalidated.push(`tag:${t}`);
  }

  function path(p: string) {
    revalidatePath(p);
    revalidated.push(`path:${p}`);
  }

  switch (type) {
    case "course":
      tag("courses");
      path("/courses");
      if (slug) path(`/courses/${slug}`);
      break;

    case "activity":
      tag("activities");
      path("/activities");
      if (slug) path(`/activities/${slug}`);
      break;

    case "dive-site":
      tag("dive-sites");
      path("/dive-sites");
      if (slug) path(`/dive-sites/${slug}`);
      break;

    case "gallery":
      tag("gallery");
      path("/gallery");
      break;

    case "faq":
      tag("faqs");
      path("/faq");
      break;

    case "promotion":
      // Promotions appear on the home page
      tag("promotions");
      path("/");
      break;

    case "all":
      ["courses", "activities", "dive-sites", "gallery", "faqs", "promotions"].forEach(tag);
      ["/", "/courses", "/activities", "/dive-sites", "/gallery", "/faq"].forEach(path);
      break;

    default:
      return NextResponse.json(
        { error: "Unknown type. Use: course | activity | dive-site | gallery | faq | promotion | all" },
        { status: 400 }
      );
  }

  // Also revalidate the sitemap whenever content changes
  path("/sitemap.xml");

  return NextResponse.json({ revalidated, now: Date.now() });
}
