import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  FiArrowDown,
  FiArrowUpRight,
  FiBriefcase,
  FiCode,
  FiDatabase,
  FiDroplet,
  FiGithub,
  FiGlobe,
  FiLayers,
  FiLinkedin,
  FiMail,
  FiMapPin,
  FiServer,
  FiShield,
  FiTarget,
  FiTool,
  FiZap,
} from 'react-icons/fi';

import resume from './assets/personal/resume.pdf';

const navLinks = [
  { href: '#identity', label: 'Identity' },
  { href: '#work', label: 'Craft' },
  { href: '#projects', label: 'Projects' },
  { href: '#experience', label: 'Experience' },
  { href: '#contact', label: 'Contact' },
];

const brandWords = [
  { label: 'Balance', icon: FiTarget, detail: 'Systems that feel structured, not rigid.' },
  { label: 'Flow', icon: FiDroplet, detail: 'Interfaces that move users through decisions.' },
  { label: 'Clarity', icon: FiGlobe, detail: 'Dashboards, docs, and APIs that explain themselves.' },
  { label: 'Focus', icon: FiShield, detail: 'Scoped builds with measurable outcomes.' },
  { label: 'Energy', icon: FiZap, detail: 'Fast iteration without messy architecture.' },
  { label: 'Elevation', icon: FiArrowUpRight, detail: 'A polished layer over practical engineering.' },
];

const metrics = [
  { value: '3.885', label: 'Rutgers GPA' },
  { value: '1K+', label: 'tickets analyzed yearly' },
  { value: '95%', label: 'CSAT sustained' },
  { value: '20+', label: 'tickets closed weekly' },
];

const craft = [
  {
    icon: FiCode,
    title: 'Interface craft',
    body: 'React, Vite, MUI, Tailwind, reusable component patterns, responsive dashboards, and design-system thinking.',
  },
  {
    icon: FiServer,
    title: 'Backend architecture',
    body: 'Django, DRF, FastAPI, Node, PostgreSQL, Supabase, auth flows, API contracts, and deployment-aware project structure.',
  },
  {
    icon: FiTool,
    title: 'Operational systems',
    body: 'ServiceNow analysis, WordPress multisite operations, SharePoint migrations, ITIL runbooks, and triage workflows.',
  },
  {
    icon: FiLayers,
    title: 'Spec-led delivery',
    body: 'Technical specs, scoped PR planning, architecture notes, acceptance criteria, and implementation checklists.',
  },
];

const projects = [
  {
    id: 'certchase',
    name: 'CertChase',
    type: 'Micro SaaS',
    proof: 'Compliance workflow clarity',
    description:
      'Vendor compliance tracker planned with React, MUI, Django/DRF, and Supabase PostgreSQL using pooler-based database access.',
    stack: ['React', 'MUI', 'Django', 'DRF', 'Supabase'],
    href: 'https://github.com/jason-huang-dev',
  },
  {
    id: 'wms',
    name: 'DaChong WMS',
    type: '3PL platform',
    proof: 'Warehouse operations structure',
    description:
      'Multi-tenant WMS direction for inventory, warehouse operations, client accounts, roles, dashboards, and intuitive data filtering.',
    stack: ['React', 'MUI', 'PostgreSQL', 'Docker', 'Django'],
    href: 'https://github.com/jason-huang-dev',
  },
  {
    id: 'uilibrary',
    name: 'UI-Library',
    type: 'Design system',
    proof: 'Reusable UI foundations',
    description:
      'A component library direction with tokens, UIProvider, Surface, Text, Button, forms, overlays, Storybook, and native/web package boundaries.',
    stack: ['React', 'MUI', 'Tokens', 'Storybook', 'pnpm'],
    href: 'https://github.com/jason-huang-dev/UI-Library',
  },
  {
    id: 'marketbot',
    name: 'Market Bot',
    type: 'Automation',
    proof: 'Financial signal retrieval',
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
      'Maintained WordPress multisite operations across development, staging, and production workflows.',
      'Built ticket-analysis dashboards across 1,000+ annual ServiceNow tickets to identify repeat incident drivers.',
      'Sustained roughly 95% CSAT while closing 20+ tickets per week within SLA expectations.',
    ],
  },
  {
    role: 'Software Engineering Fellow',
    org: 'Headstarter AI',
    date: 'Jul 2024 — Sep 2024',
    points: [
      'Built full-stack projects in small teams, introduced Docker workflows, and standardized imports and project structure.',
      'Shipped rapid prototypes while balancing UI quality, backend structure, and practical delivery constraints.',
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

const reveal = {
  hidden: { opacity: 0, y: 34 },
  show: { opacity: 1, y: 0, transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1] } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.08 } },
};

