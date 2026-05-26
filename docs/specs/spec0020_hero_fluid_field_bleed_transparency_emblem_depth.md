# Spec 0020: Hero Fluid Field Bleed, Transparency, and Emblem Depth

## Status

active

## Owner

Jason Huang

## Last Updated

2026-05-26

## Related Specs

- `spec0019_navier_stokes_webgl_hero_fluid_simulation_with_particles.md`

## Target Area

Hero visual panel, WebGL fluid interaction bounds, fluid radius tuning, transparent rendering, pointer pass-through behavior, and emblem depth/layering.

---

# 1. Purpose

The current WebGL hero fluid implementation has a layering and interaction issue:

```txt
the interactive fluid field feels cut off
the fluid interaction radius feels slightly too small
the fluid layer should be slightly transparent and tunable
the emblem is visually/on-layer interfering with the fluid component
```

This spec defines a targeted follow-up to Spec 0019.

The goal is not to rewrite the simulation. The goal is to make the existing fluid component feel physically integrated into the hero panel by improving:

```txt
field bleed
interaction bounds
splat radius tuning
canvas transparency
pointer pass-through
emblem layering
z-index composition
```

---

# 2. Problem Statement

The hero fluid currently has three major visual/interaction problems.

## 2.1 The interactive field is being cut

The simulation appears clipped or constrained too tightly inside the hero visual card.

This can happen because of:

```txt
canvas inset is exactly 0
parent container uses overflow hidden
simulation plane fills only the visible panel
pointer coordinates are mapped only to the clipped rect
splats near edges disappear too quickly
```

Desired behavior:

```txt
the fluid should have extra bleed beyond the visible panel
edge splats should feel like they continue naturally
the visible card can remain clipped/rounded
the simulation field should not feel boxed in
```

## 2.2 Radius is slightly too small

Spec 0019 correctly moved toward low-radius splats to avoid the beam effect, but the current radius should be increased slightly so the interaction feels touchable and fluid.

Desired behavior:

```txt
still small
still dye-like
slightly more visible than current
not a broad glow
not a light beam
```

## 2.3 Emblem is interfering with the component

The gold emblem currently sits above the fluid layer. This can interfere in two ways:

```txt
visually, it can cover too much of the fluid
interactively, it may block or confuse the interaction surface
```

Desired behavior:

```txt
the emblem should feel embedded behind/inside the liquid glass
the fluid can render over the emblem slightly
the emblem should not block pointer events
the emblem should remain visible but not dominate the fluid field
```

---

# 3. Design Decision

Move from:

```txt
fluid behind emblem
emblem fully on top
```

To:

```txt
background
emblem ghost/depth layer
fluid simulation layer
rings/pearls
optional foreground highlight accents
ChineseAccentText / important readable text
```

The emblem should be **sent back** into the fluid composition, while the fluid layer becomes slightly transparent so the emblem is still visible through it.

This creates a better "emblem under liquid glass" effect.

---

# 4. Scope

This spec should update:

```txt
HeroFluidSimulationPanel
FluidCanvas
FluidSimulationController if needed
fluidLiteConfig
display shader uniforms
index.css layering
pointer event behavior
```

Do not rewrite:

```txt
HeroSection copy
hero CTA buttons
layout grid
project cards
navigation
full simulation architecture
Spec 0019 core solver
```

---

# 5. Required API Additions

## 5.1 `HeroFluidSimulationPanel` props

Add a small prop API so the hero panel can tune visual composition without hardcoding CSS values.

```ts
export type HeroFluidSimulationPanelProps = {
  fluidOpacity?: number;
  fieldBleed?: number;
  emblemDepth?: "front" | "embedded" | "back";
  interactionRadiusScale?: number;
  pointerPassthrough?: boolean;
};
```

Default:

```ts
const defaultHeroFluidPanelProps = {
  fluidOpacity: 0.68,
  fieldBleed: 28,
  emblemDepth: "embedded",
  interactionRadiusScale: 1.18,
  pointerPassthrough: true,
} satisfies Required<HeroFluidSimulationPanelProps>;
```

## 5.2 `FluidCanvas` props

```ts
export type FluidCanvasProps = {
  quality?: "off" | "low" | "medium";
  className?: string;
  opacity?: number;
  bleed?: number;
  interactionRadiusScale?: number;
};
```

