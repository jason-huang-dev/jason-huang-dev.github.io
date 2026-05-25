# Spec 0013: Yin-Yang Project Scene Polish and Readability Pass

## Status

implemented

## Owner

Jason Huang

## Last Updated

2026-05-25

## Target Area

Yin-yang featured project scene polish, readability, motion timing, visual hierarchy, and responsive behavior.

## Related Specs

- Spec 0009: Brand Asset System and Logo Usage Rules — PNG Seal Update
- Spec 0012: Yin-Yang Project Unlock Scene — Revised Implementation

---

# 1. Purpose

This spec refines the current yin-yang project scene so it feels crisp, readable, modern, and production-ready.

The current implementation is much closer to the intended direction, but it still needs senior-level UI/UX polish:

```txt
the left water half overlaps the project text too much;
the center emblem watermark needs more intentional framing;
the right preview needs clearer product/demo hierarchy;
the animation should settle faster;
the interaction affordance should be clearer;
the visual layers should feel intentional instead of decorative.
```

This spec should be implemented after the revised Spec 0012 behavior is working.

---

# 2. Product Goal

The project scene should be a premium featured project reveal that balances visual identity with usability.

A viewer should understand the project in under 2 seconds after the scene opens:

```txt
What project is this?
What kind of project is it?
What does it do?
What technologies were used?
Where do I click for details?
```

The yin-yang/water assets should support the story, not reduce legibility.

---

# 3. Senior UI/UX Principles

This implementation must follow these UI/UX principles:

## 3.1 Content First

The scene is a project display, not only a decorative animation.

Priority order in open state:

```txt
1. Project title
2. Short description
3. Tech stack / metadata
4. CTA
5. Preview/demo
6. Water/yin-yang decorative framing
7. Background emblem watermark
```

Decorative assets must never cover or compete with core content.

## 3.2 Clear Visual Hierarchy

Users should see:

```txt
left side = project story
center = brand watermark / transition memory
right side = project preview
```

Avoid ambiguity where the water shapes become the main focal point after the scene is open.

## 3.3 Progressive Disclosure

Closed state can be symbolic.

Open state must be practical.

```txt
closed = brand moment
open = project information
click = full project drawer/case study
```

## 3.4 Motion With Purpose

Animation should guide attention:

```txt
unlock halves
pulse emblem
reveal content
settle quickly
```

Do not create long theatrical motion that delays comprehension.

## 3.5 Responsive by Design

Mobile should not simulate the full desktop hover interaction.

Mobile should show readable content by default.

---

# 4. Current Problems to Fix

Based on the latest scene screenshot, fix these issues:

## 4.1 Left Water Half Overlaps Text

The left yin-yang half currently crosses through:

```txt
UI Library title
description text
tech pills
CTA area
```

This harms readability.

Required fix:

```txt
move the left half farther left;
place it behind the text layer;
lower opacity in open state;
add a text readability scrim behind content.
```

## 4.2 Right Water Half Is Edge-Clipped Awkwardly

The right half is partially clipped by the scene/card edge.

This can work only if intentional.

Required fix:

Choose one clipping model:

```txt
Option A: contained polish
  sceneFrame overflow hidden
  right half sits inside the frame and does not hard-cut awkwardly

Option B: intentional bleed
  outer wrapper allows overflow visible
  bleed is balanced and does not clip at random points
```

For MVP, choose **Option A: contained polish**.

## 4.3 Center Emblem Looks Like a Random Fade

The emblem inset is a good idea, but it currently needs a more intentional background treatment.

Required fix:

```txt
center emblem becomes a low-opacity watermark inside a faint circular seal ring;
centered between content and preview;
opacity 0.10 to 0.16;
never covers text;
never sits on top of preview.
```

## 4.4 Preview Mockup Needs Stronger Meaning

The right preview currently looks like a generic placeholder.

Required fix:

Make the preview feel connected to the project:

```txt
UI Library preview should look like a component system/browser panel;
show a small "UL" tile;
show one active cyan line;
show two muted data/content lines;
show 2–3 component blocks/cards;
use subtle glow and glass border.
```

## 4.5 Animation Should Settle Faster

The scene should reach readable state quickly.

Required target:

```txt
complete readable open state by 420ms to 500ms
```

