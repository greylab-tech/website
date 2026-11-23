import { CallToAction } from "@/components/layout/cta";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { blogs, getBlog } from "@/data/blogs";
import { InternalHero } from "@/components/projects/internal-hero";
import { BlogArticle } from "@/components/blog/blog-article";
import { BlogCard } from "@/components/blog/blog-card";
import { SectionLabel } from "@/components/ui/section-label";

export const dynamicParams = false;

function articleDescription(post: NonNullable<ReturnType<typeof getBlog>>) {
  return post.isExample
    ? `Template article. ${post.description}`
    : post.description;
}

export function generateStaticParams() {
  // Static export needs a parameter even before the first article is published.
  return blogs.length > 0
    ? blogs.map(({ slug }) => ({ slug }))
    : [{ slug: "__unpublished__" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlog(slug);
  return {
    title: { absolute: `${post?.title ?? "Article"} — GreyLab` },
    description: post ? articleDescription(post) : undefined,
  };
}
export default async function BlogPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlog(slug);
  if (!post) notFound();
  const related = blogs.filter((item) => item.slug !== post.slug).slice(0, 3);
  return (
    <main id="main-content" className="internal-page blog-page">
      <InternalHero
        title={post.title}
        description={articleDescription(post)}
        detail
        image={post.image}
      />
      <BlogArticle post={post} />
      {related.length > 0 && (
        <section className="blog-related-section">
          <div className="container">
            <SectionLabel>OUR BLOG</SectionLabel>
            <h2>Related articles</h2>
            <div className="blog-related-grid">
              {related.map((item) => (
                <BlogCard key={item.slug} post={item} />
              ))}
            </div>
          </div>
        </section>
      )}
      <CallToAction />
    </main>
  );
}
