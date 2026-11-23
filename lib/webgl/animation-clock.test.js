import { describe, expect, test } from "bun:test";
import { createAnimationClock } from "./animation-clock";

describe("WebGL animation clock", () => {
  test("advances by real elapsed seconds even after a long frame", () => {
    const clock = createAnimationClock();

    expect(clock.elapsed).toBe(0);
    expect(clock.tick(0)).toBe(0);
    expect(clock.tick(1000)).toBe(1);
    expect(clock.elapsed).toBe(1);
  });

  test("starts at zero regardless of the first animation frame timestamp", () => {
    const clock = createAnimationClock();

    expect(clock.tick(12_000)).toBe(0);
    expect(clock.tick(12_250)).toBe(0.25);
  });

  test("retains progress while paused and excludes time spent offscreen", () => {
    const clock = createAnimationClock();
    clock.tick(0);
    clock.tick(1000);

    clock.pause();
    expect(clock.elapsed).toBe(1);
    clock.pause();
    expect(clock.elapsed).toBe(1);

    expect(clock.tick(5000)).toBe(1);
    expect(clock.tick(5250)).toBe(1.25);
    expect(clock.elapsed).toBe(1.25);
  });

  test("keeps the same animation speed at irregular frame rates", () => {
    const regular = createAnimationClock();
    const irregular = createAnimationClock();

    for (const timestamp of [
      0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000,
    ]) {
      regular.tick(timestamp);
    }
    for (const timestamp of [0, 16, 49, 80, 380, 1000]) {
      irregular.tick(timestamp);
    }

    expect(regular.elapsed).toBeCloseTo(1, 10);
    expect(irregular.elapsed).toBeCloseTo(regular.elapsed, 10);
  });
});
