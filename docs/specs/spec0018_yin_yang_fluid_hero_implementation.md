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

Personal portfolio hero visual, WebGL fluid simulation, embedded gold emblem, automatic yin-yang current, transparent liquid-glass rendering, and simplified single-region pointer interaction.

---

# 1. Purpose

This spec defines the implementation direction for the portfolio hero visual based on the approved reference image.

The hero should become a polished **Yin-Yang Fluid Hero**:

```txt
large centered gold emblem
dark navy rounded hero panel
no rings
no bubbles
no vertical Chinese text
one continuous WebGL fluid simulation
electric-blue/cyan half
gold/silver/white half
clear S-shaped yin-yang current
fluid visibly passing over the emblem
subtle micro-particles
premium liquid-glass finish
```

This spec intentionally replaces the earlier ring/reactor/bubble direction with a cleaner and more custom fluid-signature composition.

---

# 2. Final Visual Direction

The final hero should look like the reference image:

```txt
a large gold calligraphic emblem suspended inside a dark liquid-glass panel
a continuous yin-yang fluid current wraps around and over the emblem
one half of the current is electric blue / cyan
the other half is gold / silver / soft white
the current forms a clear S-shape
the fluid is bright and readable but still transparent
the emblem remains large, centered, and premium
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
  fluidOpacity = 0.96,
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

The gold emblem should be:

```txt
large
centered
dominant
embedded under/inside the fluid
visible through the fluid
not pushed too far back
not hidden by the current
```

Recommended:

```css
.fluidSignatureSeal__emblem {
  z-index: 1;
  opacity: 0.90;
  pointer-events: none;
}
```

## 7.3 Fluid layer

The fluid layer should sit above the emblem.

Recommended:

```css
.fluidSignatureSeal .fluidCanvas,
.fluidSignatureSeal .fluidCanvasFallback {
  z-index: 2;
  opacity: var(--fluid-layer-opacity, 0.96);
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
  electricBlue: [0.10, 0.46, 1.0],
  cyan: [0.54, 0.94, 1.0],
  gold: [1.0, 0.76, 0.20],
  silverWhite: [0.92, 0.94, 0.90],
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
userDisruptionStrength: number;
userDisruptionRecoverySeconds: number;
```

Recommended cinematic values:

```ts
autoCurrentEnabled: true,
autoCurrentStrength: 0.32,
autoCurrentRadius: 0.17,
autoCurrentRotationSpeed: 0.032,
autoCurrentRecoverySpeed: 0.65,
autoCurrentDyeRate: 0.16,
autoCurrentLobeRadius: 0.026,
autoCurrentLobeSpread: 0.052,
autoCurrentCenterPull: 0.16,
autoCurrentSplatsPerSecond: 10,
userDisruptionStrength: 1.0,
userDisruptionRecoverySeconds: 3.8,
```

Important:

```txt
autoCurrentRadius should stay near center.
Do not push lobes to the left/right edges.
```

---

# 10. S-Shape Current Construction

The S-shape should not be drawn as a static overlay.

Use simulation-level behavior:

```txt
paired auto-current splats
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

const yin = {
  x: 0.5 + Math.cos(angle) * config.autoCurrentRadius,
  y: 0.5 + Math.sin(angle) * config.autoCurrentRadius,
};

const yang = {
  x: 0.5 - Math.cos(angle) * config.autoCurrentRadius,
  y: 0.5 - Math.sin(angle) * config.autoCurrentRadius,
};
```

## 10.2 Bridge splats

Add 2–4 soft bridge splats near the center so the current looks continuous.

Bridge splats should:

```txt
connect the two lobes
create the S-shaped transition
use low force
use low dye
use blue-white and gold-white accents
stay close to center
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
auto-current lobe: 0.026-0.040
bridge lobe: 0.020-0.034
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
particleColorGain: number;
```

Recommended cinematic values:

```ts
dyeColorGain: 1.85,
dyeChromaBoost: 1.34,
dyeContrast: 1.18,
baseWaterOpacity: 0.18,
activeDyeOpacity: 0.90,
dyeInjectionGain: 1.38,
particleColorGain: 1.30,
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
particleColorGain: 1.25-1.35,
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
  --fluid-layer-opacity: 0.96;
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
  opacity: 0.90;
  pointer-events: none;
  filter:
    drop-shadow(0 18px 42px rgba(0, 0, 0, 0.36))
    drop-shadow(0 0 24px rgba(247, 201, 72, 0.16));
}

.fluidSignatureSeal .fluidCanvas,
.fluidSignatureSeal .fluidCanvasFallback {
  z-index: 2;
  opacity: var(--fluid-layer-opacity, 0.96);
  inset: calc(var(--fluid-field-bleed, 44px) * -1);
  pointer-events: none;
}

