# Spec 0019: Constrained Real-Dye WebGL Hero Fluid Simulation

## Status

proposed

## Owner

Jason Huang

## Last Updated

2026-05-25

## Target Area

Hero visual panel, real WebGL dye simulation, low-velocity fluid motion, long dye persistence, transparent hero fluid layer, and non-interactive emblem exclusion zone.

---

# 1. Purpose

This spec defines the implementation of a **real dye and real fluid-like WebGL simulation** for the portfolio hero panel.

The prior lightweight WebGL shader direction is not enough because it behaves like a cursor-follow glow. This spec requires actual simulated dye movement:

```txt
pointer/tap injects dye
pointer/tap injects controlled velocity
velocity carries dye through the field
pressure projection gives the motion a fluid-like quality
dye lingers slightly longer before fading
motion remains calm, premium, and not GPU-heavy
```

The final result should feel like a small interactive pool of dark liquid glass behind the gold signature emblem.

This spec is still a constrained hero-only component. It should not become a full-page simulation, shader toy, or GPU stress test.

---

# 2. Product Goal

The hero visual should become a memorable signature component:

```txt
gold Chinese-inspired emblem
slightly transparent dark-glass hero panel
cyan / electric-blue / jade / soft-gold dye
slow-moving low-velocity fluid
dye that lingers long enough to feel real
central emblem area protected from interaction
fluid moving behind and around the emblem
```

The interaction should communicate:

```txt
creative frontend engineering
tasteful motion design
technical depth
brand identity
performance awareness
```

The user should feel the hero is alive, but calm.

---

# 3. Important Product Decisions

## 3.1 Spec number

This is the authoritative `spec0019`.

Use this file name:

```txt
docs/specs/spec0019_constrained_real_dye_webgl_hero_fluid_simulation.md
```

## 3.2 Spec 0017 dependency

Spec 0017 has not been implemented.

This spec must not depend on Spec 0017.

## 3.3 Simulation requirement

This spec must implement real simulation state.

Allowed:

```txt
dye texture
velocity texture
pressure texture
divergence texture
ping-pong render targets
splat pass
advection pass
divergence pass
pressure solve pass
gradient subtract pass
display pass
```

Not enough:

```txt
a glow following the cursor
a procedural background only
a single shader with pointer lens only
CSS-only ripples
SVG-only distortion
```

## 3.4 Velocity tuning

The simulation should use **lower velocity** than typical fluid demos.

The motion should feel like:

```txt
ink moving through still water
slow current
gentle glass fluid
soft dye bloom
```

Not:

```txt
fast smoke
paint explosion
high-energy game effect
chaotic turbulence
```

## 3.5 Longer dye visibility

The fluid should render and linger slightly longer.

Dye should not disappear immediately after pointer movement.

Target behavior:

```txt
small splats remain visible for roughly 8-16 seconds
large click/tap splats remain visible for roughly 12-20 seconds
idle field slowly returns to calm
```

This is achieved through high density persistence, low velocity, and subtle display decay.

## 3.6 Transparent hero fluid layer

The WebGL layer should be slightly transparent.

The fluid should feel like it is behind glass and behind the emblem, not like an opaque animation covering the whole hero panel.

Target canvas/display opacity:

```txt
desktop: 0.68-0.82 visual opacity
mobile: 0.52-0.68 visual opacity
fallback: 0.55-0.72 visual opacity
```

## 3.7 Emblem exclusion zone

The center area where the gold emblem exists should be **non-interactive for the fluid simulation**.

This means:

```txt
pointer movement over the emblem area should not inject dye
click/tap over the emblem area should not create splats
fluid should still be visible behind/around the emblem at low opacity
the emblem should remain sharp, stable, and visually dominant
```

The simulation should behave as if the emblem is a protected island in the fluid.

---

# 4. Existing Hero Context

The current hero visual uses a static composition:

```tsx
<div className="heroSection__visual" aria-hidden="true">
  <span className="heroSection__orb heroSection__orb--one" />
  <span className="heroSection__orb heroSection__orb--two" />
  <SignatureEmblem />
  <ChineseAccentText />
</div>
```

This spec should replace only the inner hero visual composition:

```tsx
<div className="heroSection__visual" aria-hidden="true">
  <HeroFluidSimulationPanel />
</div>
```

Do not rewrite:

