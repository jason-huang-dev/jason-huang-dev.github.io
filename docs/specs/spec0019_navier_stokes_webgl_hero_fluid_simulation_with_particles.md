# Spec 0019: Navier-Stokes WebGL Hero Fluid Simulation with Particles

## Status

proposed

## Owner

Jason Huang

## Last Updated

2026-05-25

## Target Area

Hero visual panel, real WebGL Navier-Stokes-inspired fluid simulation, dye dispersion, low-interaction splats, low-radius input, low-decay persistence, particle tracers, transparent hero layer, and emblem-safe interaction zone.

---

# 1. Purpose

This spec supersedes the earlier Spec 0019 draft and clarifies the desired result.

The current issue is that the hero effect reads like:

```txt
a light beam
a cursor glow
a broad shader highlight
```

The desired result is:

```txt
real fluid motion
dye dispersing through water
soft ink-like currents
low-radius splats
slow velocity
low decay / longer persistence
subtle particle tracers carried by the flow
```

This should be a constrained WebGL hero signature component, not a full-page GPU demo.

---

# 2. Terminology

When this spec says **Navier-Stokes simulation**, it means a practical real-time stable-fluid approximation:

```txt
velocity field
dye / density field
force injection
advection
diffusion / dispersion
divergence
pressure projection
gradient subtraction
particle tracers advected by flow
```

It does not require scientific CFD accuracy.

When this spec says **low decay**, it means:

```txt
low decay rate
high persistence
dye lingers longer before fading
particles fade slowly
```

---

# 3. Product Goal

The hero panel should feel like a dark liquid-glass object behind the gold signature emblem.

The final visual should have:

```txt
real dye movement
visible dispersion
calm low-velocity currents
small-radius interactions
about 6 max active interaction splats
longer fluid persistence
subtle particles moving with the flow
transparent WebGL layer
central emblem safe zone
```

The final visual should not have:

```txt
large light beams
wide glowing cones
fast smoke
RGB rainbow trails
paint explosions
particle storms
full-screen shader effects
```

---

# 4. Existing Hero Context

Current repo context:

```txt
HeroSection already lazy-loads HeroFluidSimulationPanel.
The hero visual is wrapped in Suspense.
The fallback uses HeroOrbitalSignature.
```

Keep that structure. Do not rewrite the hero copy, CTA buttons, `Reveal`, `Magnetic`, or `SealStampCTA`.

---

# 5. Required Result

The implementation must clearly show:

```txt
1. dye being injected into the fluid field;
2. dye moving through a velocity field;
3. dye dispersing rather than staying as a flat glow;
4. particles being carried by the field;
5. interaction events being limited and subtle;
6. the emblem area not injecting dye;
7. the fluid layer staying transparent behind the emblem.
```

If the output still looks like a light beam, this spec is not complete.

---

# 6. Hard Constraints

## 6.1 Performance constraints

```txt
one Canvas
hero-only WebGL
no full-page WebGL
no postprocessing bloom
no particle storm
no high preset
no unbounded pointer splats
no new dependencies
```

## 6.2 Simulation constraints

Default target values:

```txt
simulationFps: 30
simResolution: 96 max by default
dyeResolution: 384 max by default
pressureIterations: 6 max by default
diffusionIterations: 2 max by default
maxActiveSplats: 6
maxSplatsPerSecond: 6
splatRadius: 0.006-0.010
clickSplatRadius: 0.010-0.016
velocityScale: 0.25-0.38
densityDissipation: 0.997-0.9985
velocityDissipation: 0.990-0.994
particleCount: 96-180
maxDpr: 1.1
```

## 6.3 Interaction constraints

The hero should have a **low interaction count around 6**.

Interpretation:

```txt
no more than 6 active splat impulses can be queued/rendered at once
no more than 6 pointermove splats per second by default
click/tap counts as one stronger impulse
ambient splats count toward the same queue
```