These values should be passed down to the simulation/config layer through CSS variables and/or config overrides.

---

# 6. Field Bleed Requirements

## 6.1 Canvas bleed

The canvas wrapper should extend beyond the visible hero panel.

Use a CSS variable:

```css
--fluid-field-bleed: 28px;
```

Apply:

```css
.fluidCanvas,
.fluidCanvasFallback {
  position: absolute;
  inset: calc(var(--fluid-field-bleed, 28px) * -1);
}
```

This allows the simulation to visually extend beyond the normal panel bounds.

## 6.2 Preserve hero shape

The outer hero visual can still keep rounded clipping if needed.

Recommended structure:

```txt
heroSection__visual
  heroFluidSimulationPanel
    heroFluidSimulationPanel__clip
      FluidCanvas
      emblem depth layer
      rings
      pearls
```

Preferred CSS:

```css
.heroFluidSimulationPanel {
  position: relative;
  isolation: isolate;
  overflow: visible;
}

.heroFluidSimulationPanel__clip {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  overflow: hidden;
}
```

This gives the internal canvas room to bleed while preserving the visible rounded panel shape.

## 6.3 Pointer coordinate mapping

Pointer mapping should still use the visible interaction area, not the larger bleed canvas.

Requirement:

```txt
pointer coordinates are normalized against the visible hero panel rect
simulation rendering can bleed beyond the visible rect
splats near edges should not feel clipped
```

Do not normalize pointer coordinates against the expanded bleed rect unless the simulation becomes offset.

---

# 7. Radius Tuning Requirements

Spec 0019 intentionally used low-radius values. This spec increases the radius slightly while preserving the dye-like look.

## 7.1 Config update

Add:

```ts
interactionRadiusScale: number;
```

to `FluidLiteConfig`.

Default:

```txt
low: 1.12
medium: 1.18
```

## 7.2 Effective radius

When creating splats:

```ts
const radius = baseRadius * config.interactionRadiusScale;
```

Target values after scaling:

```txt
pointer splat effective radius: 0.010-0.014
click splat effective radius: 0.016-0.022
```

Hard limit:

```txt
pointer splat should not exceed 0.016 by default
click splat should not exceed 0.026 by default
```

## 7.3 Keep squared radius math

The splat shader must continue to use squared radius math:

```glsl
float radius = max(uRadius, 0.0001);
float splat = exp(-dot(p, p) / (radius * radius));
```

Do not revert to the old broad formula.

---

# 8. Fluid Transparency Requirements

## 8.1 Fluid opacity CSS variable

Add:

```css
--fluid-layer-opacity: 0.68;
```

Use it on canvas wrapper:

```css
.fluidCanvas,
.fluidCanvasFallback {
  opacity: var(--fluid-layer-opacity, 0.68);
}
```

## 8.2 Display shader opacity

The display shader should still receive `uOpacity`, but the final visual opacity should be controlled by both:

```txt
display shader alpha
CSS layer opacity
```

This allows visual tuning without recompiling shader materials.

## 8.3 Default opacity

Recommended values:

```txt
desktop: 0.64-0.72
mobile: 0.52-0.62
fallback: 0.58-0.68
```

Use:

```txt
desktop default: 0.68
mobile default: 0.58
```

## 8.4 Pass-through visual behavior

The fluid should feel like a transparent liquid layer.

Requirement:

```txt
emblem remains visible through fluid
fluid dye remains visible over emblem
panel background still breathes
no fully opaque WebGL block
```

---

# 9. Emblem Depth Requirements

## 9.1 Layer modes

Support three emblem depth modes:

```ts
type EmblemDepth = "front" | "embedded" | "back";
```

### `front`

Legacy behavior.

```txt
emblem above fluid
highest readability
least fluid integration
```

### `embedded`

Default new behavior.

```txt
emblem behind fluid layer but above deep background
fluid can pass over emblem
emblem remains visible through transparency
best liquid-glass effect
```

### `back`

More dramatic behavior.

```txt
emblem behind most decorative layers
fluid dominates
emblem reads as a background seal
```

## 9.2 Default

Use:

```txt
emblemDepth: "embedded"
```

## 9.3 CSS layering

Recommended z-index stack:

```txt
0. panel background
1. emblem embedded/back layer
2. fluid canvas
3. safe-zone shadow / depth tint
4. rings
5. pearls
6. ChineseAccentText if it must stay legible
```

