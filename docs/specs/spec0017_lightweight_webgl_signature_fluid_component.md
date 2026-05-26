

## Status

implemented

## Owner

Jason Huang

## Last Updated

2026-05-25

## Target Area

Hero visual panel, lightweight WebGL signature component, fluid-inspired shader motion, fallback-safe implementation.

---

# 1. Purpose

This spec replaces the prior heavy WebGL-fluid direction with a smaller, safer, signature-component approach.

Important context:

```txt


This spec must not implement a full GPU fluid simulation.
This spec must not become a GPU stress test.
```

The goal is to create a **small WebGL signature component** for the hero visual panel that feels like fluid distortion, but uses a lightweight shader approach instead of a full Navier-Stokes / pressure-solver fluid simulation.

The component should feel like:

```txt
liquid glass
soft water distortion
subtle cursor refraction
small click/tap ripple impulse
premium cyan/gold/jade glow
```

It should not feel like:

```txt
full-screen fluid simulation
GPU benchmark
shader toy
heavy particle system
gaming RGB effect
```

---

# 2. Product Goal

The hero visual should become a memorable branded signature moment.

A visitor should see:

```txt
gold Chinese-inspired signature
dark water-glass panel
subtle moving liquid surface
floating pearl/orb accents
small pointer/tap interaction
```

The effect should communicate frontend creativity while remaining:

```txt
fast
contained
accessible
fallback-safe
easy to remove if needed
easy to tune
```

---

# 3. Key Decision

Do **not** implement a full WebGL fluid solver for this version.

Avoid:

```txt
velocity buffers
pressure buffers
divergence passes
gradient subtraction
multiple ping-pong render targets
high-frequency FBO simulation
vorticity confinement
large shader pass chains
```

Use instead:

```txt
one React Three Fiber Canvas
one full-panel shader plane
procedural noise / fbm
pointer uniforms
click ripple uniforms
low DPR cap
fallback gradient
DOM signature above Canvas
```

This keeps the component small and portfolio-safe.

---

# 4. Existing Hero Context

Current hero visual is simple:

```tsx
<div className="heroSection__visual" aria-hidden="true">
  <span className="heroSection__orb heroSection__orb--one" />
  <span className="heroSection__orb heroSection__orb--two" />
  <SignatureEmblem />
  <ChineseAccentText />
</div>
```

This spec should replace only the inner visual composition:

```tsx
<div className="heroSection__visual" aria-hidden="true">
  <HeroWebGLSignaturePanel />
</div>
```

Do not rewrite:

```txt
hero copy
hero CTAs
page layout
work section
project data
navigation
```

---

# 5. Existing Dependencies

The repo already includes:

```txt
three
@react-three/fiber
@react-three/drei
maath
framer-motion
```

Do not add new dependencies.

Use only existing packages.

---

# 6. Final Component Set

Implement only these files for the first WebGL version:

```txt
src/components/brand/HeroWebGLSignaturePanel.tsx
src/components/webgl/signature/SignatureFluidCanvas.tsx
src/components/webgl/signature/SignatureFluidPlane.tsx
src/components/webgl/signature/useSignatureFluidPointer.ts
src/components/webgl/signature/signatureFluidShader.ts
src/components/webgl/signature/signatureFluidConfig.ts
```

Optional helper:

```txt
src/components/webgl/signature/SignatureWebGLErrorBoundary.tsx
```

Do not create a full `fluid/` simulation engine folder yet.

This is a **signature shader component**, not a general fluid engine.

---

# 7. Component 1 — `HeroWebGLSignaturePanel`

## 7.1 Purpose

Composes the hero visual by layering:

```txt
WebGL liquid background
orbit rings
pearl/orb accents
gold signature emblem
Chinese vertical text
fallback-safe styling
```

## 7.2 File

```txt
src/components/brand/HeroWebGLSignaturePanel.tsx
```

## 7.3 Suggested implementation