.fluidSignatureSeal__glassSheen {
  position: absolute;
  inset: 0;
  z-index: 3;
  pointer-events: none;
  opacity: 0.10;
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
  autoCurrentStrength: 0.32,
  autoCurrentRadius: 0.17,
  autoCurrentRotationSpeed: 0.032,
  autoCurrentDyeRate: 0.16,
  autoCurrentLobeRadius: 0.026,
  autoCurrentLobeSpread: 0.052,
  autoCurrentCenterPull: 0.16,
  autoCurrentSplatsPerSecond: 10,

  dyeColorGain: 1.85,
  dyeChromaBoost: 1.34,
  dyeContrast: 1.18,
  baseWaterOpacity: 0.18,
  activeDyeOpacity: 0.90,
  dyeInjectionGain: 1.38,
}
```

Mobile should downgrade to medium/low.

Reduced motion should render fallback.

---

# 17. Acceptance Criteria

- [ ] Hero visually matches the reference direction.
- [ ] Gold emblem remains large and centered.
- [ ] No rings are rendered.
- [ ] No bubbles/pearls/droplets are rendered.
- [ ] No vertical Chinese text is rendered in the hero visual.
- [ ] Fluid forms a clear S-shaped yin-yang current.
- [ ] Blue/cyan half is clearly visible.
- [ ] Gold/silver/white half is clearly visible.
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
Implement Spec 0018: Yin-Yang Fluid Hero Implementation.

Reference:
Use /mnt/data/mystic_emblem_in_glowing_harmony.png as the visual direction. The final hero should keep a large centered gold emblem and a dark rounded hero panel, but remove rings, bubbles, pearls, droplets, haze, and vertical Chinese text. The fluid simulation should form a clear S-shaped yin-yang current with electric blue/cyan on one side and gold/silver/white on the other. The fluid should visibly pass over the emblem.

Required component changes:
1. Use a simplified FluidSignatureSeal component.
2. Keep HeroFluidSimulationPanel as a wrapper if needed.
3. Markup should include only:
   - SignatureEmblem
   - FluidCanvas
   - optional glass sheen
4. Remove all ring/bubble/pearl/droplet DOM spans.
5. Remove ChineseAccentText from the hero visual component.
6. All visual layers use pointer-events: none.

Required fluid behavior:
7. Add/keep autonomous yin-yang current.
8. Current should be centered near the emblem, not detached at the edges.
9. Current should form a clear S-shape.
10. Current should slowly rotate around center.
11. User pointer/tap anywhere displaces and interrupts the current.
12. Current recovers naturally after 3-4 seconds.
13. No safe-zone early return; center and emblem area are interactive.

Auto-current tuning:
- autoCurrentStrength: around 0.32
- autoCurrentRadius: around 0.17
- autoCurrentRotationSpeed: around 0.032
- autoCurrentDyeRate: around 0.16
- autoCurrentLobeRadius: around 0.026
- autoCurrentLobeSpread: around 0.052
- autoCurrentCenterPull: around 0.16
- autoCurrentSplatsPerSecond: around 10

S-shape construction:
14. Use paired lobe splats plus bridge splats near center.
15. Bridge splats should connect the two lobes into a clear S-shaped current.
16. Do not draw a static S-curve overlay.

Color:
17. Remove green-dominant current.
18. Use electric blue/cyan and gold/silver/white.
19. Use stronger dye colors:
   electricBlue: [0.10, 0.46, 1.0]
   cyan: [0.54, 0.94, 1.0]
   gold: [1.0, 0.76, 0.20]
   silverWhite: [0.92, 0.94, 0.90]

Display shader:
20. Increase dye color gain/chroma enough so fluid is visible.
21. Use shader alpha for transparency, not low CSS opacity.
22. Fluid should visibly pass over emblem.
23. Avoid broad light beams and dim haze.

Recommended cinematic quality:
- simResolution: 192
- dyeResolution: 768
- pressureIterations: 20
- diffusionIterations: 4
- particleCount: around 280
- simulationFps: 45
- maxDpr: 1.2
- interactionRadiusScale: 5
- fieldBleedPx: 44
- dyeColorGain: 1.85
- dyeChromaBoost: 1.34
- dyeContrast: 1.18
- baseWaterOpacity: 0.18
- activeDyeOpacity: 0.90
- dyeInjectionGain: 1.38

CSS:
24. Remove/disable ring/bubble/pearl/droplet styles.
25. Use .fluidSignatureSeal as the hero visual root.
26. Set --fluid-layer-opacity around 0.96 desktop.
27. Keep field bleed around 44px.
28. Keep emblem z-index below fluid canvas.
29. Keep optional glass sheen very subtle.

Constraints:
- no new dependencies
- one hero Canvas
- no full-page WebGL
- no postprocessing bloom
- no rings
- no bubbles
- no green-heavy fluid
- no vertical Chinese text in hero visual
- mobile downgrades quality
- reduced motion uses fallback

Verification:
- npm run build
- npm run lint or document missing ESLint config
- visually compare against the reference image
- verify no rings/bubbles/text remain
- verify S-shaped yin-yang current is clear
- verify blue and gold/silver halves are visible
- verify fluid passes over emblem
- verify pointer/tap anywhere displaces current
- verify current recovers
- verify reduced-motion fallback
```

---

# 20. Done Definition

This spec is complete when:

```txt
the hero resembles the generated reference image
the emblem is large and centered
the fluid creates a clear electric-blue and gold/silver yin-yang S-current
there are no rings, bubbles, or vertical Chinese text
the fluid visibly flows over the emblem
the user can disrupt the current anywhere
the result feels premium, custom, and portfolio-ready
```
