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
  gallery?: {
    src: string;
    alt: string;
    caption?: string;
  }[];
};

export const projectPages: ProjectPage[] = [
  {
    slug: "ui-library",
    heroKicker: "Design system case study",
    subtitle:
      "A reusable React foundation for consistent product interfaces, tokenized themes, and documentation-minded delivery.",
    problem:
      "Product surfaces were being designed and built as one-off UI decisions. The work needed a reusable component language that could keep accessibility, theming, and implementation contracts aligned.",
    constraints: [
      "Keep the package practical enough to reuse across apps without turning it into a heavy framework.",
      "Make tokens understandable to both design and engineering workflows.",
      "Support accessible defaults while preserving room for product-specific expression.",
    ],
    approach: [
      "Started from semantic color, spacing, type, and surface tokens before designing component APIs.",
      "Built components around predictable props, variant systems, and documented usage states.",
      "Used Storybook as the proof surface so each component could be reviewed independently.",
    ],
    architecture: {
      summary:
        "The system is organized as a token-first pipeline that flows into themes, providers, components, and documentation.",
      bullets: [
        "Tokens define color, typography, spacing, radius, and elevation decisions.",
        "Theme providers translate tokens into application-ready styles.",
        "Components consume theme contracts instead of hard-coded visual values.",
        "Storybook examples document behavior, states, and accessibility expectations.",
      ],
    },
    uxDecisions: [
      {
        title: "Token-first before component-first",
        context:
          "A component library without stable tokens quickly becomes a collection of unrelated widgets.",
        decision:
          "Defined semantic visual primitives before finalizing Button, Surface, Typography, and Divider patterns.",
        result:
          "The resulting components feel related and are easier to adapt across product contexts.",
      },
      {
        title: "Accessible defaults",
        context:
          "Reusable UI creates risk when teams repeatedly need to remember focus, contrast, and target states.",
        decision:
          "Made visible focus, readable contrast, and predictable interactive states part of the component baseline.",
        result:
          "Accessibility becomes a reusable system property instead of a late-stage checklist.",
      },
    ],
    metrics: [
      {
        label: "System scope",
        value: "5+ primitives",
        description: "Core UI primitives documented as reusable foundations.",
      },
      {
        label: "Theme model",
        value: "Token driven",
        description: "Visual choices centralized for consistency and iteration.",
      },
      {
        label: "Primary proof",
        value: "Storybook",
        description: "Component behavior can be reviewed outside a full app.",
      },
    ],
    lessons: [
      "The hard part of a design system is not the button; it is keeping visual decisions named, reusable, and boring in the right places.",
      "Documentation should demonstrate constraints and usage, not just render happy-path examples.",
    ],
    nextSteps: [
      "Add visual regression coverage for token and theme changes.",
      "Expand examples for form controls, navigation, and dense dashboard layouts.",
    ],
  },
  {
    slug: "stock-showdown",
    heroKicker: "Interactive product case study",
    subtitle:
      "A market-themed product direction for comparing signals, structuring decisions, and turning noisy financial data into a clear workflow.",
    problem:
      "Market information is abundant but difficult to act on. The product needed to make comparison, context, and confidence easier to scan without pretending to predict outcomes.",
    constraints: [
      "Avoid financial advice framing and keep the experience focused on information design.",
      "Support quick scanning without hiding the assumptions behind each signal.",
      "Leave room for automated media workflows and review outputs.",
    ],
    approach: [
      "Designed comparison-first cards so users can evaluate options side by side.",
      "Separated signal intake, provider normalization, workflow logic, and rendered output.",
      "Kept visual hierarchy calm enough for repeated decision-making sessions.",
    ],
    architecture: {
      summary:
        "The concept separates raw intake from workflow decisions so presentation can evolve without rewriting the data path.",
      bullets: [
        "Data intake captures market or editorial inputs.",
        "Provider registry normalizes source-specific details.",
        "Workflow engine turns inputs into reviewable scenes and outputs.",
        "Remotion rendering can generate consistent video or poster assets.",
      ],
    },
    uxDecisions: [
      {
        title: "Comparison over feed behavior",
        context:
          "A feed encourages passive scrolling, which is a poor fit for decision support.",
        decision:
          "Structured the experience around side-by-side comparison and explicit signal cards.",
        result:
          "The user can compare tradeoffs instead of chasing isolated metrics.",
      },
      {
        title: "Signals with context",
        context:
          "Numbers without labels can look authoritative while still being ambiguous.",
        decision:
          "Paired each signal with a short explanation and visual priority state.",
        result:
          "The UI communicates why something matters, not only that it changed.",
      },
    ],
    metrics: [
      {
        label: "Core model",
        value: "Compare first",
        description: "The main interaction is structured around alternatives.",
      },
      {
        label: "Output path",
        value: "Media ready",
        description: "Designed with generated review output in mind.",
      },
      {
        label: "Status",
        value: "In progress",
        description: "Product concept and implementation direction are evolving.",
      },
    ],
    lessons: [
      "Decision tools need to be honest about uncertainty.",
      "A focused comparison surface is often more useful than a larger dashboard.",
    ],
    nextSteps: [
      "Prototype the first provider registry and sample signal set.",
      "Add example rendered outputs for review and sharing workflows.",
    ],
  },
  {
    slug: "dachong-wms",
    heroKicker: "Operations platform case study",
    subtitle:
      "A warehouse management direction for multi-tenant inventory, role-aware dashboards, and practical fulfillment workflows.",
    problem:
      "Warehouse teams need fast operational clarity across clients, inventory, and fulfillment status. The system direction needed to support multi-tenant complexity without making daily workflows feel heavy.",
    constraints: [
      "Represent clients, warehouses, users, permissions, inventory, and fulfillment as separate but connected concepts.",
      "Keep dashboard views scannable for operators who need quick answers.",
      "Design for growth without overbuilding the first version.",
    ],
    approach: [
      "Mapped tenant, warehouse, account, and inventory boundaries before designing screens.",
      "Prioritized dashboard filters, role visibility, and exception states.",
      "Used a practical full-stack direction with React, Django, PostgreSQL, and Docker.",
    ],
    architecture: {
      summary:
        "The platform direction treats operational entities as explicit boundaries that can scale into a production WMS.",
      bullets: [
        "Tenant and client records define ownership boundaries.",
        "Warehouse and inventory records support operational views.",
        "Role permissions control which workflows and dashboards users can access.",
        "API contracts connect filtered dashboards to backend state.",
      ],
    },
    uxDecisions: [
      {
        title: "Role-aware dashboards",
        context:
          "Different users need different levels of operational visibility.",
        decision:
          "Designed dashboard surfaces around role boundaries and task priority.",
        result:
          "The system can show focused views without duplicating product logic.",
      },
      {
        title: "Exception-first scanning",
        context:
          "Operations users often need to find what is blocked before reviewing what is normal.",
        decision:
          "Prioritized status filters, alerts, and exception cards in the dashboard direction.",
        result:
          "The interface supports faster triage for inventory and fulfillment issues.",
      },
    ],
    metrics: [
      {
        label: "Domain",
        value: "3PL/WMS",
        description: "Inventory, clients, roles, dashboards, and fulfillment.",
      },
      {
        label: "Architecture",
        value: "Full stack",
        description: "React frontend with Django/PostgreSQL backend direction.",
      },
      {
        label: "Focus",
        value: "Operations",
        description: "Built around repeated scanning and action workflows.",
      },
    ],
    lessons: [
      "Operational tools need precise information architecture before visual polish.",
      "Role boundaries should be modeled early because they shape both data and UI.",
    ],
    nextSteps: [
      "Define the first dashboard API contract.",
      "Prototype inventory filters and role-specific navigation.",
    ],
  },
  {
    slug: "portfolio-system",
    heroKicker: "Personal platform case study",
    subtitle:
      "A spec-led portfolio system using route-based content, branded interaction, centralized data, and durable deployment.",
    problem:
      "The portfolio needed to become more than a one-page resume. It needed durable routes, stronger project proof, and a visual identity that could support future notes, case studies, and media.",
    constraints: [
      "Keep the Vite app lightweight and avoid a framework migration.",
      "Preserve the existing brand direction while improving information architecture.",
      "Make project proof shareable through direct URLs and metadata.",
    ],
    approach: [
      "Centralized project and profile data before adding route-level pages.",
      "Built branded interactions as progressive enhancements instead of content blockers.",
      "Added SEO, sitemap, robots, and deployment improvements as platform foundations.",
    ],
    architecture: {
      summary:
        "The portfolio is structured as a static React platform with reusable content data, route-level case studies, metadata, and GitHub Pages deployment.",
      bullets: [
        "Project data powers cards, work index, and related content.",
        "Project page data powers reusable case-study sections.",
        "SEO helpers set route-specific metadata and structured data.",
        "GitHub Pages workflow builds and deploys the static site artifact.",
      ],
    },
    uxDecisions: [
      {
        title: "Routes over modal-only detail",
        context:
          "Project drawers are useful for scanning, but they are not durable proof surfaces.",
        decision:
          "Added shareable `/work/:slug` pages for case-study depth.",
        result:
          "Recruiters and technical readers can open, refresh, and share individual projects.",
      },
      {
        title: "Brand interaction with readable fallback",
        context:
          "The yin-yang unlock scene created a strong identity moment, but content still needed to win.",
        decision:
          "Kept decoration behind content and made mobile render as a readable static layout.",
        result:
          "The scene feels branded without making project details harder to read.",
      },
    ],
    metrics: [
      {
        label: "Route model",
        value: "Static",
        description: "Shareable case studies without requiring a backend.",
      },
      {
        label: "Content source",
        value: "Typed data",
        description: "Centralized project and case-study content.",
      },
      {
        label: "Deployment",
        value: "Pages",
        description: "GitHub Pages static artifact workflow.",
      },
    ],
    lessons: [
      "A portfolio should prove how you think, not only list what you used.",
      "Branded motion needs a content-first endpoint.",
    ],
    nextSteps: [
      "Add real project media and generated Open Graph images.",
      "Add route-level analytics events and quality budgets.",
    ],
  },
];

export function getProjectPage(slug: string | undefined) {
  return projectPages.find((page) => page.slug === slug);
}