CSS:

```css
.heroFluidSimulationPanel__signature {
  position: relative;
  pointer-events: none;
}

.heroFluidSimulationPanel[data-emblem-depth="front"] .heroFluidSimulationPanel__signature {
  z-index: 6;
  opacity: 1;
}

.heroFluidSimulationPanel[data-emblem-depth="embedded"] .heroFluidSimulationPanel__signature {
  z-index: 1;
  opacity: 0.82;
  filter:
    drop-shadow(0 18px 42px rgba(0, 0, 0, 0.28))
    drop-shadow(0 0 18px rgba(247, 201, 72, 0.12));
}

.heroFluidSimulationPanel[data-emblem-depth="back"] .heroFluidSimulationPanel__signature {
  z-index: 0;
  opacity: 0.58;
  filter:
    blur(0.2px)
    drop-shadow(0 0 16px rgba(247, 201, 72, 0.10));
}
```

## 9.4 Important note

Do not make the emblem unreadable.

If `embedded` makes the emblem too faint, increase:

```txt
emblem opacity
fluid transparency
gold drop shadow
```

rather than moving the emblem fully back to front.

---

# 10. Pointer Pass-Through Requirements

## 10.1 DOM decoration should not block fluid interaction

All decorative hero visual layers should use:

```css
pointer-events: none;
```

This includes:

```txt
SignatureEmblem wrapper
ChineseAccentText if decorative in this context
rings
pearls
safe-zone visual overlay
```

## 10.2 Interaction listener placement

Pointer listeners should attach to a stable parent container, not only the canvas.

Preferred:

```txt
attach pointer/tap listeners to heroFluidSimulationPanel or heroSection__visual
set all visual overlays to pointer-events: none
```

This ensures the interaction surface remains consistent even when DOM layers sit above the canvas.

## 10.3 Preserve emblem safe zone

Even if the emblem is moved behind the fluid, the safe zone logic should still exist unless explicitly disabled.

Requirement:

```txt
the center emblem area should still be able to avoid direct splat injection
but the DOM emblem should not block event capture
```

Config:

```ts
emblemSafeZoneEnabled: boolean;
```

Default:

```txt
true
```

---

# 11. Cut-Off / Clipping Fixes

## 11.1 Identify clipping sources

Check and adjust these likely sources:

```txt
.heroSection__visual overflow
.heroFluidSimulationPanel overflow
.fluidCanvas inset
Canvas size
display plane scale
parent border-radius clipping
safe-zone overlay clipping
```

## 11.2 Required behavior

The visible fluid should not look abruptly cut at:

```txt
left edge
right edge
top edge
bottom edge
emblem center
rounded panel corners
```

## 11.3 Plane scaling

If the display plane is exactly `[2, 2]`, edge artifacts can be visible.

Allow a small plane scale:

```tsx
<mesh scale={[1.08, 1.08, 1]}>
```

or shader UV padding.

Requirement:

```txt
display plane can be slightly oversized
pointer mapping remains correct
no visible stretching
```

---

# 12. Config Updates

Update `FluidLiteConfig`:

```ts
export type FluidLiteConfig = {
  // existing fields...

  interactionRadiusScale: number;
  displayLayerOpacity: number;
  fieldBleedPx: number;
  emblemSafeZoneEnabled: boolean;
};
```

Preset additions:

```ts
low: {
  interactionRadiusScale: 1.12,
  displayLayerOpacity: 0.58,
  fieldBleedPx: 22,
  emblemSafeZoneEnabled: true,
}

medium: {
  interactionRadiusScale: 1.18,
  displayLayerOpacity: 0.68,
  fieldBleedPx: 28,
  emblemSafeZoneEnabled: true,
}
```

Hard limits:

```txt
interactionRadiusScale <= 1.35 by default
fieldBleedPx <= 48 by default
displayLayerOpacity <= 0.78 by default
```

---

# 13. CSS Requirements

Add or update these CSS rules.

