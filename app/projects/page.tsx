import { CallToAction } from "@/components/layout/cta";
import type { Metadata } from "next";
import { projects } from "@/data/projects";
import { InternalHero } from "@/components/projects/internal-hero";
import { ProjectGrid } from "@/components/projects/project-grid";

const description = projects.some((project) => project.isExample)
  ? "Explore Atlas template project examples, including sample results."
  : "Explore the software and products we've built at GreyLab.";

export const metadata: Metadata = {
  title: "Projects",
  description,
};

export default function ProjectsPage() {
  return (
    <main id="main-content" className="internal-page projects-page">
      <InternalHero title="Projects" description={description} />
      <section className="projects-index-section">
        <div className="container">
          {projects.length > 0 ? (
            <ProjectGrid projects={projects} />
          ) : (
            <p className="collection-empty">
              Project case studies are coming soon.
            </p>
          )}
        </div>
      </section>
      <CallToAction />
    </main>
  );
}