Do not make the visitor wait for a 700ms reveal.

---

# 5. Visual Direction

The final open scene should feel like:

```txt
premium product case-study card
dark glass system
water halves acting as edge framing
center emblem as quiet brand memory
clean project text
crisp preview panel
clear CTA
```

Avoid:

```txt
water covering text
two full yin-yang symbols
excessive opacity
large emblem over content
preview that looks unrelated
slow theatrical animation
```

---

# 6. Layout Requirements

## 6.1 Desktop Open State

Use a three-zone layout:

```txt
left content zone: 36% to 40%
center emblem zone: 14% to 18%
right preview zone: 40% to 44%
```

Recommended:

```txt
content zone max-width: 460px
preview zone max-width: 460px to 520px
center zone width: 160px to 220px
```

The water halves should not define the layout. They should decorate the edges.

## 6.2 Content Zone

The content zone should have a readability layer.

Required:

```txt
content layer z-index higher than yin-yang halves;
local gradient/scrim behind text;
minimum text contrast preserved;
water layer opacity reduced near text.
```

Suggested CSS:

```css
.contentLayer {
  position: relative;
  z-index: 4;
  max-width: 28rem;
}

.contentLayer::before {
  content: "";
  position: absolute;
  inset: -1.5rem -2rem;
  z-index: -1;
  border-radius: 1.75rem;
  background:
    linear-gradient(
      90deg,
      rgba(3, 10, 17, 0.78),
      rgba(3, 10, 17, 0.42),
      rgba(3, 10, 17, 0)
    );
}
```

## 6.3 Water Half Positioning

Open-state water halves should frame the scene.

Starting tuning values:

```css
.scene {
  --left-open-x: -23rem;
  --left-open-y: 0.25rem;
  --left-open-rotate: -86deg;
  --left-open-scale: 0.82;
  --left-open-opacity: 0.52;

  --right-open-x: 23rem;
  --right-open-y: -0.25rem;
  --right-open-rotate: 86deg;
  --right-open-scale: 0.82;
  --right-open-opacity: 0.62;
}
```

Rules:

```txt
left half should not cross over the title baseline;
left half should not cover more than 10% of the content text area;
right half should not obscure the preview's main content;
right half may overlap preview border slightly only if opacity is low enough.
```

## 6.4 Center Emblem Watermark

Open-state emblem:

```txt
scale: 0.30 to 0.38
opacity: 0.10 to 0.16
z-index: behind content and preview
position: exact center between content and preview
```

Add faint circular seal ring:

```css
.centerSealRing {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 11rem;
  aspect-ratio: 1;
  transform: translate(-50%, -50%);
  border: 1px solid rgba(247, 201, 72, 0.13);
  border-radius: 999px;
  box-shadow:
    0 0 28px rgba(247, 201, 72, 0.08),
    inset 0 0 28px rgba(126, 231, 242, 0.05);
  opacity: 0;
}
```

Open state:

```txt
ring opacity: 1
emblem opacity: 0.10 to 0.16
```

---

# 7. Preview Mockup Requirements

The preview panel should read as a mini demo, not just a decorative rectangle.

## 7.1 Preview Panel Shell

Recommended:

```css
.previewPanel {
  z-index: 4;
  border-radius: 1.5rem;
  background:
    linear-gradient(
      180deg,
      rgba(16, 35, 42, 0.72),
      rgba(11, 22, 30, 0.86)
    );
  border: 1px solid rgba(126, 231, 242, 0.22);
  box-shadow:
    0 18px 48px rgba(0, 0, 0, 0.28),
    inset 0 1px 0 rgba(255, 255, 255, 0.06);
  overflow: hidden;
}
```

## 7.2 Preview Details

For the UI Library featured project, render:

```txt
browser top bar with 3 dots
small UL tile
active cyan component line
secondary muted line
2 to 3 component cards
subtle grid/scanline texture optional
```

If project is not UI Library:

```txt
use project initials;
show project category;
show 2 to 3 neutral preview blocks;
show one accent line.
```

## 7.3 Preview Must Not Dominate

Preview should support the story.

Rules:

```txt
preview opacity: 0.88 to 1 after reveal
preview should not glow more than CTA
preview should not be larger than the overall content story area by more than 15%
```

