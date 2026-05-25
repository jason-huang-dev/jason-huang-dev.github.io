# Spec 0010: Featured Yin-Yang Project Interaction

## Status

proposed

## Owner

Jason Huang

## Last Updated

2026-05-25

## Target Area

Featured project module interaction inside the portfolio work section.

---

# 1. Purpose

This spec defines a special featured project interaction inspired by the yin-yang / water balance branding.

The interaction should make one project feel memorable without turning every project card into a complex symbolic UI.

This feature should complement the Ripple Work Grid, not replace it.

---

# 2. Product Goal

The featured interaction should communicate:

```txt
balance
clarity
flow
technical craft
project storytelling
```

A visitor should experience a premium branded moment while still being able to understand the project quickly.

---

# 3. User Experience

The featured project appears as a circular medallion or balanced split surface.

Default state:

```txt
circular yin-yang inspired medallion
project title centered
project category
subtle water/gold ring
small project icon or initials
```

Hover/focus state:

```txt
medallion partitions into two readable halves
left half reveals project summary and role
right half reveals screenshot, mini demo, or preview area
CTA appears clearly
```

Click/tap state:

```txt
opens the existing ProjectDetailDrawer
```

Mobile state:

```txt
no complex hover dependency
card displays stacked summary and preview
tap opens ProjectDetailDrawer
```

---

# 4. Visual Direction

Use an abstract yin-yang inspiration.

Do not use a literal religious/spiritual symbol in a way that feels ornamental or culturally careless.

Visual cues:

```txt
balanced circular form
two complementary halves
gold + cyan/water contrast
soft central divider curve
subtle ripple rings
project content revealed through partition
```

Avoid:

```txt
overly literal black-white yin-yang clipart
busy water splash effects
hard-to-read text on curved shapes
complex animation that breaks mobile
forcing every project into this pattern
```

---

# 5. Component/API Requirements

Create:

```txt
src/components/portfolio/FeaturedYinYangProject.tsx
```

Optional subcomponents:

```txt
src/components/portfolio/YinYangMedallion.tsx
src/components/portfolio/FeaturedProjectPreview.tsx
```

API:

```ts
export type FeaturedYinYangProjectProps = {
  project: PortfolioProject;
  onOpen?: (projectId: string) => void;
};
```

The component should use the same `PortfolioProject` model from Spec 0006.

---

# 6. Responsive Behavior

## 6.1 Desktop

Recommended layout:

```txt
section container: full width
featured module: 100%
height: 520px to 680px
left content zone: project summary
right content zone: demo/preview
center: circular medallion interaction
```

Alternative simpler desktop layout:

```txt
large circular medallion card
on hover, internal two-column content fades/slides in
```

## 6.2 Tablet

```txt
module height: auto
medallion becomes a rounded rectangle with circular visual header
summary and preview stack or use 2-column if space allows
```

## 6.3 Mobile

Do not rely on hover.

Mobile layout:

```txt
static featured card
top: circular emblem/project initials
middle: title, summary, role
bottom: preview image or placeholder
CTA: View details
```

No required partition animation below 768px.

---

# 7. Accessibility

Required:

- Interaction must work with keyboard focus.
- Hover reveal must also occur on focus.
- Click/tap opens drawer using a real `<button>`.
- Text must remain readable before and after reveal.
- Motion must respect `prefers-reduced-motion`.
- The decorative yin-yang shape should be `aria-hidden` if not conveying content.
- The project title should be real text, not only part of an image.

Keyboard behavior:

```txt
Tab to featured project button/card
Focus state reveals the partition content
Enter/Space opens project drawer
Escape closes drawer through ProjectDetailDrawer
```

---

# 8. Implementation Details

## 8.1 Recommended Structure

```tsx
export function FeaturedYinYangProject({
  project,
  onOpen,
}: FeaturedYinYangProjectProps) {
  return (
    <section className="featuredProject" aria-labelledby={`featured-${project.id}`}>
      <button
        type="button"
        className="featuredProjectButton"
        onClick={() => onOpen?.(project.id)}
      >
        <span className="medallionLayer" aria-hidden="true" />
        <span className="contentLayer">
          <span className="defaultState">...</span>
          <span className="revealedState">...</span>
        </span>
      </button>
    </section>
  );
}
```

