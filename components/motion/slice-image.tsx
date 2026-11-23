"use client";
import { useEffect, useRef, type CSSProperties } from "react";
export function SliceImage({
  src,
  alt,
  className = "",
  srcSet,
  sizes,
}: {
  src: string;
  alt: string;
  className?: string;
  srcSet?: string;
  sizes?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.classList.add("is-visible");
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={ref} className={`slice-image ${className}`}>
      <img src={src} srcSet={srcSet} sizes={sizes} alt={alt} loading="lazy" />
      <span className="slice-image__overlay" aria-hidden="true">
        {[0, 1, 2, 3].map((i) => (
          <i key={i} style={{ "--slice-index": i } as CSSProperties} />
        ))}
      </span>
    </div>
  );
}
