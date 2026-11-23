"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

/** The reference uses an exponential wheel ease on desktop and native touch scrolling. */
export function SmoothScroll() {
  const pathname = usePathname();
  useEffect(() => {
    const media = matchMedia(
      "(min-width: 810px) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
    );
    let target = window.scrollY,
      current = target,
      frame = 0,
      lastTime = 0;
    const stop = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      target = current = window.scrollY;
      lastTime = 0;
    };
    const animate = (time: number) => {
      const elapsed = lastTime ? Math.min(time - lastTime, 32) : 1000 / 60;
      lastTime = time;
      current +=
        (target - current) * (1 - Math.exp((-0.1 * 60 * elapsed) / 1000));
      if (Math.abs(target - current) < 0.35) {
        current = target;
        frame = 0;
        lastTime = 0;
      } else {
        frame = requestAnimationFrame(animate);
      }
      window.scrollTo({ top: current, behavior: "instant" });
    };
    const wheel = (event: WheelEvent) => {
      if (
        !media.matches ||
        event.ctrlKey ||
        event.metaKey ||
        Math.abs(event.deltaX) > Math.abs(event.deltaY) ||
        document.body.style.overflow === "hidden"
      )
        return;
      let element = event.target instanceof Element ? event.target : null;
      while (element && element !== document.body) {
        const style = getComputedStyle(element);
        if (
          /auto|scroll/.test(style.overflowY) &&
          element.scrollHeight > element.clientHeight
        )
          return;
        element = element.parentElement;
      }
      event.preventDefault();
      if (!frame) current = target = window.scrollY;
      const delta =
        event.deltaY *
        (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? innerHeight : 1);
      target = Math.max(
        0,
        Math.min(
          document.documentElement.scrollHeight - innerHeight,
          target + delta,
        ),
      );
      if (!frame) frame = requestAnimationFrame(animate);
    };
    window.addEventListener("wheel", wheel, { passive: false });
    window.addEventListener("keydown", stop);
    window.addEventListener("pointerdown", stop);
    media.addEventListener("change", stop);
    return () => {
      stop();
      window.removeEventListener("wheel", wheel);
      window.removeEventListener("keydown", stop);
      window.removeEventListener("pointerdown", stop);
      media.removeEventListener("change", stop);
    };
  }, [pathname]);
  return null;
}
