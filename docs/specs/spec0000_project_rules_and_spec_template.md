# Spec 0000: Project Rules and Spec Template

## Status

proposed

## Owner

Jason Huang

## Last Updated

2026-05-25

## Target Area

New personal portfolio website project documentation, implementation standards, and spec structure.

---

# 1. Purpose

This spec defines the documentation template, implementation rules, and quality bar for the new personal portfolio website project.

This is not an implementation spec. It is the foundation that all following specs should follow.

The portfolio should communicate:

- strong software engineering fundamentals;
- polished UI systems taste;
- product thinking;
- cultural identity through subtle Chinese and water-inspired design;
- credible professional presentation for recruiters, clients, and collaborators.

---

# 2. Product Goal

Create a fully responsive and interactive portfolio website that is memorable without becoming gimmicky.

The design should use water as a visual system:

```txt
calm motion
ripple effects
glass surfaces
deep navy backgrounds
cyan/teal highlights
gold Chinese seal accents
```

The site should remain practical:

```txt
fast to load
easy to read
accessible
responsive
simple to maintain
clear for hiring managers
clear for potential clients
```

---

# 3. Final Direction

Use the simpler **Ripple Cards / Ripple Work Grid** direction.

Do not implement the fully photorealistic top-down pool as the first production version.

The production site should feel inspired by the generated visuals, but should be implemented using normal web primitives:

- React components;
- CSS or CSS modules;
- design tokens;
- optional Framer Motion;
- no required WebGL;
- no required canvas;
- no heavy shader simulation.

---

# 4. Spec Numbering Rules

Because this is a new project:

```txt
spec0000 = project rules and spec template
spec0001 = first implementation spec
spec0002 = second implementation spec
spec0003 = third implementation spec
```

Do not reuse previous project spec numbers such as `0108`.

All spec files should use this filename pattern:

```txt
spec0001_short_kebab_case_title.md
```

---

# 5. Spec File Template

Each implementation spec should include:

```txt
# Spec 000X: Title

## Status
draft | proposed | accepted | implemented | deprecated

## Owner
Jason Huang

## Last Updated
YYYY-MM-DD

## Target Area
The code/docs/product area affected by this spec.

---

# 1. Purpose
Explain why this spec exists.

# 2. Product Goal
Explain what the user or visitor should gain.

# 3. User Experience
Describe the intended experience.

# 4. Visual Direction
Describe the look and feel with specific constraints.

# 5. Component/API Requirements
List components, props, data structures, files, and usage.

# 6. Responsive Behavior
Define desktop, tablet, and mobile behavior.

# 7. Accessibility
Define keyboard, focus, contrast, semantics, and reduced-motion requirements.

# 8. Implementation Details
Describe implementation approach, constraints, and code organization.

# 9. Acceptance Criteria
Use clear checkboxes.

# 10. Non-Goals
Define what this spec intentionally does not include.

# 11. Risks and Mitigations
Identify risks and ways to reduce them.

# 12. QA Checklist
List concrete verification steps.

# 13. Codex Implementation Prompt
Provide a direct prompt for AI-assisted implementation.

# 14. Done Definition
Define when this spec is complete.
```

---

# 6. Implementation Principles

## 6.1 Minimal Change Principle

Each spec should be implementable with focused changes.

Do not rewrite unrelated systems.

Do not introduce global abstractions unless at least two specs need them.

Do not add dependencies without a clear reason.

## 6.2 Component-First Structure

Prefer small, reusable components.

Recommended structure:

```txt
src/
  app/
    page.tsx
    layout.tsx

  components/
    layout/
      PageShell.tsx
      Navbar.tsx
      Footer.tsx

    sections/
      HeroSection.tsx
      RippleWorkSection.tsx
      SystemsSection.tsx
      AboutSection.tsx
      ContactSection.tsx

    portfolio/
      ProjectRippleCard.tsx
      ProjectDetailDrawer.tsx
      TechPill.tsx
      SectionEyebrow.tsx

    brand/
      BrandMark.tsx
      ChineseAccentText.tsx
      WaterBackdrop.tsx

  data/
    projects.ts
    profile.ts

  styles/
    tokens.ts
    globals.css
```

