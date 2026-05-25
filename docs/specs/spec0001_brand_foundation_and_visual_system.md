# Spec 0001: Brand Foundation and Visual System

## Status

proposed

## Owner

Jason Huang

## Last Updated

2026-05-25

## Target Area

Portfolio website visual foundation, theme tokens, brand components, typography, and global styling.

---

# 1. Purpose

This spec defines the brand and visual system for the personal portfolio redesign.

The site should feel like a modern software engineer portfolio with a distinct water-inspired and Chinese-accented identity.

The brand should communicate:

```txt
calm confidence
technical precision
premium UI taste
clarity
cultural depth
build quality
```

---

# 2. Product Goal

The portfolio should be memorable within the first few seconds without sacrificing readability.

The visual system should support:

- a clean hero section;
- a responsive project grid;
- interactive ripple cards;
- project detail views;
- professional resume/contact actions;
- future writing or case study pages.

---

# 3. User Experience

Visitors should see a professional and calm interface, not a theme demo.

The first impression should be:

```txt
This person has strong taste.
This person can build clean UI systems.
This person has a memorable personal brand.
```

---

# 4. Visual Direction

Use a **dark water glass** interface.

Core visual ingredients:

```txt
deep navy / black backgrounds
glass panels
cyan water glows
gold seal accents
subtle ripple rings
soft grid or grain overlays
restrained Chinese visual motifs
large elegant headings
clean readable UI text
```

Avoid:

```txt
overly ornate Chinese decoration
full-page photorealism
low-contrast text
too many glowing elements
tiny decorative labels
animation that distracts from content
```

---

# 5. Component/API Requirements

## 5.1 BrandMark

Create:

```txt
src/components/brand/BrandMark.tsx
```

API:

```ts
export type BrandMarkVariant = "seal" | "horizontal" | "minimal";

export type BrandMarkProps = {
  variant?: BrandMarkVariant;
  size?: "sm" | "md" | "lg";
  className?: string;
};
```

Requirements:

- `seal` displays a rounded square containing `黄`.
- `horizontal` displays the seal plus `Jason Huang`.
- `minimal` displays only the seal.
- Component supports `size`.
- Component supports `className`.

## 5.2 ChineseAccentText

Create:

```txt
src/components/brand/ChineseAccentText.tsx
```

Default text:

```txt
水静则明
```

Meaning direction:

```txt
Still water reveals clarity.
```

Use this as decorative support only.

## 5.3 WaterBackdrop

Create:

```txt
src/components/brand/WaterBackdrop.tsx
```

Requirements:

- dark radial gradient;
- subtle cyan glow;
- optional ripple rings using CSS pseudo-elements or absolutely positioned divs;
- no canvas required;
- no text inside the background;
- must not block pointer events.

## 5.4 Tokens

Create:

```txt
src/styles/portfolioTokens.ts
```

If the existing UI library already has token packages, map these values into the existing token structure instead of creating a duplicate source of truth.

---

# 6. Responsive Behavior

- Brand mark must work at 24px, 40px, and 56px.
- WaterBackdrop must not create visual clutter on mobile.
- ChineseAccentText may hide under 768px if it crowds the layout.
- Tokens should support both desktop and mobile spacing scales.

---

# 7. Accessibility

- All text must be real HTML text.
- Decorative Chinese accents should use `aria-hidden="true"`.
- Brand mark image-like elements should have accessible labels when used as a home link.
- Do not rely on color alone for interactive states.
- Focus states must be visible against dark surfaces.

---

# 8. Implementation Details

Required token baseline:

```ts
export const portfolioTokens = {
  color: {
    background: "#06111F",
    backgroundDeep: "#030A11",
    surface: "#0B2233",
    surfaceSoft: "rgba(255,255,255,0.06)",
    surfaceStrong: "rgba(8,22,33,0.92)",
    border: "rgba(126,231,242,0.22)",
    borderStrong: "rgba(126,231,242,0.42)",

    text: "#F8FDFF",
    textMuted: "#8FA6B2",
    textSubtle: "#617984",

    water: "#23B7C5",
    waterSoft: "#7EE7F2",
    jade: "#65D6AD",
    gold: "#F7C948",
    goldMuted: "#B9903E",

    danger: "#FF6F49"
  },

  radius: {
    sm: "8px",
    md: "14px",
    lg: "20px",
    xl: "28px",
    full: "999px"
  },

  shadow: {
    glass: "0 18px 60px rgba(0,0,0,0.32)",
    waterGlow: "0 0 28px rgba(35,183,197,0.26)",
    goldGlow: "0 0 24px rgba(247,201,72,0.18)"
  }
} as const;
```

Suggested WaterBackdrop CSS direction:

```css
.waterBackdrop {
  background:
    radial-gradient(circle at 72% 18%, rgba(35,183,197,0.18), transparent 32%),
    radial-gradient(circle at 18% 78%, rgba(101,214,173,0.12), transparent 30%),
    linear-gradient(180deg, #06111F, #030A11);
}
```

---

# 9. Acceptance Criteria

- [ ] Portfolio tokens are created or mapped into existing theme tokens.
- [ ] BrandMark component exists with at least `seal` and `horizontal` variants.
- [ ] WaterBackdrop component exists and does not use canvas/WebGL.
- [ ] ChineseAccentText component exists and is decorative by default.
- [ ] Global dark water visual language is established.
- [ ] Text contrast remains readable.
- [ ] No project-specific UI is implemented in this spec.

---

# 10. Non-Goals

This spec does not require:

- project cards;
- detail drawer;
- page navigation;
- advanced motion;
- case study pages;
- CMS setup.

---

# 11. Risks and Mitigations

## Risk: Design becomes too decorative

Mitigation:

- keep Chinese accents small and sparse;
- use water effects as background texture, not content;
- validate all sections at mobile sizes.

## Risk: Token duplication

Mitigation:

- if a UI library token system exists, map these values there;
- avoid creating two competing theme systems.

---

# 12. QA Checklist

- [ ] Check text contrast over background.
- [ ] Check brand mark at 24px, 40px, and 56px.
- [ ] Check mobile background does not create visual noise.
- [ ] Check focus ring visibility.
- [ ] Check reduced motion mode does not depend on animated background.

---

# 13. Codex Implementation Prompt

```txt
Implement Spec 0001 for the new portfolio brand foundation.

Create or map portfolio theme tokens, a reusable BrandMark component, a decorative ChineseAccentText component, and a WaterBackdrop component. Use a dark water-glass visual system with cyan/teal highlights and restrained gold Chinese seal accents.

Do not implement project cards or page sections in this spec. Do not use canvas, WebGL, or heavy animation. Keep components reusable, typed, accessible, and compatible with the existing React project structure.
```

---

# 14. Done Definition

Spec 0001 is complete when the portfolio has a reusable visual foundation that future sections can build on without redefining colors, brand marks, or background styles.
