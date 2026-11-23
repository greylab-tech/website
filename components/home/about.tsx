import { ActionLink } from "../ui/action-link";
import { SectionLabel } from "../ui/section-label";
import { ScrollStatement } from "../motion/scroll-statement";
import { SliceImage } from "../motion/slice-image";
import { Reveal } from "../motion/reveal";
export function About() {
  return (
    <section id="about" className="home-about">
      <div className="container home-about__grid">
        <div className="home-about__aside">
          <SectionLabel>ABOUT GREYLAB</SectionLabel>
          <Reveal className="home-about__details">
            <p>
              Great ideas deserve more than just a plan. We turn them into real
              products through thoughtful design, solid engineering, and a focus
              on solving real problems.
            </p>
            <ActionLink href="/contact">Let&apos;s Talk</ActionLink>
          </Reveal>
        </div>
        <div className="home-about__main">
          <ScrollStatement statement="We bring design, code & ideas together to build software that makes a difference." />
          <SliceImage
            src="/images/qAJASLXpqLQ2W3fNR8xPVkjuqac.webp"
            alt=""
            className="home-about__image"
          />
        </div>
      </div>
    </section>
  );
}
