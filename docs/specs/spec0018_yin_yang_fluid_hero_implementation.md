# Spec 0018: Yin-Yang Fluid Hero Implementation

## Status

proposed

## Owner

Jason Huang

## Last Updated

2026-05-26

## Reference Image

Generated hero direction:

```txt
/mnt/data/mystic_emblem_in_glowing_harmony.png
```

## Target Area

Personal portfolio hero visual, WebGL fluid simulation, embedded/faint gold emblem, automatic yin-yang current, separated blue and gold/silver fluid halves, transparent liquid-glass rendering, and simplified single-region pointer interaction.

---

# 1. Purpose

This spec defines the implementation direction for the portfolio hero visual based on the approved reference image and the latest visual feedback.

The hero should become a polished **Yin-Yang Fluid Hero**:

```txt
large centered gold emblem
emblem is more faint / embedded
dark navy rounded hero panel
no rings
no bubbles
no vertical Chinese text
one continuous WebGL fluid simulation
electric-blue/cyan half
gold/silver/white half
clear S-shaped yin-yang current
two halves are visibly separated but still connected
fluid visibly passing over the emblem
subtle micro-particles
premium liquid-glass finish
```

This spec intentionally replaces the earlier ring/reactor/bubble direction with a cleaner and more custom fluid-signature composition.

---

# 2. Final Visual Direction

The final hero should look like the reference image, with two important refinements:

```txt
1. The emblem should be more faint and embedded so the current can become the hero.
2. The blue and gold/silver halves should have more separation so the yin-yang shape reads clearly.
```

The final result should feel like:

```txt
a large gold calligraphic emblem suspended under a transparent liquid-glass layer
a continuous yin-yang fluid current flowing over the emblem
one current half is electric blue / cyan
the other current half is gold / silver / soft white
the current forms a clear S-shape
the halves are not collapsed too close together
the fluid is bright and readable but still transparent
the emblem remains large and centered, but no longer visually overpowers the current
```

The visual should not include:

```txt
rings
bubbles
pearls
droplets
reactor nodes
vertical Chinese text
green fluid
generic haze
separate side blobs
UI control-looking overlays
```

---

# 3. Design Goals

## 3.1 Primary goal

Create a signature hero visual that feels custom to the brand instead of a generic portfolio animation.

The hero should communicate:

```txt
premium design taste
technical frontend skill
water-inspired brand identity
Chinese calligraphic influence
calm but impressive motion
```

## 3.2 Interaction goal

The fluid should animate automatically, but user interaction should affect it.

Behavior:

```txt
without interaction:
  autonomous yin-yang current rotates slowly around the emblem

with pointer/tap:
  user splats displace and interrupt the current

after interaction:
  current recovers naturally over a few seconds
```

## 3.3 Visual quality goal

The fluid should feel like:

```txt
liquid glass
dye in water
electric-blue current
gold/silver current
transparent refraction layer
```

Not:

```txt
flat glow
light beam
smoke blob
particle storm
rainbow shader
green aurora
```

---

# 4. Scope

Implement only the hero visual system.

In scope:

```txt
HeroFluidSimulationPanel
FluidSignatureSeal or equivalent component
FluidCanvas
WebGL fluid simulation config
auto yin-yang current
display shader tuning
pointer splats
CSS hero visual cleanup
reference-driven docs
```

Out of scope:

```txt
project card redesign
page layout rewrite
navigation rewrite
CTA redesign
new route structure
new npm dependencies
postprocessing bloom
full-page WebGL background
```

---

# 5. Component Direction

## 5.1 Preferred component name

Use:

```txt
FluidSignatureSeal
```

or keep:

```txt
HeroFluidSimulationPanel
```

as a compatibility wrapper.

Recommended:

```tsx
export function HeroFluidSimulationPanel(props: HeroFluidSimulationPanelProps) {
  return <FluidSignatureSeal {...props} />;
}
```

## 5.2 Markup

