import { useMemo } from 'react';
import {
  FiArrowUpRight,
  FiBriefcase,
  FiCode,
  FiCpu,
  FiDatabase,
  FiDroplet,
  FiGithub,
  FiGlobe,
  FiLayers,
  FiLinkedin,
  FiMail,
  FiMapPin,
  FiServer,
  FiTarget,
  FiTool,
  FiZap,
} from 'react-icons/fi';

import resume from './assets/personal/resume.pdf';

const navLinks = [
  { href: '#identity', label: 'Identity' },
  { href: '#work', label: 'Work' },
  { href: '#projects', label: 'Projects' },
  { href: '#experience', label: 'Experience' },
  { href: '#contact', label: 'Contact' },
];

const brandKeywords = [
  { label: 'Balance', icon: FiTarget },
  { label: 'Flow', icon: FiDroplet },
  { label: 'Clarity', icon: FiGlobe },
  { label: 'Focus', icon: FiTarget },
  { label: 'Energy', icon: FiZap },
  { label: 'Elevation', icon: FiArrowUpRight },
];

const highlights = [
  { value: '3.885', label: 'Rutgers GPA' },
  { value: '1K+', label: 'ServiceNow tickets analyzed yearly' },
  { value: '95%', label: 'CSAT sustained' },
  { value: '20+', label: 'tickets closed weekly' },
];

const capabilities = [
  {
    icon: FiCode,
    title: 'Interface systems',
    body: 'React, Vite, MUI, Tailwind, reusable UI patterns, dashboards, and responsive product surfaces built with a consistent visual language.',
  },
  {
    icon: FiServer,
    title: 'Backend foundations',
    body: 'Django, DRF, FastAPI, Node, PostgreSQL, Supabase, auth flows, API contracts, and deployment-minded project structure.',
  },
  {
    icon: FiTool,
    title: 'Operational clarity',
    body: 'ServiceNow analysis, WordPress multisite operations, SharePoint migrations, ITIL runbooks, and support workflows that reduce ambiguity.',
  },
  {
    icon: FiLayers,
    title: 'Spec-led execution',
    body: 'Technical specs, scoped PR planning, architecture notes, and implementation checklists that help teams move cleanly from idea to production.',
  },
];

const projects = [
  {
    name: 'CertChase',
    type: 'Micro SaaS concept',
    description:
      'Vendor compliance tracker planned with React, MUI, Django/DRF, and Supabase PostgreSQL using pooler-based database access.',
    stack: ['React', 'MUI', 'Django', 'DRF', 'Supabase'],
    href: 'https://github.com/jason-huang-dev',
  },
  {
    name: 'DaChong WMS',
    type: '3PL warehouse platform',
    description:
      'Multi-tenant WMS direction for inventory, warehouse operations, roles, client accounts, and dashboard-first workflows.',
    stack: ['React', 'MUI', 'PostgreSQL', 'Docker', 'Django'],
    href: 'https://github.com/jason-huang-dev',
  },
  {
    name: 'UI-Library',
    type: 'Design system foundation',
    description:
      'A reusable component library direction with tokens, UIProvider, Surface, Text, Button, overlays, forms, and native/web package boundaries.',
    stack: ['React', 'MUI', 'Tokens', 'Storybook', 'pnpm'],
    href: 'https://github.com/jason-huang-dev/UI-Library',
  },
  {
    name: 'Market Bot',
    type: 'Automation project',
    description:
      'Discord bot for market data and news retrieval, built to turn financial signals into faster community updates.',
    stack: ['Python', 'Discord', 'APIs'],
    href: 'https://github.com/jason-huang-dev/Market_Bot',
  },
];

const experience = [
  {
    role: 'Web Developer & IT Support Technician',
    org: 'Rutgers University — SC&I IT Helpdesk',
    date: 'Jan 2025 — Jan 2026',
    points: [
      'Maintained WordPress multisite and supported faculty and departmental web operations across development, staging, and production workflows.',
      'Built ticket-analysis dashboards across 1,000+ annual ServiceNow tickets to identify repeat incident drivers and improve triage visibility.',
      'Sustained roughly 95% CSAT while closing 20+ tickets per week within SLA expectations.',
    ],
  },
  {
    role: 'Software Engineering Fellow',
    org: 'Headstarter AI',
    date: 'Jul 2024 — Sep 2024',
    points: [
      'Built full-stack projects in small teams, introduced Docker workflows, and standardized imports and project structure.',
      'Shipped a pantry tracker and scheduling concepts with a focus on rapid iteration and clear user flows.',
    ],
  },
  {
    role: 'Operations Manager',
    org: 'Golden Unicorn',
    date: 'Oct 2019 — Present',
    points: [
      'Managed daily operations, communication, customer support, and process improvements in a fast-paced local business environment.',
    ],
  },
];

