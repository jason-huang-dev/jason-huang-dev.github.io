# Spec 0027: Project Cards and Case Study Sections

## Status

proposed

## Owner

Jason Huang

## Last Updated

2026-05-30

## Depends On

- Spec 0024: Portfolio Redo Content Strategy
- Spec 0025: Project Registry Demo Link Gating
- Spec 0026: Rename DaChongWMS to DockFlow

---

# 1. Purpose

Replace the current project accordion/card copy with a clearer project presentation that is readable, scannable, and credible for recruiters and engineers.

The section should answer:

```txt
What is the project?
What did Jason build?
What stack was used?
What impact or engineering depth does it show?
Can I view code or demo?
```

---

# 2. Required Project Cards

## 2.1 DockFlow

```txt
Name: DockFlow
Category: Featured Systems
Stack: Django REST Framework, React, PostgreSQL, CI/CD
Summary: Warehouse operations platform with modular Django REST APIs for inventory, inbound/outbound workflows, returns, logistics, work orders, reporting, automation, and marketplace integrations.
Impact:
- Built modular backend boundaries across 20+ Django app domains.
- Preserved API compatibility across versioned and legacy route groups.
- Instrumented automation reliability with scheduled jobs, worker heartbeats, retries, dead-letter states, and alerts.
Demo: https://dockflow.thejasonhuang.com only after verification passes.
```

## 2.2 ChemFarm

```txt
Name: ChemFarm
Category: Featured Systems
Stack: FastAPI, Supabase, PostgreSQL, RLS/RPC, ETL
Summary: Game-powered STEM learning platform that turns curriculum data into playable learning content through FastAPI services, Supabase-backed storage, and validated ingestion workflows.
Impact:
- Implemented backend routers for gameplay metadata, rendering, asset storage, ingestion, tooling, health checks, and plant generation.
- Converted manual content updates into a parser-based ingestion workflow with dry-run validation and normalized writes.
- Designed around Supabase-backed data access and write controls.
Demo: https://chemfarm.thejasonhuang.com only after verification passes.
```

## 2.3 TimeMesh

```txt
Name: TimeMesh
Category: Featured Systems
Stack: React, Django REST Framework, PostgreSQL, AWS, Docker, GitHub Actions
Summary: Productivity SaaS platform for scheduling workflows, calendar events, and goal planning.
Impact:
- Reduced median API latency from roughly 83ms to 25ms through PostgreSQL indexing and DRF query rewrites.
- Moved Postman regression suites into GitHub Actions to shorten CI/runtime feedback loops.
- Built calendar-oriented product workflows across frontend, backend, database, and deployment layers.
Demo: https://timemesh.thejasonhuang.com only after verification passes.
```

## 2.4 UI Library

```txt
Name: UI Library
Category: Product & Automation
Stack: React, TypeScript, Storybook, Tailwind/CSS
Summary: Reusable interface system for building consistent, polished components across personal products and portfolio experiments.
Impact:
- Centralizes reusable UI primitives and branded components.
- Supports faster iteration across project frontends.
- Provides a foundation for portfolio and product visual consistency.
Demo: https://ui.thejasonhuang.com only after verification passes.
```

## 2.5 Video Automation Pipeline

```txt
Name: Video Automation Pipeline
Category: Product & Automation
Stack: Python, Makefile, Remotion, n8n
Summary: Repeatable script-to-video workflow that packages prompts, scripts, audio, captions, storyboards, render assets, QA reports, upload metadata, and logs into production artifacts.
Impact:
- Organized a multi-stage video workflow into repeatable artifacts.
- Reduced manual handoff risk by standardizing file outputs and QA checkpoints.
- Supports content production systems such as The Stock Showdown.
Demo: no public demo unless a safe viewer exists.
```

## 2.6 csRU Course Planner

```txt
Name: csRU Course Planner
Category: Supporting Work
Stack: React, Python, Docker
Summary: Rutgers Computer Science course planning tool for exploring degree requirements, course options, and academic planning constraints.
Impact:
- Built around real student planning needs.
- Demonstrates product thinking for education workflows.
- Shows early full-stack collaboration and planning-system experience.
Demo: only if a live deployment is verified.
```

## 2.7 Market Bot

```txt
Name: Market Bot
Category: Supporting Work
Stack: Python, Discord, APIs
Summary: Discord-based market research bot that gathers financial news and market data to support faster company and stock analysis workflows.
Impact:
- Integrates external data into a chat-first workflow.
- Demonstrates automation around finance and research.
- Useful as an earlier project, not a top featured system.
Demo: no public demo.
```

---

# 3. CertChase Exclusion

Do not add CertChase.

Reason:

```txt
CertChase has not been implemented and is not presentable yet.
```

It can be added later only after:

- [ ] repo has meaningful implementation
- [ ] deployment exists
- [ ] demo passes verification
- [ ] project has screenshots or credible preview
- [ ] copy can describe actual shipped work

---

# 4. UI Requirements

Project cards should show:

```txt
name
category/status
summary
stack chips
2-3 impact bullets
source link if safe
demo link only if verified
```

Avoid:

```txt
overly long paragraph-only cards
dead demo buttons
hidden/commented live-demo buttons
duplicate Docker tags
generic descriptions
```

---

# 5. Acceptance Criteria

- [ ] Projects use the required copy as the baseline.
- [ ] Cards are readable without opening every project.
- [ ] Demo buttons only render for verified demos.
- [ ] Source links do not expose old project names.
- [ ] DockFlow appears before ChemFarm and TimeMesh.
- [ ] UI Library is included only if it has a verified or pending demo state.
- [ ] Video Automation Pipeline is included without pretending it has an app demo.
- [ ] CertChase is absent.
- [ ] `npm run build` passes.

---

# 6. Codex Implementation Prompt

```txt
Implement Spec 0027: Project Cards and Case Study Sections.

Refactor the Projects section to present clear project cards with name, category, summary, stack chips, impact bullets, source link, and gated demo link. Use the project copy in this spec. Do not render demo buttons unless demoStatus is verified. Include DockFlow, ChemFarm, TimeMesh, UI Library, Video Automation Pipeline, csRU Course Planner, and Market Bot. Do not include CertChase.

Remove old generic project intro copy, duplicate tags, and commented-out dead demo button code. Build must pass.
```
