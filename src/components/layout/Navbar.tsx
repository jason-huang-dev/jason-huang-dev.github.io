import { FiFileText } from "react-icons/fi";

import { profile } from "../../data/profile";
import { useActiveSection } from "../../hooks/useActiveSection";
import { BrandMark } from "../brand/BrandMark";
import { ThemeToggle } from "../theme/ThemeToggle";
import { ButtonLink } from "../ui/ButtonLink";
import { Container } from "../ui/Container";

const navLinks = [
  { href: "/work", id: "work", label: "Work" },
  { href: "/#systems", id: "systems", label: "Systems" },
  { href: "/#about", id: "about", label: "About" },
  { href: "/#contact", id: "contact", label: "Contact" },
];

type NavbarProps = {
  theme: {
    preference: string;
    resolvedTheme: string;
    setPreference: (preference: string) => void;
  };
};

export function Navbar({ theme }: NavbarProps) {
  const activeId = useActiveSection(["top", "work", "systems", "about", "contact"]);

  return (
    <header className="navbar">
      <Container className="navbar__inner">
        <a className="navbar__brand" href="/" aria-label="Jason Huang home">
          <BrandMark variant="horizontal" size="sm" />
        </a>
        <nav className="navbar__links" aria-label="Main navigation">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={activeId === link.id ? "is-active" : ""}
              aria-current={activeId === link.id ? "page" : undefined}
            >
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
        <ThemeToggle {...theme} />
      </Container>
    </header>
  );
}
