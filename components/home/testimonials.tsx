"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ActionLink } from "@/components/ui/action-link";
import { SectionLabel } from "@/components/ui/section-label";
import { Reveal } from "@/components/motion/reveal";
import { CarouselControls } from "./carousel-controls";

const testimonials = [
  {
    quote:
      "Atlas Studio completely transformed our online presence. The new website, SEO strategy & conversion improvements helped us generate more qualified leads within the first 3 months than we had in the previous year.",
    name: "Michael Carter",
    role: "CEO, Elevate Consulting",
    image: "ksreVnpMWV0mQq039QE65IRIan0",
  },
  {
    quote:
      "Their team understood our vision immediately and delivered a website that perfectly reflected our brand. The process was organized, collaborative, and exceeded expectations from start to finish.",
    name: "Sarah Mitchell",
    role: "Director, Nova Health",
    image: "vPYZutTIWMoqQnVGPRq6V2AkJw",
  },
  {
    quote:
      "What impressed us most was the combination of creativity and strategy. Atlas Studio didn't just design a beautiful website—they built a growth-focused platform that continues to drive measurable results.",
    name: "Daniel Foster",
    role: "Co-Founder, Peak Ventures",
    image: "MdJVZG9qGloNi00reBkrHmsQg",
  },
  {
    quote:
      "The SEO and digital marketing support has been exceptional. We've seen significant improvements in rankings, traffic, and lead quality, making Atlas Studio a valuable long-term partner.",
    name: "Emma Richardson",
    role: "Manager, BrightPath Group",
    image: "sQUXMhCKkc256yPc7viijcNr4",
  },
];

function ReviewScore({
  score,
  name,
  image,
}: {
  score: string;
  name: string;
  image: string;
}) {
  return (
    <div className="home-testimonials__score">
      <span className="home-testimonials__stars" aria-hidden="true">
        ★★★★★
      </span>
      <small>{score}</small>
      <div className="home-testimonials__review-brand">
        <span className="home-testimonials__review-mark">
          <Image src={image} width={24} height={24} alt="" />
        </span>
        <strong>{name}</strong>
      </div>
    </div>
  );
}

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(2);
  useEffect(() => {
    const query = window.matchMedia("(max-width: 1299px)");
    const update = () => {
      const count = query.matches ? 1 : 2;
      setVisibleCount(count);
      setIndex((value) => Math.min(value, testimonials.length - count));
    };
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  const maxIndex = testimonials.length - visibleCount;
  function previous() {
    setIndex((value) => (value <= 0 ? maxIndex : value - 1));
  }
  function next() {
    setIndex((value) => (value >= maxIndex ? 0 : value + 1));
  }
  return (
    <section
      className="home-testimonials home-bordered-section"
      id="testimonials"
    >
      <div className="container home-testimonials__container">
        <div className="home-testimonials__heading">
          <Reveal>
            <SectionLabel>TESTIMONIALS · EXAMPLES</SectionLabel>
          </Reveal>
          <Reveal>
            <h2>Trusted by top brands worldwide</h2>
          </Reveal>
        </div>
        <div className="home-testimonials__body">
          <div className="home-testimonials__overview">
            <p className="home-testimonials__sample">Example review scores</p>
            <ReviewScore
              score="4.9/5 (1k+ Reviews)"
              name="Reviews.io"
              image="/images/logos/clutch.png"
            />
            <div className="home-testimonials__divider" />
            <ReviewScore
              score="4.8/5 (121+ Reviews)"
              name="Trustpilot"
              image="/images/logos/trustpilot.png"
            />
            <ActionLink href="/projects">See our work</ActionLink>
          </div>
          <div className="home-testimonials__carousel">
            <div className="home-testimonials__window">
              <div
                className="home-testimonials__track"
                style={{
                  transform: `translateX(calc(-${(index * 100) / visibleCount}% - ${(index * 22) / visibleCount}px))`,
                }}
              >
                {testimonials.map((testimonial, position) => (
                  <article
                    className="home-testimonials__card"
                    key={testimonial.name}
                    aria-hidden={
                      position < index || position >= index + visibleCount
                    }
                  >
                    <blockquote>&quot;{testimonial.quote}&quot;</blockquote>
                    <div className="home-testimonials__author">
                      <div>
                        <h3>{testimonial.name}</h3>
                        <p>{testimonial.role}</p>
                      </div>
                      <Image
                        src={`/images/${testimonial.image}.webp`}
                        alt=""
                        width={46}
                        height={46}
                      />
                    </div>
                  </article>
                ))}
              </div>
            </div>
            <CarouselControls previous={previous} next={next} />
          </div>
        </div>
      </div>
    </section>
  );
}
