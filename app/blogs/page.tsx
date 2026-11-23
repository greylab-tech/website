import { CallToAction } from "@/components/layout/cta";
import type { Metadata } from "next";
import { blogs } from "@/data/blogs";
import { InternalHero } from "@/components/projects/internal-hero";
import { BlogCard } from "@/components/blog/blog-card";

const description = blogs.some((post) => post.isExample)
  ? "Example articles on SEO, marketing, design, and branding from the site template."
  : "Explore insights on SEO, marketing, design, and branding.";

export const metadata: Metadata = {
  title: { absolute: "Blog — GreyLab" },
  description,
};

export default function BlogsPage() {
  return (
    <main id="main-content" className="internal-page blogs-page">
      <InternalHero
        title="Insights for modern brands"
        description={description}
      />
      <section className="blogs-index-section">
        {blogs.length > 0 ? (
          <div className="container blog-index-grid">
            {blogs.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <p className="container collection-empty">
            New articles will appear here.
          </p>
        )}
      </section>
      <CallToAction />
    </main>
  );
}
