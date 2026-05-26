import type { ReactNode } from "react";
import { useLocation } from "react-router-dom";

import { WaterBackdrop } from "../brand/WaterBackdrop";
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

  return (
    <div className="pageShell">
      <WaterBackdrop />
      <a className="skipLink" href="#main-content">
        Skip to content
      </a>
      <Navbar />
      {showSectionRail ? <ScrollProgressRail sections={sectionNavItems} /> : null}
      <main id="main-content" tabIndex={-1}>
        {children}
      </main>
      <Footer />
    </div>
  );
}
