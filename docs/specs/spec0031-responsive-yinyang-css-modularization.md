# Spec 0110: Responsive Yin-Yang Scene Cleanup and CSS Modularization

## Status

proposed

## Owner

Jason Huang / Portfolio UI Library

## Last Updated

2026-05-30

## Scope

This spec fixes the tablet and mobile styling for `YinYangProjectScene` and breaks the current large `index.css` file into smaller, maintainable style modules.

This spec intentionally does **not** redesign the desktop scene. Desktop should stay visually equivalent except for already-approved light-mode still-state tuning.

---

## Problem

The current desktop styling is acceptable, but the tablet/mobile styling is not. The current responsive rules force the yin-yang pieces into the open/split transform at smaller breakpoints, which causes the two image halves and central symbol to stop lining up as a clear yin-yang mark.

The current `index.css` has also become a “god CSS file.” It contains tokens, layout, component styling, responsive rules, animation keyframes, drawer styling, hero fluid styling, project cards, and theme-adjacent overrides in one file. This makes it hard to safely tune only the tablet/mobile scene without accidentally affecting unrelated components.

---

## Goals

- Keep the approved desktop composition unchanged.
- Fix tablet and mobile so the yin-yang asset remains visually closed/aligned instead of forced into the open state.
- Keep content and project preview visible on tablet/mobile without requiring the yin-yang halves to split open.
- Preserve the existing hover/open behavior on desktop.
- Move `index.css` into smaller files with clear ownership boundaries.
- Avoid selector renames, JSX rewrites, and broad design changes in this spec.
- Keep the first implementation reviewable in a single PR.

---

## Non-goals

- Do not redesign the actual yin-yang image assets.
- Do not change the fluid simulation behavior in this spec.
- Do not replace Tailwind, Vite, or the theme system.
- Do not rewrite components to CSS Modules yet.
- Do not introduce a new animation library.
- Do not change routing, project data, or drawer content.

---

## Current Observations

### 1. Light theme already has scene-specific variables

`theme.css` already contains a `YinYangProjectScene` mode-specific block for the light theme. This is the right place to keep light-only scene tuning values.

Current relevant block:

```css
.yinYangProjectScene[data-mode='light'] {
  --scene-half-rest-gap: 100px;
  --scene-left-rest-rotate: 6deg;
  --scene-left-open-x: calc(-50vw + var(--scene-edge-inset));
  --scene-right-open-x: calc(50vw - var(--scene-edge-inset));
  --scene-half-open-scale: 0.72;
}
```

### 2. Base still-state left half can consume the light-only variable

The still-state left half should be the only place where `--scene-left-rest-rotate` is applied for desktop.

Target:

```css
.yinYangProjectScene__half--left {
  transform:
    translateX(calc(-1 * var(--scene-half-rest-gap)))
    rotate(var(--scene-left-rest-rotate, 0deg));
}
```

### 3. Current tablet/mobile rules force open-state artwork

The tablet rule currently changes the scene into an always-open composition by using `--scene-left-open-x`, `--scene-left-open-rotate`, `--scene-half-open-scale`, seal opacity, and emblem hiding.

That is useful for making content visible, but it breaks the symbol alignment. The fix is to separate two concepts:

1. **Responsive content reveal**: content and preview can remain visible on tablet/mobile.
2. **Responsive artwork pose**: the yin-yang halves should stay in a closed/resting pose on tablet/mobile.

---

## Required File Split

Create a `src/styles` directory and split the current CSS by responsibility.

Recommended structure:

```txt
src/
  index.css                         # temporary compatibility entry or deleted after import migration
  styles/
    tailwind.css                    # font import + @tailwind directives only
    tokens.css                      # root tokens copied from current index/theme/tokens where appropriate
    base.css                        # *, html, body, focus-visible, global anchors/buttons
    layout.css                      # pageShell, container, page sections, grids
    animation-keyframes.css         # keyframes only
    responsive.css                  # global responsive layout rules that are not component-specific
    components/
      navigation.css
      buttons.css
      water-backdrop.css
      hero.css
      featured-project.css
      yin-yang-project-scene.css
      signature-current-divider.css
      project-pearl-dock.css
      project-cards.css
      project-artifact-preview.css
      systems.css
      drawer.css
      contact.css
      footer.css
    themes/
      theme.css                     # existing theme.css moved here or imported from existing location
      light-overrides.css           # optional split if theme.css remains large
```

### Import strategy

Use JavaScript/TypeScript import order instead of CSS `@import` after Tailwind. This avoids invalid CSS import ordering and keeps Tailwind first.

In the app entry, replace the single CSS import:

```ts
import './index.css';
```

with:

