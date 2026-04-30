import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";

// No posts yet — this route exists to handle future MDX blog posts.
// When posts are added, import them here and build out generateStaticParams.

export async function generateStaticParams() {
  return [];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  // Placeholder — replace with real post lookup when posts exist
  return {
    title: `${slug} — Diving Club Blog`,
    alternates: { canonical: `https://divingclub.lk/blog/${slug}` },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  await params;
  // No posts published yet — all slugs 404 until posts are added
  notFound();
}
