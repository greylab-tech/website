"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
const stats = [
  {
    value: 117,
    suffix: "+",
    description:
      "Projects Delivered. Websites, SEO campaigns, and digital growth initiatives launched successfully.",
  },
  {
    value: 315,
    suffix: "%",
    description:
      "Avg Traffic Growth. Helping clients increase visibility through strategic SEO & marketing.",
  },
  {
    value: 97,
    suffix: "+",
    description:
      "Businesses Supported. Trusted by startups, local businesses, and growing brands.",
  },
];
function StatNumber({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [count, setCount] = useState(value);
  useEffect(() => {
    const element = ref.current;
    if (!element || matchMedia("(prefers-reduced-motion: reduce)").matches)
      return;
    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const animate = (time: number) => {
          const progress = Math.min((time - start) / 1800, 1);
          setCount(Math.round(value * (1 - Math.pow(1 - progress, 3))));
          if (progress < 1) frame = requestAnimationFrame(animate);
        };
        frame = requestAnimationFrame(animate);
      },
      { threshold: 0.5 },
    );
    observer.observe(element);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value]);
  return (
    <span
      ref={ref}
      className="home-stat__number"
      aria-label={`${value}${suffix}`}
    >
      {count}
      {suffix}
    </span>
  );
}
export function Stats() {
  return (
    <section className="home-stats" aria-label="GreyLab in numbers">
      <div className="home-stats__frame">
        {stats.map((stat) => (
          <Link href="/contact" key={stat.value} className="home-stat">
            <StatNumber value={stat.value} suffix={stat.suffix} />
            <p>{stat.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
