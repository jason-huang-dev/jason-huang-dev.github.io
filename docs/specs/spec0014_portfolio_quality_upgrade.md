# Spec 0014: Portfolio Quality Upgrade — Route-Based Case Studies, Premium Visual System, SEO, Accessibility, and Measurement

## Status

implemented

## Owner

Jason Huang

## Last Updated

2026-05-25

## Target Repository

`jason-huang-dev/jason-huang-dev.github.io`

## Related Research

This spec is based on the deep research audit of `thejasonhuang.com`, the portfolio GitHub repo, `UI-Library`, and the `Shorts` / Stock Showdown media automation repo.

---

## 1. Purpose

Upgrade the personal portfolio from a polished one-page React site into a high-quality personal platform with:

- Dedicated, shareable project routes.
- Stronger recruiter and technical-reader storytelling.
- Better SEO and social previews.
- Reusable design primitives aligned with Jason's UI-Library tokens.
- Advanced visual features that feel premium without hurting performance or accessibility.
- Automated quality checks for Lighthouse, accessibility, and routing regressions.

This spec should improve perceived quality while keeping implementation incremental and safe.

---

## 2. Background

The current portfolio app is already structured around reusable sections and centralized data:

- `src/App.jsx` renders the main site shell and sections such as hero, work, systems, about, and contact.
- `src/data/projects.ts` already includes project `slug`, `category`, `status`, `overview`, `role`, `impact`, `techStack`, `keyFeatures`, links, accents, and optional images.

This means the site does not need a full rebuild. The main issue is that project detail is not yet treated as durable, route-level content. A portfolio should support two user journeys:

1. Fast scan: a recruiter lands on `/`, understands Jason's focus, and clicks the best work.
2. Deep proof: a hiring manager, founder, or engineer opens `/work/ui-library` or `/work/stock-showdown` and sees problem, constraints, implementation decisions, outcomes, and links.

---

## 3. Goals

- [ ] Convert the portfolio from mostly single-page navigation to route-based project pages.
- [ ] Preserve the current visual identity while making it feel more premium, intentional, and branded.
- [ ] Add SEO, Open Graph, JSON-LD, sitemap, and robots support.
- [ ] Add accessibility hardening for keyboard navigation, focus states, target size, reduced motion, and route announcements.
- [ ] Add performance and quality scripts so regressions are caught before deployment.
- [ ] Add advanced design features with graceful fallbacks.
- [ ] Keep each implementation PR small, ideally under 1,000 changed lines.

---

## 4. Non-Goals

- [ ] Do not migrate to Next.js in this spec.
- [ ] Do not import the full UI-Library package unless bundle size remains acceptable.
- [ ] Do not add heavy 3D/WebGL effects to the homepage by default.
- [ ] Do not hide critical project content inside animations, modals, or canvases.
- [ ] Do not add a CMS yet.
- [ ] Do not require a backend.

---

## 5. Recommended Route Map

```txt
/
/work
/work/ui-library
/work/stock-showdown
/work/dachong-wms
/work/certchase
/work/roblox-systems
/work/portfolio-system
/notes
/notes/design-tokens
/notes/remotion-preview-workflow
/shorts
/shorts/stock-showdown-system
```

### Phase 1 required routes

Only implement these first:

```txt
/
/work
/work/ui-library
/work/stock-showdown
/work/dachong-wms
/work/portfolio-system
```

Other routes can be placeholders or future specs.

---

## 6. Information Architecture

### Homepage `/`

The homepage should answer:

- Who is Jason?
- What type of software does he build?
- What are the top 3 proof points?
- What should the visitor click next?

Recommended sections:

1. Hero
2. Featured work
3. Systems / strengths
4. Selected proof metrics
5. Notes or process preview
6. Contact CTA

### Work index `/work`

The work index should show all major projects in a scannable layout.

Each project card should include:

- Title
- Category
- Status
- Short description
- Tech stack chips
- 1 to 3 proof bullets
- Primary CTA: `Read case study`
- Secondary CTA: GitHub / Demo when available

### Project pages `/work/:slug`

Each project route should follow the same case-study layout:

1. Project hero
2. Snapshot panel
3. Problem
4. Constraints
5. Approach
6. Technical architecture
7. UI/UX decisions
8. Outcomes / impact
9. What I would improve next
10. Related work / contact CTA

---

## 7. Content Model Upgrade

### Current model

The current `PortfolioProject` model is strong enough for cards, but project pages need more structured detail.

### Add new types

Create:

```txt
src/data/projectPages.ts
```

