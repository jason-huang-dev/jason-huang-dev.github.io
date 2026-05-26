# Spec 0022: Cinematic Hero Fluid Stage and Interactive Ring Reactor

## Status

proposed

## Owner

Jason Huang

## Last Updated

2026-05-26

## Related Specs

- `spec0019_navier_stokes_webgl_hero_fluid_simulation_with_particles.md`
- `spec0020_hero_fluid_field_bleed_transparency_emblem_depth.md`
- `spec0021_high_quality_hero_fluid_simulation_preset.md`

## Target Area

Hero WebGL fluid simulation quality, cinematic preset, higher resolution, higher particle count, higher FPS, larger interaction radius, central ring interactivity, custom hero composition, and brand-specific liquid seal design.

---

# 1. Purpose

The current hero fluid component is improving, but the visual still does not feel custom or premium enough.

This spec upgrades the hero into a more intentional custom component:

```txt
Liquid Seal Reactor
```

The hero should keep the Navier-Stokes-style fluid simulation, but it should feel like a designed brand object instead of a generic WebGL fluid rectangle.

This spec specifically addresses:

```txt
higher-quality simulation
higher render/simulation resolution
higher particle count
higher FPS option
larger pointer/click radius
central ring interactivity
more custom emblem/ring/fluid composition
better hero design around the Chinese signature mark
```

---

# 2. Design Goal

The hero visual should feel like a **Chinese seal suspended inside a liquid-glass reactor**.

The composition should read as:

```txt
a dark liquid basin
an embedded gold seal/emblem
interactive orbit rings
water pearls / dye emitters
fluid flowing around and across the center
subtle particle tracers
controlled cinematic motion
```

It should not feel like:

```txt
a flat card with a shader
a generic cursor glow
a disconnected emblem pasted on top
a non-interactive center
a static ring decoration
a GPU benchmark
```

---

# 3. Core Product Changes

## 3.1 Add a cinematic quality mode

Extend quality beyond `high`:

```ts
export type FluidLiteQuality = "off" | "low" | "medium" | "high" | "cinematic";
```

`cinematic` is the premium mode used for capable desktop devices or explicitly during local visual tuning.

## 3.2 Increase resolution

Current high quality is still conservative. Add a cinematic mode with higher internal resolution:

```txt
simResolution: 192
dyeResolution: 768
```

Optional local-only upper bound:

```txt
dyeResolution: 1024
```

Do not default to 1024 unless performance is verified.

## 3.3 Increase particles

Increase the particle count for cinematic mode:

```txt
particleCount: 288-360
recommended: 320
```

Particles should still be subtle and fluid-like, not a particle storm.

## 3.4 Increase FPS

Allow cinematic mode to run at:

```txt
simulationFps: 45
```

Optional experimental mode:

```txt
simulationFps: 60
```

Do not force 60fps as the default. Use 45fps as the cinematic default.

## 3.5 Increase interaction radius significantly

The current radius is still too small. Add a 5x radius scale mode.

Use:

```txt
interactionRadiusScale: 5
```

But implement it carefully so it reads as fluid, not a blob or beam.

Target effective cinematic radii:

```txt
pointer effective radius: 0.045-0.060
click effective radius: 0.075-0.095
ring pulse radius: 0.085-0.120
```

## 3.6 Make the central rings interactive

The center/ring area should no longer feel dead.

The emblem itself can remain decorative, but the ring system around it should become an interaction layer.

Pointer/tap interactions in the central ring area should trigger controlled ring-based splats.

---

# 4. Important Design Decision

Do **not** simply remove the emblem safe zone.

Instead, replace the old broad center dead zone with a more precise interaction model:

```txt
emblem glyph core = protected
ring reactor area = interactive
outer fluid basin = interactive
```

This means:

```txt
the exact emblem mark does not need to generate messy dye
the central rings can generate elegant circular pulses
the fluid can react in the center without visually attacking the emblem
```

---

# 5. New Hero Concept: `LiquidSealReactor`

## 5.1 Purpose

`LiquidSealReactor` is the branded hero visual composition that makes this component feel custom.

It combines:

```txt
WebGL fluid simulation
gold embedded seal
interactive ring reactor
orbit pearl emitters
central pulse interactions
transparent glass layering
```

## 5.2 File

Create or rename to:

```txt
src/components/brand/LiquidSealReactor.tsx
```

Then `HeroFluidSimulationPanel` can either:

```txt
wrap LiquidSealReactor
```

or be renamed in a future cleanup.

For this spec, keep backward compatibility:

