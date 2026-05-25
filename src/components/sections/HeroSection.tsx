import { FiArrowDownRight, FiBriefcase } from "react-icons/fi";

import { profile } from "../../data/profile";
import { BrandMark } from "../brand/BrandMark";
import { ChineseAccentText } from "../brand/ChineseAccentText";
import { ButtonLink } from "../ui/ButtonLink";
import { Container } from "../ui/Container";

export function HeroSection() {
  return (
    <section id="top" className="heroSection">
      <Container className="heroSection__grid">
        <div className="heroSection__copy">
          <p className="eyebrow">{profile.eyebrow}</p>
          <h1>{profile.tagline}</h1>
          <p className="heroSection__summary">{profile.summary}</p>
          <div className="heroSection__actions">
            <ButtonLink href="#work">
              Explore Work <FiArrowDownRight aria-hidden="true" />
            </ButtonLink>
            {profile.links.resume ? (
              <ButtonLink
                href={profile.links.resume}
                target="_blank"
                rel="noreferrer"
                variant="secondary"
              >
                View Resume <FiBriefcase aria-hidden="true" />
              </ButtonLink>
            ) : null}
          </div>
        </div>
        <div className="heroSection__visual" aria-hidden="true">
          <span className="heroSection__orb heroSection__orb--one" />
          <span className="heroSection__orb heroSection__orb--two" />
          <BrandMark variant="seal" size="lg" />
          <ChineseAccentText />
        </div>
      </Container>
    </section>
  );
}