```css
.heroFluidSimulationPanel {
  --fluid-layer-opacity: 0.68;
  --fluid-field-bleed: 28px;

  position: relative;
  display: grid;
  place-items: center;
  width: 100%;
  min-height: 100%;
  isolation: isolate;
  overflow: visible;
}

.heroFluidSimulationPanel__clip {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  overflow: hidden;
  z-index: 0;
}

.fluidCanvas,
.fluidCanvasFallback {
  position: absolute;
  inset: calc(var(--fluid-field-bleed, 28px) * -1);
  z-index: 2;
  opacity: var(--fluid-layer-opacity, 0.68);
  pointer-events: none;
}

.fluidCanvas canvas {
  display: block;
  width: 100% !important;
  height: 100% !important;
}

.heroFluidSimulationPanel__ring,
.heroFluidSimulationPanel__pearl,
.heroFluidSimulationPanel__safeZone,
.heroFluidSimulationPanel__signature {
  pointer-events: none;
}

.heroFluidSimulationPanel[data-emblem-depth="embedded"] .heroFluidSimulationPanel__signature {
  z-index: 1;
  opacity: 0.82;
}

.heroFluidSimulationPanel[data-emblem-depth="back"] .heroFluidSimulationPanel__signature {
  z-index: 0;
  opacity: 0.58;
}

.heroFluidSimulationPanel[data-emblem-depth="front"] .heroFluidSimulationPanel__signature {
  z-index: 6;
  opacity: 1;
}

@media (max-width: 768px) {
  .heroFluidSimulationPanel {
    --fluid-layer-opacity: 0.58;
    --fluid-field-bleed: 20px;
  }
}
```

---

# 14. Component Markup Recommendation

Update `HeroFluidSimulationPanel` to include a clip wrapper:

```tsx
export function HeroFluidSimulationPanel({
  fluidOpacity = 0.68,
  fieldBleed = 28,
  emblemDepth = "embedded",
  interactionRadiusScale = 1.18,
  pointerPassthrough = true,
}: HeroFluidSimulationPanelProps) {
  return (
    <div
      className="heroFluidSimulationPanel"
      data-emblem-depth={emblemDepth}
      data-pointer-passthrough={pointerPassthrough ? "true" : "false"}
      style={{
        "--fluid-layer-opacity": fluidOpacity,
        "--fluid-field-bleed": `${fieldBleed}px`,
      } as React.CSSProperties}
    >
      <div className="heroFluidSimulationPanel__clip" aria-hidden="true">
        <SignatureEmblem className="heroFluidSimulationPanel__signature" />

        <FluidCanvas
          quality="medium"
          opacity={fluidOpacity}
          bleed={fieldBleed}
          interactionRadiusScale={interactionRadiusScale}
        />

        <span className="heroFluidSimulationPanel__safeZone" aria-hidden="true" />
        <span className="heroFluidSimulationPanel__ring heroFluidSimulationPanel__ring--outer" />
        <span className="heroFluidSimulationPanel__ring heroFluidSimulationPanel__ring--inner" />
        <span className="heroFluidSimulationPanel__pearl heroFluidSimulationPanel__pearl--large" />
        <span className="heroFluidSimulationPanel__pearl heroFluidSimulationPanel__pearl--gold" />
        <span className="heroFluidSimulationPanel__pearl heroFluidSimulationPanel__pearl--water" />
        <span className="heroFluidSimulationPanel__pearl heroFluidSimulationPanel__pearl--jade" />
      </div>

      <ChineseAccentText />
    </div>
  );
}
```

Important:

```txt
If ChineseAccentText is interfering visually, it can also move inside the embedded/depth stack.
If it must remain readable, keep it above the clip wrapper.
```

---

# 15. Acceptance Criteria

- [ ] Fluid interaction no longer feels cut off by the hero panel.
- [ ] Canvas has configurable field bleed.
- [ ] Visible hero shape remains clean and rounded.
- [ ] Pointer mapping remains accurate.
- [ ] Interaction radius is slightly larger but not beam-like.
- [ ] `interactionRadiusScale` exists and is applied to splat creation.
- [ ] Fluid layer has configurable opacity.
- [ ] `fluidOpacity` / `displayLayerOpacity` can tune transparency.
- [ ] Emblem supports `front`, `embedded`, and `back` depth modes.
- [ ] Default emblem depth is `embedded`.
- [ ] Emblem no longer blocks pointer interaction.
- [ ] Decorative layers use `pointer-events: none`.
- [ ] Emblem remains visible through the fluid.
- [ ] Existing safe-zone logic remains intact.
- [ ] Reduced-motion fallback still works.
- [ ] WebGL fallback still works.
- [ ] No new dependencies are added.
- [ ] Build passes.
- [ ] Lint passes or existing lint issues are documented.

