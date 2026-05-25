import type { ReactNode } from "react";

import { WaterBackdrop } from "../brand/WaterBackdrop";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";

type PageShellProps = {
  children: ReactNode;
};

export function PageShell({ children }: PageShellProps) {
  return (
    <div className="pageShell">
      <WaterBackdrop />
      <a className="skipLink" href="#main-content">
        Skip to content
      </a>
      <Navbar />
      <main id="main-content">{children}</main>
      <Footer />
    </div>
  );
}
