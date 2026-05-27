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
      </InkCurrentReveal>

      <SignatureCurrentDivider tone="blue" label="Systems" align="left" />
      <SystemsSection />

      <InkCurrentReveal as="section" id="about" className="aboutSection">
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
            title="Let’s build something focused and useful."
            description="Reach out for software engineering roles, full-stack prototypes, UI systems, or product specs that need structure and taste."
            primaryLabel="Email"
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
