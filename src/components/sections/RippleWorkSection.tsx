import { useCallback, useMemo, useState } from "react";

import { projects } from "../../data/projects";
import { ProjectDetailDrawer } from "../portfolio/ProjectDetailDrawer";
import { ProjectRippleCard } from "../portfolio/ProjectRippleCard";
import { Container } from "../ui/Container";

export function RippleWorkSection() {
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const selectedProject = useMemo(
    () => projects.find((project) => project.id === selectedProjectId) ?? null,
    [selectedProjectId],
  );
  const closeDrawer = useCallback(() => setSelectedProjectId(null), []);

  return (
    <section id="work" className="rippleWorkSection">
      <Container>
        <div className="sectionHeading">
          <p className="eyebrow">Case studies</p>
          <h2>Work in Motion</h2>
          <p>
            Projects that ripple outward from design, engineering, and product
            thinking.
          </p>
        </div>
        <div className="rippleWorkGrid">
          {projects.map((project) => (
            <ProjectRippleCard
              key={project.id}
              project={project}
              featured={project.featured}
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
