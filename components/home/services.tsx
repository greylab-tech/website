"use client";

import Image from "next/image";
import { useState, type CSSProperties } from "react";
import { SectionLabel } from "@/components/ui/section-label";
import { Reveal } from "@/components/motion/reveal";

const services = [
  {
    name: "Branding",
    image: "branding",
    description:
      "Strategic brand identities that help businesses establish credibility, differentiate themselves, and create lasting impressions.",
    tags: [
      "Brand Strategy",
      "Visual Identity",
      "Logo Design",
      "Creative Direction",
      "Strategy",
    ],
  },
  {
    name: "Web Design",
    image: "web-design",
    description:
      "Modern, conversion-focused websites that combine exceptional user experience with business objectives to drive measurable results.",
    tags: [
      "UI/UX Design",
      "Framer",
      "Conversion Design",
      "Creative Direction",
      "Strategy",
    ],
  },
  {
    name: "Development",
    image: "development",
    description:
      "Fast, scalable, and SEO-friendly websites built to support your business growth and deliver a seamless user experience.",
    tags: ["Custom Development", "Webflow", "Framer", "WordPress", "Shopify"],
  },
  {
    name: "Search Optimization",
    image: "search-optimization",
    description:
      "Data-driven search engine optimization that helps your business rank higher, attract qualified traffic, and generate consistent organic growth.",
    tags: [
      "Technical SEO",
      "On-Page SEO",
      "Local SEO",
      "Content Strategy",
      "Link Building",
    ],
  },
  {
    name: "Digital Marketing",
    image: "digital-marketing",
    description:
      "Strategic marketing campaigns designed to increase visibility, generate leads, and maximize return on investment across digital channels.",
    tags: [
      "PPC Advertising",
      "Social Media",
      "Email Marketing",
      "Content Marketing",
      "Conversion Optimization",
    ],
  },
];

export function Services() {
  const [active, setActive] = useState(0);
  const service = services[active];
  return (
    <section
      className="home-services home-bordered-section"
      id="services"
      aria-label="Our services"
    >
      <div
        className="container home-services__grid"
        style={{ "--service-step": active } as CSSProperties}
      >
        <div className="home-services__preview" aria-live="polite">
          <div className="home-services__preview-content" key={service.name}>
            <div className="home-services__image">
              <Image
                src={`/images/services/${service.image}.webp`}
                alt=""
                fill
                sizes="(max-width: 809px) 100vw, 30vw"
              />
            </div>
            <p className="home-services__name">{service.name}</p>
            <p className="home-services__description">{service.description}</p>
            <div className="home-services__tags">
              {service.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </div>
        </div>
        <div className="home-services__items">
          <Reveal>
            <SectionLabel>OUR SERVICES</SectionLabel>
          </Reveal>
          <div
            className="home-services__list"
            role="tablist"
            aria-label="Services"
          >
            {services.map((item, index) => (
              <button
                type="button"
                role="tab"
                aria-selected={active === index}
                className={`home-services__item ${active === index ? "is-active" : ""}`}
                key={item.name}
                onMouseEnter={() => setActive(index)}
                onFocus={() => setActive(index)}
                onClick={() => setActive(index)}
              >
                <span className="home-services__number">
                  [<span>{String(index + 1).padStart(2, "0")}</span>]
                </span>
                <span>{item.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
