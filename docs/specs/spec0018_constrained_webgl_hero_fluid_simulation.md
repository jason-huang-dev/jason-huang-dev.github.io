# Spec 0018: Constrained WebGL Hero Fluid Simulation

## Status

proposed

## Owner

Jason Huang

## Last Updated

2026-05-25

## Target Area

Hero visual panel, WebGL fluid simulation, pointer/tap splats, constrained GPU budget, fallback-safe implementation.

---

# 1. Purpose

This spec upgrades the hero WebGL effect from a cursor-follow glow/procedural shader into an actual lightweight fluid simulation.

The current visual direction is not enough because it behaves like:

```txt
a glow following the cursor
```

The desired behavior is:

```txt
a small contained fluid field
with dye injected by pointer/tap
with velocity carrying dye through the field
with pressure projection giving the motion a fluid-like feel
with decay so the panel returns to calm water
```

This spec intentionally allows real simulation passes, but keeps them tightly constrained so the hero remains a **small signature component**, not a GPU stress test.

---

# 2. Key Decision

Spec 0018 was intentionally lightweight and avoided render targets. This spec supersedes that limitation.

This spec allows:

```txt
ping-pong render targets
velocity texture
dye texture
divergence texture
pressure texture
advection pass
divergence pass
pressure solve pass
gradient subtract pass
splat pass
display pass
```

This spec still forbids:

```txt
full-page WebGL
high-resolution simulation
postprocessing bloom stacks
particle systems
physics-accurate water
multiple canvases
unbounded splats
high DPR
default high-quality mode
```

The goal is **real simulation, constrained budget**.

---

# 3. Product Goal

The hero panel should feel like:

```txt
dark liquid glass
cyan / electric-blue dye moving through water
gold impulse ripples near the signature
small interactive fluid motion when the user moves or taps
calm motion that decays naturally
```

The simulation should be noticeable enough to feel real, but subtle enough that the gold signature remains the main visual anchor.

---

# 4. Existing Repo Constraints

The repo already includes the needed libraries:

```txt
three
@react-three/fiber
@react-three/drei
maath
```

No new dependencies should be added.

---

# 5. Final Architecture

Create a contained hero fluid system:

```txt
HeroFluidSimulationPanel
  SignatureFluidCanvas
    FluidSimulationController
      render targets
      shader passes
      display plane
  DOM rings
  DOM pearls
  DOM SignatureEmblem
  DOM ChineseAccentText
```

The simulation is visual-only and decorative.

Do not place text, links, or meaningful content inside the canvas.

---

# 6. File Plan

Create or update:

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

src/components/sections/HeroSection.tsx
src/index.css
```

Use `fluid-lite` intentionally to communicate that this is a constrained implementation, not a general fluid engine.

---

# 7. Component 1 — `HeroFluidSimulationPanel`

## 7.1 Purpose

Composes the hero visual with WebGL simulation behind DOM layers.

## 7.2 File

```txt
src/components/brand/HeroFluidSimulationPanel.tsx
```

## 7.3 Suggested implementation

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

## 7.4 Integration

Update `HeroSection.tsx`:

```tsx
<div className="heroSection__visual" aria-hidden="true">
  <HeroFluidSimulationPanel />
</div>
```

Keep the hero copy, buttons, layout, and section structure unchanged.

---

# 8. Component 2 — `FluidCanvas`

## 8.1 Purpose

Owns the React Three Fiber canvas, support detection, quality selection, and fallback.

## 8.2 File

```txt
src/components/webgl/fluid-lite/FluidCanvas.tsx
```

## 8.3 API

```ts
export type FluidCanvasProps = {
  quality?: "off" | "low" | "medium";
  className?: string;
};
```

No `high` preset.

## 8.4 Requirements

```txt
- Detect WebGL support.
- Respect prefers-reduced-motion.
- Render fallback when disabled.
- Use one Canvas.
- Cap DPR.
- Use low-power preference.
- Keep Canvas decorative.
```

## 8.5 Suggested shell

```tsx
import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useMemo, useState } from "react";
import { FluidSimulationController } from "./FluidSimulationController";
import { fluidLitePresets } from "./fluidLiteConfig";

function supportsWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);

    update();
    media.addEventListener?.("change", update);

    return () => media.removeEventListener?.("change", update);
  }, []);

  return reduced;
}

export function FluidCanvas({ quality = "medium", className = "" }: FluidCanvasProps) {
  const [supported, setSupported] = useState(false);
  const reducedMotion = useReducedMotion();
  const config = useMemo(() => fluidLitePresets[quality], [quality]);

  useEffect(() => {
    setSupported(supportsWebGL());
  }, []);

  if (!supported || reducedMotion || quality === "off") {
    return <div className={`fluidCanvasFallback ${className}`} aria-hidden="true" />;
  }

  return (
    <div className={`fluidCanvas ${className}`} aria-hidden="true">
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
        <Suspense fallback={null}>
          <FluidSimulationController config={config} />
        </Suspense>
      </Canvas>
    </div>
  );
}
```

---

# 9. Config — `fluidLiteConfig`

## 9.1 Purpose

Constrain simulation quality and make performance tuning explicit.

## 9.2 File

```txt
src/components/webgl/fluid-lite/fluidLiteConfig.ts
```

## 9.3 Config

```ts
export type FluidLiteQuality = "off" | "low" | "medium";

export type FluidLiteConfig = {
  simResolution: number;
  dyeResolution: number;
  pressureIterations: number;
  splatRadius: number;
  splatForce: number;
  densityDissipation: number;
  velocityDissipation: number;
  maxDpr: number;
  autoSplatIntervalMs: number;
};

export const fluidLitePresets: Record<FluidLiteQuality, FluidLiteConfig> = {
  off: {
    simResolution: 1,
    dyeResolution: 1,
    pressureIterations: 0,
    splatRadius: 0,
    splatForce: 0,
    densityDissipation: 1,
    velocityDissipation: 1,
    maxDpr: 1,
    autoSplatIntervalMs: 0,
  },
  low: {
    simResolution: 64,
    dyeResolution: 256,
    pressureIterations: 4,
    splatRadius: 0.018,
    splatForce: 1800,
    densityDissipation: 0.985,
    velocityDissipation: 0.965,
    maxDpr: 1,
    autoSplatIntervalMs: 4200,
  },
  medium: {
    simResolution: 96,
    dyeResolution: 384,
    pressureIterations: 6,
    splatRadius: 0.015,
    splatForce: 2400,
    densityDissipation: 0.988,
    velocityDissipation: 0.972,
    maxDpr: 1.1,
    autoSplatIntervalMs: 3600,
  },
};
```

## 9.4 Hard constraints

```txt
No default simResolution above 96.
No default dyeResolution above 384.
No default pressureIterations above 6.
No DPR above 1.1.
No high mode in this spec.
```

These are the main controls that prevent the hero from becoming a GPU stress test.

---

# 10. Render Targets

## 10.1 File

```txt
src/components/webgl/fluid-lite/FluidRenderTargets.ts
```

## 10.2 Targets

Create ping-pong targets for:

```txt
velocity
dye
pressure
```

Create single target for:

```txt
divergence
```

## 10.3 Type choice

Use `THREE.HalfFloatType` when supported.

Fallback:

```txt
THREE.UnsignedByteType
```

## 10.4 Render target options

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

If linear filtering on float/half-float textures is not available, fallback to byte targets or lower quality.

## 10.5 Ping-pong helper

```ts
export type PingPongTarget = {
  read: THREE.WebGLRenderTarget;
  write: THREE.WebGLRenderTarget;
  swap: () => void;
  dispose: () => void;
};
```

---

# 11. Shader Passes

## 11.1 Pass order per frame

```txt
1. Apply pointer/click/ambient splats to velocity.
2. Apply matching dye splats to dye.
3. Advect velocity through velocity.
4. Advect dye through velocity.
5. Compute divergence from velocity.
6. Clear pressure.
7. Solve pressure for N iterations.
8. Subtract pressure gradient from velocity.
9. Display dye texture on full-screen plane.
```

## 11.2 No curl/vorticity in v1

Do not add:

```txt
curl pass
vorticity pass
bloom pass
sunray pass
multi-color post FX
```

Add those only in later specs if needed.

---

# 12. Materials — `fluidMaterials`

## 12.1 Purpose

Centralize `THREE.ShaderMaterial` creation.

## 12.2 File

```txt
src/components/webgl/fluid-lite/fluidMaterials.ts
```

Create materials for:

```txt
splatMaterial
advectionMaterial
divergenceMaterial
pressureMaterial
gradientSubtractMaterial
displayMaterial
clearMaterial if needed
```

## 12.3 Rule

Do not recreate materials every frame.

Use `useMemo` and dispose on unmount.

---

# 13. Pointer Splats

## 13.1 File

```txt
src/components/webgl/fluid-lite/useFluidPointerSplats.ts
```

## 13.2 API

```ts
export type FluidSplat = {
  x: number;
  y: number;
  dx: number;
  dy: number;
  color: [number, number, number];
  radius?: number;
  force?: number;
};

