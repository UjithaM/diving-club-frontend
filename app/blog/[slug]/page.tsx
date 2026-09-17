import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { getBlogPosts, getBlogPostBySlug } from "@/lib/data/blog-posts";
import type { Article, FAQPage, WithContext } from "schema-dts";
import PageHero from "@/components/ui/PageHero";
import CtaBand, { BandLink, WhatsAppButton } from "@/components/ui/CtaBand";
import { toneClass, type Tone } from "@/components/ui/DetailHero";
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

const categoryTones: Record<string, Tone> = {
  "dive-sites": "shallow",
  beginner: "coral",
  "marine-life": "ink",
  courses: "sunrise",
  planning: "shallow",
  destination: "coral",
};

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  const tone = categoryTones[post.category] ?? "shallow";
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

      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Blog", href: "/blog" }, { label: post.title }]}
        title={post.title}
        lead={post.excerpt}
        art="turtle"
      >
        <p className="mt-6 flex flex-wrap items-center gap-3 text-xs text-charcoal-sea/80">
          <span className={`rounded-full px-3 py-1 text-label uppercase font-semibold ${toneClass[tone]}`}>
            {categoryLabels[post.category] ?? post.category}
          </span>
          <span className="tabular">{post.readingTime} read</span>
          <span className="font-semibold text-charcoal-sea">{post.author}</span>
          <span>·</span>
          <time dateTime={post.publishedAt} className="tabular">
            {new Date(post.publishedAt).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </time>
        </p>
      </PageHero>

      {/* Article body */}
      <section className="zone-surface py-12 lg:py-20 px-5 sm:px-8 border-t-2 border-charcoal-sea/10">
        <div className="max-w-[68ch] mx-auto">
          <article>
            {post.body.map((paragraph, i) => {
              const rendered = paragraph.replace(
                /\*\*(.+?)\*\*/g,
                "<strong>$1</strong>"
              );
              return (
                <p
                  key={i}
                  className={`text-charcoal-sea/85 leading-[1.8] mb-6 text-[1.0625rem] lg:text-lg [&_strong]:text-charcoal-sea ${
                    i === 0
                      ? "first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:font-display first-letter:text-[4.25rem] first-letter:leading-[0.8] first-letter:font-extrabold first-letter:text-shallow-water"
                      : ""
                  }`}
                  dangerouslySetInnerHTML={{ __html: rendered }}
                />
              );
            })}
          </article>
        </div>
      </section>

      {/* FAQ */}
      {post.faqs.length > 0 && (
        <section className="zone-shallow py-12 lg:py-16 px-5 sm:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="flex justify-end border-t-2 border-current pt-3 mb-8">
              <span className="text-label uppercase font-semibold">Common questions</span>
            </div>
            <h2 className="text-section font-extrabold mb-8">
              Frequently asked questions
            </h2>
            <dl className="space-y-4">
              {post.faqs.map((faq, i) => (
                <div key={i} className="reveal rounded-[18px] bg-warm-white p-5 sm:p-6 text-charcoal-sea">
                  <dt className="font-bold mb-2 text-lg">{faq.question}</dt>
                  <dd className="text-charcoal-sea/85 text-body">{faq.answer}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      )}

      {/* Related posts */}
      {relatedBySlug.length > 0 && (
        <section className="zone-deep py-12 lg:py-16 px-5 sm:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-section font-extrabold mb-8">
              You might also like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {relatedBySlug.map((rp) =>
                rp ? (
                  <Link
                    key={rp.slug}
                    href={`/blog/${rp.slug}`}
                    className="group reveal block rounded-[18px] bg-warm-white/[0.06] p-5 ring-1 ring-warm-white/10 transition-[translate,background-color] hover:-translate-y-1 hover:bg-warm-white/[0.1]"
                  >
                    <span
                      className={`inline-block rounded-full px-2.5 py-1 text-label uppercase font-semibold mb-3 ${toneClass[categoryTones[rp.category] ?? "shallow"]}`}
                    >
                      {categoryLabels[rp.category] ?? rp.category}
                    </span>
                    <p className="font-bold leading-snug group-hover:underline underline-offset-4">
                      {rp.title}
                    </p>
                  </Link>
                ) : null
              )}
            </div>
          </div>
        </section>
      )}

      <CtaBand
        notes="Ready to dive?"
        title={<>Come and see it for yourself</>}
        body={<p>We&apos;re at Sandy Cove, Trincomalee, from May to October. WhatsApp us or send a message and we&apos;ll sort the rest.</p>}
      >
        <WhatsAppButton>0743 945 010</WhatsAppButton>
        <BandLink href="/blog">← Back to blog</BandLink>
      </CtaBand>
    </>
  );
}
