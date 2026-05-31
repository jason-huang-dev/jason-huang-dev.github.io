# Spec 0030: Portfolio Light Mode Theme Toggle and Brand Asset Swap

## Status

proposed

## Owner

Jason Huang

## Last Updated

2026-05-30

## Target Repository

```txt
jason-huang-dev/jason-huang-dev.github.io
```

## Suggested Branch

```txt
feat/0030-portfolio-light-mode-theme-toggle
```

## Suggested Commit Message

```txt
feat(portfolio): add browser-aware light mode theme toggle
```

---

## Purpose

Add a production-ready light mode to the portfolio while preserving the current dark mode tokens, dark mode layout, and existing signature visual identity.

This spec must not replace the current design. It should add a theme system on top of the current implementation so the portfolio can resolve to:

```txt
system preference -> dark or light
manual override -> dark or light
```

The light mode should use the supplied brand palette direction: deep navy, warm sand, ivory, soft gray, water blue, and champagne gold. It should also swap dark yin-yang/signature PNG assets for their light-mode counterparts.

---

## Repository Context

The active portfolio repository is:

```txt
jason-huang-dev/jason-huang-dev.github.io
```

Current project characteristics:

```txt
Vite + React
React Router
Tailwind CSS
Framer Motion
react-helmet-async
Three / @react-three/fiber / @react-three/drei
Lighthouse and axe quality scripts
```

Relevant architecture observed:

```txt
src/App.jsx
src/app/AppRoutes.jsx
src/pages/HomePage.jsx
src/components/layout/PageShell
src/components/sections/HeroSection
src/components/sections/WorkSection
src/components/sections/SystemsSection
src/components/brand/SignatureCurrentDivider
src/components/brand/SealStampContactCTA
src/components/motion/InkCurrentReveal
src/components/ui/Container
src/components/ui/Reveal
```

Current `tailwind.config.cjs` already contains dark-oriented colors and light-friendly colors. Do not remove the existing named Tailwind colors in this spec. Add semantic aliases only.

---

## Problem Statement

The portfolio currently has a strong dark cinematic identity. A simple light-mode inversion would reduce readability, damage the brand feel, and make gradients harder to read over.

The implementation needs to solve four problems:

1. Preserve the current dark-mode layout and tokens.
2. Add browser-preference-aware theme resolution.
3. Add a visible theme toggle with a safe user override.
4. Swap dark/light signature yin-yang PNG assets and ensure light gradients do not reduce text contrast.

---

## Goals

- [ ] Preserve the current dark mode tokens exactly as the canonical dark theme values.
- [ ] Preserve the current dark mode layout, spacing, section order, motion direction, and signature component placement.
- [ ] Add light mode without deleting or rewriting the dark theme.
- [ ] Resolve the initial theme from the current user's browser preference.
- [ ] Add a user-facing theme toggle.
- [ ] Persist only explicit user overrides in `localStorage`.
- [ ] Continue responding to browser preference changes when the user has not set an explicit override.
- [ ] Swap dark yin-yang/signature PNGs for light yin-yang/signature PNGs in light mode.
- [ ] Ensure all light mode gradients include readable text zones or scrims.
- [ ] Keep implementation small, reviewable, and compatible with the current React, Vite, Tailwind, and Framer Motion setup.
- [ ] Maintain accessibility, keyboard focus, reduced-motion behavior, and existing route focus behavior.

---

## Non-Goals

- [ ] Do not redesign the portfolio layout.
- [ ] Do not change the dark mode visual direction.
- [ ] Do not remove existing dark-mode Tailwind color names.
- [ ] Do not migrate the portfolio to the UI Library in this spec.
- [ ] Do not introduce Redux, Zustand, or another state manager.
- [ ] Do not add backend persistence.
- [ ] Do not create a full theme editor.
- [ ] Do not replace Framer Motion.
- [ ] Do not convert every component in the site in one PR.

---

## Brand Palette Reference

Use the supplied branding direction.

### Dark Palette

