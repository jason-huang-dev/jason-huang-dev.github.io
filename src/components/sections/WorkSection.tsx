import { useCallback, useMemo, useState } from "react";

import { projects } from "../../data/projects";
import { ProjectDetailDrawer } from "../portfolio/ProjectDetailDrawer";
import { ProjectFilterChips } from "../portfolio/ProjectFilterChips";
import { ProjectPearlDock } from "../portfolio/ProjectPearlDock";
import { ProjectRippleCard } from "../portfolio/ProjectRippleCard";
import { YinYangProjectScene } from "../portfolio/YinYangProjectScene";
import { Container } from "../ui/Container";
import { Reveal } from "../ui/Reveal";

const allFilter = "All";

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
          <h2>Work in Motion</h2>
          <p>
            One featured build gets a deeper branded interaction. The rest stay
            clean, scannable, and easy to open.
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

        <Reveal className="rippleWorkGrid" aria-label="Additional projects">
          {remainingProjects.map((project) => (
            <ProjectRippleCard
              key={project.id}
              project={project}
              selected={selectedProjectId === project.id}
              onOpen={setSelectedProjectId}
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
