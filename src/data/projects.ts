import { dockflow, chemfarm, timemesh, shorts, uiLibrary } from "../assets";

export type ProjectStatus = "featured" | "active" | "archive" | "private";
export type DemoStatus = "verified" | "pending" | "disabled";

export type ProjectLink = {
  label: string;
  href: string;
  type: "demo" | "github" | "case-study" | "video" | "external";
};

export type PortfolioProject = {
  id: string;
  name: string;
  title: string;
  shortName?: string;
  slug: string;
  category: "Featured Systems" | "Product & Automation" | "Earlier / Supporting Work";
  categoryKey: "featured-systems" | "product-automation" | "supporting-work";
  status: ProjectStatus;
  featured?: boolean;
  summary: string;
  shortDescription: string;
  overview: string;
  role: string;
  impact: string[];
  techStack: string[];
  stack: string[];
  keyFeatures: string[];
  repoUrl?: string;
  demoUrl?: string;
  demoStatus: DemoStatus;
  demoLabel?: string;
  imageKey?: string;
  isPresentable: boolean;
  accent?: "water" | "gold" | "jade" | "neutral";
  image?: {
    src: string;
    alt: string;
  };
};

export function getProjectLinks(project: PortfolioProject): ProjectLink[] {
  const links: ProjectLink[] = [];

  if (project.repoUrl) {
    links.push({ label: "Source", href: project.repoUrl, type: "github" });
  }

  if (project.demoUrl && project.demoStatus === "verified") {
    links.push({
      label: project.demoLabel ?? "Live Demo",
      href: project.demoUrl,
      type: "demo",
    });
  }

  return links;
}

