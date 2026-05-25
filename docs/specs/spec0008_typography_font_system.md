# Spec 0008: Typography and Font System Upgrade

## Status

proposed

## Owner

Jason Huang

## Last Updated

2026-05-25

## Target Area

Portfolio font pairing, typography tokens, heading hierarchy, UI text, and readable card content.

---

# 1. Purpose

This spec upgrades the portfolio typography system so the site feels sharper, more modern, and more professionally designed.

The current large serif direction is strong, but the site needs a more deliberate pairing between expressive display typography and crisp interface typography.

---

# 2. Product Goal

Typography should communicate:

```txt
taste
clarity
confidence
technical precision
modern software craft
```

The site should feel editorial in the hero, but product-grade in cards, nav, buttons, and project details.

---

# 3. User Experience

Visitors should be able to:

- read the hero quickly;
- scan project cards easily;
- distinguish labels, headings, body copy, and CTAs;
- view the site comfortably on mobile;
- understand hierarchy without relying on glow or color.

---

# 4. Visual Direction

Use a two-font system:

```txt
Display font: elegant serif for major headings
UI font: clean sans-serif for everything else
```

Recommended pairing:

```txt
Display: Cormorant Garamond
UI/Body: Geist
```

Fallback pairing:

```txt
Display: Instrument Serif
UI/Body: Inter
```

Alternative pairing:

```txt
Display: Fraunces
UI/Body: Manrope
```

Primary recommendation for this project:

```txt
Cormorant Garamond + Geist
```

Reason:

- Cormorant Garamond gives the brand elegance and cultural depth.
- Geist gives UI elements a crisp, modern software-product feel.
- The contrast helps the portfolio feel both personal and technical.

---

# 5. Component/API Requirements

Create or update typography tokens.

Recommended file:

```txt
src/styles/typography.ts
```

or add to:

```txt
src/styles/portfolioTokens.ts
```

If using Next.js app router, configure fonts in:

```txt
src/app/layout.tsx
```

Suggested import using `next/font/google`:

```ts
import { Cormorant_Garamond, Geist } from "next/font/google";

const displayFont = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
});

const uiFont = Geist({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-ui",
});
```

If the project is Vite, use CSS imports or local font setup instead.

Do not ship font files manually unless already licensed and intentionally included.

---

# 6. Responsive Behavior

Typography scale should be responsive.

Recommended token scale:

```ts
export const typography = {
  fontFamily: {
    display: "var(--font-display), Georgia, serif",
    ui: "var(--font-ui), Inter, system-ui, sans-serif",
  },

  size: {
    heroDesktop: "clamp(4.75rem, 8vw, 8.75rem)",
    heroMobile: "clamp(3.25rem, 14vw, 4.75rem)",
    sectionTitle: "clamp(2.75rem, 5.5vw, 5.25rem)",
    cardTitle: "clamp(1.5rem, 2vw, 2rem)",
    body: "clamp(1rem, 1.2vw, 1.125rem)",
    small: "0.875rem",
    eyebrow: "0.8125rem",
  },

  lineHeight: {
    hero: 0.92,
    title: 0.98,
    body: 1.68,
    compact: 1.35,
  },

  letterSpacing: {
    hero: "-0.035em",
    title: "-0.025em",
    eyebrow: "0.16em",
    nav: "0.08em",
  },
};
```

Rules:

- Hero line-height should be tight but not clipped.
- Body text should use line-height around 1.6 to 1.75.
- Eyebrows should use uppercase sans, not serif.
- Buttons should use UI font with 700 or 800 weight.

---

# 7. Accessibility

- Body copy must remain readable at mobile sizes.
- Do not use ultra-thin font weights.
- Do not use all-caps for long sentences.
- Avoid letter-spacing above 0.2em for small text.
- Ensure headings preserve semantic HTML order.
- Do not use text images for logo text unless accompanied by accessible text.

---

# 8. Implementation Details

## 8.1 Typography Roles

Use display font for:

```txt
hero h1
section h2
large CTA title
optional project drawer title
```

Use UI font for:

```txt
navbar
eyebrows
body text
cards
buttons
tech pills
metadata
footer
forms
project descriptions
```

## 8.2 Hero Heading Refinement

Current hero text:

```txt
DESIGNING
SYSTEMS
THAT FLOW
WITH
PURPOSE.
```

Keep the meaning, but reduce unnecessary line fragmentation on desktop where possible.

Recommended desktop line grouping:

```txt
Designing systems
that flow with
purpose.
```

or:

```txt
Designing systems
that flow with purpose.
```

Mobile may use more line breaks.

## 8.3 Card Typography

Project card titles should be clear and not oversized.

Recommended:

```txt
card category: UI font, uppercase, 13px, 700/800, gold
card title: display or UI font depending card size
description: UI font, 16px to 18px, textSecondary
tech pills: UI font, 13px to 14px, 700
CTA: UI font, 14px, 800, uppercase optional
```

If cards feel too classical, use the UI font for project titles and reserve the display font for major page headings.

## 8.4 Chinese Character Rendering

The `黄` brand mark should use a font that renders Chinese cleanly.

Recommended fallbacks:

```css
font-family:
  "Noto Serif SC",
  "Noto Sans SC",
  "Songti SC",
  "SimSun",
  serif;
```

Do not rely on Cormorant or Geist for Chinese characters.

---

# 9. Acceptance Criteria

- [ ] Display and UI font system is configured.
- [ ] Major headings use the display font.
- [ ] UI text uses the UI/body font.
- [ ] Chinese character fallback is defined.
- [ ] Hero heading is more readable and less fragmented on desktop.
- [ ] Cards are easier to scan.
- [ ] Font loading does not cause major layout shift.
- [ ] Mobile typography remains readable.
- [ ] No unlicensed font files are added.

---

# 10. Non-Goals

This spec does not require:

- rewriting all copy;
- implementing project drawer content;
- creating new animations;
- changing the logo artwork;
- adding paid fonts;
- adding a full design-system typography component library.

---

# 11. Risks and Mitigations

## Risk: Cormorant feels too classical

Mitigation:

- keep Cormorant only for large headings;
- use Geist for all UI/card text;
- test Instrument Serif as a fallback.

## Risk: Font loading creates layout shift

Mitigation:

- use `next/font` if available;
- use `font-display: swap`;
- keep fallback metrics close where possible.

## Risk: Chinese character renders poorly

Mitigation:

- define explicit CJK fallback stack;
- avoid using the display serif for the Chinese seal.

---

# 12. QA Checklist

- [ ] Check hero at 1440px.
- [ ] Check hero at 390px.
- [ ] Check navbar text.
- [ ] Check project card descriptions.
- [ ] Check tech pills.
- [ ] Check `黄` rendering.
- [ ] Check Lighthouse for layout shift.
- [ ] Check if font weights look too thin on Safari.

---

# 13. Codex Implementation Prompt

```txt
Implement Spec 0008.

Upgrade the portfolio typography system to use a deliberate two-font pairing. Prefer Cormorant Garamond for major display headings and Geist for UI/body text. Configure font loading using the existing framework conventions, add typography tokens, define a CJK fallback for the 黄 brand mark, and adjust heading/card typography so the site feels more crisp, clear, and modern. Do not add unlicensed font files.
```

---

# 14. Done Definition

Spec 0008 is complete when the portfolio has a consistent, modern typography system that improves readability while preserving the elegant brand direction.