```ts
import './styles/tailwind.css';
import './styles/tokens.css';
import './styles/base.css';
import './styles/layout.css';
import './styles/components/navigation.css';
import './styles/components/buttons.css';
import './styles/components/water-backdrop.css';
import './styles/components/hero.css';
import './styles/components/featured-project.css';
import './styles/components/yin-yang-project-scene.css';
import './styles/components/signature-current-divider.css';
import './styles/components/project-pearl-dock.css';
import './styles/components/project-cards.css';
import './styles/components/project-artifact-preview.css';
import './styles/components/systems.css';
import './styles/components/drawer.css';
import './styles/components/contact.css';
import './styles/components/footer.css';
import './styles/responsive.css';
import './styles/animation-keyframes.css';
import './styles/themes/theme.css';
```

If the project strongly prefers one stylesheet import in `main.tsx`, create `src/styles/appStyles.ts` that imports these CSS files in order, then import only `./styles/appStyles` from the app entry.

---

## CSS Split Rules

- Move CSS only. Do not rename selectors in this spec.
- Preserve selector order unless this spec explicitly changes tablet/mobile behavior.
- Keep all keyframes in `animation-keyframes.css` unless they are tightly component-local and used only by one component.
- Keep `YinYangProjectScene` base, desktop hover/open, and its responsive rules in `components/yin-yang-project-scene.css`.
- Keep theme-mode values for `YinYangProjectScene[data-mode='light']` and `YinYangProjectScene[data-mode='dark']` in `themes/theme.css`.
- Do not mix project drawer, hero, and yin-yang responsive rules in the same file after the split.
- New files should generally stay under 700 lines.
- `index.css` should be reduced to either zero usage or a compatibility comment plus imports handled elsewhere.

---

## Responsive Behavior Requirements

### Desktop, `min-width: 1025px`

Desktop should keep the current interaction model:

- Closed state shows centered yin-yang scene.
- Hover/focus/open splits the two halves outward.
- Content and preview reveal on hover/focus/open.
- Left light-mode still rotation applies only to the closed/resting state.
- Open state should not inherit the resting rotation unless a future spec explicitly requests that.

### Tablet, `768px - 1024px`

Tablet should use a static, readable layout:

- Stack content into one column.
- Keep content and preview visible.
- Keep the yin-yang artwork in a closed/resting pose.
- Do not rotate halves to `-180deg` / `180deg` in the default tablet state.
- Do not hide the emblem or force the seal visible in the default tablet state.
- Reduce the rest gap from desktop so the symbol reads as one closed mark.

Recommended tablet variables:

```css
@media (max-width: 1024px) {
  .yinYangProjectScene[data-mode='light'] {
    --scene-half-rest-gap: clamp(38px, 6vw, 56px);
    --scene-left-rest-rotate: 3deg;
  }

  .yinYangProjectScene[data-mode='dark'] {
    --scene-half-rest-gap: clamp(18px, 4vw, 28px);
  }
}
```

Recommended tablet artwork pose:

```css
@media (max-width: 1024px) {
  .yinYangProjectScene__half--left {
    opacity: 1;
    transform:
      translateX(calc(-1 * var(--scene-half-rest-gap)))
      rotate(var(--scene-left-rest-rotate, 0deg));
  }

  .yinYangProjectScene__half--right {
    opacity: 1;
    transform: translateX(var(--scene-half-rest-gap));
  }

  .yinYangProjectScene__watermark {
    border-color: rgba(247, 201, 72, 0);
    opacity: 1;
    transform: scale(var(--scene-emblem-closed-scale));
  }

  .yinYangProjectScene__seal {
    opacity: 0;
    transform: scale(1.08);
  }

  .yinYangProjectScene__emblem {
    opacity: 1;
    transform: scale(1);
  }
}
```

Keep this existing tablet behavior:

```css
@media (max-width: 1024px) {
  .yinYangProjectScene__content,
  .yinYangProjectScene__preview {
    opacity: 1;
    pointer-events: auto;
    transform: none;
  }
}
```

### Mobile, `max-width: 767px`

Mobile should prioritize alignment and readability:

- Keep the symbol closed and centered.
- Shrink the asset stage but do not force open transforms.
- Keep content below/after the art.
- Disable hover-only art transforms because touch screens do not need the split-open effect.
- Keep the same closed artwork pose even if a browser fires hover/focus styles.

Recommended mobile variables:

```css
@media (max-width: 767px) {
  .yinYangProjectScene[data-mode='light'] {
    --scene-half-rest-gap: clamp(20px, 7vw, 32px);
    --scene-left-rest-rotate: 2deg;
  }

  .yinYangProjectScene[data-mode='dark'] {
    --scene-half-rest-gap: clamp(12px, 5vw, 22px);
  }
}
```

Recommended mobile half override:

