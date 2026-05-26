# Spec 0015: Visual Polish and Interactive Components

## Status

implemented

## Owner

Jason Huang

## Last Updated

2026-05-25

## Target Area

Portfolio visual polish, advanced interaction layer, animated hero treatment, work-section exploration, navigation feedback, and accessibility-safe motion.

---

# 1. Purpose

This spec defines the next visual-polish implementation pass for the personal portfolio website.

The current portfolio already has:

```txt
HeroSection
WorkSection
YinYangProjectScene
ProjectRippleCard
ProjectDetailDrawer
PageShell
water-inspired global styling
brand accents
project data model
```

This spec should **not** rewrite the portfolio. It should improve the existing experience by adding advanced but maintainable interaction patterns that make the site feel more premium, intentional, and memorable.

The goal is to make the portfolio feel like a polished product interface rather than a static personal page.

---

# 2. Product Goal

Visitors should immediately feel that the site is:

```txt
premium
interactive
technically mature
visually distinctive
fast
accessible
clear
recruiter-friendly
client-friendly
```

The interaction layer should support Jason's brand direction:

```txt
modern product UI
water-inspired motion
Chinese-inspired visual restraint
gold accent details
calm but high-end visual rhythm
```

The site should feel more alive, but never become distracting or slow.

---

# 3. User Experience

## 3.1 Primary visitor journey

A visitor should be able to:

```txt
1. Land on the hero and immediately understand Jason's positioning.
2. Notice a refined water/gold brand motion system.
3. Scroll and see section progress / active navigation feedback.
4. Explore featured work through a more premium interaction.
5. Hover or focus project cards and receive clear visual feedback.
6. Open project details in the existing drawer without losing context.
7. Understand systems/skills through interactive, scannable cards.
8. Reach contact actions quickly.
```

## 3.2 Experience tone

The interaction should feel:

```txt
quiet
precise
fluid
intentional
luxury-product-like
not game-like
not gimmicky
not slow
```

## 3.3 Core interaction rule

Every advanced visual effect must have a useful purpose.

Examples:

```txt
Good:
- active section rail shows where the user is on the page
- spotlight hover highlights the project under consideration
- reveal animations clarify information hierarchy
- drawer polish improves perceived quality and focus

Bad:
- constant unrelated animation
- decorative effects covering text
- hover states that hide important information
- scroll-jacking
- motion that makes the site harder to read
```

---

# 4. Visual Direction

## 4.1 Direction summary

Move the site toward:

```txt
premium water-glass editorial interface
```

Keep:

```txt
deep navy background
cyan/water highlights
gold signature accents
large elegant display type
glass panels
Yin/Yang and Chinese-inspired details
```

Add:

```txt
active section progress
water-light hero field
cursor-follow glow on desktop
magnetic button/card hover on desktop
scroll reveal rhythm
interactive capability cards
project quick-filter chips
drawer polish and internal mini navigation
```

Avoid:

```txt
heavy WebGL as a requirement
canvas-only visuals
excessive blur
low-contrast content
motion that loops aggressively
layout shifts
hard-to-maintain animation code
```

---

# 5. Implementation Scope

This spec should be implemented as one focused visual-interaction PR.

## 5.1 In scope

```txt
src/components/brand/WaterLightField.tsx
src/components/layout/ScrollProgressRail.tsx
src/components/layout/ActiveSectionNav.tsx or Navbar enhancement
src/components/ui/Reveal.tsx
src/components/ui/PointerGlow.tsx
src/components/ui/Magnetic.tsx
src/components/sections/HeroSection.tsx polish
src/components/sections/WorkSection.tsx polish
src/components/sections/SystemsSection.tsx or existing systems markup extraction
src/components/portfolio/ProjectRippleCard.tsx polish
src/components/portfolio/ProjectDetailDrawer.tsx polish
src/index.css additions/refinements
```

## 5.2 Out of scope

```txt
full route-based case studies
CMS/content management
new backend
contact form rewrite
analytics dashboard
large 3D scene rewrite
new npm dependencies
major project data restructure
```

---

# 6. Existing Architecture Assumptions

The portfolio currently uses:

