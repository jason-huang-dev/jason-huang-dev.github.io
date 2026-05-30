import type { CSSProperties } from "react";

import type { PortfolioProject } from "../../data/projects";

export type ProjectPearlDockProps = {
  projects: PortfolioProject[];
  selectedProjectId?: string | null;
  featuredProjectId?: string | null;
  onSelect: (projectId: string) => void;
  layout?: "arc" | "row" | "constellation";
};

export function ProjectPearlDock({
  projects,
  selectedProjectId,
  featuredProjectId,
  onSelect,
  layout = "arc",
}: ProjectPearlDockProps) {
  return (
    <div
      className={`projectPearlDock projectPearlDock--${layout}`}
      aria-label="Project quick selector"
    >
      {projects.map((project, index) => {
        const isActive = selectedProjectId === project.id;
        const isFeatured = featuredProjectId === project.id || project.featured;

        return (
          <button
            key={project.id}
            type="button"
            className="projectPearlDock__item"
            data-accent={project.accent ?? "water"}
            data-active={isActive ? "true" : undefined}
            data-featured={isFeatured ? "true" : undefined}
            style={{ "--pearl-index": index } as CSSProperties}
            onClick={() => onSelect(project.id)}
            aria-label={`Open ${project.title}${isFeatured ? " featured project" : ""}`}
            aria-pressed={isActive}
          >
            <span className="projectPearlDock__pearl">
              {project.image ? (
                <img
                  src={project.image.src}
                  alt=""
                  aria-hidden="true"
                  className="projectPearlDock__image"
                />
              ) : (
                project.title
                  .split(" ")
                  .map((word) => word[0])
                  .join("")
                  .slice(0, 2)
              )}
            </span>
            <span className="projectPearlDock__label">
              {project.title}
              {isFeatured ? (
                <span className="projectPearlDock__featuredLabel">Featured</span>
              ) : null}
            </span>
          </button>
        );
      })}
    </div>
  );
}