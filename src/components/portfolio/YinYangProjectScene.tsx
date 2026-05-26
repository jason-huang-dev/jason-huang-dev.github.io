import { FiArrowUpRight } from "react-icons/fi";
import { Link } from "react-router-dom";

import type { PortfolioProject } from "../../data/projects";
import { brandAssets, yinyangAssetsByMode } from "../../data/brandAssets";
import { TechPill } from "./TechPill";

export type YinYangProjectSceneMode = "light" | "dark";

export type YinYangProjectSceneProps = {
  project: PortfolioProject;
  mode?: YinYangProjectSceneMode;
  defaultOpen?: boolean;
  onOpen?: (projectId: string) => void;
  className?: string;
};

export function YinYangProjectScene({
  project,
  mode = "dark",
  defaultOpen = false,
  onOpen,
  className = "",
}: YinYangProjectSceneProps) {
  const assets = yinyangAssetsByMode[mode];
  const initials = project.title
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2);

  return (
    <section
      className={`yinYangProjectScene ${className}`}
      data-mode={mode}
      data-open={defaultOpen ? "true" : "false"}
      aria-labelledby={`project-scene-${project.id}`}
    >
      <div className="yinYangProjectScene__frame">
        <Link
          to={`/work/${project.slug}`}
          className="yinYangProjectScene__trigger"
          onClick={() => onOpen?.(project.id)}
          aria-label={`Read case study for ${project.title}`}
        >
          <span className="yinYangProjectScene__assetStage" aria-hidden="true">
            <img
              className="yinYangProjectScene__half yinYangProjectScene__half--left"
              src={assets.left}
              alt=""
              width="768"
              height="768"
              loading="eager"
              decoding="async"
            />
            <img
              className="yinYangProjectScene__half yinYangProjectScene__half--right"
              src={assets.right}
              alt=""
              width="768"
              height="768"
              loading="eager"
              decoding="async"
            />
            <span className="yinYangProjectScene__watermark">
              <img
                className="yinYangProjectScene__seal"
                src={brandAssets.seal}
                alt=""
                width="768"
                height="768"
                loading="eager"
                decoding="async"
              />
              <img
                className="yinYangProjectScene__emblem"
                src={assets.emblem}
                alt=""
                width="768"
                height="768"
                loading="eager"
                decoding="async"
              />
            </span>
          </span>

          <span className="yinYangProjectScene__closedLabel">
            <span className="eyebrow">{project.category}</span>
            <span className="yinYangProjectScene__closedTitle">
              {project.title}
            </span>
            <span>Unlock featured project</span>
          </span>

          <span className="yinYangProjectScene__content">
            <span className="eyebrow">{project.category}</span>
            <span
              id={`project-scene-${project.id}`}
              className="yinYangProjectScene__title"
            >
              {project.title}
            </span>
            <span className="yinYangProjectScene__summary">
              {project.shortDescription}
            </span>
            <span className="yinYangProjectScene__role">{project.role}</span>
            <span className="yinYangProjectScene__tech">
              {project.techStack.slice(0, 5).map((tech) => (
                <TechPill key={tech}>{tech}</TechPill>
              ))}
            </span>
          <span className="yinYangProjectScene__cta">
              Read case study <FiArrowUpRight aria-hidden="true" />
            </span>
          </span>

          <span className="yinYangProjectScene__preview" aria-hidden="true">
            {project.image?.src ? (
              <img src={project.image.src} alt="" loading="lazy" decoding="async" />
            ) : (
              <span className="yinYangProjectScene__mock">
                <span className="yinYangProjectScene__mockTop">
                  <span />
                  <span />
                  <span />
                  <span className="yinYangProjectScene__mockTitle">Component System</span>
                </span>
                <span className="yinYangProjectScene__mockBody">
                  <span className="yinYangProjectScene__mockHero">
                    <span className="yinYangProjectScene__mockBadge">{initials}</span>
                    <span className="yinYangProjectScene__mockRows">
                      <span className="yinYangProjectScene__mockLine yinYangProjectScene__mockLine--active" />
                      <span className="yinYangProjectScene__mockLine yinYangProjectScene__mockLine--wide" />
                      <span className="yinYangProjectScene__mockLine" />
                    </span>
                  </span>
                  <span className="yinYangProjectScene__mockGrid">
                    <span>
                      <span />
                      <span />
                    </span>
                    <span>
                      <span />
                      <span />
                    </span>
                    <span>
                      <span />
                      <span />
                    </span>
                  </span>
                </span>
              </span>
            )}
          </span>
        </Link>
      </div>
    </section>
  );
}