```tsx
export function HeroFluidSimulationPanel(props: HeroFluidSimulationPanelProps) {
  return <LiquidSealReactor {...props} />;
}
```

## 5.3 Visual structure

Recommended stack:

```txt
0. deep panel background
1. embedded gold seal ghost
2. WebGL fluid canvas
3. central glass well
4. interactive orbit rings
5. pearl emitters
6. foreground specular highlights
7. ChineseAccentText if still desired
```

---

# 6. Component API

Update the hero fluid component props:

```ts
export type HeroFluidSimulationPanelProps = {
  quality?: "off" | "low" | "medium" | "high" | "cinematic";
  fluidOpacity?: number;
  fieldBleed?: number;
  emblemDepth?: "front" | "embedded" | "back";
  interactionRadiusScale?: number;
  pointerPassthrough?: boolean;
  centralRingInteractive?: boolean;
  ringPulseScale?: number;
  showPearlEmitters?: boolean;
};
```

Defaults:

```ts
const defaultHeroFluidPanelProps = {
  quality: "cinematic",
  fluidOpacity: 0.72,
  fieldBleed: 40,
  emblemDepth: "embedded",
  interactionRadiusScale: 5,
  pointerPassthrough: true,
  centralRingInteractive: true,
  ringPulseScale: 1,
  showPearlEmitters: true,
} satisfies Required<HeroFluidSimulationPanelProps>;
```

Important:

```txt
quality="cinematic" should still internally downgrade on weak/mobile/reduced-motion environments.
```

---

# 7. Cinematic Preset

Update:

```txt
src/components/webgl/fluid-lite/fluidLiteConfig.ts
```

## 7.1 Config shape additions

Ensure the config has:

```ts
export type FluidLiteQuality = "off" | "low" | "medium" | "high" | "cinematic";

export type FluidLiteConfig = {
  // existing fields...

  simResolution: number;
  dyeResolution: number;
  pressureIterations: number;
  diffusionIterations: number;

  simulationFps: number;
  maxDpr: number;

  particleCount: number;
  particleSize: number;
  particleOpacity: number;
  particleDecay: number;

  interactionRadiusScale: number;
  pointerSplatRadius: number;
  clickSplatRadius: number;
  ringPulseRadius: number;

  maxActiveSplats: number;
  maxSplatsPerSecond: number;

  centralRingInteractive: boolean;
  emblemCoreSafeZoneRadius: number;
  ringInteractionInnerRadius: number;
  ringInteractionOuterRadius: number;
};
```

If `splatRadius` already exists, keep it, but alias or replace it clearly:

```txt
splatRadius = pointerSplatRadius
```

## 7.2 Cinematic preset

Add:

```ts
cinematic: {
  simResolution: 192,
  dyeResolution: 768,

  pressureIterations: 20,
  diffusionIterations: 4,

  maxActiveSplats: 10,
  maxSplatsPerSecond: 10,

  splatRadius: 0.010,
  clickSplatRadius: 0.017,
  ringPulseRadius: 0.020,

  interactionRadiusScale: 5,

  splatForce: 820,
  clickSplatForce: 1280,
  ringPulseForce: 980,
  velocityScale: 0.34,

  densityDissipation: 0.9986,
  velocityDissipation: 0.9935,
  pressureDissipation: 0.955,
  dyeDiffusion: 0.00125,
  dispersionStrength: 0.46,
  advectionScale: 0.115,

  particleCount: 320,
  particleSize: 1.65,
  particleOpacity: 0.28,
  particleDecay: 0.9976,

  displayOpacity: 0.76,
  displayLayerOpacity: 0.70,
  maxDpr: 1.2,
  simulationFps: 45,
  autoSplatIntervalMs: 7400,

  emblemSafeZoneRadius: 0.25,
  emblemSafeZoneEnabled: true,

  emblemCoreSafeZoneRadius: 0.12,
  centralRingInteractive: true,
  ringInteractionInnerRadius: 0.15,
  ringInteractionOuterRadius: 0.34,

  fieldBleedPx: 44,
}
```

## 7.3 Why pressureIterations is 20

Spec 0021 set high mode to 15. This spec increases cinematic quality further:

```txt
high: 15 pressure iterations
cinematic: 20 pressure iterations
```

Do not increase beyond 20 without a future profiling pass.

## 7.4 Hard upper limits

Do not exceed these by default:

```txt
simResolution <= 192
dyeResolution <= 768
pressureIterations <= 20
diffusionIterations <= 4
particleCount <= 360
simulationFps <= 45
maxDpr <= 1.2
interactionRadiusScale <= 5
maxActiveSplats <= 10
maxSplatsPerSecond <= 10
```

