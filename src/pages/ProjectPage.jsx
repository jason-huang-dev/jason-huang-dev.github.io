import { useMemo } from 'react';
import { Navigate, useParams } from 'react-router-dom';

import { projectJsonLd } from '../components/seo/JsonLd';
import { Seo } from '../components/seo/Seo';
import { Container } from '../components/ui/Container';
import { getProjectPage } from '../data/projectPages';
import { getProjectLinks, projects } from '../data/projects';

const railItems = [
  ['overview', 'Overview'],
  ['problem', 'Problem'],
  ['architecture', 'Architecture'],
  ['decisions', 'UX decisions'],
  ['results', 'Results'],
  ['next', 'Next steps'],
];

function ArchitectureDiagram({ project, page }) {
  const items = page.architecture?.bullets ?? project.keyFeatures;

  return (
    <div className="architectureDiagram" aria-label={`${project.title} architecture`}>
      {items.slice(0, 5).map((item, index) => (
        <div className="architectureNode" key={item}>
          <span>{String(index + 1).padStart(2, '0')}</span>
          <strong>{item}</strong>
        </div>
      ))}
    </div>
  );
}

export function ProjectPage() {
  const { slug } = useParams();
  const project = useMemo(
    () => projects.find((item) => item.slug === slug),
    [slug],
  );
  const page = getProjectPage(slug);

  if (!project || !page) {
    return <Navigate to="/404" replace />;
  }

  const visibleLinks = getProjectLinks(project);

  return (
    <>
      <Seo
        title={`${project.title} | Jason Huang Case Study`}
        description={page.subtitle}
        pathname={`/work/${project.slug}`}
        image={`/og/${project.slug}.png`}
        type="article"
        jsonLd={projectJsonLd(project, page)}
      />
      <article className="projectPage">
        <section className="projectPageHero" id="overview">
          <Container className="projectPageHero__grid">
            <div>
              <p className="eyebrow">{page.heroKicker}</p>
              <h1>{project.title}</h1>
              <p>{page.subtitle}</p>
              <div className="projectPageHero__actions">
                <a href="/work">All work</a>
                {visibleLinks.map((link) => (
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
            </div>
            <aside className="projectSnapshot" aria-label="Project snapshot">
              <dl>
                <div>
                  <dt>Category</dt>
                  <dd>{project.category}</dd>
                </div>
                <div>
                  <dt>Status</dt>
                  <dd>{project.status}</dd>
                </div>
                <div>
                  <dt>Role</dt>
                  <dd>{project.role}</dd>
                </div>
                <div>
                  <dt>Stack</dt>
                  <dd>{project.techStack.join(', ')}</dd>
                </div>
              </dl>
            </aside>
          </Container>
        </section>

        <Container className="projectPage__layout">
          <nav className="caseRail" aria-label="Case study sections">
            {railItems.map(([href, label]) => (
              <a href={`#${href}`} key={href}>
                {label}
              </a>
            ))}
          </nav>

          <div className="caseStudy">
            <section className="caseStudySection" id="problem">
              <p className="eyebrow">Problem</p>
              <h2>What needed to be solved</h2>
              <p>{page.problem}</p>
              <div className="caseListGrid">
                <div>
                  <h3>Constraints</h3>
                  <ul>
                    {page.constraints.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3>Approach</h3>
                  <ul>
                    {page.approach.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            <section className="caseStudySection" id="architecture">
              <p className="eyebrow">Architecture</p>
              <h2>How the system is structured</h2>
              <p>{page.architecture?.summary ?? project.overview}</p>
              <ArchitectureDiagram project={project} page={page} />
            </section>

            <section className="caseStudySection" id="decisions">
              <p className="eyebrow">UX decisions</p>
              <h2>Key decisions and tradeoffs</h2>
              <div className="decisionGrid">
                {page.uxDecisions.map((decision) => (
                  <article className="decisionCard" key={decision.title}>
                    <h3>{decision.title}</h3>
                    <p>{decision.context}</p>
                    <strong>{decision.decision}</strong>
                    {decision.result ? <span>{decision.result}</span> : null}
                  </article>
                ))}
              </div>
            </section>

            <section className="caseStudySection" id="results">
              <p className="eyebrow">Results</p>
              <h2>Proof points</h2>
              <div className="metricGrid">
                {page.metrics.map((metric) => (
                  <article className="metricCard" key={metric.label}>
                    <span>{metric.label}</span>
                    <strong>{metric.value}</strong>
                    {metric.description ? <p>{metric.description}</p> : null}
                  </article>
                ))}
              </div>
            </section>

            <section className="caseStudySection" id="next">
              <p className="eyebrow">Next steps</p>
              <h2>What I would improve next</h2>
              <div className="caseListGrid">
                <div>
                  <h3>Lessons</h3>
                  <ul>
                    {page.lessons.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3>Next</h3>
                  <ul>
                    {page.nextSteps.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>
          </div>
        </Container>
      </article>
    </>
  );
}