---

# 16. Non-Goals

Do not implement:

```txt
new fluid solver
new particle system
new visual theme
full hero redesign
route changes
project-card interactions
new dependencies
postprocessing
bloom
```

This is a targeted layering, clipping, transparency, and tuning spec.

---

# 17. Codex Implementation Prompt

```txt
Implement Spec 0020: Hero Fluid Field Bleed, Transparency, and Emblem Depth.

Context:
The current hero WebGL fluid simulation is being visually/interactively cut off. The radius is slightly too small. The component should become slightly transparent with variable pass-through behavior. The emblem is currently on top and interferes with the fluid component, so it should be sent back into an embedded/back layer while remaining visible through the transparent fluid.

Do not rewrite the hero copy or layout.
Do not replace the Spec 0019 fluid solver.
This is a targeted follow-up to improve composition and interaction.

Required changes:

1. HeroFluidSimulationPanel props
Add:
- fluidOpacity?: number
- fieldBleed?: number
- emblemDepth?: "front" | "embedded" | "back"
- interactionRadiusScale?: number
- pointerPassthrough?: boolean

Defaults:
- fluidOpacity: 0.68
- fieldBleed: 28
- emblemDepth: "embedded"
- interactionRadiusScale: 1.18
- pointerPassthrough: true

2. FluidCanvas props
Add:
- opacity?: number
- bleed?: number
- interactionRadiusScale?: number

Pass the interaction radius scale to the simulation/config override.

3. Field bleed / clipping fix
- Add a clip wrapper inside HeroFluidSimulationPanel.
- Allow the canvas to inset negatively using --fluid-field-bleed.
- Keep the visible hero panel rounded/clean.
- Ensure splats near edges do not look abruptly cut.
- If needed, slightly overscale the display plane to around 1.06-1.10.

4. Radius tuning
- Add interactionRadiusScale to fluidLiteConfig.
- low default: 1.12
- medium default: 1.18
- Apply this scale when creating pointer/click splats.
- Keep the squared-radius shader formula.
- Do not make broad glow beams.

Target effective radii:
- pointer: 0.010-0.014
- click/tap: 0.016-0.022

5. Fluid transparency
- Add --fluid-layer-opacity CSS variable.
- Apply it to .fluidCanvas and .fluidCanvasFallback.
- Desktop default around 0.68.
- Mobile default around 0.58.
- Keep display shader opacity working too.

6. Emblem depth
- Add data-emblem-depth to HeroFluidSimulationPanel.
- Support "front", "embedded", and "back".
- Default to "embedded".
- Move SignatureEmblem into the depth stack so the fluid can render over it.
- Ensure the emblem remains visible through the fluid.
- Use pointer-events: none on SignatureEmblem wrapper.

Recommended layering:
0. panel background
1. embedded/back emblem
2. fluid canvas
3. safe-zone depth tint
4. rings
5. pearls
6. ChineseAccentText if it must remain readable

7. Pointer pass-through
- All decorative layers should use pointer-events: none.
- Attach fluid pointer listeners to a stable parent container rather than relying only on the canvas if needed.
- Keep emblem safe-zone logic, but do not let the DOM emblem block pointer capture.

8. Preserve fallbacks
- Reduced-motion fallback still works.
- WebGL unavailable fallback still works.
- quality="off" fallback still works.

Constraints:
- no new dependencies
- no solver rewrite
- no postprocessing
- no bloom
- no full hero redesign
- no hero copy/CTA changes

Verification:
- npm run build
- npm run lint
- test pointer interaction near panel edges
- test click/tap near panel edges
- verify field is no longer visibly cut
- verify effective radius feels slightly larger
- verify emblem no longer visually blocks the fluid
- verify emblem remains visible in embedded mode
- verify fluid opacity can be tuned
- verify mobile still looks clean
- verify reduced motion fallback
```

---

# 18. Done Definition

This spec is complete when:

```txt
the fluid field no longer feels cut off
the radius is slightly larger and easier to see
the fluid layer is transparent and tunable
the emblem is embedded/back instead of interfering on top
pointer interactions pass through decorative layers
the hero remains visually premium and performant
```
