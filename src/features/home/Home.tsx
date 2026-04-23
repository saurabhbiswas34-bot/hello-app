import './Home.css'

function Home() {
  return (
    <main className="home-page">
      <h1 className="home-page__title">React Quality Bootstrap Starter</h1>
      <p className="home-page__description">
        This starter combines Atomic Design, feature slicing, quality gates, and
        CI/CD automation so new projects can ship with production-ready
        defaults.
      </p>
      <section className="home-page__section">
        <h2 className="home-page__section-title">Included demos</h2>
        <p className="home-page__section-copy">
          Use the top navigation for the Home, Users accordion, Products cards
        </p>
      </section>
    </main>
  )
}

export default Home
