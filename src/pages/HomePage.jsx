import { Seo } from '../components/seo/Seo';
import { personJsonLd } from '../components/seo/JsonLd';
import { SealStampContactCTA } from '../components/brand/SealStampContactCTA';
import { SignatureCurrentDivider } from '../components/brand/SignatureCurrentDivider';
import { InkCurrentReveal } from '../components/motion/InkCurrentReveal';
import { HeroSection } from '../components/sections/HeroSection';
import { SystemsSection } from '../components/sections/SystemsSection';
import { WorkSection } from '../components/sections/WorkSection';
import { Container } from '../components/ui/Container';
import { Reveal } from '../components/ui/Reveal';
import { profile } from '../data/profile';

const proofCards = [
  {
    title: 'Backend APIs',
    body: 'Django REST and FastAPI systems with practical route design, validation, and service boundaries.',
    href: '/work/ui-library',
  },
  {
    title: 'Data models',
    body: 'PostgreSQL and Supabase-backed workflows for product systems, ingestion, and automation.',
    href: '/work/chemfarm',
  },
  {
    title: 'Workflow automation',
    body: 'Repeatable internal tools and production artifacts that reduce manual handoff risk.',
    href: '/work/video-automation-pipeline',
  },
  {
    title: 'Operations systems',
    body: 'Warehouse and scheduling workflows built around APIs, data, reliability, and product clarity.',
    href: '/work/dockflow',
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
        title="Jason Huang — Software Engineer"
        description="Backend-heavy full-stack software engineer building SaaS, education, warehouse operations, automation, and developer tooling systems with React, Django, FastAPI, PostgreSQL, Supabase, AWS, and Docker."
        pathname="/"
        jsonLd={personJsonLd(profile)}
      />
      <HeroSection />

      <SignatureCurrentDivider label="Selected Work" density="cinematic" />

      <WorkSection />

      <SignatureCurrentDivider tone="quiet" label="Proof" />

      <InkCurrentReveal
        as="section"
        className="proofSection"
        aria-labelledby="proof-title"
        intensity="signature"
      >
        <Container>
          <Reveal className="sectionHeading">
            <p className="eyebrow">Proof points</p>
            <h2 id="proof-title">Backend-heavy systems with product outcomes.</h2>
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
      </InkCurrentReveal>

      <SignatureCurrentDivider tone="blue" label="Systems" align="left" />
      <SystemsSection />

      <InkCurrentReveal as="section" id="about" className="aboutSection">
        <Container className="aboutSection__grid">
          <div className="sectionHeading">
            <p className="eyebrow">About</p>
            <h2>Backend, full-stack, and automation work.</h2>
            <p>
              I’m a software engineer studying Computer Science and Economics
              at Rutgers University. My work sits at the intersection of backend
              systems, full-stack product development, and automation.
            </p>
            <p>
              Recently, I’ve built Django REST and FastAPI backends,
              PostgreSQL/Supabase data layers, CI/CD workflows, internal tools,
              and production-style project systems for scheduling, STEM
              learning, warehouse operations, video automation, and developer
              tooling.
            </p>
            <p>
              I care about building software that is useful, maintainable, and
              measurable — not just polished on the surface.
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
      </InkCurrentReveal>

      <SignatureCurrentDivider tone="gold" label="Contact" align="right" />
      <InkCurrentReveal
        as="section"
        id="contact"
        className="contactSection"
        intensity="signature"
      >
        <Container>
          <SealStampContactCTA
            title="Let’s build reliable product systems."
            description="I’m open to software engineering roles and collaborations involving backend systems, full-stack products, automation, internal tools, and data-heavy workflows."
            primaryLabel="Email Me"
            primaryHref={profile.links.email}
            email={profile.links.email}
            secondaryLabel="View GitHub"
            secondaryHref={profile.links.github}
          />
        </Container>
      </InkCurrentReveal>
    </>
  );
}
