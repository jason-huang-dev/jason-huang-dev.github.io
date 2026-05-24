import './portfolio.css';
import Mark from './Mark';

const nav = ['Identity', 'Craft', 'Case Studies', 'Experience', 'Contact'];

export default function PortfolioSite() {
  return (
    <div className="portfolio-root">
      <header className="portfolio-nav">
        <a className="portfolio-brand" href="#identity"><Mark /><span>Jason Huang</span></a>
        <nav>{nav.map((item) => <a key={item} href={`#${item.toLowerCase().replaceAll(' ', '-')}`}>{item}</a>)}</nav>
      </header>
      <main>
        <section id="identity" className="hero-new">
          <div>
            <p className="kicker">Brand Identity</p>
            <h1>Software with flow, balance, and clarity.</h1>
            <p>I build practical software systems, polished interfaces, and operational tools that turn complex workflows into clear user experiences.</p>
            <div className="actions"><a href="#case-studies">Explore Work</a><a href="mailto:jasonh232013@gmail.com">Contact</a></div>
          </div>
          <div className="emblem"><Mark /></div>
          <aside className="keywords"><b>Balance</b><b>Flow</b><b>Clarity</b><b>Focus</b><b>Energy</b><b>Elevation</b></aside>
        </section>
        <section id="craft" className="section-new"><p className="kicker">Craft</p><h2>Built from a new portfolio architecture.</h2></section>
        <section id="case-studies" className="section-new"><p className="kicker">Case Studies</p><h2>Expandable project stories replace the old card grid.</h2></section>
        <section id="experience" className="section-new"><p className="kicker">Experience</p><h2>Technical execution with operational clarity.</h2></section>
        <section id="contact" className="section-new"><p className="kicker">Contact</p><h2>Let’s create focused, polished, useful software.</h2></section>
      </main>
    </div>
  );
}
