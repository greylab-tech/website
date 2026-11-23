import Image from "next/image";
import { SectionHeading } from "./section-heading";

const steps = [
  {
    title: "Understand & Plan",
    icon: "discover",
    description:
      "We learn about your goals, define the scope, and plan a solution that fits your needs.",
  },
  {
    title: "Design & Develop",
    icon: "design",
    description:
      "We turn ideas into working software, keeping you involved and updated throughout development.",
  },
  {
    title: "Test & Launch",
    icon: "launch",
    description:
      "We test, refine, and prepare your product for launch, making sure everything works as intended.",
  },
];

function ProcessCard({
  step,
  index,
}: {
  step: (typeof steps)[number];
  index: number;
}) {
  return (
    <article className={`home-process__card home-process__card--${index + 1}`}>
      <div>
        <Image
          className="home-process__icon"
          src={`/images/process/${step.icon}.svg`}
          alt=""
          width={76}
          height={60}
        />
        <h3>{step.title}</h3>
      </div>
      <p>{step.description}</p>
    </article>
  );
}

export function Process() {
  return (
    <section className="home-process home-bordered-section" id="process">
      <div className="container home-process__container">
        <SectionHeading label="OUR PROCESS" title="From Idea to Execution">
          <p>
            A clear process, thoughtful decisions, and communication at every
            stage.
          </p>
        </SectionHeading>
        <ol className="home-process__steps">
          {steps.map((step, index) => (
            <li
              className={`home-process__step home-process__step--${index + 1}`}
              key={step.title}
            >
              <ProcessCard step={step} index={index} />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
