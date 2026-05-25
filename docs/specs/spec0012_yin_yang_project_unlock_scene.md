# Spec 0012: Yin-Yang Project Unlock Scene

## Status

proposed

## Owner

Jason Huang

## Last Updated

2026-05-25

## Target Area

Featured portfolio project display scene using left/right yin-yang PNG assets and a center emblem animation.

---

# 1. Purpose

This spec defines a new interactive project display scene where two yin-yang PNG halves unlock on hover/focus to reveal project content.

The scene uses prepared image assets rather than generating the yin-yang symbol with CSS, canvas, or SVG paths.

The interaction should feel like:

```txt
closed emblem state
hover/focus unlock
yin-yang halves rotate and part
center emblem pulses larger
center emblem scales down and insets into the background
project content becomes readable
```

This scene should be used to display a featured project, while the normal project grid remains the main scannable project list.

---

# 2. Product Goal

The scene should communicate:

```txt
balance
flow
clarity
technical polish
cultural depth
premium interaction
```

It must also serve a practical portfolio function:

```txt
show project title
show project summary
show tech stack
show project preview/demo area
open detailed case study drawer
```

The visual flourish must not make the project harder to understand.

---

# 3. Interaction Overview

## 3.1 Closed State

The scene starts as a centered sealed composition:

```txt
left yin-yang half PNG
right yin-yang half PNG
center emblem PNG above both halves
subtle glow/ripple background
project title or small project label
```

The two halves should visually complete the full yin-yang symbol when aligned.

## 3.2 Hover / Focus Unlock State

On hover or keyboard focus:

```txt
left half rotates/translates outward
right half rotates/translates outward
each semicircle/open side turns toward the middle
center emblem pulses larger
center emblem then scales smaller and insets into the background
project content fades/slides in
project preview fades/scales in
```

The scene should feel like a scroll or seal opening.

## 3.3 Active State

After the animation settles:

```txt
left/content side: project title, summary, role, tech stack, CTA
right/preview side: screenshot, mock panel, or demo preview
background: small low-opacity inset emblem
```

Click/tap opens `ProjectDetailDrawer`.

---

# 4. Asset Requirements

Use isolated 1:1 PNG assets with real transparent backgrounds.

Required assets:

```txt
1. center emblem PNG
2. light left yin-yang half PNG
3. light right yin-yang half PNG
4. dark left yin-yang half PNG
5. dark right yin-yang half PNG
```

Recommended paths:

```txt
public/brand/yinyang/emblem.png
public/brand/yinyang/light-left.png
public/brand/yinyang/light-right.png
public/brand/yinyang/dark-left.png
public/brand/yinyang/dark-right.png
```

Asset rules:

- each PNG is isolated from the others;
- each PNG has true transparent alpha;
- no checkerboard background is baked into the image;
- each asset is 1:1 aspect ratio;
- left/right halves align into a complete symbol when closed;
- no visible overlap when closed;
- no giant empty bounding boxes that make positioning difficult.

---

# 5. Theme Modes

The scene must support light and dark visual modes.

```ts
export type YinYangProjectSceneMode = "light" | "dark";
```

Asset mapping:

```ts
const assetsByMode = {
  light: {
    left: "/brand/yinyang/light-left.png",
    right: "/brand/yinyang/light-right.png",
    emblem: "/brand/yinyang/emblem.png",
  },
  dark: {
    left: "/brand/yinyang/dark-left.png",
    right: "/brand/yinyang/dark-right.png",
    emblem: "/brand/yinyang/emblem.png",
  },
};
```

If the site currently ships only dark theme, implement `mode="dark"` first but preserve the mode-ready API.

---

# 6. Component API

Create:

```txt
src/components/portfolio/YinYangProjectScene.tsx
```

Optional:

```txt
src/components/portfolio/YinYangProjectScene.module.css
src/components/portfolio/YinYangProjectScene.motion.ts
```

API:

```ts
export type YinYangProjectSceneMode = "light" | "dark";

export type YinYangProjectSceneProps = {
  project: PortfolioProject;
  mode?: YinYangProjectSceneMode;
  defaultOpen?: boolean;
  onOpen?: (projectId: string) => void;
  className?: string;
};
```

The component must use the existing `PortfolioProject` model from Spec 0006.

---

# 7. Suggested JSX Structure

```tsx
export function YinYangProjectScene({
  project,
  mode = "dark",
  defaultOpen = false,
  onOpen,
  className,
}: YinYangProjectSceneProps) {
  const assets = assetsByMode[mode];

  return (
    <section className={className} aria-labelledby={`project-scene-${project.id}`}>
      <div className="sceneFrame">
        <button
          type="button"
          className="sceneTrigger"
          onClick={() => onOpen?.(project.id)}
          aria-label={`View details for ${project.title}`}
        >
          <span className="assetStage" aria-hidden="true">
            <img className="yinHalf yinLeft" src={assets.left} alt="" />
            <img className="yinHalf yinRight" src={assets.right} alt="" />
            <img className="centerEmblem" src={assets.emblem} alt="" />
          </span>

          <span className="projectContent">
            <span className="projectMeta">{project.category}</span>
            <span id={`project-scene-${project.id}`} className="projectTitle">
              {project.title}
            </span>
            <span className="projectSummary">{project.shortDescription}</span>
            <span className="techStack">...</span>
            <span className="viewDetails">View details</span>
          </span>

          <span className="projectPreview" aria-hidden="true">
            ...
          </span>
        </button>
      </div>
    </section>
  );
}
```

