import type { Metadata } from "next";
import Link from "next/link";
import { getBlogPosts } from "@/lib/data/blog-posts";

export const metadata: Metadata = {
  title: "Diving Blog: Tips, Stories & Guides from Trincomalee",
  description:
    "Honest diving guides, species spotlights, gear reviews, and stories from the water, written by the team at Diving Club, Sandy Cove, Trincomalee.",
  alternates: { canonical: "https://divingclub.lk/blog" },
  openGraph: {
    title: "Diving Club Blog | Trincomalee, Sri Lanka",
    description:
      "Dive guides, marine life spotlights, and trip stories from one of Sri Lanka's best dive centres. No fluff, no stock photos.",
    url: "https://divingclub.lk/blog",
  },
};

const blogIndexJsonLd = {
  "@context": "https://schema.org",
  "@type": "Blog",
  name: "Diving Club Blog",
  description: "Diving guides, marine life spotlights, and trip stories from Trincomalee, Sri Lanka.",
  url: "https://divingclub.lk/blog",
  publisher: {
    "@type": "Organization",
    name: "Diving Club",
    url: "https://divingclub.lk",
  },
};

const categoryLabels: Record<string, string> = {
  "dive-sites": "Dive Sites",
  beginner: "Beginner Guide",
  "marine-life": "Marine Life",
  courses: "PADI Courses",
  planning: "Trip Planning",
  destination: "Destination",
};

const categoryColors: Record<string, string> = {
  "dive-sites": "#2A9D8F",
  beginner: "#E76F51",
  "marine-life": "#264653",
  courses: "#F4A261",
  planning: "#2A9D8F",
  destination: "#E76F51",
};

export default function BlogIndexPage() {
  const posts = getBlogPosts();
  const featured = posts.filter((p) => p.featured).slice(0, 1)[0];
  const rest = posts.filter((p) => !p.featured || p.slug !== featured?.slug);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogIndexJsonLd) }}
      />

      {/* Hero */}
      <section className="bg-charcoal-sea py-16 lg:py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <nav className="flex items-center gap-2 text-warm-white/35 text-xs mb-8">
            <Link href="/" className="hover:text-warm-white/60 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-warm-white/60">Blog</span>
          </nav>

          <div className="flex items-center gap-3 mb-5">
            <span className="h-px w-6 bg-tropic-coral" aria-hidden="true" />
            <span className="text-tropic-coral text-[11px] font-semibold tracking-[0.22em] uppercase">
              From the water
            </span>
          </div>

          <h1 className="text-warm-white font-display text-[clamp(2.5rem,6vw,5rem)] font-extrabold leading-tight mb-5">
            Blog
          </h1>
          <p className="text-warm-white/55 text-base leading-relaxed max-w-xl">
            Dive guides, species spotlights, gear notes, and stories from the season. Written by the instructors who actually live on these reefs.
          </p>
        </div>
      </section>

      {/* Featured post */}
      {featured && (
        <section className="bg-warm-white pt-16 pb-0 px-6">
          <div className="max-w-3xl mx-auto">
            <Link
              href={`/blog/${featured.slug}`}
              className="group block bg-charcoal-sea rounded-2xl overflow-hidden hover:ring-2 hover:ring-tropic-coral transition-all"
            >
              <div className="p-8 lg:p-10">
                <div className="flex items-center gap-3 mb-4">
                  <span
                    className="inline-block text-[10px] font-bold px-3 py-1 rounded-full text-white uppercase tracking-widest"
                    style={{ background: categoryColors[featured.category] ?? "#2A9D8F" }}
                  >
                    {categoryLabels[featured.category] ?? featured.category}
                  </span>
                  <span className="text-warm-white/35 text-xs">{featured.readingTime} read</span>
                </div>
                <h2 className="text-warm-white font-display text-[clamp(1.5rem,3vw,2.25rem)] font-extrabold leading-tight mb-4 group-hover:text-tropic-coral transition-colors">
                  {featured.title}
                </h2>
                <p className="text-warm-white/55 text-sm leading-relaxed max-w-2xl mb-6">
                  {featured.excerpt}
                </p>
                <span className="text-tropic-coral text-sm font-semibold">
                  Read the guide →
                </span>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* Post grid */}
      <section className="bg-warm-white py-16 px-6">
        <div className="max-w-3xl mx-auto">
          {rest.length > 0 && (
            <div className="space-y-5">
              {rest.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col sm:flex-row sm:items-start gap-4 p-5 rounded-2xl bg-charcoal-sea/4 hover:bg-charcoal-sea/8 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span
                        className="inline-block text-[9px] font-bold px-2 py-0.5 rounded-full text-white uppercase tracking-widest"
                        style={{ background: categoryColors[post.category] ?? "#2A9D8F" }}
                      >
                        {categoryLabels[post.category] ?? post.category}
                      </span>
                      <span className="text-charcoal-sea/35 text-xs">{post.readingTime} read</span>
                    </div>
                    <h2 className="text-charcoal-sea font-bold text-base leading-snug mb-1.5 group-hover:text-shallow-water transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-charcoal-sea/55 text-sm leading-relaxed line-clamp-2">
                      {post.excerpt}
                    </p>
                  </div>
                  <time
                    dateTime={post.publishedAt}
                    className="text-charcoal-sea/35 text-xs whitespace-nowrap sm:mt-1"
                  >
                    {new Date(post.publishedAt).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </time>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Dive-site CTA */}
      <section className="bg-charcoal-sea py-16 px-6">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-warm-white font-bold text-lg mb-1">Ready to see it in person?</p>
            <p className="text-warm-white/45 text-sm">Sandy Cove, Trincomalee. Open May to October.</p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <Link
              href="/activities/try-diving"
              className="inline-flex items-center gap-2 bg-tropic-coral text-white font-bold px-6 py-3 rounded-full hover:bg-[#d4603f] transition-colors text-sm"
            >
              Try diving →
            </Link>
            <Link
              href="/courses"
              className="inline-flex items-center gap-2 text-warm-white/50 font-semibold text-sm hover:text-warm-white transition-colors"
            >
              View PADI courses
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