```txt
React
Vite
TypeScript / TSX components in sections and portfolio folders
global CSS in src/index.css
react-icons
framer-motion already available
react-router-dom already available
three/react-three packages already available but not required for this spec
```

Use existing dependencies only.

Do not add new packages unless the implementation becomes impossible without one.

---

# 7. Component/API Requirements

## 7.1 `WaterLightField`

Create:

```txt
src/components/brand/WaterLightField.tsx
```

Purpose:

```txt
Adds a subtle animated water-light field behind the hero visual or page shell.
```

Props:

```ts
export type WaterLightFieldProps = {
  intensity?: "subtle" | "medium";
  variant?: "hero" | "section" | "ambient";
  className?: string;
};
```

Behavior:

```txt
- Pure CSS/SVG/HTML implementation.
- No canvas required.
- Uses layered radial gradients and pseudo-elements.
- Animation must pause/reduce under prefers-reduced-motion.
- Must not block pointer events.
- Must not reduce text contrast.
```

Suggested markup:

```tsx
export function WaterLightField({
  intensity = "subtle",
  variant = "ambient",
  className = "",
}: WaterLightFieldProps) {
  return (
    <div
      className={`waterLightField waterLightField--${variant} waterLightField--${intensity} ${className}`}
      aria-hidden="true"
    >
      <span className="waterLightField__caustic" />
      <span className="waterLightField__glow waterLightField__glow--one" />
      <span className="waterLightField__glow waterLightField__glow--two" />
    </div>
  );
}
```

CSS requirements:

```css
.waterLightField {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
  opacity: 0.72;
}

.waterLightField__caustic {
  position: absolute;
  inset: -20%;
  background:
    radial-gradient(circle at 20% 30%, rgba(126, 231, 242, 0.12), transparent 28%),
    radial-gradient(circle at 70% 55%, rgba(247, 201, 72, 0.08), transparent 30%),
    linear-gradient(115deg, transparent 0 38%, rgba(126, 231, 242, 0.08) 42%, transparent 48%);
  filter: blur(10px);
  transform: translate3d(0, 0, 0);
  animation: waterLightDrift 18s ease-in-out infinite alternate;
}

@keyframes waterLightDrift {
  from {
    transform: translate3d(-2%, -1%, 0) rotate(-1deg);
  }

  to {
    transform: translate3d(2%, 1%, 0) rotate(1deg);
  }
}

@media (prefers-reduced-motion: reduce) {
  .waterLightField__caustic {
    animation: none;
  }
}
```

## 7.2 `PointerGlow`

Create:

```txt
src/components/ui/PointerGlow.tsx
```

Purpose:

```txt
Adds a desktop-only cursor-follow glow inside selected surfaces.
```

Props:

```ts
export type PointerGlowProps = {
  className?: string;
  disabled?: boolean;
};
```

Implementation rules:

```txt
- Use CSS custom properties: --pointer-x and --pointer-y.
- Attach pointermove only to the component root or target surface.
- Disable on touch devices.
- Disable under prefers-reduced-motion if needed.
- Throttle using requestAnimationFrame.
- Do not set React state on every pointer event.
```

Suggested hook:

```ts
function usePointerGlow<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const frame = useRef<number | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const handleMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;

      if (frame.current) cancelAnimationFrame(frame.current);

      frame.current = requestAnimationFrame(() => {
        const rect = node.getBoundingClientRect();
        node.style.setProperty("--pointer-x", `${event.clientX - rect.left}px`);
        node.style.setProperty("--pointer-y", `${event.clientY - rect.top}px`);
      });
    };

    node.addEventListener("pointermove", handleMove);

    return () => {
      node.removeEventListener("pointermove", handleMove);
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, []);

  return ref;
}
```

Use this pattern directly in `ProjectRippleCard` or expose as a small hook:

```txt
src/hooks/usePointerGlow.ts
```

Preferred approach:

```txt
Create `src/hooks/usePointerGlow.ts`.
Use it in ProjectRippleCard, YinYangProjectScene trigger, and contact panel only.
```

## 7.3 `Reveal`

Create:

```txt
src/components/ui/Reveal.tsx
```

Purpose:

```txt
Provides consistent section/card reveal animation without repeating Framer Motion code.
```

