# Spec 0016: Signature Interactive Brand Components

## Status

implemented

## Owner

Jason Huang

## Last Updated

2026-05-25

## Target Area

Creative interactive brand components for the personal portfolio: water pearls, orb systems, project marbles, seal interactions, dividers, and visual storytelling components.

---

# 1. Purpose

This spec defines concrete, creative, buildable components that can make the portfolio feel more unique and memorable.

Spec 0015 focused on visual polish infrastructure:

```txt
Reveal
Magnetic
WaterLightField
ScrollProgressRail
ProjectFilterChips
PointerGlow
drawer polish
```

Spec 0016 focuses on **signature interactive components** that give the portfolio an original identity.

The goal is to avoid generic portfolio polish and add components that feel specific to Jason's brand:

```txt
water
Chinese seal / gold accents
calm modern software UI
interactive product craft
project storytelling
```

This spec should still avoid heavy rewrites and avoid turning the portfolio into a gimmick.

---

# 2. Creative Direction

The site should feel like:

```txt
a dark water gallery for software systems
```

The visitor should feel like they are moving through:

```txt
floating pearls
glass panels
project artifacts
soft water rings
seal-stamped proof points
quiet animated current lines
```

The "balls" should not be random decorative circles. They should become meaningful:

```txt
pearls = skills / project nodes / proof markers
ripples = interaction feedback
gold seal = brand authority / signature
water current = progression through the page
```

---

# 3. Component Priority

Implement in this order:

```txt
1. WaterPearlField
2. HeroOrbitalSignature
3. ProjectPearlDock
4. RippleDivider
5. SealStampCTA
6. InteractiveProofBeads
7. CurrentPathTimeline
8. ProjectArtifactPreview
```

The first four provide the strongest visual improvement with limited code.

---

# 4. Component 1 — `WaterPearlField`

## 4.1 Purpose

A reusable floating orb/ball field that replaces one-off decorative spans.

Use it for:

```txt
hero visual
page background
section headers
empty states
project drawer accents
```

## 4.2 File

```txt
src/components/brand/WaterPearlField.tsx
```

## 4.3 API

```ts
export type WaterPearl = {
  id: string;
  size: "xs" | "sm" | "md" | "lg";
  tone: "water" | "gold" | "jade" | "ink";
  x: number; // percentage, 0-100
  y: number; // percentage, 0-100
  delay?: number;
  label?: string;
};

export type WaterPearlFieldProps = {
  pearls?: WaterPearl[];
  density?: "minimal" | "balanced" | "rich";
  interactive?: boolean;
  className?: string;
};
```

## 4.4 Default pearls

```ts
const defaultPearls: WaterPearl[] = [
  { id: "water-1", size: "lg", tone: "water", x: 18, y: 22, delay: 0 },
  { id: "gold-1", size: "sm", tone: "gold", x: 76, y: 18, delay: 0.12 },
  { id: "jade-1", size: "md", tone: "jade", x: 68, y: 72, delay: 0.28 },
  { id: "ink-1", size: "xs", tone: "ink", x: 32, y: 78, delay: 0.42 },
];
```

## 4.5 Behavior

```txt
- Pearls float slowly using CSS animation.
- Pearls have glassy radial-gradient styling.
- On hover, a pearl scales slightly and emits a ripple.
- On focus, a pearl shows a visible ring.
- If `label` exists, pearl can become a button with an accessible label.
- If `label` does not exist, pearl is decorative and aria-hidden.
- Motion reduces under prefers-reduced-motion.
```

## 4.6 Suggested implementation

```tsx
const sizeClassMap = {
  xs: "waterPearl--xs",
  sm: "waterPearl--sm",
  md: "waterPearl--md",
  lg: "waterPearl--lg",
};

export function WaterPearlField({
  pearls = defaultPearls,
  density = "balanced",
  interactive = false,
  className = "",
}: WaterPearlFieldProps) {
  return (
    <div
      className={`waterPearlField waterPearlField--${density} ${className}`}
      aria-hidden={!interactive}
    >
      {pearls.map((pearl) => {
        const pearlStyle = {
          "--pearl-x": `${pearl.x}%`,
          "--pearl-y": `${pearl.y}%`,
          "--pearl-delay": `${pearl.delay ?? 0}s`,
        } as React.CSSProperties;

        const className = [
          "waterPearl",
          sizeClassMap[pearl.size],
          `waterPearl--${pearl.tone}`,
        ].join(" ");

        if (interactive && pearl.label) {
          return (
            <button
              key={pearl.id}
              type="button"
              className={className}
              style={pearlStyle}
              aria-label={pearl.label}
            />
          );
        }

        return (
          <span
            key={pearl.id}
            className={className}
            style={pearlStyle}
            aria-hidden="true"
          />
        );
      })}
    </div>
  );
}
```