```css
@media (max-width: 767px) {
  .yinYangProjectScene__half--left,
  .yinYangProjectScene__trigger:hover .yinYangProjectScene__half--left,
  .yinYangProjectScene__trigger:focus-visible .yinYangProjectScene__half--left {
    opacity: 1;
    transform:
      translateX(calc(-1 * var(--scene-half-rest-gap)))
      rotate(var(--scene-left-rest-rotate, 0deg));
  }

  .yinYangProjectScene__half--right,
  .yinYangProjectScene__trigger:hover .yinYangProjectScene__half--right,
  .yinYangProjectScene__trigger:focus-visible .yinYangProjectScene__half--right {
    opacity: 1;
    transform: translateX(var(--scene-half-rest-gap));
  }
}
```

Recommended mobile seal/emblem override:

```css
@media (max-width: 767px) {
  .yinYangProjectScene__watermark,
  .yinYangProjectScene__trigger:hover .yinYangProjectScene__watermark,
  .yinYangProjectScene__trigger:focus-visible .yinYangProjectScene__watermark {
    opacity: 1;
    transform: scale(var(--scene-emblem-closed-scale));
  }

  .yinYangProjectScene__seal,
  .yinYangProjectScene__trigger:hover .yinYangProjectScene__seal,
  .yinYangProjectScene__trigger:focus-visible .yinYangProjectScene__seal {
    opacity: 0;
    transform: scale(1.08);
  }

  .yinYangProjectScene__emblem,
  .yinYangProjectScene__trigger:hover .yinYangProjectScene__emblem,
  .yinYangProjectScene__trigger:focus-visible .yinYangProjectScene__emblem {
    opacity: 1;
    transform: scale(1);
  }
}
```

---

## Implementation Steps

### Step 1: Create style module directory

Create the `src/styles` directory and component/theme subdirectories.

### Step 2: Move Tailwind setup

Move only this part from the top of `index.css` into `src/styles/tailwind.css`:

```css
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Geist:wght@400;500;600;700;800&display=swap');
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### Step 3: Extract CSS modules without behavior changes

Copy blocks from `index.css` into the new files. Do not change selectors yet.

Suggested first extraction order:

1. `tokens.css`
2. `base.css`
3. `layout.css`
4. `components/yin-yang-project-scene.css`
5. `components/featured-project.css`
6. `components/project-cards.css`
7. `components/drawer.css`
8. remaining components
9. `responsive.css`
10. `animation-keyframes.css`

After each extraction, run the app and confirm no visible behavior changes before moving the next chunk.

### Step 4: Move current `theme.css`

Move existing `theme.css` to `src/styles/themes/theme.css` or keep it in place and import it from the new style entry. Do not merge it into `index.css` again.

### Step 5: Add still-state light rotation only

Ensure the still-state left half uses:

```css
.yinYangProjectScene__half--left {
  transform:
    translateX(calc(-1 * var(--scene-half-rest-gap)))
    rotate(var(--scene-left-rest-rotate, 0deg));
}
```

Do not apply the variable to the desktop open/hover transform in this spec.

### Step 6: Replace tablet/mobile art pose

Replace the tablet/mobile forced-open pose with the closed/resting pose described above.

### Step 7: Visual verification pass

Capture screenshots for:

- Desktop dark closed
- Desktop dark hover/open
- Desktop light closed
- Desktop light hover/open
- Tablet light closed/static layout
- Tablet dark closed/static layout
- Mobile light closed/static layout
- Mobile dark closed/static layout

---

## Acceptance Criteria

- `index.css` is no longer a multi-thousand-line file.
- No new CSS file exceeds 700 lines unless explicitly justified.
- Desktop light/dark closed and hover/open states are visually unchanged except approved still-state left rotation.
- Tablet and mobile no longer force the yin-yang artwork into the split-open `rotate(-180deg)` / `rotate(180deg)` pose.
- Tablet and mobile content remains visible and readable.
- Light-mode tablet/mobile yin-yang halves align into one readable mark.
- Dark-mode tablet/mobile yin-yang halves align into one readable mark.
- No JSX component API changes are required.
- No selector renames are required.
- `pnpm lint` passes.
- `pnpm build` passes.
- Visual testing confirms no regressions in navbar, drawer, project cards, footer, and hero layout.

---

## Risks

### Risk: CSS order regression

Splitting CSS can change cascade order. Use explicit import order from the app entry and verify after every extraction step.

### Risk: Theme variables lose specificity

The selector `.yinYangProjectScene[data-mode='light']` has higher specificity than `.yinYangProjectScene`. Responsive overrides that need to beat it should use the same selector inside media queries.

### Risk: Mobile hover styles still fire

Some mobile browsers emulate hover/focus. Mobile-specific rules should include the base selector plus hover/focus selector variants so the closed pose wins on touch devices.

---

## Rollback Plan

- Revert the CSS import entry file to `import './index.css';`.
- Restore the original `index.css` from Git.
- Keep the new split files unreferenced until the cascade issue is fixed.

---

## Developer Notes

The implementation should be done as a small, mechanical refactor first, then the responsive behavior change second. Do not combine this with the fluid-current tuning spec.
