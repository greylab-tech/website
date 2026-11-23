const logos = [
  { src: "/images/R5OjBjA0fyDHpKcO4JHBhzegc.svg", width: 82, height: 52 },
  { src: "/images/gywBto16SnePVdB0X4VIvsNIko.svg", width: 80, height: 32 },
  { src: "/images/43y6a9S3lwg85DGiCVfFEDarO4E.svg", width: 100, height: 44 },
  { src: "/images/0d1APF7he4ogxXZ0aLGxqsHA.svg", width: 145, height: 28 },
];

export function BrandStrip() {
  return (
    <div className="brand-strip" aria-hidden="true">
      <div className="brand-strip__row">
        {logos.map(({ src, width, height }) => (
          <div key={src} className="brand-strip__cell">
            <img src={src} alt="" width={width} height={height} />
          </div>
        ))}
      </div>
    </div>
  );
}
