import { SliceImage } from "@/components/motion/slice-image";
import { detailImageSizes, responsiveImage } from "@/lib/media";
import type { Project } from "@/data/projects";

function ProjectQuote({ quote }: { quote: NonNullable<Project["quote"]> }) {
  return (
    <blockquote className="project-quote">
      <span className="project-quote-symbol" aria-hidden="true">
        ❞
      </span>
      <p>{quote.text}</p>
      <footer>
        {quote.author}
        {quote.role && <span>{quote.role}</span>}
      </footer>
    </blockquote>
  );
}

export function ProjectDetails({ project }: { project: Project }) {
  return (
    <section className="project-detail-section">
      <div className="container project-detail-columns">
        <aside className="project-detail-sidebar">
          <dl className="project-metadata">
            {[
              ["Category", project.category],
              ["Company", project.company],
              ["Industry", project.industry],
              ["Date", project.date],
            ]
              .filter(([, value]) => value)
              .map(([label, value]) => (
                <div key={label}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
          </dl>
          {project.quote && (
            <div className="project-desktop-quote">
              <ProjectQuote quote={project.quote} />
            </div>
          )}
        </aside>
        <div className="project-detail-body">
          <SliceImage
            className="project-detail-cover"
            {...responsiveImage(project.image, detailImageSizes)}
            alt={project.imageAlt ?? `${project.title} screenshot`}
          />
          {project.intro && (
            <p className="project-detail-intro">{project.intro}</p>
          )}
          <ProjectText title="The problem" paragraphs={project.problem} />
          <ProjectText title="What we built" paragraphs={project.solution} />
          {project.gallery && project.gallery.length > 0 && (
            <div className="project-detail-gallery">
              {project.gallery.map((image, index) => (
                <div
                  className="project-gallery-frame"
                  key={`${image}-${index}`}
                >
                  <SliceImage
                    className="project-gallery-slice"
                    {...responsiveImage(image, detailImageSizes)}
                    alt={`${project.title} screenshot ${index + 2}`}
                  />
                </div>
              ))}
            </div>
          )}
          <ProjectText title="The outcome" paragraphs={project.outcome} />
          <div className="project-result-metrics">
            {(project.resultMetrics ?? project.highlights).map((metric) => (
              <span key={metric}>{metric}</span>
            ))}
          </div>
          {project.quote && (
            <div className="project-mobile-quote">
              <ProjectQuote quote={project.quote} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function ProjectText({
  title,
  paragraphs,
}: {
  title: string;
  paragraphs?: string[];
}) {
  if (!paragraphs?.length) return null;

  return (
    <section className="project-detail-text">
      <h2>{title}</h2>
      {paragraphs.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
    </section>
  );
}
