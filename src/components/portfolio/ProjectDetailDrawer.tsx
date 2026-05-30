import { useEffect, useRef, type KeyboardEvent } from "react";
import { FiExternalLink, FiX } from "react-icons/fi";

import { getProjectLinks, type PortfolioProject } from "../../data/projects";
import { ProjectArtifactPreview } from "./ProjectArtifactPreview";
import { TechPill } from "./TechPill";
import { ProjectDetailSection } from "./ProjectDetailSection";

export type ProjectDetailDrawerProps = {
  project: PortfolioProject | null;
  open: boolean;
  onClose: () => void;
};

export function ProjectDetailDrawer({
  project,
  open,
  onClose,
}: ProjectDetailDrawerProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLElement>(null);
  const titleId = project ? `project-drawer-title-${project.id}` : undefined;
  const visibleLinks = project ? getProjectLinks(project) : [];

  useEffect(() => {
    if (!open) return undefined;

    const previousActiveElement = document.activeElement as HTMLElement | null;
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.body.classList.add("drawerOpen");
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.classList.remove("drawerOpen");
      document.removeEventListener("keydown", handleKeyDown);
      previousActiveElement?.focus?.();
    };
  }, [open, onClose]);

  if (!open || !project) return null;

  const handlePanelKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key !== "Tab") return;

    const focusableElements = panelRef.current?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])',
    );

    if (!focusableElements?.length) return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (event.shiftKey && document.activeElement === firstElement) {
      event.preventDefault();
      lastElement.focus();
    } else if (!event.shiftKey && document.activeElement === lastElement) {
      event.preventDefault();
      firstElement.focus();
    }
  };

  return (
    <div className="projectDrawer" role="presentation">
      <button
        className="projectDrawer__backdrop"
        type="button"
        aria-label="Close project details"
        onClick={onClose}
      />
      <aside
        ref={panelRef}
        className="projectDrawer__panel"
        data-accent={project.accent ?? "water"}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onKeyDown={handlePanelKeyDown}
      >
        <span className="projectDrawer__accentRail" aria-hidden="true" />
        <div className="projectDrawer__header">
          <div>
            <p className="eyebrow">{project.category}</p>
            <h2 id={titleId}>{project.title}</h2>
          </div>
          <button
            ref={closeButtonRef}
            className="iconButton"
            type="button"
            aria-label="Close project details"
            onClick={onClose}
          >
            <FiX aria-hidden="true" />
          </button>
        </div>

        <p className="projectDrawer__summary">{project.shortDescription}</p>

        {project.image ? (
          <figure className="projectDrawer__media">
            <img
              src={project.image.src}
              alt={project.image.alt}
              loading="lazy"
              decoding="async"
            />
          </figure>
        ) : (
          <ProjectArtifactPreview
            projectId={project.id}
            accent={project.accent}
            variant="drawer"
          />
        )}

        <nav className="projectDrawer__miniNav" aria-label="Project detail sections">
          <a href="#drawer-overview">Overview</a>
          <a href="#drawer-role">Role</a>
          <a href="#drawer-features">Features</a>
          <a href="#drawer-stack">Stack</a>
          {visibleLinks.length > 0 ? <a href="#drawer-links">Links</a> : null}
        </nav>

        <div className="projectDrawer__facts" aria-label="Quick facts">
          <span>
            <strong>Status</strong>
            {project.status}
          </span>
          <span>
            <strong>Role</strong>
            Lead builder
          </span>
          <span>
            <strong>Stack</strong>
            {project.techStack.length} tools
          </span>
        </div>

        <div id="drawer-overview">
          <ProjectDetailSection title="Overview">
          <p>{project.overview}</p>
          </ProjectDetailSection>
        </div>

        <div id="drawer-role">
          <ProjectDetailSection title="My role">
            <p>{project.role}</p>
          </ProjectDetailSection>
        </div>

        <ProjectDetailSection title="Impact">
          <ul>
            {project.impact.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </ProjectDetailSection>

        <div id="drawer-features">
          <ProjectDetailSection title="Key features">
            <ul>
              {project.keyFeatures.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </ProjectDetailSection>
        </div>

        <div id="drawer-stack">
          <ProjectDetailSection title="Tech stack">
            <div className="projectDrawer__pills">
              {project.techStack.map((tech) => (
                <TechPill key={tech}>{tech}</TechPill>
              ))}
            </div>
          </ProjectDetailSection>
        </div>

        {visibleLinks.length > 0 ? (
          <div id="drawer-links">
            <ProjectDetailSection title="Links">
              <div className="projectDrawer__links">
                {visibleLinks.map((link) => (
                  <a key={link.href} href={link.href} target="_blank" rel="noreferrer">
                    {link.label}
                    <FiExternalLink aria-hidden="true" />
                  </a>
                ))}
              </div>
            </ProjectDetailSection>
          </div>
        ) : null}

        <ProjectDetailSection title="Status">
          <p className="projectDrawer__status">{project.status}</p>
        </ProjectDetailSection>
      </aside>
    </div>
  );
}