---

# 8. CTA and Affordance

## 8.1 Closed State

Closed state should show an affordance:

```txt
UNLOCK FEATURED PROJECT
```

Optional secondary hint:

```txt
Hover or focus to preview
```

Do not show both if it becomes cluttered.

## 8.2 Open State

Open state should show a clear CTA:

```txt
VIEW DETAILS →
```

CTA rules:

```txt
high contrast cyan;
visible focus ring;
click opens ProjectDetailDrawer;
position below tech pills;
not covered by water asset;
not hidden behind decorative layers.
```

---

# 9. Animation Timing

Update timing so the scene is readable faster.

## 9.1 Target Timeline

```txt
0ms:
  hover/focus begins

0-180ms:
  left/right halves unlock and move outward

80-240ms:
  emblem pulse begins and reaches max scale

220-360ms:
  emblem shrinks into watermark

260-420ms:
  content fades/slides in

300-460ms:
  preview fades/scales in

460ms:
  final readable state is settled
```

## 9.2 Timing Rules

- Do not exceed 500ms for the readable open state.
- Use transform and opacity only.
- Do not animate layout dimensions.
- Use one clean easing curve.

Recommended easing:

```css
cubic-bezier(0.22, 1, 0.36, 1)
```

---

# 10. Z-Index and Layer Rules

Use this layer stack in open state:

```txt
z-index 0: scene background
z-index 1: center seal ring / watermark
z-index 2: left/right water halves
z-index 3: text readability scrim
z-index 4: content and preview
z-index 5: CTA/focus ring
```

The water halves must be below text and preview.

The emblem watermark must be below text and preview.

---

# 11. Mobile Behavior

Below 768px:

```txt
scene should render readable/open by default;
no hover-only hidden content;
water asset should move to decorative header;
assetStage size: 220px to 280px;
content appears below asset;
preview appears below content;
CTA remains visible;
no large side translation;
no horizontal overflow.
```

Recommended mobile order:

```txt
1. Decorative yin-yang/emblem header
2. Project category
3. Project title
4. Description
5. Tech pills
6. Preview panel
7. View Details CTA
```

Mobile water opacity:

```txt
0.38 to 0.55
```

---

# 12. Accessibility

Required:

- focus-within opens desktop scene;
- CTA button is keyboard reachable;
- decorative water halves use `aria-hidden="true"`;
- emblem watermark uses `aria-hidden="true"`;
- project title and description are real text;
- reduced motion disables rotation/pulse;
- color alone is not used to communicate action;
- CTA has visible focus ring.

Reduced motion behavior:

```txt
no rotation
no emblem pulse
content appears immediately
halves may shift instantly or remain as decorative edge art
```

---

# 13. Implementation Details

## 13.1 State Classes

Use explicit state attributes:

```tsx
<section
  className={styles.scene}
  data-open={isOpen ? "true" : undefined}
  data-mobile-open="true"
>
```

or equivalent.

## 13.2 Avoid Giant Button Wrapper

Do not wrap the entire complex scene in one giant button if it contains nested interactive elements.

Preferred:

```txt
sceneFrame handles hover/focus state
View Details is a real button
preview is non-interactive in this spec
```

## 13.3 CSS Variables

Use these as the first tuning pass:

```css
.scene {
  --asset-size: clamp(22rem, 34vw, 30rem);

  --left-open-x: -23rem;
  --left-open-y: 0.25rem;
  --left-open-rotate: -86deg;
  --left-open-scale: 0.82;
  --left-open-opacity: 0.52;

  --right-open-x: 23rem;
  --right-open-y: -0.25rem;
  --right-open-rotate: 86deg;
  --right-open-scale: 0.82;
  --right-open-opacity: 0.62;

  --emblem-pulse-scale: 1.18;
  --emblem-inset-scale: 0.34;
  --emblem-inset-opacity: 0.13;

  --scene-ease: cubic-bezier(0.22, 1, 0.36, 1);
}
```

Tablet tuning:

```css
@media (max-width: 1024px) {
  .scene {
    --left-open-x: -15rem;
    --right-open-x: 15rem;
    --asset-size: clamp(18rem, 42vw, 24rem);
  }
}
```

Mobile tuning:

