# Spec 0023: Single-Region Hero Fluid Seal Simplification

## Status

implemented

## Owner

Jason Huang

## Last Updated

2026-05-26

## Related Specs

- `spec0019_navier_stokes_webgl_hero_fluid_simulation_with_particles.md`
- `spec0020_hero_fluid_field_bleed_transparency_emblem_depth.md`
- `spec0022_cinematic_hero_fluid_stage_interactive_ring_reactor.md`

## Target Area

Hero WebGL fluid simulation, simplified interaction model, single fluid region, removal of region/ring mechanics, embedded emblem layering, and cleaner branded fluid composition.

---

# 1. Purpose

The current hero visual has become too visually segmented.

The screenshot shows:

```txt
large emblem
multiple visible circular rings
cyan/gold ring halos
pearl nodes
region-like center structure
fluid effects that feel tied to rings instead of one continuous field
```

This makes the hero feel like several UI overlays stacked on top of each other instead of one premium fluid surface.

This spec simplifies the direction:

```txt
one continuous fluid simulation region
no separate emblem-core/ring/basin interaction zones
no special central ring interaction model
no visible reactor-region UI
no dead center
```

The whole hero visual panel should be one interactive fluid field.

---

# 2. Product Goal

The hero should feel like:

```txt
a single liquid-glass panel
a gold signature embedded in the water
fluid moving continuously across the full panel
the center is interactive
pointer/tap anywhere injects fluid
subtle yin-yang-like swirl behavior inside the simulation
```

It should not feel like:

```txt
a radar UI
a target reticle
a reactor diagram
separate ring zones
a dead center
a set of decorative circles sitting over the fluid
```

---

# 3. Core Decision

Replace the region-based interaction model with a single-domain model.

Remove or disable:

```txt
emblem-core region
yin-lobe region
yang-lobe region
ring region
basin region
centralRingInteractive
ringPulseScale
ring pulse splats
visible ring-reactor UI
region debug overlays
```

Use instead:

```txt
one fluid domain
one pointer/tap handler
one continuous coordinate system
global swirl bias / optional ambient yin-yang current
normal splats anywhere in the panel
```

The emblem should not block interaction.

The center should be interactive.

---

# 4. New Design Direction

Use a simpler component concept:

```txt
Fluid Signature Seal
```

Not:

```txt
Liquid Seal Reactor
Yin-Yang Ring Reactor
```

The visual should be:

```txt
dark water-glass panel
embedded gold signature
single WebGL fluid canvas
subtle large orbit rings only if they are background texture
small pearl droplets only if they do not imply interaction zones
optional fluid-generated yin-yang swirl
vertical Chinese text
```

The yin-yang idea should live inside the fluid simulation, not as visible DOM ring zones.

---

# 5. Visual Cleanup Requirements

## 5.1 Remove dominant center rings

Remove or heavily reduce:

```txt
cyan ring halo behind top of emblem
gold ring halo behind bottom of emblem
separate central ring graphics
target-like rings
region-circle visuals
```

If rings remain, they should be:

```txt
very large
very faint
background-level
not centered as separate controls
not obviously interactive
```

Recommended opacity:

```txt
0.06-0.12
```

## 5.2 Keep the emblem embedded

The emblem can remain large, but it should feel inside the fluid.

Recommended:

```txt
emblem z-index below fluid canvas
fluid canvas opacity 0.62-0.74
emblem opacity 0.78-0.92
pointer-events: none on emblem wrapper
```

## 5.3 Keep droplets minimal

Pearls/droplets can remain, but reduce their conceptual role.

They should feel like:

```txt
floating droplets in the water
```

Not:

```txt
buttons
nodes
ring controls
reactor points
```

Recommended max count:

```txt
3-5 droplets
```

---

# 6. Interaction Model

## 6.1 One interaction region

All pointer/tap events inside the hero visual should be treated as part of the same fluid surface.

Behavior:

```txt
pointer move anywhere injects low-force dye/velocity
click/tap anywhere injects a stronger impulse
center area is interactive
emblem area is interactive
rings/droplets do not block interaction
```

There should be no special return/ignore behavior for the center.

## 6.2 Optional soft center damping

If direct center interaction makes the emblem messy, use **visual damping**, not region blocking.

Allowed:

```txt
slightly lower dye opacity near exact glyph area
slightly lower display contrast over the emblem
emblem remains readable through fluid
```

Not allowed:

```txt
do not block splats in the center
do not ignore pointer/tap events over the emblem
do not add a dead zone
```

## 6.3 Pointer listener placement

Pointer listeners should attach to:

```txt
hero fluid panel container
```

Not only:

```txt
canvas
ring layer
emblem layer
```

All visual overlays:

```css
pointer-events: none;
```

---

# 7. Fluid Behavior

The fluid should still be high quality and visible.

Keep or use:

```txt
real dye texture
real velocity texture
advection
pressure solve
diffusion/dispersion
particles
transparent display
larger radius from recent specs
```