```tsx
import { ChineseAccentText } from "./ChineseAccentText";
import { SignatureEmblem } from "./SignatureEmblem";
import { SignatureFluidCanvas } from "../webgl/signature/SignatureFluidCanvas";

export function HeroWebGLSignaturePanel() {
  return (
    <div className="heroWebGLSignaturePanel">
      <SignatureFluidCanvas />

      <span className="heroWebGLSignaturePanel__ring heroWebGLSignaturePanel__ring--outer" />
      <span className="heroWebGLSignaturePanel__ring heroWebGLSignaturePanel__ring--inner" />

      <span className="heroWebGLSignaturePanel__pearl heroWebGLSignaturePanel__pearl--large" />
      <span className="heroWebGLSignaturePanel__pearl heroWebGLSignaturePanel__pearl--gold" />
      <span className="heroWebGLSignaturePanel__pearl heroWebGLSignaturePanel__pearl--water" />
      <span className="heroWebGLSignaturePanel__pearl heroWebGLSignaturePanel__pearl--jade" />

      <SignatureEmblem className="heroWebGLSignaturePanel__signature" />
      <ChineseAccentText />
    </div>
  );
}
```

## 7.4 Rules

```txt
- Keep the gold signature as DOM, not WebGL.
- Keep ChineseAccentText as DOM.
- Canvas is decorative and aria-hidden.
- Pearls are decorative for v1.
- Do not make pearls interactive in this spec.
```

---

# 8. Component 2 — `SignatureFluidCanvas`

## 8.1 Purpose

Small React Three Fiber Canvas wrapper.

It handles:

```txt
WebGL support detection
prefers-reduced-motion fallback
DPR cap
visibility safety
static fallback
```

## 8.2 File

```txt
src/components/webgl/signature/SignatureFluidCanvas.tsx
```

## 8.3 API

```ts
export type SignatureFluidCanvasProps = {
  className?: string;
  quality?: "off" | "low" | "medium";
};
```

No `high` quality option in this spec.

## 8.4 Suggested implementation

```tsx
import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useMemo, useState } from "react";
import { SignatureFluidPlane } from "./SignatureFluidPlane";
import { signatureFluidPresets } from "./signatureFluidConfig";

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

export function SignatureFluidCanvas({
  className = "",
  quality = "medium",
}: SignatureFluidCanvasProps) {
  const [supported, setSupported] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    setSupported(supportsWebGL());
  }, []);

  const config = useMemo(() => signatureFluidPresets[quality], [quality]);

  if (!supported || reducedMotion || quality === "off") {
    return <div className={`signatureFluidFallback ${className}`} aria-hidden="true" />;
  }

  return (
    <div className={`signatureFluidCanvas ${className}`} aria-hidden="true">
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
          <SignatureFluidPlane config={config} />
        </Suspense>
      </Canvas>
    </div>
  );
}
```

## 8.5 Important config

Use:

```txt
powerPreference: "low-power"
```

Not:

```txt
powerPreference: "high-performance"
```

This reinforces that the component is a small visual accent, not a GPU-heavy showcase.

---

# 9. Component 3 — `signatureFluidConfig`

## 9.1 Purpose

Centralize safe rendering settings.

## 9.2 File

```txt
src/components/webgl/signature/signatureFluidConfig.ts
```

## 9.3 Config

```ts
export type SignatureFluidQuality = "off" | "low" | "medium";

export type SignatureFluidConfig = {
  maxDpr: number;
  pointerStrength: number;
  rippleStrength: number;
  flowSpeed: number;
  distortionStrength: number;
  colorIntensity: number;
};

export const signatureFluidPresets: Record<SignatureFluidQuality, SignatureFluidConfig> = {
  off: {
    maxDpr: 1,
    pointerStrength: 0,
    rippleStrength: 0,
    flowSpeed: 0,
    distortionStrength: 0,
    colorIntensity: 0,
  },
  low: {
    maxDpr: 1,
    pointerStrength: 0.18,
    rippleStrength: 0.22,
    flowSpeed: 0.18,
    distortionStrength: 0.08,
    colorIntensity: 0.42,
  },
  medium: {
    maxDpr: 1.15,
    pointerStrength: 0.26,
    rippleStrength: 0.32,
    flowSpeed: 0.24,
    distortionStrength: 0.12,
    colorIntensity: 0.55,
  },
};
```

