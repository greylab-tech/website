"use client";
import { useEffect, useRef, type CSSProperties } from "react";
export function SplitText({
  text,
  className = "",
  as: Tag = "h2",
}: {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p";
}) {
  const ref = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    const element = ref.current;
    if (!element || matchMedia("(prefers-reduced-motion: reduce)").matches)
      return;
    element.classList.add("is-pending");
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.classList.remove("is-pending");
          element.classList.add("is-visible");
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return (
    <Tag ref={ref} className={`split-text ${className}`} aria-label={text}>
      {text.split(" ").map((word, i) => (
        <span key={i} aria-hidden="true">
          <span
            className="split-text__word"
            style={{ "--word-index": i } as CSSProperties}
          >
            {word}
          </span>{" "}
        </span>
      ))}
    </Tag>
  );
}
