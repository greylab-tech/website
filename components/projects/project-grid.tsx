import type { Project } from "@/data/projects";
import { ProjectCard } from "./project-card";

export function ProjectGrid({ projects: items }: { projects: Project[] }) {
  return (
    <div className="project-editorial-grid">
      {Array.from({ length: Math.ceil(items.length / 2) }, (_, row) => (
        <div
          className={`project-editorial-row project-editorial-row--${row % 3}`}
          key={row}
        >
          {items.slice(row * 2, row * 2 + 2).map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      ))}
    </div>
  );
}
