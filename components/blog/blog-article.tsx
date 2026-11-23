import { SliceImage } from "@/components/motion/slice-image";
import { detailImageSizes, responsiveImage } from "@/lib/media";
import type { BlogPost } from "@/data/blogs";

export function BlogArticle({ post }: { post: BlogPost }) {
  return (
    <section className="blog-article-section">
      <div className="container blog-article-columns">
        <aside className="blog-article-sidebar">
          <dl>
            {[
              ["Date", post.date],
              ["Category", post.category],
              ["Author", post.author],
            ].map(([label, value]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </aside>
        <article className="blog-article-body">
          <div className="blog-article-opening">
            <div
              className="blog-article-intro"
              dangerouslySetInnerHTML={{ __html: post.content[0] }}
            />
            <div
              className="blog-rich-text"
              dangerouslySetInnerHTML={{ __html: post.content[1] }}
            />
          </div>
          <SliceImage
            className="blog-body-image"
            {...responsiveImage(post.bodyImage, detailImageSizes)}
            alt={`An insight into ${post.category.toLowerCase()}`}
          />
          <div
            className="blog-rich-text"
            dangerouslySetInnerHTML={{ __html: post.content.slice(2).join("") }}
          />
        </article>
      </div>
    </section>
  );
}
