import { Seo } from '../components/seo/Seo';
import { Container } from '../components/ui/Container';

export function NotFoundPage() {
  return (
    <>
      <Seo
        title="Page Not Found | Jason Huang"
        description="The page could not be found. Return to Jason Huang's portfolio homepage or work index."
        pathname="/404"
      />
      <section className="notFoundPage">
        <Container>
          <p className="eyebrow">404</p>
          <h1>That route does not exist.</h1>
          <p>
            The portfolio now has route-based case studies. Head back to the
            homepage or open the work index.
          </p>
          <div className="notFoundPage__actions">
            <a href="/">Home</a>
            <a href="/work">Work</a>
          </div>
        </Container>
      </section>
    </>
  );
}