function BrandMark({ compact = false }) {
  return (
    <svg className={compact ? 'brand-mark brand-mark--compact' : 'brand-mark'} viewBox="0 0 240 240" role="img" aria-label="Jason Huang flow mark">
      <defs>
        <linearGradient id="goldStroke" x1="20%" x2="80%" y1="10%" y2="95%">
          <stop offset="0" stopColor="#F5D58C" />
          <stop offset="0.42" stopColor="#D4AF6A" />
          <stop offset="1" stopColor="#8A6428" />
        </linearGradient>
        <linearGradient id="waterStroke" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#D8F6FF" />
          <stop offset="0.52" stopColor="#00AFFF" />
          <stop offset="1" stopColor="#0B1D3A" />
        </linearGradient>
      </defs>
      <circle className="brand-mark__outer" cx="120" cy="120" r="104" />
      <path className="brand-mark__water brand-mark__water--top" d="M55 84c34-40 88-42 127-9 18 16 25 35 23 53" />
      <path className="brand-mark__water brand-mark__water--bottom" d="M185 156c-34 40-88 42-127 9-18-16-25-35-23-53" />
      <circle className="brand-mark__dot" cx="120" cy="63" r="16" />
      <circle className="brand-mark__dot" cx="120" cy="177" r="16" />
      <path
        className="brand-mark__glyph"
        d="M55 112c28-6 52-16 73-35 17-15 40-15 42 1 2 15-18 32-45 38-31 7-58 2-77-9m129 0c-26 9-48 23-63 46-12 18-31 30-39 19-8-10 6-29 27-43 27-17 55-23 88-25m-79-39c15 18 26 37 25 59-.1 20-10 37-23 31-12-5-8-27 1-44 10-19 22-32 45-43"
      />
    </svg>
  );
}

function Section({ id, eyebrow, title, body, children, className = '', center = false }) {
  return (
    <motion.section
      id={id}
      className={`section ${center ? 'section--center' : ''} ${className}`}
      variants={reveal}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.18 }}
    >
      <div className="section-heading">
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
        {body ? <p>{body}</p> : null}
      </div>
      {children}
    </motion.section>
  );
}

function Surface({ children, className = '', as: Component = 'div' }) {
  return <Component className={`surface ${className}`}>{children}</Component>;
}

function ProjectRail() {
  const [active, setActive] = useState(projects[0].id);

  return (
    <motion.div className="project-rail" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
      {projects.map((project) => {
        const isActive = active === project.id;
        return (
          <motion.article
            key={project.id}
            className={`project-panel ${isActive ? 'project-panel--active' : ''}`}
            variants={reveal}
            layout
            onClick={() => setActive(project.id)}
            onFocus={() => setActive(project.id)}
            tabIndex={0}
          >
            <div className="project-panel__index">{project.type}</div>
            <div className="project-panel__content">
              <p>{project.proof}</p>
              <h3>{project.name}</h3>
              <span>{project.description}</span>
              <div className="chip-row">
                {project.stack.map((item) => <small key={item}>{item}</small>)}
              </div>
            </div>
            <a className="project-panel__link" href={project.href} target="_blank" rel="noreferrer" aria-label={`Open ${project.name}`} onClick={(event) => event.stopPropagation()}>
              <FiArrowUpRight />
            </a>
          </motion.article>
        );
      })}
    </motion.div>
  );
}

