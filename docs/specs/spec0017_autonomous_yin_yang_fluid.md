# Spec 0017: Autonomous Yin-Yang Fluid Current — No Rings, No Bubbles

## Status

proposed

## Owner

Jason Huang

## Last Updated

2026-05-26

## Related Specs


## Target Area

Hero WebGL fluid simulation, visual simplification, automatic yin-yang current, continuous rotating fluid field, interaction interruption/displacement, removal of DOM rings and bubbles.

---

# 1. Purpose

The current hero still has decorative elements that distract from the fluid simulation.

This spec removes those distractions and makes the WebGL fluid itself carry the visual identity.

Required direction:

```txt
remove all rings
remove all bubbles / pearls / droplets
keep one continuous fluid simulation region
add an automatic yin-yang current inside the fluid simulation
make the yin-yang current slowly rotate in a circle
allow user interaction to displace and interrupt the current
let the current gradually recover after interaction
```

The hero should no longer look like a layered graphic with decorative UI objects. It should look like a single premium liquid-glass field with a gold signature suspended inside it.

---

# 2. Product Goal

The hero should feel like:

```txt
one continuous fluid surface
a gold signature embedded in dark water
a self-running yin-yang current formed by dye and velocity
a slow circular rotation around the center
a fluid current that can be interrupted by the user's pointer/tap
```

It should not feel like:

```txt
a radar display
a ring reactor
a bubble UI
a decorative orbit system
a static emblem over a dark card
```

---

# 3. Hard Visual Decision

Completely remove these from the hero visual composition:

```txt
DOM rings
ambient rings
center rings
orbit rings
ring nodes
bubbles
pearls
droplets
bubble-like emitter dots
reactor halos
decorative circular UI overlays
```

The only intended visual elements should be:

```txt
panel background
WebGL fluid canvas
embedded signature emblem
optional very subtle glass sheen
ChineseAccentText if still desired
```

The yin-yang pattern must come from the fluid simulation itself, not from DOM/SVG rings or decorative overlays.

---

# 4. Component Structure

## 4.1 Preferred component

Use or create:

```txt
src/components/brand/FluidSignatureSeal.tsx
```

`HeroFluidSimulationPanel` can remain as a compatibility wrapper:

```tsx
export function HeroFluidSimulationPanel(props: HeroFluidSimulationPanelProps) {
  return <FluidSignatureSeal {...props} />;
}
```

## 4.2 Recommended markup

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

      <ChineseAccentText />
    </div>
  );
}
```

Do not include:

```txt
ring spans
pearl spans
droplet spans
emitter spans
node spans
```

---

# 5. Single Fluid Region Requirement

There must be only one interaction region.

Pointer/tap anywhere inside the hero fluid panel should interact with the fluid.

No special regions:

```txt
no emblem-core region
no ring region
no yin lobe region
no yang lobe region
no basin region
no dead center
```

The emblem must not block pointer events.

All visual layers must use:

```css
pointer-events: none;
```

The pointer listener should attach to the stable hero fluid panel container.

---

# 6. Autonomous Yin-Yang Current

## 6.1 Purpose

The fluid should automatically produce a yin-yang-like current before the user interacts.

The effect should be visible through the dye and velocity field.

It should look like:

```txt
two soft counterbalancing currents
an S-like central flow
slow circular rotation
cyan/electric-blue on one side
gold/jade on the other side
```

It should not look like:

```txt
a drawn yin-yang icon
a static overlay
two hard regions
two DOM shapes
```

## 6.2 Config additions

Update:

```txt
src/components/webgl/fluid-lite/fluidLiteConfig.ts
```

Add:

```ts
export type FluidLiteConfig = {
  // existing fields...

  autoCurrentEnabled: boolean;
  autoCurrentStrength: number;
  autoCurrentRadius: number;
  autoCurrentRotationSpeed: number;
  autoCurrentRecoverySpeed: number;
  autoCurrentDyeRate: number;
  autoCurrentLobeRadius: number;
  autoCurrentLobeSpread: number;
  autoCurrentCenterPull: number;
  userDisruptionStrength: number;
  userDisruptionRecoverySeconds: number;
};
```

Recommended cinematic defaults:

```ts
autoCurrentEnabled: true,
autoCurrentStrength: 0.42,
autoCurrentRadius: 0.28,
autoCurrentRotationSpeed: 0.045,
autoCurrentRecoverySpeed: 0.65,
autoCurrentDyeRate: 0.18,
autoCurrentLobeRadius: 0.035,
autoCurrentLobeSpread: 0.09,
autoCurrentCenterPull: 0.12,
userDisruptionStrength: 1.0,
userDisruptionRecoverySeconds: 3.6,
```

Recommended high defaults:

```ts
autoCurrentEnabled: true,
autoCurrentStrength: 0.34,
autoCurrentRadius: 0.26,
autoCurrentRotationSpeed: 0.038,
autoCurrentRecoverySpeed: 0.58,
autoCurrentDyeRate: 0.14,
autoCurrentLobeRadius: 0.030,
autoCurrentLobeSpread: 0.075,
autoCurrentCenterPull: 0.10,
userDisruptionStrength: 0.9,
userDisruptionRecoverySeconds: 3.2,
```

---

# 7. Yin-Yang Current Behavior

## 7.1 Current model

Use two moving current lobes that orbit the center.

At time `t`:

```ts
const angle = t * config.autoCurrentRotationSpeed * Math.PI * 2;
const center = { x: 0.5, y: 0.5 };

