/** Elapsed visible time, independent of the frame rate or GPU stalls. */
export function createAnimationClock() {
  let elapsed = 0;
  let previous: number | null = null;

  return {
    tick(timestampMs: number) {
      if (previous !== null) {
        elapsed += Math.max(0, timestampMs - previous) / 1000;
      }
      previous = timestampMs;
      return elapsed;
    },
    pause() {
      previous = null;
    },
    get elapsed() {
      return elapsed;
    },
  };
}