If a large button with rich content creates semantic issues, use a non-button wrapper with a normal CTA button inside. Do not nest interactive elements inside another interactive element.

---

# 8. Layout

## 8.1 Desktop

Recommended:

```txt
scene max-width: 1120px
scene min-height: 560px
scene border-radius: 32px
asset stage size: 420px to 520px
```

Closed layout:

```txt
asset stage centered
project label below or subtly overlaid
```

Open layout:

```txt
left content panel: 40% width
right preview panel: 40% width
yin-yang halves frame the middle opening
emblem inset behind content at 12% to 18% opacity
```

## 8.2 Tablet

```txt
asset stage: 340px to 420px
content and preview may stack below the animation
movement distance reduced
```

## 8.3 Mobile

Hover cannot be required.

Mobile behavior:

```txt
scene renders in open/readable state by default
yin-yang halves become decorative header art
project content appears below
preview appears below content
CTA opens drawer
```

Mobile asset stage:

```txt
220px to 300px
```

No hidden hover-only content on touch devices.

---

# 9. Animation Specification

Use CSS transitions or Framer Motion.

Preferred:

```txt
Framer Motion if already installed
CSS transitions if not
```

Avoid:

```txt
canvas
WebGL
SVG morphing
physics engine
scroll-jacking
```

## 9.1 Timeline

On hover/focus:

```txt
0ms:
  default closed state

0-180ms:
  halves begin rotating/translating outward
  center emblem starts scale-up pulse

180-360ms:
  halves reach open position
  emblem reaches maximum scale

360-520ms:
  emblem scales down
  emblem moves/insets into background
  project content starts fading in

520-700ms:
  project content and preview fully visible
  subtle ripple glow stabilizes
```

## 9.2 Closed State

```txt
left half:
  x: 0
  y: 0
  rotate: 0deg
  scale: 1

right half:
  x: 0
  y: 0
  rotate: 0deg
  scale: 1

emblem:
  scale: 1
  opacity: 1
  z-index: above halves
```

## 9.3 Open State

Exact values depend on the PNG orientation.

Starting values:

```txt
left half:
  translateX: -120px to -180px
  translateY: -8px to 16px
  rotate: -12deg to -24deg
  scale: 0.92 to 0.98

right half:
  translateX: 120px to 180px
  translateY: 8px to -16px
  rotate: 12deg to 24deg
  scale: 0.92 to 0.98

emblem pulse:
  scale: 1 -> 1.18 -> 0.36
  opacity: 1 -> 0.92 -> 0.14
  translateY: 0 -> 0 -> 24px
```

Important:

- the semicircle/open side of each half should face the middle after the unlock transform;
- if the PNG orientation differs, adjust rotation signs and transform origins;
- use CSS variables so tuning is easy.

## 9.4 Content Reveal

Project content:

```txt
closed opacity: 0
open opacity: 1
closed translateY: 16px
open translateY: 0
delay: starts after 320ms
```

Preview panel:

```txt
closed opacity: 0
open opacity: 1
closed scale: 0.96
open scale: 1
delay: starts after 380ms
```

## 9.5 Reduced Motion

If `prefers-reduced-motion: reduce`:

```txt
no rotation animation
no scale pulse
content appears immediately on focus/hover
halves may shift with no transition or remain static
```

---

# 10. CSS Implementation Notes

Use CSS variables for easy transform tuning:

```css
.scene {
  --left-open-x: -148px;
  --left-open-y: 8px;
  --left-open-rotate: -18deg;

  --right-open-x: 148px;
  --right-open-y: -8px;
  --right-open-rotate: 18deg;

  --emblem-open-scale: 0.36;
}
```

Asset fit:

```css
.assetStage {
  position: relative;
  width: min(46vw, 520px);
  aspect-ratio: 1;
}

.yinHalf,
.centerEmblem {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  pointer-events: none;
  user-select: none;
}
```

If the emblem has different bounds:

```css
.centerEmblem {
  inset: 50%;
  width: 42%;
  height: 42%;
  transform: translate(-50%, -50%);
}
```

---

# 11. Project Content Requirements

The scene must display:

```txt
project category
project title
short description
3 to 5 tech pills
View Details CTA
optional preview/demo area
```

Mapping:

```ts
project.category -> eyebrow
project.title -> heading
project.shortDescription -> summary
project.techStack.slice(0, 5) -> pills
project.image -> preview if available
```

If no project image exists:

```txt
render a styled preview placeholder
include project initials or category icon
do not show a broken image
```

---

# 12. Accessibility

