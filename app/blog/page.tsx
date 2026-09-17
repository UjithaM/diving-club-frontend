import type { Metadata } from "next";
import Link from "next/link";
import { getBlogPosts } from "@/lib/data/blog-posts";
import type { Blog, WithContext } from "schema-dts";
import PageHero from "@/components/ui/PageHero";
import Waterline from "@/components/illustrations/Waterline";
import CtaBand, { BandLink } from "@/components/ui/CtaBand";
import Button from "@/components/ui/Button";
import { toneClass, type Tone } from "@/components/ui/DetailHero";
import { Turtle } from "@/components/illustrations/Sea";
import { safeJsonLd } from "@/lib/jsonld";

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

const blogIndexJsonLd: WithContext<Blog> = {
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

const categoryTones: Record<string, Tone> = {
  "dive-sites": "shallow",
  beginner: "coral",
  "marine-life": "ink",
  courses: "sunrise",
  planning: "shallow",
  destination: "coral",
};

export default function BlogIndexPage() {
  const posts = getBlogPosts();
  const featured = posts.filter((p) => p.featured).slice(0, 1)[0];
  const rest = posts.filter((p) => !p.featured || p.slug !== featured?.slug);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(blogIndexJsonLd) }}
      />

      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Blog" }]}
        notes="From the water"
        title="Blog"
        lead="Dive guides, species spotlights, gear notes, and stories from the season. Written by the instructors who actually live on these reefs."
      />
      <Waterline from="surface" to="shallow" />

      {/* Featured post */}
      {featured && (
        <section className="zone-shallow pt-10 lg:pt-14 pb-0 px-5 sm:px-8">
          <div className="max-w-4xl mx-auto">
            <Link
              href={`/blog/${featured.slug}`}
              className="group zone-deep relative block overflow-hidden rounded-[18px] transition-[translate] duration-300 hover:-translate-y-1 reveal"
            >
              <Turtle className="bob absolute -right-6 bottom-4 hidden w-40 opacity-90 sm:block" />
              <div className="relative p-6 sm:p-8 lg:p-10 sm:pr-44">
                <div className="flex items-center gap-3 mb-4">
                  <span
                    className={`inline-block rounded-full px-3 py-1 text-label uppercase font-semibold ${toneClass[categoryTones[featured.category] ?? "shallow"]} ${categoryTones[featured.category] === "ink" ? "ring-1 ring-warm-white/40" : ""}`}
                  >
                    {categoryLabels[featured.category] ?? featured.category}
                  </span>
                  <span className="text-muted text-xs tabular">{featured.readingTime} read</span>
                </div>
                <h2 className="text-[clamp(1.625rem,3.4vw,2.5rem)] font-extrabold leading-[1.05] mb-4 group-hover:underline underline-offset-4 decoration-sunrise">
                  {featured.title}
                </h2>
                <p className="text-muted text-body max-w-2xl mb-6">
                  {featured.excerpt}
                </p>
                <span className="inline-flex min-h-11 items-center rounded-[10px] bg-action px-4 text-sm font-bold text-action-ink">
                  Read the guide →
                </span>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* Post grid */}
      <section className="zone-shallow py-8 lg:py-12 px-5 sm:px-8">
        <div className="max-w-4xl mx-auto">
          {rest.length > 0 && (
            <div className="grid gap-4 sm:grid-cols-2">
              {rest.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group reveal flex flex-col gap-3 p-5 sm:p-6 rounded-[18px] bg-warm-white text-charcoal-sea transition-[translate,background-color] duration-300 hover:-translate-y-1 hover:bg-white"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span
                        className={`inline-block rounded-full px-2.5 py-1 text-label uppercase font-semibold ${toneClass[categoryTones[post.category] ?? "shallow"]}`}
                      >
                        {categoryLabels[post.category] ?? post.category}
                      </span>
                      <span className="text-charcoal-sea/80 text-xs tabular">{post.readingTime} read</span>
                    </div>
                    <h2 className="text-sub font-extrabold leading-snug mb-1.5 group-hover:underline underline-offset-4">
                      {post.title}
                    </h2>
                    <p className="text-charcoal-sea/80 text-sm leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>
                  <time
                    dateTime={post.publishedAt}
                    className="text-charcoal-sea/80 text-xs whitespace-nowrap tabular mt-auto pt-3 border-t border-charcoal-sea/12"
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
      <CtaBand
        title="Ready to see it in person?"
        body={<p>Sandy Cove, Trincomalee. Open May to October.</p>}
      >
        <Button href="/activities/try-diving" size="lg">Try diving →</Button>
        <BandLink href="/courses">View PADI courses</BandLink>
      </CtaBand>
    </>
  );
}
