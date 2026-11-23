"use client";

import { useEffect, useRef } from "react";
import { createAnimationClock } from "@/lib/webgl/animation-clock";
import { createLiquidGradientRenderer } from "@/lib/webgl/liquid-gradient-renderer";
import { liquidGradientConfig } from "./liquid-gradient-config";

/** Live GLSL background shared by the hero, page headers, and closing section. */
export function LiquidGradient({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const clock = createAnimationClock();
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    let renderer: ReturnType<typeof createLiquidGradientRenderer> = null;
    let frame = 0;
    let visible = false;
    let lost = false;
    let failed = false;
    let disposed = false;

    function stop() {
      cancelAnimationFrame(frame);
      frame = 0;
      clock.pause();
    }

    function draw(seconds = clock.elapsed) {
      if (disposed || lost || failed || !visible || document.hidden)
        return false;
      try {
        renderer ??= createLiquidGradientRenderer(canvas!);
        if (!renderer) {
          failed = true;
          canvas!.dataset.renderer = "fallback";
          return false;
        }
        if (
          !renderer.render(
            motion.matches ? liquidGradientConfig.stillTime : seconds,
          )
        )
          return false;
        canvas!.dataset.renderer = "webgl2";
        canvas!.style.opacity = "1";
        return true;
      } catch {
        failed = true;
        renderer?.dispose();
        renderer = null;
        canvas!.dataset.renderer = "fallback";
        canvas!.style.opacity = "0";
        return false;
      }
    }

    function tick(timestamp: number) {
      frame = 0;
      if (!draw(clock.tick(timestamp))) {
        clock.pause();
        return;
      }
      if (!motion.matches) frame = requestAnimationFrame(tick);
    }

    function syncAnimation() {
      stop();
      if (draw() && !motion.matches) frame = requestAnimationFrame(tick);
    }

    function contextLost(event: Event) {
      event.preventDefault();
      lost = true;
      stop();
      renderer?.dispose();
      renderer = null;
      canvas!.dataset.renderer = "context-lost";
      canvas!.style.opacity = "0";
    }

    function contextRestored() {
      // All shader, buffer, texture and uniform handles are invalid after a reset.
      lost = false;
      failed = false;
      syncAnimation();
    }

    const resizeObserver = new ResizeObserver(() => {
      draw();
    });
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      syncAnimation();
    });
    resizeObserver.observe(canvas);
    visibilityObserver.observe(canvas);
    motion.addEventListener("change", syncAnimation);
    document.addEventListener("visibilitychange", syncAnimation);
    canvas.addEventListener("webglcontextlost", contextLost);
    canvas.addEventListener("webglcontextrestored", contextRestored);

    return () => {
      disposed = true;
      stop();
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      motion.removeEventListener("change", syncAnimation);
      document.removeEventListener("visibilitychange", syncAnimation);
      canvas.removeEventListener("webglcontextlost", contextLost);
      canvas.removeEventListener("webglcontextrestored", contextRestored);
      // Strict Mode immediately reuses a connected canvas; only release a detached one.
      renderer?.dispose(!canvas.isConnected);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className={className}
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        background:
          "radial-gradient(ellipse at 60% 80%, var(--accent), #640610 35%, #000 74%)",
      }}
    >
      <canvas
        ref={canvasRef}
        data-renderer="pending"
        style={{ display: "block", width: "100%", height: "100%", opacity: 0 }}
      />
    </div>
  );
}