```ts
import type { PortfolioProject } from './projects';

export type ProjectMetric = {
  label: string;
  value: string;
  description?: string;
};

export type ProjectDecision = {
  title: string;
  context: string;
  decision: string;
  result?: string;
};

export type ProjectPage = {
  slug: PortfolioProject['slug'];
  subtitle: string;
  heroKicker: string;
  problem: string;
  constraints: string[];
  approach: string[];
  architecture?: {
    summary: string;
    bullets: string[];
  };
  uxDecisions: ProjectDecision[];
  metrics: ProjectMetric[];
  lessons: string[];
  nextSteps: string[];
  gallery?: {
    src: string;
    alt: string;
    caption?: string;
  }[];
};
```

### Acceptance criteria

- [ ] Each `featured: true` project has a matching `ProjectPage` entry.
- [ ] Missing project pages fail gracefully with a styled 404 / not-found route.
- [ ] Project cards link to `/work/${project.slug}`.
- [ ] No card relies only on a drawer or modal for detail.

---

## 8. Routing Implementation

### Dependencies

Use React Router unless already installed:

```bash
npm install react-router-dom react-helmet-async
```

### File structure

```txt
src/
  app/
    AppRoutes.jsx
  pages/
    HomePage.jsx
    WorkIndexPage.jsx
    ProjectPage.jsx
    NotFoundPage.jsx
  components/
    seo/
      Seo.jsx
      JsonLd.jsx
    work/
      ProjectHero.jsx
      ProjectSnapshot.jsx
      ProjectCaseStudySection.jsx
      ProjectGallery.jsx
      RelatedProjects.jsx
```

### App entry

`App.jsx` should become mostly routing and provider setup:

```jsx
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AppRoutes } from './app/AppRoutes';

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
```

### Acceptance criteria

- [ ] `/` renders the existing homepage content.
- [ ] `/work` renders a full project index.
- [ ] `/work/:slug` renders a route-specific case study.
- [ ] Refreshing a deep route works in the deployed environment.
- [ ] Unknown routes render a polished `NotFoundPage` with links back to Home and Work.

---

## 9. SEO and Social Preview Layer

### Add SEO component

Create:

```txt
src/components/seo/Seo.jsx
```

```jsx
import { Helmet } from 'react-helmet-async';

const SITE_URL = 'https://thejasonhuang.com';

export function Seo({
  title,
  description,
  pathname = '/',
  image = '/og/home.png',
  type = 'website',
  jsonLd,
}) {
  const canonical = `${SITE_URL}${pathname}`;
  const absoluteImage = image.startsWith('http') ? image : `${SITE_URL}${image}`;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />

      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={absoluteImage} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={absoluteImage} />

      {jsonLd ? (
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      ) : null}
    </Helmet>
  );
}
```

### Required metadata

Homepage:

- Title: `Jason Huang | Software Engineer & Product Builder`
- Description: `Software engineer building design systems, full-stack products, workflow automation, and polished interfaces in the New York / New Jersey area.`
- JSON-LD type: `Person`

Project pages:

- Unique title per project.
- Unique description per project.
- JSON-LD type: `CreativeWork`.
- Canonical route.
- Dedicated OG image.

### Add static files

```txt
public/robots.txt
public/sitemap.xml
public/og/home.png
public/og/ui-library.png
public/og/stock-showdown.png
public/og/dachong-wms.png
public/og/portfolio-system.png
```

### `robots.txt`

```txt
User-agent: *
Allow: /

Sitemap: https://thejasonhuang.com/sitemap.xml
```

### Acceptance criteria

- [ ] Every public route has a unique `<title>` and meta description.
- [ ] Every project route has canonical URL and OG image.
- [ ] `robots.txt` references `sitemap.xml`.
- [ ] `sitemap.xml` includes homepage, work index, and project routes.
- [ ] Structured data validates in Google's Rich Results Test or Schema Markup Validator.

---

## 10. Advanced Design System Upgrade

The site should feel like a premium portfolio, not a template. Use the existing water / gold / jade direction and align the palette with UI-Library token thinking.

### 10.1 Semantic CSS variables

Create:

```txt
src/styles/tokens.css
```

