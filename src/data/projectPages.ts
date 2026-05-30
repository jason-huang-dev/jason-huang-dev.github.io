import type { PortfolioProject } from "./projects";

export type ProjectMetric = {
  label: string;
  value: string;
  description?: string;
};

export type ProjectDecision = {
  title: string;
  context: string;
  decision: string;
  result?: string;
};

export type ProjectPage = {
  slug: PortfolioProject["slug"];
  subtitle: string;
  heroKicker: string;
  problem: string;
  constraints: string[];
  approach: string[];
  architecture?: {
    summary: string;
    bullets: string[];
  };
  uxDecisions: ProjectDecision[];
  metrics: ProjectMetric[];
  lessons: string[];
  nextSteps: string[];
};

export const projectPages: ProjectPage[] = [
  {
    slug: "dockflow",
    heroKicker: "Featured backend system",
    subtitle:
      "Warehouse operations platform with modular Django REST APIs for inventory, workflows, reporting, automation, and marketplace integrations.",
    problem:
      "Warehouse operations need clear service boundaries across inventory, inbound and outbound work, returns, logistics, fees, work orders, reporting, automation, and integrations.",
    constraints: [
      "Keep domain modules separate enough to change without breaking adjacent workflows.",
      "Preserve API compatibility across versioned and legacy route groups.",
      "Make automation failures visible through retries, dead-letter states, and alerts.",
    ],
    approach: [
      "Modeled backend boundaries around operational domains instead of screen-level features.",
      "Maintained compatibility paths while evolving newer API groups.",
      "Added scheduled task and worker-health patterns for operational reliability.",
    ],
    architecture: {
      summary:
        "DockFlow is structured around modular Django app domains connected by explicit API contracts and operational automation paths.",
      bullets: [
        "Authentication and IAM establish access boundaries.",
        "Inventory, inbound, outbound, returns, and logistics own core warehouse state.",
        "Reporting and marketplace integrations expose operational outputs.",
        "Scheduled jobs, heartbeats, retries, dead-letter states, and alerts support automation reliability.",
      ],
    },
    uxDecisions: [
      {
        title: "Domain-first boundaries",
        context:
          "Warehouse platforms accumulate complexity quickly when every feature shares the same service surface.",
        decision:
          "Separated backend work by operational domain so APIs, permissions, and workflows stay easier to reason about.",
        result:
          "The project demonstrates backend ownership across a broad operations surface without relying on vague platform claims.",
      },
      {
        title: "Compatibility before churn",
        context:
          "Operational systems often need legacy and new route groups to coexist during migration.",
        decision:
          "Preserved API compatibility while adding versioned paths for newer behavior.",
        result:
          "Clients can keep working while backend contracts evolve.",
      },
    ],
    metrics: [
      {
        label: "Backend scope",
        value: "20+ domains",
        description: "Django app boundaries across warehouse operations.",
      },
      {
        label: "API model",
        value: "Versioned",
        description: "Compatibility across newer and legacy route groups.",
      },
      {
        label: "Reliability",
        value: "Instrumented",
        description: "Worker heartbeats, retries, dead-letter states, and alerts.",
      },
    ],
    lessons: [
      "Backend boundaries need to follow real operational ownership, not only frontend navigation.",
      "Reliability work matters most when failure states become visible and recoverable.",
    ],
    nextSteps: [
      "Verify and publish the public demo before exposing a demo link.",
      "Add project screenshots or architecture diagrams for deeper case-study proof.",
    ],
  },
  {
    slug: "chemfarm",
    heroKicker: "Featured learning system",
    subtitle:
      "Game-powered STEM learning platform using FastAPI services, Supabase-backed storage, PostgreSQL, and validated ingestion workflows.",
    problem:
      "Curriculum content needs reliable ingestion and normalized storage before it can become playable learning content.",
    constraints: [
      "Support content updates without relying on manual database edits.",
      "Validate parser output before writes affect the learning experience.",
      "Keep storage and data access practical for a Supabase-backed system.",
    ],
    approach: [
      "Built FastAPI routers for metadata, rendering, asset storage, ingestion, tooling, health checks, and plant generation.",
      "Converted manual updates into parser-based ingestion with dry-run validation.",
      "Designed data access around Supabase-backed storage and write controls.",
    ],
    architecture: {
      summary:
        "ChemFarm separates ingestion, validation, gameplay metadata, generated assets, and storage controls so curriculum data can become playable content.",
      bullets: [
        "FastAPI routers expose gameplay and tooling endpoints.",
        "Parser workflows validate source content before normalized writes.",
        "Supabase and PostgreSQL store content and access-controlled records.",
        "Health checks and generation endpoints support operational visibility.",
      ],
    },
    uxDecisions: [
      {
        title: "Validation before writes",
        context:
          "Learning content errors can create broken gameplay states and confusing student feedback.",
        decision:
          "Added dry-run validation to the ingestion path before normalized writes.",
        result:
          "Content updates are easier to review before they affect the product.",
      },
      {
        title: "Tooling as product surface",
        context:
          "Internal content workflows determine whether educational products stay maintainable.",
        decision:
          "Treated ingestion and generation tooling as first-class backend surfaces.",
        result:
          "The project shows practical automation and data-model thinking, not just frontend gameplay.",
      },
    ],
    metrics: [
      {
        label: "Backend",
        value: "FastAPI",
        description: "Routers across gameplay metadata, ingestion, tooling, and health.",
      },
      {
        label: "Data layer",
        value: "Supabase",
        description: "PostgreSQL-backed storage and write controls.",
      },
      {
        label: "Workflow",
        value: "Validated ETL",
        description: "Parser-based ingestion with dry-run checks.",
      },
    ],
    lessons: [
      "Educational products need dependable content operations as much as polished gameplay.",
      "Dry-run validation is a practical way to make data workflows safer.",
    ],
    nextSteps: [
      "Verify and publish the public demo before exposing a demo link.",
      "Add a visual content pipeline diagram to the case study.",
    ],
  },
  {
    slug: "timemesh",
    heroKicker: "Featured SaaS system",
    subtitle:
      "Productivity SaaS platform for scheduling workflows, calendar events, and goal planning.",
    problem:
      "Scheduling products need fast APIs, clear calendar workflows, and deployment checks that keep product iteration reliable.",
    constraints: [
      "Keep API latency low enough for repeated calendar interactions.",
      "Cover frontend, backend, database, and deployment concerns together.",
      "Move regression feedback into CI instead of relying on local-only checks.",
    ],
    approach: [
      "Reworked DRF queries and PostgreSQL indexes around high-use scheduling endpoints.",
      "Built calendar and goal-planning flows across the product stack.",
      "Moved Postman regression suites into GitHub Actions.",
    ],
    architecture: {
      summary:
        "TimeMesh combines React workflows with Django REST APIs, PostgreSQL data paths, Dockerized deployment, AWS infrastructure, and CI regression checks.",
      bullets: [
        "React handles calendar and planning interactions.",
        "Django REST Framework exposes scheduling APIs.",
        "PostgreSQL indexes support lower-latency query paths.",
        "Docker, AWS, and GitHub Actions support deployment and regression feedback.",
      ],
    },
    uxDecisions: [
      {
        title: "Latency as product quality",
        context:
          "Calendar workflows feel broken when repeated API interactions are slow.",
        decision:
          "Reduced median API latency from roughly 83ms to 25ms with indexing and query rewrites.",
        result:
          "The backend work directly supports a smoother scheduling experience.",
      },
      {
        title: "Regression checks in CI",
        context:
          "Manual API checks slow down iteration and are easy to skip.",
        decision:
          "Moved Postman regression suites into GitHub Actions.",
        result:
          "API feedback became faster and more repeatable.",
      },
    ],
    metrics: [
      {
        label: "Median API latency",
        value: "83ms to 25ms",
        description: "Improved through PostgreSQL indexing and DRF query rewrites.",
      },
      {
        label: "Regression checks",
        value: "CI-backed",
        description: "Postman suites moved into GitHub Actions.",
      },
      {
        label: "Stack",
        value: "Full stack",
        description: "React, DRF, PostgreSQL, AWS, Docker, and GitHub Actions.",
      },
    ],
    lessons: [
      "Performance work is strongest when it maps to a user-facing workflow.",
      "Regression tests are more useful when they run where deployment decisions happen.",
    ],
    nextSteps: [
      "Verify and publish the public demo before exposing a demo link.",
      "Add screenshots of the calendar and goal-planning flows.",
    ],
  },
  {
    slug: "ui-library",
    heroKicker: "Product system case study",
    subtitle:
      "Reusable interface system for consistent, polished components across personal products and portfolio experiments.",
    problem:
      "Personal product frontends need consistent primitives and branded components so each project does not restart visual and interaction decisions from scratch.",
    constraints: [
      "Keep primitives reusable across different app surfaces.",
      "Support quick iteration without sacrificing accessibility basics.",
      "Make the system useful for portfolio and product experiments.",
    ],
    approach: [
      "Centralized reusable UI primitives and branded components.",
      "Documented component behavior through Storybook-oriented examples.",
      "Aligned styling decisions around shared tokens and frontend conventions.",
    ],
    architecture: {
      summary:
        "The UI Library is a reusable frontend foundation made of primitives, branded components, examples, and shared styling conventions.",
      bullets: [
        "React and TypeScript define component contracts.",
        "Storybook supports isolated review and documentation.",
        "Tailwind/CSS styling supports practical product composition.",
        "Shared primitives speed up new project frontend work.",
      ],
    },
    uxDecisions: [
      {
        title: "Reusable primitives first",
        context:
          "Polished product work slows down when every button, surface, and state is rebuilt per app.",
        decision:
          "Centralized reusable UI primitives and branded components.",
        result:
          "New frontends can start from a stronger baseline.",
      },
      {
        title: "Consistency as velocity",
        context:
          "A small portfolio of products benefits from shared visual rules.",
        decision:
          "Used the library as a foundation for portfolio and product visual consistency.",
        result:
          "The project supports faster iteration across frontend surfaces.",
      },
    ],
    metrics: [
      {
        label: "System type",
        value: "Reusable UI",
        description: "Shared primitives and branded components.",
      },
      {
        label: "Docs surface",
        value: "Storybook",
        description: "Component examples can be reviewed independently.",
      },
      {
        label: "Demo",
        value: "Pending",
        description: "Demo link remains hidden until verification passes.",
      },
    ],
    lessons: [
      "Small design systems are most useful when they solve repeated product friction.",
      "Reusable UI should be documented through states and constraints, not only screenshots.",
    ],
    nextSteps: [
      "Verify the public Storybook/demo domain before linking it.",
      "Expand components for forms, navigation, and dense dashboards.",
    ],
  },
  {
    slug: "video-automation-pipeline",
    heroKicker: "Automation case study",
    subtitle:
      "Repeatable script-to-video workflow for prompts, scripts, audio, captions, storyboards, render assets, QA reports, upload metadata, and logs.",
    problem:
      "Video production workflows create handoff risk when prompts, scripts, assets, QA notes, upload metadata, and logs live in separate manual steps.",
    constraints: [
      "Keep artifacts predictable across every production stage.",
      "Support QA checkpoints before publish-ready output.",
      "Avoid exposing a public demo until a safe viewer exists.",
    ],
    approach: [
      "Organized generation and rendering stages into repeatable command outputs.",
      "Standardized artifacts for scripts, captions, storyboards, assets, reports, metadata, and logs.",
      "Used automation to reduce manual handoff risk.",
    ],
    architecture: {
      summary:
        "The workflow packages content production into staged artifacts that can be generated, reviewed, rendered, and prepared for upload consistently.",
      bullets: [
        "Prompt and script stages define source content.",
        "Audio, captions, and storyboards prepare render inputs.",
        "Remotion creates render assets.",
        "QA reports, upload metadata, and logs support review and handoff.",
      ],
    },
    uxDecisions: [
      {
        title: "Artifacts over ad hoc files",
        context:
          "Manual media workflows are difficult to debug when each run leaves different outputs.",
        decision:
          "Standardized each workflow stage around expected artifacts.",
        result:
          "Runs are easier to inspect, compare, and hand off.",
      },
      {
        title: "QA before upload",
        context:
          "Generated media needs review checkpoints before it becomes public content.",
        decision:
          "Included QA reports and logs as production outputs.",
        result:
          "The pipeline reduces manual risk without pretending automation removes review.",
      },
    ],
    metrics: [
      {
        label: "Workflow",
        value: "Multi-stage",
        description: "Prompts through upload metadata and logs.",
      },
      {
        label: "Output",
        value: "Artifacts",
        description: "Repeatable files for render and QA handoff.",
      },
      {
        label: "Demo",
        value: "Disabled",
        description: "No public demo is shown without a safe viewer.",
      },
    ],
    lessons: [
      "Automation is most credible when it preserves reviewability.",
      "Production artifacts should make each stage inspectable after the fact.",
    ],
    nextSteps: [
      "Add a safe public artifact viewer before exposing a demo.",
      "Add sample QA output screenshots to the case study.",
    ],
  },
];

export function getProjectPage(slug: string | undefined) {
  return projectPages.find((page) => page.slug === slug);
}
