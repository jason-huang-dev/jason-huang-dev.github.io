import { FiArrowUpRight } from "react-icons/fi";

import type { PortfolioProject } from "../../data/projects";
import { TechPill } from "./TechPill";

export type ProjectRippleCardProps = {
  project: PortfolioProject;
  featured?: boolean;
  selected?: boolean;
  onOpen?: (projectId: string) => void;
};

export function ProjectRippleCard({
  project,
  featured = false,
  selected = false,
  onOpen,
}: ProjectRippleCardProps) {
  return (
    <article
      className={`projectRippleCard ${
        featured ? "projectRippleCard--featured" : ""
      } ${selected ? "projectRippleCard--selected" : ""}`}
      data-accent={project.accent ?? "water"}
    >
      <span className="projectRippleCard__ripple" aria-hidden="true" />
      <button
        className="projectRippleCard__button"
        type="button"
        onClick={() => onOpen?.(project.id)}
        aria-label={`Open details for ${project.title}`}
      >
        <span className="projectRippleCard__topline">
          <span>{project.category}</span>
          <span>{project.status}</span>
        </span>
        <span className="projectRippleCard__icon" aria-hidden="true">
          {project.title
            .split(" ")
            .map((word) => word[0])
            .join("")
            .slice(0, 2)}
        </span>
        <span className="projectRippleCard__content">
          <strong>{project.title}</strong>
          <span>{project.shortDescription}</span>
        </span>
        <span className="projectRippleCard__tech">
          {project.techStack.slice(0, featured ? 5 : 4).map((tech) => (
            <TechPill key={tech}>{tech}</TechPill>
          ))}
        </span>
        <span className="projectRippleCard__cta">
          View details <FiArrowUpRight aria-hidden="true" />
        </span>
      </button>
    </article>
  );
}