```css
:root {
  --color-bg: #081018;
  --color-bg-soft: #0d1722;
  --color-surface: rgba(14, 27, 40, 0.78);
  --color-surface-strong: rgba(18, 35, 52, 0.92);
  --color-text: #f7f4ee;
  --color-text-muted: rgba(247, 244, 238, 0.72);
  --color-border: rgba(216, 221, 227, 0.14);
  --color-brand-gold: #d4af6a;
  --color-brand-gold-strong: #e7c98a;
  --color-brand-water: #2ea7ff;
  --color-brand-jade: #47d7ac;
  --color-focus: #69c7ff;

  --radius-sm: 0.5rem;
  --radius-md: 0.875rem;
  --radius-lg: 1.25rem;
  --radius-xl: 1.75rem;
  --radius-pill: 999px;

  --shadow-soft: 0 24px 80px rgba(0, 0, 0, 0.24);
  --shadow-glow-water: 0 0 60px rgba(46, 167, 255, 0.16);
  --shadow-glow-gold: 0 0 56px rgba(212, 175, 106, 0.14);

  --container-max: 1180px;
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
}
```

### 10.2 Premium visual features

Implement these as progressive enhancements:

#### A. Animated water-light hero background

Use CSS radial gradients and transform animations, not WebGL.

Requirements:

- Runs only as decorative background.
- `aria-hidden="true"`.
- Disabled or simplified under `prefers-reduced-motion: reduce`.
- Does not affect layout shift.

Suggested class:

```css
.heroAura {
  position: absolute;
  inset: -20%;
  pointer-events: none;
  background:
    radial-gradient(circle at 20% 20%, rgba(46, 167, 255, 0.18), transparent 34%),
    radial-gradient(circle at 75% 35%, rgba(212, 175, 106, 0.13), transparent 30%),
    radial-gradient(circle at 50% 80%, rgba(71, 215, 172, 0.10), transparent 36%);
  filter: blur(12px);
  animation: heroAuraShift 12s var(--ease-out) infinite alternate;
}

@keyframes heroAuraShift {
  from {
    transform: translate3d(-1.5%, -1%, 0) scale(1);
  }
  to {
    transform: translate3d(1.5%, 1%, 0) scale(1.04);
  }
}

@media (prefers-reduced-motion: reduce) {
  .heroAura {
    animation: none;
  }
}
```

#### B. Case-study command rail

Add a sticky right-side or top mobile rail on project pages:

- `Overview`
- `Problem`
- `Architecture`
- `UX decisions`
- `Results`
- `Next steps`

Requirements:

- Uses anchor links.
- Current section indicator is optional in Phase 1.
- Must not cover content at 320px width.
- Must be keyboard accessible.

#### C. Project proof cards

On the homepage and work pages, add compact proof cards:

- `Design systems`
- `Full-stack products`
- `Workflow automation`
- `Operations dashboards`

Each card should include a crisp claim and a project link.

Example:

```txt
Design systems
Token-driven React component library with Storybook documentation and theming foundations.
View UI Library ->
```

#### D. Interactive architecture diagram blocks

For project pages, add lightweight diagram components using HTML/CSS or SVG.

Do not use canvas for this phase.

Examples:

- UI Library: tokens -> themes -> provider -> components -> Storybook.
- Stock Showdown: data intake -> provider registry -> workflow engine -> Remotion render -> review output.
- Portfolio: content data -> routes -> SEO -> analytics -> deployment.

#### E. Showcase media strip

Add a horizontally scrollable media strip for project pages:

- Screenshots
- Generated poster images
- Short video previews
- UI states

Requirements:

- Uses native horizontal scroll.
- Has visible focus controls.
- Provides alt text and captions.
- Uses optimized images.

---

## 11. Accessibility Requirements

### Required improvements

- [ ] Add a skip link to `#main-content`.
- [ ] Ensure the page has semantic `header`, `nav`, `main`, and `footer` landmarks.
- [ ] Ensure `<html lang="en">` exists in `index.html`.
- [ ] Add global `:focus-visible` styles.
- [ ] Ensure all icon-only links have accessible labels.
- [ ] Ensure every interactive target is at least 24px by 24px, ideally 44px by 44px for touch comfort.
- [ ] Ensure mobile layouts work at 320px wide without horizontal scrolling.
- [ ] Add `prefers-reduced-motion` fallbacks for all non-essential motion.
- [ ] Add route-change focus management so keyboard users are moved to the new page's main heading after navigation.

### Skip link

```jsx
<a className="skipLink" href="#main-content">
  Skip to main content
</a>
```

```css
.skipLink {
  position: fixed;
  left: 1rem;
  top: -4rem;
  z-index: 1000;
  padding: 0.75rem 1rem;
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border);
  background: var(--color-surface-strong);
  color: var(--color-text);
  transition: top 160ms var(--ease-out);
}

.skipLink:focus {
  top: 1rem;
}

:focus-visible {
  outline: 2px solid var(--color-focus);
  outline-offset: 3px;
}
```

