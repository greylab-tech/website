import { LiquidGradient } from "../motion/liquid-gradient";
import { SplitText } from "../motion/split-text";
import { ActionLink } from "../ui/action-link";
import { ServiceStrip } from "./service-strip";

export function CallToAction() {
  return (
    <section className="call-to-action">
      <LiquidGradient />
      <div className="container call-to-action__inner">
        <div className="call-to-action__main">
          <SplitText text="Have Something in Mind? Let's Build It." />
          <ActionLink href="/contact" variant="white">
            Start a Project
          </ActionLink>
        </div>
        <ServiceStrip />
      </div>
    </section>
  );
}
