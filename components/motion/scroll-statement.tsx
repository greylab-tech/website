"use client";
import { useEffect, useRef } from "react";
export function ScrollStatement({ statement }: { statement: string }) {
  const ref = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    const element = ref.current;
    if (!element || matchMedia("(prefers-reduced-motion: reduce)").matches)
      return;
    const words = Array.from(
      element.querySelectorAll<HTMLElement>("[data-word]"),
    );
    let frame = 0;
    const update = () => {
      const rect = element.getBoundingClientRect();
      const progress = Math.max(
        0,
        Math.min(1, (innerHeight * 0.85 - rect.top) / (innerHeight * 0.65)),
      );
      words.forEach((word, index) => {
        word.style.color =
          progress > index / words.length ? "#fff" : "#ffffff14";
      });
      frame = 0;
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [statement]);
  return (
    <h2 ref={ref} className="scroll-statement" aria-label={statement}>
      {Array.from({ length: 6 }, (_, i) => (
        <span aria-hidden="true" key={`space-${i}`} />
      ))}
      {statement.split(" ").map((word, i) => (
        <span data-word aria-hidden="true" key={i}>
          {word}
        </span>
      ))}
    </h2>
  );
}