## 4.7 CSS

```css
.waterPearlField {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
}

.waterPearl {
  position: absolute;
  left: var(--pearl-x);
  top: var(--pearl-y);
  display: block;
  border: 1px solid rgba(126, 231, 242, 0.28);
  border-radius: 999px;
  background:
    radial-gradient(circle at 30% 24%, rgba(255, 255, 255, 0.92), transparent 0.42rem),
    radial-gradient(circle at 34% 28%, rgba(255, 255, 255, 0.34), transparent 28%),
    radial-gradient(circle at 72% 78%, rgba(126, 231, 242, 0.22), transparent 42%),
    rgba(7, 24, 36, 0.72);
  box-shadow:
    inset 0 1px 8px rgba(255, 255, 255, 0.16),
    0 18px 42px rgba(0, 0, 0, 0.24),
    0 0 28px rgba(126, 231, 242, 0.12);
  transform: translate(-50%, -50%);
  animation: pearlFloat 8s ease-in-out infinite alternate;
  animation-delay: var(--pearl-delay);
}

.waterPearl::after {
  content: "";
  position: absolute;
  inset: -40%;
  border: 1px solid currentColor;
  border-radius: inherit;
  opacity: 0;
  transform: scale(0.68);
  transition:
    opacity 180ms ease,
    transform 220ms ease;
}

.waterPearl:hover::after,
.waterPearl:focus-visible::after {
  opacity: 0.38;
  transform: scale(1);
}

.waterPearl--xs {
  width: 18px;
  height: 18px;
}

.waterPearl--sm {
  width: 32px;
  height: 32px;
}

.waterPearl--md {
  width: 54px;
  height: 54px;
}

.waterPearl--lg {
  width: 88px;
  height: 88px;
}

.waterPearl--water {
  color: rgba(126, 231, 242, 0.72);
}

.waterPearl--gold {
  color: rgba(247, 201, 72, 0.72);
  border-color: rgba(247, 201, 72, 0.34);
  box-shadow:
    inset 0 1px 8px rgba(255, 255, 255, 0.16),
    0 18px 42px rgba(0, 0, 0, 0.24),
    0 0 30px rgba(247, 201, 72, 0.16);
}

.waterPearl--jade {
  color: rgba(101, 214, 173, 0.72);
  border-color: rgba(101, 214, 173, 0.32);
}

.waterPearl--ink {
  color: rgba(184, 201, 211, 0.34);
  opacity: 0.68;
}

@keyframes pearlFloat {
  from {
    transform: translate(-50%, -50%) translate3d(-4px, 3px, 0) scale(1);
  }

  to {
    transform: translate(-50%, -50%) translate3d(5px, -6px, 0) scale(1.035);
  }
}

@media (prefers-reduced-motion: reduce) {
  .waterPearl {
    animation: none;
  }
}

@media (hover: none) {
  .waterPearlField {
    pointer-events: none;
  }
}
```

## 4.8 Where to use

Replace this style of one-off hero decoration:

```txt
heroSection__orb heroSection__orb--one
heroSection__orb heroSection__orb--two
```

With:

```tsx
<WaterPearlField density="balanced" />
```

Or combine:

```tsx
<div className="heroSection__visual" aria-hidden="true">
  <WaterLightField variant="hero" />
  <WaterPearlField density="balanced" />
  <HeroOrbitalSignature />
</div>
```

---

# 5. Component 2 — `HeroOrbitalSignature`

## 5.1 Purpose

A premium signature composition around the existing brand emblem.

Instead of the logo sitting alone, the hero visual should feel like a central seal surrounded by orbiting pearls and subtle rings.

## 5.2 File

```txt
src/components/brand/HeroOrbitalSignature.tsx
```

## 5.3 API

```ts
export type HeroOrbitalSignatureProps = {
  className?: string;
};
```

## 5.4 Behavior

```txt
- Uses existing SignatureEmblem.
- Adds 2 to 3 orbit rings.
- Adds 3 orbit beads/balls.
- Orbit animation is very slow.
- Gold bead should feel like the primary seal accent.
- Reduced motion freezes orbit.
```

