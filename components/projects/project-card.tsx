import { SliceImage } from "@/components/motion/slice-image";
import Link from "next/link";
import type { Project } from "@/data/projects";
import { cardImageSizes, responsiveImage } from "@/lib/media";

export function ProjectCard({
  project,
  className = "",
}: {
  project: Project;
  className?: string;
}) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className={`project-card ${className}`}
    >
      <div className="project-card-image">
        <SliceImage
          {...responsiveImage(project.image, cardImageSizes)}
          alt={project.imageAlt ?? `${project.title} screenshot`}
          className="project-card-slice"
        />
        <div className="project-card-metrics">
          {project.highlights.map((highlight) => (
            <span key={highlight}>{highlight}</span>
          ))}
        </div>
      </div>
      <div className="project-card-caption">
        <div>
          <p>
            {project.category}
            {project.isExample && " · Template example"}
          </p>
          <h3>{project.title}</h3>
        </div>
        <span className="project-card-arrow" aria-hidden="true">
          ↗
        </span>
      </div>
    </Link>
  );
}