export function useFluidPointerSplats(
  targetRef: React.RefObject<HTMLElement>,
  options: {
    enabled: boolean;
    pushSplat: (splat: FluidSplat) => void;
  },
): void;
```

## 13.3 Behavior

```txt
- Pointer move creates a velocity/dye splat only if movement threshold is met.
- Pointer down creates stronger splat.
- Throttle pointer splats to max 24 per second.
- Touch move does not continuously splat in v1.
- Touch down creates one splat.
- Use normalized 0-1 coordinates.
```

## 13.4 Brand colors

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
pointer down: gold/water
ambient auto splat: faint jade/water
```

---

# 14. FluidSimulationController

## 14.1 Purpose

Runs the simulation and final display.

## 14.2 File

```txt
src/components/webgl/fluid-lite/FluidSimulationController.tsx
```

## 14.3 Implementation details

Use:

```txt
useThree for gl, size
useFrame for per-frame passes
useMemo for targets/materials
useRef for queued splats
```

Do not use React state per frame.

## 14.4 Frame skipping

To further reduce GPU load:

```txt
Run full simulation at 30fps.
Display can still render at browser frame rate if needed.
```

Implementation idea:

```ts
const lastStepRef = useRef(0);

useFrame((state) => {
  const now = state.clock.elapsedTime;
  if (now - lastStepRef.current < 1 / 30) return;
  lastStepRef.current = now;

  stepSimulation(now);
});
```

This is acceptable because the hero fluid should be calm, not frantic.

## 14.5 Ambient splats

When idle, add a small ambient splat every few seconds:

```txt
low opacity
low force
brand-safe color
random-ish fixed positions
```

This prevents the field from becoming completely static without requiring constant user input.

---

# 15. Shader Concepts

## 15.1 Base vertex shader