## 9.4 Constraints

```txt
- No high preset.
- DPR should not exceed 1.15.
- Medium should still be lightweight.
- Mobile should use low.
```

---

# 10. Component 4 — `useSignatureFluidPointer`

## 10.1 Purpose

Track pointer and click ripple uniforms without React state every frame.

## 10.2 File

```txt
src/components/webgl/signature/useSignatureFluidPointer.ts
```

## 10.3 API

```ts
export type SignaturePointerState = {
  pointer: React.MutableRefObject<[number, number]>;
  velocity: React.MutableRefObject<[number, number]>;
  ripple: React.MutableRefObject<{
    x: number;
    y: number;
    startedAt: number;
    strength: number;
  }>;
};

export function useSignatureFluidPointer(
  targetRef: React.RefObject<HTMLElement>,
): SignaturePointerState;
```

## 10.4 Behavior

```txt
- Normalize pointer coordinates from 0 to 1.
- Store pointer/velocity in refs.
- Store click/tap ripple in refs.
- Use requestAnimationFrame for pointer updates if needed.
- Do not call setState on pointermove.
- Touch input only creates tap ripple; no continuous touchmove splats.
```

## 10.5 Rules

```txt
- No splat queues.
- No render targets.
- No dye buffers.
- Pointer state only drives shader uniforms.
```

---

# 11. Component 5 — `SignatureFluidPlane`

## 11.1 Purpose

Renders one full-panel shader plane.

## 11.2 File

```txt
src/components/webgl/signature/SignatureFluidPlane.tsx
```

## 11.3 Behavior

```txt
- One plane geometry.
- One shader material.
- Update uniforms in useFrame.
- No postprocessing.
- No render targets.
- No multiple passes.
```

## 11.4 Suggested implementation concept

```tsx
import { useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { signatureFluidFragmentShader, signatureFluidVertexShader } from "./signatureFluidShader";
import type { SignatureFluidConfig } from "./signatureFluidConfig";

export function SignatureFluidPlane({ config }: { config: SignatureFluidConfig }) {
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);
  const { size } = useThree();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(size.width, size.height) },
      uPointer: { value: new THREE.Vector2(0.5, 0.5) },
      uRipple: { value: new THREE.Vector4(0.5, 0.5, -10, 0) },
      uFlowSpeed: { value: config.flowSpeed },
      uDistortionStrength: { value: config.distortionStrength },
      uColorIntensity: { value: config.colorIntensity },
    }),
    [config, size.width, size.height],
  );

  useFrame((state) => {
    if (!materialRef.current) return;

    materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={materialRef}
        uniforms={uniforms}
        vertexShader={signatureFluidVertexShader}
        fragmentShader={signatureFluidFragmentShader}
        transparent
        depthWrite={false}
        depthTest={false}
      />
    </mesh>
  );
}
```

Note:

```txt
The exact pointer hook wiring may require passing a target ref from SignatureFluidCanvas or HeroWebGLSignaturePanel.
Keep it simple.
```

---

# 12. Shader — `signatureFluidShader`

## 12.1 Purpose

Create a procedural liquid background with pointer refraction and ripple impulse.

## 12.2 File

```txt
src/components/webgl/signature/signatureFluidShader.ts
```

## 12.3 Vertex shader

