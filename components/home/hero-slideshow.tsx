"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { projects } from "@/data/projects";
import { responsiveImage } from "@/lib/media";

const slides = projects.slice(0, 5);
const half = Math.floor(slides.length / 2);

export function HeroSlideshow() {
  const [index, setIndex] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  const visible = useRef(true);
  const drag = useRef({ start: 0, moved: false });
  useEffect(() => {
    if (slides.length < 2) return;

    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    const observer = new IntersectionObserver(([entry]) => {
      visible.current = entry.isIntersecting;
    });
    if (root.current) observer.observe(root.current);
    const timer = setInterval(() => {
      if (visible.current && !document.hidden && !motion.matches) {
        setIndex((i) => (i + 1) % slides.length);
      }
    }, 4500);
    return () => {
      clearInterval(timer);
      observer.disconnect();
    };
  }, []);

  if (!slides.length) return null;

  return (
    <div className="hero-slideshow" ref={root}>
      <div
        className="hero-slideshow__viewport"
        onPointerDown={() => {
          drag.current.moved = false;
        }}
        onPointerDownCapture={(event) => {
          drag.current.start = event.clientX;
        }}
        onPointerUpCapture={(event) => {
          const distance = event.clientX - drag.current.start;
          if (slides.length > 1 && Math.abs(distance) > 40) {
            drag.current.moved = true;
            setIndex(
              (i) =>
                (i + (distance < 0 ? 1 : -1) + slides.length) % slides.length,
            );
          }
        }}
        onClickCapture={(event) => {
          if (drag.current.moved) event.preventDefault();
        }}
        onDragStart={(event) => event.preventDefault()}
      >
        {slides.map((p, i) => (
          <Link
            href={`/projects/${p.slug}`}
            key={p.slug}
            className={`hero-slideshow__slide ${index === i ? "is-active" : ""}`}
            style={{
              transform: `translateX(calc(${((i - index + slides.length + half) % slides.length) - half} * (100% + 10px)))`,
            }}
            aria-hidden={index !== i}
            tabIndex={index === i ? 0 : -1}
          >
            <div className="hero-slideshow__image">
              <img
                {...responsiveImage(
                  p.image,
                  "(max-width: 1099px) 330px, 390px",
                )}
                alt={p.imageAlt ?? `${p.title} screenshot`}
                loading={i === 0 ? "eager" : "lazy"}
                draggable={false}
              />
              <span>
                {p.isExample && "Example · "}
                {p.highlights[0]}
              </span>
            </div>
            <p>{p.title}</p>
          </Link>
        ))}
      </div>
      {slides.length > 1 && (
        <div className="hero-slideshow__controls">
          <button
            aria-label="Previous featured project"
            onClick={() =>
              setIndex((i) => (i - 1 + slides.length) % slides.length)
            }
          >
            ‹
          </button>
          <button
            aria-label="Next featured project"
            onClick={() => setIndex((i) => (i + 1) % slides.length)}
          >
            ›
          </button>
        </div>
      )}
    </div>
  );
}
