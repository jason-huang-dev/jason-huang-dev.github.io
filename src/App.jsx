import { useMemo } from 'react';
import {
  FiArrowUpRight,
  FiBriefcase,
  FiCode,
  FiDatabase,
  FiGithub,
  FiGlobe,
  FiLinkedin,
  FiMail,
  FiMapPin,
  FiServer,
  FiTool,
} from 'react-icons/fi';

const navLinks = [
  { href: '#work', label: 'Work' },
  { href: '#projects', label: 'Projects' },
  { href: '#experience', label: 'Experience' },
  { href: '#contact', label: 'Contact' },
];

const highlights = [
  { value: '3.885', label: 'Rutgers GPA' },
  { value: '1K+', label: 'tickets analyzed yearly' },
  { value: '95%', label: 'CSAT sustained' },
  { value: '20+', label: 'tickets closed weekly' },
];

const capabilities = [
  {
    icon: FiCode,
    title: 'Frontend systems',
    body: 'React, Vite, MUI, Tailwind, design-system components, dashboard UX, and clean interaction patterns.',
  },
  {
    icon: FiServer,
    title: 'Backend foundations',
    body: 'Django, DRF, FastAPI, Node, PostgreSQL, Supabase, authentication flows, and API-first product specs.',
  },
  {
    icon: FiTool,
    title: 'Automation & support ops',
    body: 'ServiceNow analysis, WordPress multisite operations, SharePoint migrations, ITIL runbooks, and scripting.',
  },
  {
    icon: FiDatabase,
    title: 'Product-minded engineering',
    body: 'Technical specs, scoped PR planning, reusable packages, maintainable architecture, and measurable delivery.',
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
    name: 'Market Bot',
    type: 'Automation project',
    description:
      'Discord bot for market data and news retrieval, built to turn financial signals into faster community updates.',
    stack: ['Python', 'Discord', 'APIs'],
    href: 'https://github.com/jason-huang-dev/Market_Bot',
  },
  {
    name: 'csRU',
    type: 'Course planning app',
    description:
      'Rutgers Computer Science course manager for BA/BS planning and curriculum visibility.',
    stack: ['React', 'Python', 'Docker'],
    href: 'https://github.com/williamowenwu/csRU',
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
      'Managed day-to-day operations, communication, customer support, and process improvements in a fast-paced local business environment.',
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

function Surface({ children, className = '', muted = false }) {
  return (
    <div className={`surface ${muted ? 'surface--muted' : ''} ${className}`}>{children}</div>
  );
}

function SectionHeading({ eyebrow, title, body }) {
  return (
    <div className="section-heading">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {body ? <p>{body}</p> : null}
    </div>
  );
}

function App() {
  const year = useMemo(() => new Date().getFullYear(), []);

  return (
    <div className="portfolio-shell">
      <header className="site-nav">
        <a className="brand" href="#top" aria-label="Jason Huang home">
          <span>JH</span>
          <div>
            <strong>Jason Huang</strong>
            <small>Software Engineer</small>
          </div>
        </a>

        <nav aria-label="Main navigation">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href}>{link.label}</a>
          ))}
        </nav>
      </header>

      <main id="top">
        <section className="hero-section">
          <div className="hero-copy">
            <p className="eyebrow">Rutgers CS + Economics · Full-stack engineer</p>
            <h1>Building practical software systems with clean UX, measurable impact, and strong technical foundations.</h1>
            <p className="hero-lede">
              I’m Jason Huang, a Rutgers University student focused on full-stack engineering,
              software operations, and product-minded systems. I like turning messy workflows into
              reliable tools, clear dashboards, and scoped implementation plans.
            </p>
            <div className="hero-actions">
              <a className="button button--primary" href="#projects">View projects <FiArrowUpRight /></a>
              <a className="button button--secondary" href="mailto:jasonh232013@gmail.com">Contact me <FiMail /></a>
            </div>
          </div>

          <Surface className="hero-card">
            <div className="availability-pill"><span /> Open to software engineering opportunities</div>
            <h2>What I bring</h2>
            <p>
              A blend of software engineering, helpdesk operations, web platforms, and business context — useful for teams that need someone who can build, debug, document, and communicate.
            </p>
            <div className="hero-meta">
              <span><FiMapPin /> New Jersey / New York area</span>
              <span><FiBriefcase /> Full-stack · Web · IT systems</span>
              <span><FiGlobe /> thejasonhuang.com</span>
            </div>
          </Surface>
        </section>

        <section className="stats-grid" aria-label="Portfolio highlights">
          {highlights.map((item) => (
            <Surface key={item.label} muted>
              <strong>{item.value}</strong>
              <span>{item.label}</span>
            </Surface>
          ))}
        </section>

        <section id="work" className="content-section">
          <SectionHeading
            eyebrow="Core strengths"
            title="A cleaner portfolio direction built around reusable UI patterns."
            body="This redesign follows the same foundation ideas as the UI-Library: consistent surfaces, text hierarchy, spacing, buttons, and section structure."
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

        <section id="projects" className="content-section">
          <SectionHeading
            eyebrow="Selected work"
            title="Projects that show software, systems, and product thinking."
            body="The project cards emphasize what each project proves rather than only showing screenshots."
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
            title="Technical execution backed by support, operations, and documentation."
            body="The experience section is structured for recruiters: role, organization, dates, and the outcomes worth discussing in interviews."
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
            title="Stack coverage from UI to backend infrastructure."
          />
          <div className="chip-row chip-row--large">
            {tech.map((item) => <span key={item}>{item}</span>)}
          </div>
        </section>

        <section id="contact" className="contact-section">
          <Surface className="contact-card">
            <div>
              <p className="eyebrow">Next step</p>
              <h2>Want to build, improve, or review a software system together?</h2>
              <p>
                Reach out for software engineering roles, web projects, full-stack prototypes, or portfolio/resume-aligned collaborations.
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
        <span>© {year} Jason Huang. Built with React, Vite, and UI-Library-inspired foundations.</span>
        <a href="#top">Back to top</a>
      </footer>
    </div>
  );
}

export default App;
