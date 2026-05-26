# Spec 0021: High-Quality Hero Fluid Simulation Preset

## Status

active

## Owner

Jason Huang

## Last Updated

2026-05-26

## Related Specs

- `spec0019_navier_stokes_webgl_hero_fluid_simulation_with_particles.md`
- `spec0020_hero_fluid_field_bleed_transparency_emblem_depth.md`

## Purpose

Upgrade the hero WebGL fluid simulation with an opt-in high-quality preset. The key requested change is to support **15 pressure iterations** so the fluid feels smoother and more coherent, while keeping the hero component bounded and safe.

This is a quality/tuning spec. It should not rewrite the solver, hero layout, emblem-depth behavior, or transparency work from Spec 0020.

---

## Product Goal

The hero fluid should feel:

```txt
smoother
more coherent
more premium
more fluid-like
less weak or smeary
```

It should not become:

```txt
brighter
faster
chaotic
GPU-heavy
full-screen
mobile-janky
```

The emblem should remain embedded/visible through the transparent fluid layer.

---

## Core Decision

Extend the fluid quality type:

```ts
export type FluidLiteQuality = "off" | "low" | "medium" | "high";
```

Add a new `high` preset with:

```txt
pressureIterations: 15
```

Do not force high mode everywhere. Use high mode for desktop-capable rendering and fallback to medium/low/off for mobile, reduced motion, or unsupported WebGL.

---

## Required Config Updates

Update:

```txt
src/components/webgl/fluid-lite/fluidLiteConfig.ts
```

Ensure `FluidLiteConfig` supports the fields from Specs 0019 and 0020, including:

```ts
export type FluidLiteConfig = {
  simResolution: number;
  dyeResolution: number;

  pressureIterations: number;
  diffusionIterations: number;

  maxActiveSplats: number;
  maxSplatsPerSecond: number;

  splatRadius: number;
  clickSplatRadius: number;
  splatForce: number;
  clickSplatForce: number;
  velocityScale: number;

  densityDissipation: number;
  velocityDissipation: number;
  pressureDissipation: number;
  dyeDiffusion: number;
  dispersionStrength: number;
  advectionScale: number;

  particleCount: number;
  particleSize: number;
  particleOpacity: number;
  particleDecay: number;

  displayOpacity: number;
  displayLayerOpacity: number;
  maxDpr: number;
  simulationFps: number;
  autoSplatIntervalMs: number;

  emblemSafeZoneRadius: number;
  emblemSafeZoneEnabled: boolean;

  interactionRadiusScale: number;
  fieldBleedPx: number;
};
```

---

## Recommended `high` Preset

Add:

```ts
high: {
  simResolution: 128,
  dyeResolution: 512,

  pressureIterations: 15,
  diffusionIterations: 3,

  maxActiveSplats: 6,
  maxSplatsPerSecond: 6,

  splatRadius: 0.010,
  clickSplatRadius: 0.017,
  splatForce: 760,
  clickSplatForce: 1180,
  velocityScale: 0.36,

  densityDissipation: 0.9984,
  velocityDissipation: 0.9935,
  pressureDissipation: 0.955,
  dyeDiffusion: 0.0012,
  dispersionStrength: 0.42,
  advectionScale: 0.105,

  particleCount: 168,
  particleSize: 1.8,
  particleOpacity: 0.30,
  particleDecay: 0.9975,

  displayOpacity: 0.74,
  displayLayerOpacity: 0.66,
  maxDpr: 1.15,
  simulationFps: 30,
  autoSplatIntervalMs: 6800,

  emblemSafeZoneRadius: 0.25,
  emblemSafeZoneEnabled: true,

  interactionRadiusScale: 1.18,
  fieldBleedPx: 32,
}
```

---

## Hard Limits

Do not exceed these without another spec:

```txt
pressureIterations <= 15
simResolution <= 128
dyeResolution <= 512
diffusionIterations <= 3
particleCount <= 180
maxDpr <= 1.15
simulationFps <= 30
maxActiveSplats <= 6
maxSplatsPerSecond <= 6
```

---

## Simulation Controller Requirements

Update:

```txt
src/components/webgl/fluid-lite/FluidSimulationController.tsx
```

The pressure loop must read from config:

```ts
for (let i = 0; i < config.pressureIterations; i += 1) {
  runPressurePass();
  targets.pressure.swap();
}
```

Requirements:

```txt
no hardcoded pressure iteration count
high mode actually runs 15 pressure iterations
simulation step remains capped at 30fps
document-hidden pause behavior remains
render targets/materials still dispose on unmount
```

---

## FluidCanvas Requirements

Update:

```txt
src/components/webgl/fluid-lite/FluidCanvas.tsx
```

Support:

```tsx
<FluidCanvas quality="high" />
```

Keep:

```txt
WebGL support detection
prefers-reduced-motion fallback
quality="off" fallback
maxDpr from config
powerPreference: "low-power"
```

Recommended behavior:

```txt
desktop fine-pointer devices may use high
mobile/touch-first devices should use medium or low
reduced motion should use off/fallback
```

---

## Optional Adaptive Quality Helper

Create:

```txt
src/components/webgl/fluid-lite/selectFluidQuality.ts
```

API:

