# Spec 0021: Liquid Glass Signature Project Card

## Status

proposed

## Owner

Jason Huang

## Last Updated

2026-05-26

## Depends On

- Spec 0019: Wavefront-Guided Yin-Yang Hero Stabilization
- Spec 0020: Signature Current Divider

---

# 1. Purpose

Create a reusable **Liquid Glass Signature Project Card** component for the projects section.

The current portfolio should not rely only on the hero for brand identity. Project cards should carry a quieter version of the same design language:

```txt
dark navy surface
liquid-glass border
subtle blue/gold current edge
faint emblem watermark
strong typography hierarchy
clear CTA behavior
```

The cards should look premium and custom without reducing readability.

---

# 2. Component Name

Create:

```txt
src/components/projects/SignatureProjectCard.tsx
```

If the project has a generic card component already, this component can wrap it rather than replacing it globally.

Suggested API:

```ts
export type SignatureProjectCardProps = {
  title: string;
  eyebrow?: string;
  description: string;
  tags?: string[];
  href?: string;
  githubHref?: string;
  imageSrc?: string;
  imageAlt?: string;
  featured?: boolean;
  accent?: "blue" | "gold" | "balanced";
  className?: string;
};
```

---

# 3. Design Goals

The card should communicate:

```txt
technical polish
brand continuity
high readability
modern frontend skill
attention to interaction detail
```

It should not communicate:

```txt
generic SaaS card
busy neon dashboard
heavy gamer UI
unreadable glassmorphism
animation for animation's sake
```

---

# 4. Layout

## 4.1 Default card

Structure:

```txt
eyebrow / category
title
description
tag row
footer links
```

## 4.2 Featured card

For featured projects, allow a larger card with optional image/media area.

The featured layout should support:

```txt
left content / right visual on desktop
stacked content on mobile
larger title
more pronounced edge current
```

Do not require every project to have an image.

---

# 5. Visual Requirements

## 5.1 Surface

Use a dark glass-like surface:

```css
background:
  linear-gradient(145deg, rgba(9, 23, 38, 0.92), rgba(3, 10, 18, 0.96));
border: 1px solid rgba(125, 218, 255, 0.16);
box-shadow:
  0 24px 70px rgba(0, 0, 0, 0.36),
  inset 0 1px 0 rgba(255, 255, 255, 0.08);
```

Keep the text readable.

Do not make the card too transparent.

## 5.2 Signature edge current

Each card should have a subtle animated edge current.

Implementation options:

```txt
CSS pseudo-element with gradient mask
absolutely positioned border glint
small moving background-position animation
```

The edge current should:

```txt
be visible on hover/focus
remain very subtle at rest
use blue/gold based on accent
not cover text
not create large glows
```

## 5.3 Watermark emblem

Add a faint emblem watermark in the background.

Requirements:

```txt
large but faint
positioned bottom-right or center-right
opacity 0.035-0.08
never blocks text
hidden or reduced on small cards if cluttered
```

The watermark should be decorative and `aria-hidden`.

---

# 6. Interaction

## 6.1 Hover

On hover-capable devices:

```txt
card lifts 2-4px
edge current becomes slightly brighter
small glint travels around edge
watermark becomes slightly more visible
```

Do not use aggressive scale.

Recommended:

```css
transform: translateY(-3px);
```

## 6.2 Focus

Keyboard focus must be clear.

If the whole card is clickable, use a semantic anchor and visible focus ring.

```css
.signatureProjectCard:focus-visible {
  outline: 2px solid rgba(71, 240, 255, 0.72);
  outline-offset: 4px;
}
```

---

# 7. Accessibility

- [ ] Use semantic `article` or anchor wrapper depending on click behavior.
- [ ] Images must have meaningful `alt` text or empty alt when decorative.
- [ ] CTA links must have accessible labels.
- [ ] Tags should be readable text, not purely decorative pills.
- [ ] Focus state must be visible.
- [ ] Reduced-motion mode should disable glint travel and hover movement.

---

# 8. Data Integration

Do not hardcode project content inside the card component.

Use existing project data if available.

Preferred shape:

```ts
export type Project = {
  title: string;
  eyebrow?: string;
  description: string;
  tags: string[];
  href?: string;
  githubHref?: string;
  imageSrc?: string;
  imageAlt?: string;
  featured?: boolean;
  accent?: "blue" | "gold" | "balanced";
};
```

---

# 9. Acceptance Criteria

- [ ] SignatureProjectCard renders project title, description, tags, and links.
- [ ] Featured and non-featured states are supported.
- [ ] Card uses dark liquid-glass styling.
- [ ] Card has a subtle blue/gold edge current.
- [ ] Card has a faint decorative emblem watermark.
- [ ] Text remains highly readable.
- [ ] Hover and focus states are polished but not excessive.
- [ ] Reduced-motion disables motion effects.
- [ ] No new dependencies are added.
- [ ] Existing project data is not hardcoded into the card.
- [ ] `npm run build` passes.

---

# 10. Codex Implementation Prompt

```txt
Implement Spec 0021: Liquid Glass Signature Project Card.

Create:
src/components/projects/SignatureProjectCard.tsx

The component should render project content with a premium dark liquid-glass surface, subtle blue/gold edge current, and faint emblem watermark.

Props:
- title
- eyebrow?
- description
- tags?
- href?
- githubHref?
- imageSrc?
- imageAlt?
- featured?
- accent?: blue | gold | balanced
- className?

Use CSS-only effects. No new dependencies.

Important:
- text must remain readable
- watermark must be faint and decorative
- hover should be subtle
- keyboard focus must be visible
- reduced-motion disables motion
- do not hardcode project data inside the component
- build passes
```