```ts
export const baseVertexShader = `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;
```

## 15.2 Splat shader

```txt
Adds velocity or dye into target texture at a point.
```

Required uniforms:

```txt
uTarget
uPoint
uColor
uRadius
uAspectRatio
```

## 15.3 Advection shader

```txt
Moves velocity/dye through velocity field.
```

Required uniforms:

```txt
uVelocity
uSource
uTexelSize
uDt
uDissipation
```

## 15.4 Divergence shader

```txt
Computes divergence of velocity.
```

Required uniforms:

```txt
uVelocity
uTexelSize
```

## 15.5 Pressure shader

```txt
Jacobi pressure solve.
```

Required uniforms:

```txt
uPressure
uDivergence
uTexelSize
```

## 15.6 Gradient subtract shader

```txt
Subtracts pressure gradient from velocity.
```

Required uniforms:

```txt
uPressure
uVelocity
uTexelSize
```

## 15.7 Display shader

```txt
Displays dye texture in a premium dark water style.
```

Display should add:

```txt
dark navy base
soft vignette
slight gold bias near center
subtle contrast curve
no harsh rainbow
```

---

# 16. Visual Requirements

## 16.1 Fluid look

The simulation should look like:

```txt
ink moving through dark water
soft glassy flow
premium liquid UI background
```

Not:

```txt
paint bucket
neon smoke
rainbow lava
high-energy game effect
```

## 16.2 Palette

Use:

```txt
deep navy
cyan
dark electric blue
jade
soft gold
```

Avoid:

```txt
dominant red
dominant orange
full rainbow
bright magenta
```

## 16.3 Signature layering

The gold signature should remain:

```txt
above the Canvas
sharp
stable
dominant
not distorted
```

The fluid should move behind it.

---

# 17. Fallback Strategy

Fallback when:

```txt
WebGL unavailable
prefers-reduced-motion enabled
quality="off"
Canvas errors
mobile performance is poor
```

Fallback visual:

```txt
static dark gradient
cyan/gold radial glow
rings
pearls
gold signature
ChineseAccentText
```

The fallback should still look intentional.

---

# 18. Accessibility Requirements

```txt
- Canvas is decorative and aria-hidden.
- Hero visual can remain aria-hidden in v1.
- No meaningful content inside Canvas.
- Reduced motion disables active simulation.
- Keyboard navigation unchanged.
- CTAs remain outside the Canvas.
```

---

# 19. Performance Budget

## 19.1 Hard limits

```txt
one Canvas
one hero-only simulation
simResolution <= 96 default
dyeResolution <= 384 default
pressureIterations <= 6 default
DPR <= 1.1
max pointer splats <= 24/sec
simulation step target = 30fps
no postprocessing
no particles
no bloom
no full-screen page background
```

## 19.2 Memory target

Approximate target:

```txt
under 10-20 MB GPU texture memory for the hero effect
```

## 19.3 Pause behavior

Preferred:

```txt
pause simulation when hero is offscreen
pause simulation when document hidden
```

Minimum:

```txt
keep resolution and step rate low enough that always-on is acceptable
```

---

# 20. Implementation Slices

## Slice A — Simulation shell and fallback

```txt
FluidCanvas
HeroFluidSimulationPanel
HeroSection integration
CSS fallback
```

Acceptance:

```txt
Canvas appears inside hero.
Fallback appears when quality="off".
Hero layout unchanged.
```

## Slice B — Render targets and display

```txt
FluidRenderTargets
display shader
FluidSimulationController
```

Acceptance:

```txt
Dye texture displays on hero plane.
Targets dispose on unmount.
```

## Slice C — Splat and dye decay

```txt
splat shader
pointer splat hook
dye ping-pong
basic dissipation
```

Acceptance:

```txt
Pointer/click injects visible dye.
Dye fades naturally.
```

## Slice D — Velocity and advection

```txt
velocity target
advection shader
velocity/dye advection
```

Acceptance:

```txt
Dye moves with velocity instead of staying like paint.
```

## Slice E — Pressure projection

```txt
divergence shader
pressure shader
gradient subtract shader
pressure iterations
```

Acceptance:

```txt
Motion feels more fluid and less smeared.
```

## Slice F — Performance and fallback hardening

```txt
30fps stepping
offscreen pause
document hidden pause
mobile low mode
reduced motion fallback
```

Acceptance:

```txt
No obvious performance issues.
Fallbacks work.
```

---

# 21. Acceptance Criteria

- [ ] This spec does not depend on Spec 0017.
- [ ] Hero uses `HeroFluidSimulationPanel`.
- [ ] WebGL effect is a contained hero component.
- [ ] Simulation uses dye and velocity render targets.
- [ ] Pointer/click creates actual dye/velocity splats.
- [ ] Dye advects through the velocity field.
- [ ] Pressure projection is implemented with limited iterations.
- [ ] Default quality remains constrained.
- [ ] Gold signature remains DOM-rendered and sharp.
- [ ] Reduced-motion fallback works.
- [ ] WebGL failure fallback works.
- [ ] Mobile low mode or fallback works.
- [ ] No new dependencies are added.
- [ ] No postprocessing/bloom/particles are added.
- [ ] Build passes.
- [ ] Lint passes or pre-existing lint issues are documented.

---

# 22. Non-Goals

Do not implement:

```txt
full-screen fluid simulation
high-quality desktop-only shader toy
postprocessing bloom
particle system
interactive project cards
fluid scroll rail
physics-perfect water
content inside Canvas
new npm packages
```

---

# 23. Codex Implementation Prompt

```txt
Implement Spec 0018: Constrained WebGL Hero Fluid Simulation.

