# Spec 0002: Responsive Page Shell, Navigation, Hero, and Footer

## Status

proposed

## Owner

Jason Huang

## Last Updated

2026-05-25

## Target Area

Portfolio page shell, responsive navigation, hero section, and footer.

---

# 1. Purpose

This spec defines the first complete portfolio page structure.

It should create the skeleton for the site:

```txt
PageShell
Navbar
HeroSection
main content slots
Footer
```

This spec should make the portfolio feel real before implementing the interactive project grid.

---

# 2. Product Goal

A visitor should immediately understand:

```txt
Jason Huang is a software engineer / UI systems builder.
He designs and builds modern software with clarity and polish.
The site has a distinct water-inspired brand.
There is a clear path to view work, resume, and contact.
```

---

# 3. User Experience

## 3.1 Desktop

Desktop layout:

```txt
sticky or fixed top navbar
large hero headline on left
subtle water/ripple visual on right or behind
CTA buttons below hero copy
brand mark in top-left
nav links centered or right-aligned
contact/resume action on right
```

## 3.2 Mobile

Mobile layout:

```txt
brand mark top-left
compact menu or simplified nav
hero content stacked vertically
primary CTA visible without excessive scrolling
no overlapping decorative accents
```

---

# 4. Visual Direction

Use the foundation from Spec 0001.

Hero should feel premium and calm:

```txt
dark water backdrop
large editorial heading
glass CTA buttons
subtle cyan/gold accents
restrained Chinese accent text
```

Do not introduce a separate visual theme.

---

# 5. Component/API Requirements

Create:

```txt
src/components/layout/PageShell.tsx
src/components/layout/Navbar.tsx
src/components/layout/Footer.tsx
src/components/sections/HeroSection.tsx
src/components/ui/Container.tsx
src/components/ui/ButtonLink.tsx
```

If the existing UI package already has Button/Text/Surface components, use them instead of adding duplicates.

Hero copy recommendation:

```txt
Designing systems that flow with purpose.
```

Supporting copy:

```txt
I build modern software and UI systems with calm precision — where engineering meets clarity, and ideas find their natural flow.
```

Primary CTA:

```txt
Explore Work
```

Secondary CTA:

```txt
View Resume
```

Hero eyebrow:

```txt
SOFTWARE ENGINEER · UI SYSTEMS · PRODUCT BUILDER
```

---

# 6. Responsive Behavior

Breakpoints:

```txt
mobile: < 640px
tablet: 640px to 1024px
desktop: > 1024px
```

Rules:

- Hero must not exceed viewport width.
- CTA buttons wrap below 390px.
- Nav links should not collide with brand.
- Decorative elements may hide below 768px.
- Main content padding should never be below 16px.

Desktop hero layout:

```txt
display: grid
grid-template-columns: minmax(0, 1fr) minmax(360px, 0.85fr)
gap: 56px
align-items: center
min-height: calc(100vh - nav height)
```

Mobile hero layout:

```txt
single column
headline first
visual second or hidden/reduced
CTA buttons stacked or wrapped
```

---

# 7. Accessibility

- Add skip link to `main`.
- Navbar uses semantic `<nav>`.
- Buttons that navigate use `<a>`.
- Mobile menu button has `aria-expanded` if implemented.
- All focus states visible.
- Hero headline is the page `h1`.
- Footer links have clear accessible names.

---

# 8. Implementation Details

`PageShell` should:

- wrap the site in the water background;
- provide a skip-to-content link;
- include the nav and footer;
- define a max content width;
- preserve consistent section spacing.

Suggested max width:

```txt
max-width: 1200px to 1280px
horizontal padding desktop: 32px
horizontal padding mobile: 20px
```

Suggested section spacing:

```txt
desktop: 96px to 128px
tablet: 80px
mobile: 64px
```

Nav links:

```txt
Work
Systems
About
Contact
```

Footer should include:

```txt
BrandMark
short tagline
GitHub link
LinkedIn link
Resume link
copyright
```

---

# 9. Acceptance Criteria

- [ ] Page shell renders a complete one-page layout.
- [ ] Navbar is responsive and usable by keyboard.
- [ ] Hero has clear professional copy.
- [ ] CTA buttons are visible on desktop and mobile.
- [ ] Footer includes key links.
- [ ] Water/Chinese brand language is present but restrained.
- [ ] No project cards are implemented in this spec.
- [ ] No layout overflow at 320px width.

---

# 10. Non-Goals

This spec does not require:

- project grid;
- project detail drawer;
- scroll spy;
- blog routes;
- contact form backend;
- advanced animations.

---

# 11. Risks and Mitigations

## Risk: Hero feels too abstract

Mitigation:

- include concrete role copy;
- make CTAs direct;
- use work section immediately after hero in later specs.

## Risk: Mobile nav becomes cluttered

Mitigation:

- use fewer links;
- hide secondary text;
- collapse to a menu if needed.

---

# 12. QA Checklist

- [ ] 1440px desktop.
- [ ] 1280px laptop.
- [ ] 768px tablet.
- [ ] 390px mobile.
- [ ] 320px small mobile.
- [ ] Keyboard tab order.
- [ ] Reduced motion mode.
- [ ] Lighthouse accessibility check.

---

# 13. Codex Implementation Prompt

```txt
Implement Spec 0002.

Create the responsive portfolio PageShell, Navbar, HeroSection, Footer, Container, and ButtonLink components. Use the brand foundation from Spec 0001. The page should be responsive, accessible, and professional. Keep water and Chinese accents subtle. Do not implement project cards or detail drawers yet.
```

---

# 14. Done Definition

Spec 0002 is complete when the portfolio has a polished responsive shell with navigation, hero messaging, CTAs, and footer that can host the future work grid.