```css
@media (max-width: 767px) {
  .scene {
    --asset-size: min(72vw, 17rem);
  }
}
```

---

# 14. Acceptance Criteria

## 14.1 Readability

- [ ] Left water half no longer covers the project title.
- [ ] Left water half does not cover more than 10% of the readable text area.
- [ ] Text has a local readability scrim.
- [ ] Body text remains readable at desktop, tablet, and mobile sizes.
- [ ] Tech pills and CTA are unobstructed.

## 14.2 Visual Hierarchy

- [ ] Open state reads as project content first, decoration second.
- [ ] Center emblem appears intentionally inset inside a faint seal ring.
- [ ] Preview panel feels connected to the featured project.
- [ ] Water halves frame the scene edges.
- [ ] No duplicated full yin-yang symbols appear.

## 14.3 Motion

- [ ] Open state reaches readable layout by 500ms or less.
- [ ] Halves unlock smoothly.
- [ ] Emblem pulse is visible but not distracting.
- [ ] Content and preview reveal after unlock begins.
- [ ] Reduced motion removes rotation and pulse.

## 14.4 Interaction

- [ ] Hover opens the scene on desktop.
- [ ] Keyboard focus opens the scene on desktop.
- [ ] CTA opens ProjectDetailDrawer.
- [ ] Mobile layout is readable without hover.
- [ ] No horizontal overflow at 320px.

## 14.5 Code Quality

- [ ] Transform values are controlled with CSS variables.
- [ ] Layering uses clear z-index rules.
- [ ] No canvas/WebGL/SVG morphing is introduced.
- [ ] No nested interactive elements create invalid HTML.
- [ ] Preview has fallback when no image exists.

---

# 15. Non-Goals

This spec does not require:

- regenerating the yin-yang PNG assets;
- adding live iframe demos;
- implementing a carousel;
- applying this interaction to all project cards;
- adding sound effects;
- using WebGL or canvas;
- creating new project pages.

---

# 16. Risks and Mitigations

## Risk: Moving halves outward weakens the yin-yang concept

Mitigation:

- preserve the closed state as the primary symbolic moment;
- open state can prioritize usability.

## Risk: Preview becomes more important than content

Mitigation:

- keep preview size balanced;
- keep CTA and title visually stronger.

## Risk: Scene looks too busy

Mitigation:

- reduce water opacity;
- keep scrim subtle;
- simplify preview blocks.

## Risk: Mobile becomes too tall

Mitigation:

- reduce asset size;
- keep description concise;
- collapse preview height if necessary.

---

# 17. QA Checklist

Check:

```txt
desktop closed
desktop open hover
desktop keyboard focus
desktop drawer opened
tablet open
mobile 390px
mobile 320px
reduced motion
dark mode
light mode if available
```

Manual checks:

- [ ] no water over title;
- [ ] no water over CTA;
- [ ] preview is not hard-clipped;
- [ ] center emblem is subtle and centered;
- [ ] scene feels readable within 500ms;
- [ ] content is not hidden on mobile;
- [ ] keyboard navigation works;
- [ ] no horizontal scrolling.

---

# 18. Codex Implementation Prompt

```txt
Implement Spec 0013.

Polish the YinYangProjectScene so it follows senior UI/UX principles. The open state should prioritize project readability over decoration. Move the left water half farther left, lower its opacity, and keep it behind the content layer so it no longer overlaps the title, description, tech pills, or CTA. Keep the right water half contained inside the scene frame and behind the preview layer. Add a subtle text readability scrim behind the content.

Make the center emblem feel intentional by shrinking it into a low-opacity watermark inside a faint circular seal ring. Refine the preview panel so it looks like a real mini UI/demo preview instead of a generic placeholder. Speed up the animation so the final readable open state settles within 420–500ms. Use transform and opacity only. Respect reduced motion.

On mobile, render the scene in a readable open/static layout by default with the yin-yang asset as decorative header art. Do not use canvas, WebGL, SVG morphing, iframes, or duplicated full yin-yang symbols. Use CSS variables for transform tuning and clear z-index layers for background, water halves, content, preview, CTA, and watermark.
```

---

# 19. Done Definition

Spec 0013 is complete when the yin-yang project scene feels production-ready: readable first, branded second, responsive, accessible, and visually intentional.
