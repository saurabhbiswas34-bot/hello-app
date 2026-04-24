import Button from '../../components/atoms/Button/Button'
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
      <div className="home-page__actions">
        <Button variant="blue" horizontalSpacing="sm" topMargin="none">
          Primary action
        </Button>
        <Button
          url="https://storybook.js.org/"
          newTab
          variant="default"
          horizontalSpacing="sm"
          topMargin="sm"
        >
          Storybook docs (new tab)
        </Button>
      </div>
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
