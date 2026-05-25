export type ProjectStatus = "active" | "in-progress" | "concept" | "archived";

export type ProjectLink = {
  label: string;
  href: string;
  type: "demo" | "github" | "case-study" | "video" | "external";
};

export type PortfolioProject = {
  id: string;
  title: string;
  slug: string;
  category: string;
  status: ProjectStatus;
  featured?: boolean;
  shortDescription: string;
  overview: string;
  role: string;
  impact?: string;
  techStack: string[];
  keyFeatures: string[];
  links: ProjectLink[];
  accent?: "water" | "gold" | "jade" | "neutral";
  image?: {
    src: string;
    alt: string;
  };
};

export const projects: PortfolioProject[] = [
  {
    id: "ui-library",
    title: "UI Library",
    slug: "ui-library",
    category: "Design System",
    status: "active",
    featured: true,
    shortDescription:
      "A tokenized React component system focused on accessible, consistent product interfaces.",
    overview:
      "A reusable UI component library built around design tokens, theming, component contracts, Storybook documentation, and scalable application patterns.",
    role:
      "Designed the component architecture, theme structure, visual tokens, and documentation approach.",
    impact:
      "Creates a reusable foundation for faster and more consistent frontend development.",
    techStack: ["React", "TypeScript", "MUI", "Storybook", "pnpm"],
    keyFeatures: [
      "Tokenized light and dark theme system",
      "Reusable Button, Typography, Surface, Divider, and accessibility utilities",
      "Storybook documentation and visual examples",
    ],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/jason-huang-dev/UI-Library",
        type: "github",
      },
    ],
    accent: "water",
  },
  {
    id: "stock-showdown",
    title: "The Stock Showdown",
    slug: "stock-showdown",
    category: "Interactive Product",
    status: "in-progress",
    featured: true,
    shortDescription:
      "A market-themed product concept built around decision-making, signal clarity, and interactive data presentation.",
    overview:
      "An interactive finance product direction for comparing market ideas, surfacing signals, and turning noisy information into a focused user flow.",
    role:
      "Defined the product direction, interaction model, frontend structure, and data display patterns.",
    techStack: ["React", "Vite", "TypeScript", "Data UI"],
    keyFeatures: [
      "Comparison-first market interaction model",
      "Signal cards designed for quick scanning",
      "Responsive dashboard-style layout",
    ],
    links: [],
    accent: "gold",
  },
  {
    id: "dachong-wms",
    title: "DaChong WMS",
    slug: "dachong-wms",
    category: "Operations Platform",
    status: "concept",
    shortDescription:
      "A multi-tenant warehouse management system direction for inventory, roles, dashboards, and client operations.",
    overview:
      "A 3PL warehouse platform concept focused on clear inventory operations, account-level permissions, dashboard workflows, and practical filtering.",
    role:
      "Planned the product architecture, data model direction, role boundaries, and dashboard user experience.",
    techStack: ["React", "MUI", "Django", "PostgreSQL", "Docker"],
    keyFeatures: [
      "Multi-tenant client and warehouse structure",
      "Role-aware operational dashboards",
      "Inventory and fulfillment workflow planning",
    ],
    links: [],
    accent: "jade",
  },
  {
    id: "certchase",
    title: "CertChase",
    slug: "certchase",
    category: "Micro SaaS",
    status: "in-progress",
    shortDescription:
      "A vendor compliance tracker for certificate collection, requirement visibility, and renewal workflows.",
    overview:
      "A compliance workflow product designed to help teams track vendor requirements, collect documents, and understand status without spreadsheet drift.",
    role:
      "Designed the app structure, backend contracts, UI patterns, and Supabase-backed data model direction.",
    techStack: ["React", "MUI", "Django", "DRF", "Supabase"],
    keyFeatures: [
      "Requirement template and vendor tracking flows",
      "Document status and renewal visibility",
      "Backend API structure for compliance records",
    ],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/jason-huang-dev",
        type: "github",
      },
    ],
    accent: "water",
  },
  {
    id: "roblox-systems",
    title: "Roblox Systems",
    slug: "roblox-systems",
    category: "Game Systems",
    status: "concept",
    shortDescription:
      "Gameplay and economy systems experiments focused on progression, feedback loops, and player-facing clarity.",
    overview:
      "A set of Roblox systems explorations for designing progression mechanics, operational tooling, and gameplay loops that stay legible to players.",
    role:
      "Explored system design, interaction feedback, and the translation of game rules into readable player experiences.",
    techStack: ["Luau", "Roblox Studio", "Systems Design"],
    keyFeatures: [
      "Progression and reward loop planning",
      "Player-facing feedback states",
      "Reusable systems thinking for gameplay mechanics",
    ],
    links: [],
    accent: "neutral",
  },
  {
    id: "portfolio-system",
    title: "Portfolio System",
    slug: "portfolio-system",
    category: "Personal Platform",
    status: "active",
    shortDescription:
      "A spec-led portfolio redesign using water-inspired interaction, centralized content, and reusable React sections.",
    overview:
      "The portfolio itself is treated as a product system: documented with specs, built from reusable components, and styled around a focused brand foundation.",
    role:
      "Created the specs, content model, visual system, responsive layout, and interactive project grid.",
    impact:
      "Turns the site into a maintainable product surface instead of a one-off static resume.",
    techStack: ["React", "Vite", "CSS", "Framer Motion"],
    keyFeatures: [
      "Centralized profile and project data",
      "Responsive water-glass visual system",
      "Accessible project drawer and keyboard-friendly cards",
    ],
    links: [],
    accent: "gold",
  },
];
