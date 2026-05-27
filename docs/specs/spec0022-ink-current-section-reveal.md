# Spec 0022: Ink Current Section Reveal

## Status

proposed

## Owner

Jason Huang

## Last Updated

2026-05-26

## Depends On

- Spec 0019: Wavefront-Guided Yin-Yang Hero Stabilization
- Spec 0020: Signature Current Divider

---

# 1. Purpose

Add a reusable **Ink Current Section Reveal** behavior that animates major content sections into view with a subtle water/ink-inspired motion.

This should replace generic fade/slide reveals where appropriate.

The animation should feel like:

```txt
ink entering water
soft current pulling content into position
controlled blue/gold glint at the section edge
calm premium motion
```

It should not feel like:

```txt
flashy scroll hijacking
large parallax effect
heavy animation framework
generic fade-up template
motion that distracts from reading
```

---

# 2. Component Name

Create:

```txt
src/components/motion/InkCurrentReveal.tsx
```

Suggested API:

```ts
export type InkCurrentRevealProps = {
  children: React.ReactNode;
  as?: keyof JSX.IntrinsicElements;
  delayMs?: number;
  direction?: "up" | "left" | "right" | "none";
  intensity?: "quiet" | "normal" | "signature";
  once?: boolean;
  className?: string;
};
```

Default:

```ts
as = "div"
delayMs = 0
direction = "up"
intensity = "normal"
once = true
```

---

# 3. Implementation Direction

Use `IntersectionObserver` and CSS classes.

Do not add Framer Motion or other animation dependencies.

Behavior:

```txt
initial state: slightly translated, transparent, lightly blurred
visible state: original position, full opacity, no blur
optional edge glint moves once when revealed
```

The reveal should be reusable for:

```txt
section headings
project cards
experience rows
contact CTA
```

Do not wrap every small inline element.

---

# 4. Hook

Create a small hook if useful:

```txt
src/components/motion/useInViewOnce.ts
```

Suggested API:

```ts
export function useInViewOnce<T extends Element>(options?: {
  rootMargin?: string;
  threshold?: number;
  once?: boolean;
}): [React.RefObject<T>, boolean]
```

Default observer options:

```ts
rootMargin: "0px 0px -12% 0px"
threshold: 0.18
```

Clean up observers on unmount.

---

# 5. CSS Classes

Use:

```txt
.inkCurrentReveal
.inkCurrentReveal--visible
.inkCurrentReveal--up
.inkCurrentReveal--left
.inkCurrentReveal--right
.inkCurrentReveal--none
.inkCurrentReveal--quiet
.inkCurrentReveal--normal
.inkCurrentReveal--signature
.inkCurrentReveal__glint
```

Base initial style:

```css
.inkCurrentReveal {
  opacity: 0;
  filter: blur(10px);
  transform: translate3d(0, 18px, 0);
  transition:
    opacity 700ms ease,
    filter 900ms ease,
    transform 900ms cubic-bezier(0.22, 1, 0.36, 1);
}

.inkCurrentReveal--visible {
  opacity: 1;
  filter: blur(0);
  transform: translate3d(0, 0, 0);
}
```

Direction variants should adjust the initial transform only.

---

# 6. Signature Glint

For `intensity="signature"`, add a one-time edge glint.

The glint should:

```txt
appear for section headings or major cards
move across a masked edge
use blue/gold current colors
not cover body text
not repeat endlessly
```

Do not add glints to every small element.

---

# 7. Reduced Motion

For `prefers-reduced-motion: reduce`:

```txt
no translate
no blur
no glint animation
content should be immediately visible
```

CSS:

```css
@media (prefers-reduced-motion: reduce) {
  .inkCurrentReveal {
    opacity: 1;
    filter: none;
    transform: none;
    transition: none;
  }

  .inkCurrentReveal__glint {
    display: none;
  }
}
```

---

# 8. Integration

Wrap major section containers or groups, not every small element.

Recommended:

```tsx
<InkCurrentReveal as="section" intensity="signature">
  <AboutSection />
</InkCurrentReveal>

<InkCurrentReveal delayMs={80}>
  <SignatureProjectCard {...project} />
</InkCurrentReveal>
```

Avoid:

```tsx
<InkCurrentReveal><span>every</span></InkCurrentReveal>
<InkCurrentReveal><span>single</span></InkCurrentReveal>
<InkCurrentReveal><span>word</span></InkCurrentReveal>
```

---

# 9. Acceptance Criteria

- [ ] InkCurrentReveal component exists and is reusable.
- [ ] Uses IntersectionObserver, not a new animation dependency.
- [ ] Supports `as`, `delayMs`, `direction`, `intensity`, `once`, and `className`.
- [ ] Reveal animation is subtle and brand-aligned.
- [ ] Signature glint is optional and controlled.
- [ ] Reduced-motion users see content immediately without motion.
- [ ] Observer cleanup is handled.
- [ ] Component is applied only to major sections/cards.
- [ ] `npm run build` passes.

---

# 10. Codex Implementation Prompt

```txt
Implement Spec 0022: Ink Current Section Reveal.

Create:
src/components/motion/InkCurrentReveal.tsx

Optionally create:
src/components/motion/useInViewOnce.ts

Use IntersectionObserver and CSS classes. Do not add animation dependencies.

Props:
- children
- as?
- delayMs?
- direction?: up | left | right | none
- intensity?: quiet | normal | signature
- once?
- className?

Animation direction:
Content should reveal like subtle ink/water entering the page: opacity, blur, and small translate. Signature intensity can add a one-time blue/gold glint.

Requirements:
- reduced-motion disables animation
- observer cleanup works
- do not wrap every small element
- build passes
```