This prevents the panel from turning into a messy paint canvas.

---

# 7. Architecture Overview

Use the existing hero panel direction but upgrade the simulation internals:

```txt
HeroSection
  heroSection__visual
    HeroFluidSimulationPanel
      FluidCanvas
        Canvas
          NavierStokesFluidSimulation
            velocity ping-pong target
            dye ping-pong target
            pressure ping-pong target
            divergence target
            optional diffusion target
            particle buffer / points
            display plane
      DOM rings
      DOM pearls
      DOM SignatureEmblem
      DOM ChineseAccentText
```

The gold signature and Chinese text remain DOM layers above the canvas.

---

# 8. File Plan

Create or update:

```txt
src/components/brand/HeroFluidSimulationPanel.tsx

src/components/webgl/fluid-lite/FluidCanvas.tsx
src/components/webgl/fluid-lite/NavierStokesFluidSimulation.tsx
src/components/webgl/fluid-lite/FluidRenderTargets.ts
src/components/webgl/fluid-lite/useFluidPointerSplats.ts
src/components/webgl/fluid-lite/fluidLiteConfig.ts
src/components/webgl/fluid-lite/fluidMaterials.ts
src/components/webgl/fluid-lite/fluidParticles.ts

src/components/webgl/fluid-lite/shaders/baseVertex.ts
src/components/webgl/fluid-lite/shaders/splat.ts
src/components/webgl/fluid-lite/shaders/advection.ts
src/components/webgl/fluid-lite/shaders/diffusion.ts
src/components/webgl/fluid-lite/shaders/divergence.ts
src/components/webgl/fluid-lite/shaders/pressure.ts
src/components/webgl/fluid-lite/shaders/gradientSubtract.ts
src/components/webgl/fluid-lite/shaders/display.ts
src/components/webgl/fluid-lite/shaders/particle.ts

src/index.css
```

If `FluidSimulationController.tsx` already exists, either rename it to `NavierStokesFluidSimulation.tsx` or update it in place while keeping the public import stable.

---

# 9. Configuration

## 9.1 File

```txt
src/components/webgl/fluid-lite/fluidLiteConfig.ts
```

## 9.2 Config shape

```ts
export type FluidLiteQuality = "off" | "low" | "medium";

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

  particleCount: number;
  particleSize: number;
  particleOpacity: number;
  particleDecay: number;

  displayOpacity: number;
  maxDpr: number;
  simulationFps: number;
  autoSplatIntervalMs: number;

  emblemSafeZoneRadius: number;
};
```

## 9.3 Presets