If the project already has a different structure, adapt these names to the existing convention.

## 6.3 Data-Driven Content

Project cards, case studies, and capabilities must come from data files.

Avoid hardcoding the same project content in multiple components.

## 6.4 Progressive Enhancement

The site must work without advanced animation.

Base behavior:

```txt
content visible
links usable
cards readable
drawer/modal accessible
```

Enhanced behavior:

```txt
hover ripples
animated card reveal
smooth drawer transitions
cursor-follow highlight
```

---

# 7. Technology Assumptions

Preferred stack:

```txt
React / Next.js or Vite React
TypeScript
CSS Modules or Tailwind
Framer Motion optional
MUI optional only if already used
```

The specs do not require a specific router or framework. They assume React components.

---

# 8. Visual Token Baseline

Use these values as the starting theme.

```ts
export const portfolioTokens = {
  color: {
    background: "#06111F",
    backgroundDeep: "#030A11",
    surface: "#0B2233",
    surfaceSoft: "rgba(255,255,255,0.06)",
    surfaceStrong: "rgba(8,22,33,0.92)",
    border: "rgba(126,231,242,0.22)",
    borderStrong: "rgba(126,231,242,0.42)",

    text: "#F8FDFF",
    textMuted: "#8FA6B2",
    textSubtle: "#617984",

    water: "#23B7C5",
    waterSoft: "#7EE7F2",
    jade: "#65D6AD",
    gold: "#F7C948",
    goldMuted: "#B9903E",

    danger: "#FF6F49"
  },

  radius: {
    sm: 8,
    md: 14,
    lg: 20,
    xl: 28,
    full: 999
  },

  shadow: {
    glass: "0 18px 60px rgba(0,0,0,0.32)",
    waterGlow: "0 0 28px rgba(35,183,197,0.26)",
    goldGlow: "0 0 24px rgba(247,201,72,0.18)"
  }
};
```

---

# 9. Site Information Architecture

Recommended page sections:

```txt
1. Hero
2. Ripple Work Grid
3. Systems / Capabilities
4. About
5. Contact
6. Footer
```

Optional later pages:

```txt
/work/[slug]
/writing
/resume
```

The initial implementation may keep all content on one page.

---

# 10. Global Acceptance Criteria

- [ ] Website is responsive from 320px to 1440px+.
- [ ] Website is usable by keyboard.
- [ ] Interactive elements have visible focus states.
- [ ] No text is rendered only inside images.
- [ ] Project data is centralized.
- [ ] Water theme is present but does not reduce readability.
- [ ] Chinese accents feel intentional and restrained.
- [ ] Page loads quickly on normal mobile connections.
- [ ] No heavy WebGL/canvas requirement in MVP.
- [ ] Site still feels professional for job applications.

---

# 11. Non-Goals

The MVP does not require:

- a full CMS;
- a blog backend;
- real-time water physics;
- WebGL shaders;
- 3D project bubbles;
- project filtering;
- user accounts;
- analytics dashboard;
- multi-language support.

---

# 12. QA Checklist

Before merging any spec implementation:

```txt
desktop 1440px
laptop 1280px
tablet 768px
mobile 390px
small mobile 320px
keyboard-only navigation
prefers-reduced-motion enabled
dark-mode contrast check
Lighthouse performance check
```

---

# 13. Codex Implementation Prompt

```txt
Use this spec template and project rule file as the foundation for the new portfolio redesign.

Implement following specs in order, beginning with Spec 0001. Keep each PR focused. Preserve accessibility, responsiveness, and maintainable component boundaries. Avoid heavy animation or WebGL unless a later spec explicitly requires it. Prefer data-driven content and reusable components.
```

---

# 14. Done Definition

Spec 0000 is complete when all future portfolio specs use this structure and the implementation follows the global rules for responsiveness, accessibility, maintainability, and brand consistency.