```txt
hero copy
hero CTA buttons
profile data
page shell
work section
project cards
routing
```

---

# 5. Existing Dependencies

The repo already has the required WebGL packages:

```txt
three
@react-three/fiber
@react-three/drei
maath
```

Do not add new npm dependencies.

---

# 6. Architecture Overview

Use this architecture:

```txt
HeroSection
  heroSection__visual
    HeroFluidSimulationPanel
      FluidCanvas
        Canvas
          FluidSimulationController
            render targets
            shader passes
            display plane
      DOM orbit rings
      DOM pearls
      DOM SignatureEmblem
      DOM ChineseAccentText
```

The WebGL canvas is decorative and sits behind DOM layers.

The emblem and Chinese text remain DOM-rendered.

---

# 7. File Plan

Create:

```txt
src/components/brand/HeroFluidSimulationPanel.tsx

src/components/webgl/fluid-lite/FluidCanvas.tsx
src/components/webgl/fluid-lite/FluidSimulationController.tsx
src/components/webgl/fluid-lite/FluidRenderTargets.ts
src/components/webgl/fluid-lite/useFluidPointerSplats.ts
src/components/webgl/fluid-lite/fluidLiteConfig.ts
src/components/webgl/fluid-lite/fluidMaterials.ts

src/components/webgl/fluid-lite/shaders/baseVertex.ts
src/components/webgl/fluid-lite/shaders/splat.ts
src/components/webgl/fluid-lite/shaders/advection.ts
src/components/webgl/fluid-lite/shaders/divergence.ts
src/components/webgl/fluid-lite/shaders/pressure.ts
src/components/webgl/fluid-lite/shaders/gradientSubtract.ts
src/components/webgl/fluid-lite/shaders/display.ts
```

Update:

```txt
src/components/sections/HeroSection.tsx
src/index.css
```

Do not add new packages.

---

# 8. Component 1 — `HeroFluidSimulationPanel`

## 8.1 Purpose

Composes the visual panel:

```txt
transparent WebGL fluid layer
subtle rings
decorative pearls
gold signature emblem
Chinese vertical accent text
```

## 8.2 File

```txt
src/components/brand/HeroFluidSimulationPanel.tsx
```

## 8.3 Suggested implementation

```tsx
import { ChineseAccentText } from "./ChineseAccentText";
import { SignatureEmblem } from "./SignatureEmblem";
import { FluidCanvas } from "../webgl/fluid-lite/FluidCanvas";

export function HeroFluidSimulationPanel() {
  return (
    <div className="heroFluidSimulationPanel">
      <FluidCanvas quality="medium" />

      <span className="heroFluidSimulationPanel__ring heroFluidSimulationPanel__ring--outer" />
      <span className="heroFluidSimulationPanel__ring heroFluidSimulationPanel__ring--inner" />

      <span className="heroFluidSimulationPanel__safeZone" aria-hidden="true" />

      <span className="heroFluidSimulationPanel__pearl heroFluidSimulationPanel__pearl--large" />
      <span className="heroFluidSimulationPanel__pearl heroFluidSimulationPanel__pearl--gold" />
      <span className="heroFluidSimulationPanel__pearl heroFluidSimulationPanel__pearl--water" />
      <span className="heroFluidSimulationPanel__pearl heroFluidSimulationPanel__pearl--jade" />

      <SignatureEmblem className="heroFluidSimulationPanel__signature" />
      <ChineseAccentText />
    </div>
  );
}
```

## 8.4 Rules

```txt
- Canvas stays behind the emblem.
- The emblem stays sharp.
- The central safe zone is visual and logical.
- Pearls are decorative in this spec.
- The parent can remain aria-hidden because this visual is decorative.
```

---

# 9. Component 2 — `FluidCanvas`

## 9.1 Purpose

Owns:

```txt
WebGL support check
reduced-motion fallback
React Three Fiber Canvas
quality selection
off/static fallback
```

## 9.2 File

```txt
src/components/webgl/fluid-lite/FluidCanvas.tsx
```

## 9.3 API

```ts
export type FluidCanvasProps = {
  quality?: "off" | "low" | "medium";
  className?: string;
};
```

No `high` preset.

## 9.4 Requirements

