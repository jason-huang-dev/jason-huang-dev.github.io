import { FiArrowUpRight } from "react-icons/fi";
import { Link } from "react-router-dom";

import type { PortfolioProject } from "../../data/projects";
import { usePointerGlow } from "../../hooks/usePointerGlow";
import { ProjectArtifactPreview } from "./ProjectArtifactPreview";
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
  const ref = usePointerGlow<HTMLElement>();

  return (
    <article
      ref={ref}
      className={`projectRippleCard ${
        featured ? "projectRippleCard--featured" : ""
      } ${selected ? "projectRippleCard--selected" : ""}`}
      data-accent={project.accent ?? "water"}
    >
      <span className="projectRippleCard__ripple" aria-hidden="true" />
      <Link
        className="projectRippleCard__button"
        to={`/work/${project.slug}`}
        onClick={() => onOpen?.(project.id)}
        aria-label={`Read case study for ${project.title}`}
      >
        <span className="projectRippleCard__topline">
          <span>{project.category}</span>
          <span>{project.status}</span>
        </span>
        <ProjectArtifactPreview
          projectId={project.id}
          accent={project.accent}
          variant="card"
        />
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
          Read case study <FiArrowUpRight aria-hidden="true" />
        </span>
      </Link>
    </article>
  );
}
