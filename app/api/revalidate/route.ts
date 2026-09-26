import { NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";

// POST https://divingclub.lk/api/revalidate
// Body: { "secret": "...", "type": "course", "slug": "open-water-diver" }
//
// type values: "course" | "activity" | "package" | "dive-site" | "gallery" | "faq" | "promotion" | "all"
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

  // The ad landing pages print prices straight from the courses API, so a price edit in
  // admin has to bust them too — otherwise the ad says one number and the page says another,
  // which is the thing Google's things-to-do policy actually penalises.
  const AD_LANDING_PAGES = ["/padi", "/dive", "/open-water", "/fun-dives"];

  switch (type) {
    // Promotions carry each covered item's name, price and visibility, so item edits bust them too.
    case "course":
      tag("courses");
      tag("promotions");
      path("/courses");
      if (slug) path(`/courses/${slug}`);
      AD_LANDING_PAGES.forEach(path);
      break;

    case "activity":
      tag("activities");
      tag("promotions");
      path("/activities");
      if (slug) path(`/activities/${slug}`);
      break;

    case "package":
      tag("packages");
      tag("promotions");
      path("/packages");
      if (slug) {
        tag(`package:${slug}`);
        path(`/packages/${slug}`);
      }
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
      // Promotions appear on the home page, and on item and ad pages through this tag
      tag("promotions");
      path("/");
      break;

    case "all":
      ["courses", "activities", "packages", "dive-sites", "gallery", "faqs", "promotions"].forEach(tag);
      ["/", "/courses", "/activities", "/packages", "/dive-sites", "/gallery", "/faq"].forEach(path);
      AD_LANDING_PAGES.forEach(path);
      break;

    default:
      return NextResponse.json(
        { error: "Unknown type. Use: course | activity | package | dive-site | gallery | faq | promotion | all" },
        { status: 400 }
      );
  }

  // Also revalidate the sitemap whenever content changes
  path("/sitemap.xml");

  return NextResponse.json({ revalidated, now: Date.now() });
}