Props:

```ts
export type RevealProps = {
  children: React.ReactNode;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  delay?: number;
  y?: number;
  once?: boolean;
};
```

Behavior:

```txt
- Uses framer-motion because it already exists in package dependencies.
- Defaults to once=true.
- Reduced motion should render content immediately.
- Do not hide content from screen readers.
```

Suggested implementation:

```tsx
import { motion, useReducedMotion } from "framer-motion";

export function Reveal({
  children,
  as = "div",
  className,
  delay = 0,
  y = 18,
  once = true,
}: RevealProps) {
  const reduceMotion = useReducedMotion();
  const MotionTag = motion[as as "div"] ?? motion.div;

  if (reduceMotion) {
    const Tag = as as "div";
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-80px" }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </MotionTag>
  );
}
```

## 7.4 `ScrollProgressRail`

Create:

```txt
src/components/layout/ScrollProgressRail.tsx
```

Purpose:

```txt
Shows subtle vertical page progress and active section awareness on desktop.
```

Props:

```ts
export type ScrollProgressSection = {
  id: string;
  label: string;
};

export type ScrollProgressRailProps = {
  sections: ScrollProgressSection[];
};
```

Default sections:

```ts
const sections = [
  { id: "top", label: "Intro" },
  { id: "work", label: "Work" },
  { id: "systems", label: "Systems" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];
```

Behavior:

```txt
- Desktop only by default.
- Fixed to right side.
- Uses IntersectionObserver to determine active section.
- Each dot is an anchor link.
- Includes aria-label="Section navigation".
- Active dot has aria-current="true".
- Must not overlap content at widths below 1180px.
- Hide below 1024px.
```

Suggested markup:

```tsx
<nav className="scrollProgressRail" aria-label="Section navigation">
  {sections.map((section) => (
    <a
      key={section.id}
      href={`#${section.id}`}
      className={activeId === section.id ? "is-active" : ""}
      aria-current={activeId === section.id ? "true" : undefined}
    >
      <span className="scrollProgressRail__dot" />
      <span className="scrollProgressRail__label">{section.label}</span>
    </a>
  ))}
</nav>
```

## 7.5 Navbar active states

Enhance existing navbar links.

Requirements:

```txt
- Use same active section state as ScrollProgressRail or duplicate simple observer logic in a hook.
- Add active styling to navbar links.
- Active styling must be subtle: cyan underline/glow or filled glass pill.
- Do not make nav visually noisy.
```

Preferred shared hook:

```txt
src/hooks/useActiveSection.ts
```

API:

```ts
export function useActiveSection(sectionIds: string[]): string | null;
```

## 7.6 `Magnetic`

Create optional wrapper:

```txt
src/components/ui/Magnetic.tsx
```

Purpose:

```txt
Adds small desktop-only magnetic movement for primary buttons and project cards.
```

Props:

```ts
export type MagneticProps = {
  children: React.ReactNode;
  strength?: number;
  className?: string;
  disabled?: boolean;
};
```

Rules:

```txt
- Desktop pointer only.
- Movement must be small: 4px to 8px max.
- Do not use on text-heavy blocks.
- Disable under prefers-reduced-motion.
- Must reset transform on pointerleave.
- Use requestAnimationFrame, not React state per pointer event.
```

Use only on:

```txt
primary hero CTA
secondary resume CTA
project card button wrapper
contact CTA buttons
```

Do not use on:

```txt
navbar links
drawer close button
mobile touch targets
long sections
```

## 7.7 `InteractiveSystemCard`

Extract current system cards from `App.jsx` into a component.

Create:

```txt
src/components/sections/SystemsSection.tsx
src/components/systems/InteractiveSystemCard.tsx
```

Purpose:

```txt
Make the Systems section feel more polished and easier to scan.
```

Props:

```ts
export type SystemItem = {
  icon: React.ComponentType<{ "aria-hidden"?: boolean }>;
  title: string;
  body: string;
  proof?: string;
  accent?: "water" | "gold" | "jade";
};

