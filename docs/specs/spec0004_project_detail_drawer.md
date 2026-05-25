# Spec 0004: Project Detail Drawer

## Status

proposed

## Owner

Jason Huang

## Last Updated

2026-05-25

## Target Area

Interactive project details opened from the Ripple Work Grid.

---

# 1. Purpose

This spec defines the project detail experience.

When a visitor selects a project card, the site should open a focused detail drawer or modal that explains the project without navigating away.

---

# 2. Product Goal

The detail drawer should help visitors understand:

```txt
what the project is
why it matters
what Jason built
what technologies were used
what the result or current status is
where to view code/demo if available
```

It should make project browsing feel interactive but not complicated.

---

# 3. User Experience

Use a right-side drawer on desktop and a bottom sheet or full-screen dialog on mobile.

Desktop:

```txt
project card click
right drawer slides in
background dims slightly
drawer contains case study summary
close button top-right
```

Mobile:

```txt
project card tap
full-screen or near-full-screen sheet
close button sticky at top
content scrolls inside
```

---

# 4. Visual Direction

Drawer styling:

```txt
dark glass panel
cyan border
subtle water glow
gold accent line near title
rounded corners desktop
full-width mobile sheet
```

Do not use a busy water texture behind long text.

Drawer should prioritize readability.

---

# 5. Component/API Requirements

Create:

```txt
src/components/portfolio/ProjectDetailDrawer.tsx
src/components/portfolio/ProjectDetailSection.tsx
```

Update:

```txt
RippleWorkSection.tsx
ProjectRippleCard.tsx
```

Drawer API:

```ts
export type ProjectDetailDrawerProps = {
  project: PortfolioProject | null;
  open: boolean;
  onClose: () => void;
};
```

Behavior:

- if `open` is false, drawer should not be visible;
- if `project` is null, drawer should not render project content;
- pressing Escape closes drawer;
- clicking backdrop closes drawer;
- close button closes drawer.

---

# 6. Responsive Behavior

Desktop:

```txt
drawer width: 460px to 560px
right: 24px
top/bottom margin: 24px
max-height: calc(100vh - 48px)
```

Tablet:

```txt
drawer width: min(560px, calc(100vw - 32px))
```

Mobile:

```txt
width: 100%
height: 88vh to 100vh
bottom aligned
border radius top-left/top-right: 24px
```

---

# 7. Accessibility

Required behavior:

- `role="dialog"`;
- `aria-modal="true"`;
- accessible title with `aria-labelledby`;
- Escape closes;
- focus moves into drawer when opened;
- focus returns to triggering card when closed;
- background content should not be reachable by keyboard while modal is open;
- close button has clear accessible label.

If implementing full focus trap is too much for the first pass, use a well-tested accessible dialog primitive if already available in the project.

---

# 8. Implementation Details

Drawer content sections:

```txt
1. Project title
2. Project category
3. Short one-sentence summary
4. Overview
5. My role
6. Key features
7. Tech stack
8. Links
9. Status
```

Open animation:

```txt
desktop: slide from right 320ms
mobile: slide from bottom or fade/scale 260ms
```

Reduced motion:

```txt
no slide
simple opacity change or instant state change
```

---

# 9. Acceptance Criteria

- [ ] Clicking a project opens a detail drawer.
- [ ] Drawer renders content from project data.
- [ ] Drawer is responsive desktop/mobile.
- [ ] Drawer can be closed by button, Escape, and backdrop.
- [ ] Focus behavior is accessible.
- [ ] Long content scrolls inside drawer.
- [ ] Reduced motion is respected.
- [ ] The grid remains reusable.

---

# 10. Non-Goals

This spec does not require:

- dedicated project pages;
- markdown rendering;
- CMS integration;
- image galleries;
- video embeds;
- comments;
- analytics.

---

# 11. Risks and Mitigations

## Risk: Drawer becomes too much content

Mitigation:

- keep content structured;
- use short sections;
- include links for deeper detail later.

## Risk: Accessibility complexity

Mitigation:

- use an existing dialog primitive if available;
- otherwise implement minimal focus management carefully.

---

# 12. QA Checklist

- [ ] Open drawer with mouse.
- [ ] Open drawer with keyboard.
- [ ] Close via close button.
- [ ] Close via Escape.
- [ ] Close via backdrop.
- [ ] Check mobile sheet layout.
- [ ] Check focus returns to card.
- [ ] Check reduced motion.

---

# 13. Codex Implementation Prompt

```txt
Implement Spec 0004.

Create a ProjectDetailDrawer connected to the RippleWorkSection. The drawer should open when a project card is selected, render project details from src/data/projects.ts, and be responsive. Ensure close behavior, keyboard support, and accessible dialog labeling. Keep styling aligned with the dark water-glass brand from Specs 0001-0003.
```

---

# 14. Done Definition

Spec 0004 is complete when users can open project details interactively from the Ripple Work Grid in an accessible, responsive, and polished drawer experience.
