# Spec 0019: Wavefront-Guided Yin-Yang Hero Stabilization

## Status

proposed

## Owner

Jason Huang

## Last Updated

2026-05-26

## Depends On

- Spec 0018: Yin-Yang Fluid Hero Implementation

---

# 1. Purpose

The current hero implementation does not yet match the intended Yin-Yang Fluid Hero direction.

The previous implementation successfully moved toward a fluid-based hero, but the result is visually overexposed and structurally unstable:

```txt
large white fluid masses dominate the panel
the yin-yang S-current is not readable
the emblem is buried instead of embedded
blue and gold are present but not cleanly separated
the fluid reads more like blown-out light beams than transparent liquid glass
```

This spec defines a corrective pass focused on:

```txt
wavefront-guided current structure
controlled brightness
stable blue/gold ribbon separation
transparent liquid-glass compositing
emblem readability
reduced splat overdraw
```

The goal is not to make the fluid stronger.

The goal is to make the fluid more intentional.

---

# 2. Current Visual Problems

## 2.1 Overexposed fluid

Problem:

```txt
The fluid is clipping to pure white across large areas.
The white regions flatten the composition.
The liquid no longer feels transparent.
The emblem becomes hidden behind bright dye.
```

Likely causes:

```txt
dyeColorGain too high
activeDyeOpacity too high
dyeWriteScale too high
too many overlapping auto-current splats
bridge splats accumulating at the center
display shader allowing white clipping
CSS glow/haze adding extra brightness
```

## 2.2 Weak yin-yang readability

Problem:

```txt
The viewer cannot quickly read the S-shaped yin-yang current.
The current appears as several disconnected bright bands.
The lobes are too thick and too close to the panel edges.
The bridge is not acting like a controlled S-transition.
```

Likely causes:

```txt
auto-current splats are too large
bridge splats are too strong
velocity is not following a coherent S-shaped path
auto-current is trying to create structure using repeated blobs
```

## 2.3 Emblem not embedded correctly

Problem:

```txt
The emblem is not acting like a subtle submerged seal.
It is either covered by white fluid or competing with it.
```

Required direction:

```txt
The emblem should be faint, large, centered, and visible through the fluid.
The current should pass over it, but not erase it.
```

---

# 3. New Visual Target

The corrected hero should feel like:

```txt
a dark navy liquid-glass panel
a large faint gold calligraphic emblem under the fluid
two controlled translucent fluid ribbons
one ribbon is electric blue/cyan
one ribbon is gold/silver-white
the ribbons form a readable S-shaped yin-yang wavefront
the center has motion and depth, not a white explosion
the current is bright at the edges but transparent through the middle
```

The result should not look like:

```txt
white paint
giant light beams
smoke clouds
random glow blobs
a static yin-yang overlay
a plasma effect
```

---

# 4. High-Level Fix

Replace the current auto-current behavior with a **wavefront-guided current system**.

This means the simulation still creates the visual fluid, but the injection points are guided by an invisible mathematical path.

Use:

```txt
parametric S-curve
wavefront points moving along the curve
paired blue/gold ribbon injection
tangent velocity
limited dye write
brightness clamp
alpha falloff
center-safe compositing
```

Do not use:

```txt
visible SVG path
DOM yin-yang overlay
static white S-shape
giant Gaussian splats
unbounded additive glow
```

---

# 5. Wavefront Current Model

## 5.1 Why wavefronts help

A wavefront helps because the current needs an underlying flow structure.

The previous splat-only model is too unstable:

```txt
many splats + high dye gain = blown-out blobs
```

A wavefront model gives the simulation a controlled direction:

```txt
moving front + tangent velocity + bounded dye = readable ribbon
```

The wavefront should define where the fluid is injected, not what the final image looks like.

---

# 6. New Config Fields

Add these fields to the fluid config:

```ts
wavefrontEnabled: boolean;
wavefrontMode: "yinYang";
wavefrontPointCount: number;
wavefrontSpeed: number;
wavefrontRibbonWidth: number;
wavefrontSAmplitude: number;
wavefrontSLength: number;
wavefrontTangentStrength: number;
wavefrontCenterPull: number;
wavefrontDyeStrength: number;
wavefrontAlphaBias: number;
wavefrontColorSeparation: number;
wavefrontNoiseAmount: number;
wavefrontNoiseSpeed: number;
maxDyeLuminance: number;
whiteClipSoftness: number;
emblemRevealStrength: number;
```

Recommended cinematic values:

```ts
wavefrontEnabled: true,
wavefrontMode: "yinYang",

wavefrontPointCount: 18,
wavefrontSpeed: 0.045,
wavefrontRibbonWidth: 0.030,
wavefrontSAmplitude: 0.165,
wavefrontSLength: 0.62,
wavefrontTangentStrength: 0.42,
wavefrontCenterPull: 0.18,
wavefrontDyeStrength: 0.34,
wavefrontAlphaBias: 0.78,
wavefrontColorSeparation: 1.18,

wavefrontNoiseAmount: 0.018,
wavefrontNoiseSpeed: 0.20,

maxDyeLuminance: 0.82,
whiteClipSoftness: 0.18,
emblemRevealStrength: 0.28,
```

---

# 7. Reduce Existing Auto-Current Aggression

Update the cinematic preset.

Replace the current aggressive values:

```ts
autoCurrentStrength: 0.52,
autoCurrentDyeRate: 0.34,
autoCurrentSplatsPerSecond: 16,
autoCurrentBridgeStrength: 0.82,
dyeColorGain: 2.45,
activeDyeOpacity: 0.98,
dyeWriteScale: 0.62,
```

With safer values:

```ts
autoCurrentStrength: 0.26,
autoCurrentDyeRate: 0.18,
autoCurrentSplatsPerSecond: 8,
autoCurrentBridgeStrength: 0.34,

dyeColorGain: 1.58,
dyeChromaBoost: 1.22,
dyeContrast: 1.10,
baseWaterOpacity: 0.08,
activeDyeOpacity: 0.72,
dyeInjectionGain: 1.20,
dyeWriteScale: 0.28,
particleColorGain: 1.18,
```

Important:

```txt
Spec 0018 pushed strength up.
Spec 0019 intentionally pulls strength down and adds structure.
```

---

# 8. Implement Yin-Yang Wavefront Path

Create:

```txt
src/components/webgl/fluid-lite/wavefrontYinYangCurrent.ts
```

Suggested API:

```ts
export type WavefrontPoint = {
  x: number;
  y: number;
  dx: number;
  dy: number;
  radius: number;
  color: [number, number, number];
  force: number;
};

export function createYinYangWavefrontPoints(
  time: number,
  config: FluidLiteConfig
): WavefrontPoint[] {
  // returns invisible guided injection points
}
```

Use a normalized S-curve around the center:

```ts
const u = i / (pointCount - 1);
const centered = u - 0.5;

const x = 0.5 + centered * config.wavefrontSLength;
const y =
  0.5 +
  Math.sin(centered * Math.PI * 2) *
    config.wavefrontSAmplitude;
```

Rotate the curve slowly:

```ts
const rotation = time * config.wavefrontSpeed;
```

Add tangent velocity:

```ts
const tangentX = nextX - prevX;
const tangentY = nextY - prevY;
```

Use opposite color lanes:

```txt
upper/left wavefront: electric blue/cyan
lower/right wavefront: gold/silver-white
```

Add slight offset perpendicular to the S-curve so the two halves do not collapse into one white band.

---

# 9. Color Rules

Use stable color families.

```ts
const wavefrontColors = {
  blueCore: [0.05, 0.42, 1.0],
  cyanEdge: [0.25, 0.92, 1.0],
  goldCore: [1.0, 0.62, 0.18],
  silverEdge: [0.92, 0.90, 0.78],
};
```

