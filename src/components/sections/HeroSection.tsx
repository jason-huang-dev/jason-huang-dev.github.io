import { lazy, Suspense } from "react";
import { FiArrowDownRight, FiBriefcase } from "react-icons/fi";

import { profile } from "../../data/profile";
import { HeroOrbitalSignature } from "../brand/HeroOrbitalSignature";
import { SealStampCTA } from "../brand/SealStampCTA";
import { ButtonLink } from "../ui/ButtonLink";
import { Container } from "../ui/Container";
import { Magnetic } from "../ui/Magnetic";
import { Reveal } from "../ui/Reveal";

const heroStats = [
  "Full-stack product systems",
  "Design systems + UI polish",
  "Operations-focused dashboards",
];

const HeroFluidSimulationPanel = lazy(() =>
  import("../brand/HeroFluidSimulationPanel").then((module) => ({
    default: module.HeroFluidSimulationPanel,
  })),
);

function HeroSignatureFallback() {
  return (
    <div className="heroWebGLSignaturePanel">
      <span className="signatureFluidFallback" aria-hidden="true" />
      <HeroOrbitalSignature />
    </div>
  );
}

export function HeroSection() {
  return (
    <section id="top" className="heroSection">
      <Container className="heroSection__grid">
        <div className="heroSection__copy">
          <Reveal>
            <p className="eyebrow">{profile.eyebrow}</p>
            <h1>{profile.tagline}</h1>
            <p className="heroSection__summary">{profile.summary}</p>
          </Reveal>
          <div className="heroSection__stats" aria-label="Portfolio strengths">
            {heroStats.map((stat) => (
              <span key={stat}>{stat}</span>
            ))}
          </div>
          <div className="heroSection__actions">
            <Magnetic>
              <ButtonLink href="#work">
                Explore Work <FiArrowDownRight aria-hidden="true" />
              </ButtonLink>
            </Magnetic>
            {profile.links.resume ? (
              <Magnetic strength={4}>
                <SealStampCTA
                  href={profile.links.resume}
                  external
                  variant="gold"
                >
                  View Resume <FiBriefcase aria-hidden="true" />
                </SealStampCTA>
              </Magnetic>
            ) : null}
          </div>
        </div>
        <div className="heroSection__visual" aria-hidden="true">
          <Suspense fallback={<HeroSignatureFallback />}>
            <HeroFluidSimulationPanel />
          </Suspense>
        </div>
      </Container>
    </section>
  );
}
