import {
  FiDatabase,
  FiDroplet,
  FiGithub,
  FiLayers,
  FiLinkedin,
  FiMail,
  FiServer,
} from 'react-icons/fi';

import { PageShell } from './components/layout/PageShell';
import { HeroSection } from './components/sections/HeroSection';
import { RippleWorkSection } from './components/sections/RippleWorkSection';
import { ButtonLink } from './components/ui/ButtonLink';
import { Container } from './components/ui/Container';
import { profile } from './data/profile';

const systems = [
  {
    icon: FiLayers,
    title: 'UI systems',
    body: 'Reusable components, token-driven styling, responsive surfaces, and documentation-minded frontend architecture.',
  },
  {
    icon: FiServer,
    title: 'Backend foundations',
    body: 'Django, DRF, FastAPI, Node, PostgreSQL, Supabase, auth flows, and API contracts built for maintainable products.',
  },
  {
    icon: FiDatabase,
    title: 'Operational clarity',
    body: 'Dashboards, ticket analysis, workflow mapping, and process tools that make complex work easier to scan and act on.',
  },
  {
    icon: FiDroplet,
    title: 'Product polish',
    body: 'Spec-led delivery, careful interaction states, accessible motion, and brand systems that stay readable under pressure.',
  },
];

const stack = [
  'React',
  'Vite',
  'TypeScript',
  'JavaScript',
  'MUI',
  'Tailwind CSS',
  'Python',
  'Django',
  'FastAPI',
  'Node.js',
  'PostgreSQL',
  'Supabase',
  'Docker',
  'AWS',
  'Git',
  'ServiceNow',
  'WordPress',
];

function App() {
  return (
    <PageShell>
      <HeroSection />

      <RippleWorkSection />

      <section id="systems" className="systemsSection">
        <Container>
          <div className="sectionHeading">
            <p className="eyebrow">Systems</p>
            <h2>Engineering taste with practical delivery.</h2>
            <p>
              I focus on software surfaces that are structured, readable, and
              useful: from design systems to backend workflows.
            </p>
          </div>
          <div className="systemsGrid">
            {systems.map((item) => {
              const Icon = item.icon;
              return (
                <article className="systemCard" key={item.title}>
                  <Icon aria-hidden="true" />
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </article>
              );
            })}
          </div>
        </Container>
      </section>

      <section id="about" className="aboutSection">
        <Container className="aboutSection__grid">
          <div className="sectionHeading">
            <p className="eyebrow">About</p>
            <h2>Calm interfaces for complex work.</h2>
            <p>
              I am a software engineer in the New Jersey and New York area,
              building across frontend systems, backend foundations, and
              operations-heavy products. My best work sits where product
              clarity, engineering structure, and visual polish meet.
            </p>
          </div>
          <div className="stackPanel">
            <h3>Current toolkit</h3>
            <div className="stackCloud">
              {stack.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section id="contact" className="contactSection">
        <Container>
          <div className="contactPanel">
            <div>
              <p className="eyebrow">Contact</p>
              <h2>Let’s build something focused and useful.</h2>
              <p>
                Reach out for software engineering roles, full-stack prototypes,
                UI systems, or product specs that need structure and taste.
              </p>
            </div>
            <div className="contactPanel__actions">
              {profile.links.email ? (
                <ButtonLink href={profile.links.email}>
                  <FiMail aria-hidden="true" /> Email
                </ButtonLink>
              ) : null}
              {profile.links.github ? (
                <ButtonLink
                  href={profile.links.github}
                  target="_blank"
                  rel="noreferrer"
                  variant="secondary"
                >
                  <FiGithub aria-hidden="true" /> GitHub
                </ButtonLink>
              ) : null}
              {profile.links.linkedin ? (
                <ButtonLink
                  href={profile.links.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  variant="secondary"
                >
                  <FiLinkedin aria-hidden="true" /> LinkedIn
                </ButtonLink>
              ) : null}
            </div>
          </div>
        </Container>
      </section>
    </PageShell>
  );
}

export default App;
