import {
  FiDatabase,
  FiDroplet,
  FiLayers,
  FiServer,
} from "react-icons/fi";

import { InteractiveSystemCard, type SystemItem } from "../systems/InteractiveSystemCard";
import { Container } from "../ui/Container";
import { Reveal } from "../ui/Reveal";

const systems: SystemItem[] = [
  {
    icon: FiLayers,
    title: "UI systems",
    body: "Reusable components, token-driven styling, responsive surfaces, and documentation-minded frontend architecture.",
    proof: "Component libraries, tokens, Storybook, reusable surfaces.",
    accent: "water",
  },
  {
    icon: FiServer,
    title: "Backend foundations",
    body: "Django, DRF, FastAPI, Node, PostgreSQL, Supabase, auth flows, and API contracts built for maintainable products.",
    proof: "Auth, API contracts, PostgreSQL, Supabase, Django/DRF.",
    accent: "gold",
  },
  {
    icon: FiDatabase,
    title: "Operational clarity",
    body: "Dashboards, ticket analysis, workflow mapping, and process tools that make complex work easier to scan and act on.",
    proof: "Ticket dashboards, workflow mapping, runbooks, support tooling.",
    accent: "jade",
  },
  {
    icon: FiDroplet,
    title: "Product polish",
    body: "Spec-led delivery, careful interaction states, accessible motion, and brand systems that stay readable under pressure.",
    proof: "Spec-led implementation, interaction states, accessible motion.",
    accent: "water",
  },
];

export function SystemsSection() {
  return (
    <section id="systems" className="systemsSection">
      <Container>
        <Reveal className="sectionHeading">
          <p className="eyebrow">Systems</p>
          <h2>Engineering taste with practical delivery.</h2>
          <p>
            I focus on software surfaces that are structured, readable, and
            useful: from design systems to backend workflows.
          </p>
        </Reveal>
        <div className="systemsGrid">
          {systems.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.04}>
              <InteractiveSystemCard item={item} index={index} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
