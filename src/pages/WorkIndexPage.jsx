import { FiArrowUpRight } from 'react-icons/fi';

import { Seo } from '../components/seo/Seo';
import { Container } from '../components/ui/Container';
import { projects } from '../data/projects';

export function WorkIndexPage() {
  return (
    <>
      <Seo
        title="Work | Jason Huang"
        description="Case studies and project systems by Jason Huang, including UI Library, Stock Showdown, DaChong WMS, and the portfolio platform."
        pathname="/work"
        image="/og/work.png"
      />
      <section className="pageHero">
        <Container>
          <p className="eyebrow">Work</p>
          <h1>Case studies for product systems, interfaces, and workflows.</h1>
          <p>
            A scannable index of the projects behind the portfolio. Each case
            study turns the work into problem, constraint, decision, and result.
          </p>
        </Container>
      </section>

      <section className="workIndexSection" aria-label="Project case studies">
        <Container>
          <div className="workIndexGrid">
            {projects.map((project) => (
              <article
                className="workIndexCard"
                data-accent={project.accent ?? 'water'}
                key={project.id}
              >
                <div className="workIndexCard__topline">
                  <span>{project.category}</span>
                  <span>{project.status}</span>
                </div>
                <h2>{project.title}</h2>
                <p>{project.shortDescription}</p>
                <ul>
                  {project.keyFeatures.slice(0, 3).map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
                <div className="workIndexCard__tech">
                  {project.techStack.slice(0, 5).map((tech) => (
                    <span key={tech}>{tech}</span>
                  ))}
                </div>
                <div className="workIndexCard__actions">
                  <a href={`/work/${project.slug}`}>
                    Read case study <FiArrowUpRight aria-hidden="true" />
                  </a>
                  {project.links.slice(0, 2).map((link) => (
                    <a
                      href={link.href}
                      key={link.href}
                      target={link.href.startsWith('http') ? '_blank' : undefined}
                      rel={link.href.startsWith('http') ? 'noreferrer' : undefined}
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
