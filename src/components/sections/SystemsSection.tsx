import {
  FiCloud,
  FiDatabase,
  FiLayers,
  FiServer,
} from "react-icons/fi";

import { InteractiveSystemCard, type SystemItem } from "../systems/InteractiveSystemCard";
import { Container } from "../ui/Container";
import { Reveal } from "../ui/Reveal";

const systems: SystemItem[] = [
  {
    icon: FiServer,
    title: "Backend & API Engineering",
    body: "Django REST, FastAPI, authentication, route design, validation, and service boundaries.",
    proof: "Django REST, FastAPI, auth, validation, API contracts.",
    accent: "water",
  },
  {
    icon: FiLayers,
    title: "Full-Stack Product Development",
    body: "React/Next/Vite frontends connected to practical backend and database workflows.",
    proof: "React, Vite, APIs, PostgreSQL, product workflows.",
    accent: "gold",
  },
  {
    icon: FiDatabase,
    title: "Automation & Data Pipelines",
    body: "Scripts, ETL flows, ingestion tools, and repeatable workflows that reduce manual effort.",
    proof: "ETL, ingestion tooling, scripts, repeatable workflows.",
    accent: "jade",
  },
  {
    icon: FiCloud,
    title: "Cloud, DevOps & Reliability",
    body: "Docker, AWS, Vercel, GitHub Actions, Postman regression checks, and deployment quality gates.",
    proof: "Docker, AWS, Vercel, GitHub Actions, regression checks.",
    accent: "water",
  },
];

export function SystemsSection() {
  return (
    <section id="systems" className="systemsSection">
      <Container>
        <Reveal className="sectionHeading">
          <p className="eyebrow">Systems</p>
          <h2>Engineering capability areas.</h2>
          <p>
            My experience combines production support, web development, SaaS
            engineering, automation, mentoring, and technical ownership across
            school, fellowship, and independent product work.
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
