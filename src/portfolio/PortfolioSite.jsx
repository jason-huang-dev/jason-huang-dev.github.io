import { useState } from 'react';
import { motion } from 'framer-motion';
import './portfolio.css';
import Mark from './Mark';

const nav = ['Identity', 'Craft', 'Case Studies', 'Experience', 'Contact'];

const metrics = [
  ['3.885', 'Rutgers GPA'],
  ['1K+', 'tickets analyzed yearly'],
  ['95%', 'CSAT sustained'],
  ['20+', 'tickets closed weekly'],
];

const principles = [
  ['Balance', 'Clean product structure without visual stiffness.'],
  ['Flow', 'Interfaces that guide users through decisions.'],
  ['Clarity', 'Dashboards, docs, and systems that explain themselves.'],
  ['Focus', 'Scoped builds with measurable outcomes.'],
  ['Energy', 'Fast iteration without chaotic architecture.'],
  ['Elevation', 'A refined finish over practical engineering work.'],
];

const craft = [
  ['Interface Systems', 'React, Vite, MUI, Tailwind, reusable component patterns, responsive dashboards, and design-system thinking.'],
  ['Backend Architecture', 'Django, DRF, FastAPI, Node, PostgreSQL, Supabase, auth flows, API contracts, and deployment-aware structure.'],
  ['Operational Clarity', 'ServiceNow analysis, WordPress multisite operations, SharePoint migrations, ITIL runbooks, and triage workflows.'],
  ['Spec-Led Delivery', 'Technical specs, scoped PR planning, architecture notes, acceptance criteria, and implementation checklists.'],
];

const projects = [
  ['CertChase', 'Micro SaaS', 'Compliance workflow clarity', 'Vendor compliance tracker planned with React, MUI, Django/DRF, and Supabase PostgreSQL.', ['React', 'MUI', 'Django', 'DRF', 'Supabase'], 'https://github.com/jason-huang-dev'],
  ['DaChong WMS', '3PL Platform', 'Warehouse operations structure', 'Multi-tenant WMS direction for inventory, warehouse operations, client accounts, roles, dashboards, and intuitive filtering.', ['React', 'MUI', 'PostgreSQL', 'Docker', 'Django'], 'https://github.com/jason-huang-dev'],
  ['UI-Library', 'Design System', 'Reusable UI foundations', 'Component library direction with tokens, provider patterns, surfaces, text, buttons, forms, overlays, and Storybook.', ['React', 'MUI', 'Tokens', 'Storybook'], 'https://github.com/jason-huang-dev/UI-Library'],
  ['Market Bot', 'Automation', 'Financial signal retrieval', 'Discord bot for market data and news retrieval, built to turn financial signals into faster community updates.', ['Python', 'Discord', 'APIs'], 'https://github.com/jason-huang-dev/Market_Bot'],
];

const experience = [
  ['Rutgers University — SC&I IT Helpdesk', 'Web Developer & IT Support Technician', 'Jan 2025 — Jan 2026', ['Maintained WordPress multisite operations across development, staging, and production workflows.', 'Built ticket-analysis dashboards across 1,000+ annual ServiceNow tickets to identify repeat incident drivers.', 'Sustained roughly 95% CSAT while closing 20+ tickets per week within SLA expectations.']],
  ['Headstarter AI', 'Software Engineering Fellow', 'Jul 2024 — Sep 2024', ['Built full-stack projects in small teams, introduced Docker workflows, and standardized imports and project structure.', 'Shipped rapid prototypes while balancing UI quality, backend structure, and practical delivery constraints.']],
  ['Golden Unicorn', 'Operations Manager', 'Oct 2019 — Present', ['Managed daily operations, communication, customer support, and process improvements in a fast-paced local business environment.']],
];

const tech = ['React', 'Vite', 'MUI', 'Tailwind', 'JavaScript', 'TypeScript', 'Python', 'Django', 'FastAPI', 'Node', 'PostgreSQL', 'Supabase', 'Docker', 'AWS', 'Git', 'C', 'Java', 'WordPress', 'SharePoint', 'ServiceNow'];

const palette = [
  ['Onyx', '#0A0A0A'], ['Charcoal', '#1B1E22'], ['Slate', '#2C3440'], ['Midnight Navy', '#0B1D3A'], ['Electric Water', '#00AFFF'], ['Champagne Gold', '#D4AF6A'],
];

const fade = { hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0, transition: { duration: 0.65 } } };

