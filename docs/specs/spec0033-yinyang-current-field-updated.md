# Spec 0033: Yin-Yang Current Field — Selective Visibility Tuning

## Status

proposed

## Owner

Jason Huang / Portfolio UI Library

## Last Updated

2026-05-31

## Scope

This spec updates the current/fluid simulation so the motion reads more clearly as yin-yang currents while preserving the foreground emblem/signature exactly as-is.

This is a revision of Spec 0033 after two implementation observations:

1. The first implementation made the side currents and background flow too visible, causing the emblem to feel less pronounced.
2. The second implementation made the currents too quiet globally, causing the yin-yang current shape to disappear entirely.

The better fix is **selective visibility**:

- Make the central S-curve and circular eye eddies visible enough to define the yin-yang form.
- Keep secondary wavefront ribbons, bridge splats, and turbulence quieter.
- Do not modify the foreground emblem/signature layer at all.

---

## Problem

The current fluid system has the right conceptual direction, but the visual weights are not balanced.

When the whole current field is strong, the blue/gold currents overpower the foreground emblem and make the scene feel noisy. When the whole current field is globally reduced, the yin-yang shape disappears and the card becomes mostly static.

The issue is not only intensity. The issue is that the implementation needs separate visual weights for different current roles.

The fluid should not be treated as one visual layer. It should be tuned as several roles:

- **Seam / S-curve current**: the main shape-defining current.
- **Eye eddies**: the circular yin-yang dot-inspired motion.
- **Bridge splats**: secondary continuity helpers.
- **Wavefront ribbons**: background motion and flow texture.
- **Disruption turbulence**: pointer-driven temporary response.

---

## Goals

- Make the current field read as a yin-yang-inspired current system.
- Keep the foreground emblem/signature completely unchanged.
- Make the central S-curve current visible enough to define the shape.
- Make the circular eye eddies larger, calmer, and more intentional.
- Reduce side-current and generic wavefront dominance.
- Avoid global opacity reductions that make the entire current invisible.
- Preserve existing pointer-disruption behavior.
- Preserve mobile and reduced-motion performance constraints.
- Keep the implementation mostly in pure geometry/splat functions so it remains testable.

---

## Non-goals

- Do not modify the foreground emblem/signature asset styling, opacity, filters, transforms, scale, source asset, or layer order.
- Do not redesign the entire shader pipeline.
- Do not replace the fluid simulation with a static image.
- Do not require new image assets.
- Do not make the yin-yang form overly literal, sharp, or cartoon-like.
- Do not increase mobile GPU load beyond the existing quality constraints.
- Do not change `YinYangProjectScene` layout CSS in this spec.

---

## Current Architecture Summary

The current implementation already has useful pieces and should not be rewritten from scratch.

Existing relevant modules:

- `autoYinYangCurrent.ts` creates automatic yin-yang current splats.
- `wavefrontYinYangCurrent.ts` creates S-curve / wavefront points.
- `FluidSimulationController.tsx` pushes both auto-current splats and wavefront points into the simulation loop.
- `useFluidPointerSplats.ts` handles user interaction and disruption.

Keep this architecture. The correction should happen through geometry, config, and per-role weighting.

---

## Desired Visual Direction

The final result should feel like:

- A large, soft S-curve moving through the center.
- Two opposing currents wrapping around the center line.
- A blue/cyan current lane and a warm gold/ivory current lane.
- Two soft circular eddies where the yin-yang dots would visually live.
- Background wavefront motion that supports the scene without becoming the main visual.
- A premium, subtle, water-like field behind the emblem.

The current should be visible enough to read as a yin-yang current system, but the emblem should remain the focal point without changing the emblem itself.

---

## Revised Visual Balancing Rule

Do **not** reduce the entire fluid system uniformly.

The central yin-yang-defining currents must remain visible, while secondary side currents and turbulence should be reduced.

Use separate visual weights:

| Current role | Visibility target | Motion target | Purpose |
|---|---:|---:|---|
| Seam / S-curve current | medium-high | medium | Defines the yin-yang silhouette |
| Eye eddies | high but soft | low | Makes circular yin-yang dot regions intentional |
| Bridge splats | low-medium | low-medium | Connects lanes without becoming noisy |
| Wavefront ribbons | low | low-medium | Adds water texture and direction |
| Disruption turbulence | very low unless interacting | temporary | Responds to pointer movement |

This prevents the two failure modes:

- **Too strong everywhere**: currents overpower the emblem.
- **Too weak everywhere**: currents disappear and no yin-yang shape forms.

---

## Proposed Implementation

### 1. Keep or add pure geometry helper

Create or keep:

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
    fieldScale: number;
  },
): YinYangCurrentPoint;

export function sampleYinYangEyeEddy(
  lane: 'blue' | 'gold',
  phase: number,
  options: {
    separation: number;
    radius: number;
    tiltRadians: number;
    fieldScale: number;
  },
): YinYangCurrentPoint;
```

The geometry helper should only calculate positions, tangents, normals, and simple transforms. It should not know about React, Three, WebGL, DOM, or shader state.

---

### 2. Add or update config values

Add explicit config values instead of relying on hard-coded constants.

```ts
export type YinYangCurrentMode = 'orbital' | 'seam';

export type FluidLiteConfig = {
  // existing fields...

  yinYangCurrentMode: YinYangCurrentMode;
  yinYangCurrentTiltDeg: number;
  yinYangCurrentFieldScale: number;

  yinYangCurrentSeamAmplitude: number;
  yinYangCurrentSeamLength: number;
  yinYangCurrentLaneOffset: number;
  yinYangCurrentSeamPointCount: number;

  yinYangCurrentDyeOpacity: number;
  yinYangCurrentWavefrontOpacity: number;
  yinYangCurrentBridgeOpacity: number;
  yinYangCurrentTurbulenceOpacity: number;

  yinYangCurrentEyeSeparation: number;
  yinYangCurrentEyeRadius: number;
  yinYangCurrentEyeStrength: number;
  yinYangCurrentEyeOpacity: number;

  yinYangCurrentColorSeparation: number;
};
```

---

### 3. Recommended tuning values

#### Desktop / high / cinematic

```ts
const yinYangCurrentHigh = {
  yinYangCurrentMode: 'seam',
  yinYangCurrentTiltDeg: -9,
  yinYangCurrentFieldScale: 1.18,

  yinYangCurrentSeamAmplitude: 0.30,
  yinYangCurrentSeamLength: 0.98,
  yinYangCurrentLaneOffset: 0.075,
  yinYangCurrentSeamPointCount: 9,

  yinYangCurrentDyeOpacity: 0.64,
  yinYangCurrentWavefrontOpacity: 0.18,
  yinYangCurrentBridgeOpacity: 0.36,
  yinYangCurrentTurbulenceOpacity: 0.12,

  yinYangCurrentEyeSeparation: 0.23,
  yinYangCurrentEyeRadius: 0.065,
  yinYangCurrentEyeStrength: 0.34,
  yinYangCurrentEyeOpacity: 0.78,

  yinYangCurrentColorSeparation: 0.78,
};
```

#### Medium / tablet

```ts
const yinYangCurrentMedium = {
  yinYangCurrentMode: 'seam',
  yinYangCurrentTiltDeg: -8,
  yinYangCurrentFieldScale: 1.12,

  yinYangCurrentSeamAmplitude: 0.26,
  yinYangCurrentSeamLength: 0.92,
  yinYangCurrentLaneOffset: 0.064,
  yinYangCurrentSeamPointCount: 7,

  yinYangCurrentDyeOpacity: 0.56,
  yinYangCurrentWavefrontOpacity: 0.14,
  yinYangCurrentBridgeOpacity: 0.30,
  yinYangCurrentTurbulenceOpacity: 0.10,

  yinYangCurrentEyeSeparation: 0.20,
  yinYangCurrentEyeRadius: 0.052,
  yinYangCurrentEyeStrength: 0.28,
  yinYangCurrentEyeOpacity: 0.68,

  yinYangCurrentColorSeparation: 0.74,
};
```

#### Low / mobile

```ts
const yinYangCurrentLow = {
  yinYangCurrentMode: 'seam',
  yinYangCurrentTiltDeg: -7,
  yinYangCurrentFieldScale: 1.04,

  yinYangCurrentSeamAmplitude: 0.22,
  yinYangCurrentSeamLength: 0.84,
  yinYangCurrentLaneOffset: 0.052,
  yinYangCurrentSeamPointCount: 5,

  yinYangCurrentDyeOpacity: 0.48,
  yinYangCurrentWavefrontOpacity: 0.10,
  yinYangCurrentBridgeOpacity: 0.24,
  yinYangCurrentTurbulenceOpacity: 0.08,

  yinYangCurrentEyeSeparation: 0.17,
  yinYangCurrentEyeRadius: 0.042,
  yinYangCurrentEyeStrength: 0.22,
  yinYangCurrentEyeOpacity: 0.58,

  yinYangCurrentColorSeparation: 0.68,
};
```

These values intentionally keep the seam and eyes visible while keeping wavefront ribbons quieter.

---

### 4. Refactor auto current generator with per-role weighting

Update `createAutoYinYangCurrentSplats` so it does not apply one global opacity/dye multiplier to all current splats.

Preferred shape:

```ts
export function createAutoYinYangCurrentSplats(input: {
  time: number;
  config: FluidLiteConfig;
  disruption?: CurrentDisruption | null;
}): AutoCurrentSplat[] {
  const { config } = input;

  if (config.yinYangCurrentMode === 'seam') {
    return [
      ...createSeamCurrentSplats(input),
      ...createEyeEddySplats(input),
      ...createBridgeSplats(input),
      ...createDisruptionTurbulence(input),
    ];
  }

  return createOrbitalCurrentSplats(input);
}
```

Inside each helper, apply the correct per-role weight.

```ts
seamDye *= config.yinYangCurrentDyeOpacity;
eyeDye *= config.yinYangCurrentEyeOpacity;
bridgeDye *= config.yinYangCurrentBridgeOpacity;
turbulenceDye *= config.yinYangCurrentTurbulenceOpacity;
```

Do not do this:

```ts
allCurrentDye *= 0.35;
```

That is the failure mode that made the full current disappear.

---

### 5. Seam current behavior

`createSeamCurrentSplats` should sample points along the S-curve seam.

Requirements:

- Sample 5 to 9 points depending on quality.
- Offset blue points to one side of the seam.
- Offset gold points to the opposite side.
- Move blue and gold in opposite tangent directions.
- Keep the current broad and soft, not line-like.
- Keep the current visible enough to define the yin-yang form.

Suggested implementation pattern:

```ts
function createSeamCurrentSplats(input: {
  time: number;
  config: FluidLiteConfig;
  disruption?: CurrentDisruption | null;
}): AutoCurrentSplat[] {
  const { time, config, disruption } = input;
  const count = config.yinYangCurrentSeamPointCount;
  const tiltRadians = (config.yinYangCurrentTiltDeg * Math.PI) / 180;
  const splats: AutoCurrentSplat[] = [];

  for (let i = 0; i < count; i += 1) {
    const u = count === 1 ? 0.5 : i / (count - 1);
    const seam = sampleYinYangSeam(u, {
      amplitude: config.yinYangCurrentSeamAmplitude,
      length: config.yinYangCurrentSeamLength,
      tiltRadians,
      fieldScale: config.yinYangCurrentFieldScale,
    });

    const phase = time * config.autoCurrentRotationSpeed + u;
    const pulse = 0.88 + Math.sin(phase * Math.PI * 2) * 0.12;
    const attenuation = localAttenuation(seam.x, seam.y, disruption);

    const laneOffset = config.yinYangCurrentLaneOffset;

    const blueX = seam.x + seam.normalX * laneOffset;
    const blueY = seam.y + seam.normalY * laneOffset;
    const goldX = seam.x - seam.normalX * laneOffset;
    const goldY = seam.y - seam.normalY * laneOffset;

    const baseDye =
      config.effectScale *
      config.autoCurrentDyeRate *
      config.yinYangCurrentDyeOpacity *
      pulse *
      attenuation;

    const velocity = config.autoCurrentStrength * 0.012 * pulse;

    splats.push({
      x: blueX,
      y: blueY,
      dx: seam.tangentX * velocity,
      dy: seam.tangentY * velocity,
      color: createCurrentColor('blue', config.yinYangCurrentColorSeparation),
      dyeAmount: baseDye,
    });

    splats.push({
      x: goldX,
      y: goldY,
      dx: -seam.tangentX * velocity,
      dy: -seam.tangentY * velocity,
      color: createCurrentColor('gold', config.yinYangCurrentColorSeparation),
      dyeAmount: baseDye * 0.92,
    });
  }

  return splats;
}
```

The exact field names can be adapted to the existing `AutoCurrentSplat` shape.

---

### 6. Eye eddy behavior

The circular eddies should be **larger and calmer** than the earlier implementation.

Requirements:

- They should be visible enough to read as intentional circular current formations.
- They should not become bright dots or hard circles.
- They should rotate gently in opposite directions.
- They should use lower velocity than the seam current.
- Their dye should be stronger than bridge/wavefront dye but not stronger than the central seam.

Suggested behavior:

```ts
function createEyeEddySplats(input: {
  time: number;
  config: FluidLiteConfig;
  disruption?: CurrentDisruption | null;
}): AutoCurrentSplat[] {
  const { time, config, disruption } = input;
  const tiltRadians = (config.yinYangCurrentTiltDeg * Math.PI) / 180;
  const splats: AutoCurrentSplat[] = [];

  const lanes: Array<'blue' | 'gold'> = ['blue', 'gold'];

  for (const lane of lanes) {
    const direction = lane === 'blue' ? 1 : -1;
    const phase = time * config.autoCurrentRotationSpeed * direction;

    const eye = sampleYinYangEyeEddy(lane, phase, {
      separation: config.yinYangCurrentEyeSeparation,
      radius: config.yinYangCurrentEyeRadius,
      tiltRadians,
      fieldScale: config.yinYangCurrentFieldScale,
    });

    const attenuation = localAttenuation(eye.x, eye.y, disruption);
    const eyeDye =
      config.effectScale *
      config.autoCurrentDyeRate *
      config.yinYangCurrentEyeStrength *
      config.yinYangCurrentEyeOpacity *
      attenuation;

    const eyeVelocity = config.autoCurrentStrength * 0.008;

    splats.push({
      x: eye.x,
      y: eye.y,
      dx: eye.tangentX * eyeVelocity * direction,
      dy: eye.tangentY * eyeVelocity * direction,
      color: createCurrentColor(lane, config.yinYangCurrentColorSeparation),
      dyeAmount: eyeDye,
    });
  }

  return splats;
}
```

The key change from the failed result is that eye eddies are not globally hidden. They are intentionally weighted above wavefront/turbulence.

---

### 7. Bridge and turbulence behavior

Keep bridge and disruption helpers, but reduce their contribution.

Bridge splats should connect lanes but not create visible blobs.

```ts
bridgeDye *= config.yinYangCurrentBridgeOpacity;
```

Disruption turbulence should be almost invisible until pointer interaction occurs.

```ts
turbulenceDye *= config.yinYangCurrentTurbulenceOpacity;
```

If pointer interaction is active, temporary turbulence can be stronger, but it should recover quickly.

---

### 8. Wavefront behavior

`wavefrontYinYangCurrent.ts` should complement the seam. It should not define the entire visible field.

Requirements:

- Use the same seam geometry helper as the auto current system.
- Keep points aligned with the S-curve.
- Reduce side ribbon visibility.
- Avoid large, bright outer currents that overpower the card.
- Keep lower point counts on mobile.

Recommended weighting:

```ts
wavefrontDye *= config.yinYangCurrentWavefrontOpacity;
wavefrontStrength *= config.yinYangCurrentWavefrontOpacity;
```

For desktop/high quality, the wavefront should be visible as soft atmosphere, not as the dominant current.

---

### 9. CSS fallback tuning

If WebGL is unsupported or reduced motion is active, fallback gradients should suggest a yin-yang field without overpowering the emblem.

This fallback is intentionally subtle. It is not expected to reproduce the full simulation.

```css
.fluidCanvasFallback {
  pointer-events: none;
  background:
    radial-gradient(circle at 36% 34%, rgba(126, 231, 242, 0.16), transparent 22%),
    radial-gradient(circle at 64% 66%, rgba(247, 201, 72, 0.11), transparent 20%),
    radial-gradient(ellipse at 34% 62%, rgba(126, 231, 242, 0.12), transparent 30%),
    radial-gradient(ellipse at 68% 38%, rgba(247, 201, 72, 0.08), transparent 30%),
    linear-gradient(135deg, rgba(3, 10, 17, 0.08), rgba(3, 10, 17, 0));
}
```

Do not modify emblem CSS in the fallback path.

---

## Implementation Steps

### Step 1: Add or verify geometry helper

Create or update `yinYangCurrentGeometry.ts` with pure seam and eye sampling utilities.

### Step 2: Add config fields

Extend `FluidLiteConfig` and all quality presets with the fields listed in this spec.

### Step 3: Replace global current visibility reduction

Find any global current reduction added by the previous implementation, such as:

```ts
allCurrentDye *= 0.35;
```

Replace it with per-role weights:

```ts
seamDye *= config.yinYangCurrentDyeOpacity;
eyeDye *= config.yinYangCurrentEyeOpacity;
bridgeDye *= config.yinYangCurrentBridgeOpacity;
wavefrontDye *= config.yinYangCurrentWavefrontOpacity;
turbulenceDye *= config.yinYangCurrentTurbulenceOpacity;
```

### Step 4: Make seam and eye eddies visible again

Apply the recommended high/medium/low values from this spec.

### Step 5: Reduce wavefront and side-current dominance

Tune `wavefrontYinYangCurrent.ts` so side ribbons no longer visually dominate the card.

### Step 6: Validate without changing emblem

Inspect the scene and confirm that no emblem/signature CSS or component props were changed.

### Step 7: Visual tuning pass

Tune values in this order:

1. `yinYangCurrentDyeOpacity`
2. `yinYangCurrentEyeOpacity`
3. `yinYangCurrentEyeRadius`
4. `yinYangCurrentSeamAmplitude`
5. `yinYangCurrentLaneOffset`
6. `yinYangCurrentWavefrontOpacity`
7. `yinYangCurrentBridgeOpacity`
8. `yinYangCurrentTurbulenceOpacity`

Do not tune emblem opacity, filters, or layer order.

---

## Testing Requirements

### Unit tests

Add tests for `yinYangCurrentGeometry.ts`:

- `clamp01` clamps values.
- `rotateAroundCenter` preserves distance from center.
- `sampleYinYangSeam(0.5)` returns a point near center.
- Seam endpoints stay inside `[0, 1]` after rotation.
- Blue/gold eye eddies are symmetric around the center within tolerance.

### Visual tests

Capture screenshots or recordings for:

- desktop cinematic fluid
- desktop high fluid
- tablet medium fluid
- mobile low fluid
- reduced-motion fallback
- WebGL unsupported fallback
- pointer disruption and recovery

### Performance checks

- No meaningful FPS drop on desktop compared to the current simulation.
- Mobile remains on low quality through existing quality selection.
- Reduced-motion still disables active simulation.
- No new memory leak from per-frame object creation beyond existing splat arrays.

---

## Acceptance Criteria

- The foreground emblem/signature remains completely unchanged.
- No CSS or component changes modify the emblem/signature opacity, filters, transforms, scale, asset, or layer order.
- The central S-curve current is visible enough to define the yin-yang motion.
- The current field is larger and more readable than the previous invisible implementation.
- The current field does not overpower the emblem like the earlier overly-visible implementation.
- Eye eddies are clearly visible as soft circular current formations, not tiny incidental wisps.
- Side ribbons and generic wavefront turbulence are quieter than the seam and eye eddies.
- Blue/cyan and gold/ivory currents remain distinct without muddy overlap.
- Mobile remains performant and visually calmer than desktop.
- Reduced-motion and fallback modes still work.
- Existing pointer interaction still disrupts and recovers the current.
- `pnpm lint` passes.
- `pnpm build` passes.
- New pure geometry helpers have unit coverage.

---

## Risks

### Risk: Current becomes too literal

If the S-curve and eye eddies become too sharp, the background may compete with the real emblem. Keep dye broad, soft, and moving.

### Risk: Current disappears again

Avoid global dye or opacity reductions. Always reduce secondary roles before reducing the seam and eye eddies.

### Risk: Side ribbons dominate again

Keep `yinYangCurrentWavefrontOpacity` significantly lower than `yinYangCurrentDyeOpacity` and `yinYangCurrentEyeOpacity`.

### Risk: Mobile becomes too busy

Mobile should use fewer seam points, weaker eye eddies, and lower dye force.

### Risk: Config drift

Avoid scattering constants across multiple files. Keep tuneable values in the config and keep geometry helpers pure.

---

## Rollback Plan

- Set `yinYangCurrentMode: 'orbital'` in all presets.
- Keep geometry helpers unused until retuned.
- Revert only wavefront weighting if the side ribbons disappear too much.
- Do not roll back by modifying the emblem layer.

---

## Developer Notes

This is a visual tuning PR with selective weighting, not a rewrite.

The most important implementation rule is:

```txt
Do not make the entire current field quieter.
Make the side/background currents quieter while keeping the central seam and eye eddies visible.
```

The second most important rule is:

```txt
Do not touch the emblem/signature layer.
```