```ts
import type { FluidLiteQuality } from "./fluidLiteConfig";

export function selectHeroFluidQuality(options: {
  requested?: FluidLiteQuality;
  reducedMotion: boolean;
  width: number;
  pointerFine: boolean;
  devicePixelRatio: number;
}): FluidLiteQuality;
```

Behavior:

```txt
if reducedMotion: off
if requested is explicitly provided: requested
if width < 768: low
if pointer is not fine: medium
if devicePixelRatio > 2: medium
otherwise: high
```

---

## Hero Panel Requirements

Update:

```txt
src/components/brand/HeroFluidSimulationPanel.tsx
```

Use high quality only with fallback protection:

```tsx
<FluidCanvas
  quality="high"
  opacity={fluidOpacity}
  bleed={fieldBleed}
  interactionRadiusScale={interactionRadiusScale}
/>
```

Preserve Spec 0020 behavior:

```txt
fluidOpacity remains tunable
fieldBleed remains tunable
emblemDepth defaults to embedded
interactionRadiusScale remains tunable
pointerPassthrough remains true
```

---

## Visual Tuning Requirements

High quality should improve smoothness, not intensity.

Keep:

```txt
low velocity
low decay rate / high persistence
small splats
transparent liquid-glass layer
embedded emblem
dye-driven display shader
no broad light beams
no rainbow
```

If high mode feels too strong, tune down:

```txt
displayLayerOpacity
displayOpacity
splatForce
clickSplatForce
```

Do not immediately lower pressure iterations unless performance is actually bad.

---

## Acceptance Criteria

- [ ] `FluidLiteQuality` includes `"high"`.
- [ ] High preset exists.
- [ ] High preset uses `pressureIterations: 15`.
- [ ] Pressure loop reads from `config.pressureIterations`.
- [ ] No hardcoded pressure iteration count remains.
- [ ] High mode uses `simResolution <= 128`.
- [ ] High mode uses `dyeResolution <= 512`.
- [ ] High mode uses `particleCount <= 180`.
- [ ] High mode uses `maxDpr <= 1.15`.
- [ ] High mode keeps `simulationFps: 30`.
- [ ] High mode keeps `maxActiveSplats <= 6`.
- [ ] High mode keeps `maxSplatsPerSecond <= 6`.
- [ ] Mobile does not force high by default.
- [ ] Reduced-motion fallback still works.
- [ ] WebGL fallback still works.
- [ ] Fluid looks smoother and more coherent.
- [ ] Fluid does not become brighter, faster, or more chaotic.
- [ ] Embedded emblem remains visible.
- [ ] Build passes.
- [ ] Lint passes or existing lint issues are documented.

---

## Non-Goals

Do not implement:

```txt
new solver architecture
WebGPU
postprocessing bloom
full-screen WebGL
high-DPR rendering
unlimited particles
mobile high-quality default
new dependencies
route changes
hero copy changes
```

---

## Codex Implementation Prompt

```txt
Implement Spec 0021: High-Quality Hero Fluid Simulation Preset.

Goal:
Add a high-quality hero fluid preset with pressureIterations set to 15. Keep the simulation hero-only, transparent, and performance-safe.

Required:
1. Update FluidLiteQuality to include "high".
2. Add a high preset in fluidLiteConfig.ts.
3. Set high.pressureIterations to 15.
4. Keep high.simResolution <= 128.
5. Keep high.dyeResolution <= 512.
6. Keep high.particleCount <= 180.
7. Keep high.maxDpr <= 1.15.
8. Keep high.simulationFps = 30.
9. Keep high.maxActiveSplats <= 6.
10. Keep high.maxSplatsPerSecond <= 6.
11. Update FluidSimulationController so pressure iterations are controlled only by config.pressureIterations.
12. Update FluidCanvas to accept quality="high".
13. Prefer high on desktop only if adaptive fallback exists.
14. Preserve Spec 0020 transparency, field bleed, emblem depth, and interactionRadiusScale behavior.

Recommended high preset:
pressureIterations: 15
simResolution: 128
dyeResolution: 512
diffusionIterations: 3
splatRadius: 0.010
clickSplatRadius: 0.017
splatForce: 760
clickSplatForce: 1180
velocityScale: 0.36
densityDissipation: 0.9984
velocityDissipation: 0.9935
pressureDissipation: 0.955
dyeDiffusion: 0.0012
dispersionStrength: 0.42
advectionScale: 0.105
particleCount: 168
particleSize: 1.8
particleOpacity: 0.30
particleDecay: 0.9975
displayOpacity: 0.74
displayLayerOpacity: 0.66
maxDpr: 1.15
simulationFps: 30
autoSplatIntervalMs: 6800
emblemSafeZoneRadius: 0.25
emblemSafeZoneEnabled: true
interactionRadiusScale: 1.18
fieldBleedPx: 32

Constraints:
- no new dependencies
- no postprocessing
- no bloom
- no full-page WebGL
- no mobile high mode by default
- no hero copy/CTA changes

Verification:
- npm run build
- npm run lint
- verify high mode uses 15 pressure iterations
- verify mobile uses lower quality or fallback
- verify reduced motion fallback
- verify WebGL fallback
- verify no obvious jank
```

---

## Done Definition

This spec is complete when:

```txt
the hero supports high quality fluid rendering
high mode uses 15 pressure iterations
desktop fluid looks smoother and more coherent
mobile remains protected
the fluid remains transparent and premium
the embedded emblem remains visible
performance guardrails remain intact
```