const yin = {
  x: center.x + Math.cos(angle) * config.autoCurrentRadius,
  y: center.y + Math.sin(angle) * config.autoCurrentRadius,
};

const yang = {
  x: center.x - Math.cos(angle) * config.autoCurrentRadius,
  y: center.y - Math.sin(angle) * config.autoCurrentRadius,
};
```

The lobes should inject opposite but complementary swirl forces:

```txt
yin lobe: clockwise tangent force, cyan/electric-blue dye
yang lobe: counter-clockwise tangent force, gold/jade dye
```

## 7.2 S-curve effect

The S-like flow should emerge from the velocity field.

Do this by combining:

```txt
paired lobe splats
tangent velocity
small center-pull force
subtle dye injection
advection
pressure projection
dispersion
```

Do not draw an S-curve DOM overlay.

## 7.3 Continuous rotation

The lobe pair should rotate slowly around the emblem.

Rotation speed should be subtle:

```txt
one full rotation roughly every 18-30 seconds
```

The user should notice it as a current, not a spinning graphic.

---

# 8. User Displacement / Interruption

## 8.1 Required behavior

When the user moves/clicks/taps inside the fluid field:

```txt
user splat displaces the automatic yin-yang current
current bends around the interaction
dye should visibly swirl away from the normal path
automatic current strength should temporarily reduce near the interaction
current should recover after a few seconds
```

## 8.2 Disruption state

Add a small internal ref/state in the simulation controller:

```ts
type CurrentDisruption = {
  x: number;
  y: number;
  startedAt: number;
  strength: number;
};
```

When user interacts:

```ts
currentDisruptionRef.current = {
  x,
  y,
  startedAt: now,
  strength: config.userDisruptionStrength,
};
```

During each simulation step:

```ts
const age = now - disruption.startedAt;
const disruptionAmount =
  disruption.strength * Math.exp(-age / config.userDisruptionRecoverySeconds);
```

Use `disruptionAmount` to:

```txt
reduce automatic current strength near the pointer location
add local turbulence / displacement
let the current recover smoothly
```

## 8.3 Do not disable the current completely

The user should interrupt the current, not turn it off.

Use:

```txt
local attenuation
temporary distortion
gradual recovery
```

Not:

```txt
global stop
hard reset
sudden snap back
```

---

# 9. Implementation Options

## 9.1 Preferred implementation: automatic splat injection

Create:

```txt
src/components/webgl/fluid-lite/autoYinYangCurrent.ts
```

Functions:

```ts
export type AutoCurrentSplat = FluidSplat;

