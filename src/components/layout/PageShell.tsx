import type { ReactNode } from "react";
import { useLocation } from "react-router-dom";

import { WaterBackdrop } from "../brand/WaterBackdrop";
import { useThemePreference } from "../../hooks/useThemePreference";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";
import { ScrollProgressRail } from "./ScrollProgressRail";

const sectionNavItems = [
  { id: "top", label: "Intro" },
  { id: "work", label: "Work" },
  { id: "systems", label: "Systems" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

type PageShellProps = {
  children: ReactNode;
};

export function PageShell({ children }: PageShellProps) {
  const location = useLocation();
  const showSectionRail = location.pathname === "/";
  const theme = useThemePreference();

  return (
    <div className="pageShell" data-resolved-theme={theme.resolvedTheme}>
      <WaterBackdrop />
      <a className="skipLink" href="#main-content">
        Skip to content
      </a>
      <Navbar theme={theme} />
      {showSectionRail ? <ScrollProgressRail sections={sectionNavItems} /> : null}
      <main id="main-content" tabIndex={-1}>
        {children}
      </main>
      <Footer />
    </div>
  );
}