function App() {
  const year = useMemo(() => new Date().getFullYear(), []);

  return (
    <div className="site-shell">
      <div className="ambient-water" aria-hidden="true" />

      <header className="site-nav">
        <a className="brand" href="#top" aria-label="Jason Huang home">
          <BrandMark compact />
          <span>
            <strong>Jason Huang</strong>
            <small>Flow · Balance · Clarity</small>
          </span>
        </a>
        <nav aria-label="Main navigation">
          {navLinks.map((link) => <a key={link.href} href={link.href}>{link.label}</a>)}
        </nav>
      </header>

      <main id="top">
        <section id="identity" className="hero-stage">
          <motion.div className="hero-copy" variants={stagger} initial="hidden" animate="show">
            <motion.p className="eyebrow" variants={reveal}>Brand identity</motion.p>
            <motion.h1 variants={reveal}>Software with flow, balance, and clarity.</motion.h1>
            <motion.p className="hero-lede" variants={reveal}>
              I build practical software systems, polished interfaces, and operational tools that turn complex workflows into clear user experiences.
            </motion.p>
            <motion.div className="hero-actions" variants={reveal}>
              <a className="button button--primary" href="#projects">Explore work <FiArrowUpRight /></a>
              <a className="button button--secondary" href={resume} target="_blank" rel="noreferrer">View resume <FiBriefcase /></a>
            </motion.div>
          </motion.div>

          <motion.div className="hero-mark-wrap" initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}>
            <div className="hero-orbit hero-orbit--one" />
            <div className="hero-orbit hero-orbit--two" />
            <BrandMark />
          </motion.div>

          <motion.aside className="hero-keywords" variants={stagger} initial="hidden" animate="show">
            <p className="eyebrow">Brand keywords</p>
            {brandWords.map((item) => {
              const Icon = item.icon;
              return (
                <motion.div className="keyword-card" key={item.label} variants={reveal}>
                  <Icon />
                  <span>
                    <strong>{item.label}</strong>
                    <small>{item.detail}</small>
                  </span>
                </motion.div>
              );
            })}
          </motion.aside>

          <a className="scroll-cue" href="#work" aria-label="Scroll to work section">
            <span><FiArrowDown /></span>
          </a>
        </section>

        <section className="brand-strip" aria-label="Brand statement">
          <i />
          <strong>Flow</strong>
          <span>·</span>
          <strong>Balance</strong>
          <BrandMark compact />
          <strong>Clarity</strong>
          <span>·</span>
          <strong>Elevation</strong>
          <i />
        </section>

        <motion.section className="metric-deck" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }}>
          {metrics.map((item) => (
            <motion.div className="metric-card" key={item.label} variants={reveal}>
              <strong>{item.value}</strong>
              <span>{item.label}</span>
            </motion.div>
          ))}
        </motion.section>

        <Section
          id="work"
          eyebrow="Craft system"
          title="A portfolio rebuilt as a branded product surface."
          body="This version is not a recolor. It rebuilds the site around a cinematic visual identity, motion system, reusable surfaces, interactive project rail, and recruiter-readable proof."
        >
          <div className="craft-grid">
            {craft.map((item) => {
              const Icon = item.icon;
              return (
                <Surface className="craft-card" key={item.title}>
                  <Icon />
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </Surface>
              );
            })}
          </div>
        </Section>

        <Section
          eyebrow="Visual language"
          title="Dark depth, electric motion, champagne emphasis."
          body="The palette section keeps the brand-board language in the actual website instead of hiding it in a static asset."
          center
        >
          <div className="palette-grid">
            {palette.map((color) => (
              <div className="palette-chip" key={color.value}>
                <span style={{ backgroundColor: color.value }} />
                <strong>{color.name}</strong>
                <small>{color.value}</small>
              </div>
            ))}
          </div>
        </Section>

        <Section
          id="projects"
          eyebrow="Case studies"
          title="Interactive project rail with preserved expandable-card behavior."
          body="The original portfolio had a unique expanding project interaction. This rebuild keeps that idea, but turns it into a premium branded case-study rail."
        >
          <ProjectRail />
        </Section>

        <Section
          id="experience"
          eyebrow="Experience"
          title="Technical execution with operations-level clarity."
          body="The experience section is structured as a timeline, preserving motion reveals while making each role easier to scan."
        >
          <div className="timeline">
            {experience.map((job, index) => (
              <Surface className="timeline-card" key={`${job.role}-${job.org}`}>
                <div className="timeline-card__marker">0{index + 1}</div>
                <div>
                  <div className="timeline-card__heading">
                    <span>{job.date}</span>
                    <h3>{job.role}</h3>
                    <p>{job.org}</p>
                  </div>
                  <ul>
                    {job.points.map((point) => <li key={point}>{point}</li>)}
                  </ul>
                </div>
              </Surface>
            ))}
          </div>
        </Section>

        <Section
          eyebrow="Toolkit"
          title="Stack coverage across interface, backend, and operations."
        >
          <div className="tech-cloud">
            {tech.map((item) => <span key={item}>{item}</span>)}
          </div>
        </Section>

        <section id="contact" className="contact-stage">
          <Surface className="contact-card">
            <div>
              <p className="eyebrow">Next step</p>
              <h2>Let’s create software that feels focused, polished, and useful.</h2>
              <p>Reach out for software engineering roles, full-stack prototypes, web systems, or product specs that need structure and taste.</p>
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