```txt
Onyx:          #0A0A0A
Charcoal:      #1B1E22
Slate:         #2C3440
Midnight Navy: #0B1D3A
Electric Water:#00AFFF
Champagne Gold:#D4AF6A
```

### Light Palette

```txt
Deep Navy:     #0D1B2A
Warm Sand:     #E6D7B5
Ivory:         #F7F4EE
Soft Gray:     #D8DDE3
Water Blue:    #2FA7E2
Champagne Gold:#D4AF6A
```

### Light Mode Feeling

```txt
clean
refined
airy
water-polished
premium
readable
modern Chinese-signature influence
```

### Light Mode Must Avoid

```txt
pure white everywhere
low-contrast gold body text
water-blue text on ivory without contrast checks
neon glow on bright surfaces
text placed directly over busy gradients/images
flat unlayered cards
```

---

## Canonical Dark Theme Tokens

The following dark-mode tokens are the current canonical values and must be preserved.

Add them to the global theme file exactly as the dark theme baseline.

```css
:root,
[data-theme='dark'] {
  color-scheme: dark;

  --color-bg: #081018;
  --color-bg-soft: #0d1722;
  --color-surface: rgba(14, 27, 40, 0.78);
  --color-surface-strong: rgba(18, 35, 52, 0.92);
  --color-text: #f7f4ee;
  --color-text-muted: rgba(247, 244, 238, 0.72);
  --color-border: rgba(216, 221, 227, 0.14);
  --color-brand-gold: #d4af6a;
  --color-brand-gold-strong: #e7c98a;
  --color-brand-water: #2ea7ff;
  --color-brand-jade: #47d7ac;
  --color-focus: #69c7ff;
  --radius-pill: 999px;
  --shadow-soft: 0 24px 80px rgba(0, 0, 0, 0.24);
  --shadow-glow-water: 0 0 60px rgba(46, 167, 255, 0.16);
  --shadow-glow-gold: 0 0 56px rgba(212, 175, 106, 0.14);
  --container-max: 1180px;
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
}
```

### Dark Mode Preservation Rules

- Do not rename these existing token names.
- Do not change their dark values in this spec.
- Do not change section spacing, layout, grid breakpoints, or content order while adding light mode.
- Dark mode screenshots should look visually equivalent to the pre-spec site except for negligible anti-aliasing differences.
- If a dark-mode class currently works, do not rewrite it unless it blocks theme support.

---

## New Light Theme Tokens

Add light mode overrides under `[data-theme='light']`.

```css
[data-theme='light'] {
  color-scheme: light;

  --color-bg: #f7f4ee;
  --color-bg-soft: #e6d7b5;
  --color-surface: rgba(255, 250, 241, 0.84);
  --color-surface-strong: rgba(255, 255, 255, 0.94);
  --color-text: #0d1b2a;
  --color-text-muted: rgba(13, 27, 42, 0.72);
  --color-border: rgba(13, 27, 42, 0.14);
  --color-brand-gold: #d4af6a;
  --color-brand-gold-strong: #9a6a18;
  --color-brand-water: #2fa7e2;
  --color-brand-jade: #167b66;
  --color-focus: #0b5f8a;
  --radius-pill: 999px;
  --shadow-soft: 0 24px 70px rgba(13, 27, 42, 0.12);
  --shadow-glow-water: 0 0 52px rgba(47, 167, 226, 0.16);
  --shadow-glow-gold: 0 0 48px rgba(212, 175, 106, 0.16);
  --container-max: 1180px;
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
}
```

### Optional Helper Tokens

These may be added if the current CSS needs more precise control.