### Acceptance criteria

- [ ] Site can be navigated keyboard-only from top to bottom.
- [ ] Focus is always visible.
- [ ] No focus is hidden behind sticky headers or overlays.
- [ ] All image content has meaningful alt text unless decorative.
- [ ] Motion is reduced when system reduced-motion is enabled.

---

## 12. Performance Requirements

### Targets

| Metric | Target |
|---|---:|
| Mobile Lighthouse Performance | 90+ |
| Mobile Lighthouse Accessibility | 95+ |
| Mobile Lighthouse Best Practices | 95+ |
| Mobile Lighthouse SEO | 95+ |
| LCP | <= 2.5s |
| INP | <= 200ms |
| CLS | <= 0.1 |
| Initial JS transferred | <= 150 KB gzipped preferred |
| Largest mobile image | <= 150 KB preferred |

### Required implementation

- [ ] Use responsive images for hero and gallery media.
- [ ] Define `width` and `height` or aspect-ratio for every image.
- [ ] Lazy-load below-the-fold media.
- [ ] Preload only the true LCP image if applicable.
- [ ] Avoid canvas/WebGL on initial route.
- [ ] Use route-level code splitting if project pages grow large.

### Example responsive image

```jsx
<img
  src="/work/ui-library/card-960.webp"
  srcSet="/work/ui-library/card-480.webp 480w, /work/ui-library/card-960.webp 960w"
  sizes="(max-width: 768px) 92vw, 520px"
  width="960"
  height="640"
  loading="lazy"
  alt="UI Library component preview showing themed buttons and surfaces"
/>
```

---

## 13. Analytics and Measurement

Use a lightweight analytics setup first.

Recommended default:

- Plausible for pageviews and events.
- `web-vitals` for LCP / INP / CLS monitoring.

### Events to track

```txt
cta_click_email
cta_click_github
cta_click_linkedin
project_card_click
case_study_view
outbound_project_link_click
resume_download
```

### Analytics wrapper

```ts
export function trackEvent(name: string, props?: Record<string, string | number | boolean>) {
  if (typeof window === 'undefined') return;

  const plausible = window.plausible;
  if (typeof plausible === 'function') {
    plausible(name, props ? { props } : undefined);
  }
}
```

### Acceptance criteria

- [ ] Page views are tracked.
- [ ] Project card clicks are tracked.
- [ ] Contact CTA clicks are tracked.
- [ ] Outbound GitHub / LinkedIn clicks are tracked.
- [ ] Web Vitals collection is implemented or explicitly deferred.

---

## 14. Quality Scripts and CI

### Add scripts

```json
{
  "scripts": {
    "build": "vite build",
    "preview": "vite preview --host 0.0.0.0 --port 4173",
    "quality:lighthouse": "lighthouse http://127.0.0.1:4173 --output html --output json --output-path ./reports/lighthouse --chrome-flags='--headless=new'",
    "quality:axe": "axe http://127.0.0.1:4173 --exit",
    "quality:all": "npm run build && npm run quality:lighthouse && npm run quality:axe"
  }
}
```

### Suggested dependencies

```bash
npm install -D lighthouse @axe-core/cli wait-on
```

### CI workflow

```yaml
name: Portfolio Quality

on:
  pull_request:
  push:
    branches: [main]

jobs:
  quality:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run build
      - run: npx vite preview --host 0.0.0.0 --port 4173 &
      - run: npx wait-on http://127.0.0.1:4173
      - run: npx lighthouse http://127.0.0.1:4173 --chrome-flags='--headless=new' --output=json --output-path=./reports/lighthouse.json
      - run: npx axe http://127.0.0.1:4173 --exit
```

### Acceptance criteria

- [ ] CI runs on PRs and pushes to main.
- [ ] Build must pass before quality checks.
- [ ] Lighthouse report is generated.
- [ ] Axe check is generated.
- [ ] Failures block merges once baseline issues are resolved.

---

## 15. Domain and Deployment Checks

The custom domain should be treated as a production reliability requirement.

### Required checks

- [ ] GitHub Pages custom domain is set to `thejasonhuang.com`.
- [ ] Apex domain has the required GitHub Pages `A` records.
- [ ] `www` has a CNAME to `jason-huang-dev.github.io`.
- [ ] HTTPS is enforced.
- [ ] `https://thejasonhuang.com` is the canonical domain.
- [ ] `https://www.thejasonhuang.com` redirects consistently to the canonical domain.
- [ ] `http://thejasonhuang.com` redirects to HTTPS.
- [ ] The deployed app supports refreshes on deep routes.