But simplify the force logic.

## 7.1 Splat behavior

Use one splat path:

```ts
createFluidSplats(input)
```

For pointer movement:

```txt
3-5 lobe splat
```

For click/tap:

```txt
5-7 lobe splat
```

No ring pulse splats.

No region-specific splats.

## 7.2 Radius

The current radius can remain larger, but it should be fluid-like.

Recommended values:

```txt
interactionRadiusScale: 4-6
pointer effective radius: 0.040-0.060
click effective radius: 0.070-0.100
```

Use multi-lobe splats to avoid a blob.

## 7.3 Velocity

Keep motion calm:

```txt
velocityScale: 0.28-0.38
advectionScale: 0.10-0.14
```

Do not make the simulation fast to compensate for visual weakness.

## 7.4 Dye persistence

Keep high persistence:

```txt
densityDissipation: 0.998-0.9986
particleDecay: 0.997-0.998
```

---

# 8. Yin-Yang Swirl Without Regions

If yin-yang motion is desired, implement it as a continuous fluid-force bias, not as DOM regions.

## 8.1 Continuous swirl field

Add optional config:

```ts
yinYangSwirlEnabled: boolean;
yinYangSwirlStrength: number;
yinYangSwirlRadius: number;
yinYangSwirlRotationSpeed: number;
```

Default:

```ts
yinYangSwirlEnabled: true;
yinYangSwirlStrength: 0.12;
yinYangSwirlRadius: 0.42;
yinYangSwirlRotationSpeed: 0.08;
```

## 8.2 How it should behave

The swirl should:

```txt
gently bias dye into an S-like current
not create visible ring zones
not split the panel into separate regions
not override pointer interaction
```

## 8.3 Implementation options

Preferred v1:

```txt
ambient paired splats that orbit slowly around center
```

Alternative v2:

```txt
shader-level swirl velocity field added before advection
```

Do not add DOM S-curve rings unless extremely subtle.

---

# 9. Component Cleanup

## 9.1 Preferred component structure

Keep:

```txt
HeroFluidSimulationPanel
```

or use:

```txt
FluidSignatureSeal
```

Avoid:

```txt
LiquidSealReactor
YinYangFluidSeal with many region overlays
```

Suggested structure:

```tsx
export function HeroFluidSimulationPanel(props: HeroFluidSimulationPanelProps) {
  return (
    <div className="fluidSignatureSeal">
      <div className="fluidSignatureSeal__clip">
        <SignatureEmblem className="fluidSignatureSeal__emblem" />
        <FluidCanvas quality={props.quality ?? "cinematic"} />
        <span className="fluidSignatureSeal__ambientRing" />
        <span className="fluidSignatureSeal__droplet fluidSignatureSeal__droplet--one" />
        <span className="fluidSignatureSeal__droplet fluidSignatureSeal__droplet--two" />
        <span className="fluidSignatureSeal__droplet fluidSignatureSeal__droplet--three" />
        <span className="fluidSignatureSeal__glassSheen" />
      </div>

      <ChineseAccentText />
    </div>
  );
}
```

## 9.2 Remove region props

Remove or deprecate:

```ts
centralRingInteractive
ringPulseScale
showPearlEmitters as interaction emitters
emblemCoreSafeZoneRadius
ringInteractionInnerRadius
ringInteractionOuterRadius
```

If these fields remain temporarily, they should not affect behavior.

---

# 10. CSS Direction

Use simpler CSS.

```css
.fluidSignatureSeal {
  --fluid-layer-opacity: 0.70;
  --fluid-field-bleed: 44px;

  position: relative;
  display: grid;
  place-items: center;
  width: 100%;
  min-height: 100%;
  isolation: isolate;
  overflow: visible;
}

.fluidSignatureSeal__clip {
  position: absolute;
  inset: 0;
  overflow: hidden;
  border-radius: inherit;
}

.fluidSignatureSeal__emblem {
  position: relative;
  z-index: 1;
  opacity: 0.86;
  pointer-events: none;
  filter:
    drop-shadow(0 18px 42px rgba(0, 0, 0, 0.34))
    drop-shadow(0 0 22px rgba(247, 201, 72, 0.14));
}

.fluidSignatureSeal .fluidCanvas,
.fluidSignatureSeal .fluidCanvasFallback {
  z-index: 2;
  opacity: var(--fluid-layer-opacity);
  inset: calc(var(--fluid-field-bleed) * -1);
  pointer-events: none;
}

.fluidSignatureSeal__ambientRing {
  position: absolute;
  z-index: 3;
  inset: 8%;
  border-radius: var(--radius-full);
  border: 1px solid rgba(126, 231, 242, 0.10);
  pointer-events: none;
}

.fluidSignatureSeal__glassSheen {
  position: absolute;
  inset: 0;
  z-index: 4;
  pointer-events: none;
  opacity: 0.14;
  mix-blend-mode: screen;
}
```