```txt
- one Canvas only
- hero-only
- decorative and aria-hidden
- reduced motion renders fallback
- WebGL unavailable renders fallback
- quality="off" renders fallback
- powerPreference should remain "low-power"
```

## 9.5 Canvas settings

```tsx
<Canvas
  dpr={[1, config.maxDpr]}
  camera={{ position: [0, 0, 1], fov: 50 }}
  gl={{
    alpha: true,
    antialias: false,
    depth: false,
    stencil: false,
    powerPreference: "low-power",
  }}
>
  <FluidSimulationController config={config} />
</Canvas>
```

---

# 10. Config — `fluidLiteConfig`

## 10.1 Purpose

Tightly control simulation cost and behavior.

## 10.2 File

```txt
src/components/webgl/fluid-lite/fluidLiteConfig.ts
```

## 10.3 Config

```ts
export type FluidLiteQuality = "off" | "low" | "medium";

export type FluidLiteConfig = {
  simResolution: number;
  dyeResolution: number;
  pressureIterations: number;
  splatRadius: number;
  clickSplatRadius: number;
  splatForce: number;
  clickSplatForce: number;
  velocityScale: number;
  densityDissipation: number;
  velocityDissipation: number;
  pressureDissipation: number;
  displayOpacity: number;
  maxDpr: number;
  maxSplatsPerSecond: number;
  simulationFps: number;
  autoSplatIntervalMs: number;
  emblemSafeZoneRadius: number;
};

export const fluidLitePresets: Record<FluidLiteQuality, FluidLiteConfig> = {
  off: {
    simResolution: 1,
    dyeResolution: 1,
    pressureIterations: 0,
    splatRadius: 0,
    clickSplatRadius: 0,
    splatForce: 0,
    clickSplatForce: 0,
    velocityScale: 0,
    densityDissipation: 1,
    velocityDissipation: 1,
    pressureDissipation: 1,
    displayOpacity: 0,
    maxDpr: 1,
    maxSplatsPerSecond: 0,
    simulationFps: 0,
    autoSplatIntervalMs: 0,
    emblemSafeZoneRadius: 0.24,
  },

  low: {
    simResolution: 64,
    dyeResolution: 256,
    pressureIterations: 4,
    splatRadius: 0.014,
    clickSplatRadius: 0.024,
    splatForce: 850,
    clickSplatForce: 1300,
    velocityScale: 0.42,
    densityDissipation: 0.994,
    velocityDissipation: 0.982,
    pressureDissipation: 0.94,
    displayOpacity: 0.62,
    maxDpr: 1,
    maxSplatsPerSecond: 16,
    simulationFps: 30,
    autoSplatIntervalMs: 5200,
    emblemSafeZoneRadius: 0.25,
  },

  medium: {
    simResolution: 96,
    dyeResolution: 384,
    pressureIterations: 6,
    splatRadius: 0.012,
    clickSplatRadius: 0.022,
    splatForce: 1100,
    clickSplatForce: 1650,
    velocityScale: 0.48,
    densityDissipation: 0.995,
    velocityDissipation: 0.985,
    pressureDissipation: 0.945,
    displayOpacity: 0.74,
    maxDpr: 1.1,
    maxSplatsPerSecond: 20,
    simulationFps: 30,
    autoSplatIntervalMs: 4800,
    emblemSafeZoneRadius: 0.25,
  },
};
```

## 10.4 Important tuning notes

### Lower velocity

The lower velocity feel comes from:

```txt
splatForce lower than normal fluid demos
clickSplatForce still controlled
velocityScale below 0.5
velocityDissipation high enough to avoid explosive motion
```

### Longer dye persistence

The longer fluid render comes from:

```txt
densityDissipation around 0.994-0.995
display shader opacity around 0.62-0.74
slow simulationFps at 30fps
auto splats only every 4.8-5.2 seconds
```

### Transparent hero

The transparent look comes from:

```txt
displayOpacity below 0.8
Canvas alpha enabled
CSS opacity and display shader alpha controlled
dark panel background still visible
DOM emblem above Canvas
```

---

# 11. Emblem Safe Zone

## 11.1 Purpose

The emblem area should not trigger fluid interactions.

This avoids the awkward feeling where dragging over the gold symbol causes dye to explode through the mark.

## 11.2 Behavior

The safe zone is centered at:

```txt
x: 0.5
y: 0.5
radius: config.emblemSafeZoneRadius
```

