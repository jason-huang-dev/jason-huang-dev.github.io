# Spec 0007: Crisp Visual Refinement

## Status

proposed

## Owner

Jason Huang

## Last Updated

2026-05-25

## Target Area

Existing portfolio visual system, glass panels, contrast, spacing, section rhythm, and overall clarity.

---

# 1. Purpose

This spec refines the current portfolio visual direction so it feels more crisp, clear, modern, and product-grade.

The current site direction is visually strong, but it leans slightly atmospheric. The next pass should reduce haze, tighten spacing, sharpen panels, and improve readability without losing the water-inspired brand.

---

# 2. Product Goal

Visitors should feel that the portfolio is:

```txt
premium
clear
modern
intentional
easy to scan
technically polished
```

The design should still feel distinct, but it should not sacrifice clarity for mood.

---

# 3. User Experience

A visitor should be able to scan the page quickly and understand:

```txt
who Jason is
what Jason builds
which projects matter most
what systems/skills Jason offers
how to contact Jason
```

The visual effects should support that scan path instead of competing with it.

---

# 4. Visual Direction

Move the site from:

```txt
cinematic glass atmosphere
```

toward:

```txt
crisp editorial product interface
```

Keep:

- dark navy background;
- water/ripple inspiration;
- cyan and gold accent system;
- large elegant headings;
- glass panels;
- Chinese brand accents.

Reduce:

- excessive blur;
- excessive fog/haze;
- low-contrast body text;
- background circles crossing important text;
- oversized cards with sparse content;
- decorative noise inside content panels.

---

# 5. Component/API Requirements

No new major components are required.

Update styling for existing components:

```txt
PageShell
Navbar
HeroSection
RippleWorkSection
ProjectRippleCard
SystemsSection
AboutSection
ContactSection
Footer
Surface / Card components if present
```

If a shared `Surface` component exists, centralize the crisp glass panel style there.

Optional file:

```txt
src/styles/surfaceTokens.ts
```

or add to:

```txt
src/styles/portfolioTokens.ts
```

---

# 6. Responsive Behavior

Visual refinement must improve all breakpoints:

```txt
desktop: clearer hierarchy and tighter cards
tablet: reduced decorative overlap
mobile: fewer background rings and stronger text contrast
small mobile: no horizontal overflow and no oversized headline clipping
```

Rules:

- Decorative circles should not cross over body text on mobile.
- Hero visual should reduce or stack cleanly below 768px.
- Card padding should reduce on mobile but never below 20px.
- Card gaps should remain at least 16px on mobile.

---

# 7. Accessibility

Improve contrast for secondary text.

Minimum targets:

```txt
primary text: 4.5:1
secondary body text: 4.5:1 where possible
muted metadata: 3:1 minimum
accent labels: 4.5:1 when used as section labels
```

Do not hide important text inside decorative effects.

Focus states must remain visible after border/glow refinements.

---

# 8. Implementation Details

## 8.1 Panel Refinement

Current panels should become sharper and less foggy.

Recommended panel recipe:

```css
background:
  linear-gradient(
    180deg,
    rgba(12, 24, 38, 0.88),
    rgba(7, 15, 26, 0.94)
  );

border: 1px solid rgba(126, 231, 242, 0.24);

box-shadow:
  0 12px 32px rgba(0, 0, 0, 0.24),
  inset 0 1px 0 rgba(255, 255, 255, 0.06);

backdrop-filter: blur(10px);
```

Avoid:

```css
blur values above 18px for normal cards
large diffuse glow on every panel
very transparent panels over busy background areas
```

## 8.2 Border System

Use three border strengths:

```ts
borderSubtle: "rgba(126,231,242,0.14)"
borderDefault: "rgba(126,231,242,0.24)"
borderStrong: "rgba(126,231,242,0.42)"
```

Usage:

```txt
subtle: inactive decorative panels
default: normal cards
strong: hover/focus/featured states
```

## 8.3 Text Contrast

Increase body copy brightness.

Recommended token updates:

```ts
text: "#F8FDFF"
textSecondary: "#B8C9D3"
textMuted: "#91A7B2"
textSubtle: "#6E838E"
```

Avoid using `textSubtle` for paragraphs.

## 8.4 Spacing Rhythm

Use the following scale:

```ts
space: {
  1: "4px",
  2: "8px",
  3: "12px",
  4: "16px",
  5: "24px",
  6: "32px",
  7: "48px",
  8: "64px",
  9: "96px",
  10: "128px"
}
```

Rules:

```txt
section heading to body: 24px to 32px
section body to content grid: 40px to 56px
card internal padding desktop: 32px to 40px
card internal padding mobile: 20px to 24px
card title to description: 16px to 20px
description to tech pills: 24px to 32px
```

## 8.5 Background Circle Refinement

Reduce circle opacity:

```txt
normal circle opacity: 0.08 to 0.14
large framing circles: 0.12 max
circles over text: 0.06 max
```

Limit visible circle systems:

```txt
desktop: 2 to 3 major circle groups
mobile: 1 to 2 major circle groups
```

## 8.6 Navbar Refinement

Navbar should feel crisp and anchored.

Recommended:

```txt
height: 72px to 80px
border: 1px solid rgba(126,231,242,0.18)
background: rgba(3,10,17,0.78)
backdrop-filter: blur(14px)
box-shadow: 0 10px 32px rgba(0,0,0,0.18)
```

Avoid making the navbar too tall or too visually dominant.

---

# 9. Acceptance Criteria

- [ ] Panels look sharper and less hazy.
- [ ] Body copy is easier to read.
- [ ] Project cards feel more intentional and less empty.
- [ ] Background rings do not compete with text.
- [ ] Navbar feels crisp and premium.
- [ ] Section spacing follows a consistent rhythm.
- [ ] Hover/focus states remain clear.
- [ ] Mobile layout has no decorative clutter.
- [ ] No major component rewrite is required.

---

# 10. Non-Goals

This spec does not require:

- changing the full page structure;
- changing project data;
- creating the featured yin-yang interaction;
- replacing all typography;
- implementing light mode;
- adding WebGL/canvas effects.

---

# 11. Risks and Mitigations

## Risk: Site loses atmosphere

Mitigation:

- keep the water background and large editorial headings;
- reduce haze, not identity.

## Risk: Panels become too plain

Mitigation:

- use subtle inner highlights;
- preserve cyan/gold accent moments;
- use hover states to add energy.

## Risk: Contrast changes alter brand feel

Mitigation:

- adjust only secondary text and panel opacity first;
- leave primary background and gold/cyan accents intact.

---

# 12. QA Checklist

- [ ] Compare before/after hero screenshot.
- [ ] Compare before/after work section screenshot.
- [ ] Check desktop 1440px.
- [ ] Check laptop 1280px.
- [ ] Check tablet 768px.
- [ ] Check mobile 390px.
- [ ] Check small mobile 320px.
- [ ] Check keyboard focus.
- [ ] Check contrast of paragraphs and buttons.
- [ ] Check no horizontal overflow.

---

# 13. Codex Implementation Prompt

```txt
Implement Spec 0007.

Refine the existing portfolio styling to make the site more crisp, clear, and modern. Sharpen glass panels, reduce haze, improve body text contrast, tighten spacing rhythm, reduce decorative background circle opacity, and make the navbar feel more anchored. Preserve the existing dark water/gold brand direction. Do not restructure the site and do not add new interaction concepts in this spec.
```

---

# 14. Done Definition

Spec 0007 is complete when the portfolio keeps its water-inspired brand but feels more crisp, readable, modern, and professionally polished across desktop and mobile.