## 5.5 Suggested markup

```tsx
import { ChineseAccentText } from "./ChineseAccentText";
import { SignatureEmblem } from "./SignatureEmblem";

export function HeroOrbitalSignature({ className = "" }: HeroOrbitalSignatureProps) {
  return (
    <div className={`heroOrbitalSignature ${className}`}>
      <span className="heroOrbitalSignature__ring heroOrbitalSignature__ring--outer" />
      <span className="heroOrbitalSignature__ring heroOrbitalSignature__ring--middle" />
      <span className="heroOrbitalSignature__orbit heroOrbitalSignature__orbit--one">
        <span className="heroOrbitalSignature__bead heroOrbitalSignature__bead--water" />
      </span>
      <span className="heroOrbitalSignature__orbit heroOrbitalSignature__orbit--two">
        <span className="heroOrbitalSignature__bead heroOrbitalSignature__bead--gold" />
      </span>
      <SignatureEmblem />
      <ChineseAccentText />
    </div>
  );
}
```

## 5.6 CSS concept

```css
.heroOrbitalSignature {
  position: relative;
  display: grid;
  place-items: center;
  width: clamp(260px, 36vw, 520px);
  aspect-ratio: 1;
}

.heroOrbitalSignature__ring,
.heroOrbitalSignature__orbit {
  position: absolute;
  border-radius: 999px;
}

.heroOrbitalSignature__ring--outer {
  inset: 2%;
  border: 1px solid rgba(126, 231, 242, 0.18);
}

.heroOrbitalSignature__ring--middle {
  inset: 16%;
  border: 1px solid rgba(247, 201, 72, 0.14);
}

.heroOrbitalSignature__orbit {
  inset: 7%;
  animation: signatureOrbit 28s linear infinite;
}

.heroOrbitalSignature__orbit--two {
  inset: 20%;
  animation-duration: 36s;
  animation-direction: reverse;
}

.heroOrbitalSignature__bead {
  position: absolute;
  top: 0;
  left: 50%;
  width: 18px;
  height: 18px;
  border-radius: 999px;
  transform: translate(-50%, -50%);
}

.heroOrbitalSignature__bead--water {
  background: radial-gradient(circle at 30% 25%, #fff, #7ee7f2 42%, rgba(35, 183, 197, 0.5));
  box-shadow: 0 0 20px rgba(126, 231, 242, 0.32);
}

.heroOrbitalSignature__bead--gold {
  width: 24px;
  height: 24px;
  background: radial-gradient(circle at 30% 25%, #fff, #f7c948 42%, rgba(185, 144, 62, 0.62));
  box-shadow: 0 0 24px rgba(247, 201, 72, 0.34);
}

@keyframes signatureOrbit {
  to {
    transform: rotate(360deg);
  }
}
```

---

# 6. Component 3 — `ProjectPearlDock`

## 6.1 Purpose

A project selector made of interactive pearls/balls.

This is the clearest answer to "like the balls etc."

Each project becomes a pearl. Clicking or focusing a pearl selects/opens the project.

Use it above or beside the work grid as a premium visual navigation layer.

## 6.2 File

```txt
src/components/portfolio/ProjectPearlDock.tsx
```

## 6.3 API

```ts
import type { PortfolioProject } from "../../data/projects";

export type ProjectPearlDockProps = {
  projects: PortfolioProject[];
  selectedProjectId?: string | null;
  onSelect: (projectId: string) => void;
  layout?: "arc" | "row" | "constellation";
};
```

## 6.4 Behavior

```txt
- Each pearl maps to one project.
- Pearl color is driven by project.accent.
- Active pearl is larger and brighter.
- Hover/focus reveals project title in a small floating label.
- Click opens the existing ProjectDetailDrawer.
- Keyboard users can tab through pearls.
- On mobile, pearls become a horizontal scroll row.
```

## 6.5 Suggested markup