Important:

```txt
do not use bright center rings
do not use multiple high-opacity circle overlays
do not visually imply regions
```

---

# 11. Files to Update

Likely files:

```txt
src/components/brand/YinYangFluidSeal.tsx
src/components/brand/HeroFluidSimulationPanel.tsx
src/components/webgl/fluid-lite/useFluidPointerSplats.ts
src/components/webgl/fluid-lite/fluidLiteConfig.ts
src/components/webgl/fluid-lite/FluidCanvas.tsx
src/components/webgl/fluid-lite/FluidSimulationController.tsx
src/index.css
docs/specs/spec0022_cinematic_hero_fluid_stage_interactive_ring_reactor.md
```

Possible action:

```txt
rename/refactor YinYangFluidSeal into FluidSignatureSeal
or keep filename but simplify internals
```

---

# 12. Acceptance Criteria

- [ ] Hero uses one continuous fluid interaction region.
- [ ] Center is interactive.
- [ ] Emblem area is interactive.
- [ ] There is no emblem-core blocking behavior.
- [ ] There is no ring-region behavior.
- [ ] There are no ring pulse splats.
- [ ] Visible center rings are removed or reduced to faint background texture.
- [ ] Fluid remains high quality and visible.
- [ ] Larger interaction radius remains.
- [ ] Multi-lobe splats are used to avoid blob/beam artifacts.
- [ ] Optional yin-yang behavior is simulation-level, not DOM-region-level.
- [ ] Emblem stays embedded under/inside the fluid.
- [ ] Decorative layers do not block pointer events.
- [ ] Reduced-motion fallback still works.
- [ ] WebGL fallback still works.
- [ ] Build passes.
- [ ] Lint either passes or fails only because ESLint config is missing.

---

# 13. Non-Goals

Do not implement:

```txt
new ring interaction system
new region model
new visible reactor UI
new buttons/nodes
full hero layout rewrite
new dependencies
postprocessing bloom
project-card fluid interactions
```

---

# 14. Codex Implementation Prompt

```txt
Implement Spec 0023: Single-Region Hero Fluid Seal Simplification.

Context:
The current hero visual has become too visually segmented. It shows prominent center rings / reactor-like overlays, and the interaction model has emblem-core, ring, lobe, and basin regions. This is not the desired direction. The goal is one continuous fluid simulation region.

Problem:
The current component looks like stacked ring UI / reactor zones over the emblem. The user wants only one fluid simulation region. The center should not be dead. The emblem should not block interaction. The rings should not define special interactive zones.

Required changes:
1. Remove or disable the region model:
   - emblem-core
   - ring
   - yin-lobe
   - yang-lobe
   - basin
2. Remove or disable:
   - centralRingInteractive
   - ring pulse splats
   - ringInteractionInnerRadius
   - ringInteractionOuterRadius
   - emblemCoreSafeZoneRadius blocking behavior
3. Pointer/tap anywhere inside the hero panel should inject fluid.
4. The center/emblem area must be interactive.
5. All decorative DOM layers must use pointer-events: none.
6. Pointer listeners should attach to the stable hero fluid panel container.

Visual cleanup:
7. Remove or heavily reduce prominent center rings.
8. Keep only very faint large ambient rings if needed.
9. Remove the reactor/target visual feeling.
10. Keep the emblem embedded under/inside the fluid.
11. Keep fluid canvas transparent over the emblem.
12. Keep droplets minimal and decorative only.

Fluid behavior:
13. Keep real dye/velocity simulation.
14. Keep larger radius.
15. Use multi-lobe splats for pointer/click so the larger radius does not become a blob.
16. Use one generic splat path for all interactions.
17. Optional yin-yang behavior should be implemented as a continuous ambient swirl field or ambient paired splats, not as DOM regions.

Recommended tuning:
- interactionRadiusScale: 4-6
- pointer effective radius: 0.040-0.060
- click effective radius: 0.070-0.100
- velocityScale: 0.28-0.38
- advectionScale: 0.10-0.14
- densityDissipation: 0.998-0.9986
- particleDecay: 0.997-0.998

Design rename:
18. Prefer the concept name Fluid Signature Seal.
19. If keeping YinYangFluidSeal.tsx, simplify it so it no longer contains region/ring reactor behavior.
20. HeroFluidSimulationPanel can wrap the simplified component.

Acceptance:
- one continuous fluid interaction region
- center is interactive
- emblem area is interactive
- no ring-region interaction
- no dead zones
- no prominent reactor rings
- larger fluid interaction remains
- fluid looks continuous across the hero panel
- reduced-motion fallback works
- WebGL fallback works
- npm run build passes
```

---

# 15. Done Definition

This spec is done when:

```txt
the hero no longer looks like a reactor/ring-zone UI
the entire panel behaves as one fluid field
the emblem and center are interactive
the fluid remains premium, visible, and continuous
the visual composition feels calmer and more intentional
```
