import { useMemo } from "react";

import { profile } from "../../data/profile";
import { BrandMark } from "../brand/BrandMark";
import { Container } from "../ui/Container";

export function Footer() {
  const year = useMemo(() => new Date().getFullYear(), []);
  const footerLinks = [
    { label: "GitHub", href: profile.links.github },
    { label: "LinkedIn", href: profile.links.linkedin },
    { label: "Resume", href: profile.links.resume },
  ].filter((link) => link.href);

  return (
    <footer className="footer">
      <Container className="footer__inner">
        <div className="footer__brand">
          <BrandMark variant="seal" size="sm" />
          <div>
            <strong>{profile.name}</strong>
            <p>{profile.tagline}</p>
          </div>
        </div>
        <nav className="footer__links" aria-label="Footer links">
          {footerLinks.map((link) => (
            <a key={link.label} href={link.href} target="_blank" rel="noreferrer">
              {link.label}
            </a>
          ))}
          <a href="#top">Back to top</a>
        </nav>
        <p className="footer__copyright">© {year} Jason Huang.</p>
      </Container>
    </footer>
  );
}