Do not allow both halves to blend into pure white.

Avoid:

```txt
[1.0, 1.0, 1.0] as the main dye color
high white values across all channels
green color mixing
rapid hue cycling
```

Allowed:

```txt
small silver-white edge highlights
small cyan edge highlights
limited white glints from the shader
```

---

# 10. Display Shader Fixes

## 10.1 Add luminance clamp

In the display shader, clamp dye brightness before final output.

Suggested GLSL:

```glsl
float luminance = dot(color.rgb, vec3(0.2126, 0.7152, 0.0722));
float maxLum = uMaxDyeLuminance;

if (luminance > maxLum) {
  float compression = maxLum / max(luminance, 0.0001);
  color.rgb = mix(color.rgb, color.rgb * compression, uWhiteClipSoftness);
}
```

Recommended uniforms:

```ts
uMaxDyeLuminance: config.maxDyeLuminance
uWhiteClipSoftness: config.whiteClipSoftness
```

## 10.2 Avoid pure white slabs

Final color should not exceed:

```txt
large region luminance: 0.82
small glint luminance: 0.95
```

Do not globally output:

```glsl
vec3(1.0)
```

except for extremely small highlight accents.

## 10.3 Improve alpha curve

Replace hard alpha behavior with softer alpha:

```glsl
float dyeStrength = length(dye.rgb);

float alpha = mix(
  uBaseWaterOpacity,
  uActiveDyeOpacity,
  smoothstep(0.04, 0.72, dyeStrength)
);

alpha *= uWavefrontAlphaBias;
```

Recommended:

```txt
baseWaterOpacity: 0.08
activeDyeOpacity: 0.72
wavefrontAlphaBias: 0.78
```

---

# 11. Emblem Visibility Fix

The emblem should be visible but submerged.

CSS:

```css
.fluidSignatureSeal__emblem {
  position: relative;
  z-index: 1;
  opacity: 0.48;
  pointer-events: none;
  filter:
    drop-shadow(0 18px 42px rgba(0, 0, 0, 0.32))
    drop-shadow(0 0 14px rgba(247, 201, 72, 0.08));
}
```

Fluid canvas:

```css
.fluidSignatureSeal .fluidCanvas,
.fluidSignatureSeal .fluidCanvasFallback {
  z-index: 2;
  opacity: 0.92;
}
```

Important:

```txt
Do not solve emblem readability by moving the emblem above the fluid.
Do not solve fluid visibility by setting the canvas to full white opacity.
The correct fix is shader compositing.
```

---

# 12. Remove Extra Haze and Glow

Reduce any static visual layers that amplify brightness.

Audit and lower:

```txt
.heroSection__visual::before
.fluidSignatureSeal__waterGlass
.fluidSignatureSeal__glassSheen
canvas CSS filter
box-shadow intensity
mix-blend-mode: screen overlays
```

Recommended:

```css
.fluidSignatureSeal__glassSheen {
  opacity: 0.045;
  mix-blend-mode: screen;
}
```

Avoid:

```txt
large white radial gradients
strong screen overlays
blurred white pseudo-elements
canvas filter: brightness()
canvas filter: contrast() above 1.05
```

---

# 13. Interaction Behavior

Pointer interaction should remain, but should not destroy the composition.

Pointer splats:

```ts
pointerRadius: 0.035-0.050
pointerForce: 0.34-0.48
pointerDyeScale: 0.24-0.32
```

Click/tap splats:

```ts
clickRadius: 0.060-0.078
clickForce: 0.56-0.72
clickDyeScale: 0.36-0.46
```

Do not use one huge interaction splat.

Pointer behavior should:

```txt
bend the wavefront
disturb the S-current
create local ripples
recover naturally
```

Pointer behavior should not:

```txt
flood the panel
turn the current white
erase the emblem
spawn giant blobs
```

---

# 14. Acceptance Criteria

