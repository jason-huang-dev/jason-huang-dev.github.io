# Spec 0005: Motion, Accessibility, and Performance Guardrails

## Status

proposed

## Owner

Jason Huang

## Last Updated

2026-05-25

## Target Area

Animation system, motion safety, accessibility, and performance optimization for the portfolio website.

---

# 1. Purpose

This spec defines how motion should be used across the portfolio.

The site should feel interactive and premium, but it must remain fast, accessible, and professional.

---

# 2. Product Goal

Motion should support the water/ripple brand:

```txt
gentle
fluid
calm
purposeful
responsive
```

Motion should not feel:

```txt
busy
game-like
slow
distracting
inaccessible
```

---

# 3. User Experience

Users should feel subtle feedback when interacting with:

- navigation links;
- CTA buttons;
- project cards;
- project drawer;
- section reveals.

Users who prefer reduced motion should still receive clear state changes without movement-heavy effects.

---

# 4. Visual Direction

Motion should feel like water:

```txt
soft easing
gentle expansion
small glow changes
smooth opacity and transform transitions
```

Avoid:

```txt
bouncy cartoon motion
camera shake
fast flashing
constant pulsing
scroll hijacking
```

---

# 5. Component/API Requirements

No new visual components are required unless needed.

Add shared utility styles for:

```txt
focus-visible states
reduced motion handling
common transition tokens
```

Optional file:

```txt
src/styles/motion.css
```

---

# 6. Responsive Behavior

- Animations should be lighter on mobile.
- Do not animate large layout shifts on small screens.
- Drawer mobile animation should not create scroll locking bugs.
- Ripple card animations should not trigger horizontal overflow.

---

# 7. Accessibility

Required:

- semantic headings;
- one `h1`;
- logical heading hierarchy;
- keyboard-accessible nav;
- visible focus states;
- sufficient text contrast;
- no important text embedded in images;
- cards that open drawers are buttons;
- links are links;
- drawers use dialog semantics;
- Escape closes drawers;
- focus returns after modal close.

Focus style should match brand:

```css
:focus-visible {
  outline: 2px solid rgba(126, 231, 242, 0.95);
  outline-offset: 4px;
  box-shadow: 0 0 0 6px rgba(126, 231, 242, 0.12);
}
```

Do not remove outlines without replacement.

---

# 8. Implementation Details

Preferred tools:

```txt
CSS transitions for simple hover/focus
Framer Motion only if already installed or strongly beneficial
CSS prefers-reduced-motion query
```

Avoid:

```txt
GSAP for MVP
Three.js for MVP
canvas water simulation
shader-heavy backgrounds
scroll-jacking libraries
```

Recommended durations:

```txt
button hover: 160ms to 220ms
card hover lift: 220ms to 300ms
ripple expansion: 450ms to 700ms
drawer open: 260ms to 340ms
section reveal: 400ms to 650ms
```

Reduced motion baseline:

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
    scroll-behavior: auto !important;
    transition-duration: 0.001ms !important;
  }
}
```

Performance target:

```txt
Lighthouse Performance: 90+
Lighthouse Accessibility: 95+
No required JS for decorative background
No layout shift from late-loading decorative assets
No massive unoptimized images
```

---

# 9. Acceptance Criteria

- [ ] `prefers-reduced-motion` is respected globally.
- [ ] Ripple cards remain usable without animation.
- [ ] Drawer remains usable without animation.
- [ ] Keyboard navigation works across nav, cards, drawer, footer.
- [ ] Lighthouse Accessibility is 95+ or all issues are documented.
- [ ] No canvas/WebGL dependency is introduced.
- [ ] Decorative backgrounds do not block clicks.
- [ ] Images are optimized or deferred.

---

# 10. Non-Goals

This spec does not require:

- implementing new sections;
- redesigning existing components;
- adding analytics;
- adding WebGL;
- implementing scroll-based storytelling.

---

# 11. Risks and Mitigations

## Risk: Animations make the site feel slow

Mitigation:

- keep durations short;
- animate transform/opacity only;
- avoid animating layout properties.

## Risk: Reduced motion breaks visual polish

Mitigation:

- preserve color, border, and elevation state changes;
- do not rely only on movement to show interaction.

---

# 12. QA Checklist

- [ ] Test keyboard-only navigation.
- [ ] Test screen reader labels for dialog and nav.
- [ ] Test reduced motion mode.
- [ ] Run Lighthouse.
- [ ] Check mobile performance.
- [ ] Check no horizontal scroll.
- [ ] Check all clickable elements have focus states.

---

# 13. Codex Implementation Prompt

```txt
Implement Spec 0005.

Add motion/accessibility/performance guardrails to the portfolio. Ensure prefers-reduced-motion support, visible focus states, semantic interactive elements, dialog keyboard behavior, and lightweight animations. Avoid canvas, WebGL, scroll-jacking, and heavy animation libraries.
```

---

# 14. Done Definition

Spec 0005 is complete when the portfolio feels interactive and premium while remaining accessible, responsive, and performant on mobile and desktop.
