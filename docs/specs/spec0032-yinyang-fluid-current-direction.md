# Spec 0111: Yin-Yang Current Field for Fluid Simulation

## Status

proposed

## Owner

Jason Huang / Portfolio UI Library

## Last Updated

2026-05-30

## Scope

This spec updates the current/fluid simulation so the motion reads more clearly as yin-yang currents instead of generic fluid waves.

This spec should be implemented **after Spec 0110** because the tablet/mobile scene and CSS modularization need to be stabilized before tuning the current field.

---

## Problem

The current fluid simulation is visually soft and premium, but it does not strongly communicate yin-yang motion. The flow currently looks more like a general pearlescent current field with blue/gold accents than two opposing, interlocking currents following an S-shaped seam.

The existing implementation already has useful pieces:

- `autoYinYangCurrent.ts` creates automatic current splats.
- `wavefrontYinYangCurrent.ts` creates S-curve wavefront points.
- `FluidSimulationController.tsx` pushes both auto-current splats and wavefront points into the simulation loop.
- `useFluidPointerSplats.ts` handles user interaction and disruption.

This spec should tune and extend those systems instead of replacing the WebGL/fluid architecture.

---

## Goals

- Make the fluid motion read as a yin-yang current system.
- Introduce a clearer S-shaped seam/current path.
- Add two subtle opposing lobe currents.
- Add two small “eye eddies” that echo the classic yin-yang dots without becoming literal hard circles.
- Keep the existing pointer-disruption behavior.
- Preserve performance on mobile and reduced-motion devices.
- Keep the implementation mostly in pure geometry/splat functions so it is testable.

---

## Non-goals

- Do not redesign the entire shader pipeline.
- Do not replace the fluid simulation with a static image.
- Do not require new image assets.
- Do not make the yin-yang symbol overly literal or cartoonish.
- Do not increase mobile GPU load beyond the existing quality constraints.
- Do not change `YinYangProjectScene` CSS in this spec.

---

## Current Architecture Summary

### Current splat generator

`autoYinYangCurrent.ts` currently calculates two opposing lobe positions around the center and returns lobe splats, bridge splats, and disruption turbulence.

The current lobe centers are calculated roughly as:

```ts
const angle = time * config.autoCurrentRotationSpeed * Math.PI * 2;
const lobeRadius = config.autoCurrentRadius * config.autoCurrentHalfSeparation;

const yin = {
  x: 0.5 + Math.cos(angle) * lobeRadius,
  y: 0.5 + Math.sin(angle) * lobeRadius,
};

const yang = {
  x: 0.5 - Math.cos(angle) * lobeRadius,
  y: 0.5 - Math.sin(angle) * lobeRadius,
};
```

This creates motion, but it can read as orbiting blobs instead of an interlocking yin-yang seam.

### Current controller wiring

`FluidSimulationController.tsx` already injects both auto-current splats and wavefront points into the same `splatsRef` queue. Keep that integration point.

---

## Desired Visual Direction

The fluid should feel like:

- A soft S-curve through the center.
- A blue/cyan current wrapping one side.
- A warm gold/ivory current wrapping the other side.
- Two counter-rotating lobes that trade dominance slowly.
- Two small eddies placed inside opposite lobes.
- A pearly, water-like surface that still feels premium and subtle.

The effect should be clear enough to recognize as yin-yang-inspired even without the actual yin-yang asset on top.

---

## Proposed Implementation

### 1. Add a pure geometry helper

Create a new file:

```txt
src/components/fluid/yinYangCurrentGeometry.ts
```

The file should export pure functions only:

```ts
export type YinYangCurrentPoint = {
  x: number;
  y: number;
  tangentX: number;
  tangentY: number;
  normalX: number;
  normalY: number;
};

export function clamp01(value: number): number;

export function rotateAroundCenter(
  x: number,
  y: number,
  angle: number,
): { x: number; y: number };

export function sampleYinYangSeam(
  u: number,
  options: {
    amplitude: number;
    length: number;
    tiltRadians: number;
  },
): YinYangCurrentPoint;

export function sampleYinYangEyeEddy(
  lane: 'blue' | 'gold',
  phase: number,
  options: {
    separation: number;
    radius: number;
    tiltRadians: number;
  },
): YinYangCurrentPoint;
```

### 2. Make the seam drive the current instead of pure orbiting