If pointer coordinates are inside this safe zone:

```txt
do not create pointermove splat
do not create pointerdown splat
do not create touch splat
```

The fluid simulation itself may still flow behind the emblem.

## 11.3 Helper

Create:

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

Use it inside:

```txt
useFluidPointerSplats
```

## 11.4 Optional visual safe zone

Add a subtle CSS safe-zone overlay:

```css
.heroFluidSimulationPanel__safeZone {
  position: absolute;
  z-index: 2;
  width: min(46%, 340px);
  aspect-ratio: 1;
  border-radius: var(--radius-full);
  background:
    radial-gradient(circle, rgba(3, 10, 17, 0.14), transparent 64%);
  pointer-events: none;
}
```

This should be very subtle and should not look like a visible disk.

---

# 12. Render Targets

## 12.1 File

```txt
src/components/webgl/fluid-lite/FluidRenderTargets.ts
```

## 12.2 Targets

Ping-pong:

```txt
velocity
dye
pressure
```

Single:

```txt
divergence
```

## 12.3 Render target options

```ts
const options = {
  minFilter: THREE.LinearFilter,
  magFilter: THREE.LinearFilter,
  wrapS: THREE.ClampToEdgeWrapping,
  wrapT: THREE.ClampToEdgeWrapping,
  depthBuffer: false,
  stencilBuffer: false,
};
```

Use:

```txt
HalfFloatType when safe
UnsignedByteType fallback if needed
```

## 12.4 Ping-pong helper

```ts
export type PingPongTarget = {
  read: THREE.WebGLRenderTarget;
  write: THREE.WebGLRenderTarget;
  swap: () => void;
  dispose: () => void;
};
```

Dispose all targets on unmount.

---

# 13. Shader Passes

## 13.1 Required pass order

Each simulation step:

```txt
1. Apply queued velocity splats.
2. Apply queued dye splats.
3. Advect velocity through velocity.
4. Advect dye through velocity.
5. Compute divergence.
6. Clear or damp pressure.
7. Pressure solve for limited iterations.
8. Subtract pressure gradient from velocity.
9. Display dye texture with transparent dark-water styling.
```

## 13.2 Required shaders

```txt
baseVertex
splat
advection
divergence
pressure
gradientSubtract
display
```

## 13.3 Not allowed in this spec

```txt
curl shader
vorticity shader
bloom shader
sunrays shader
particle pass
3D geometry pass
```

---

# 14. Pointer Splats

## 14.1 File

```txt
src/components/webgl/fluid-lite/useFluidPointerSplats.ts
```

## 14.2 API

```ts
export type FluidSplat = {
  x: number;
  y: number;
  dx: number;
  dy: number;
  color: [number, number, number];
  radius: number;
  force: number;
};

export function useFluidPointerSplats(
  targetRef: React.RefObject<HTMLElement>,
  options: {
    enabled: boolean;
    config: FluidLiteConfig;
    pushSplat: (splat: FluidSplat) => void;
  },
): void;
```

## 14.3 Behavior

```txt
- Normalize coordinates to 0-1.
- Ignore pointer events inside emblem safe zone.
- Pointermove creates low-force splats only after movement threshold.
- Pointerdown creates a stronger splat only outside safe zone.
- Throttle to maxSplatsPerSecond.
- Touchmove does not continuously splat in v1.
- Touchdown creates one splat if outside safe zone.
```

## 14.4 Velocity tuning

When creating splats:

```ts
const dx = rawDx * config.velocityScale;
const dy = rawDy * config.velocityScale;
```

Clamp:

```txt
dx/dy magnitude should be clamped to avoid sudden fast flow
```

Recommended clamp:

```ts
const maxVelocity = 0.8;
```

## 14.5 Colors

```ts
export const fluidSplatColors = {
  water: [0.49, 0.91, 0.95],
  electricBlue: [0.08, 0.42, 0.98],
  jade: [0.4, 0.84, 0.68],
  gold: [0.97, 0.79, 0.28],
} as const;
```

Rules:

```txt
pointer move: water/electricBlue
pointerdown: soft gold plus water
ambient auto splat: faint jade/water
```

---

# 15. Fluid Simulation Controller

## 15.1 File

```txt
src/components/webgl/fluid-lite/FluidSimulationController.tsx
```

## 15.2 Responsibilities

