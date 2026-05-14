import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { getBlogPosts, getBlogPostBySlug } from "@/lib/data/blog-posts";

export async function generateStaticParams() {
  return getBlogPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return {};

  const description = post.excerpt.slice(0, 155).trimEnd();

  return {
    title: post.title,
    description,
    alternates: { canonical: `https://divingclub.lk/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description,
      url: `https://divingclub.lk/blog/${post.slug}`,
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author],
    },
  };
}

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

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  const accent = categoryColors[post.category] ?? "#2A9D8F";
  const allPosts = getBlogPosts();
  const relatedBySlug = post.relatedPosts
    .map((s) => allPosts.find((p) => p.slug === s))
    .filter(Boolean)
    .slice(0, 3);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    url: `https://divingclub.lk/blog/${post.slug}`,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: {
      "@type": "Person",
      name: post.author,
      jobTitle: post.authorTitle,
      worksFor: {
        "@type": "Organization",
        name: "Diving Club",
        url: "https://divingclub.lk",
      },
    },
    publisher: {
      "@type": "Organization",
      name: "Diving Club",
      url: "https://divingclub.lk",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://divingclub.lk/blog/${post.slug}`,
    },
    keywords: post.primaryKeyword,
  };

  const faqJsonLd =
    post.faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: post.faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: { "@type": "Answer", text: faq.answer },
          })),
        }
      : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}

      {/* Hero */}
      <section className="bg-charcoal-sea py-16 lg:py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <nav className="flex items-center gap-2 text-warm-white/35 text-xs mb-8">
            <Link href="/" className="hover:text-warm-white/60 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-warm-white/60 transition-colors">Blog</Link>
            <span>/</span>
            <span className="text-warm-white/60 truncate max-w-[200px]">{post.title}</span>
          </nav>

          <div className="flex items-center gap-3 mb-5">
            <span
              className="inline-block text-[10px] font-bold px-3 py-1 rounded-full text-white uppercase tracking-widest"
              style={{ background: accent }}
            >
              {categoryLabels[post.category] ?? post.category}
            </span>
            <span className="text-warm-white/35 text-xs">{post.readingTime} read</span>
          </div>

          <h1 className="text-warm-white font-display text-[clamp(1.75rem,4.5vw,3rem)] font-extrabold leading-tight mb-5">
            {post.title}
          </h1>

          <p className="text-warm-white/55 text-base leading-relaxed mb-8 max-w-2xl">
            {post.excerpt}
          </p>

          <div className="flex items-center gap-3 text-warm-white/40 text-xs">
            <span>{post.author}</span>
            <span>·</span>
            <time dateTime={post.publishedAt}>
              {new Date(post.publishedAt).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </time>
          </div>
        </div>
      </section>

      {/* Article body */}
      <section className="bg-warm-white py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <article>
            {post.body.map((paragraph, i) => {
              const rendered = paragraph.replace(
                /\*\*(.+?)\*\*/g,
                "<strong>$1</strong>"
              );
              return (
                <p
                  key={i}
                  className="text-charcoal-sea/80 leading-relaxed mb-6 text-[1.0625rem]"
                  dangerouslySetInnerHTML={{ __html: rendered }}
                />
              );
            })}
          </article>
        </div>
      </section>

      {/* FAQ */}
      {post.faqs.length > 0 && (
        <section className="bg-charcoal-sea/5 py-16 px-6">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <span className="h-px w-6" style={{ background: accent }} aria-hidden="true" />
              <span
                className="text-[11px] font-semibold tracking-[0.22em] uppercase"
                style={{ color: accent }}
              >
                Common questions
              </span>
            </div>
            <h2 className="text-charcoal-sea font-display text-2xl font-extrabold mb-8">
              Frequently asked questions
            </h2>
            <dl className="space-y-6">
              {post.faqs.map((faq, i) => (
                <div key={i} className="border-b border-charcoal-sea/10 pb-6 last:border-0 last:pb-0">
                  <dt className="text-charcoal-sea font-bold mb-2 text-[1rem]">{faq.question}</dt>
                  <dd className="text-charcoal-sea/65 leading-relaxed text-sm">{faq.answer}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      )}

      {/* Related posts */}
      {relatedBySlug.length > 0 && (
        <section className="bg-warm-white py-16 px-6 border-t border-charcoal-sea/8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-charcoal-sea font-display text-xl font-extrabold mb-8">
              You might also like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {relatedBySlug.map((rp) =>
                rp ? (
                  <Link
                    key={rp.slug}
                    href={`/blog/${rp.slug}`}
                    className="group block bg-charcoal-sea/4 hover:bg-charcoal-sea/8 rounded-2xl p-5 transition-colors"
                  >
                    <span
                      className="inline-block text-[9px] font-bold px-2 py-0.5 rounded-full text-white uppercase tracking-widest mb-3"
                      style={{ background: categoryColors[rp.category] ?? "#2A9D8F" }}
                    >
                      {categoryLabels[rp.category] ?? rp.category}
                    </span>
                    <p className="text-charcoal-sea font-bold text-sm leading-snug group-hover:text-shallow-water transition-colors">
                      {rp.title}
                    </p>
                  </Link>
                ) : null
              )}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="bg-charcoal-sea py-20 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-12 h-px bg-tropic-coral mx-auto mb-8" />
          <span className="block text-[11px] uppercase tracking-[0.25em] font-semibold text-tropic-coral/70 mb-4">
            Ready to dive?
          </span>
          <h2 className="text-warm-white font-display text-[clamp(2rem,5vw,3.5rem)] font-extrabold leading-tight mb-5">
            Come and see it for yourself
          </h2>
          <p className="text-warm-white/50 text-base leading-relaxed max-w-lg mx-auto mb-10">
            We&apos;re at Sandy Cove, Trincomalee, from May to October. Call us or send a message and we&apos;ll sort the rest.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="tel:0743945010"
              className="inline-flex items-center gap-2.5 bg-tropic-coral text-white font-bold px-8 py-3.5 rounded-full hover:bg-[#d4603f] transition-colors text-sm"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              0743 945 010
            </a>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-warm-white/50 font-semibold text-sm hover:text-warm-white transition-colors"
            >
              ← Back to blog
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
