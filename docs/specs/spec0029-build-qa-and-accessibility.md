# Spec 0029: Build, QA, Accessibility, and Deployment Validation

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
- Spec 0027: Project Cards and Case Study Sections
- Spec 0028: Contact, SEO, and Resume Assets

---

# 1. Purpose

Define the final validation process before deploying the portfolio redo.

The site should not ship with broken demo links, dead buttons, inaccessible cards, outdated project names, or non-presentable projects.

---

# 2. Required Commands

Run:

```bash
npm install
npm run lint
npm run build
npm run verify:demos
npm run preview
```

If configured:

```bash
npm run quality:all
```

---

# 3. Manual QA Checklist

## 3.1 Content

- [ ] Hero text is backend/full-stack focused.
- [ ] About text is specific and non-generic.
- [ ] DockFlow is displayed instead of DaChongWMS.
- [ ] CertChase is absent.
- [ ] Project copy does not invent metrics.
- [ ] Resume download is current.
- [ ] Contact email is current.

## 3.2 Demo Links

- [ ] No pending demo is clickable in production.
- [ ] Verified demo links open in a new tab.
- [ ] Failed demo verification blocks merge if project is marked verified.
- [ ] `ui.thejasonhuang.com` is only linked if verified.
- [ ] `timemesh.thejasonhuang.com` is only linked if verified.
- [ ] `chemfarm.thejasonhuang.com` is only linked if verified.
- [ ] `dockflow.thejasonhuang.com` is only linked if verified.

## 3.3 Accessibility

- [ ] Project cards are keyboard accessible.
- [ ] Demo/source buttons are real anchors or buttons with correct behavior.
- [ ] Images have meaningful alt text.
- [ ] Decorative elements are `aria-hidden`.
- [ ] Focus states are visible.
- [ ] Motion respects `prefers-reduced-motion`.
- [ ] Text contrast is strong on dark/glass panels.

## 3.4 Responsive Behavior

Test:

```txt
375px mobile
768px tablet
1024px laptop
1440px desktop
```

- [ ] Hero does not overflow.
- [ ] Project cards are readable.
- [ ] CTAs do not overlap.
- [ ] Timeline/experience section remains scannable.
- [ ] Contact section is usable on mobile.

---

# 4. Search Checks

Run:

```bash
grep -R "DaChong" -n src public README.md package.json .
grep -R "CertChase" -n src public README.md package.json .
grep -R "cutting-edge" -n src public README.md .
grep -R "innovative solutions" -n src public README.md .
```

Expected:

```txt
No public-facing matches.
```

If a match appears in a spec, changelog, or private note, confirm it is not rendered publicly.

---

# 5. Deployment

Deploy only after:

- [ ] build passes
- [ ] demo verification passes
- [ ] visual QA passes
- [ ] no CertChase public references
- [ ] no DaChongWMS public references
- [ ] pending demo links are hidden
- [ ] current resume asset is confirmed

Deploy command, if using gh-pages:

```bash
npm run deploy
```

---

# 6. Acceptance Criteria

- [ ] All required commands pass.
- [ ] No broken demo links are shown.
- [ ] No CertChase references appear.
- [ ] No DaChongWMS public references appear.
- [ ] Portfolio deploys successfully to `thejasonhuang.com`.
- [ ] Final site is credible for SWE/backend/full-stack applications.

---

# 7. Codex Implementation Prompt

```txt
Implement Spec 0029: Build, QA, Accessibility, and Deployment Validation.

Add or update validation scripts as needed, run the required build and verification commands, and fix any issues found. Confirm no public CertChase or DaChongWMS references remain. Confirm pending demo links are hidden. Confirm accessibility basics for project cards, CTAs, images, focus states, and reduced motion.

Do not deploy unless all checks pass.
```
