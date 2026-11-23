import Image from "next/image";
import { ActionLink } from "@/components/ui/action-link";
import { Reveal } from "@/components/motion/reveal";
import { ReviewBadge } from "./review-badge";

export function Studio() {
  return (
    <section className="home-studio" aria-labelledby="studio-title">
      <Image
        className="home-studio__background"
        src="/images/studio/team-collaboration.webp"
        alt=""
        fill
        sizes="100vw"
      />
      <div className="home-studio__shade" aria-hidden="true" />
      <div className="container home-studio__container">
        <Reveal className="home-studio__rating">
          <ReviewBadge />
          <span>Template studio photo</span>
        </Reveal>
        <div className="home-studio__content">
          <Reveal className="home-studio__copy">
            <h2 id="studio-title">
              Our team of
              <br />
              talented fellows
            </h2>
            <p>
              GreyLab brings design and engineering together to build websites,
              software, and AI solutions.
            </p>
          </Reveal>
          <Reveal>
            <ActionLink href="/contact">Let&apos;s talk</ActionLink>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