```txt
create render targets
create shader materials
queue pointer splats
add occasional ambient splats
run simulation at fixed low fps
render display plane
dispose resources
```

## 15.3 Frame stepping

Use 30fps stepping:

```ts
const lastStepRef = useRef(0);

useFrame((state) => {
  const now = state.clock.elapsedTime;
  const minStep = 1 / config.simulationFps;

  if (now - lastStepRef.current < minStep) return;

  const dt = Math.min(now - lastStepRef.current, 0.033);
  lastStepRef.current = now;

  stepSimulation(dt, now);
});
```

## 15.4 Longer render behavior

Do not stop rendering immediately after interaction.

If adding offscreen/idle optimization, keep the simulation alive for:

```txt
at least 12 seconds after the last splat
```

Recommended constant:

```ts
const IDLE_SIMULATION_TAIL_SECONDS = 12;
```

If the hero is visible, the calm fluid can continue with low-frequency ambient splats.

## 15.5 Ambient splats

Add a small ambient splat every:

```txt
config.autoSplatIntervalMs
```

Only if:

```txt
hero is visible
not reduced motion
document is visible
```

Ambient splats should be:

```txt
low force
small radius
faint color
outside emblem safe zone
```

---

# 16. Display Shader

## 16.1 Purpose

Display the dye texture as a transparent dark-water layer.

## 16.2 Required uniforms

```txt
uDye
uTime
uOpacity
uBaseColor
uGoldBias
uVignetteStrength
```

## 16.3 Visual behavior

The shader should:

```txt
show dye without becoming opaque
preserve dark navy base
add soft vignette
slightly warm the center with gold bias
avoid harsh color bands
avoid full rainbow
```

## 16.4 Alpha behavior

Use `config.displayOpacity`.

Example:

```glsl
float dyeStrength = clamp(length(dye.rgb), 0.0, 1.0);
float alpha = mix(0.36, uOpacity, smoothstep(0.02, 0.5, dyeStrength));
gl_FragColor = vec4(color, alpha);
```

The layer should be transparent enough that the panel and emblem composition still breathe.

---

# 17. CSS Requirements

Add to:

```txt
src/index.css
```

## 17.1 Panel

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

.fluidCanvas,
.fluidCanvasFallback {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  opacity: 0.78;
}

.fluidCanvas canvas {
  display: block;
  width: 100% !important;
  height: 100% !important;
}
```

## 17.2 Transparent fallback

```css
.fluidCanvasFallback {
  background:
    radial-gradient(circle at 32% 24%, rgba(126, 231, 242, 0.15), transparent 30%),
    radial-gradient(circle at 70% 68%, rgba(247, 201, 72, 0.09), transparent 34%),
    linear-gradient(135deg, rgba(37, 99, 235, 0.09), rgba(3, 10, 17, 0));
  opacity: 0.68;
}
```

## 17.3 Emblem safe zone

```css
.heroFluidSimulationPanel__safeZone {
  position: absolute;
  z-index: 2;
  width: min(46%, 340px);
  aspect-ratio: 1;
  border-radius: var(--radius-full);
  background:
    radial-gradient(circle, rgba(3, 10, 17, 0.14), transparent 68%);
  pointer-events: none;
}
```

## 17.4 Rings

```css
.heroFluidSimulationPanel__ring {
  position: absolute;
  z-index: 1;
  border-radius: var(--radius-full);
  pointer-events: none;
}

.heroFluidSimulationPanel__ring--outer {
  inset: 7%;
  border: 1px solid rgba(126, 231, 242, 0.18);
}

.heroFluidSimulationPanel__ring--inner {
  inset: 22%;
  border: 1px solid rgba(247, 201, 72, 0.14);
}
```

## 17.5 Signature

```css
.heroFluidSimulationPanel__signature {
  position: relative;
  z-index: 3;
  filter:
    drop-shadow(0 18px 42px rgba(0, 0, 0, 0.36))
    drop-shadow(0 0 20px rgba(247, 201, 72, 0.14));
}