function Section({ id, kicker, title, children, center = false }) {
  return (
    <motion.section id={id} className={`section-new ${center ? 'centered' : ''}`} variants={fade} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
      <p className="kicker">{kicker}</p>
      <h2>{title}</h2>
      {children}
    </motion.section>
  );
}

export default function PortfolioSite() {
  const [activeProject, setActiveProject] = useState(0);
  const year = new Date().getFullYear();

  return (
    <div className="portfolio-root">
      <header className="portfolio-nav">
        <a className="portfolio-brand" href="#identity"><Mark /><span>Jason Huang</span></a>
        <nav>{nav.map((item) => <a key={item} href={`#${item.toLowerCase().replaceAll(' ', '-')}`}>{item}</a>)}</nav>
      </header>

      <main>
        <section id="identity" className="hero-new">
          <motion.div initial="hidden" animate="show" variants={fade}>
            <p className="kicker">Brand Identity</p>
            <h1>Software with flow, balance, and clarity.</h1>
            <p>I build practical software systems, polished interfaces, and operational tools that turn complex workflows into clear user experiences.</p>
            <div className="actions"><a href="#case-studies">Explore Work</a><a href="mailto:jasonh232013@gmail.com">Contact</a></div>
          </motion.div>
          <motion.div className="emblem" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }}><Mark /></motion.div>
          <aside className="keywords">{principles.map(([name]) => <b key={name}>{name}</b>)}</aside>
        </section>

        <section className="metric-row">{metrics.map(([value, label]) => <article key={label}><strong>{value}</strong><span>{label}</span></article>)}</section>

        <Section id="craft" kicker="Craft System" title="A portfolio rebuilt as a branded product surface.">
          <p>This is a new portfolio module, not the old component tree. It uses a new entry point, new portfolio directory, new content structure, and a brand-specific stylesheet.</p>
          <div className="card-grid">{craft.map(([title, body]) => <article className="surface-card" key={title}><h3>{title}</h3><p>{body}</p></article>)}</div>
        </Section>

        <Section kicker="Visual Language" title="Dark depth, electric motion, champagne emphasis." center>
          <div className="palette-grid">{palette.map(([name, value]) => <div className="palette-chip" key={name}><span style={{ backgroundColor: value }} /><b>{name}</b><small>{value}</small></div>)}</div>
        </Section>

        <Section id="case-studies" kicker="Case Studies" title="Expandable project stories replace the old card grid.">
          <div className="project-rail">
            {projects.map((project, index) => {
              const [name, type, outcome, description, stack, href] = project;
              const isActive = activeProject === index;
              return (
                <article className={`project-panel ${isActive ? 'active' : ''}`} key={name} onClick={() => setActiveProject(index)}>
                  <small>{type}</small>
                  <div><p>{outcome}</p><h3>{name}</h3><span>{description}</span><div className="chips">{stack.map((item) => <b key={item}>{item}</b>)}</div></div>
                  <a href={href} target="_blank" rel="noreferrer">Open</a>
                </article>
              );
            })}
          </div>
        </Section>

        <Section id="experience" kicker="Experience" title="Technical execution with operational clarity.">
          <div className="timeline">{experience.map(([org, role, date, bullets], index) => <article className="timeline-card" key={role}><strong>0{index + 1}</strong><div><span>{date}</span><h3>{role}</h3><p>{org}</p><ul>{bullets.map((item) => <li key={item}>{item}</li>)}</ul></div></article>)}</div>
        </Section>

        <Section kicker="Toolkit" title="Stack coverage across interface, backend, and operations.">
          <div className="tech-cloud">{tech.map((item) => <span key={item}>{item}</span>)}</div>
        </Section>

        <section id="contact" className="contact-new"><p className="kicker">Contact</p><h2>Let’s create focused, polished, useful software.</h2><p>Reach out for software engineering roles, full-stack prototypes, web systems, or product specs that need structure and taste.</p><div className="actions"><a href="mailto:jasonh232013@gmail.com">Email Jason</a><a href="https://github.com/jason-huang-dev" target="_blank" rel="noreferrer">GitHub</a><a href="https://www.linkedin.com/in/jasonhuangdev" target="_blank" rel="noreferrer">LinkedIn</a></div></section>
      </main>

      <footer className="portfolio-footer"><span>© {year} Jason Huang. Flow · Balance · Clarity.</span><a href="#identity">Back to top</a></footer>
    </div>
  );
}
