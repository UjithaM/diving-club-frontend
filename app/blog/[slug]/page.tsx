import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { getBlogPosts, getBlogPostBySlug } from "@/lib/data/blog-posts";
import type { Article, FAQPage, WithContext } from "schema-dts";
import { safeJsonLd } from "@/lib/jsonld";

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

  const articleJsonLd: WithContext<Article> = {
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

  const faqJsonLd: WithContext<FAQPage> | null =
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
        dangerouslySetInnerHTML={{ __html: safeJsonLd(articleJsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: safeJsonLd(faqJsonLd) }}
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
            We&apos;re at Sandy Cove, Trincomalee, from May to October. WhatsApp us or send a message and we&apos;ll sort the rest.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://wa.me/94743945010"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 bg-tropic-coral text-white font-bold px-8 py-3.5 rounded-full hover:bg-[#d4603f] transition-colors text-sm"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
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
