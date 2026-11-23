import { blogs } from "@/data/blogs";
import { BlogCard } from "@/components/blog/blog-card";
import { ActionLink } from "@/components/ui/action-link";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "./section-heading";

export function BlogPreview() {
  const featured = blogs.slice(0, 3);

  return (
    <section className="home-blog home-bordered-section" id="blog">
      <div className="container home-blog__container">
        <SectionHeading
          label={
            featured.some((post) => post.isExample)
              ? "OUR BLOG · TEMPLATE ARTICLES"
              : "OUR BLOG"
          }
          title="Insights for modern brands"
        >
          <p>
            Explore expert insights on SEO, marketing, design &amp; branding
          </p>
          <ActionLink href="/blogs">See all blog</ActionLink>
        </SectionHeading>
        {featured.length > 0 && (
          <div className="home-blog__cards">
            {featured.map((post, index) => (
              <Reveal key={post.slug} delay={index * 100}>
                <BlogCard post={post} />
              </Reveal>
            ))}
          </div>
        )}
        <div className="home-blog__mobile-action">
          <ActionLink href="/blogs">See all blog</ActionLink>
        </div>
      </div>
    </section>
  );
}