```css
:root,
[data-theme='dark'] {
  --color-text-strong: #ffffff;
  --color-link: #f7f4ee;
  --color-link-hover: #e7c98a;
  --color-gradient-scrim: rgba(8, 16, 24, 0.68);
  --color-gradient-scrim-soft: rgba(8, 16, 24, 0.36);
  --color-current-line: rgba(46, 167, 255, 0.38);
  --color-current-line-gold: rgba(212, 175, 106, 0.42);
  --transition-fast: 140ms var(--ease-out);
  --transition-base: 240ms var(--ease-out);
  --transition-slow: 520ms var(--ease-out);
}

[data-theme='light'] {
  --color-text-strong: #081018;
  --color-link: #0d1b2a;
  --color-link-hover: #0b5f8a;
  --color-gradient-scrim: rgba(247, 244, 238, 0.88);
  --color-gradient-scrim-soft: rgba(247, 244, 238, 0.68);
  --color-current-line: rgba(47, 167, 226, 0.26);
  --color-current-line-gold: rgba(154, 106, 24, 0.28);
  --transition-fast: 140ms var(--ease-out);
  --transition-base: 240ms var(--ease-out);
  --transition-slow: 520ms var(--ease-out);
}
```

### Required File

Create:

```txt
src/styles/theme.css
```

Import it from the existing global stylesheet or app entry point.

Preferred import order:

```css
@import './theme.css';
```

or, from JavaScript if the repo already imports global CSS there:

```js
import './styles/theme.css';
```

Do not create multiple competing theme files.

---

## Theme Resolution Behavior

### Theme Modes

The implementation must support these user preference states:

```ts
type ThemePreference = 'system' | 'light' | 'dark';
type ResolvedTheme = 'light' | 'dark';
```

### Default Behavior

- Default preference is `system`.
- If the browser prefers light mode, resolve to `light`.
- If the browser prefers dark mode, resolve to `dark`.
- If `matchMedia` is unavailable, resolve to `dark` to preserve the current site identity.

### Persistence Behavior

Use `localStorage` only for explicit user overrides.

```txt
localStorage key: portfolio-theme-preference
allowed values: system | light | dark
```

Rules:

- If no localStorage value exists, use `system`.
- If the value is invalid, ignore it and reset to `system`.
- If preference is `system`, listen for browser preference changes and update the resolved theme.
- If preference is `light` or `dark`, do not change theme when the browser preference changes.

---

## No-Flash Theme Bootstrap

Because the portfolio is Vite-rendered on the client, add a small inline bootstrap script in `index.html` before the app bundle loads.

Purpose:

```txt
Set documentElement data-theme before React mounts so the page does not flash dark/light incorrectly.
```

Required script behavior:

```html
<script>
  (() => {
    const storageKey = 'portfolio-theme-preference';
    const valid = new Set(['system', 'light', 'dark']);
    const stored = localStorage.getItem(storageKey);
    const preference = valid.has(stored) ? stored : 'system';
    const prefersLight = window.matchMedia?.('(prefers-color-scheme: light)').matches;
    const resolved = preference === 'system' ? (prefersLight ? 'light' : 'dark') : preference;

    document.documentElement.dataset.theme = resolved;
    document.documentElement.dataset.themePreference = preference;
  })();
</script>
```

If the repo has an existing head bootstrap script, merge this logic instead of adding a duplicate global script.

---

## React Theme Hook

Create:

```txt
src/hooks/useThemePreference.js
```

Required responsibilities:

- Read `portfolio-theme-preference` safely.
- Resolve `system` against `matchMedia('(prefers-color-scheme: light)')`.
- Apply `data-theme` to `document.documentElement`.
- Apply `data-theme-preference` to `document.documentElement`.
- Update when the system preference changes and preference is `system`.
- Expose setter helpers for the toggle.

Suggested implementation shape:

```js
import { useCallback, useEffect, useMemo, useState } from 'react';

const STORAGE_KEY = 'portfolio-theme-preference';
const VALID_PREFERENCES = new Set(['system', 'light', 'dark']);

function getStoredPreference() {
  if (typeof window === 'undefined') return 'system';

  const stored = window.localStorage.getItem(STORAGE_KEY);
  return VALID_PREFERENCES.has(stored) ? stored : 'system';
}

function getSystemTheme() {
  if (typeof window === 'undefined') return 'dark';
  return window.matchMedia?.('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

function resolveTheme(preference, systemTheme) {
  return preference === 'system' ? systemTheme : preference;
}

export function useThemePreference() {
  const [preference, setPreferenceState] = useState(getStoredPreference);
  const [systemTheme, setSystemTheme] = useState(getSystemTheme);

  const resolvedTheme = useMemo(
    () => resolveTheme(preference, systemTheme),
    [preference, systemTheme],
  );

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.theme = resolvedTheme;
    root.dataset.themePreference = preference;
  }, [preference, resolvedTheme]);

  useEffect(() => {
    const query = window.matchMedia?.('(prefers-color-scheme: light)');
    if (!query) return undefined;

    const onChange = (event) => {
      setSystemTheme(event.matches ? 'light' : 'dark');
    };

    query.addEventListener?.('change', onChange);
    return () => query.removeEventListener?.('change', onChange);
  }, []);

  const setPreference = useCallback((nextPreference) => {
    if (!VALID_PREFERENCES.has(nextPreference)) return;

    setPreferenceState(nextPreference);

    if (nextPreference === 'system') {
      window.localStorage.removeItem(STORAGE_KEY);
    } else {
      window.localStorage.setItem(STORAGE_KEY, nextPreference);
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setPreference(resolvedTheme === 'dark' ? 'light' : 'dark');
  }, [resolvedTheme, setPreference]);

  return {
    preference,
    resolvedTheme,
    setPreference,
    toggleTheme,
  };
}
```

Implementation may vary, but behavior must match the requirements above.

---

## Theme Toggle Component

Create:

```txt
src/components/theme/ThemeToggle.jsx
```

### Required Behavior

- Visible in the main site chrome, preferably the header/nav area inside `PageShell`.
- Keyboard accessible.
- Uses a native `button`.
- Uses `aria-pressed` for the active manual toggle state.
- Has a clear accessible label.
- Does not cause layout shift when switching themes.
- Uses semantic token colors only.

### Minimal Toggle UX

The first implementation may use a two-state button:

```txt
Light mode button while dark is active
Dark mode button while light is active
```

Even with a two-state visible button, initial theme resolution must still respect browser preference.

### Preferred Toggle UX

A segmented three-option control is preferred if it can be implemented cleanly:

```txt
System | Light | Dark
```

This makes the browser-preference behavior visible to the user.

### Required CSS

```css
.themeToggle {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  min-height: 2.5rem;
  padding: 0.55rem 0.8rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-pill);
  background: var(--color-surface);
  color: var(--color-text);
  box-shadow: var(--shadow-soft);
  transition:
    background var(--transition-base),
    color var(--transition-base),
    border-color var(--transition-base),
    transform var(--transition-fast),
    box-shadow var(--transition-base);
}

.themeToggle:hover {
  transform: translateY(-1px);
  border-color: color-mix(in srgb, var(--color-brand-water), var(--color-border) 45%);
}

.themeToggle:focus-visible {
  outline: 2px solid var(--color-focus);
  outline-offset: 3px;
}
```

If `color-mix` support is a concern, replace that declaration with a static token or a custom helper token.

---

## PageShell Integration

Update `PageShell` to initialize the theme hook and render the theme toggle.

Required:

```txt
PageShell imports useThemePreference
PageShell passes resolvedTheme/preference to ThemeToggle
PageShell keeps existing skip link behavior if present
PageShell keeps main#main-content focus behavior compatible with AppRoutes
```

Suggested structure:

```jsx
import { ThemeToggle } from '../theme/ThemeToggle';
import { useThemePreference } from '../../hooks/useThemePreference';

export function PageShell({ children }) {
  const theme = useThemePreference();

  return (
    <div className="siteShell" data-resolved-theme={theme.resolvedTheme}>
      <a className="skipLink" href="#main-content">Skip to content</a>
      <header className="siteHeader">
        {/* existing nav/header content */}
        <ThemeToggle {...theme} />
      </header>
      <main id="main-content" tabIndex={-1}>
        {children}
      </main>
      {/* existing footer */}
    </div>
  );
}
```

Do not duplicate the `data-theme` source on multiple nested elements unless needed for CSS scoping. The canonical theme attribute should live on `document.documentElement`.

---

## Yin-Yang / Signature PNG Asset Swap

### Requirement