The markup should be minimal.

```tsx
export function FluidSignatureSeal({
  quality = "cinematic",
  fluidOpacity = 1,
  fieldBleed = 44,
}: FluidSignatureSealProps) {
  return (
    <div
      className="fluidSignatureSeal"
      style={{
        "--fluid-layer-opacity": fluidOpacity,
        "--fluid-field-bleed": `${fieldBleed}px`,
      } as React.CSSProperties}
    >
      <div className="fluidSignatureSeal__clip" aria-hidden="true">
        <SignatureEmblem className="fluidSignatureSeal__emblem" />

        <FluidCanvas
          quality={quality}
          opacity={fluidOpacity}
          bleed={fieldBleed}
        />

        <span className="fluidSignatureSeal__glassSheen" />
      </div>
    </div>
  );
}
```

Do not render:

```txt
ring spans
bubble spans
pearl spans
droplet spans
vertical Chinese text
visible yin-yang SVG
```

---

# 6. HeroSection Integration

Update the existing hero visual area to use the simplified component.

```tsx
<div className="heroSection__visual" aria-hidden="true">
  <HeroFluidSimulationPanel />
</div>
```

Do not rewrite:

```txt
hero copy
hero CTAs
section layout
Reveal wrappers
Magnetic wrappers
SealStampCTA behavior
```

---

# 7. Visual Composition Requirements

## 7.1 Panel

The panel should remain a large rounded rectangle.

Requirements:

```txt
dark navy background
subtle border
soft glass depth
no generic smoky haze
no obvious grid over the fluid
```

## 7.2 Emblem

The gold emblem should remain large and centered, but it should become more faint and embedded.

Current problem:

```txt
the emblem dominates too much
the current appears behind the emblem
the current does not visibly pass over the emblem enough
```

Required behavior:

```txt
emblem stays large and centered
emblem opacity is reduced
emblem appears under/inside the fluid
fluid visibly passes over the emblem
emblem remains readable but does not overpower the current
```

Recommended CSS:

```css
.fluidSignatureSeal__emblem {
  position: relative;
  z-index: 1;
  opacity: 0.58;
  pointer-events: none;
  filter:
    drop-shadow(0 18px 42px rgba(0, 0, 0, 0.28))
    drop-shadow(0 0 18px rgba(247, 201, 72, 0.10));
}
```

Acceptable tuning range:

```txt
emblem opacity: 0.52-0.68
```

Do not go below `0.48` unless the emblem remains clearly identifiable.

## 7.3 Fluid layer

The fluid layer should sit above the emblem and should be visually stronger.

Recommended:

```css
.fluidSignatureSeal .fluidCanvas,
.fluidSignatureSeal .fluidCanvasFallback {
  z-index: 2;
  opacity: var(--fluid-layer-opacity, 1);
}
```

The shader should control transparency. Avoid using low CSS opacity to mute the entire canvas.

## 7.4 Glass sheen

A single very subtle glass sheen is allowed.

Do not add decorative rings or bubbles.

---

# 8. Color Direction

Use this palette:

```ts
const heroFluidColors = {
  electricBlue: [0.05, 0.42, 1.35],
  cyan: [0.35, 0.95, 1.25],
  gold: [1.35, 0.82, 0.24],
  silverWhite: [1.0, 0.98, 0.88],
  deepNavy: [0.01, 0.03, 0.07],
};
```

Do not use green as a major color.

The visual split should be:

```txt
blue/cyan half
gold/silver/white half
```

Gold/silver should feel luminous and metallic, not yellow smoke.

Blue should feel electric and fluid, not neon plasma.

---

# 9. Automatic Yin-Yang Current

## 9.1 Purpose

The fluid simulation should automatically generate the S-shaped yin-yang current.

This current should be visible without user interaction.

The current should be generated by WebGL simulation behavior, not DOM overlays.

## 9.2 Required behavior