.heroFluidSimulationPanel .chineseAccent {
  z-index: 4;
}
```

## 17.6 Mobile

```css
@media (max-width: 768px) {
  .fluidCanvas,
  .fluidCanvasFallback {
    opacity: 0.62;
  }

  .heroFluidSimulationPanel__safeZone {
    width: min(54%, 260px);
  }
}
```

---

# 18. Performance Budget

## 18.1 Hard limits

```txt
one Canvas
one hero-only simulation
simResolution <= 96 default
dyeResolution <= 384 default
pressureIterations <= 6 default
DPR <= 1.1
max pointer splats <= 20/sec default
simulation step target = 30fps
no postprocessing
no bloom
no particles
no full-page canvas
```

## 18.2 Memory target

```txt
Target GPU texture memory: under 10-20 MB.
```

## 18.3 Runtime rules

```txt
no React state per frame
no React state on pointermove
materials created once
targets disposed on unmount
ambient splats low frequency
offscreen pause preferred
document hidden pause required if easy
```

---

# 19. Fallback Strategy

Fallback is required for:

```txt
WebGL unavailable
prefers-reduced-motion
quality="off"
Canvas error
mobile performance issue
```

Fallback must still look intentional:

```txt
transparent dark gradient
cyan/gold glow
rings
pearls
signature
Chinese text
```

Reduced-motion users should get static fallback, not active simulation.

---

# 20. Accessibility Requirements

The hero fluid is decorative.

```txt
- Canvas is aria-hidden.
- No content inside Canvas.
- Hero visual parent may remain aria-hidden.
- CTAs remain outside the Canvas.
- Reduced motion disables active simulation.
- Keyboard navigation is unchanged.
```

The emblem exclusion zone is not an accessibility control. It is a visual/interaction constraint only.

---

# 21. Implementation Slices

## Slice A — Panel and fallback

Files:

```txt
HeroFluidSimulationPanel.tsx
FluidCanvas.tsx
HeroSection.tsx
index.css
```

Acceptance:

```txt
- Hero uses new panel.
- Static fallback works.
- Layout is unchanged.
```

## Slice B — Render target setup

Files:

```txt
FluidRenderTargets.ts
FluidSimulationController.tsx
display shader
fluidLiteConfig.ts
```

Acceptance:

```txt
- WebGL targets initialize and dispose.
- Display plane renders transparent dark output.
```

## Slice C — Dye splats

Files:

```txt
splat shader
useFluidPointerSplats.ts
FluidSimulationController.tsx
```

Acceptance:

```txt
- Pointer/tap creates visible dye outside safe zone.
- Pointer/tap inside safe zone creates no dye.
- Dye persists longer than the old cursor glow.
```

## Slice D — Velocity advection

Files:

```txt
advection shader
FluidSimulationController.tsx
```

Acceptance:

```txt
- Dye moves with velocity.
- Velocity is tuned low and calm.
```

## Slice E — Pressure projection

Files:

```txt
divergence shader
pressure shader
gradientSubtract shader
FluidSimulationController.tsx
```

Acceptance:

```txt
- Motion feels more fluid and less like smear trails.
- Iterations remain capped.
```

## Slice F — Persistence and transparency tuning

Files:

```txt
fluidLiteConfig.ts
display shader
index.css
```

Acceptance:

```txt
- Dye lingers 8-20 seconds depending on splat strength.
- Hero layer remains slightly transparent.
- Gold emblem remains dominant.
```

---

# 22. Acceptance Criteria

- [ ] File is named `spec0019_constrained_real_dye_webgl_hero_fluid_simulation.md`.
- [ ] Spec does not depend on Spec 0017.
- [ ] Hero uses `HeroFluidSimulationPanel`.
- [ ] Fluid uses real dye and velocity textures.
- [ ] Pointer/tap injects dye and velocity.
- [ ] Dye advects through velocity.
- [ ] Pressure projection is implemented with capped iterations.
- [ ] Velocity is tuned low and calm.
- [ ] Dye persists longer than a cursor glow.
- [ ] Fluid layer is slightly transparent.
- [ ] Emblem area is excluded from pointer/tap splats.
- [ ] Gold emblem remains DOM-rendered, sharp, and dominant.
- [ ] Chinese text remains DOM-rendered.
- [ ] Reduced motion fallback works.
- [ ] WebGL failure fallback works.
- [ ] No new dependencies are added.
- [ ] No bloom, particles, or postprocessing are added.
- [ ] Build passes.
- [ ] Lint passes or existing lint issues are documented.

---

# 23. Non-Goals

Do not implement:

```txt
Spec 0017
full-page WebGL
high-resolution GPU simulation
postprocessing bloom
particle system
interactive project cards
fluid scroll rail
physics-perfect water
meaningful content inside Canvas
new npm packages
```

---

# 24. Codex Implementation Prompt

```txt
Implement Spec 0019: Constrained Real-Dye WebGL Hero Fluid Simulation.