Experimental local-only values may be tried, but should not be committed as defaults:

```txt
dyeResolution: 1024
simulationFps: 60
particleCount: 480
```

---

# 8. Larger Radius Without Blob/Beam Artifacts

A simple 5x radius increase can become a blob if implemented as one giant Gaussian.

Use **multi-lobe splats** instead of one broad splat.

## 8.1 Multi-lobe splat behavior

When creating a large cinematic splat, queue several smaller sub-splats:

```txt
pointer move: 3 lobes
click/tap: 5 lobes
ring pulse: 8 lobes around a circular band
```

Each lobe should use:

```txt
base radius * 2.1-2.8
```

The overall interaction feels 5x larger because the lobes spread spatially.

## 8.2 Why

This creates:

```txt
natural dye dispersion
organic fluid bloom
less flashlight/blob behavior
more custom interaction
```

## 8.3 Implementation

Add helper:

```ts
export function createMultiLobeSplats(input: {
  x: number;
  y: number;
  dx: number;
  dy: number;
  color: [number, number, number];
  radius: number;
  force: number;
  lobeCount: number;
  spread: number;
}): FluidSplat[];
```

For cinematic mode:

```txt
pointer lobeCount: 3
pointer spread: 0.028

click lobeCount: 5
click spread: 0.045

ring pulse lobeCount: 8
ring spread: circular band
```

Acceptance:

```txt
the interaction feels much larger
the dye still feels fluid-like
the output does not become one circular blob
```

---

# 9. Central Ring Interactivity

## 9.1 Problem

The central component/rings are still not interactive.

## 9.2 New interaction regions

Replace the single broad center safe zone with three regions:

```txt
emblem core zone
central ring zone
outer basin zone
```

### Emblem core zone

```txt
radius: 0.12
behavior: do not inject direct splats
```

### Central ring zone

```txt
inner radius: 0.15
outer radius: 0.34
behavior: inject ring pulse splats
```

### Outer basin zone

```txt
outside ringInteractionOuterRadius
behavior: normal pointer/click splats
```

## 9.3 Helper functions

Create:

```ts
export function getHeroFluidInteractionRegion(
  x: number,
  y: number,
  config: FluidLiteConfig,
): "emblem-core" | "ring" | "basin" {
  const dx = x - 0.5;
  const dy = y - 0.5;
  const distance = Math.sqrt(dx * dx + dy * dy);

  if (distance < config.emblemCoreSafeZoneRadius) return "emblem-core";
  if (
    distance >= config.ringInteractionInnerRadius &&
    distance <= config.ringInteractionOuterRadius
  ) {
    return "ring";
  }

  return "basin";
}
```

## 9.4 Ring behavior

If region is `"ring"`:

```txt
do not ignore interaction
create a ring pulse
emit splats along the ring tangent
add gold/cyan dye blend
trigger particle excitement near ring
```

## 9.5 Ring pulse splat

Create:

```ts
export function createRingPulseSplats(input: {
  x: number;
  y: number;
  config: FluidLiteConfig;
  color: [number, number, number];
}): FluidSplat[];
```

Suggested behavior:

```txt
8 splats around the ring
low outward velocity
slight tangent velocity
gold + cyan color
radius = ringPulseRadius * interactionRadiusScale
force = ringPulseForce
```

Important:

```txt
ring pulse should feel like tapping a liquid seal
not like a giant explosion
```

---

# 10. Pointer Listener Placement

The central rings and emblem may be DOM layers above the canvas. They must not block the interaction.

Requirements:

```txt
all decorative DOM layers use pointer-events: none
pointer listeners attach to the stable hero panel container
coordinates are normalized against visible hero panel
ring and basin region detection happens in the pointer hook
```

Update:

```txt
useFluidPointerSplats.ts
```

so it supports:

```txt
region detection
ring pulse creation
multi-lobe splat creation
emblem core ignore behavior
```

---

# 11. Better Hero Design

## 11.1 Component name

Use a custom brand component name:

```txt
LiquidSealReactor
```

This sounds more intentional than a generic `HeroFluidSimulationPanel`.

## 11.2 Visual elements

Add or update these layers:

```txt
LiquidSealReactor__basin
LiquidSealReactor__sealGhost
LiquidSealReactor__fluid
LiquidSealReactor__ringReactor
LiquidSealReactor__ringNode
LiquidSealReactor__pearlEmitter
LiquidSealReactor__specularSweep
LiquidSealReactor__verticalText
```