export function createAutoYinYangCurrentSplats(input: {
  time: number;
  config: FluidLiteConfig;
  disruption?: CurrentDisruption | null;
}): AutoCurrentSplat[];
```

This function should return low-force splats for:

```txt
yin lobe velocity
yin lobe dye
yang lobe velocity
yang lobe dye
optional center-pull / S-curve helper
```

These splats should be injected at a low steady rate.

## 9.2 Alternative implementation: velocity bias shader

Add a dedicated velocity force pass:

```txt
yinYangCurrentForce shader
```

This shader adds a procedural current directly into the velocity texture.

This is more elegant but more complex.

For the next implementation pass, use the automatic splat injection first unless shader force integration is already straightforward.

---

# 10. Auto Current Injection Rate

The automatic current should be visible but not spam the simulation.

Recommended:

```txt
inject auto-current splats 8-15 times per second in cinematic mode
inject auto-current splats 5-10 times per second in high mode
```

This should be separate from user splat throttling.

Add config:

```ts
autoCurrentSplatsPerSecond: number;
```

Recommended:

```ts
cinematic: 12,
high: 8,
medium: 5,
low: 3,
```

Important:

```txt
auto current should not count against user maxSplatsPerSecond
but it should still respect performance caps
```

---

# 11. Color Direction

The autonomous current should use the brand palette:

```txt
yin current: water / electric blue
yang current: jade / soft gold
```

Use stronger values from Spec 0024:

```ts
const autoCurrentColors = {
  yinWater: [0.58, 0.96, 1.0],
  yinBlue: [0.12, 0.48, 1.0],
  yangJade: [0.42, 0.92, 0.72],
  yangGold: [1.0, 0.78, 0.22],
};
```

Dye should remain transparent and liquid-like.

Do not create a hard two-color yin-yang icon.

---

# 12. CSS Cleanup

Update:

```txt
src/index.css
```

Remove selectors/classes for:

```txt
fluidSignatureSeal__ambientRing
fluidSignatureSeal__droplet
fluidSignatureSeal__pearl
fluidSignatureSeal__ring
yinYangFluidSeal__ring
yinYangFluidSeal__pearl
yinYangFluidSeal__bubble
liquidSealReactor__ring
liquidSealReactor__pearl
```

Keep only:

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
  opacity: 0.86;
  pointer-events: none;
}

.fluidSignatureSeal .fluidCanvas,
.fluidSignatureSeal .fluidCanvasFallback {
  z-index: 2;
  opacity: var(--fluid-layer-opacity);
  inset: calc(var(--fluid-field-bleed) * -1);
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

Optional:

```txt
Keep ChineseAccentText if it still looks balanced.
```

---

# 13. FluidCanvas / Controller Changes

Update:

```txt
src/components/webgl/fluid-lite/FluidSimulationController.tsx
```

Responsibilities:

```txt
run normal user splats
run automatic yin-yang current splats
track current disruption from user interactions
blend auto current with disruption
keep one continuous interaction region
```

Update:

```txt
src/components/webgl/fluid-lite/useFluidPointerSplats.ts
```

Requirements:

```txt
no region checks
no safe-zone early return
no ring logic
pointer/tap anywhere creates user splats
notify controller of disruption point
```

Add callback:

```ts
onUserDisruption?: (event: {
  x: number;
  y: number;
  strength: number;
}) => void;
```

---

# 14. Reduced Motion

If `prefers-reduced-motion` is enabled:

```txt
do not run automatic current
show static fallback
```

Static fallback can show:

```txt
dark water gradient
very subtle cyan/gold center haze
emblem
Chinese text
```

No animated current.

---

# 15. Performance Guardrails

The auto current adds continuous work.

Keep guardrails:

```txt
one Canvas
hero-only WebGL
no DOM rings/bubbles
no postprocessing
no bloom
auto splats capped
mobile downgrades quality
reduced motion disables animation
```

Suggested caps:

```txt
cinematic autoCurrentSplatsPerSecond <= 12
high autoCurrentSplatsPerSecond <= 8
medium autoCurrentSplatsPerSecond <= 5
low autoCurrentSplatsPerSecond <= 3
```

If performance drops:

```txt
reduce autoCurrentSplatsPerSecond first
then reduce particleCount
then reduce dyeResolution
```

---

# 16. Acceptance Criteria

- [ ] All rings are removed from the hero visual.
- [ ] All bubbles/pearls/droplets are removed from the hero visual.
- [ ] Hero has one continuous fluid simulation region.
- [ ] Pointer/tap anywhere inside the hero injects fluid.
- [ ] No center dead zone remains.
- [ ] Automatic yin-yang current exists.
- [ ] Current is produced by the fluid simulation, not DOM overlays.
- [ ] Current slowly rotates around the center.
- [ ] User interaction displaces/interrupts the current.
- [ ] Current gradually recovers after interaction.
- [ ] Emblem remains embedded and readable.
- [ ] Fluid colors remain visible from Spec 0024.
- [ ] Reduced-motion fallback still works.
- [ ] WebGL fallback still works.
- [ ] No new dependencies are added.
- [ ] Build passes.
- [ ] Lint either passes or fails only because ESLint config is missing.

---

# 17. Non-Goals

Do not implement:

```txt
rings
bubbles
pearls
droplets
visible yin-yang SVG
region-based interaction
ring pulse interaction
postprocessing bloom
new dependencies
full hero layout rewrite
```

---

# 18. Codex Implementation Prompt

```txt
Implement Spec 0017: Autonomous Yin-Yang Fluid Current — No Rings, No Bubbles.

