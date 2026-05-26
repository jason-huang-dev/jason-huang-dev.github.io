# Spec 0022: Yin-Yang Fluid Seal Hero Interaction

## Status

superseded by `spec0023_single_region_hero_fluid_seal_simplification.md`

## Last Updated

2026-05-26

## Target Area

Hero WebGL fluid simulation, cinematic quality mode, center interaction, yin-yang lobe behavior, ring pulses, emblem depth, and transparent fluid layering.

## Supersession Note

Spec 0023 replaces this region/ring-based direction with a single continuous
`FluidSignatureSeal` interaction model. The runtime should no longer use
`YinYangFluidSeal`, ring pulse splats, protected emblem-core blocking, or visible
reactor-style rings.

## Purpose

The previous Spec 0022 direction used a generic `LiquidSealReactor` concept and a larger single-radius splat. That read too much like a blob or light beam and did not make the center feel intentionally interactive.

The replacement direction is a **Yin-Yang Fluid Seal**:

- two counter-rotating fluid swirls around the embedded gold emblem
- a protected emblem core
- interactive yin and yang lobes split by an S-curve
- an interactive ring band around the emblem
- multi-lobe fluid injections instead of one giant splat
- transparent dark-water layering behind the DOM emblem

## Components

Primary component:

```txt
src/components/brand/YinYangFluidSeal.tsx
```

Compatibility wrapper:

```tsx
export function HeroFluidSimulationPanel(props) {
  return <YinYangFluidSeal {...props} />;
}
```

The old `LiquidSealReactor` component is removed from the runtime path.

## Visual Layers

The hero visual is composed as:

- dark navy liquid basin
- embedded gold `SignatureEmblem` seal ghost
- transparent WebGL `FluidCanvas`
- cyan/electric-blue yin lobe
- soft-gold/jade yang lobe
- yin-yang ring overlay
- S-curve visual divider
- two pearl/dot emitters
- subtle specular glass sweep
- optional `ChineseAccentText` above the canvas layer

All decorative layers use `pointer-events: none`; pointer capture is handled by the panel target passed into `FluidCanvas`.

## Interaction Regions

Interaction uses:

```ts
getYinYangInteractionRegion(x, y, config)
```

Regions:

- `emblem-core`: protected, no direct splats
- `ring`: circular ring band around the emblem, emits tangent pulse splats
- `yin-lobe`: S-curve-defined lobe, clockwise current
- `yang-lobe`: S-curve-defined lobe, counter-clockwise current
- `basin`: normal outer fluid interaction

Default geometry:

- emblem core radius: about `0.12`
- ring inner radius: about `0.15`
- ring outer radius: about `0.34`
- lobe region extends slightly outside the ring
- lobe split uses a sinusoidal S-curve boundary instead of a left/right split

## Splat Behavior

Large interactions must not be implemented as one giant splat.

Implemented behavior:

- pointer basin interaction: 3 small lobes when radius scale is elevated
- click/tap basin interaction: 5 small lobes
- ring interaction: 8 tangent pulse splats around the ring
- yin/yang lobe interaction: paired mirrored swirl splats
- lobe velocity is tangent to the yin-yang current
- mirrored lobe splats use complementary cyan/gold/jade/water colors

The protected emblem core remains inactive, but the surrounding ring and lobes are interactive so the center no longer feels dead.

## Cinematic Quality

The cinematic preset is preserved for capable desktop devices:

```txt
simResolution: 192
dyeResolution: 768
pressureIterations: 20
particleCount: 320
simulationFps: 45
```

Mobile and reduced-motion users downgrade through the existing responsive quality selection and fallback paths.

## Constraints

- no new dependencies
- one WebGL canvas
- hero-only WebGL
- no bloom
- no postprocessing stack
- no full-page WebGL
- no broad light beam
- no rainbow channel split
- no particle storm
- no rewrite of `HeroSection` copy or CTA layout
- `SignatureEmblem` and `ChineseAccentText` remain DOM layers above/around the canvas

## Acceptance Criteria

- The hero reads as a yin-yang fluid seal.
- The center no longer feels dead.
- The emblem core remains protected.
- Ring interactions create visible circular fluid response.
- Pointer movement in the lobes creates paired yin-yang swirls.
- Clicks create mirrored multi-lobe fluid impulses.
- Bigger radius feels organic rather than blob-like.
- The emblem remains visible and embedded.
- Mobile downgrades safely.
- Reduced motion fallback still works.
- WebGL fallback still works.
- `npm run build` passes.
- `npm run lint` passes or existing lint infrastructure issues are documented.