```txt
two opposing fluid currents orbit around center
currents form a clear S-shaped yin-yang flow
blue/cyan current occupies one lobe
gold/silver/white current occupies the other lobe
current slowly rotates around the center
current is centered around the emblem
current is not detached at panel edges
current halves are separated enough to read as two halves
```

## 9.3 Config fields

Add or keep:

```ts
autoCurrentEnabled: boolean;
autoCurrentStrength: number;
autoCurrentRadius: number;
autoCurrentRotationSpeed: number;
autoCurrentRecoverySpeed: number;
autoCurrentDyeRate: number;
autoCurrentLobeRadius: number;
autoCurrentLobeSpread: number;
autoCurrentCenterPull: number;
autoCurrentSplatsPerSecond: number;
autoCurrentBridgeCount: number;
autoCurrentBridgeStrength: number;
autoCurrentHalfSeparation: number;
userDisruptionStrength: number;
userDisruptionRecoverySeconds: number;
dyeWriteScale: number;
```

Recommended cinematic values:

```ts
autoCurrentEnabled: true,
autoCurrentStrength: 0.52,
autoCurrentRadius: 0.20,
autoCurrentRotationSpeed: 0.022,
autoCurrentRecoverySpeed: 0.65,
autoCurrentDyeRate: 0.34,
autoCurrentLobeRadius: 0.044,
autoCurrentLobeSpread: 0.060,
autoCurrentCenterPull: 0.26,
autoCurrentSplatsPerSecond: 16,
autoCurrentBridgeCount: 7,
autoCurrentBridgeStrength: 0.82,
autoCurrentHalfSeparation: 1.22,
userDisruptionStrength: 1.0,
userDisruptionRecoverySeconds: 3.8,
dyeWriteScale: 0.62,
```

Important:

```txt
autoCurrentRadius should be large enough that the halves do not collapse together.
autoCurrentRadius should still stay near center and should not push lobes to the left/right panel edges.
```

Recommended tuning range:

```txt
autoCurrentRadius: 0.18-0.24
autoCurrentLobeSpread: 0.052-0.070
autoCurrentHalfSeparation: 1.12-1.35
```

---

# 10. S-Shape Current Construction

The S-shape should not be drawn as a static overlay.

Use simulation-level behavior:

```txt
paired auto-current splats
more separated lobe centers
bridge splats near center
tangent velocity
center pull
advection
pressure projection
dye dispersion
```

## 10.1 Paired lobe splats

At time `t`:

```ts
const angle = t * config.autoCurrentRotationSpeed * Math.PI * 2;
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

## 10.2 Bridge splats

Add 7-9 soft bridge splats near the center so the current looks continuous.

Bridge splats should:

```txt
connect the two lobes
create the S-shaped transition
use low-to-medium force
use visible dye
use blue-white and gold-white accents
stay close to center
avoid looking like a drawn static line
```

## 10.3 Direction

The current should feel like it wraps around the emblem.

Use:

```txt
clockwise tangent for one side
counter-clockwise tangent for the other side
subtle center pull
```

---

# 11. User Interaction

## 11.1 Single region

The entire hero fluid panel should be interactive.

No special regions.

Remove/avoid:

```txt
emblem-core region
ring region
basin region
dead center
safe-zone early return
```

## 11.2 Pointer/tap behavior

```txt
pointer movement injects fluid
click/tap injects stronger fluid
interaction can happen over the emblem
interaction displaces the auto current
current recovers after a few seconds
```

## 11.3 Disruption logic

Track the latest user interaction:

```ts
type CurrentDisruption = {
  x: number;
  y: number;
  startedAt: number;
  strength: number;
};
```

During auto-current generation:

```txt
attenuate or bend current near disruption point
add local turbulence
recover smoothly over 3-4 seconds
```

Do not globally stop the auto-current.

---

# 12. Radius and Splat Behavior

The reference image shows strong, visible fluid ribbons.

The radius should be larger than the previous tiny splats but must avoid blob behavior.

Use multi-lobe splats:

```txt
pointer movement: 3-5 lobes
click/tap: 5-7 lobes
auto-current: small repeated lobes + bridge splats
```

Recommended effective radius:

```txt
pointer: 0.045-0.060
click/tap: 0.075-0.100
auto-current lobe: 0.038-0.056
bridge lobe: 0.026-0.040
```

Do not use one giant Gaussian blob.

Keep squared-radius math in the splat shader:

```glsl
float radius = max(uRadius, 0.0001);
float splat = exp(-dot(p, p) / (radius * radius));
```

---

# 13. Display Shader

## 13.1 Goal

The display shader should make the fluid colorful and transparent.

It should not flatten the current into a dim blue haze.

## 13.2 Required config

Use or add:

```ts
dyeColorGain: number;
dyeChromaBoost: number;
dyeContrast: number;
baseWaterOpacity: number;
activeDyeOpacity: number;
dyeInjectionGain: number;
dyeWriteScale: number;
particleColorGain: number;
```

Recommended cinematic values:

```ts
dyeColorGain: 2.45,
dyeChromaBoost: 1.48,
dyeContrast: 1.24,
baseWaterOpacity: 0.10,
activeDyeOpacity: 0.98,
dyeInjectionGain: 1.85,
dyeWriteScale: 0.62,
particleColorGain: 1.42,
```

## 13.3 Alpha

Use shader alpha to manage transparency.

Recommended:

```glsl
float alpha = mix(
  uBaseWaterOpacity,
  uActiveDyeOpacity,
  smoothstep(0.02, 0.62, dyeStrength)
);
```

Remove or greatly reduce center alpha protection.

Replace:

```glsl
alpha *= mix(0.88, 1.0, centerProtect);
```

with:

```glsl
alpha *= mix(0.99, 1.0, centerProtect);
```

or remove it entirely if the emblem remains readable.

Do not rely on low CSS opacity for transparency.

---

# 14. Particles

The reference image suggests very subtle particles and streaks.

Use:

```txt
micro-particles
very fine suspended dust
subtle motion trails
no bubbles
no obvious dots
no star field
```

Recommended:

```ts
particleCount: 220-320,
particleSize: 1.2-1.8,
particleOpacity: 0.20-0.30,
particleColorGain: 1.35-1.50,
```

Particles should support the fluid motion, not dominate it.

---

# 15. CSS Cleanup

Update `src/index.css`.

Remove or disable styles for:

```txt
rings
bubbles
pearls
droplets
vertical Chinese text inside hero visual
reactor nodes
ambient orbit circles
```

Use:

```css
.fluidSignatureSeal {
  --fluid-layer-opacity: 1;
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
  opacity: 0.58;
  pointer-events: none;
  filter:
    drop-shadow(0 18px 42px rgba(0, 0, 0, 0.28))
    drop-shadow(0 0 18px rgba(247, 201, 72, 0.10));
}

.fluidSignatureSeal .fluidCanvas,
.fluidSignatureSeal .fluidCanvasFallback {
  z-index: 2;
  opacity: var(--fluid-layer-opacity, 1);
  inset: calc(var(--fluid-field-bleed, 44px) * -1);
  pointer-events: none;
}