```ts
export const fluidLitePresets: Record<FluidLiteQuality, FluidLiteConfig> = {
  off: {
    simResolution: 1,
    dyeResolution: 1,
    pressureIterations: 0,
    diffusionIterations: 0,
    maxActiveSplats: 0,
    maxSplatsPerSecond: 0,
    splatRadius: 0,
    clickSplatRadius: 0,
    splatForce: 0,
    clickSplatForce: 0,
    velocityScale: 0,
    densityDissipation: 1,
    velocityDissipation: 1,
    pressureDissipation: 1,
    dyeDiffusion: 0,
    dispersionStrength: 0,
    particleCount: 0,
    particleSize: 0,
    particleOpacity: 0,
    particleDecay: 1,
    displayOpacity: 0,
    maxDpr: 1,
    simulationFps: 0,
    autoSplatIntervalMs: 0,
    emblemSafeZoneRadius: 0.25,
  },

  low: {
    simResolution: 64,
    dyeResolution: 256,
    pressureIterations: 4,
    diffusionIterations: 1,
    maxActiveSplats: 6,
    maxSplatsPerSecond: 5,
    splatRadius: 0.007,
    clickSplatRadius: 0.012,
    splatForce: 520,
    clickSplatForce: 880,
    velocityScale: 0.28,
    densityDissipation: 0.9975,
    velocityDissipation: 0.992,
    pressureDissipation: 0.945,
    dyeDiffusion: 0.0008,
    dispersionStrength: 0.28,
    particleCount: 96,
    particleSize: 1.6,
    particleOpacity: 0.26,
    particleDecay: 0.996,
    displayOpacity: 0.62,
    maxDpr: 1,
    simulationFps: 30,
    autoSplatIntervalMs: 5600,
    emblemSafeZoneRadius: 0.25,
  },

  medium: {
    simResolution: 96,
    dyeResolution: 384,
    pressureIterations: 6,
    diffusionIterations: 2,
    maxActiveSplats: 6,
    maxSplatsPerSecond: 6,
    splatRadius: 0.009,
    clickSplatRadius: 0.015,
    splatForce: 720,
    clickSplatForce: 1120,
    velocityScale: 0.34,
    densityDissipation: 0.9982,
    velocityDissipation: 0.993,
    pressureDissipation: 0.95,
    dyeDiffusion: 0.0011,
    dispersionStrength: 0.36,
    particleCount: 144,
    particleSize: 1.8,
    particleOpacity: 0.32,
    particleDecay: 0.997,
    displayOpacity: 0.72,
    maxDpr: 1.1,
    simulationFps: 30,
    autoSplatIntervalMs: 6200,
    emblemSafeZoneRadius: 0.25,
  },
};
```

## 9.4 Tuning intent

These values intentionally produce:

```txt
smaller splats
slower velocity
longer dye persistence
more dispersion
fewer interactions
subtle particle motion
```

Do not start from high-energy fluid demo defaults.

---

# 10. Navier-Stokes Simulation Passes

Each simulation step should run:

```txt
1. Apply queued velocity splats.
2. Apply queued dye splats.
3. Advect velocity through velocity.
4. Diffuse velocity lightly.
5. Advect dye through velocity.
6. Diffuse / disperse dye lightly.
7. Compute divergence.
8. Damp or clear pressure.
9. Solve pressure with limited Jacobi iterations.
10. Subtract pressure gradient from velocity.
11. Advect particles through velocity.
12. Display dye + particles with transparent dark-water styling.
```

## 10.1 Why dispersion matters

The current problem is that the effect looks like a light beam.

To avoid that:

```txt
dye should spread softly at edges
dye should break into wispy low-frequency currents
dye should not stay as a radial glow cone
```

Preferred approach:

```txt
implement a low-cost diffusion pass for dye
add subtle dispersion in display shader
```

---

# 11. Render Targets

Required targets:

```txt
velocity ping-pong
dye ping-pong
pressure ping-pong
divergence single target
optional diffusion temporary target
```

Preferred texture type:

```txt
THREE.HalfFloatType
```

Fallback:

```txt
THREE.UnsignedByteType
```

Target options:

```ts
{
  minFilter: THREE.LinearFilter,
  magFilter: THREE.LinearFilter,
  wrapS: THREE.ClampToEdgeWrapping,
  wrapT: THREE.ClampToEdgeWrapping,
  depthBuffer: false,
  stencilBuffer: false,
}
```

Dispose all render targets on unmount.

---

# 12. Splat Behavior

## 12.1 Low radius

Splat radii must stay small:

```txt
pointermove radius: 0.006-0.010
click/tap radius: 0.010-0.016
```

This prevents the visual from becoming a huge light beam.

## 12.2 Low interaction count

Queue max:

```txt
maxActiveSplats: 6
```

Throttle:

```txt
maxSplatsPerSecond: 6
```

Pointermove should not splat on every move.

Only splat when:

```txt
pointer moved enough distance
throttle interval passed
outside emblem safe zone
hero is visible
document is visible
```

## 12.3 Low velocity

Pointer velocity should be scaled and clamped:

```ts
const scaledDx = clamp(rawDx * config.velocityScale, -0.55, 0.55);
const scaledDy = clamp(rawDy * config.velocityScale, -0.55, 0.55);
```

