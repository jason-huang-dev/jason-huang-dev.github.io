export const typography = {
  fontFamily: {
    display: "var(--font-display), Georgia, serif",
    ui: "var(--font-ui), Inter, system-ui, sans-serif",
  },
  size: {
    heroDesktop: "clamp(4.75rem, 8vw, 8.75rem)",
    heroMobile: "clamp(3.25rem, 14vw, 4.75rem)",
    sectionTitle: "clamp(2.75rem, 5.5vw, 5.25rem)",
    cardTitle: "clamp(1.5rem, 2vw, 2rem)",
    body: "clamp(1rem, 1.2vw, 1.125rem)",
    small: "0.875rem",
    eyebrow: "0.8125rem",
  },
  lineHeight: {
    hero: 0.92,
    title: 0.98,
    body: 1.68,
    compact: 1.35,
  },
  letterSpacing: {
    hero: "-0.035em",
    title: "-0.025em",
    eyebrow: "0.16em",
    nav: "0.08em",
  },
} as const;
