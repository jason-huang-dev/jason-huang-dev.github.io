import { FiArrowUpRight } from "react-icons/fi";

import type { PortfolioProject } from "../../data/projects";
import { BrandAsset } from "../brand/BrandAsset";
import { TechPill } from "./TechPill";

export type FeaturedYinYangProjectProps = {
  project: PortfolioProject;
  onOpen?: (projectId: string) => void;
};

export function FeaturedYinYangProject({
  project,
  onOpen,
}: FeaturedYinYangProjectProps) {
  return (
    <section
      className="featuredProject"
      aria-labelledby={`featured-${project.id}`}
    >
      <button
        type="button"
        className="featuredProject__button"
        onClick={() => onOpen?.(project.id)}
        aria-label={`Open details for featured project ${project.title}`}
      >
        <span className="featuredProject__rings" aria-hidden="true" />
        <span className="featuredProject__medallion" aria-hidden="true">
          <BrandAsset id="yinyangEmblem" decorative />
        </span>

        <span className="featuredProject__default">
          <span className="eyebrow">{project.category}</span>
          <span id={`featured-${project.id}`} className="featuredProject__title">
            {project.title}
          </span>
          <span className="featuredProject__meta">Featured Project</span>
        </span>

        <span className="featuredProject__partition featuredProject__partition--left">
          <span className="eyebrow">{project.category}</span>
          <span className="featuredProject__panelTitle">{project.title}</span>
          <span className="featuredProject__summary">
            {project.shortDescription}
          </span>
          <span className="featuredProject__role">{project.role}</span>
          <span className="featuredProject__tech">
            {project.techStack.slice(0, 3).map((tech) => (
              <TechPill key={tech}>{tech}</TechPill>
            ))}
          </span>
        </span>

        <span className="featuredProject__partition featuredProject__partition--right">
          <span className="featuredProject__preview">
            <span className="featuredProject__previewHeader">
              <span />
              <span />
              <span />
            </span>
            <span className="featuredProject__previewBody">
              <span className="featuredProject__previewLine featuredProject__previewLine--wide" />
              <span className="featuredProject__previewLine" />
              <span className="featuredProject__previewGrid">
                <span />
                <span />
                <span />
              </span>
            </span>
          </span>
          <span className="featuredProject__cta">
            View details <FiArrowUpRight aria-hidden="true" />
          </span>
        </span>
      </button>
    </section>
  );
}