const tech = [
  'React',
  'Vite',
  'MUI',
  'Tailwind CSS',
  'JavaScript',
  'TypeScript',
  'Python',
  'Django',
  'FastAPI',
  'Node.js',
  'PostgreSQL',
  'Supabase',
  'Docker',
  'AWS',
  'Git',
  'C',
  'Java',
  'WordPress',
  'SharePoint',
  'ServiceNow',
];

const palette = [
  { name: 'Onyx', value: '#0A0A0A' },
  { name: 'Charcoal', value: '#1B1E22' },
  { name: 'Slate', value: '#2C3440' },
  { name: 'Midnight Navy', value: '#0B1D3A' },
  { name: 'Electric Water', value: '#00AFFF' },
  { name: 'Champagne Gold', value: '#D4AF6A' },
];

function Surface({ children, className = '', muted = false }) {
  return (
    <div className={`surface ${muted ? 'surface--muted' : ''} ${className}`}>{children}</div>
  );
}

function SectionHeading({ eyebrow, title, body, align = 'left' }) {
  return (
    <div className={`section-heading section-heading--${align}`}>
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {body ? <p>{body}</p> : null}
    </div>
  );
}

function BrandMark({ compact = false }) {
  return (
    <svg
      className={compact ? 'brand-mark brand-mark--compact' : 'brand-mark'}
      viewBox="0 0 240 240"
      role="img"
      aria-label="Jason Huang flow mark"
    >
      <defs>
        <linearGradient id="goldStroke" x1="20%" x2="80%" y1="10%" y2="95%">
          <stop offset="0" stopColor="#F5D58C" />
          <stop offset="0.42" stopColor="#D4AF6A" />
          <stop offset="1" stopColor="#8A6428" />
        </linearGradient>
        <linearGradient id="waterStroke" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#D8F6FF" />
          <stop offset="0.5" stopColor="#00AFFF" />
          <stop offset="1" stopColor="#0B1D3A" />
        </linearGradient>
        <filter id="waterGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="2.4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <circle className="brand-mark__outer" cx="120" cy="120" r="104" />
      <path className="brand-mark__water brand-mark__water--top" d="M57 83c34-39 88-42 126-8 18 16 24 34 23 52" />
      <path className="brand-mark__water brand-mark__water--bottom" d="M183 157c-34 39-88 42-126 8-18-16-24-34-23-52" />
      <circle className="brand-mark__dot brand-mark__dot--top" cx="120" cy="63" r="16" />
      <circle className="brand-mark__dot brand-mark__dot--bottom" cx="120" cy="177" r="16" />
      <path
        className="brand-mark__glyph"
        d="M55 112c28-6 52-16 73-35 17-15 40-15 42 1 2 15-18 32-45 38-31 7-58 2-77-9m129 0c-26 9-48 23-63 46-12 18-31 30-39 19-8-10 6-29 27-43 27-17 55-23 88-25m-79-39c15 18 26 37 25 59-.1 20-10 37-23 31-12-5-8-27 1-44 10-19 22-32 45-43"
      />
    </svg>
  );
}