```tsx
export function ProjectPearlDock({
  projects,
  selectedProjectId,
  onSelect,
  layout = "arc",
}: ProjectPearlDockProps) {
  return (
    <div className={`projectPearlDock projectPearlDock--${layout}`} aria-label="Project quick selector">
      {projects.map((project, index) => (
        <button
          key={project.id}
          type="button"
          className="projectPearlDock__item"
          data-accent={project.accent ?? "water"}
          data-active={selectedProjectId === project.id ? "true" : undefined}
          style={{ "--pearl-index": index } as React.CSSProperties}
          onClick={() => onSelect(project.id)}
          aria-label={`Open ${project.title}`}
          aria-pressed={selectedProjectId === project.id}
        >
          <span className="projectPearlDock__pearl">
            {project.title
              .split(" ")
              .map((word) => word[0])
              .join("")
              .slice(0, 2)}
          </span>
          <span className="projectPearlDock__label">{project.title}</span>
        </button>
      ))}
    </div>
  );
}
```

## 6.6 CSS concept

```css
.projectPearlDock {
  position: relative;
  display: flex;
  justify-content: center;
  gap: 14px;
  margin: 24px 0 34px;
}

.projectPearlDock__item {
  position: relative;
  border: 0;
  background: transparent;
  color: var(--text);
  cursor: pointer;
  padding: 10px;
}

.projectPearlDock__pearl {
  display: grid;
  place-items: center;
  width: 54px;
  height: 54px;
  border: 1px solid var(--border);
  border-radius: 999px;
  background:
    radial-gradient(circle at 28% 22%, rgba(255, 255, 255, 0.92), transparent 12%),
    radial-gradient(circle at 38% 32%, rgba(255, 255, 255, 0.24), transparent 34%),
    rgba(11, 34, 51, 0.88);
  box-shadow: var(--shadow-glass);
  font-size: 0.72rem;
  font-weight: 900;
  letter-spacing: 0.08em;
  transition:
    transform 220ms var(--ease-out),
    border-color 220ms ease,
    box-shadow 220ms ease;
}

.projectPearlDock__item:hover .projectPearlDock__pearl,
.projectPearlDock__item:focus-visible .projectPearlDock__pearl,
.projectPearlDock__item[data-active="true"] .projectPearlDock__pearl {
  transform: translateY(-4px) scale(1.08);
  border-color: var(--border-strong);
  box-shadow:
    var(--shadow-glass),
    0 0 28px var(--project-pearl-glow, rgba(126, 231, 242, 0.24));
}

.projectPearlDock__item[data-accent="gold"] {
  --project-pearl-glow: rgba(247, 201, 72, 0.28);
}

.projectPearlDock__item[data-accent="jade"] {
  --project-pearl-glow: rgba(101, 214, 173, 0.26);
}

.projectPearlDock__label {
  position: absolute;
  left: 50%;
  top: calc(100% + 8px);
  white-space: nowrap;
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-full);
  background: rgba(3, 10, 17, 0.92);
  color: var(--text-secondary);
  font-size: 0.72rem;
  font-weight: 800;
  opacity: 0;
  padding: 6px 10px;
  transform: translate(-50%, -4px);
  transition:
    opacity 160ms ease,
    transform 180ms var(--ease-out);
  pointer-events: none;
}

.projectPearlDock__item:hover .projectPearlDock__label,
.projectPearlDock__item:focus-visible .projectPearlDock__label {
  opacity: 1;
  transform: translate(-50%, 0);
}

@media (max-width: 768px) {
  .projectPearlDock {
    justify-content: flex-start;
    overflow-x: auto;
    padding-bottom: 10px;
  }

  .projectPearlDock__label {
    position: static;
    display: block;
    max-width: 72px;
    white-space: normal;
    opacity: 1;
    transform: none;
    margin-top: 8px;
    background: transparent;
    border: 0;
    padding: 0;
    text-align: center;
  }
}
```

## 6.7 Where to place

Inside `WorkSection`, after the heading and before `YinYangProjectScene`:

```tsx
<ProjectPearlDock
  projects={filteredProjects}
  selectedProjectId={selectedProjectId}
  onSelect={setSelectedProjectId}
/>
```

---

# 7. Component 4 — `RippleDivider`

## 7.1 Purpose

A beautiful section divider that looks like water ripples moving between sections.

This helps break long page flow and adds visual identity without extra content.

## 7.2 File

```txt
src/components/brand/RippleDivider.tsx
```

## 7.3 API

```ts
export type RippleDividerProps = {
  variant?: "water" | "gold" | "jade";
  density?: "subtle" | "strong";
  className?: string;
};
```

## 7.4 Usage

```tsx
<RippleDivider variant="water" />
```

Place between:

```txt
HeroSection and WorkSection
WorkSection and SystemsSection
AboutSection and ContactSection
```

Do not overuse it.

