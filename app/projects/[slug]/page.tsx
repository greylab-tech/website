import { CallToAction } from "@/components/layout/cta";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects, getProject } from "@/data/projects";
import { InternalHero } from "@/components/projects/internal-hero";
import { ProjectDetails } from "@/components/projects/project-details";
import { ProjectCard } from "@/components/projects/project-card";
import { SectionLabel } from "@/components/ui/section-label";

export const dynamicParams = false;

const exampleDescription = "Example case study from the Atlas site template.";

export function generateStaticParams() {
  // A static export needs a path to build until the first project is published.
  return projects.length
    ? projects.map(({ slug }) => ({ slug }))
    : [{ slug: "__unpublished__" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  return {
    title: project?.title ?? "Project",
    description: project?.isExample ? exampleDescription : project?.intro,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const related = projects
    .filter((item) => item.slug !== project.slug)
    .slice(0, 2);
  return (
    <main id="main-content" className="internal-page project-page">
      <InternalHero
        title={project.title}
        description={project.isExample ? exampleDescription : undefined}
        detail
      />
      <ProjectDetails project={project} />
      {related.length > 0 && (
        <section className="project-related-section">
          <div className="container">
            <SectionLabel>OUR WORK</SectionLabel>
            <h2>More Projects</h2>
            <div className="project-related-grid">
              {related.map((item) => (
                <ProjectCard key={item.slug} project={item} />
              ))}
            </div>
          </div>
        </section>
      )}
      <CallToAction />
    </main>
  );
}