```ts
export const signatureFluidVertexShader = `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;
```

## 12.4 Fragment shader concept

This shader should use:

```txt
fbm/noise
time drift
pointer lens
ripple ring
brand palette mixing
vignette
subtle caustic bands
```

Do not use texture buffers.

Concept:

```ts
export const signatureFluidFragmentShader = `
  precision highp float;

  varying vec2 vUv;

  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec2 uPointer;
  uniform vec4 uRipple; // x, y, startTime, strength
  uniform float uFlowSpeed;
  uniform float uDistortionStrength;
  uniform float uColorIntensity;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);

    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));

    vec2 u = f * f * (3.0 - 2.0 * f);

    return mix(a, b, u.x)
      + (c - a) * u.y * (1.0 - u.x)
      + (d - b) * u.x * u.y;
  }

  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;

    for (int i = 0; i < 4; i++) {
      value += amplitude * noise(p);
      p *= 2.03;
      amplitude *= 0.5;
    }

    return value;
  }

  void main() {
    vec2 uv = vUv;
    vec2 aspectUv = uv;
    aspectUv.x *= uResolution.x / max(uResolution.y, 1.0);

    float t = uTime * uFlowSpeed;

    vec2 pointer = uPointer;
    pointer.x *= uResolution.x / max(uResolution.y, 1.0);

    float pointerDist = distance(aspectUv, pointer);
    float pointerLens = smoothstep(0.34, 0.0, pointerDist);

    vec2 flow = vec2(
      fbm(uv * 3.0 + vec2(t, -t * 0.35)),
      fbm(uv * 3.4 + vec2(-t * 0.45, t * 0.55))
    );

    vec2 distortedUv = uv + (flow - 0.5) * uDistortionStrength;
    distortedUv += (uv - uPointer) * pointerLens * 0.018;

    float fluid = fbm(distortedUv * 4.2 + vec2(t * 0.8, -t * 0.4));
    float caustic = smoothstep(0.48, 0.82, fluid);

    float rippleAge = max(0.0, uTime - uRipple.z);
    float rippleDist = distance(uv, uRipple.xy);
    float ripple = exp(-rippleAge * 2.8)
      * smoothstep(0.025, 0.0, abs(rippleDist - rippleAge * 0.32))
      * uRipple.w;

    vec3 navy = vec3(0.012, 0.039, 0.067);
    vec3 water = vec3(0.494, 0.906, 0.949);
    vec3 electricBlue = vec3(0.145, 0.388, 0.922);
    vec3 jade = vec3(0.396, 0.839, 0.678);
    vec3 gold = vec3(0.969, 0.788, 0.282);

    vec3 color = navy;
    color += water * caustic * 0.16 * uColorIntensity;
    color += electricBlue * pointerLens * 0.18 * uColorIntensity;
    color += jade * fluid * 0.055 * uColorIntensity;
    color += gold * ripple * 0.20 * uColorIntensity;

    float vignette = smoothstep(0.86, 0.24, distance(uv, vec2(0.5)));
    color *= 0.72 + vignette * 0.42;

    float alpha = 0.82;

    gl_FragColor = vec4(color, alpha);
  }
`;
```

## 12.5 Visual constraints

```txt
- Keep alpha below full opacity.
- Preserve dark navy base.
- Do not create rainbow bands.
- Use gold only for ripple/brand highlight.
- Keep pointer lens subtle.
```

---

# 13. Interaction Requirements

## 13.1 Desktop

```txt
- Pointer movement shifts the liquid distortion softly.
- Pointer area creates a lens-like refraction glow.
- Click creates a soft gold/cyan ripple.
```

## 13.2 Mobile

```txt
- Use low quality.
- Disable continuous touchmove tracking.
- Tap can create one ripple.
- If performance is poor, fallback to static CSS gradient.
```

## 13.3 Reduced motion

```txt
- Do not render active Canvas.
- Use static fallback.
```

## 13.4 Offscreen behavior

Preferred:

```txt
pause Canvas when hero is not visible
```

Minimum acceptable:

```txt
keep shader lightweight enough that always-on is acceptable while page is open
```

If implementing pause:

```txt
use IntersectionObserver around SignatureFluidCanvas
render fallback or stop frame loop when not visible
```

---

# 14. CSS Requirements

Add to `src/index.css`.

## 14.1 Panel layout

```css
.heroWebGLSignaturePanel {
  position: relative;
  display: grid;
  place-items: center;
  width: 100%;
  min-height: 100%;
  isolation: isolate;
  overflow: hidden;
}

