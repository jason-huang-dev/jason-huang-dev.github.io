# Spec 0006: Content Data and Case Study Model

## Status

proposed

## Owner

Jason Huang

## Last Updated

2026-05-25

## Target Area

Centralized portfolio content model for projects, profile information, capabilities, and links.

---

# 1. Purpose

This spec defines the data model that powers the portfolio.

The goal is to avoid scattering project content across components and make the site easy to update.

---

# 2. Product Goal

Jason should be able to add, remove, or update portfolio projects from one data file.

The project grid and project detail drawer should use the same source of truth.

---

# 3. User Experience

Visitors should see consistent project information between:

```txt
project cards
project drawer
footer/contact links
future project pages
```

No project should have conflicting descriptions in different places.

---

# 4. Visual Direction

This is a data/content spec. It should not change the visual design except by enabling existing components to render real content.

---

# 5. Component/API Requirements

Create:

```txt
src/data/projects.ts
src/data/profile.ts
```

Optional:

```txt
src/data/capabilities.ts
```

Project type:

```ts
export type ProjectStatus =
  | "active"
  | "in-progress"
  | "concept"
  | "archived";

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
```

---

# 6. Responsive Behavior

No layout changes are required.

Content must be written so cards still work on mobile:

- short descriptions should stay under roughly 160 characters where possible;
- tech stacks should wrap;
- optional fields should not create blank space.

---

# 7. Accessibility

- Image alt text must describe the project image if meaningful.
- Decorative images should use empty alt text.
- Missing links should not render empty anchors.
- Data should not force ambiguous CTA labels.

---

# 8. Implementation Details

Initial projects:

```txt
UI Library
The Stock Showdown
DaChong WMS
CertChase
Roblox Systems
Portfolio System
```

Recommended IDs:

```txt
ui-library
stock-showdown
dachong-wms
certchase
roblox-systems
portfolio-system
```

Example project:

```ts
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
      "A reusable UI component library built around design tokens, theming, Storybook documentation, and scalable application patterns.",
    role:
      "Designed the component architecture, theme structure, visual tokens, and documentation approach.",
    impact:
      "Creates a reusable foundation for faster, more consistent frontend development.",
    techStack: ["React", "TypeScript", "MUI", "Storybook"],
    keyFeatures: [
      "Tokenized light and dark theme system",
      "Reusable Button, Typography, Surface, Divider, and accessibility utilities",
      "Storybook documentation and visual examples"
    ],
    links: [],
    accent: "water"
  }
];
```

Profile data:

```ts
export const profile = {
  name: "Jason Huang",
  title: "Software Engineer",
  tagline: "Designing systems that flow with purpose.",
  summary:
    "I build modern software and UI systems with calm precision — where engineering meets clarity, and ideas find their natural flow.",
  location: "New Jersey / New York Area",
  links: {
    github: "https://github.com/jason-huang-dev",
    linkedin: "",
    resume: "",
    email: ""
  }
};
```

Do not invent unknown links. Use empty strings for missing URLs.

Data usage rules:

- `RippleWorkSection` uses `projects`.
- `ProjectRippleCard` receives one `PortfolioProject`.
- `ProjectDetailDrawer` receives one `PortfolioProject`.
- `HeroSection` uses `profile`.
- `Footer` uses `profile.links`.
- Do not duplicate the same project descriptions in components.

---

# 9. Acceptance Criteria

- [ ] `PortfolioProject` type exists.
- [ ] `projects` array includes at least 6 projects.
- [ ] `profile` object exists.
- [ ] Work grid reads from project data.
- [ ] Detail drawer reads from the same project data.
- [ ] Missing links do not render broken anchors.
- [ ] No duplicate project copy remains hardcoded in components.

---

# 10. Non-Goals

This spec does not require:

- CMS setup;
- database;
- markdown parser;
- remote API;
- image upload pipeline;
- project pages.

---

# 11. Risks and Mitigations

## Risk: Project copy is too generic

Mitigation:

- include role, tech stack, and key features;
- revise content after first implementation.

## Risk: Missing links create broken UI

Mitigation:

- filter empty links before rendering;
- make links optional.

---

# 12. QA Checklist

- [ ] Check all cards render with data.
- [ ] Check drawer renders all sections.
- [ ] Check missing links are hidden.
- [ ] Check long tech stacks wrap.
- [ ] Check empty impact does not render a blank section.
- [ ] Check project IDs are stable.

---

# 13. Codex Implementation Prompt

```txt
Implement Spec 0006.

Create centralized project and profile data files. Define the PortfolioProject type and populate the initial projects: UI Library, The Stock Showdown, DaChong WMS, CertChase, Roblox Systems, and Portfolio System. Update the work grid, project cards, detail drawer, hero, and footer to read from these data files without duplicating content.
```

---

# 14. Done Definition

Spec 0006 is complete when portfolio content is centralized, typed, reusable, and easy to update without editing presentation components.
