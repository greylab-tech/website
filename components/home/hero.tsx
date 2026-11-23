import { ActionLink } from "../ui/action-link";
import { LiquidGradient } from "../motion/liquid-gradient";
import { HeroSlideshow } from "./hero-slideshow";
import { ReviewBadge } from "./review-badge";
import { ServiceStrip } from "../layout/service-strip";
import { siteDescription, wordmark } from "@/data/site";

const words = siteDescription.split(" ");

export function Hero() {
  return (
    <section className="home-hero" aria-labelledby="hero-title">
      <LiquidGradient />
      <div className="home-hero__frame">
        <div className="home-hero__top">
          <div className="home-hero__intro">
            <p className="home-hero__description" aria-label={words.join(" ")}>
              {words.map((w, i) => (
                <span
                  key={i}
                  aria-hidden="true"
                  style={{ animationDelay: `${0.2 + i * 0.075}s` }}
                >
                  {w}{" "}
                </span>
              ))}
            </p>
            <div className="home-hero__actions">
              <ActionLink href="/contact">Start a Project</ActionLink>
              <ReviewBadge />
            </div>
          </div>
          <HeroSlideshow />
        </div>
        <div className="home-hero__bottom">
          <h1 id="hero-title" className="home-hero__wordmark">
            <img {...wordmark} alt="GreyLab." fetchPriority="high" />
          </h1>
          <ServiceStrip />
        </div>
      </div>
    </section>
  );
}