## 11.3 Ring nodes

Add 4-6 small ring nodes on the orbit path.

These should be decorative but map to WebGL emitter points.

Example positions:

```txt
top-left water node
top-right jade node
bottom-right gold node
bottom-left electric-blue node
small center-right pearl
small center-left pearl
```

When the user hovers/clicks around these areas, the ring pulse should feel connected to the visual nodes.

## 11.4 Custom motion language

The hero should feel like:

```txt
a seal-powered fluid reactor
a controlled water current
a liquid brand artifact
```

Not:

```txt
a random WebGL background
```

---

# 12. CSS Requirements

Add classes for the custom component.

```css
.liquidSealReactor {
  --fluid-layer-opacity: 0.72;
  --fluid-field-bleed: 44px;

  position: relative;
  display: grid;
  place-items: center;
  width: 100%;
  min-height: 100%;
  isolation: isolate;
  overflow: visible;
}

.liquidSealReactor__clip {
  position: absolute;
  inset: 0;
  overflow: hidden;
  border-radius: inherit;
}

.liquidSealReactor__sealGhost {
  position: relative;
  z-index: 1;
  opacity: 0.72;
  pointer-events: none;
  filter:
    drop-shadow(0 18px 42px rgba(0, 0, 0, 0.34))
    drop-shadow(0 0 22px rgba(247, 201, 72, 0.16));
}

.liquidSealReactor .fluidCanvas,
.liquidSealReactor .fluidCanvasFallback {
  z-index: 2;
  opacity: var(--fluid-layer-opacity, 0.72);
  inset: calc(var(--fluid-field-bleed, 44px) * -1);
}

.liquidSealReactor__ringReactor {
  position: absolute;
  z-index: 3;
  inset: 8%;
  border-radius: var(--radius-full);
  pointer-events: none;
}

.liquidSealReactor__ringReactor::before,
.liquidSealReactor__ringReactor::after {
  content: "";
  position: absolute;
  border-radius: inherit;
  border: 1px solid rgba(126, 231, 242, 0.22);
}

.liquidSealReactor__ringReactor::before {
  inset: 0;
}

.liquidSealReactor__ringReactor::after {
  inset: 18%;
  border-color: rgba(247, 201, 72, 0.18);
}

.liquidSealReactor__ringNode,
.liquidSealReactor__pearlEmitter {
  position: absolute;
  z-index: 4;
  border-radius: var(--radius-full);
  pointer-events: none;
}

.liquidSealReactor__specularSweep {
  position: absolute;
  inset: 0;
  z-index: 5;
  pointer-events: none;
  background:
    linear-gradient(115deg, transparent 0 38%, rgba(255, 255, 255, 0.08) 46%, transparent 56%);
  mix-blend-mode: screen;
  opacity: 0.22;
}
```

## 12.1 Mobile

On mobile:

```txt
downgrade quality to medium/low
reduce particle count
keep the custom reactor look
keep tap interactions only
```

---

# 13. FluidCanvas and Quality Selection

Update `selectHeroFluidQuality`:

```txt
if reducedMotion: off
if requested === "cinematic":
  if width >= 1024 and pointerFine and devicePixelRatio <= 2: cinematic
  if width >= 768: high
  return medium
if width < 768: low
if pointer is not fine: medium
if devicePixelRatio > 2: high
otherwise: cinematic
```

This allows cinematic on capable desktop while preventing mobile overload.

---

# 14. Performance Warning

This spec intentionally increases quality.

The developer must profile.

Required manual checks:

```txt
Chrome desktop
Safari desktop if available
mobile width 390px
reduced motion
idle CPU/GPU behavior
scroll jank
first-load responsiveness
```

If cinematic feels too heavy, tune in this order:

```txt
1. lower simulationFps from 45 to 30
2. lower particleCount from 320 to 240
3. lower dyeResolution from 768 to 512
4. lower simResolution from 192 to 128
5. lower pressureIterations from 20 to 15
```

Do not first reduce radius unless the visual becomes too blob-like.

---

# 15. Acceptance Criteria