Context:
The current WebGL hero only feels like a glow following the cursor. We now want actual lightweight fluid simulation, but still as a small signature hero component, not a GPU stress test. Spec 0017 has not been implemented and should not be required.

Goal:
Create a contained WebGL fluid simulation behind the hero signature mark. The simulation should inject dye/velocity from pointer and click/tap, advect dye through a velocity field, and use a limited pressure solve so the motion feels fluid.

Required:
1. Create src/components/brand/HeroFluidSimulationPanel.tsx.
2. Create src/components/webgl/fluid-lite/FluidCanvas.tsx.
3. Create src/components/webgl/fluid-lite/FluidSimulationController.tsx.
4. Create src/components/webgl/fluid-lite/FluidRenderTargets.ts.
5. Create src/components/webgl/fluid-lite/useFluidPointerSplats.ts.
6. Create src/components/webgl/fluid-lite/fluidLiteConfig.ts.
7. Create src/components/webgl/fluid-lite/fluidMaterials.ts.
8. Create shader files under src/components/webgl/fluid-lite/shaders:
   - baseVertex.ts
   - splat.ts
   - advection.ts
   - divergence.ts
   - pressure.ts
   - gradientSubtract.ts
   - display.ts
9. Update HeroSection.tsx to use HeroFluidSimulationPanel inside heroSection__visual.
10. Add required CSS to src/index.css.

Strict constraints:
- No new dependencies.
- One Canvas.
- Hero-only simulation.
- simResolution <= 96 by default.
- dyeResolution <= 384 by default.
- pressureIterations <= 6 by default.
- DPR <= 1.1.
- Max pointer splats <= 24/sec.
- Target simulation stepping at 30fps.
- No postprocessing.
- No bloom.
- No particles.
- No full-page WebGL.
- Canvas is decorative and aria-hidden.
- Gold signature and ChineseAccentText remain DOM layers above Canvas.
- Reduced motion renders fallback.
- WebGL unavailable renders fallback.

Visual requirements:
- Dark navy base.
- Cyan, dark electric blue, jade, soft gold dye.
- No full rainbow.
- Fluid should move behind the gold signature.
- Gold signature remains sharp and dominant.
- Motion should feel calm and premium.

Verification:
- npm run build
- npm run lint
- test pointer splats
- test click/tap splats
- test reduced motion
- test quality='off' fallback
- test mobile widths 360px, 390px, 430px, 768px
- verify no console WebGL errors
```

---

# 24. Done Definition

This spec is done when:

```txt
the hero no longer feels like a cursor glow
pointer/click injects real dye and velocity
dye moves through a constrained velocity field
motion feels fluid but calm
GPU usage is intentionally limited
fallbacks work
the gold signature stays sharp
the implementation is organized and maintainable
```