Maximum:

```txt
2 dividers per page
```

## 7.5 Markup

```tsx
export function RippleDivider({
  variant = "water",
  density = "subtle",
  className = "",
}: RippleDividerProps) {
  return (
    <div
      className={`rippleDivider rippleDivider--${variant} rippleDivider--${density} ${className}`}
      aria-hidden="true"
    >
      <span />
      <span />
      <span />
    </div>
  );
}
```

## 7.6 CSS concept

```css
.rippleDivider {
  position: relative;
  height: 96px;
  overflow: hidden;
  pointer-events: none;
}

.rippleDivider span {
  position: absolute;
  left: 50%;
  top: 50%;
  width: min(88vw, 900px);
  height: 180px;
  border: 1px solid rgba(126, 231, 242, 0.12);
  border-radius: 50%;
  transform: translate(-50%, -50%) scaleX(1.2);
}

.rippleDivider span:nth-child(2) {
  width: min(78vw, 760px);
  opacity: 0.72;
}

.rippleDivider span:nth-child(3) {
  width: min(66vw, 620px);
  opacity: 0.44;
}

.rippleDivider--gold span {
  border-color: rgba(247, 201, 72, 0.12);
}

@media (max-width: 768px) {
  .rippleDivider {
    height: 56px;
  }
}
```

---

# 8. Component 5 — `SealStampCTA`

## 8.1 Purpose

A custom CTA that behaves like a digital Chinese seal stamp.

Use for high-value CTAs:

```txt
View Resume
Email Me
Open Case Study
```

This should feel like a signature action, not a normal button.

## 8.2 File

```txt
src/components/brand/SealStampCTA.tsx
```

## 8.3 API

```ts
export type SealStampCTAProps = {
  href: string;
  children: React.ReactNode;
  sealText?: string;
  variant?: "gold" | "water";
  external?: boolean;
};
```

## 8.4 Behavior

```txt
- On hover/focus, a seal mark rotates/presses slightly.
- On click, there is a quick "stamp" animation.
- Uses normal anchor semantics.
- Must not replace all buttons; use sparingly.
```

## 8.5 Markup

```tsx
export function SealStampCTA({
  href,
  children,
  sealText = "黄",
  variant = "gold",
  external = false,
}: SealStampCTAProps) {
  return (
    <a
      className={`sealStampCTA sealStampCTA--${variant}`}
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
    >
      <span className="sealStampCTA__text">{children}</span>
      <span className="sealStampCTA__seal" aria-hidden="true">
        {sealText}
      </span>
    </a>
  );
}
```

## 8.6 CSS concept

```css
.sealStampCTA {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  min-height: 48px;
  border: 1px solid rgba(247, 201, 72, 0.34);
  border-radius: 999px;
  background: rgba(247, 201, 72, 0.08);
  color: var(--text);
  font-weight: 900;
  letter-spacing: 0.06em;
  padding: 6px 8px 6px 18px;
  text-transform: uppercase;
  transition:
    transform 200ms var(--ease-out),
    background 200ms ease,
    border-color 200ms ease;
}

.sealStampCTA__seal {
  display: grid;
  place-items: center;
  width: 36px;
  height: 36px;
  border: 1px solid rgba(247, 201, 72, 0.6);
  border-radius: 10px;
  background: rgba(247, 201, 72, 0.16);
  color: var(--gold);
  font-family: var(--font-display), serif;
  font-size: 1.2rem;
  line-height: 1;
  transform: rotate(-4deg);
  transition:
    transform 180ms var(--ease-out),
    box-shadow 180ms ease;
}

.sealStampCTA:hover .sealStampCTA__seal,
.sealStampCTA:focus-visible .sealStampCTA__seal {
  transform: rotate(0deg) scale(1.04);
  box-shadow: 0 0 22px rgba(247, 201, 72, 0.24);
}

.sealStampCTA:active .sealStampCTA__seal {
  transform: rotate(0deg) scale(0.94);
}
```

---

# 9. Component 6 — `InteractiveProofBeads`

## 9.1 Purpose

A compact proof/metrics component where each metric is represented as a bead/ball.

Use in:

```txt
About section
Project drawer
Hero stat strip
case study pages later
```

## 9.2 File

```txt
src/components/brand/InteractiveProofBeads.tsx
```

## 9.3 API