.fluidSignatureSeal__glassSheen {
  position: absolute;
  inset: 0;
  z-index: 3;
  pointer-events: none;
  opacity: 0.08;
  mix-blend-mode: screen;
}
```

If `ChineseAccentText` is still rendered inside the hero visual, remove it from this component.

---

# 16. Quality Preset

Use or add a cinematic preset.

Recommended:

```ts
cinematic: {
  simResolution: 192,
  dyeResolution: 768,
  pressureIterations: 20,
  diffusionIterations: 4,
  particleCount: 280,
  simulationFps: 45,
  maxDpr: 1.2,

  maxActiveSplats: 10,
  maxSplatsPerSecond: 10,

  interactionRadiusScale: 5,
  fieldBleedPx: 44,

  autoCurrentEnabled: true,
  autoCurrentStrength: 0.52,
  autoCurrentRadius: 0.20,
  autoCurrentRotationSpeed: 0.022,
  autoCurrentDyeRate: 0.34,
  autoCurrentLobeRadius: 0.044,
  autoCurrentLobeSpread: 0.060,
  autoCurrentCenterPull: 0.26,
  autoCurrentSplatsPerSecond: 16,
  autoCurrentBridgeCount: 7,
  autoCurrentBridgeStrength: 0.82,
  autoCurrentHalfSeparation: 1.22,

  dyeColorGain: 2.45,
  dyeChromaBoost: 1.48,
  dyeContrast: 1.24,
  baseWaterOpacity: 0.10,
  activeDyeOpacity: 0.98,
  dyeInjectionGain: 1.85,
  dyeWriteScale: 0.62,
  particleColorGain: 1.42,

  userDisruptionStrength: 1.0,
  userDisruptionRecoverySeconds: 3.8,
}
```

Mobile should downgrade to medium/low.

Reduced motion should render fallback.

---

# 17. Acceptance Criteria

- [ ] Hero visually matches the reference direction.
- [ ] Gold emblem remains large and centered.
- [ ] Gold emblem is more faint / embedded than before.
- [ ] Fluid current has stronger visual priority than the emblem.
- [ ] No rings are rendered.
- [ ] No bubbles/pearls/droplets are rendered.
- [ ] No vertical Chinese text is rendered in the hero visual.
- [ ] Fluid forms a clear S-shaped yin-yang current.
- [ ] Blue/cyan half is clearly visible.
- [ ] Gold/silver/white half is clearly visible.
- [ ] The two halves are more separated and do not collapse into one small center patch.
- [ ] No green-dominant current remains.
- [ ] Fluid visibly passes over the emblem.
- [ ] The center is interactive.
- [ ] Pointer/tap anywhere displaces the fluid.
- [ ] Current recovers after user interaction.
- [ ] Fluid remains transparent and premium.
- [ ] Micro-particles are subtle, not bubble-like.
- [ ] Reduced-motion fallback works.
- [ ] WebGL fallback works.
- [ ] No new dependencies are added.
- [ ] Build passes.
- [ ] Lint either passes or fails only because ESLint config is missing.

---

# 18. Non-Goals

Do not implement:

```txt
DOM yin-yang overlay
rings
bubbles
pearls
droplets
green fluid
region interaction model
postprocessing bloom
full-page WebGL
new dependencies
hero copy rewrite
```

---

# 19. Codex Implementation Prompt

```txt
Implement the updated Spec 0018: Yin-Yang Fluid Hero Implementation.

Current issue:
The hero is structurally correct but the emblem is still visually too dominant, the fluid current is still too faint, and the blue/gold halves are too close together. The goal is to make the emblem more faint/embedded while increasing current visibility and separating the yin-yang halves.

Reference direction:
Large centered gold emblem under a transparent fluid layer. Strong electric-blue/cyan current on one side and gold/silver/white current on the other side. A clearly readable S-shaped yin-yang flow passes over the emblem. No rings, bubbles, vertical Chinese text, or green-dominant fluid.

Files likely to update:
- src/components/brand/FluidSignatureSeal.tsx
- src/components/webgl/fluid-lite/fluidLiteConfig.ts
- src/components/webgl/fluid-lite/autoYinYangCurrent.ts
- src/components/webgl/fluid-lite/FluidSimulationController.tsx
- src/components/webgl/fluid-lite/shaders/display.ts
- src/index.css

Required changes:

1. Make emblem more faint.
Set .fluidSignatureSeal__emblem opacity around 0.52-0.68.
Recommended: 0.58.
Keep it large and centered.
Keep it below the fluid canvas.
Do not move it above the fluid.