export type InteractiveSystemCardProps = {
  item: SystemItem;
  index?: number;
};
```

Behavior:

```txt
- Hover/focus reveals a small proof line.
- Card gets pointer glow.
- Icon sits in a refined glass medallion.
- Entire card is not necessarily clickable unless it has a link.
- Keyboard focus should still show the reveal state if the card is focusable.
```

If no proof data exists yet, add proof strings directly near the systems array for now:

```txt
UI systems: Component libraries, tokens, Storybook, reusable surfaces.
Backend foundations: Auth, API contracts, PostgreSQL, Supabase, Django/DRF.
Operational clarity: Ticket dashboards, workflow mapping, runbooks, support tooling.
Product polish: Spec-led implementation, interaction states, accessible motion.
```

## 7.8 `ProjectFilterChips`

Create:

```txt
src/components/portfolio/ProjectFilterChips.tsx
```

Purpose:

```txt
Allows users to filter project cards by category/status/accent without leaving the page.
```

Data source:

```txt
projects.ts
```

Minimal filters:

```txt
All
Design Systems
Interactive Product
Operations Platform
Micro SaaS
Game Systems
Personal Platform
```

Implementation rules:

```txt
- Use button elements, not divs.
- Selected button has aria-pressed="true".
- Filtering should not remove the featured project unless the filter does not match it.
- When a filter hides the featured project, show the first matching project as featured if possible.
- Announce result count visually near the filter group.
- Keep state local to WorkSection.
```

Suggested API:

```ts
export type ProjectFilterChipsProps = {
  filters: string[];
  activeFilter: string;
  resultCount: number;
  onChange: (filter: string) => void;
};
```

## 7.9 Project card polish

Enhance:

```txt
src/components/portfolio/ProjectRippleCard.tsx
```

Required improvements:

```txt
- Add pointer glow via usePointerGlow.
- Add subtle edge shine on hover/focus.
- Improve selected state so the card feels actively connected to the drawer.
- Add accent-driven CSS variables based on data-accent.
- Add "View details" micro-motion arrow.
```

CSS requirements:

```css
.projectRippleCard {
  --card-accent: var(--water-soft);
  position: relative;
  overflow: hidden;
}

.projectRippleCard[data-accent="gold"] {
  --card-accent: var(--gold);
}

.projectRippleCard[data-accent="jade"] {
  --card-accent: var(--jade);
}

.projectRippleCard::before {
  content: "";
  position: absolute;
  inset: 0;
  background:
    radial-gradient(
      420px circle at var(--pointer-x, 50%) var(--pointer-y, 50%),
      color-mix(in srgb, var(--card-accent) 18%, transparent),
      transparent 42%
    );
  opacity: 0;
  transition: opacity 180ms ease;
  pointer-events: none;
}

.projectRippleCard:hover::before,
.projectRippleCard:focus-within::before {
  opacity: 1;
}
```

If `color-mix()` support is a concern, use explicit accent variables instead:

```css
.projectRippleCard {
  --card-accent-glow: rgba(126, 231, 242, 0.18);
}

.projectRippleCard[data-accent="gold"] {
  --card-accent-glow: rgba(247, 201, 72, 0.16);
}
```

## 7.10 Project drawer polish

Enhance:

```txt
src/components/portfolio/ProjectDetailDrawer.tsx
```

Current drawer already includes:

```txt
Escape close
focus return
focus trap
aria-modal
aria-labelledby
body drawerOpen state
```

Keep those behaviors.

Add:

```txt
project accent rail
sticky drawer header
mini internal nav
project stat/proof strip if data exists
clear external link buttons
smooth panel entrance
backdrop water blur
```

Do not weaken current accessibility.

Suggested visual structure:

```txt
Drawer
  Header
    Category / Title
    Close button
  Accent rail
  Summary
  Quick facts
    Status
    Role
    Stack count
  Content sections
    Overview
    My role
    Impact
    Key features
    Tech stack
    Links
