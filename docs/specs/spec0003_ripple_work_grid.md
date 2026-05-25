# Spec 0003: Ripple Work Grid

## Status

proposed

## Owner

Jason Huang

## Last Updated

2026-05-25

## Target Area

Interactive project display section for the portfolio website.

---

# 1. Purpose

This spec defines the simplified interactive project display.

Instead of a hard-to-build photorealistic top-down pool, implement a responsive **Ripple Work Grid**.

Each project appears as a premium glass card with ripple motion on hover, focus, and tap.

---

# 2. Product Goal

The work section should be the most memorable part of the portfolio while remaining practical and readable.

Visitors should quickly understand:

```txt
what projects Jason has built
what each project does
what technologies were used
which projects are most important
how to open more details
```

---

# 3. User Experience

Section title:

```txt
Work in Motion
```

Section subtitle:

```txt
Projects that ripple outward from design, engineering, and product thinking.
```

User behavior:

```txt
hover card -> ripple expands and card lifts
focus card -> same visible state as hover
click card -> opens project details in later spec
mobile tap -> selects or opens project detail when available
```

---

# 4. Visual Direction

Card visual language:

```txt
dark glass surface
soft cyan glow
subtle circular ripple rings
gold accent on active or featured cards
project icon
title
short description
tech pills
CTA
```

Do not implement literal floating water bubbles in MVP.

---

# 5. Component/API Requirements

Create:

```txt
src/components/sections/RippleWorkSection.tsx
src/components/portfolio/ProjectRippleCard.tsx
src/components/portfolio/TechPill.tsx
```

Use project data from:

```txt
src/data/projects.ts
```

Card API:

```ts
export type ProjectRippleCardProps = {
  project: PortfolioProject;
  featured?: boolean;
  selected?: boolean;
  onOpen?: (projectId: string) => void;
};
```

Project card should render:

```txt
icon
title
shortDescription
tech stack pills
type/category
primary CTA
optional screenshot preview
```

---

# 6. Responsive Behavior

## 6.1 Desktop

Use a responsive CSS grid.

Recommended:

```css
grid-template-columns: repeat(12, minmax(0, 1fr));
gap: 20px;
```

Recommended first layout:

```txt
[ UI Library        6 cols ] [ The Stock Showdown 6 cols ]
[ DaChong WMS       4 cols ] [ CertChase          4 cols ] [ Roblox Systems 4 cols ]
```

## 6.2 Tablet

```txt
2-column grid
featured cards may span 2 columns
```

## 6.3 Mobile

```txt
single-column cards
all cards full width
no card smaller than 280px wide
```

---

# 7. Accessibility

- Each card should be keyboard reachable.
- Use `<button>` for cards that open a drawer, or a real `<a>` for cards linking to pages.
- Cards must have visible focus states.
- Hover-only content must also appear on focus.
- Do not place important text only in images.
- Tech pills should be text.
- Use `aria-label` where the CTA text is ambiguous.

---

# 8. Implementation Details

Do not use canvas.

Use pseudo-elements or nested spans.

Suggested structure:

```tsx
<article className="card">
  <span className="rippleLayer" aria-hidden="true" />
  <div className="cardContent">...</div>
</article>
```

Suggested effect:

```css
.rippleLayer::before,
.rippleLayer::after {
  content: "";
  position: absolute;
  width: 220px;
  height: 220px;
  border-radius: 999px;
  border: 1px solid rgba(126,231,242,0.24);
  transform: scale(0.72);
  opacity: 0.28;
  transition: transform 500ms ease, opacity 500ms ease;
}

.card:hover .rippleLayer::before,
.card:focus-within .rippleLayer::before {
  transform: scale(1.15);
  opacity: 0.5;
}
```

Initial project list:

```txt
UI Library
The Stock Showdown
DaChong WMS
CertChase
Roblox Systems
Portfolio System
```

---

# 9. Acceptance Criteria

- [ ] Work section renders from project data.
- [ ] Cards are responsive from desktop to mobile.
- [ ] Hover/focus ripple effect works without canvas.
- [ ] Cards are keyboard accessible.
- [ ] Featured cards have stronger visual hierarchy.
- [ ] Card text remains readable over all effects.
- [ ] Reduced motion mode disables nonessential movement.
- [ ] No project detail drawer is required in this spec.

---

# 10. Non-Goals

This spec does not require:

- modal/drawer detail view;
- filtering;
- sorting;
- live GitHub API data;
- real water simulation;
- physics-based bubbles;
- WebGL.

---

# 11. Risks and Mitigations

## Risk: Cards look too similar

Mitigation:

- use featured cards;
- vary icons;
- include project categories;
- allow a subtle screenshot tint for top projects.

## Risk: Ripple effect hurts readability

Mitigation:

- keep ripple layer behind content;
- cap opacity below 0.5;
- test mobile and reduced motion.

---

# 12. QA Checklist

- [ ] Check 5+ cards on desktop.
- [ ] Check 2-column tablet layout.
- [ ] Check single-column mobile layout.
- [ ] Tab through all cards.
- [ ] Test with reduced motion.
- [ ] Check long descriptions do not overflow.
- [ ] Check tech pills wrap cleanly.

---

# 13. Codex Implementation Prompt

```txt
Implement Spec 0003.

Create the RippleWorkSection, ProjectRippleCard, and TechPill components. Render cards from src/data/projects.ts. Implement a responsive grid with dark glass styling, subtle water ripple hover/focus effects, and accessible keyboard behavior. Do not use canvas, WebGL, or a project drawer in this spec.
```

---

# 14. Done Definition

Spec 0003 is complete when the portfolio has a responsive, interactive project grid that expresses the water/ripple brand while remaining readable, accessible, and maintainable.