Light mode must use the light-mode yin-yang/signature PNGs. Dark mode must continue using the current dark-mode PNGs.

### Asset Rules

Use explicit assets instead of CSS filters.

Preferred asset naming:

```txt
src/assets/brand/yin-yang-dark.png
src/assets/brand/yin-yang-light.png
src/assets/brand/signature-mark-dark.png
src/assets/brand/signature-mark-light.png
```

If existing dark assets already live elsewhere, keep their current path and add only the missing light-mode counterpart next to them.

### Component Rule

Create or update a brand image component instead of scattering theme checks across sections.

Recommended component:

```txt
src/components/brand/ThemeAwareBrandMark.jsx
```

Suggested shape:

```jsx
import yinYangDark from '../../assets/brand/yin-yang-dark.png';
import yinYangLight from '../../assets/brand/yin-yang-light.png';

export function ThemeAwareBrandMark({ resolvedTheme, decorative = true, className = '' }) {
  const src = resolvedTheme === 'light' ? yinYangLight : yinYangDark;

  return (
    <img
      className={className}
      src={src}
      alt={decorative ? '' : 'Jason Huang signature yin-yang mark'}
      aria-hidden={decorative ? 'true' : undefined}
      loading="eager"
      decoding="async"
    />
  );
}
```

If the mark is used as the main brand logo, `decorative` must be `false` and the image must have meaningful alt text.

If the mark is purely background/decorative, it must use:

```jsx
alt=""
aria-hidden="true"
```

### Acceptance Criteria

- [ ] Dark mode renders the existing dark yin-yang/signature assets.
- [ ] Light mode renders the light yin-yang/signature PNG assets.
- [ ] Theme switching updates the asset without a page refresh.
- [ ] No CSS filter is used to fake a light asset.
- [ ] Brand image size and position remain stable across theme changes.

---

## Light Mode Gradient Readability Rules

Light mode gradients must not sit directly under body text unless a readable text zone is provided.

### Required Contrast Policy

- Body text must meet WCAG AA contrast against its actual rendered background.
- Muted text must not drop below `rgba(..., 0.72)` on light surfaces.
- Champagne gold may be used for rules, icons, accents, or short labels, but not for paragraphs on ivory/sand backgrounds unless contrast is verified.
- Water blue may be used as an accent, but deep navy or strong water must be used for readable link text.

### Required Gradient Strategy

Every light-mode section with a decorative gradient must use at least one of:

```txt
solid/semi-solid content panel
local text scrim
gradient stop that fades before the text area
blurred decorative layer behind content but not under text
```

### Global Light Background

Recommended:

```css
body {
  background:
    radial-gradient(circle at 12% 8%, rgba(47, 167, 226, 0.13), transparent 28rem),
    radial-gradient(circle at 88% 4%, rgba(212, 175, 106, 0.16), transparent 24rem),
    linear-gradient(180deg, var(--color-bg), #efe4cf 100%);
  color: var(--color-text);
  transition:
    background var(--transition-slow),
    color var(--transition-base);
}
```

### Safe Text Panel Pattern

Use this when gradients/images sit near text.

```css
.readablePanel {
  background: var(--color-surface-strong);
  border: 1px solid var(--color-border);
  border-radius: 28px;
  box-shadow: var(--shadow-soft);
  backdrop-filter: blur(18px);
}

[data-theme='light'] .readablePanel {
  background:
    linear-gradient(145deg, rgba(255, 255, 255, 0.94), rgba(255, 250, 241, 0.88));
}
```

### Hero Light Gradient Requirement

The hero must use a readable text side and decorative current side.

Recommended:

```css
[data-theme='light'] .heroSection {
  background:
    linear-gradient(100deg, rgba(247, 244, 238, 0.98) 0%, rgba(247, 244, 238, 0.92) 48%, rgba(230, 215, 181, 0.52) 100%),
    radial-gradient(circle at 82% 22%, rgba(47, 167, 226, 0.2), transparent 26rem),
    var(--color-bg);
  color: var(--color-text);
}

[data-theme='light'] .heroCopy,
[data-theme='light'] .heroText,
[data-theme='light'] .heroContent {
  color: var(--color-text);
  text-shadow: none;
}
```