```ts
export type ProofBead = {
  label: string;
  value: string;
  detail?: string;
  tone?: "water" | "gold" | "jade";
};

export type InteractiveProofBeadsProps = {
  items: ProofBead[];
  className?: string;
};
```

## 9.4 Example data

```ts
const proofBeads = [
  {
    value: "95%",
    label: "CSAT",
    detail: "Sustained while closing support tickets within SLA.",
    tone: "gold",
  },
  {
    value: "1K+",
    label: "Tickets analyzed",
    detail: "Dashboarding and repeat-incident analysis.",
    tone: "water",
  },
  {
    value: "20+",
    label: "Tickets/week",
    detail: "Practical operations and support delivery.",
    tone: "jade",
  },
];
```

## 9.5 Behavior

```txt
- Desktop: bead expands into detail card on hover/focus.
- Mobile: detail text is always visible below the bead.
- Keyboard accessible if expandable.
- Use button only if clicking expands/toggles.
```

---

# 10. Component 7 — `CurrentPathTimeline`

## 10.1 Purpose

A flowing path component that tells Jason's professional/project journey.

This can replace or supplement a generic timeline.

## 10.2 File

```txt
src/components/brand/CurrentPathTimeline.tsx
```

## 10.3 API

```ts
export type CurrentPathItem = {
  year: string;
  title: string;
  body: string;
  tone?: "water" | "gold" | "jade";
};

export type CurrentPathTimelineProps = {
  items: CurrentPathItem[];
};
```

## 10.4 Visual

```txt
- SVG path flows vertically on desktop.
- Each milestone is a pearl on the current.
- Active/hovered milestone emits ripple.
- Mobile becomes stacked cards with a simple line.
```

## 10.5 Use cases

```txt
About section
career journey
project development journey
case study process
```

---

# 11. Component 8 — `ProjectArtifactPreview`

## 11.1 Purpose

Each project card/drawer should show a visual artifact, not just text.

This gives each project a product-like preview without requiring real screenshots.

## 11.2 File

```txt
src/components/portfolio/ProjectArtifactPreview.tsx
```

## 11.3 API

```ts
export type ProjectArtifactPreviewProps = {
  projectId: string;
  accent?: "water" | "gold" | "jade" | "neutral";
  variant?: "card" | "drawer" | "hero";
};
```

## 11.4 Project-specific previews

```txt
ui-library:
  layered component tokens, mini buttons, surface panels

stock-showdown:
  split comparison panels, stat chips, market-style graph line

dachong-wms:
  warehouse dashboard grid, table rows, status pills

certchase:
  compliance checklist, certificate cards, due-date markers

roblox-systems:
  game loop diagram, reward nodes, progression rings

portfolio-system:
  site map, component blocks, brand tokens
```

## 11.5 Example implementation

```tsx
export function ProjectArtifactPreview({
  projectId,
  accent = "water",
  variant = "card",
}: ProjectArtifactPreviewProps) {
  return (
    <div
      className={`projectArtifactPreview projectArtifactPreview--${variant}`}
      data-project={projectId}
      data-accent={accent}
      aria-hidden="true"
    >
      <div className="projectArtifactPreview__chrome">
        <span />
        <span />
        <span />
      </div>
      <div className="projectArtifactPreview__body">
        {/* Render project-specific decorative blocks based on projectId */}
      </div>
    </div>
  );
}
```

## 11.6 Rule

This should be decorative only until real screenshots exist.

Do not fake real product data.

Use abstract UI blocks.

---

# 12. Existing Component Improvements

## 12.1 Improve `WaterBackdrop`

Current behavior:

```txt
two background rings
one grid layer
```

Improve to:

```txt
rings
grid
subtle pearl field
low-opacity water current line
```

Implementation:

```tsx
import { WaterPearlField } from "./WaterPearlField";

export function WaterBackdrop({ className = "" }: WaterBackdropProps) {
  return (
    <div className={`waterBackdrop ${className}`} aria-hidden="true">
      <span className="waterBackdrop__ring waterBackdrop__ring--one" />
      <span className="waterBackdrop__ring waterBackdrop__ring--two" />
      <span className="waterBackdrop__current" />
      <WaterPearlField density="minimal" />
      <span className="waterBackdrop__grid" />
    </div>
  );
}
```

Rules:

```txt
- Keep opacity lower than hero pearls.
- Background pearls should not draw too much attention.
- Hide some pearls on mobile.
```

## 12.2 Improve `SignatureEmblem`

Current behavior:

```txt
plain wrapper around BrandAsset
```