2. Make fluid more visible.
Ensure .fluidCanvas opacity is around 1.
Let the display shader manage transparency.
Increase cinematic dye visibility:
- dyeColorGain: 2.35-2.55
- dyeChromaBoost: 1.42-1.52
- dyeContrast: 1.20-1.28
- baseWaterOpacity: 0.08-0.14
- activeDyeOpacity: 0.94-0.99
- dyeInjectionGain: 1.7-1.95
- particleColorGain: 1.35-1.50

3. Add dyeWriteScale.
Add dyeWriteScale to FluidLiteConfig.
Use it in FluidSimulationController instead of the hardcoded dye write multiplier.

Replace:
splat(targets.dye, splatData, dyeColor, 0.26 * force);

With:
splat(targets.dye, splatData, dyeColor, config.dyeWriteScale * force);

Recommended:
- cinematic dyeWriteScale: 0.62
- high dyeWriteScale: 0.52
- medium dyeWriteScale: 0.40
- low dyeWriteScale: 0.32

4. Separate the yin-yang halves more.
The two halves are currently too close.
Increase auto-current spacing but keep it centered:
- cinematic autoCurrentRadius: 0.18-0.24
- recommended: 0.20
- autoCurrentHalfSeparation: 1.12-1.35
- recommended: 1.22
- autoCurrentLobeSpread: 0.052-0.070
- recommended: 0.060

Do not push the halves to the panel edges.

5. Strengthen the auto-current.
Recommended cinematic values:
- autoCurrentStrength: 0.48-0.58
- recommended: 0.52
- autoCurrentDyeRate: 0.30-0.40
- recommended: 0.34
- autoCurrentLobeRadius: 0.038-0.056
- recommended: 0.044
- autoCurrentCenterPull: 0.22-0.34
- recommended: 0.26
- autoCurrentSplatsPerSecond: 14-18
- recommended: 16
- autoCurrentRotationSpeed: 0.018-0.026
- recommended: 0.022

6. Make the S-bridge stronger.
Add config:
- autoCurrentBridgeCount
- autoCurrentBridgeStrength

Recommended:
- autoCurrentBridgeCount: 7
- autoCurrentBridgeStrength: 0.82

Use 7-9 bridge splats near the center.
Bridge splats should connect the blue/gold halves into a readable S-shape.
They should not look like a static drawn line.

7. Use stable blended colors.
Do not switch colors over time using sin/cos.
Use stable colors:
- yin = blended electricBlue + cyan
- yang = blended gold + silverWhite

Do not use green as a major fluid color.

8. Reduce center alpha protection.
In display.ts, replace:
alpha *= mix(0.88, 1.0, centerProtect);

With:
alpha *= mix(0.99, 1.0, centerProtect);

Or remove the center protection if the emblem remains readable.

9. Reduce static haze.
Lower or remove:
- .fluidSignatureSeal__waterGlass intensity
- .heroSection__visual::before intensity

The fluid simulation should create the visible motion and color.

10. Preserve simplified visual model.
Do not reintroduce:
- rings
- bubbles
- pearls
- vertical Chinese text
- region logic
- safe-zone early return
- DOM yin-yang overlay

Acceptance:
- emblem is clearly more faint/embedded
- fluid current is visibly stronger
- blue/gold halves are more separated
- S-shaped yin-yang current is readable
- fluid visibly passes over the emblem
- no rings/bubbles/text return
- pointer/tap anywhere disrupts current
- npm run build passes
- npm run lint either passes or fails only because ESLint config is missing
```

---

# 20. Done Definition

This spec is complete when:

```txt
the hero resembles the generated reference image
the emblem is large, centered, and faint enough to sit under the fluid
the fluid current visually dominates over the emblem
the blue and gold/silver halves are clearly separated
the fluid creates a clear electric-blue and gold/silver yin-yang S-current
there are no rings, bubbles, or vertical Chinese text
the user can disrupt the current anywhere
the result feels premium, custom, and portfolio-ready
```
