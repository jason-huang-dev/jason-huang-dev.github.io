import { useCallback, useMemo, useState } from "react";

import { projects } from "../../data/projects";
import { ProjectDetailDrawer } from "../portfolio/ProjectDetailDrawer";
import { ProjectRippleCard } from "../portfolio/ProjectRippleCard";
import { YinYangProjectScene } from "../portfolio/YinYangProjectScene";
import { Container } from "../ui/Container";

export function WorkSection() {
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const featuredProject =
    projects.find((project) => project.featured) ?? projects[0] ?? null;
  const remainingProjects = featuredProject
    ? projects.filter((project) => project.id !== featuredProject.id)
    : projects;
  const selectedProject = useMemo(
    () => projects.find((project) => project.id === selectedProjectId) ?? null,
    [selectedProjectId],
  );
  const closeDrawer = useCallback(() => setSelectedProjectId(null), []);

  return (
    <section id="work" className="workSection">
      <Container>
        <div className="sectionHeading">
          <p className="eyebrow">Case studies</p>
          <h2>Work in Motion</h2>
          <p>
            One featured build gets a deeper branded interaction. The rest stay
            clean, scannable, and easy to open.
          </p>
        </div>

        {featuredProject ? (
          <YinYangProjectScene
            project={featuredProject}
            mode="dark"
            onOpen={setSelectedProjectId}
          />
        ) : null}

        <div className="rippleWorkGrid" aria-label="Additional projects">
          {remainingProjects.map((project) => (
            <ProjectRippleCard
              key={project.id}
              project={project}
              selected={selectedProjectId === project.id}
              onOpen={setSelectedProjectId}
            />
          ))}
        </div>
      </Container>
      <ProjectDetailDrawer
        project={selectedProject}
        open={Boolean(selectedProject)}
        onClose={closeDrawer}
      />
    </section>
  );
}