Click/tap impulse should be stronger than pointermove but still calm:

```txt
clickSplatForce <= 1120 by default
```

## 12.4 Low decay / longer persistence

Dye should linger:

```txt
densityDissipation: 0.9975-0.9982
particleDecay: 0.996-0.997
```

The display shader should avoid killing low dye values too aggressively.

---

# 13. Emblem Safe Zone

The area where the emblem exists should not be interactive for the simulation.

Center:

```txt
x = 0.5
y = 0.5
radius = config.emblemSafeZoneRadius
```

Helper:

```ts
export function isInsideEmblemSafeZone(
  x: number,
  y: number,
  radius: number,
): boolean {
  const dx = x - 0.5;
  const dy = y - 0.5;
  return Math.sqrt(dx * dx + dy * dy) < radius;
}
```

If pointer/tap is inside safe zone:

```txt
no velocity splat
no dye splat
no particle spawn
```

Fluid may still flow behind the emblem passively.

The safe zone should not look like a hard circle. If visually represented, use only a subtle dark radial calm zone.

---

# 14. Particle Tracers

## 14.1 Purpose

Particles make the simulation read as fluid rather than as a light beam.

Particles should be subtle tracer beads carried by the velocity field.

## 14.2 Files

```txt
src/components/webgl/fluid-lite/fluidParticles.ts
src/components/webgl/fluid-lite/shaders/particle.ts
```

## 14.3 Count

Default:

```txt
low: 96
medium: 144
```

Hard maximum:

```txt
180
```

## 14.4 Behavior

Particles should:

```txt
sample or approximate the velocity field
drift slowly
fade in/out softly
reset when they leave bounds
avoid emblem safe zone when spawned
use small point size
use low opacity
```

They should not:

```txt
look like stars
look like snow
dominate the hero
create a particle storm
```

## 14.5 Visual

```txt
mostly cyan/blue
occasional jade
rare faint gold
opacity: 0.26-0.32
size: 1.6-1.8px default
```

## 14.6 Implementation option

Preferred v1:

```txt
CPU-updated particle positions in refs/typed arrays
approximate flow using current velocity/splat history
render as THREE.Points
```

More accurate v2:

```txt
GPU particle advection using velocity texture
```

For this spec, use the simpler approach unless GPU sampling is straightforward.

---

# 15. Display Shader Requirements

The display shader must stop the fluid from reading as a light beam.

Required treatment:

```txt
transparent dark-water base
dye color from dye texture
edge dispersion
soft wispy breakup
center gold bias very subtle
vignette
low alpha
```

Required uniforms:

```txt
uDye
uTime
uOpacity
uDispersionStrength
uBaseColor
uGoldBias
uVignetteStrength
```

Alpha behavior:

```glsl
float dyeStrength = clamp(length(dye.rgb), 0.0, 1.0);
float alpha = mix(0.28, uOpacity, smoothstep(0.02, 0.62, dyeStrength));
```

Dispersion behavior:

```txt
sample dye at uv
sample dye at uv + small noise offset
sample dye at uv - small noise offset
mix them lightly
```

Do not create rainbow channel splitting.

---

# 16. CSS Requirements

Update `src/index.css`.

## 16.1 Canvas transparency

```css
.fluidCanvas,
.fluidCanvasFallback {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  opacity: 0.72;
}

@media (max-width: 768px) {
  .fluidCanvas,
  .fluidCanvasFallback {
    opacity: 0.58;
  }
}
```

## 16.2 Panel composition

```css
.heroFluidSimulationPanel {
  position: relative;
  display: grid;
  place-items: center;
  width: 100%;
  min-height: 100%;
  isolation: isolate;
  overflow: hidden;
}
```

## 16.3 Signature dominance