If the current hero does not use these class names, apply the same rule to the existing hero copy container.

### Bad Light Gradient Examples

Do not use:

```css
/* Text becomes unreadable because the gradient is too busy behind it. */
background: linear-gradient(135deg, #f7f4ee 0%, #2fa7e2 100%);

/* Gold text on ivory usually fails contrast. */
color: #d4af6a;
```

---

## Tailwind Configuration Updates

Update `tailwind.config.cjs` to expose semantic colors from CSS variables while preserving the existing color map.

Add under `theme.extend.colors`:

```js
brand: {
  bg: 'var(--color-bg)',
  bgSoft: 'var(--color-bg-soft)',
  surface: 'var(--color-surface)',
  surfaceStrong: 'var(--color-surface-strong)',
  text: 'var(--color-text)',
  textMuted: 'var(--color-text-muted)',
  border: 'var(--color-border)',
  gold: 'var(--color-brand-gold)',
  goldStrong: 'var(--color-brand-gold-strong)',
  water: 'var(--color-brand-water)',
  jade: 'var(--color-brand-jade)',
  focus: 'var(--color-focus)',
}
```

Do not remove the existing values such as:

```txt
primary
secondary
tertiary
black-100
black-200
white-100
flashWhite
platinum
platinumLight
timberWolf
taupe
silver
night
jet
richBlack
```

---

## Component Update Scope

Touch only the smallest set of components needed to make the site theme-aware.

### Required First-Pass Components

```txt
src/components/layout/PageShell
src/components/theme/ThemeToggle.jsx
src/hooks/useThemePreference.js
src/components/brand/ThemeAwareBrandMark.jsx
src/components/brand/SignatureCurrentDivider
src/components/brand/SealStampContactCTA
src/components/motion/InkCurrentReveal
src/components/sections/HeroSection
src/components/sections/WorkSection
src/components/sections/SystemsSection
src/pages/HomePage.jsx proof/about/contact styling hooks
```

### Rules

- Replace hardcoded dark surface/text/border colors with tokens when they affect reusable surfaces.
- Keep class names stable where possible.
- Do not change content text.
- Do not change section order.
- Do not change routes.
- Do not change card data models.

Preferred:

```css
background: var(--color-surface);
color: var(--color-text);
border-color: var(--color-border);
box-shadow: var(--shadow-soft);
```

Avoid:

```css
background: #081018;
color: #f7f4ee;
border-color: rgba(216, 221, 227, 0.14);
```

Exception:

One-off decorative SVG gradient stops may remain hardcoded if converting them expands scope. However, any hardcoded color that directly affects text readability must be tokenized in this spec.

---

## Section Requirements

### PageShell

- Owns high-level layout only.
- Initializes `useThemePreference`.
- Renders `ThemeToggle` in site chrome.
- Keeps skip link and route focus behavior intact.
- Does not hardcode light or dark values in layout wrappers.

Required CSS direction:

```css
.siteShell {
  min-height: 100vh;
  background: transparent;
  color: var(--color-text);
  transition:
    color var(--transition-base),
    background var(--transition-slow);
}
```

### HeroSection

Dark mode:

- Must visually match the current dark version.
- Must keep the existing composition and layout.

Light mode:

- Uses ivory/warm sand base.
- Uses deep navy text.
- Uses water/gold as accent only.
- Uses light yin-yang/signature PNG.
- Ensures text sits over a clean region, panel, or scrim.

Acceptance:

- [ ] Hero body copy is readable on desktop and mobile.
- [ ] CTA states are visible in both themes.
- [ ] Brand mark does not jump position when switching themes.

### WorkSection

Dark mode:

- Preserve current card layout and dark visual depth.

Light mode:

- Cards should use `--color-surface` or `--color-surface-strong`.
- Borders use `--color-border`.
- Hover elevation uses `--shadow-soft`.
- Text uses `--color-text` and `--color-text-muted`.

Recommended:

```css
.workCard {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-soft);
  transition:
    transform var(--transition-base),
    background var(--transition-base),
    border-color var(--transition-base),
    box-shadow var(--transition-base);
}

.workCard:hover {
  transform: translateY(-4px);
}
```

### SystemsSection

Light mode must avoid dark-only glass panels.

Required:

- System cards/chips use readable tokenized text.
- Any line art/current effects reduce opacity in light mode.
- No electric-blue glow directly behind paragraph text.

### SignatureCurrentDivider

Dark mode:

- Preserve current cinematic divider behavior.

Light mode:

- Use softer water-current strokes.
- Gold should be subtle and lower opacity.
- Divider labels must remain readable.

Recommended:

```css
.signatureCurrentDivider {
  color: var(--color-text-muted);
}

.signatureCurrentDivider::before,
.signatureCurrentDivider::after {
  background: linear-gradient(
    90deg,
    transparent,
    var(--color-current-line),
    var(--color-current-line-gold),
    transparent
  );
}
```

### InkCurrentReveal

Dark mode:

- Preserve existing reveal style.

Light mode:

- Reduce mask/ink opacity.
- Avoid placing low-opacity text over gradients.
- Do not set paragraph opacity lower than `0.72`.

### SealStampContactCTA

Light mode should feel premium and readable.

Recommended:

```css
[data-theme='light'] .sealStampContactCTA {
  background:
    linear-gradient(145deg, rgba(255, 255, 255, 0.95), rgba(255, 250, 241, 0.88)),
    radial-gradient(circle at 100% 0%, rgba(212, 175, 106, 0.18), transparent 22rem);
  border: 1px solid var(--color-border);
  color: var(--color-text);
  box-shadow: var(--shadow-soft);
}
```

CTA buttons must not use champagne gold text on ivory unless contrast is verified. Prefer deep navy text with gold border/fill accents.

---

## Motion and Transition Requirements

### Theme Transition

Theme switching should feel polished but not distracting.

Apply transitions to:

```txt
background
color
border-color
box-shadow
opacity
transform for hoverable elements
```

Do not animate layout dimensions during theme switch.

### Required Transition Tokens

```css
:root {
  --transition-fast: 140ms var(--ease-out);
  --transition-base: 240ms var(--ease-out);
  --transition-slow: 520ms var(--ease-out);
}
```

If these are already present via helper tokens, do not duplicate.

### Reduced Motion

