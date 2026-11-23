import { SliceImage } from "@/components/motion/slice-image";
import Link from "next/link";
import type { BlogPost } from "@/data/blogs";
import { cardImageSizes, responsiveImage } from "@/lib/media";

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link href={`/blogs/${post.slug}`} className="blog-card">
      <SliceImage
        {...responsiveImage(post.image, cardImageSizes)}
        alt={post.title}
        className="blog-card-image"
      />
      <div className="blog-card-content">
        <div className="blog-card-meta">
          <span>{post.date}</span>
          <span>{post.category}</span>
        </div>
        <h3>{post.title}</h3>
      </div>
    </Link>
  );
}