```css
.heroFluidSimulationPanel__signature {
  position: relative;
  z-index: 4;
  filter:
    drop-shadow(0 18px 42px rgba(0, 0, 0, 0.38))
    drop-shadow(0 0 20px rgba(247, 201, 72, 0.16));
}

.heroFluidSimulationPanel .chineseAccent {
  z-index: 5;
}
```

---

# 17. Fallback Requirements

Fallback must show when:

```txt
WebGL unavailable
quality="off"
prefers-reduced-motion enabled
Canvas throws
mobile performance issue
```

Fallback should still look premium:

```txt
transparent dark panel
cyan/gold static glow
rings
pearls
signature
Chinese text
```

Reduced motion should not run active simulation.

---

# 18. Accessibility Requirements

The simulation is decorative:

```txt
Canvas aria-hidden
no meaningful content inside Canvas
hero visual can remain aria-hidden
keyboard navigation unchanged
CTAs outside Canvas unaffected
reduced motion disables active simulation
particles are decorative
```

---

# 19. Performance Budget

Hard limits:

```txt
one Canvas
one hero-only simulation
simResolution <= 96 default
dyeResolution <= 384 default
pressureIterations <= 6 default
diffusionIterations <= 2 default
particleCount <= 180
DPR <= 1.1
maxActiveSplats <= 6
maxSplatsPerSecond <= 6
simulationFps = 30
no bloom
no postprocessing
no full-page canvas
no new dependencies
```

Memory target:

```txt
under 10-20 MB GPU texture memory
```

---

# 20. Implementation Slices

## Slice A — preserve hero integration

```txt
Keep HeroSection lazy-loaded panel structure.
Update/confirm HeroFluidSimulationPanel.
Ensure fallback still works.
```

## Slice B — build real dye/velocity simulation

```txt
velocity ping-pong
dye ping-pong
splat pass
advection pass
display pass
```

Acceptance:

```txt
dye appears and moves through velocity, not just pointer glow
```

## Slice C — add pressure projection

```txt
divergence
pressure solve
gradient subtract
```

Acceptance:

```txt
motion feels more fluid and less smear-like
```

## Slice D — add dispersion/diffusion

```txt
diffusion shader or display dispersion
low diffusion iterations
wispy dye breakup
```

Acceptance:

```txt
visual no longer reads as a light beam
```

## Slice E — add particle tracers

```txt
small particle count
low opacity
flow-following drift
safe zone spawn avoidance
```

Acceptance:

```txt
particles improve fluid readability without dominating
```

## Slice F — tune and constrain

```txt
max 6 interactions
low radius
low velocity
low decay / high persistence
transparent display
safe zone exclusion
```

Acceptance:

```txt
fluid feels calm, persistent, and branded
```

---

# 21. Acceptance Criteria

- [ ] This file remains Spec 0019.
- [ ] Hero no longer reads as a light beam.
- [ ] Fluid uses real dye texture.
- [ ] Fluid uses real velocity texture.
- [ ] Dye advects through velocity.
- [ ] Pressure projection is implemented.
- [ ] Dye dispersion/diffusion is implemented.
- [ ] Particle tracers are added with low count.
- [ ] Max active interactions are capped around 6.
- [ ] Splat radius is low.
- [ ] Velocity is low and calm.
- [ ] Decay rate is low / persistence is high.
- [ ] Fluid layer is slightly transparent.
- [ ] Emblem area does not inject splats.
- [ ] Gold emblem remains DOM-rendered and sharp.
- [ ] Reduced motion fallback works.
- [ ] WebGL fallback works.
- [ ] No new dependencies are added.
- [ ] Performance remains constrained.
- [ ] Build passes.
- [ ] Lint passes or existing lint issues are documented.

---

# 22. Non-Goals

Do not implement:

```txt
full-screen fluid simulation
high-res CFD
particle storm
bloom/postprocessing stack
rainbow shader
interactive project card fluid
route changes
new dependencies
meaningful content inside Canvas
```

---