Important context:
Spec 0017 has not been implemented. Do not depend on Spec 0017.

Goal:
Upgrade the hero visual from a cursor-follow glow into a real constrained WebGL fluid simulation. The simulation should use real dye and velocity textures, low-velocity motion, longer dye persistence, a slightly transparent display layer, and an emblem safe zone where pointer/tap events do not inject fluid.

Current hero:
HeroSection renders heroSection__visual with orb spans, SignatureEmblem, and ChineseAccentText.

Required files:
1. src/components/brand/HeroFluidSimulationPanel.tsx
2. src/components/webgl/fluid-lite/FluidCanvas.tsx
3. src/components/webgl/fluid-lite/FluidSimulationController.tsx
4. src/components/webgl/fluid-lite/FluidRenderTargets.ts
5. src/components/webgl/fluid-lite/useFluidPointerSplats.ts
6. src/components/webgl/fluid-lite/fluidLiteConfig.ts
7. src/components/webgl/fluid-lite/fluidMaterials.ts
8. src/components/webgl/fluid-lite/shaders/baseVertex.ts
9. src/components/webgl/fluid-lite/shaders/splat.ts
10. src/components/webgl/fluid-lite/shaders/advection.ts
11. src/components/webgl/fluid-lite/shaders/divergence.ts
12. src/components/webgl/fluid-lite/shaders/pressure.ts
13. src/components/webgl/fluid-lite/shaders/gradientSubtract.ts
14. src/components/webgl/fluid-lite/shaders/display.ts

Update:
- src/components/sections/HeroSection.tsx
- src/index.css

Simulation requirements:
- Use dye ping-pong render target.
- Use velocity ping-pong render target.
- Use pressure ping-pong render target.
- Use divergence render target.
- Pointer/tap injects dye and velocity.
- Dye advects through velocity.
- Pressure projection runs with capped iterations.
- Display shader uses transparent dark-water styling.

Interaction requirements:
- Pointer movement outside emblem safe zone injects low-force dye/velocity.
- Pointer/tap inside emblem safe zone does not inject fluid.
- Touchmove does not continuously splat in v1.
- Touchdown outside safe zone creates one splat.
- Max pointer splats <= 20/sec by default.

Tuning requirements:
- Low velocity: velocityScale around 0.42-0.48.
- Longer dye: densityDissipation around 0.994-0.995.
- Transparent fluid layer: displayOpacity around 0.62-0.74.
- Simulation fps target: 30fps.
- Keep simResolution <= 96 by default.
- Keep dyeResolution <= 384 by default.
- Keep pressureIterations <= 6 by default.
- Keep DPR <= 1.1.

Visual requirements:
- Dark navy base.
- Cyan, dark electric blue, jade, and soft gold dye.
- No full rainbow.
- Gold signature and ChineseAccentText remain DOM layers above Canvas.
- Gold signature remains sharp and dominant.

Fallback requirements:
- WebGL unavailable renders fallback.
- prefers-reduced-motion renders fallback.
- quality='off' renders fallback.
- Canvas error should not break the page if an error boundary is implemented.

Performance constraints:
- No new dependencies.
- One Canvas only.
- Hero-only simulation.
- No postprocessing.
- No bloom.
- No particles.
- No full-page WebGL.
- No React state per frame.
- Dispose targets/materials on unmount.

Verification:
- npm run build
- npm run lint
- test pointer dye outside safe zone
- test no dye injection inside safe zone
- test click/tap dye persistence
- test reduced motion fallback
- test quality='off' fallback
- test mobile widths 360px, 390px, 430px, 768px
- verify no WebGL console errors
```

---

# 25. Done Definition

This spec is done when:

```txt
the hero has real dye-based WebGL fluid behavior
the simulation feels calm and low velocity
dye lingers long enough to feel like fluid
the fluid layer remains slightly transparent
the emblem area does not inject splats
the gold emblem remains sharp and dominant
fallbacks work
performance remains constrained
the implementation is maintainable
```
