import { projects } from "@/data/projects";
import { ProjectCard } from "@/components/projects/project-card";
import { SectionLabel } from "../ui/section-label";
import { SplitText } from "../motion/split-text";
import { ActionLink } from "../ui/action-link";

export function FeaturedWork() {
  const featured = projects.slice(0, 6);

  return (
    <section className="home-work">
      <div className="container">
        <div className="home-work__heading">
          <SectionLabel>
            {featured.some((project) => project.isExample)
              ? "Our work · Template examples"
              : "Our work"}
          </SectionLabel>
          <SplitText text="Featured Works" />
        </div>
        {featured.length > 0 && (
          <div className="home-work__rows">
            {Array.from(
              { length: Math.ceil(featured.length / 2) },
              (_, row) => (
                <div
                  className={`home-work__row home-work__row--${row + 1}`}
                  key={row}
                >
                  {featured.slice(row * 2, row * 2 + 2).map((project) => (
                    <ProjectCard key={project.slug} project={project} />
                  ))}
                </div>
              ),
            )}
          </div>
        )}
        <div className="home-work__action">
          <ActionLink href="/projects" variant="white">
            See all works
          </ActionLink>
        </div>
      </div>
    </section>
  );
}