export const projects: PortfolioProject[] = [
  {
    id: "dockflow",
    name: "DockFlow",
    title: "DockFlow",
    slug: "dockflow",
    category: "Featured Systems",
    categoryKey: "featured-systems",
    status: "active",
    featured: false,
    summary:
      "Warehouse operations platform with modular Django REST APIs for inventory, inbound/outbound workflows, returns, logistics, work orders, reporting, automation, and marketplace integrations.",
    shortDescription:
      "Warehouse operations platform with modular Django REST APIs for inventory, inbound/outbound workflows, returns, logistics, work orders, reporting, automation, and marketplace integrations.",
    overview:
      "DockFlow is a warehouse management and operations platform with a modular Django REST backend across authentication, IAM, inventory, inbound/outbound workflows, returns, logistics, fees, work orders, reporting, automation, and marketplace integrations.",
    role:
      "Built backend domain boundaries, API compatibility paths, automation reliability patterns, and operations-oriented product workflows.",
    impact: [
      "Built modular backend boundaries across 20+ Django app domains.",
      "Preserved API compatibility across versioned and legacy route groups.",
      "Instrumented automation reliability with scheduled jobs, worker heartbeats, retries, dead-letter states, and alerts.",
    ],
    techStack: ["Django REST Framework", "React", "PostgreSQL", "CI/CD"],
    stack: ["Django REST Framework", "React", "PostgreSQL", "CI/CD"],
    keyFeatures: [
      "Modular API domains for warehouse operations",
      "Versioned and legacy route compatibility",
      "Scheduled jobs, worker heartbeats, retries, and alert records",
    ],
    demoUrl: "https://dockflow.thejasonhuang.com",
    demoStatus: "pending",
    isPresentable: true,
    accent: "jade",
    image: {
      src: dockflow,
      alt: "DockFlow project preview",
    },
  },
  {
    id: "chemfarm",
    name: "ChemFarm",
    title: "ChemFarm",
    slug: "chemfarm",
    category: "Featured Systems",
    categoryKey: "featured-systems",
    status: "featured",
    featured: true,
    summary:
      "Game-powered STEM learning platform that turns curriculum data into playable learning content through FastAPI services, Supabase-backed storage, and validated ingestion workflows.",
    shortDescription:
      "Game-powered STEM learning platform that turns curriculum data into playable learning content through FastAPI services, Supabase-backed storage, and validated ingestion workflows.",
    overview:
      "ChemFarm connects curriculum data, gameplay metadata, asset storage, and ingestion tooling so STEM content can move from structured source data into playable learning experiences.",
    role:
      "Implemented backend routers, ingestion workflows, Supabase-backed data access, and validation paths for content updates.",
    impact: [
      "Implemented backend routers for gameplay metadata, rendering, asset storage, ingestion, tooling, health checks, and plant generation.",
      "Converted manual content updates into a parser-based ingestion workflow with dry-run validation and normalized writes.",
      "Designed around Supabase-backed data access and write controls.",
    ],
    techStack: ["FastAPI", "Supabase", "PostgreSQL", "RLS/RPC", "ETL"],
    stack: ["FastAPI", "Supabase", "PostgreSQL", "RLS/RPC", "ETL"],
    keyFeatures: [
      "Gameplay and rendering metadata APIs",
      "Parser-based ingestion with dry-run validation",
      "Supabase-backed storage and write controls",
    ],
    demoUrl: "https://chemfarm.thejasonhuang.com",
    demoStatus: "pending",
    isPresentable: true,
    accent: "water",
    image: {
      src: chemfarm,
      alt: "ChemFarm project preview",
    },
  },
  {
    id: "timemesh",
    name: "TimeMesh",
    title: "TimeMesh",
    slug: "timemesh",
    category: "Featured Systems",
    categoryKey: "featured-systems",
    status: "featured",
    featured: true,
    summary:
      "Productivity SaaS platform for scheduling workflows, calendar events, and goal planning.",
    shortDescription:
      "Productivity SaaS platform for scheduling workflows, calendar events, and goal planning.",
    overview:
      "TimeMesh is a scheduling and goal-planning SaaS project spanning frontend workflows, Django REST APIs, PostgreSQL data design, deployment, and regression checks.",
    role:
      "Built calendar-oriented product workflows across frontend, backend, database, deployment, and CI layers.",
    impact: [
      "Reduced median API latency from roughly 83ms to 25ms through PostgreSQL indexing and DRF query rewrites.",
      "Moved Postman regression suites into GitHub Actions to shorten CI/runtime feedback loops.",
      "Built calendar-oriented product workflows across frontend, backend, database, and deployment layers.",
    ],
    techStack: ["React", "Django REST Framework", "PostgreSQL", "AWS", "Docker", "GitHub Actions"],
    stack: ["React", "Django REST Framework", "PostgreSQL", "AWS", "Docker", "GitHub Actions"],
    keyFeatures: [
      "Calendar and goal-planning workflows",
      "PostgreSQL indexing and DRF query rewrites",
      "Postman regression suites in GitHub Actions",
    ],
    demoUrl: "https://timemesh.thejasonhuang.com",
    demoStatus: "pending",
    isPresentable: true,
    accent: "gold",
    image: {
      src: timemesh,
      alt: "TimeMesh project preview",
    },
  },
  {
    id: "ui-library",
    name: "UI Library",
    title: "UI Library",
    slug: "ui-library",
    category: "Product & Automation",
    categoryKey: "product-automation",
    status: "active",
    summary:
      "Reusable interface system for building consistent, polished components across personal products and portfolio experiments.",
    shortDescription:
      "Reusable interface system for building consistent, polished components across personal products and portfolio experiments.",
    overview:
      "A reusable React interface system for shared primitives, branded components, Storybook examples, and visual consistency across product frontends.",
    role:
      "Designed reusable UI primitives, theme patterns, component examples, and documentation-minded frontend foundations.",
    impact: [
      "Centralizes reusable UI primitives and branded components.",
      "Supports faster iteration across project frontends.",
      "Provides a foundation for portfolio and product visual consistency.",
    ],
    techStack: ["React", "TypeScript", "Storybook", "Tailwind/CSS"],
    stack: ["React", "TypeScript", "Storybook", "Tailwind/CSS"],
    keyFeatures: [
      "Reusable UI primitives and branded components",
      "Storybook documentation surface",
      "Shared visual foundation for product frontends",
    ],
    repoUrl: "https://github.com/jason-huang-dev/UI-Library",
    demoUrl: "https://ui.thejasonhuang.com",
    demoStatus: "pending",
    isPresentable: true,
    accent: "water",
    image: {
      src: uiLibrary,
      alt: "UI Library project preview",
    },
  },
  {
    id: "video-automation-pipeline",
    name: "Video Automation Pipeline",
    title: "Video Automation Pipeline",
    slug: "video-automation-pipeline",
    category: "Product & Automation",
    categoryKey: "product-automation",
    status: "active",
    summary:
      "Repeatable script-to-video workflow that packages prompts, scripts, audio, captions, storyboards, render assets, QA reports, upload metadata, and logs into production artifacts.",
    shortDescription:
      "Repeatable script-to-video workflow that packages prompts, scripts, audio, captions, storyboards, render assets, QA reports, upload metadata, and logs into production artifacts.",
    overview:
      "A production-oriented automation workflow for turning content inputs into renderable video artifacts, QA outputs, upload metadata, and traceable logs.",
    role:
      "Organized generation, rendering, QA, metadata, and handoff stages into repeatable command-driven artifacts.",
    impact: [
      "Organized a multi-stage video workflow into repeatable artifacts.",
      "Reduced manual handoff risk by standardizing file outputs and QA checkpoints.",
      "Supports content production systems such as The Stock Showdown.",
    ],
    techStack: ["Python", "Makefile", "Remotion", "n8n"],
    stack: ["Python", "Makefile", "Remotion", "n8n"],
    keyFeatures: [
      "Script, audio, caption, and storyboard artifacts",
      "Render assets, QA reports, upload metadata, and logs",
      "Repeatable Makefile-driven workflow",
    ],
    demoStatus: "disabled",
    isPresentable: true,
    accent: "neutral",
    image: {
      src: shorts,
      alt: "Shorts project preview",
    },
  },
];
