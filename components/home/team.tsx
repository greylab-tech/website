"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { team, type TeamMember } from "@/data/team";
import { SectionHeading } from "./section-heading";
import { CarouselControls } from "./carousel-controls";

function TeamCard({ member, index }: { member: TeamMember; index: number }) {
  return (
    <article
      className={`home-team__card ${index % 2 ? "home-team__card--short" : ""}`}
    >
      <div className="home-team__portrait">
        <Image
          className="home-team__portrait-background"
          src="/images/team/portrait-background.webp"
          alt=""
          fill
          sizes="370px"
        />
        <Image
          className="home-team__person"
          src={member.portrait}
          alt=""
          fill
          sizes="(max-width: 809px) 82vw, 370px"
          style={{ objectPosition: member.portraitPosition }}
        />
        <div className="home-team__portrait-shade" aria-hidden="true" />
      </div>
      <div className="home-team__details">
        <h3>{member.name}</h3>
        <p>{member.role}</p>
      </div>
    </article>
  );
}

function TeamCarousel() {
  const track = useRef<HTMLDivElement>(null);
  const mobile = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const element = track.current;
    if (!element) return;
    const measure = () => {
      const distance = element.scrollWidth / 2;
      if (distance > 0) {
        element.style.setProperty("--team-duration", `${distance / 50}s`);
      }
    };
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    measure();
    return () => observer.disconnect();
  }, []);

  function move(direction: -1 | 1) {
    const element = mobile.current;
    const card = element?.firstElementChild;
    if (!element || !card) return;
    const gap = Number.parseFloat(getComputedStyle(element).columnGap);
    element.scrollBy({
      left: direction * (card.getBoundingClientRect().width + gap),
      behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    });
  }

  return (
    <div className="home-team__carousel">
      <div className="home-team__ticker">
        <div className="home-team__track" ref={track} data-paused={paused}>
          {[0, 1].map((copy) => (
            <div
              className="home-team__group"
              key={copy}
              aria-hidden={copy === 1}
            >
              {team.map((member, index) => (
                <TeamCard member={member} index={index} key={member.name} />
              ))}
            </div>
          ))}
        </div>
      </div>
      <button
        type="button"
        className="home-team__pause"
        onClick={() => setPaused((value) => !value)}
      >
        {paused ? "Play" : "Pause"} team carousel
      </button>
      <div className="home-team__mobile">
        <div className="home-team__mobile-track" ref={mobile}>
          {team.map((member, index) => (
            <TeamCard member={member} index={index} key={member.name} />
          ))}
        </div>
        <CarouselControls previous={() => move(-1)} next={() => move(1)} />
      </div>
    </div>
  );
}

export function Team() {
  return (
    <section className="home-team home-bordered-section" id="team">
      <div className="container home-team__container">
        <SectionHeading label="OUR TEAM" title="Meet our expert team">
          <p>
            Our team covers software engineering, client relations, SEO, and
            paid advertising.
          </p>
        </SectionHeading>
        <TeamCarousel />
      </div>
    </section>
  );
}