Improve to:

```txt
optional variant prop
optional orbital frame
optional glow state
```

API:

```ts
type SignatureEmblemProps = {
  className?: string;
  decorative?: boolean;
  framed?: boolean;
  glow?: "none" | "water" | "gold";
};
```

Implementation rule:

```txt
Do not change default behavior.
Add new props as optional.
```

## 12.3 Improve `HeroSection`

Current hero visual has static orb spans.

Replace those with:

```txt
WaterLightField
WaterPearlField
HeroOrbitalSignature
```

This turns the hero into a composed brand scene.

## 12.4 Improve `ProjectRippleCard`

Add:

```txt
ProjectArtifactPreview
PointerGlow
accent-based border and pearl indicator
```

Potential card layout:

```txt
topline category/status
artifact preview
title/description
tech pills
small accent pearl
view details
```

## 12.5 Improve `ProjectDetailDrawer`

Add:

```txt
ProjectArtifactPreview at top
InteractiveProofBeads if project has impact/proof
accent pearl in header
sticky mini nav
```

---

# 13. Recommended Homepage Composition

## 13.1 Hero

```txt
HeroSection
  WaterLightField
  WaterPearlField
  HeroOrbitalSignature
  micro proof beads
  SealStampCTA for resume
```

## 13.2 Work

```txt
WorkSection
  ProjectPearlDock
  YinYangProjectScene
  ProjectFilterChips
  ProjectRippleCard with artifact previews
  ProjectDetailDrawer with artifact preview and proof beads
```

## 13.3 Divider

```txt
RippleDivider
```

## 13.4 Systems

```txt
SystemsSection
  InteractiveSystemCard
  small bead indicators
  hover proof line
```

## 13.5 About

```txt
AboutSection
  CurrentPathTimeline
  InteractiveProofBeads
```

## 13.6 Contact

```txt
ContactSection
  SealStampCTA
  final water pearl field
```

---

# 14. Implementation Slices

## Slice A — Hero balls/orbs

Files:

```txt
src/components/brand/WaterPearlField.tsx
src/components/brand/HeroOrbitalSignature.tsx
src/components/sections/HeroSection.tsx
src/index.css
```

Acceptance:

```txt
- Hero visual has glassy floating pearls.
- Existing logo remains central.
- Motion is subtle.
- Reduced-motion works.
- Mobile does not feel cluttered.
```

## Slice B — Project pearl selector

Files:

```txt
src/components/portfolio/ProjectPearlDock.tsx
src/components/sections/WorkSection.tsx
src/index.css
```

Acceptance:

```txt
- Projects can be opened through pearl selector.
- Pearls reflect project accents.
- Keyboard users can select pearls.
- Mobile uses horizontal scrolling.
```

## Slice C — Project artifact previews

Files:

```txt
src/components/portfolio/ProjectArtifactPreview.tsx
src/components/portfolio/ProjectRippleCard.tsx
src/components/portfolio/ProjectDetailDrawer.tsx
src/index.css
```

Acceptance:

```txt
- Project cards feel less text-only.
- Drawer has stronger visual context.
- Previews are abstract and honest.
```

## Slice D — Brand dividers and seal CTA

Files:

```txt
src/components/brand/RippleDivider.tsx
src/components/brand/SealStampCTA.tsx
src/App.jsx or section files
src/index.css
```

Acceptance:

```txt
- Dividers improve section rhythm.
- Seal CTA feels distinctive.
- CTAs remain accessible and readable.
```

## Slice E — Proof beads and current timeline

Files:

```txt
src/components/brand/InteractiveProofBeads.tsx
src/components/brand/CurrentPathTimeline.tsx
src/components/sections/AboutSection.tsx
src/index.css
```

Acceptance:

```txt
- About section feels more interactive.
- Metrics/proof points are easier to scan.
- No fake numbers are introduced.
```

---

# 15. Accessibility Requirements

## 15.1 Decorative orbs

```txt
- Decorative pearls must use aria-hidden="true".
- Interactive pearls must be buttons or anchors.
- Interactive pearls need visible labels or aria-label.
```

## 15.2 Keyboard

```txt
- ProjectPearlDock items are keyboard reachable.
- Active/selected state uses aria-pressed.
- Focus states are visible.
```

## 15.3 Motion

```txt
- All floating/orbiting animations stop under prefers-reduced-motion.
- No component relies only on animation to communicate information.
```