Refactor `createAutoYinYangCurrentSplats` so the main current samples points along the S-curve seam rather than only using two orbiting lobe centers.

Add a new helper inside `autoYinYangCurrent.ts`:

```ts
function createSeamCurrentSplats(input: {
  time: number;
  config: FluidLiteConfig;
  disruption?: CurrentDisruption | null;
}): AutoCurrentSplat[];
```

The seam splats should:

- sample 5 to 9 points along the S-curve
- offset blue points to one side of the seam
- offset gold points to the opposite side
- move blue and gold in opposite tangent directions
- use a small center pull so the current does not fly off the panel
- use warm/cool color separation instead of muddy middle blending

### 3. Add two “eye eddy” splats

Add a helper:

```ts
function createEyeEddySplats(input: {
  time: number;
  config: FluidLiteConfig;
  disruption?: CurrentDisruption | null;
}): AutoCurrentSplat[];
```

The eddies should:

- sit inside the two lobes, not on the exact centerline
- rotate gently in opposite directions
- have lower dye force than the main lobe current
- be visible enough to suggest the yin-yang dots but not literal hard circles

Suggested visual defaults:

```ts
const eyeRadius = config.autoCurrentLobeRadius * 0.72;
const eyeForce = config.effectScale * config.autoCurrentDyeRate * 0.38;
const eyeVelocityScale = config.autoCurrentStrength * 0.014;
```

### 4. Keep existing bridge/disruption behavior

Do not remove:

- `createBridgeSplats`
- `createDisruptionTurbulence`
- `localAttenuation`

These already support continuity and pointer interaction. The new seam/eye helpers should reuse `localAttenuation` so user interaction can temporarily disrupt the current.

### 5. Tune `wavefrontYinYangCurrent.ts`

The current wavefront file already samples an S-curve and creates blue/gold lanes. Keep that file, but tune it so it complements the new current geometry.

Required changes:

- Align seam amplitude and tilt with the new geometry helper.
- Reduce random noise if it weakens the yin-yang shape.
- Increase color separation slightly on desktop/cinematic quality.
- Keep lower point counts on mobile.
- Ensure blue and gold lanes do not fully overlap at the center.

### 6. Add config values to `fluidLiteConfig`

Add explicit config fields instead of hard-coding all tuning values in the splat files.

Recommended fields:

```ts
yinYangCurrentMode: 'orbital' | 'seam';
yinYangCurrentTiltDeg: number;
yinYangCurrentSeamAmplitude: number;
yinYangCurrentSeamLength: number;
yinYangCurrentLaneOffset: number;
yinYangCurrentEyeSeparation: number;
yinYangCurrentEyeRadius: number;
yinYangCurrentEyeStrength: number;
yinYangCurrentColorSeparation: number;
yinYangCurrentSeamPointCount: number;
```

Recommended initial values:

```ts
// low/mobile
yinYangCurrentMode: 'seam',
yinYangCurrentTiltDeg: -8,
yinYangCurrentSeamAmplitude: 0.18,
yinYangCurrentSeamLength: 0.78,
yinYangCurrentLaneOffset: 0.055,
yinYangCurrentEyeSeparation: 0.16,
yinYangCurrentEyeRadius: 0.028,
yinYangCurrentEyeStrength: 0.32,
yinYangCurrentColorSeparation: 0.82,
yinYangCurrentSeamPointCount: 4,

// high/cinematic
yinYangCurrentMode: 'seam',
yinYangCurrentTiltDeg: -10,
yinYangCurrentSeamAmplitude: 0.22,
yinYangCurrentSeamLength: 0.84,
yinYangCurrentLaneOffset: 0.07,
yinYangCurrentEyeSeparation: 0.18,
yinYangCurrentEyeRadius: 0.034,
yinYangCurrentEyeStrength: 0.42,
yinYangCurrentColorSeparation: 0.9,
yinYangCurrentSeamPointCount: 7,
```

### 7. Add CSS fallback tuning

For browsers without WebGL or users with reduced motion, the fallback should also suggest yin-yang flow.

Update fallback backgrounds in the relevant CSS module, likely `components/hero.css` or `components/fluid.css` after Spec 0110.

Target direction:

```css
.fluidCanvasFallback {
  pointer-events: none;
  background:
    radial-gradient(circle at 34% 34%, rgba(126, 231, 242, 0.22), transparent 24%),
    radial-gradient(circle at 64% 66%, rgba(247, 201, 72, 0.14), transparent 22%),
    radial-gradient(ellipse at 34% 62%, rgba(126, 231, 242, 0.16), transparent 30%),
    radial-gradient(ellipse at 68% 38%, rgba(247, 201, 72, 0.1), transparent 30%),
    linear-gradient(135deg, rgba(3, 10, 17, 0.08), rgba(3, 10, 17, 0));
}
```

For light mode, use softer opacity so the background remains premium and not busy.

---

## Implementation Steps

### Step 1: Add geometry helper

Create `yinYangCurrentGeometry.ts` with unit-testable helpers. No React, Three, or DOM dependencies.

### Step 2: Add config fields

Extend `FluidLiteConfig` and all presets. Preserve current behavior behind the new mode if needed:

```ts
yinYangCurrentMode: 'seam'
```

Use `'orbital'` as a fallback mode if the seam implementation needs rollback.

### Step 3: Refactor auto current generator

Update `createAutoYinYangCurrentSplats`:

```ts
if (config.yinYangCurrentMode === 'seam') {
  return [
    ...createSeamCurrentSplats({ time, config, disruption }),
    ...createEyeEddySplats({ time, config, disruption }),
    ...createBridgeSplats({ angle, time, config, disruption }),
    ...createDisruptionTurbulence({ time, config, disruption }),
  ];
}

return existingOrbitalCurrentImplementation;
```

### Step 4: Tune wavefront points

Update `wavefrontYinYangCurrent.ts` to import the new seam sampler so the ribbon and auto-current follow the same geometry.

### Step 5: Validate controller performance

Do not increase `activeSplatLimit` without testing. If more seam points are added, reduce bridge count or wavefront count on low/mobile quality.

### Step 6: Update fallbacks

After Spec 0110 moves fluid CSS into a dedicated module, update fallback CSS with yin-yang lobe gradients.

### Step 7: Visual tuning pass

Tune values in this order:

1. seam amplitude
2. lane offset
3. lobe/eye radius
4. dye force
5. chroma/opacity
6. wavefront noise
7. mobile quality values

---

## Testing Requirements

### Unit tests

Add tests for `yinYangCurrentGeometry.ts`:

- `clamp01` clamps values.
- `rotateAroundCenter` preserves distance from center.
- `sampleYinYangSeam(0.5)` returns a point near center.
- seam endpoints stay inside `[0, 1]` after rotation.
- blue/gold eye eddies are symmetric around the center within tolerance.

### Visual tests

Capture screenshots or recordings for:

- desktop cinematic fluid
- desktop high fluid
- tablet low/medium fluid
- mobile low fluid
- reduced-motion fallback
- WebGL unsupported fallback

### Performance checks

- No meaningful FPS drop on desktop compared to current simulation.
- Mobile remains on low quality through existing quality selection.
- Reduced-motion still disables active simulation.
- No new memory leak from per-frame object creation beyond current splat arrays.

---

## Acceptance Criteria

- The current field visually reads as two interlocking yin-yang-inspired currents.
- The current has a visible S-curve direction without hard graphic lines.
- Blue/cyan and gold/ivory currents remain distinct enough to read as opposing lanes.
- Two subtle eye eddies are visible in cinematic/high quality.
- Mobile stays performant and does not become visually noisy.
- Reduced-motion and fallback modes still work.
- Existing pointer interaction still disrupts and recovers the current.
- `pnpm lint` passes.
- `pnpm build` passes.
- New pure geometry helpers have unit coverage.

---

## Risks

### Risk: Current becomes too literal

If the S-curve and eye eddies become too sharp, the background may compete with the real yin-yang asset. Keep dye soft, radius broad, and opacity restrained.

### Risk: Mobile becomes too busy

Mobile should use fewer seam points, weaker eye eddies, and lower dye force.

### Risk: Config drift

Avoid scattering constants across multiple files. Put tuneable values in `fluidLiteConfig` and keep geometry helpers pure.

---

## Rollback Plan

- Set `yinYangCurrentMode: 'orbital'` in all presets.
- Keep the new geometry helper unused until retuned.
- Revert only the fallback CSS if it becomes visually too busy.

---

## Developer Notes

This should be a visual tuning PR with a small algorithmic refactor, not a rewrite. The existing simulation controller should remain the integration point. The highest-value change is shared seam geometry used by both auto-current splats and wavefront ribbon points.