Add or verify:

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    scroll-behavior: auto !important;
    transition-duration: 0.01ms !important;
  }
}
```

Framer Motion components with large movement should use `useReducedMotion` where practical.

---

## Accessibility Requirements

- [ ] Text contrast meets WCAG AA in both themes.
- [ ] Theme toggle is reachable by keyboard.
- [ ] Theme toggle has an accessible name.
- [ ] Theme toggle state is conveyed with `aria-pressed` or proper segmented-control semantics.
- [ ] Main content route focus still works.
- [ ] Theme switch does not remove visible focus.
- [ ] Decorative yin-yang/current assets are hidden from screen readers.
- [ ] Non-decorative brand logo has meaningful alt text.
- [ ] Reduced motion is respected.
- [ ] Text remains readable when images fail to load.

---

## Testing and Quality Gates

Run:

```bash
npm run build
npm run lint
npm run verify:demos
npm run quality:all
```

If `quality:all` requires a preview server, follow the repository's existing preview workflow.

Manual route checks:

```txt
/
/work
/work/:slug for at least 2 project pages
/404
```

Manual viewport checks:

```txt
mobile below 450px
tablet around 768px
desktop above 1280px
large desktop above 1536px
```

Manual theme checks:

```txt
system preference light -> initial light mode
system preference dark -> initial dark mode
manual light override persists after reload
manual dark override persists after reload
system mode follows browser preference changes
invalid localStorage value resets safely
```

Manual visual checks:

```txt
dark mode layout matches current site
light mode text remains readable over gradients
light mode uses light yin-yang/signature PNGs
dark mode uses dark yin-yang/signature PNGs
no layout shift when theme changes
no text over busy gradient without panel/scrim
```

---

## Implementation Plan

### Step 1: Add canonical theme tokens

- Create `src/styles/theme.css`.
- Add the exact dark token block from this spec.
- Add the light token override block.
- Import the theme CSS once from the existing global style entry.

### Step 2: Add no-flash bootstrap

- Add the inline `index.html` script.
- Confirm `document.documentElement.dataset.theme` is set before React mounts.

### Step 3: Add theme hook

- Create `src/hooks/useThemePreference.js`.
- Implement system/light/dark preference handling.
- Apply `data-theme` and `data-theme-preference` to `document.documentElement`.

### Step 4: Add toggle UI

- Create `src/components/theme/ThemeToggle.jsx`.
- Add it to the existing site chrome in `PageShell`.
- Verify keyboard and screen reader behavior.

### Step 5: Add theme-aware brand asset component

- Create or update `ThemeAwareBrandMark`.
- Wire the hero/signature yin-yang image usage through this component.
- Add light PNG assets next to existing dark PNGs.
- Do not use CSS filters to fake the asset swap.

### Step 6: Add Tailwind semantic aliases

- Update `tailwind.config.cjs` with `brand.*` variable colors.
- Do not remove existing color names.

### Step 7: Tokenize first-pass surfaces

- Update PageShell, HeroSection, WorkSection, SystemsSection, SignatureCurrentDivider, InkCurrentReveal, SealStampContactCTA, and HomePage proof/about/contact styles.
- Only replace hardcoded colors that block theme support.

### Step 8: Fix light-mode gradient readability

- Add text panels/scrims where needed.
- Verify all body copy remains readable.
- Avoid gold/water text on light backgrounds unless contrast is verified.

### Step 9: Validate

- Run build/lint/quality commands.
- Manually test theme preference states.
- Capture before/after screenshots for dark mode and light mode.

---

## Acceptance Criteria

- [ ] Current dark mode token values are preserved exactly.
- [ ] Current dark mode layout is preserved.
- [ ] Site resolves theme from browser preference on first visit.
- [ ] Theme toggle is visible and keyboard accessible.
- [ ] Manual light/dark override persists after reload.
- [ ] System preference mode reacts to browser preference changes when no manual override is active.
- [ ] `data-theme='light'` and `data-theme='dark'` are applied to `document.documentElement` correctly.
- [ ] Light mode uses light yin-yang/signature PNGs.
- [ ] Dark mode uses existing dark yin-yang/signature PNGs.
- [ ] Theme switching updates image assets without page refresh.
- [ ] Light mode gradients do not reduce text readability.
- [ ] Champagne gold is not used for long-form body text on ivory/sand backgrounds.
- [ ] Route focus behavior for `#main-content` still works.
- [ ] Reduced-motion behavior is preserved or improved.
- [ ] Existing routes still render.
- [ ] `npm run build` passes.
- [ ] `npm run lint` passes.
- [ ] `npm run quality:all` passes or failures are documented with screenshots and follow-up tasks.

---

## Recommended Follow-Up Specs

Use portfolio numbering after `0030`.

```txt
0031-portfolio-light-mode-section-polish.md
0032-portfolio-theme-aware-project-pages.md
0033-portfolio-ui-library-token-alignment.md
0034-portfolio-signature-component-extraction.md
0035-portfolio-visual-regression-and-a11y-pass.md
```

---

## PR Checklist

- [ ] Added `src/styles/theme.css`.
- [ ] Preserved canonical dark token values.
- [ ] Added `[data-theme='light']` token overrides.
- [ ] Added no-flash theme bootstrap to `index.html`.
- [ ] Added `useThemePreference` hook.
- [ ] Added `ThemeToggle` component.
- [ ] Added theme-aware brand mark component.
- [ ] Added or wired light yin-yang/signature PNG assets.
- [ ] Updated first-pass sections with semantic tokens.
- [ ] Verified light gradients are readable.
- [ ] Verified dark layout is not changed.
- [ ] Ran build/lint/quality checks.
- [ ] Attached dark and light screenshots to PR.