```

Optional internal nav:

```txt
Overview
Role
Impact
Features
Stack
Links
```

Internal nav rules:

```txt
- Anchors scroll within drawer panel.
- Sticky under drawer header.
- Hide if drawer height is too small.
- Must not trap focus incorrectly.
```

---

# 8. Page-Level Interaction Plan

## 8.1 Hero upgrades

Update:

```txt
src/components/sections/HeroSection.tsx
```

Add:

```txt
WaterLightField inside hero visual
subtle animated line/ring around SignatureEmblem
micro-stat chips under hero summary
magnetic CTA wrappers if implemented
```

Micro-stat chips:

```txt
Full-stack product systems
Design systems + UI polish
Operations-focused dashboards
```

Do not add too many badges.

Maximum:

```txt
3 chips desktop
3 chips mobile, wrapping allowed
```

## 8.2 Work section upgrades

Update:

```txt
src/components/sections/WorkSection.tsx
```

Add:

```txt
ProjectFilterChips
result count
Reveal wrapper around section heading, featured scene, card grid
selected project visual connection
filtered featured project behavior
```

Filtering rules:

```txt
- All shows current behavior.
- Category filter uses project.category.
- Status filter can be added later, but not required.
- If no projects match, show a calm empty state.
```

Empty state copy:

```txt
No projects match this filter yet. Try viewing all work.
```

## 8.3 Systems section upgrades

Extract systems from `App.jsx` into:

```txt
src/components/sections/SystemsSection.tsx
```

Then replace inline App markup with:

```tsx
<SystemsSection />
```

This keeps `App.jsx` smaller and prepares the section for richer interactions.

## 8.4 Page shell upgrades

Update:

```txt
src/components/layout/PageShell.tsx
```

Add:

```txt
ScrollProgressRail
optional PointerGlow ambient layer only if performance remains strong
```

Preferred:

```tsx
const sectionNavItems = [
  { id: "top", label: "Intro" },
  { id: "work", label: "Work" },
  { id: "systems", label: "Systems" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

<ScrollProgressRail sections={sectionNavItems} />
```

---

# 9. Styling Requirements

## 9.1 New tokens

Add to `:root` in `src/index.css`:

```css
--motion-fast: 160ms;
--motion-base: 240ms;
--motion-slow: 520ms;
--ease-out: cubic-bezier(0.22, 1, 0.36, 1);
--ease-soft: cubic-bezier(0.16, 1, 0.3, 1);

--surface-glass-hover: rgba(255, 255, 255, 0.085);
--water-glow-soft: rgba(126, 231, 242, 0.18);
--gold-glow-soft: rgba(247, 201, 72, 0.16);
--jade-glow-soft: rgba(101, 214, 173, 0.16);
```

## 9.2 Reduced motion

Add a global reduced-motion block if not already present:

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    scroll-behavior: auto !important;
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.001ms !important;
  }
}
```

Important:

```txt
Do not use this to remove essential visible state changes.
Only remove motion duration.
```

## 9.3 Touch behavior

Desktop-only effects must be hidden or softened on touch devices:

```css
@media (hover: none) {
  .scrollProgressRail {
    display: none;
  }

  .projectRippleCard::before {
    display: none;
  }
}
```

## 9.4 Z-index rules

Use a simple z-index scale:

```css
--z-backdrop: 0;
--z-content: 1;
--z-sticky: 20;
--z-nav: 40;
--z-drawer: 80;
--z-toast: 100;
```

Drawer must remain above scroll progress rail and navbar.

---

# 10. Accessibility Requirements

## 10.1 Motion

```txt
- All motion respects prefers-reduced-motion.
- No infinite motion should be required for comprehension.
- Hero ambient animation must pause/reduce for reduced-motion users.
- Magnetic effects must be disabled for reduced-motion users.
```

## 10.2 Keyboard

```txt
- Project filter chips are reachable with Tab.
- Filter chips use button elements.
- Selected filter uses aria-pressed.
- Project cards remain button-accessible.
- Drawer focus trap must continue to work.
- Escape must still close the drawer.
- ScrollProgressRail links are reachable on desktop.
```

## 10.3 Screen readers

```txt
- Decorative water-light fields use aria-hidden="true".
- Scroll rail uses aria-label="Section navigation".
- Active scroll rail item uses aria-current.
- Result count is visible text; optional aria-live="polite".
- Drawer title remains connected with aria-labelledby.
```

## 10.4 Color and contrast

```txt
- Text over animated backgrounds must maintain contrast.
- Do not place low-opacity text over moving caustics.
- Hover/focus states must not rely on color alone.
- Focus-visible outline must remain visible on all interactive elements.
```

---

# 11. Responsive Behavior

## 11.1 Desktop ≥ 1180px

```txt
- ScrollProgressRail visible.
- Hero uses two-column layout.
- Pointer glow and magnetic effects enabled.
- Project filter chips sit above work grid.
- Drawer panel can be wide and detailed.
```

## 11.2 Laptop/tablet 768px–1179px

```txt
- ScrollProgressRail hidden below 1024px.
- Hero can remain two-column until layout becomes cramped.
- WaterLightField opacity reduced.
- Project filters wrap.
- Drawer takes most of viewport width.
```

## 11.3 Mobile < 768px

```txt
- Hero stacks.
- Hero visual may become shorter.
- Magnetic disabled.
- Pointer glow disabled.
- Filters become horizontally scrollable or wrap into two rows.
- Project cards maintain at least 44px touch targets.
- Drawer becomes full-screen or near full-screen.
```

## 11.4 Small mobile < 420px

```txt
- No horizontal overflow.
- Section headings do not clip.
- Filter chips remain usable.
- Drawer close button remains visible.
- Decorative effects are reduced.
```

---

# 12. Implementation Steps

## Step 1: Add shared hooks

Create:

```txt
src/hooks/useActiveSection.ts
src/hooks/usePointerGlow.ts
```

Acceptance:

```txt
- Hooks have no direct dependency on portfolio-specific components.
- Hooks clean up all observers/listeners.
- Hooks do not trigger excessive React re-renders.
```

## Step 2: Add shared interaction components

Create:

```txt
src/components/ui/Reveal.tsx
src/components/ui/Magnetic.tsx
src/components/brand/WaterLightField.tsx
src/components/layout/ScrollProgressRail.tsx
```

Acceptance:

```txt
- Components are small and reusable.
- Components are safe with reduced motion.
- Components do not add new dependencies.
```

## Step 3: Upgrade `PageShell`

Update:

```txt
src/components/layout/PageShell.tsx
```

Add:

```txt
ScrollProgressRail
shared section nav config
```

Acceptance:

```txt
- Rail is visible only on desktop.
- Rail does not overlap content.
- Rail links scroll to correct sections.
```

## Step 4: Upgrade `HeroSection`

Update:

```txt
src/components/sections/HeroSection.tsx
```

Add:

```txt
WaterLightField
micro-stat chips
Reveal wrappers
optional Magnetic around CTAs
```

Acceptance:

```txt
- Hero still communicates clearly with JS/motion reduced.
- Visual field does not obscure the signature emblem.
- CTA buttons remain easy to click/tap.
```

## Step 5: Add project filtering

Create:

```txt
src/components/portfolio/ProjectFilterChips.tsx
```

Update:

```txt
src/components/sections/WorkSection.tsx
```

Acceptance:

```txt
- All filter works.
- Each category filter works.
- Result count updates.
- Featured project updates intelligently.
- Empty state appears if needed.
```

## Step 6: Polish project cards

Update:

```txt
src/components/portfolio/ProjectRippleCard.tsx
src/index.css
```

Add:

```txt
pointer glow
accent-based hover glow
selected state
edge shine
CTA arrow movement
```

Acceptance:

```txt
- Cards look more premium.
- Hover/focus states are obvious.
- Touch devices are not penalized.
```

## Step 7: Extract and enhance Systems section

Create:

```txt
src/components/sections/SystemsSection.tsx
src/components/systems/InteractiveSystemCard.tsx
```

Update:

```txt
src/App.jsx
```

Acceptance:

```txt
- App.jsx no longer owns systems markup directly.
- System cards have consistent interaction states.
- Section is still simple and readable.
```

## Step 8: Polish drawer

Update:

```txt
src/components/portfolio/ProjectDetailDrawer.tsx
src/index.css
```

Add:

```txt
accent rail
sticky header
quick facts
better link buttons
internal nav if small enough to implement cleanly
```

Acceptance:

```txt
- Existing accessibility behavior remains intact.
- Drawer feels more premium.
- Drawer content is easier to scan.
```

## Step 9: CSS pass

Update:

```txt
src/index.css
```

Add:

```txt
new tokens
interaction classes
reduced motion rules
responsive rules
z-index rules
```

Acceptance:

```txt
- No horizontal overflow.
- No CSS duplication that becomes hard to maintain.
- New classes follow existing BEM-ish naming style.
```

## Step 10: QA

Run:

```bash
npm run lint
npm run build
npm run preview
```

Manual QA:

```txt
desktop Chrome
desktop Safari if available
mobile viewport in dev tools
keyboard-only navigation
reduced-motion mode
drawer open/close
project filtering
anchor navigation
```

---

# 13. Acceptance Criteria

- [ ] Spec is implemented with focused visual/interaction changes only.
- [ ] No new npm dependencies are added.
- [ ] Hero includes subtle water-light polish.
- [ ] Primary CTAs feel more premium without hurting usability.
- [ ] Work section includes project filter chips.
- [ ] Project cards include accent-aware pointer glow on desktop.
- [ ] Project cards have improved selected, hover, and focus states.
- [ ] Project drawer preserves existing accessibility behavior.
- [ ] Project drawer receives accent rail and better scan structure.
- [ ] Systems section is extracted from App.jsx into a section component.
- [ ] System cards receive refined interactive polish.
- [ ] Scroll progress rail appears on desktop only.
- [ ] Navbar or rail shows active section feedback.
- [ ] All animations respect prefers-reduced-motion.
- [ ] Touch devices do not rely on hover-only interactions.
- [ ] `npm run build` passes.
- [ ] `npm run lint` passes or existing lint issues are documented separately.
- [ ] Lighthouse performance should not meaningfully regress.
- [ ] No horizontal overflow on mobile.

---

# 14. Non-Goals

This spec does not include:

```txt
new case-study routes
blog
CMS
backend
email service changes
full theme toggle
new logo generation
full 3D/WebGL rewrite
copywriting overhaul
project data model rewrite
```

This spec should also not attempt to solve every portfolio improvement at once.

Route-based case studies should remain a separate implementation spec.

---

# 15. Risks and Mitigations

## Risk: Too much motion makes the site feel gimmicky

Mitigation:

```txt
Keep animations subtle.
Use slow ambient motion only in decorative areas.
Disable/reduce motion with prefers-reduced-motion.
Avoid scroll-jacking.
```

## Risk: Pointer effects hurt performance

Mitigation:

```txt
Use requestAnimationFrame.
Use CSS variables instead of React state.
Enable only on a few premium surfaces.
Disable on touch devices.
```

## Risk: CSS file becomes too large

Mitigation:

```txt
Group new CSS by component.
Use clear section comments.
Avoid one-off classes where existing patterns work.
Do not duplicate token values.
```

## Risk: Filters make featured project logic confusing

Mitigation:

```txt
Keep filter behavior simple.
All = current featured behavior.
Filtered = first matching featured-style project.
Show result count.
Show empty state if needed.
```

## Risk: Drawer accessibility regresses

Mitigation:

```txt
Do not replace the current drawer focus trap.
Only add visual/layout improvements around it.
Test Escape, Tab, Shift+Tab, backdrop click, and focus return.
```

---

# 16. QA Checklist

## Build and lint

- [ ] `npm run build`
- [ ] `npm run lint`
- [ ] `npm run preview`

## Visual QA

- [ ] Hero visual looks premium and not cluttered.
- [ ] Water-light field does not reduce readability.
- [ ] Buttons feel refined on hover.
- [ ] Project cards have consistent hover/focus states.
- [ ] Drawer looks connected to selected project accent.
- [ ] Systems cards feel interactive but readable.
- [ ] Scroll rail is subtle and useful.

## Responsive QA

- [ ] 1440px desktop
- [ ] 1280px laptop
- [ ] 1024px tablet landscape
- [ ] 768px tablet
- [ ] 430px mobile
- [ ] 390px mobile
- [ ] 360px small mobile

## Accessibility QA

- [ ] Keyboard can reach every interactive element.
- [ ] Visible focus appears on filters, cards, buttons, links, drawer close.
- [ ] Escape closes project drawer.
- [ ] Drawer returns focus to previous element.
- [ ] Reduced motion disables ambient/magnetic motion.
- [ ] Filter buttons expose selected state.
- [ ] Scroll rail exposes active section with aria-current.

## Performance QA

- [ ] No animation causes visible jank.
- [ ] No layout shift on filter changes beyond expected grid reflow.
- [ ] No console errors.
- [ ] No runaway pointermove state updates.

---

# 17. Suggested File Change Plan

```txt
src/
  hooks/
    useActiveSection.ts
    usePointerGlow.ts

  components/
    brand/
      WaterLightField.tsx

    layout/
      PageShell.tsx
      ScrollProgressRail.tsx

    sections/
      HeroSection.tsx
      WorkSection.tsx
      SystemsSection.tsx

    systems/
      InteractiveSystemCard.tsx

    portfolio/
      ProjectFilterChips.tsx
      ProjectRippleCard.tsx
      ProjectDetailDrawer.tsx

    ui/
      Reveal.tsx
      Magnetic.tsx

  index.css
```

Expected size:

```txt
New code: 450-800 lines
Modified code: 250-600 lines
No single file should receive more than 350 new lines if avoidable.
```

---

# 18. Codex Implementation Prompt

```txt
Implement Spec 0015 for the personal portfolio repo.

Goal:
Add visual polish and advanced interactive components without rewriting the site or adding dependencies.

Current architecture:
- React + Vite portfolio.
- Global styles live in src/index.css.
- Existing components include HeroSection, WorkSection, ProjectRippleCard, YinYangProjectScene, ProjectDetailDrawer, PageShell.
- Framer Motion is already installed.
- Keep the existing water/gold/Chinese-inspired brand direction.

Required implementation:
1. Add reusable hooks:
   - src/hooks/useActiveSection.ts
   - src/hooks/usePointerGlow.ts

2. Add reusable components:
   - src/components/ui/Reveal.tsx
   - src/components/ui/Magnetic.tsx
   - src/components/brand/WaterLightField.tsx
   - src/components/layout/ScrollProgressRail.tsx

3. Update PageShell:
   - render ScrollProgressRail with sections top/work/systems/about/contact
   - desktop only

4. Update HeroSection:
   - add WaterLightField inside hero visual
   - add 3 micro-stat chips under summary
   - use Reveal and optional Magnetic wrappers
   - preserve current content and actions

5. Update WorkSection:
   - add ProjectFilterChips
   - filter projects by category
   - show result count
   - keep featured project behavior intuitive
   - preserve drawer behavior

6. Update ProjectRippleCard:
   - use pointer glow hook
   - add accent-aware hover/focus glow
   - improve selected state
   - keep card as accessible button

7. Extract systems markup from App.jsx:
   - create SystemsSection
   - create InteractiveSystemCard
   - update App.jsx to render <SystemsSection />

8. Update ProjectDetailDrawer:
   - preserve focus trap, Escape close, aria-modal, aria-labelledby, focus return
   - add accent rail, sticky header, quick facts, better link buttons
   - do not regress accessibility

9. Update src/index.css:
   - add motion tokens
   - add water-light field styles
   - add scroll rail styles
   - add filter chip styles
   - add pointer glow/card polish styles
   - add drawer polish styles
   - add responsive and reduced-motion rules

Constraints:
- Do not add new npm dependencies.
- Do not rewrite unrelated components.
- Do not introduce route-based case studies in this spec.
- Do not remove existing accessibility behavior.
- Keep mobile clean and free from horizontal overflow.
- All animations must respect prefers-reduced-motion.

Verification:
- npm run build
- npm run lint
- manual test keyboard navigation
- manual test reduced motion
- manual test mobile widths 360px, 390px, 430px
```

---

# 19. Done Definition

This spec is complete when:

```txt
the site feels more premium and interactive
the hero has refined water-light motion
project exploration has filters and stronger card feedback
the systems section feels intentionally interactive
the drawer feels polished and remains accessible
desktop users get progress/active-section feedback
mobile users get a clean, non-cluttered experience
all motion respects reduced-motion settings
build passes
lint passes or pre-existing lint issues are documented
```
