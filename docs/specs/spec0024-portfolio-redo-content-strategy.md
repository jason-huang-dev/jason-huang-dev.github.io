# Spec 0024: Portfolio Redo Content Strategy

## Status

proposed

## Owner

Jason Huang

## Last Updated

2026-05-30

## Depends On

- Spec 0023: Seal Stamp Contact CTA
- Spec 0025: Project Registry Demo Link Gating

---

# 1. Purpose

Redo the portfolio text so the site presents Jason as a backend-heavy full-stack software engineer who builds useful product systems.

The current portfolio copy should no longer sound generic. It should emphasize:

```txt
backend/API engineering
full-stack product development
PostgreSQL/Supabase data modeling
Django REST Framework and FastAPI
automation and internal tools
cloud/DevOps/reliability
measurable product and operational outcomes
```

The site should feel credible for:

```txt
software engineer
backend engineer
full-stack engineer
developer tooling / internal tools engineer
data/platform-adjacent roles
```

---

# 2. Content Tone

Use a direct, confident, practical tone.

Good:

```txt
I build backend-heavy full-stack products across SaaS, education, warehouse operations, automation, and developer tooling.
```

Avoid:

```txt
I craft innovative solutions using cutting-edge technologies.
I am passionate about AI and digital experiences.
I build beautiful websites.
```

---

# 3. Hero Copy

Replace the hero headline/subheadline with role-specific copy.

## Required hero headline

```txt
Jason Huang
```

## Required hero eyebrow

```txt
Software Engineer · Backend & Full-Stack Systems
```

## Required hero body

```txt
I build reliable product systems across SaaS, education, warehouse operations, automation, and developer tooling — with a focus on clean APIs, practical data models, and measurable engineering outcomes.
```

## Required hero CTAs

```txt
View Projects
Contact Me
```

Optional secondary links:

```txt
GitHub
LinkedIn
Resume
```

---

# 4. About / Overview Copy

Replace the current overview text with:

```txt
I’m a software engineer studying Computer Science and Economics at Rutgers University. My work sits at the intersection of backend systems, full-stack product development, and automation.

Recently, I’ve built Django REST and FastAPI backends, PostgreSQL/Supabase data layers, CI/CD workflows, internal tools, and production-style project systems for scheduling, STEM learning, warehouse operations, video automation, and developer tooling.

I care about building software that is useful, maintainable, and measurable — not just polished on the surface.
```

---

# 5. Services / Capability Cards

Replace generic service cards with:

```txt
Backend & API Engineering
Full-Stack Product Development
Automation & Data Pipelines
Cloud, DevOps & Reliability
```

Each card should have a one-sentence detail if the component supports it.

```txt
Backend & API Engineering
Django REST, FastAPI, authentication, route design, validation, and service boundaries.

Full-Stack Product Development
React/Next/Vite frontends connected to practical backend and database workflows.

Automation & Data Pipelines
Scripts, ETL flows, ingestion tools, and repeatable workflows that reduce manual effort.

Cloud, DevOps & Reliability
Docker, AWS, Vercel, GitHub Actions, Postman regression checks, and deployment quality gates.
```

---

# 6. Section Introductions

## Projects Section Intro

```txt
Selected projects that show how I design, build, and ship product systems — from backend APIs and data models to automation workflows, internal tools, and user-facing applications.
```

## Experience Section Intro

```txt
My experience combines production support, web development, SaaS engineering, automation, mentoring, and technical ownership across school, fellowship, and independent product work.
```

## Contact Section Intro

```txt
Have a role, project, or collaboration where backend systems, automation, or full-stack product execution matter? I’d be happy to connect.
```

---

# 7. Project Grouping

Projects should be grouped into:

```txt
Featured Systems
Product & Automation
Earlier / Supporting Work
```

Required featured projects:

```txt
DockFlow
ChemFarm
TimeMesh
UI Library
```

Supporting projects:

```txt
Video Automation Pipeline
```

Excluded:

```txt
CertChase
csRU Course Planner
Market Bot
```

CertChase, csRU Course Planner, and market bot are not implemented or presentable yet and must not appear in navigation, project cards, featured sections, SEO metadata, or sitemap content.

---

# 8. Acceptance Criteria

- [ ] Generic AI/innovation phrasing is removed.
- [ ] Hero copy matches the required backend/full-stack positioning.
- [ ] About copy uses the revised Rutgers + backend/full-stack + automation narrative.
- [ ] Services are renamed to the four engineering capability areas.
- [ ] Projects intro is rewritten.
- [ ] Contact copy is rewritten.
- [ ] CertChase, csRU Course Planner, and market bot does not appear anywhere in public-facing copy.
- [ ] DockFlow is the public-facing name; DaChongWMS is not visible.
- [ ] Copy remains readable on mobile.
- [ ] No metrics are invented beyond resume-supported claims.
- [ ] `npm run build` passes.

---
