import { FiFileText } from "react-icons/fi";

import { profile } from "../../data/profile";
import { BrandMark } from "../brand/BrandMark";
import { ButtonLink } from "../ui/ButtonLink";
import { Container } from "../ui/Container";

const navLinks = [
  { href: "#work", label: "Work" },
  { href: "#systems", label: "Systems" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  return (
    <header className="navbar">
      <Container className="navbar__inner">
        <a className="navbar__brand" href="#top" aria-label="Jason Huang home">
          <BrandMark variant="horizontal" size="sm" />
        </a>
        <nav className="navbar__links" aria-label="Main navigation">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
        {profile.links.resume ? (
          <ButtonLink
            href={profile.links.resume}
            target="_blank"
            rel="noreferrer"
            variant="secondary"
            className="navbar__resume"
          >
            Resume <FiFileText aria-hidden="true" />
          </ButtonLink>
        ) : null}
      </Container>
    </header>
  );
}