### Commands

```bash
dig thejasonhuang.com +noall +answer -t A
dig www.thejasonhuang.com +noall +answer -t CNAME
curl -I https://thejasonhuang.com
curl -I https://www.thejasonhuang.com
```

---

## 16. Suggested PR Breakdown

### PR 1 — Routing foundation

Scope:

- Install React Router and Helmet.
- Move homepage into `HomePage.jsx`.
- Add `/work`, `/work/:slug`, and 404 pages.
- Link project cards to route pages.

Acceptance:

- [ ] Existing homepage still works.
- [ ] `/work` works.
- [ ] At least two project pages render.
- [ ] Unknown routes render 404.

### PR 2 — Case-study content model

Scope:

- Add `projectPages.ts`.
- Add detailed content for `ui-library`, `stock-showdown`, `dachong-wms`, and `portfolio-system`.
- Add reusable case-study components.

Acceptance:

- [ ] Each featured project has full problem / approach / result content.
- [ ] Page layout is reusable.
- [ ] No duplicated hardcoded layouts per project.

### PR 3 — SEO and metadata

Scope:

- Add `Seo` component.
- Add JSON-LD helpers.
- Add sitemap and robots.
- Add OG images.

Acceptance:

- [ ] All public routes have unique metadata.
- [ ] `sitemap.xml` includes route list.
- [ ] Social previews work for homepage and flagship project pages.

### PR 4 — Premium visual system

Scope:

- Add semantic tokens.
- Add hero aura.
- Add project proof cards.
- Add architecture diagrams.
- Add media strip.

Acceptance:

- [ ] Motion respects reduced-motion settings.
- [ ] Visual effects are CSS/SVG-first.
- [ ] Layout remains stable and responsive.

### PR 5 — Accessibility and quality checks

Scope:

- Add skip link.
- Add focus styles.
- Add route focus management.
- Add Lighthouse and axe scripts.
- Add CI quality workflow.

Acceptance:

- [ ] Keyboard-only navigation passes.
- [ ] Lighthouse accessibility is 95+ after baseline fixes.
- [ ] CI runs quality checks.

### PR 6 — Analytics and measurement

Scope:

- Add Plausible or chosen analytics provider.
- Add event wrappers.
- Add Web Vitals reporting.

Acceptance:

- [ ] Pageviews are tracked.
- [ ] Contact and project events are tracked.
- [ ] Metrics can be viewed in analytics dashboard.

---

## 17. Manual QA Checklist

Before merging the full upgrade:

- [ ] `/` loads and has no console errors.
- [ ] `/work` loads and displays all projects.
- [ ] Every project card links to a valid route.
- [ ] Browser refresh works on deep project routes.
- [ ] 404 page is polished and useful.
- [ ] Keyboard tab order is logical.
- [ ] Focus is visible on all interactive controls.
- [ ] Reduced motion disables decorative animation.
- [ ] Mobile width 320px has no horizontal scroll.
- [ ] All meaningful images have alt text.
- [ ] Lighthouse mobile Performance is 90+ or known baseline is documented.
- [ ] Lighthouse SEO is 95+.
- [ ] Lighthouse Accessibility is 95+.
- [ ] `sitemap.xml` and `robots.txt` are reachable.
- [ ] OG previews work in LinkedIn/Twitter preview tools.
- [ ] Domain redirects are consistent.

---

## 18. Implementation Notes for Advanced Features

### Keep premium effects content-safe

Advanced visual features should support the content instead of becoming the product. The homepage should still work if CSS animations fail, JavaScript is delayed, or the user has reduced-motion enabled.

### Avoid premature 3D

A small portfolio can feel premium with:

- Strong typography.
- Layered surfaces.
- Subtle animation.
- Better project storytelling.
- High-quality screenshots and architecture diagrams.

Do not add Three.js/WebGL until there is a specific project showcase that needs it.

### Use project pages as proof, not decoration

Each case study should make a clear technical argument:

```txt
Problem -> Constraint -> Decision -> Tradeoff -> Result
```

This format will make the site stronger for recruiters, engineering managers, and clients.

---

## 19. Definition of Done

This spec is complete when:

- [ ] The portfolio has stable route-based case studies.
- [ ] The homepage remains fast, polished, and scannable.
- [ ] SEO metadata, sitemap, robots, and JSON-LD are implemented.
- [ ] Accessibility basics are enforced.
- [ ] Performance and accessibility checks run locally and in CI.
- [ ] The visual system feels more premium but does not introduce heavy dependencies.
- [ ] The custom domain is reliable and canonical.
