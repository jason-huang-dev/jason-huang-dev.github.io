import { useCallback, useMemo, useState } from "react";

import { getProjectLinks, projects } from "../../data/projects";
import { ProjectDetailDrawer } from "../portfolio/ProjectDetailDrawer";
import { ProjectFilterChips } from "../portfolio/ProjectFilterChips";
import { ProjectPearlDock } from "../portfolio/ProjectPearlDock";
import { YinYangProjectScene } from "../portfolio/YinYangProjectScene";
import { SignatureProjectCard } from "../projects/SignatureProjectCard";
import { Container } from "../ui/Container";
import { Reveal } from "../ui/Reveal";

const allFilter = "All";
const accentMap = {
  water: "blue",
  gold: "gold",
  jade: "balanced",
  neutral: "balanced",
} as const;

export function WorkSection() {
  const [activeFilter, setActiveFilter] = useState(allFilter);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const filters = useMemo(
    () => [allFilter, ...Array.from(new Set(projects.map((project) => project.category)))],
    [],
  );
  const filteredProjects = useMemo(
    () =>
      activeFilter === allFilter
        ? projects
        : projects.filter((project) => project.category === activeFilter),
    [activeFilter],
  );
  const featuredProject =
    filteredProjects.find((project) => project.featured) ??
    filteredProjects[0] ??
    null;
  const remainingProjects = featuredProject
    ? filteredProjects.filter((project) => project.id !== featuredProject.id)
    : filteredProjects;
  const selectedProject = useMemo(
    () => projects.find((project) => project.id === selectedProjectId) ?? null,
    [selectedProjectId],
  );
  const closeDrawer = useCallback(() => setSelectedProjectId(null), []);

  return (
    <section id="work" className="workSection">
      <Container>
        <Reveal className="sectionHeading">
          <p className="eyebrow">Case studies</p>
          <h2>Selected product systems.</h2>
          <p>
            Selected projects that show how I design, build, and ship product
            systems — from backend APIs and data models to automation workflows,
            internal tools, and user-facing applications.
          </p>
        </Reveal>

        <ProjectFilterChips
          filters={filters}
          activeFilter={activeFilter}
          resultCount={filteredProjects.length}
          onChange={setActiveFilter}
        />

        <ProjectPearlDock
          projects={filteredProjects}
          selectedProjectId={selectedProjectId}
          featuredProjectId={featuredProject?.id}
          onSelect={setSelectedProjectId}
        />

        {featuredProject ? (
          <Reveal>
            <YinYangProjectScene
              project={featuredProject}
              mode="dark"
              onOpen={setSelectedProjectId}
            />
          </Reveal>
        ) : (
          <div className="workSection__empty">
            No projects match this filter yet. Try viewing all work.
          </div>
        )}

        <Reveal className="signatureProjectGrid" aria-label="Additional projects">
          {remainingProjects.map((project) => (
            <SignatureProjectCard
              key={project.id}
              title={project.title}
              eyebrow={`${project.category} / ${project.status}`}
              description={project.shortDescription}
              tags={project.techStack}
              href={`/work/${project.slug}`}
              githubHref={getProjectLinks(project).find((link) => link.type === "github")?.href}
              demoHref={getProjectLinks(project).find((link) => link.type === "demo")?.href}
              impacts={project.impact}
              imageSrc={project.image?.src}
              imageAlt={project.image?.alt}
              accent={accentMap[project.accent ?? "water"]}
            />
          ))}
        </Reveal>
      </Container>
      <ProjectDetailDrawer
        project={selectedProject}
        open={Boolean(selectedProject)}
        onClose={closeDrawer}
      />
    </section>
  );
}
