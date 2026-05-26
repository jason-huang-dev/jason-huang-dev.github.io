import {
  FiGithub,
  FiLinkedin,
  FiMail,
} from 'react-icons/fi';

import { Seo } from '../components/seo/Seo';
import { personJsonLd } from '../components/seo/JsonLd';
import { RippleDivider } from '../components/brand/RippleDivider';
import { SealStampCTA } from '../components/brand/SealStampCTA';
import { HeroSection } from '../components/sections/HeroSection';
import { SystemsSection } from '../components/sections/SystemsSection';
import { WorkSection } from '../components/sections/WorkSection';
import { ButtonLink } from '../components/ui/ButtonLink';
import { Container } from '../components/ui/Container';
import { Reveal } from '../components/ui/Reveal';
import { profile } from '../data/profile';

const proofCards = [
  {
    title: 'Design systems',
    body: 'Token-driven React component library with documentation and theming foundations.',
    href: '/work/ui-library',
  },
  {
    title: 'Full-stack products',
    body: 'Route-based, API-minded product surfaces built for maintainable workflows.',
    href: '/work/portfolio-system',
  },
  {
    title: 'Workflow automation',
    body: 'Systems thinking for data intake, review flows, and repeatable output generation.',
    href: '/work/stock-showdown',
  },
  {
    title: 'Operations dashboards',
    body: 'Role-aware operational interfaces for inventory, compliance, and fulfillment clarity.',
    href: '/work/dachong-wms',
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

export function HomePage() {
  return (
    <>
      <Seo
        title="Jason Huang | Software Engineer & Product Builder"
        description="Software engineer building design systems, full-stack products, workflow automation, and polished interfaces in the New York / New Jersey area."
        pathname="/"
        jsonLd={personJsonLd(profile)}
      />
      <HeroSection />

      <RippleDivider variant="water" />

      <WorkSection />

      <RippleDivider variant="gold" />

      <section className="proofSection" aria-labelledby="proof-title">
        <Container>
          <Reveal className="sectionHeading">
            <p className="eyebrow">Proof points</p>
            <h2 id="proof-title">Focused systems, not portfolio filler.</h2>
          </Reveal>
          <div className="proofGrid">
            {proofCards.map((card) => (
              <a className="proofCard" href={card.href} key={card.title}>
                <strong>{card.title}</strong>
                <span>{card.body}</span>
                <small>View case study</small>
              </a>
            ))}
          </div>
        </Container>
      </section>

      <SystemsSection />

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
                <SealStampCTA href={profile.links.email} variant="gold">
                  <FiMail aria-hidden="true" /> Email
                </SealStampCTA>
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
    </>
  );
}
