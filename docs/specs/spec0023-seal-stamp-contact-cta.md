# Spec 0023: Seal Stamp Contact CTA

## Status

proposed

## Owner

Jason Huang

## Last Updated

2026-05-26

## Depends On

- Spec 0019: Wavefront-Guided Yin-Yang Hero Stabilization
- Spec 0020: Signature Current Divider
- Spec 0022: Ink Current Section Reveal

---

# 1. Purpose

Create a **Seal Stamp Contact CTA** component for the final contact section and high-intent call-to-action areas.

This component should act like a memorable brand signature at the end of the page.

It should combine:

```txt
Chinese seal/stamp inspiration
modern glass surface
gold emblem accent
blue water-current hover state
clear contact action
```

It should not become:

```txt
a literal red seal stamp unless intentionally themed later
a busy animated logo
a heavy modal
a confusing button
```

---

# 2. Component Name

Create:

```txt
src/components/brand/SealStampContactCTA.tsx
```

Suggested API:

```ts
export type SealStampContactCTAProps = {
  title?: string;
  description?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  email?: string;
  variant?: "panel" | "inline";
  className?: string;
};
```

Defaults:

```ts
title = "Let’s build something polished."
description = "I design and build modern web experiences with a focus on clean systems, strong interaction details, and practical implementation."
primaryLabel = "Contact Me"
variant = "panel"
```

---

# 3. Visual Direction

The CTA should feel like a final signature.

Required visual elements:

```txt
dark glass panel
large faint emblem or seal mark
gold highlight around the stamp
blue/cyan current on hover/focus
clear primary action
optional secondary link
```

Do not add:

```txt
bubbles
rings
vertical Chinese text
random particles
large fluid simulation
```

---

# 4. Layout

## 4.1 Panel variant

Use for the contact section.

Structure:

```txt
left: title + description + actions
right: seal/stamp mark
```

Mobile:

```txt
stack content
seal mark becomes smaller and centered or top-right watermark
```

## 4.2 Inline variant

Use for smaller CTA rows.

Structure:

```txt
compact text + action button + small seal icon
```

---

# 5. Interaction

## 5.1 Hover/focus

On hover or focus-within:

```txt
blue current sweeps around stamp edge
gold stamp glow increases slightly
primary button gains a liquid edge highlight
panel lifts 2px max
```

Do not scale aggressively.

## 5.2 Press

On pointer down:

```txt
stamp compresses slightly
current tightens around edge
```

Recommended:

```css
transform: translateY(1px) scale(0.995);
```

---

# 6. Accessibility

- [ ] Use real anchor elements for links.
- [ ] `mailto:` link should be valid if email is supplied.
- [ ] Decorative seal mark must be `aria-hidden`.
- [ ] Focus ring must be visible.
- [ ] Text contrast must be strong.
- [ ] Motion must respect `prefers-reduced-motion`.

---

# 7. CSS Classes

Use:

```txt
.sealStampContactCTA
.sealStampContactCTA--panel
.sealStampContactCTA--inline
.sealStampContactCTA__content
.sealStampContactCTA__title
.sealStampContactCTA__description
.sealStampContactCTA__actions
.sealStampContactCTA__primary
.sealStampContactCTA__secondary
.sealStampContactCTA__seal
.sealStampContactCTA__sealCurrent
.sealStampContactCTA__sealGlyph
```

---

# 8. Button Styling

The primary CTA should feel related to the hero but remain readable.

Suggested style:

```css
.sealStampContactCTA__primary {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 44px;
  padding: 0 18px;
  border-radius: 999px;
  color: rgba(3, 10, 18, 0.96);
  background: linear-gradient(135deg, #f6be48, #f8efd0);
  font-weight: 700;
  text-decoration: none;
}
```

Add a subtle blue edge only on hover/focus.

---

# 9. Integration

Use near the bottom of the homepage/contact section:

```tsx
<ContactSection>
  <SealStampContactCTA
    email="jasonh232013@gmail.com"
    primaryHref="mailto:jasonh232013@gmail.com"
    secondaryLabel="View GitHub"
    secondaryHref="https://github.com/jason-huang-dev"
  />
</ContactSection>
```

Do not use this as every button on the site.

This is a signature CTA, not a generic button replacement.

---

# 10. Acceptance Criteria

- [ ] SealStampContactCTA component exists.
- [ ] Supports panel and inline variants.
- [ ] Renders title, description, primary action, and optional secondary action.
- [ ] Visual direction matches water/glass/gold seal brand.
- [ ] Hover/focus adds subtle blue current and gold seal emphasis.
- [ ] Uses semantic anchors.
- [ ] Decorative seal is hidden from screen readers.
- [ ] Reduced-motion disables sweep animations.
- [ ] No new dependencies are added.
- [ ] Component is used in the contact section only or other high-intent CTA areas.
- [ ] `npm run build` passes.

---

# 11. Codex Implementation Prompt

```txt
Implement Spec 0023: Seal Stamp Contact CTA.

Create:
src/components/brand/SealStampContactCTA.tsx

The component should be a premium branded contact CTA inspired by a Chinese seal/stamp and the existing water/glass/gold brand direction.

Props:
- title?
- description?
- primaryLabel?
- primaryHref?
- secondaryLabel?
- secondaryHref?
- email?
- variant?: panel | inline
- className?

Requirements:
- dark glass panel
- faint seal/stamp mark
- gold highlight
- blue current hover/focus effect
- semantic anchor links
- visible focus states
- reduced-motion support
- no bubbles/rings/vertical text/fluid sim
- build passes

Use it in the final contact section only or other high-intent CTA areas. Do not replace every button with this component.
```
