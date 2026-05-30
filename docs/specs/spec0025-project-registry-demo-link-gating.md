# Spec 0025: Project Registry Demo Link Gating

## Status

proposed

## Owner

Jason Huang

## Last Updated

2026-05-30

## Depends On

- Spec 0024: Portfolio Redo Content Strategy

---

# 1. Purpose

Create a structured project registry so the portfolio can safely render repository links, demo links, status labels, and project categories without accidentally linking broken sites.

Demo links must only be shown when verified.

---

# 2. Problem

The portfolio needs to reference live demos such as:

```txt
ui.thejasonhuang.com
timemesh.thejasonhuang.com
chemfarm.thejasonhuang.com
dockflow.thejasonhuang.com
```

But these should not be linked in production until they are confirmed live.

A broken demo link hurts credibility more than no demo link.

---

# 3. Create Project Registry

Create:

```txt
src/data/projects.js
```

or, if migrating to TypeScript:

```txt
src/data/projects.ts
```

Suggested shape:

```ts
export type ProjectStatus = "featured" | "active" | "archive" | "private";
export type DemoStatus = "verified" | "pending" | "disabled";

export type PortfolioProject = {
  id: string;
  name: string;
  shortName?: string;
  category: "featured-systems" | "product-automation" | "supporting-work";
  status: ProjectStatus;
  summary: string;
  impact: string[];
  stack: string[];
  repoUrl?: string;
  demoUrl?: string;
  demoStatus: DemoStatus;
  demoLabel?: string;
  imageKey?: string;
  isPresentable: boolean;
};
```

---

# 4. Demo Link Rule

Render a live demo button only when:

```ts
project.demoUrl && project.demoStatus === "verified"
```

If a project has `demoStatus: "pending"`, do not render the demo button.

Optional:

```txt
Show a subtle "Demo pending" pill only in development mode, not production.
```

Never render a disabled-looking dead link in production.

---

# 5. Demo URL Verification Script

Add:

```txt
scripts/verify-demo-links.mjs
```

The script should:

- read the project registry
- collect `demoUrl` values
- request each URL with `fetch`
- follow redirects
- pass only for HTTP `200-399`
- fail if a `verified` demo does not respond successfully
- optionally print `pending` demo statuses without failing

Example command:

```bash
node scripts/verify-demo-links.mjs
```

Add package script:

```json
"verify:demos": "node scripts/verify-demo-links.mjs"
```

Update quality script:

```json
"quality:all": "npm run build && npm run verify:demos && npm run quality:lighthouse && npm run quality:axe"
```

---

# 6. Initial Demo Status

Use this initial registry state:

```txt
thejasonhuang.com -> verified
ui.thejasonhuang.com -> pending
timemesh.thejasonhuang.com -> pending
chemfarm.thejasonhuang.com -> pending
dockflow.thejasonhuang.com -> pending
```

Only mark a project demo as `verified` after the script passes against that domain.

---

# 7. Initial Project Registry Content

Use this order:

```txt
DockFlow
ChemFarm
TimeMesh
UI Library
Video Automation Pipeline
csRU Course Planner
Market Bot
```

Do not add:

```txt
CertChase
```

---

# 8. Acceptance Criteria

- [ ] Project data is moved out of `src/constants/index.js` into a dedicated registry or clean data module.
- [ ] Each project has `demoStatus`.
- [ ] Demo button renders only for `demoStatus === "verified"`.
- [ ] Demo verification script exists.
- [ ] Package script `verify:demos` exists.
- [ ] `quality:all` includes demo verification.
- [ ] Pending demos do not appear as clickable links in production.
- [ ] CertChase is absent from the registry.
- [ ] `npm run build` passes.

---

# 9. Codex Implementation Prompt

```txt
Implement Spec 0025: Project Registry Demo Link Gating.

Create a structured project registry with demoStatus support. Refactor Projects rendering so live demo buttons only appear when demoStatus is "verified". Add scripts/verify-demo-links.mjs and a package script verify:demos. Do not render pending demo links in production.

Initial pending demos:
- https://ui.thejasonhuang.com
- https://timemesh.thejasonhuang.com
- https://chemfarm.thejasonhuang.com
- https://dockflow.thejasonhuang.com

Do not add CertChase. Build must pass.
```
