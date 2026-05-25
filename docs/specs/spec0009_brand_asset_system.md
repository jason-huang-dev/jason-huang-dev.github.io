# Spec 0009: Brand Asset System and Logo Usage Rules — PNG Seal Update

## Status

proposed

## Owner

Jason Huang

## Last Updated

2026-05-25

## Target Area

Logo usage, brand assets, PNG seal usage, yin-yang project scene assets, and accessible brand rendering.

---

# 1. Purpose

This updated spec replaces the previous `huang-seal.svg` assumption with a PNG-based seal asset.

The portfolio should use one clear primary UI mark and one controlled expressive emblem system:

```txt
Primary UI mark: square 黄 seal PNG
Secondary expressive mark: gold/water monogram or emblem PNG
Project scene assets: isolated yin-yang half PNGs
```

The goal is to prevent multiple logo styles from competing while still allowing expressive brand moments.

---

# 2. Product Goal

The portfolio should feel like a coherent brand system.

Users should see:

- one consistent small UI mark;
- one expressive signature/emblem direction for hero and featured moments;
- controlled use of yin-yang assets only where they support project storytelling.

---

# 3. Required Asset Change

Remove references to:

```txt
public/brand/huang-seal.svg
```

Use:

```txt
public/brand/huang-seal.png
```

Recommended directory:

```txt
public/brand/
  huang-seal.png
  huang-seal@2x.png
  signature-emblem.png

  yinyang/
    emblem.png
    light-left.png
    light-right.png
    dark-left.png
    dark-right.png
```

If exact filenames differ, create a single asset manifest instead of hardcoding paths in multiple components.

---

# 4. Brand Asset Roles

## 4.1 Primary UI Mark

Use `huang-seal.png` for:

```txt
navbar
footer
mobile menu
favicon source
small UI identity
```

Rules:

- transparent PNG only;
- no baked checkerboard background;
- explicit width/height to prevent layout shift;
- optimized sizes for web.

## 4.2 Signature Emblem

Use the expressive emblem PNG for:

```txt
hero visual
about section
featured project interaction
brand story moment
```

Do not use the full emblem in the navbar.

## 4.3 Yin-Yang Half Assets

Use the half assets only for:

```txt
featured project scene
project unlock animation
project reveal interaction
```

Do not use the half assets as generic section backgrounds.

---

# 5. Component Requirements

Update:

```txt
src/components/brand/BrandMark.tsx
```

Optional:

```txt
src/data/brandAssets.ts
src/components/brand/SignatureEmblem.tsx
```

Suggested asset manifest:

```ts
export const brandAssets = {
  seal: "/brand/huang-seal.png",
  signatureEmblem: "/brand/signature-emblem.png",
  yinyang: {
    emblem: "/brand/yinyang/emblem.png",
    lightLeft: "/brand/yinyang/light-left.png",
    lightRight: "/brand/yinyang/light-right.png",
    darkLeft: "/brand/yinyang/dark-left.png",
    darkRight: "/brand/yinyang/dark-right.png",
  },
} as const;
```

Suggested `BrandMark` behavior:

```tsx
<img
  src="/brand/huang-seal.png"
  alt=""
  aria-hidden="true"
  width={40}
  height={40}
/>
```

If the logo is wrapped in a home link, the link should have:

```tsx
aria-label="Jason Huang home"
```

---

# 6. Accessibility

- Decorative logo images should use `alt=""` and `aria-hidden="true"`.
- Logo links should have accessible labels.
- Project scene yin-yang halves should be hidden from assistive tech.
- Do not render important text only inside image assets.

---

# 7. Acceptance Criteria

- [ ] All `huang-seal.svg` references are removed.
- [ ] `BrandMark` uses the PNG seal.
- [ ] PNG seal renders in navbar and footer.
- [ ] PNG seal has transparent background.
- [ ] PNG seal has no baked checkerboard.
- [ ] Image width/height are provided.
- [ ] Yin-yang half assets are used only for the project scene.
- [ ] Decorative assets are hidden from assistive tech.

---

# 8. Non-Goals

This spec does not require:

- redesigning the seal;
- regenerating logo assets;
- adding light mode;
- creating social share images;
- creating an animated logo intro.

---

# 9. QA Checklist

- [ ] Search repo for `huang-seal.svg`.
- [ ] Check navbar logo on desktop and mobile.
- [ ] Check footer logo.
- [ ] Check the PNG over dark and light backgrounds.
- [ ] Check no checkerboard is baked in.
- [ ] Check image dimensions and layout shift.
- [ ] Check accessibility labels.

---

# 10. Codex Implementation Prompt

```txt
Update the portfolio brand asset system so BrandMark uses /brand/huang-seal.png instead of /brand/huang-seal.svg. Remove all huang-seal.svg references. Ensure the PNG seal renders in navbar/footer with explicit dimensions, transparent background, no baked checkerboard, and accessible wrapping labels. Keep the square 黄 seal as the primary UI mark. Reserve signature/emblem assets and yin-yang half PNG assets for expressive project scene usage only.
```

---

# 11. Done Definition

This update is complete when the site uses the PNG Huang seal consistently and no `huang-seal.svg` references remain.
