# Spec 0020: Signature Current Divider

## Status

proposed

## Owner

Jason Huang

## Last Updated

2026-05-26

## Depends On

- Spec 0019: Wavefront-Guided Yin-Yang Hero Stabilization

---

# 1. Purpose

Add a reusable **Signature Current Divider** component that creates a branded transition between major portfolio sections.

The divider should visually extend the water/current language from the hero into the rest of the page without requiring another WebGL simulation.

The component should feel like:

```txt
a thin liquid-glass current line
blue and gold energy moving through the same path
subtle Chinese calligraphic motion
premium but not distracting
```

It should not feel like:

```txt
a generic horizontal rule
a neon underline
a loading spinner
a decorative blob section break
a wave SVG from a template
```

---

# 2. Product Goal

The portfolio should have a recognizable signature visual motif beyond the hero.

The divider should help each section feel connected to the same brand system:

```txt
hero -> about -> projects -> experience -> contact
```

Use it between major sections only.

Do not place it after every small card or subsection.

---

# 3. Component Name

Create:

```txt
src/components/brand/SignatureCurrentDivider.tsx
```

Export from the brand component barrel if one exists:

```txt
src/components/brand/index.ts
```

Suggested API:

```ts
export type SignatureCurrentDividerTone = "balanced" | "blue" | "gold" | "quiet";

export type SignatureCurrentDividerProps = {
  tone?: SignatureCurrentDividerTone;
  label?: string;
  align?: "left" | "center" | "right";
  density?: "compact" | "normal" | "cinematic";
  className?: string;
};
```

Default:

```ts
tone = "balanced"
align = "center"
density = "normal"
```

---

# 4. Markup

Use semantic markup with decorative visuals hidden from screen readers.

```tsx
export function SignatureCurrentDivider({
  tone = "balanced",
  label,
  align = "center",
  density = "normal",
  className,
}: SignatureCurrentDividerProps) {
  return (
    <div
      className={cx(
        "signatureCurrentDivider",
        `signatureCurrentDivider--${tone}`,
        `signatureCurrentDivider--${align}`,
        `signatureCurrentDivider--${density}`,
        className
      )}
    >
      <span className="signatureCurrentDivider__line" aria-hidden="true">
        <span className="signatureCurrentDivider__current signatureCurrentDivider__current--blue" />
        <span className="signatureCurrentDivider__current signatureCurrentDivider__current--gold" />
        <span className="signatureCurrentDivider__glint" />
      </span>

      {label ? (
        <span className="signatureCurrentDivider__label">{label}</span>
      ) : null}
    </div>
  );
}
```

If the project does not have a `cx` utility, use a small local class join helper or template string.

---

# 5. Visual Requirements

## 5.1 Shape

The divider should be mostly horizontal but not perfectly straight.

Use pseudo-elements and CSS masks to create a slight organic current:

```txt
thin central path
soft blur below path
small asymmetric swell near one side
blue/gold currents passing through the same line
```

The line should not become a large wave.

Recommended dimensions:

```txt
compact height: 28px
normal height: 44px
cinematic height: 64px
max-width: 620px
line thickness: 1px to 3px
blur glow: 8px to 18px
```

## 5.2 Color

Use the same brand colors as the hero.

Suggested variables:

```css
--signature-current-blue: rgba(51, 151, 255, 0.86);
--signature-current-cyan: rgba(71, 240, 255, 0.76);
--signature-current-gold: rgba(246, 190, 72, 0.86);
--signature-current-silver: rgba(245, 240, 214, 0.62);
```

## 5.3 Motion

Use CSS animation only.

Behavior:

```txt
blue current slowly travels left to right
gold current slowly travels right to left
center glint moves occasionally
animation is subtle and slow
```

Recommended durations:

```txt
blue current: 6s-9s
gold current: 7s-10s
glint: 8s-12s
```

Do not use JavaScript animation for this component.

---

# 6. Reduced Motion

For users with `prefers-reduced-motion: reduce`:

```css
.signatureCurrentDivider__current,
.signatureCurrentDivider__glint {
  animation: none;
}
```

Keep the visual static but polished.

---

# 7. Integration

Add dividers between major homepage sections only.

Recommended placement:

```tsx
<HeroSection />
<SignatureCurrentDivider label="Selected Work" />
<ProjectsSection />
<SignatureCurrentDivider tone="quiet" label="Experience" />
<ExperienceSection />
<SignatureCurrentDivider tone="gold" label="Contact" />
<ContactSection />
```

Do not add the divider inside every card.

---

# 8. CSS Implementation

Add styles to the existing global stylesheet or component CSS module based on current project conventions.

Suggested class names:

```txt
.signatureCurrentDivider
.signatureCurrentDivider__line
.signatureCurrentDivider__current
.signatureCurrentDivider__current--blue
.signatureCurrentDivider__current--gold
.signatureCurrentDivider__glint
.signatureCurrentDivider__label
```

The CSS should use custom properties for easier tuning.

---

# 9. Acceptance Criteria

- [ ] Component renders without new dependencies.
- [ ] Divider works with and without label.
- [ ] Divider supports balanced, blue, gold, and quiet tones.
- [ ] Divider supports left, center, and right alignment.
- [ ] Motion is subtle and not distracting.
- [ ] Reduced-motion mode disables animation.
- [ ] Visual language matches the hero: water, blue/gold, liquid glass.
- [ ] No rings, bubbles, droplets, or pearls are introduced.
- [ ] Divider is not overused throughout the page.
- [ ] `npm run build` passes.

---

# 10. Codex Implementation Prompt

```txt
Implement Spec 0020: Signature Current Divider.

Add a reusable SignatureCurrentDivider component for branded section transitions.

Create:
src/components/brand/SignatureCurrentDivider.tsx

The component should support:
- tone: balanced | blue | gold | quiet
- label?: string
- align: left | center | right
- density: compact | normal | cinematic
- className?: string

Use CSS-only animation. No new dependencies.

Visual direction:
A thin liquid-glass current line with subtle blue and gold motion. It should feel like a branded water current, not a generic HR, neon underline, or large wave SVG.

Add reduced-motion support.

Integrate between major homepage sections only.

Acceptance:
- renders with and without label
- supports tone/alignment/density variants
- subtle motion
- reduced-motion disables animation
- no rings/bubbles/droplets/pearls
- build passes
```
