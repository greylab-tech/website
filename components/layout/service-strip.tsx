const services = ["Marketing", "SEO", "Web design", "Web development"];

export function ServiceStrip() {
  return (
    <div className="service-strip" role="group" aria-label="Our specialties">
      {services.map((service, index) => (
        <span key={service}>
          {index > 0 && <span aria-hidden="true">•</span>}
          <span>{service}</span>
        </span>
      ))}
    </div>
  );
}
