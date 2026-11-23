import Image from "next/image";
import { SectionLabel } from "@/components/ui/section-label";
import { ActionLink } from "@/components/ui/action-link";
import { Reveal } from "@/components/motion/reveal";

const plans = [
  {
    name: "Starter",
    description: "Perfect for startups and small businesses",
    price: "$2,500",
    features: [
      "Custom website design",
      "Mobile & Tablet Optimization",
      "Basic On-Page SEO Setup",
      "Contact Form & Lead Capture",
      "Google Analytics Integration",
      "Website Launch & Training",
    ],
    popular: false,
  },
  {
    name: "Growth",
    description:
      "For growing businesses looking to increase visibility, leads, and conversions",
    price: "$5,500",
    features: [
      "Conversion-Focused Website",
      "Advanced SEO Strategy",
      "Keyword Research",
      "Content Management System",
      "Lead Generation Funnel",
      "Analytics & Search Console",
      "Performance Optimization",
      "Social Media Integration",
      "Monthly Reporting",
      "Ongoing Technical Support",
    ],
    popular: true,
  },
];

function PricingCard({ plan }: { plan: (typeof plans)[number] }) {
  return (
    <article
      className={`home-pricing__card ${plan.popular ? "home-pricing__card--growth" : ""}`}
    >
      <div className="home-pricing__top">
        <div className="home-pricing__title">
          <Image
            src={
              plan.popular
                ? "/images/process/design.svg"
                : "/images/83YYToKEQR8fbvNUt62cxboj8E.svg"
            }
            alt=""
            width={40}
            height={40}
          />
          {plan.popular && <span className="home-pricing__badge">Popular</span>}
          <h3>{plan.name}</h3>
          <p>{plan.description}</p>
        </div>
        <div className="home-pricing__price">
          <strong>{plan.price}</strong>
          <span>/ per month</span>
        </div>
      </div>
      <div className="home-pricing__bottom">
        <ul>
          {plan.features.map((feature) => (
            <li key={feature}>{feature}</li>
          ))}
        </ul>
        <ActionLink
          href="/contact"
          variant={plan.popular ? "accent" : "white"}
          className="home-pricing__action"
        >
          Get started
        </ActionLink>
      </div>
    </article>
  );
}

export function Pricing() {
  return (
    <section className="home-pricing home-bordered-section" id="pricing">
      <div className="container home-pricing__container">
        <div className="home-pricing__heading">
          <Reveal>
            <SectionLabel>OUR PRICING</SectionLabel>
            <p className="home-pricing__sample-note">
              Example plans and pricing
            </p>
          </Reveal>
          <Reveal>
            <h2>Flexible plans for all stages</h2>
          </Reveal>
        </div>
        <div className="home-pricing__cards">
          {plans.map((plan, index) => (
            <Reveal key={plan.name} delay={index * 100}>
              <PricingCard plan={plan} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