.signatureFluidCanvas,
.signatureFluidFallback {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
}

.signatureFluidCanvas canvas {
  display: block;
  width: 100% !important;
  height: 100% !important;
}
```

## 14.2 Fallback

```css
.signatureFluidFallback {
  background:
    radial-gradient(circle at 32% 24%, rgba(126, 231, 242, 0.16), transparent 30%),
    radial-gradient(circle at 70% 68%, rgba(247, 201, 72, 0.10), transparent 34%),
    linear-gradient(135deg, rgba(37, 99, 235, 0.10), rgba(3, 10, 17, 0));
}
```

## 14.3 Rings

```css
.heroWebGLSignaturePanel__ring {
  position: absolute;
  border-radius: var(--radius-full);
  pointer-events: none;
}

.heroWebGLSignaturePanel__ring--outer {
  inset: 7%;
  z-index: 1;
  border: 1px solid rgba(126, 231, 242, 0.18);
}

.heroWebGLSignaturePanel__ring--inner {
  inset: 22%;
  z-index: 1;
  border: 1px solid rgba(247, 201, 72, 0.14);
}
```

## 14.4 Pearls

```css
.heroWebGLSignaturePanel__pearl {
  position: absolute;
  z-index: 2;
  border-radius: var(--radius-full);
  background:
    radial-gradient(circle at 28% 24%, rgba(255, 255, 255, 0.92), transparent 10%),
    radial-gradient(circle at 72% 78%, rgba(126, 231, 242, 0.24), transparent 46%),
    rgba(7, 24, 36, 0.74);
  box-shadow:
    inset 0 1px 8px rgba(255, 255, 255, 0.18),
    0 16px 36px rgba(0, 0, 0, 0.26),
    0 0 22px rgba(126, 231, 242, 0.16);
  pointer-events: none;
}

.heroWebGLSignaturePanel__pearl--large {
  width: 90px;
  height: 90px;
  left: 17%;
  top: 21%;
}

.heroWebGLSignaturePanel__pearl--gold {
  width: 42px;
  height: 42px;
  left: 42%;
  bottom: 19%;
  box-shadow:
    inset 0 1px 8px rgba(255, 255, 255, 0.18),
    0 16px 36px rgba(0, 0, 0, 0.26),
    0 0 26px rgba(247, 201, 72, 0.24);
}

.heroWebGLSignaturePanel__pearl--water {
  width: 36px;
  height: 36px;
  right: 14%;
  top: 27%;
}

.heroWebGLSignaturePanel__pearl--jade {
  width: 26px;
  height: 26px;
  right: 38%;
  top: 36%;
}
```

## 14.5 Signature layering

```css
.heroWebGLSignaturePanel__signature {
  position: relative;
  z-index: 3;
}