function App() {
  const year = useMemo(() => new Date().getFullYear(), []);

  return (
    <div className="portfolio-shell">
      <header className="site-nav">
        <a className="brand" href="#top" aria-label="Jason Huang home">
          <BrandMark compact />
          <div>
            <strong>Jason Huang</strong>
            <small>Flow · Balance · Clarity</small>
          </div>
        </a>

        <nav aria-label="Main navigation">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href}>{link.label}</a>
          ))}
        </nav>
      </header>

      <main id="top">
        <section id="identity" className="identity-hero">
          <Surface className="brand-story">
            <p className="eyebrow">Brand identity</p>
            <h1>Software with flow, balance, and clarity.</h1>
            <p>
              I’m Jason Huang, a Rutgers CS + Economics student building practical software systems, polished interfaces, and operational tools that make complex workflows easier to understand and act on.
            </p>
            <div className="hero-actions">
              <a className="button button--primary" href="#projects">View work <FiArrowUpRight /></a>
              <a className="button button--secondary" href={resume} target="_blank" rel="noreferrer">Resume <FiBriefcase /></a>
            </div>
          </Surface>

          <div className="hero-emblem" aria-hidden="true">
            <div className="hero-emblem__halo" />
            <BrandMark />
          </div>

          <Surface className="brand-keywords">
            <p className="eyebrow">Brand keywords</p>
            <div className="keyword-list">
              {brandKeywords.map((item) => {
                const Icon = item.icon;
                return (
                  <div className="keyword-item" key={item.label}>
                    <span><Icon /></span>
                    <strong>{item.label}</strong>
                  </div>
                );
              })}
            </div>
          </Surface>
        </section>

        <section className="tagline-strip" aria-label="Brand tagline">
          <span />
          <strong>Flow</strong>
          <i>·</i>
          <strong>Balance</strong>
          <i>·</i>
          <BrandMark compact />
          <i>·</i>
          <strong>Clarity</strong>
          <span />
        </section>

        <section className="stats-grid" aria-label="Portfolio highlights">
          {highlights.map((item) => (
            <Surface key={item.label} muted>
              <strong>{item.value}</strong>
              <span>{item.label}</span>
            </Surface>
          ))}
        </section>

        <section className="palette-section" aria-label="Brand palette">
          <SectionHeading
            eyebrow="Dark theme palette"
            title="Cinematic, focused, and built for contrast."
            body="The visual system uses onyx depth, midnight structure, electric-water motion, and champagne-gold emphasis for a personal brand that feels refined without losing energy."
            align="center"
          />
          <div className="palette-grid">
            {palette.map((color) => (
              <div className="palette-chip" key={color.value}>
                <span style={{ backgroundColor: color.value }} />
                <strong>{color.name}</strong>
                <small>{color.value}</small>
              </div>
            ))}
          </div>
        </section>

        <section id="work" className="content-section">
          <SectionHeading
            eyebrow="Core strengths"
            title="I bridge product interfaces, backend systems, and support operations."
            body="The portfolio now reads like a personal brand system: clear sections, measurable proof, strong hierarchy, and reusable surface patterns inspired by your UI-Library direction."
          />
          <div className="capability-grid">
            {capabilities.map((item) => {
              const Icon = item.icon;
              return (
                <Surface key={item.title}>
                  <div className="icon-box"><Icon /></div>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </Surface>
              );
            })}
          </div>
        </section>

        <section id="projects" className="content-section projects-section">
          <SectionHeading
            eyebrow="Selected work"
            title="Projects shaped around systems, dashboards, and execution clarity."
            body="Each project card is framed by what it proves: product judgment, technical structure, operational awareness, and measurable delivery."
          />
          <div className="project-grid">
            {projects.map((project) => (
              <Surface key={project.name} className="project-card">
                <div className="project-card__topline">
                  <span>{project.type}</span>
                  <a href={project.href} aria-label={`Open ${project.name}`} target="_blank" rel="noreferrer"><FiArrowUpRight /></a>
                </div>
                <h3>{project.name}</h3>
                <p>{project.description}</p>
                <div className="chip-row">
                  {project.stack.map((item) => <span key={item}>{item}</span>)}
                </div>
              </Surface>
            ))}
          </div>
        </section>

        <section id="experience" className="content-section experience-section">
          <SectionHeading
            eyebrow="Experience"
            title="Execution grounded in technical support, web platforms, and documentation."
            body="This section keeps recruiter-friendly substance while matching the visual tone: clean, confident, and easy to scan."
          />
          <div className="timeline-list">
            {experience.map((job) => (
              <Surface key={`${job.role}-${job.org}`}>
                <div className="job-heading">
                  <div>
                    <h3>{job.role}</h3>
                    <p>{job.org}</p>
                  </div>
                  <span>{job.date}</span>
                </div>
                <ul>
                  {job.points.map((point) => <li key={point}>{point}</li>)}
                </ul>
              </Surface>
            ))}
          </div>
        </section>

        <section className="content-section tech-section">
          <SectionHeading
            eyebrow="Toolkit"
            title="Stack coverage from interface craft to backend infrastructure."
          />
          <div className="chip-row chip-row--large">
            {tech.map((item) => <span key={item}>{item}</span>)}
          </div>
        </section>

        <section id="contact" className="contact-section">
          <Surface className="contact-card">
            <div>
              <p className="eyebrow">Next step</p>
              <h2>Let’s create software that feels focused, polished, and useful.</h2>
              <p>
                Reach out for software engineering roles, web projects, product prototypes, or systems that need a clean technical plan.
              </p>
            </div>
            <div className="contact-actions">
              <a className="button button--primary" href="mailto:jasonh232013@gmail.com"><FiMail /> Email Jason</a>
              <a className="button button--secondary" href="https://github.com/jason-huang-dev" target="_blank" rel="noreferrer"><FiGithub /> GitHub</a>
              <a className="button button--secondary" href="https://www.linkedin.com/in/jasonhuangdev" target="_blank" rel="noreferrer"><FiLinkedin /> LinkedIn</a>
            </div>
          </Surface>
        </section>
      </main>

      <footer className="site-footer">
        <span>© {year} Jason Huang. Flow · Balance · Clarity.</span>
        <a href="#top">Back to top</a>
      </footer>
    </div>
  );
}

export default App;