# 23. Codex Implementation Prompt

```txt
Implement Spec 0019: Navier-Stokes WebGL Hero Fluid Simulation with Particles.

Context:
The current hero effect looks like a light beam or cursor glow. We need it to read as real fluid with dye dispersion and particle tracers.

Current repo:
HeroSection already lazy-loads HeroFluidSimulationPanel inside heroSection__visual. Preserve this structure.

Goal:
Implement a constrained Navier-Stokes-inspired WebGL fluid simulation in the hero panel. It should use real dye and velocity textures, pressure projection, dispersion/diffusion, and subtle particle tracers. Keep interaction count low around 6, radius low, velocity low, and decay rate low so dye persists longer.

Required:
1. Update or create HeroFluidSimulationPanel.
2. Update or create fluid-lite WebGL files:
   - FluidCanvas.tsx
   - NavierStokesFluidSimulation.tsx or FluidSimulationController.tsx
   - FluidRenderTargets.ts
   - useFluidPointerSplats.ts
   - fluidLiteConfig.ts
   - fluidMaterials.ts
   - fluidParticles.ts
3. Add/update shaders:
   - baseVertex.ts
   - splat.ts
   - advection.ts
   - diffusion.ts
   - divergence.ts
   - pressure.ts
   - gradientSubtract.ts
   - display.ts
   - particle.ts if needed
4. Update CSS in src/index.css.

Simulation requirements:
- Use velocity ping-pong target.
- Use dye ping-pong target.
- Use pressure ping-pong target.
- Use divergence target.
- Implement splat, advection, divergence, pressure, gradient subtract, and display passes.
- Add diffusion/dispersion so output no longer looks like a light beam.
- Add subtle particle tracers.
- Particles must be low count and low opacity.

Tuning requirements:
- maxActiveSplats: 6.
- maxSplatsPerSecond: 6.
- splatRadius around 0.006-0.010.
- clickSplatRadius around 0.010-0.016.
- velocityScale around 0.25-0.38.
- densityDissipation around 0.997-0.9985.
- velocityDissipation around 0.990-0.994.
- particleCount around 96-144, never above 180 in this spec.
- displayOpacity around 0.62-0.72.
- simulationFps: 30.
- simResolution <= 96 default.
- dyeResolution <= 384 default.
- pressureIterations <= 6 default.
- DPR <= 1.1.

Safe-zone requirements:
- The emblem area is non-interactive for fluid injection.
- Pointer/tap inside center safe zone creates no dye splat, no velocity splat, and no particle spawn.
- Fluid may still passively flow behind the emblem.
- Gold emblem and Chinese text remain DOM layers above Canvas.

Visual requirements:
- Dark navy base.
- Cyan, dark electric blue, jade, soft gold.
- No full rainbow.
- No broad light beam.
- Fluid should read as dye dispersing in water.
- Particles should read as subtle tracer particles, not stars or snow.

Fallback:
- WebGL unavailable renders fallback.
- prefers-reduced-motion renders fallback.
- quality='off' renders fallback.
- Canvas error should not break the page.

Constraints:
- No new dependencies.
- One Canvas.
- Hero-only simulation.
- No bloom.
- No postprocessing.
- No full-page WebGL.
- No React state per frame.
- Dispose targets/materials on unmount.

Verification:
- npm run build
- npm run lint
- test pointer dye outside safe zone
- test no injection inside safe zone
- test particle tracer behavior
- test fluid persistence after interaction
- test reduced motion
- test fallback
- test mobile widths 360px, 390px, 430px, 768px
```

---

# 24. Done Definition

This spec is done when:

```txt
the hero reads as real fluid, not a light beam
dye disperses and advects through a velocity field
low-count particles move with the fluid
interactions are capped around 6
splat radius is small
decay is low so dye persists
the fluid remains transparent
the emblem safe zone works
the gold emblem remains sharp
performance remains constrained
fallbacks work
```