.heroWebGLSignaturePanel .chineseAccent {
  z-index: 4;
}
```

---

# 15. Performance Budget

This component must stay small.

## 15.1 Hard limits

```txt
one Canvas
one mesh
one shader material
one plane geometry
no render targets
no postprocessing
no particle systems
no physics
DPR <= 1.15
no high quality preset
no full-screen page canvas
```

## 15.2 Shader limits

```txt
fbm octaves <= 4
no loops above 4 iterations
no texture lookups
no multi-pass
no expensive branching
```

## 15.3 Runtime limits

```txt
no React state per frame
no React state on pointermove
uniform updates only
tap/click ripple is one vec4 uniform
pointer is one vec2 uniform
```

---

# 16. Fallback Requirements

Fallback must appear when:

```txt
WebGL unavailable
prefers-reduced-motion is enabled
quality="off"
Canvas throws an error
mobile performance is unacceptable
```

Fallback should still look premium:

```txt
dark navy
cyan/gold radial gradients
static rings
static pearls
gold signature
Chinese text
```

The site must not visibly break if WebGL fails.

---

# 17. Accessibility Requirements

The WebGL layer is decorative.

```txt
- Canvas wrapper uses aria-hidden="true".
- Hero visual parent can remain aria-hidden for v1.
- No text or links inside Canvas.
- Reduced motion disables active WebGL.
- Keyboard navigation is unaffected.
- CTAs remain in the hero copy column as normal links/buttons.
```

Do not make the hero visual keyboard-focusable in this spec.

---

# 18. Acceptance Criteria


- [ ] Static hero visual is replaced by `HeroWebGLSignaturePanel`.
- [ ] WebGL layer is a small signature component, not a full simulation engine.
- [ ] Implementation uses one Canvas, one plane, one shader material.
- [ ] No render targets are used.
- [ ] No pressure/advection fluid solver is implemented.
- [ ] Pointer movement subtly affects shader uniforms on desktop.
- [ ] Click/tap creates a subtle ripple uniform.
- [ ] Gold signature remains DOM-rendered, sharp, and visually dominant.
- [ ] Chinese vertical text remains DOM-rendered.
- [ ] Reduced-motion users receive static fallback.
- [ ] WebGL failure receives static fallback.
- [ ] No new npm dependencies are added.
- [ ] Mobile uses low quality or fallback.
- [ ] Build passes.
- [ ] Lint passes or pre-existing lint issues are documented.

---

# 19. Non-Goals

Do not implement:

```txt

full fluid simulation
render-to-texture fluid solver
velocity/dye/pressure buffers
vorticity confinement
postprocessing bloom
full-screen WebGL background
interactive pearl selection
project card fluid effects
route-based case studies
new dependencies
```

This spec is intentionally small.

---

# 20. Codex Implementation Prompt

```txt


Important:


Goal:
Replace the static hero visual panel with a small WebGL signature component that feels like liquid glass / fluid distortion, without implementing a full GPU fluid simulation.

Current hero:
HeroSection renders heroSection__visual with two orb spans, SignatureEmblem, and ChineseAccentText.

Required:
1. Create src/components/brand/HeroWebGLSignaturePanel.tsx.
2. Create src/components/webgl/signature/SignatureFluidCanvas.tsx.
3. Create src/components/webgl/signature/SignatureFluidPlane.tsx.
4. Create src/components/webgl/signature/useSignatureFluidPointer.ts.
5. Create src/components/webgl/signature/signatureFluidShader.ts.
6. Create src/components/webgl/signature/signatureFluidConfig.ts.
7. Update src/components/sections/HeroSection.tsx to render HeroWebGLSignaturePanel inside heroSection__visual.
8. Add CSS to src/index.css for the panel, fallback, rings, pearls, and layering.

Strict constraints:
- No new dependencies.
- Use existing three and @react-three/fiber.
- One Canvas only.
- One plane mesh only.
- One shader material only.
- No render targets.
- No pressure solver.
- No advection solver.
- No vorticity.
- No postprocessing.
- No particle systems.
- DPR cap <= 1.15.
- Use powerPreference: "low-power".
- Reduced motion must render fallback instead of active Canvas.
- WebGL unavailable must render fallback.
- Gold signature and Chinese text must remain DOM layers above the Canvas.
- Canvas is decorative and aria-hidden.

Visual:
- Deep navy base.
- Cyan / dark electric blue / jade / soft gold.
- Tiny violet only as optional faint edge accent.
- No full rainbow.
- Subtle pointer lens.
- Subtle click/tap ripple.
- Keep the gold signature visually dominant.

Verification:
- npm run build
- npm run lint
- test reduced motion
- test WebGL fallback by forcing quality="off"
- test desktop pointer movement
- test click/tap ripple
- test mobile widths 360px, 390px, 430px, 768px
```

---

# 21. Done Definition

This spec is done when:

```txt
the hero has a small WebGL liquid-glass signature background
the effect is subtle and brand-safe
the component does not use expensive simulation passes
the gold mark remains sharp
fallbacks work
reduced motion works
mobile remains clean
the implementation can be removed or tuned easily
```