## 15.4 Contrast

```txt
- Pearls cannot sit behind text at high opacity.
- Gold text on dark background must remain readable.
- Labels/tooltips must meet readable contrast.
```

---

# 16. Performance Requirements

```txt
- Use CSS animations, transforms, opacity.
- Avoid animating width/height/top/left repeatedly.
- Use no canvas for this spec.
- Use no new 3D libraries.
- Do not add new packages.
- Keep pearls per scene under 10.
- Hide or reduce decorative pearls on mobile.
```

---

# 17. Acceptance Criteria

- [ ] `WaterPearlField` exists and is reusable.
- [ ] Hero visual uses actual floating balls/orbs/pearls.
- [ ] `HeroOrbitalSignature` wraps or enhances the existing signature emblem.
- [ ] `ProjectPearlDock` allows project selection with pearl buttons.
- [ ] `RippleDivider` exists and can be placed between sections.
- [ ] `SealStampCTA` exists for one or two high-value CTAs.
- [ ] `ProjectArtifactPreview` creates abstract visual previews for projects.
- [ ] Existing `WaterBackdrop` is improved without becoming distracting.
- [ ] Existing `SignatureEmblem` default behavior is not broken.
- [ ] Interactive pearls are keyboard accessible.
- [ ] Decorative pearls are hidden from screen readers.
- [ ] Reduced motion is respected.
- [ ] No new npm dependencies are added.
- [ ] Mobile layout has no horizontal overflow.
- [ ] `npm run build` passes.
- [ ] `npm run lint` passes or pre-existing lint issues are documented.

---

# 18. Non-Goals

This spec does not include:

```txt
full 3D ball physics
real particle simulation
canvas rendering
WebGL requirement
random cursor confetti
fake screenshots
fake metrics
route-based case studies
new brand asset generation
```

The visual system should feel creative, not chaotic.

---

# 19. Codex Implementation Prompt

```txt
Implement Spec 0016: Signature Interactive Brand Components.

Goal:
Add concrete creative components to the portfolio, especially actual interactive balls/orbs/pearls, while preserving performance, accessibility, and the existing water/gold/Chinese-inspired brand direction.

Current repo:
- React + Vite.
- Existing components include WaterBackdrop, SignatureEmblem, HeroSection, WorkSection, ProjectRippleCard, ProjectDetailDrawer.
- Global styles live in src/index.css.
- Do not add new npm dependencies.

Implement in slices:

Slice A:
1. Create src/components/brand/WaterPearlField.tsx.
2. Create src/components/brand/HeroOrbitalSignature.tsx.
3. Update HeroSection to use WaterPearlField and HeroOrbitalSignature.
4. Replace one-off static hero orb spans where appropriate.
5. Add CSS for glassy pearls, slow floating, orbit rings, and reduced-motion behavior.

Slice B:
1. Create src/components/portfolio/ProjectPearlDock.tsx.
2. Add it to WorkSection above the featured project scene.
3. Each pearl maps to a project.
4. Clicking a pearl opens the existing ProjectDetailDrawer.
5. Add keyboard labels, aria-pressed, and mobile horizontal behavior.

Slice C:
1. Create src/components/portfolio/ProjectArtifactPreview.tsx.
2. Add abstract project previews to ProjectRippleCard.
3. Add larger preview to ProjectDetailDrawer.
4. Do not fake real app screenshots.

Slice D:
1. Create src/components/brand/RippleDivider.tsx.
2. Create src/components/brand/SealStampCTA.tsx.
3. Use RippleDivider between one or two major sections.
4. Use SealStampCTA only for one or two high-value CTAs.

Constraints:
- No new packages.
- No canvas.
- No WebGL requirement.
- Keep animations subtle.
- Respect prefers-reduced-motion.
- Decorative pearls must be aria-hidden.
- Interactive pearls must be keyboard accessible.
- Do not break existing drawer accessibility behavior.
- Do not rewrite unrelated sections.

Verification:
- npm run build
- npm run lint
- test keyboard navigation
- test reduced-motion mode
- test 360px, 390px, 430px, 768px, 1024px, 1440px widths
```

---

# 20. Done Definition

This spec is complete when the portfolio has a recognizable signature interaction system:

```txt
floating water pearls in the hero
a central orbital signature emblem
project selector pearls
abstract project artifact previews
ripple section dividers
seal-style CTAs
accessible behavior
reduced-motion support
no performance regression
```
