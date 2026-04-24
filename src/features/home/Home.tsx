import './Home.css'

function Home() {
  return (
    <div className="home-page">
      <h1 className="home-page__title">React Quality Bootstrap Starter</h1>
      <p className="home-page__description">
        This starter combines Atomic Design, feature slicing, quality gates, and
        CI/CD automation so new projects can ship with production-ready
        defaults.
      </p>
      <div className="home-page__actions">
        <a
          className="home-page__action-link"
          href="https://storybook.js.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Storybook docs (new tab)
        </a>
      </div>
      <section className="home-page__section">
        <h2 className="home-page__section-title">Included demos</h2>
        <p className="home-page__section-copy">
          Use the top navigation for the Home, Users accordion, and Products
          card demos.
        </p>
      </section>
    </div>
  )
}

export default Home
