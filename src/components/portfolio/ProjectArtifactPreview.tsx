import type { PortfolioProject } from "../../data/projects";

export type ProjectArtifactPreviewProps = {
  projectId: string;
  accent?: PortfolioProject["accent"];
  variant?: "card" | "drawer" | "hero";
};

function artifactBlocks(projectId: string) {
  switch (projectId) {
    case "ui-library":
      return ["token", "theme", "button", "surface", "docs"];
    case "chemfarm":
      return ["parser", "plants", "assets", "rls", "health"];
    case "timemesh":
      return ["calendar", "api", "index", "ci", "goals"];
    case "dockflow":
      return ["dash", "table", "status", "orders", "roles"];
    case "video-automation-pipeline":
      return ["script", "audio", "caption", "render", "qa"];
    default:
      return ["routes", "seo", "brand", "deploy", "data"];
  }
}

export function ProjectArtifactPreview({
  projectId,
  accent = "water",
  variant = "card",
}: ProjectArtifactPreviewProps) {
  return (
    <div
      className={`projectArtifactPreview projectArtifactPreview--${variant}`}
      data-project={projectId}
      data-accent={accent ?? "water"}
      aria-hidden="true"
    >
      <div className="projectArtifactPreview__chrome">
        <span />
        <span />
        <span />
      </div>
      <div className="projectArtifactPreview__body">
        {artifactBlocks(projectId).map((block, index) => (
          <span
            key={block}
            className={`projectArtifactPreview__block projectArtifactPreview__block--${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
