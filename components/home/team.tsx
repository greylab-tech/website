"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { team } from "@/data/team";
import { SectionHeading } from "./section-heading";
import { CarouselControls } from "./carousel-controls";

const sampleTeam = [
  {
    name: "Olivia Carter",
    role: "Founder & CEO",
    image: "olivia-carter",
    icon: "𝕏",
  },
  {
    name: "Ethan Brooks",
    role: "SEO & Growth Strategist",
    image: "ethan-brooks",
    icon: "◎",
  },
  {
    name: "Noah Mitchell",
    role: "Digital Marketing Manager",
    image: "noah-mitchell",
    icon: "in",
  },
  {
    name: "Liam Parker",
    role: "Lead Web Designer",
    image: "liam-parker",
    icon: "◉",
  },
  {
    name: "Ava Richardson",
    role: "Creative Strategist",
    image: "ava-richardson",
    icon: "◎",
  },
  {
    name: "Joe Bennett",
    role: "Lead Developer",
    image: "joe-bennett",
    icon: "◎",
  },
];

function SampleTeamCard({
  member,
  index,
}: {
  member: (typeof sampleTeam)[number];
  index: number;
}) {
  return (
    <article
      className={`home-team__card ${index % 2 ? "home-team__card--short" : ""}`}
    >
      <div className="home-team__portrait">
        <Image
          className="home-team__portrait-background"
          src="/images/team/portrait-background.png"
          alt=""
          fill
          sizes="370px"
        />
        <Image
          className="home-team__person"
          src={`/images/team/${member.image}.png`}
          alt=""
          fill
          sizes="(max-width: 809px) 82vw, 370px"
        />
        <div className="home-team__portrait-shade" aria-hidden="true" />
      </div>
      <div className="home-team__details">
        <div>
          <h3>{member.name}</h3>
          <p>{member.role}</p>
        </div>
        <span className="home-team__social" aria-hidden="true">
          {member.icon}
        </span>
      </div>
    </article>
  );
}

function SampleTeamCarousel() {
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
              {sampleTeam.map((member, index) => (
                <SampleTeamCard
                  member={member}
                  index={index}
                  key={member.name}
                />
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
          {sampleTeam.map((member, index) => (
            <SampleTeamCard member={member} index={index} key={member.name} />
          ))}
        </div>
        <CarouselControls previous={() => move(-1)} next={() => move(1)} />
      </div>
    </div>
  );
}

function TeamMembers() {
  return (
    <ul className="home-team__members">
      {team.map(({ name, role, portrait, profiles }) => (
        <li className="home-team__member" key={name}>
          <img src={portrait} alt="" loading="lazy" />
          <div>
            <h3>{name}</h3>
            <p>{role}</p>
            <ul className="home-team__profiles">
              {profiles.map(({ label, href }) => (
                <li key={href}>
                  <a href={href} aria-label={`${name} on ${label}`}>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </li>
      ))}
    </ul>
  );
}

export function Team() {
  const hasMembers = team.length > 0;
  return (
    <section className="home-team home-bordered-section" id="team">
      <div className="container home-team__container">
        <SectionHeading label="OUR TEAM" title="Meet our expert team">
          {hasMembers ? (
            <p>
              Three developers who love solving problems, building products, and
              turning challenging ideas into working software.
            </p>
          ) : (
            <p>Example profiles from the original template.</p>
          )}
        </SectionHeading>
        {hasMembers ? <TeamMembers /> : <SampleTeamCarousel />}
      </div>
    </section>
  );
}