- [ ] Hero no longer contains large pure-white slabs.
- [ ] Fluid reads as transparent liquid glass, not light beams.
- [ ] S-shaped yin-yang current is readable within 1 second.
- [ ] Blue/cyan half is clearly distinguishable.
- [ ] Gold/silver half is clearly distinguishable.
- [ ] Blue and gold do not blend into green.
- [ ] White is limited to small highlights only.
- [ ] Emblem remains large, centered, faint, and visible.
- [ ] Fluid passes over the emblem without erasing it.
- [ ] Current is guided by simulation behavior, not a visible DOM overlay.
- [ ] Pointer/tap interaction disrupts the current without flooding the canvas.
- [ ] Static haze/glow layers are reduced.
- [ ] No rings, bubbles, pearls, droplets, or vertical Chinese text are reintroduced.
- [ ] Reduced-motion fallback still works.
- [ ] WebGL fallback still works.
- [ ] No new dependencies are added.
- [ ] `npm run build` passes.
- [ ] `npm run lint` passes or only fails because ESLint config is missing.

---

# 15. Codex Implementation Prompt

```txt
Implement Spec 0019: Wavefront-Guided Yin-Yang Hero Stabilization.

The current hero is overexposed. Large white fluid bands dominate the panel, the S-shaped yin-yang current is not readable, and the emblem is being covered instead of embedded.

The fix is not to make the fluid stronger. The fix is to make the current more structured and bounded.

Required changes:

1. Add a wavefront-guided yin-yang current system.
Create:
src/components/webgl/fluid-lite/wavefrontYinYangCurrent.ts

It should generate invisible injection points along a rotating S-shaped parametric curve. These points should feed the existing fluid simulation with tangent velocity and bounded dye.

2. Add config fields:
- wavefrontEnabled
- wavefrontMode
- wavefrontPointCount
- wavefrontSpeed
- wavefrontRibbonWidth
- wavefrontSAmplitude
- wavefrontSLength
- wavefrontTangentStrength
- wavefrontCenterPull
- wavefrontDyeStrength
- wavefrontAlphaBias
- wavefrontColorSeparation
- wavefrontNoiseAmount
- wavefrontNoiseSpeed
- maxDyeLuminance
- whiteClipSoftness
- emblemRevealStrength

Use recommended cinematic values from Spec 0019.

3. Reduce the existing auto-current strength.
Lower dyeColorGain, activeDyeOpacity, dyeWriteScale, autoCurrentStrength, autoCurrentDyeRate, autoCurrentSplatsPerSecond, and autoCurrentBridgeStrength.

The current result is too bright. Do not increase these values.

4. Update the display shader.
Add luminance compression so large dye regions cannot clip to pure white.
Use maxDyeLuminance and whiteClipSoftness uniforms.
White should appear only as small highlights, not large slabs.

5. Improve alpha behavior.
Use shader alpha, not CSS opacity, to preserve transparent liquid-glass behavior.
Use a softer smoothstep alpha curve.

6. Keep the emblem underneath the fluid.
Set emblem opacity around 0.48.
Do not move it above the canvas.
The fluid should pass over it, but the shader should not erase it.

7. Reduce static haze and screen overlays.
Audit CSS pseudo-elements and glass sheen layers.
Lower any white radial gradients, brightness filters, and screen overlays.

8. Preserve the simplified visual model.
Do not reintroduce rings, bubbles, pearls, droplets, vertical Chinese text, or DOM yin-yang overlays.

Acceptance:
- no large white slabs
- readable S-shaped yin-yang current
- clear blue/cyan half
- clear gold/silver half
- emblem visible and embedded
- fluid feels transparent and premium
- pointer/tap disrupts current without flooding the panel
- build passes
```

---

# 16. Done Definition

This corrective pass is complete when the hero feels like a controlled liquid-glass yin-yang current instead of a blown-out white fluid field.

The viewer should immediately read:

```txt
dark premium panel
faint gold emblem
blue/gold liquid current
yin-yang S-flow
transparent water-like motion
```
