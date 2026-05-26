import type { CSSProperties } from "react";

import type { PortfolioProject } from "../../data/projects";

export type ProjectPearlDockProps = {
  projects: PortfolioProject[];
  selectedProjectId?: string | null;
  onSelect: (projectId: string) => void;
  layout?: "arc" | "row" | "constellation";
};

export function ProjectPearlDock({
  projects,
  selectedProjectId,
  onSelect,
  layout = "arc",
}: ProjectPearlDockProps) {
  return (
    <div
      className={`projectPearlDock projectPearlDock--${layout}`}
      aria-label="Project quick selector"
    >
      {projects.map((project, index) => (
        <button
          key={project.id}
          type="button"
          className="projectPearlDock__item"
          data-accent={project.accent ?? "water"}
          data-active={selectedProjectId === project.id ? "true" : undefined}
          style={{ "--pearl-index": index } as CSSProperties}
          onClick={() => onSelect(project.id)}
          aria-label={`Open ${project.title}`}
          aria-pressed={selectedProjectId === project.id}
        >
          <span className="projectPearlDock__pearl">
            {project.title
              .split(" ")
              .map((word) => word[0])
              .join("")
              .slice(0, 2)}
          </span>
          <span className="projectPearlDock__label">{project.title}</span>
        </button>
      ))}
    </div>
  );
}