Required:

- keyboard focus triggers same open state as hover;
- click/tap opens project drawer;
- project title is real text;
- asset images are decorative and `aria-hidden`;
- CTA has accessible label;
- no content is accessible only by hover;
- mobile renders readable content without hover;
- reduced motion is respected.

Keyboard behavior:

```txt
Tab to scene trigger
Focus opens scene
Enter/Space opens detail drawer
Tab moves to next focusable element
```

---

# 13. Acceptance Criteria

## Visual

- [ ] Closed state shows both yin-yang halves aligned into one complete symbol.
- [ ] Center emblem is placed above the halves.
- [ ] Hover/focus unlocks the halves.
- [ ] Open halves frame the middle content area.
- [ ] Emblem pulses larger, then scales down and insets into the background.
- [ ] Project content becomes readable after unlock.
- [ ] Scene feels like a controlled seal/scroll opening.
- [ ] Light and dark asset sets are supported.

## Functional

- [ ] Component accepts a `PortfolioProject`.
- [ ] Component supports `mode="light"` and `mode="dark"`.
- [ ] Click/tap calls `onOpen(project.id)`.
- [ ] Scene can connect to `ProjectDetailDrawer`.
- [ ] Missing preview image falls back to styled placeholder.
- [ ] No canvas/WebGL/SVG morphing is used.

## Responsive

- [ ] Desktop uses full interactive unlock.
- [ ] Tablet reduces motion distance.
- [ ] Mobile renders readable content without hover.
- [ ] No horizontal overflow at 320px.
- [ ] Assets scale without clipping.

## Accessibility

- [ ] Keyboard focus reveals content.
- [ ] Enter/Space opens drawer.
- [ ] Decorative assets are hidden from assistive tech.
- [ ] Reduced motion disables pulse/rotation animation.
- [ ] Text contrast remains readable.

---

# 14. Non-Goals

This spec does not require:

- generating or editing PNG assets;
- live demos;
- iframes;
- WebGL;
- canvas water simulation;
- SVG path morphing;
- applying this scene to every project;
- replacing the normal project grid.

---

# 15. Risks and Mitigations

## Risk: PNG halves do not align perfectly

Mitigation:

- ensure assets share identical 1:1 canvas bounds;
- tune `object-fit`, scale, and transform origin;
- use a visual debug overlay during development.

## Risk: Animation feels gimmicky

Mitigation:

- keep transforms modest;
- make project content appear quickly;
- use this scene for one featured project only.

## Risk: Mobile hover interaction fails

Mitigation:

- mobile content is open/readable by default;
- tap opens drawer.

## Risk: Emblem obscures content

Mitigation:

- after pulse, scale emblem down to 0.36 or smaller;
- reduce opacity to 0.12 to 0.18;
- place behind content layer.

---

# 16. QA Checklist

Check:

```txt
desktop closed state
desktop hover open state
desktop focus open state
desktop clicked drawer state
tablet open state
mobile default readable state
reduced motion state
light asset mode
dark asset mode
```

Manual checks:

- [ ] halves align when closed;
- [ ] halves face middle when open;
- [ ] emblem pulse does not obscure text;
- [ ] content is readable;
- [ ] CTA works;
- [ ] drawer opens;
- [ ] keyboard focus works;
- [ ] no image has baked checkerboard;
- [ ] no horizontal scroll.

---

# 17. Suggested Integration

Use in the Work section above the normal grid:

```tsx
<YinYangProjectScene
  project={featuredProject}
  mode="dark"
  onOpen={handleOpenProject}
/>

<ProjectGrid projects={remainingProjects} onOpen={handleOpenProject} />

<ProjectDetailDrawer
  project={selectedProject}
  open={Boolean(selectedProject)}
  onClose={handleCloseProject}
/>
```

The normal project grid remains the main scannable list.

The yin-yang scene is the featured storytelling moment.

---

# 18. Codex Implementation Prompt

```txt
Implement Spec 0012.

Create a YinYangProjectScene component for the portfolio Work section. The component should use isolated transparent PNG assets for left/right yin-yang halves and a center emblem. In the closed state, the two halves align into a complete yin-yang symbol with the emblem centered above them. On hover and keyboard focus, the halves should unlock by rotating/translating so their open semicircle sides face the middle. The center emblem should pulse larger, then scale smaller and inset into the background while project content and preview fade in. Click/tap should call onOpen(project.id) and integrate with ProjectDetailDrawer.

Support mode="light" and mode="dark" asset sets. Use CSS transitions or Framer Motion only. Do not use canvas, WebGL, SVG morphing, or live iframe demos. On mobile, render the scene in a readable open/static layout without relying on hover. Also ensure the existing BrandMark uses the PNG Huang seal asset instead of huang-seal.svg as described in the updated Spec 0009.
```

---

# 19. Done Definition

Spec 0012 is complete when the portfolio has a featured project scene where PNG yin-yang halves unlock into a readable project display, the center emblem pulses and insets into the background, and the interaction remains responsive, accessible, and maintainable.
