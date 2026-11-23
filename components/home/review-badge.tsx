const portraits = [
  "LtzrFNlNjULrYxYytyRXmbZU9Q",
  "MfYMf2sZF2qZb8cTS3HloJt4aoM",
  "QFr6Az7SKb9bXyYOaVFuYfWRI",
  "jbLbZWpPQ6pMs7vgeT5HOZARSkc",
];

export function ReviewBadge() {
  return (
    <div
      className="review-badge"
      role="img"
      aria-label="Sample rating of 4.9 out of 5 based on 155 reviews"
    >
      <div className="review-badge__faces">
        {portraits.map((portrait, index) => (
          <img
            key={portrait}
            src={`/images/${portrait}.webp`}
            alt=""
            width={37}
            height={37}
            style={{ zIndex: portraits.length - index }}
          />
        ))}
      </div>
      <div>
        <p>
          4.9 <span aria-hidden="true">★</span>
        </p>
        <p>155 sample reviews</p>
      </div>
    </div>
  );
}