If a button containing rich content causes semantics concerns, use a wrapper with a clear button CTA inside. Keep keyboard access simple and valid.

## 8.2 Partition Effect

Use CSS transforms and clip paths cautiously.

Preferred simple implementation:

```txt
two absolutely positioned panels
left panel clips/reveals summary
right panel clips/reveals preview
on hover/focus, panels translate outward by 16px to 28px
center divider glow appears
default medallion opacity reduces slightly
```

Avoid complex SVG path morphing in the MVP.

Suggested CSS behavior:

```css
.featuredProjectButton:hover .leftPartition,
.featuredProjectButton:focus-visible .leftPartition {
  transform: translateX(-18px);
  opacity: 1;
}

.featuredProjectButton:hover .rightPartition,
.featuredProjectButton:focus-visible .rightPartition {
  transform: translateX(18px);
  opacity: 1;
}
```

## 8.3 Preview Side

The preview side can show:

```txt
project screenshot
small animated GIF/WebM if optimized
static mockup card
code snippet preview
dashboard preview
```

MVP should use a static image or styled placeholder.

Do not add a video/demo dependency in this spec unless assets already exist.

## 8.4 Content Side

The content side should show:

```txt
category
title
one-sentence summary
role
top 3 tech stack pills
View details CTA
```

Keep text short.

## 8.5 Motion

Desktop hover/focus animation:

```txt
duration: 260ms to 420ms
easing: cubic-bezier(0.22, 1, 0.36, 1)
transform: translate/scale only
opacity transition allowed
```

Reduced motion:

```txt
no translate animation
instant reveal or simple opacity state
```

---

# 9. Acceptance Criteria

- [ ] FeaturedYinYangProject component exists.
- [ ] Component renders one featured project from project data.
- [ ] Default state shows project title and brand-inspired medallion.
- [ ] Hover reveals partitioned project summary and preview.
- [ ] Keyboard focus reveals the same content.
- [ ] Click/tap opens ProjectDetailDrawer.
- [ ] Mobile version does not depend on hover.
- [ ] Text remains readable at all states.
- [ ] No WebGL/canvas is used.
- [ ] No complex SVG morphing is required.
- [ ] Reduced motion is respected.

---

# 10. Non-Goals

This spec does not require:

- applying the interaction to every project;
- live demos;
- embedded iframes;
- WebGL water simulation;
- real physics;
- dedicated project pages;
- complex clip-path morph animation;
- new logo generation.

---

# 11. Risks and Mitigations

## Risk: Interaction becomes gimmicky

Mitigation:

- use it for one featured project only;
- keep copy readable;
- keep animation restrained.

## Risk: Hover interaction fails on mobile

Mitigation:

- mobile renders static stacked content;
- tap opens drawer.

## Risk: Curved partition makes text hard to read

Mitigation:

- place text on rectangular/rounded overlay regions;
- keep curved visual decorative behind content.

## Risk: Too hard to implement

Mitigation:

- avoid SVG morphing;
- use two simple panels and transforms;
- use static preview placeholder first.

---

# 12. QA Checklist

- [ ] Desktop hover.
- [ ] Desktop keyboard focus.
- [ ] Enter/Space opens drawer.
- [ ] Mobile tap opens drawer.
- [ ] Reduced motion mode.
- [ ] 1440px layout.
- [ ] 768px layout.
- [ ] 390px layout.
- [ ] Check text contrast.
- [ ] Check no overflow during partition animation.
- [ ] Check drawer still works.

---

# 13. Codex Implementation Prompt

```txt
Implement Spec 0010.

Create a FeaturedYinYangProject component that renders one featured project using the existing PortfolioProject data model. The component should show an abstract yin-yang/water medallion by default, reveal a two-part summary and preview layout on hover/focus, and open the existing ProjectDetailDrawer on click/tap. Keep the interaction accessible, responsive, and CSS-based. Do not use canvas, WebGL, or complex SVG morphing. On mobile, render a static stacked featured card that does not depend on hover.
```

---

# 14. Done Definition

Spec 0010 is complete when the portfolio has one memorable, brand-specific featured project interaction that is still readable, accessible, responsive, and maintainable.
