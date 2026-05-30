# Spec 0028: Contact, SEO, and Resume Assets

## Status

proposed

## Owner

Jason Huang

## Last Updated

2026-05-30

## Depends On

- Spec 0023: Seal Stamp Contact CTA
- Spec 0024: Portfolio Redo Content Strategy
- Spec 0027: Project Cards and Case Study Sections

---

# 1. Purpose

Update the portfolio contact section, SEO metadata, social previews, and resume asset handling so the site is consistent with the refreshed software engineering positioning.

---

# 2. Contact Section

The contact section should support two paths:

```txt
primary: mailto link
secondary: form, if EmailJS remains configured
```

Use the Seal Stamp Contact CTA from Spec 0023 near the final contact area.

## Contact CTA Copy

```txt
Title: Let’s build reliable product systems.
Description: I’m open to software engineering roles and collaborations involving backend systems, full-stack products, automation, internal tools, and data-heavy workflows.
Primary Label: Email Me
Primary Href: mailto:jasonhuangdev@gmail.com
Secondary Label: View GitHub
Secondary Href: https://github.com/jason-huang-dev
```

Use:

```txt
jasonhuangdev@gmail.com
```

Do not use older email variants unless intentionally kept for legacy contact.

---

# 3. Contact Form Safety

If keeping EmailJS:

- [ ] move service/template/public IDs to environment variables where possible
- [ ] never expose private secrets
- [ ] keep public EmailJS key only if expected by EmailJS
- [ ] update recipient email to current portfolio email
- [ ] handle failed sends without leaking implementation details
- [ ] keep direct mailto CTA available even if EmailJS fails

If removing EmailJS:

- [ ] remove dependency only if no longer used
- [ ] remove form state and send logic
- [ ] replace with CTA + social links

---

# 4. SEO Metadata

Update metadata to:

```txt
Title: Jason Huang — Software Engineer
Description: Backend-heavy full-stack software engineer building SaaS, education, warehouse operations, automation, and developer tooling systems with React, Django, FastAPI, PostgreSQL, Supabase, AWS, and Docker.
Canonical: https://thejasonhuang.com
```

Open Graph:

```txt
og:title = Jason Huang — Software Engineer
og:description = Backend-heavy full-stack engineer building product systems, APIs, automation workflows, and practical data models.
og:url = https://thejasonhuang.com
og:type = website
```

---

# 5. Resume Asset

Ensure the downloadable resume is current.

Acceptance rules:

- [ ] resume file is named predictably, such as `Jason_Huang_Software_Engineer_Resume.pdf`
- [ ] displayed resume button label is `Download Resume`
- [ ] asset is replaced with the latest SWE resume only after manual confirmation
- [ ] file size is reasonable for web delivery
- [ ] link opens/downloads properly after build

Do not accidentally publish an outdated resume.

---

# 6. Social Links

Keep:

```txt
LinkedIn: https://www.linkedin.com/in/jasonhuangdev
GitHub: https://github.com/jason-huang-dev
LeetCode: https://leetcode.com/jason-huang-dev/
```

Optional:

```txt
YouTube
Instagram
```

If YouTube/Instagram are not relevant to the engineering portfolio, move them to footer only or de-emphasize them.

---

# 7. Acceptance Criteria

- [ ] Contact CTA uses current email.
- [ ] Mailto link works.
- [ ] Contact copy matches backend/full-stack positioning.
- [ ] SEO metadata is updated.
- [ ] Resume download points to current confirmed resume asset.
- [ ] EmailJS is either cleaned up or removed.
- [ ] CertChase is absent from metadata and sitemap.
- [ ] `npm run build` passes.

---

# 8. Codex Implementation Prompt

```txt
Implement Spec 0028: Contact, SEO, and Resume Assets.

Update the contact section to use the Seal Stamp Contact CTA and current email jasonhuangdev@gmail.com. Keep or remove EmailJS cleanly, but direct mailto contact must work. Update SEO and Open Graph metadata to position Jason as a backend-heavy full-stack software engineer. Ensure the resume download is current and named clearly. Do not add CertChase. Build must pass.
```