- [ ] `FluidLiteQuality` includes `"cinematic"`.
- [ ] Cinematic preset increases sim resolution.
- [ ] Cinematic preset increases dye resolution.
- [ ] Cinematic preset increases particle count.
- [ ] Cinematic preset supports higher FPS.
- [ ] Cinematic preset increases pressure quality beyond high.
- [ ] Radius feels significantly larger, approximately 5x interaction feel.
- [ ] Large radius is implemented with multi-lobe splats, not one blob.
- [ ] Central ring region is interactive.
- [ ] Emblem core can remain protected.
- [ ] Ring taps/clicks generate ring pulse splats.
- [ ] Decorative DOM layers do not block pointer events.
- [ ] Hero feels more custom and branded.
- [ ] `LiquidSealReactor` component exists or equivalent structure is implemented.
- [ ] Mobile does not force cinematic mode.
- [ ] Reduced motion fallback still works.
- [ ] WebGL fallback still works.
- [ ] No new dependencies are added.
- [ ] Build passes.
- [ ] Lint passes or existing lint issues are documented.

---

# 16. Non-Goals

Do not implement:

```txt
full-page fluid background
WebGPU
postprocessing bloom
unlimited particles
unbounded 60fps cinematic mode
global route redesign
project-card fluid interactions
new dependencies
```

---

# 17. Codex Implementation Prompt

```txt
Implement Spec 0022: Cinematic Hero Fluid Stage and Interactive Ring Reactor.

Context:
The current hero fluid simulation needs to feel higher quality and more custom. Increase quality, resolution, particle count, FPS, and radius. The current radius is still too small and may need an approximately 5x larger interaction feel. The central component/rings are still not interactive. Keep the fluid simulation, but redesign this hero visual into a custom LiquidSealReactor-style component.

Do not rewrite the hero copy or CTA layout.
Do not remove the WebGL fluid simulation.
Do not add new dependencies.

Required quality changes:
1. Extend FluidLiteQuality:
   "off" | "low" | "medium" | "high" | "cinematic"

2. Add cinematic preset:
   simResolution: 192
   dyeResolution: 768
   pressureIterations: 20
   diffusionIterations: 4
   particleCount: 320
   simulationFps: 45
   maxDpr: 1.2
   maxActiveSplats: 10
   maxSplatsPerSecond: 10
   interactionRadiusScale: 5
   fieldBleedPx: 44

3. Keep hard limits:
   simResolution <= 192
   dyeResolution <= 768
   pressureIterations <= 20
   diffusionIterations <= 4
   particleCount <= 360
   simulationFps <= 45
   maxDpr <= 1.2

Required radius changes:
4. Make pointer/click interaction feel around 5x bigger.
5. Do not create one huge blob.
6. Implement multi-lobe splats:
   - pointer: 3 lobes
   - click/tap: 5 lobes
   - ring pulse: 8 lobes around a circular band
7. Keep squared-radius splat shader math.

Required central interactivity:
8. Replace the old broad center dead zone with:
   - emblem-core region
   - central ring region
   - outer basin region
9. Emblem core region:
   radius around 0.12
   no direct splats
10. Ring region:
   inner radius around 0.15
   outer radius around 0.34
   interactive
   creates ring pulse splats
11. Outer basin:
   normal pointer/click splats
12. Decorative DOM layers must use pointer-events: none.
13. Pointer listeners must attach to a stable parent container so the ring/emblem layers do not block interaction.

Required custom hero design:
14. Create or refactor toward a LiquidSealReactor component.
15. The visual should feel like a Chinese seal suspended inside a liquid-glass reactor.
16. Add custom reactor layers:
   - seal ghost / embedded emblem
   - fluid canvas
   - interactive orbit rings
   - ring nodes / pearl emitters
   - subtle specular sweep
17. Keep ChineseAccentText only if it improves the design; otherwise keep it readable and non-blocking.

Quality selection:
18. Cinematic mode is allowed on capable desktop only.
19. Mobile should downgrade to medium/low.
20. Reduced motion should render fallback/off.
21. WebGL unavailable should render fallback.

Visual requirements:
- dark navy base
- cyan, electric blue, jade, soft gold
- no full rainbow
- no broad light beam
- fluid should be more visible and interactive
- center rings should feel alive
- emblem should feel embedded, not pasted on top

Fallback/performance:
- no new dependencies
- one hero Canvas
- no full-page WebGL
- no bloom/postprocessing
- no mobile cinematic default
- profile manually

Verification:
- npm run build
- npm run lint
- test desktop cinematic mode
- test center ring clicks/taps
- test outer basin pointer movement
- test emblem core no direct splats
- test radius feels around 5x larger
- test mobile downgrade
- test reduced motion fallback
- verify no obvious jank
```

---

# 18. Done Definition

This spec is done when:

```txt
the hero fluid looks significantly higher quality
the simulation has a cinematic desktop mode
radius feels meaningfully larger without becoming a blob
the central rings are interactive
the component feels like a custom LiquidSealReactor, not a generic shader panel
mobile/reduced-motion fallbacks remain safe
```
