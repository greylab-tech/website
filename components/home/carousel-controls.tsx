"use client";

export function CarouselControls({
  previous,
  next,
  previousDisabled = false,
  nextDisabled = false,
}: {
  previous: () => void;
  next: () => void;
  previousDisabled?: boolean;
  nextDisabled?: boolean;
}) {
  return (
    <div className="home-carousel-controls">
      <button
        type="button"
        aria-label="Previous"
        onClick={previous}
        disabled={previousDisabled}
      >
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="m14 5-7 7 7 7" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </button>
      <button
        type="button"
        aria-label="Next"
        onClick={next}
        disabled={nextDisabled}
      >
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="m10 5 7 7-7 7" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </button>
    </div>
  );
}