Context:
The user wants all rings and bubbles removed from the hero. The fluid simulation should become the visual focus. The fluid itself should automatically produce a yin-yang-like current that slowly rotates in a circle. User interaction should displace and interrupt that current, then the current should recover naturally.

Required visual changes:
1. Completely remove rings from the hero visual.
2. Completely remove bubbles/pearls/droplets from the hero visual.
3. Remove any ring/reactor/node/emitter DOM overlays.
4. Keep only:
   - panel background
   - embedded SignatureEmblem
   - WebGL fluid canvas
   - optional very subtle glass sheen
   - ChineseAccentText if still desired
5. Decorative layers must use pointer-events: none.

Required interaction changes:
6. There must be only one continuous fluid interaction region.
7. Remove all region logic:
   - no emblem-core region
   - no ring region
   - no yin/yang lobe region
   - no basin region
   - no safe-zone early return
8. Pointer/tap anywhere in the panel injects fluid.
9. Center/emblem area is interactive.
10. Pointer listeners attach to the stable fluid panel container.

Required automatic current:
11. Add an automatic yin-yang current generated by the fluid simulation.
12. The current should be created through low-force paired splats or a velocity force pass.
13. The current should form two opposing lobes:
   - yin: cyan/electric-blue
   - yang: jade/soft-gold
14. The lobe pair should rotate slowly around the center.
15. The current should create an S-like flow through velocity/advection, not a drawn overlay.
16. Add auto-current config:
   - autoCurrentEnabled
   - autoCurrentStrength
   - autoCurrentRadius
   - autoCurrentRotationSpeed
   - autoCurrentRecoverySpeed
   - autoCurrentDyeRate
   - autoCurrentLobeRadius
   - autoCurrentLobeSpread
   - autoCurrentCenterPull
   - autoCurrentSplatsPerSecond
   - userDisruptionStrength
   - userDisruptionRecoverySeconds

Required user disruption:
17. User pointer/click/tap creates normal fluid splats.
18. User interaction records a disruption point.
19. The automatic current should locally bend/reduce around the disruption.
20. The current should recover smoothly after roughly 3-4 seconds.
21. Do not globally stop the current.

Recommended implementation:
22. Create src/components/webgl/fluid-lite/autoYinYangCurrent.ts.
23. Add createAutoYinYangCurrentSplats({ time, config, disruption }).
24. Inject auto-current splats in FluidSimulationController at a capped rate.
25. Keep user splat throttling separate from auto-current splat rate.

Color requirements:
26. Use stronger Spec 0024 colors:
   water: [0.58, 0.96, 1.0]
   electricBlue: [0.12, 0.48, 1.0]
   jade: [0.42, 0.92, 0.72]
   gold: [1.0, 0.78, 0.22]

Constraints:
- no new dependencies
- no rings
- no bubbles
- no visible yin-yang SVG
- no region-based interaction
- no ring pulse behavior
- no bloom/postprocessing
- one Canvas
- hero-only WebGL
- reduced motion disables active current
- mobile should downgrade quality if needed

Verification:
- npm run build
- npm run lint or document missing ESLint config
- visually confirm no rings
- visually confirm no bubbles
- confirm automatic rotating yin-yang current appears without interaction
- interact with pointer and confirm current is displaced/interrupted
- wait 3-4 seconds and confirm current recovers
- confirm center/emblem area is interactive
- confirm reduced-motion fallback
- confirm WebGL fallback
```

---

# 19. Done Definition

This spec is done when:

```txt
the hero has no rings or bubbles
the entire panel behaves as one fluid surface
the fluid automatically forms a rotating yin-yang current
the user can displace and interrupt that current
the current recovers naturally
the emblem remains embedded and readable
```
