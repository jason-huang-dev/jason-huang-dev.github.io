# Spec 0026: Rename DaChongWMS to DockFlow

## Status

proposed

## Owner

Jason Huang

## Last Updated

2026-05-30

## Depends On

- Spec 0025: Project Registry Demo Link Gating

---

# 1. Purpose

Rename all public-facing references of `DaChongWMS` to **DockFlow**.

This applies to:

```txt
portfolio UI
project cards
metadata
alt text
image names where practical
repository labels
project registry IDs
search/SEO text
README references if mirrored into the portfolio
```

---

# 2. Public Name

Use:

```txt
DockFlow
```

Do not show:

```txt
DaChongWMS
DaChong WMS
DaChong
```

---

# 3. Repository URL Handling

Preferred:

```txt
https://github.com/jason-huang-dev/DockFlow
```

Only use this if the GitHub repository has actually been renamed.

If the GitHub repository remains at:

```txt
https://github.com/jason-huang-dev/DaChongWMS
```

then either:

1. rename the GitHub repository to `DockFlow`, or
2. hide the repo link until the repo URL is renamed, or
3. keep the repo link in data but label it internally only and do not expose `DaChongWMS` text in UI.

Do not display an old repo URL string on the project card if it exposes the old name.

---

# 4. Project Copy

Use this public summary:

```txt
DockFlow is a warehouse management and operations platform with a modular Django REST backend across authentication, IAM, inventory, inbound/outbound workflows, returns, logistics, fees, work orders, reporting, automation, and marketplace integrations.
```

Use this shorter card summary:

```txt
Warehouse operations platform with modular Django REST APIs for inventory, inbound/outbound workflows, returns, logistics, work orders, reporting, automation, and marketplace integrations.
```

Use these impact bullets for a detail view:

```txt
Built modular backend boundaries across 20+ Django app domains.
Preserved API compatibility across versioned and legacy route groups.
Instrumented automation reliability with scheduled tasks, worker heartbeats, retries, dead-letter states, and alert records.
```

Do not overstate production adoption unless a verified deployment/user metric exists.

---

# 5. Search Requirements

Before completion, search the codebase for:

```bash
grep -R "DaChong" -n src public package.json README.md .
grep -R "DaChongWMS" -n src public package.json README.md .
grep -R "WMS" -n src public package.json README.md .
```

Review matches manually. `WMS` can remain only if used as a generic explanatory term, not as part of the old project name.

---

# 6. Acceptance Criteria

- [ ] No public-facing `DaChongWMS` references remain.
- [ ] Project name is `DockFlow`.
- [ ] Project ID is `dockflow`.
- [ ] Project route/anchor, if any, uses `dockflow`.
- [ ] Demo URL is `https://dockflow.thejasonhuang.com` only if verified.
- [ ] Repository URL does not expose `DaChongWMS` unless GitHub has a redirect and the displayed label remains `Source`.
- [ ] Alt text uses `DockFlow project preview`.
- [ ] CertChase is not added during this rename.
- [ ] `npm run build` passes.

---

# 7. Codex Implementation Prompt

```txt
Implement Spec 0026: Rename DaChongWMS to DockFlow.

Rename all public-facing portfolio references from DaChongWMS to DockFlow. Use DockFlow in project names, IDs, alt text, SEO text, and project copy. Do not expose the old repo URL string on screen. If the GitHub repo has not been renamed, hide the source link or keep it as an internal data URL only.

Search for DaChong, DaChongWMS, and old WMS naming before completion. Do not add CertChase. Build must pass.
```
