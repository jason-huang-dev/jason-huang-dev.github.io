# Spec 0011: Project Grid and Featured Interaction Integration

## Status

proposed

## Owner

Jason Huang

## Last Updated

2026-05-25

## Target Area

Work section composition, featured project placement, project grid hierarchy, and project drawer integration.

---

# 1. Purpose

This spec integrates the standard Ripple Work Grid with the new FeaturedYinYangProject module.

The goal is to create a strong work section hierarchy:

```txt
featured project = memorable branded interaction
remaining projects = readable ripple cards
detail drawer = full explanation
```

---

# 2. Product Goal

The Work section should be both distinctive and practical.

Visitors should quickly understand:

```txt
which project is most important
what other projects exist
how to scan the work
how to open details
```

The featured interaction should not make the rest of the work section harder to use.

---

# 3. User Experience

Recommended section flow:

```txt
Work in Motion heading
short explanatory subtitle
FeaturedYinYangProject for top project
RippleWorkGrid for remaining projects
ProjectDetailDrawer shared by both featured and grid cards
```

Example:

```txt
Featured:
UI Library or The Stock Showdown

Grid:
DaChong WMS
CertChase
Roblox Systems
Portfolio System
Other future projects
```

---

# 4. Visual Direction

The Work section should feel cohesive.

Featured module:

```txt
larger
more symbolic
more animated
uses gold + cyan strongly
```

Normal cards:

```txt
cleaner
more scannable
less animated
uses cyan border and subtle ripple
```

The featured module should be the only place where the yin-yang partition appears.

---

# 5. Component/API Requirements

Update:

```txt
src/components/sections/RippleWorkSection.tsx
```

or rename to:

```txt
src/components/sections/WorkSection.tsx
```

Recommended structure:

```tsx
export function WorkSection() {
  const featuredProject = projects.find((project) => project.featured);
  const remainingProjects = projects.filter((project) => project.id !== featuredProject?.id);

  return (
    <section id="work">
      <SectionHeader />
      {featuredProject ? (
        <FeaturedYinYangProject project={featuredProject} onOpen={handleOpen} />
      ) : null}
      <div className="projectGrid">
        {remainingProjects.map((project) => (
          <ProjectRippleCard key={project.id} project={project} onOpen={handleOpen} />
        ))}
      </div>
      <ProjectDetailDrawer project={selectedProject} open={Boolean(selectedProject)} onClose={handleClose} />
    </section>
  );
}
```

If multiple projects are marked `featured`, select the first and render the rest in the grid.

---

# 6. Responsive Behavior

Desktop:

```txt
featured module full width above grid
grid below in 2 or 3 columns depending width
```

Tablet:

```txt
featured module full width
grid 2 columns
```

Mobile:

```txt
featured module static card
grid 1 column
drawer full-screen or bottom sheet
```

Spacing:

```txt
section header to featured module: 40px to 56px
featured module to grid: 32px to 48px
grid gap desktop: 20px to 24px
grid gap mobile: 16px to 20px
```

---

# 7. Accessibility

- The heading should identify the work section.
- Featured project and grid cards must be reachable by keyboard.
- Drawer state should be shared and not duplicated.
- Focus should return to the triggering card or featured module.
- Use real buttons/links for interactive elements.
- No content should be accessible only through hover.

---

# 8. Implementation Details

## 8.1 Featured Selection Rule

Use:

```ts
const featuredProject = projects.find((project) => project.featured) ?? projects[0];
```

Then:

```ts
const remainingProjects = projects.filter(
  (project) => project.id !== featuredProject.id
);
```

## 8.2 Shared Drawer State

Use one drawer state in the section:

```ts
const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

const selectedProject = projects.find(
  (project) => project.id === selectedProjectId
) ?? null;
```

Both `FeaturedYinYangProject` and `ProjectRippleCard` call:

```ts
onOpen(project.id)
```

## 8.3 Visual Hierarchy

Do not let normal grid cards have the same visual weight as the featured module.

Normal cards should use:

```txt
smaller glow
less dramatic transform
less gold
more straightforward layout
```

Featured module should use:

```txt
larger scale
stronger gold/cyan symbolism
preview area
more expressive layout
```

## 8.4 If Drawer Spec Is Not Implemented Yet

If `ProjectDetailDrawer` is not available, clicking should still set selected project state and visually mark the selected project.

Do not block this spec entirely.

---

# 9. Acceptance Criteria

- [ ] Work section renders one featured project.
- [ ] Remaining projects render as normal ripple cards.
- [ ] Featured project is selected from `featured: true` data.
- [ ] Shared ProjectDetailDrawer opens from featured module and grid cards.
- [ ] Mobile work section remains clear and stacked.
- [ ] Featured interaction does not appear on every card.
- [ ] Project grid remains easy to scan.
- [ ] No duplicate project content is hardcoded.
- [ ] Keyboard navigation works across featured module and grid.

---

# 10. Non-Goals

This spec does not require:

- filtering projects;
- sorting controls;
- multiple featured projects;
- project page routes;
- live previews;
- WebGL/canvas;
- analytics on card clicks.

---

# 11. Risks and Mitigations

## Risk: Featured module overpowers work section

Mitigation:

- keep one featured module;
- use clear section spacing;
- make normal cards visually quieter but readable.

## Risk: Data model has no featured project

Mitigation:

- fallback to first project;
- document which project should be featured.

## Risk: Drawer state becomes duplicated

Mitigation:

- manage selected project only in WorkSection;
- pass one `onOpen` function to all project components.

---

# 12. QA Checklist

- [ ] One featured project appears.
- [ ] Remaining projects do not duplicate featured project.
- [ ] Click featured project opens drawer.
- [ ] Click normal card opens drawer.
- [ ] Keyboard opens drawer.
- [ ] Mobile layout is stacked.
- [ ] No hover-only content on mobile.
- [ ] No horizontal overflow.
- [ ] Reduced motion works.

---

# 13. Codex Implementation Prompt

```txt
Implement Spec 0011.

Integrate the FeaturedYinYangProject module into the Work section above the existing Ripple Work Grid. Select one project from the centralized project data using featured: true, render all remaining projects as normal ProjectRippleCard items, and share one ProjectDetailDrawer state between featured and normal cards. Keep the featured interaction unique to one project. Ensure the layout is responsive, accessible, and easy to scan.
```

---

# 14. Done Definition

Spec 0011 is complete when the Work section has a clear hierarchy: one memorable featured yin-yang project interaction, a readable grid of remaining projects, and a shared accessible project detail drawer.
