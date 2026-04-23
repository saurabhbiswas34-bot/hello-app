import { act, render, screen, within } from '@testing-library/react'
import App from './App'

const setPath = (path: string): void => {
  window.history.pushState({}, '', path)
}

describe('App shell navigation', () => {
  beforeEach(() => {
    setPath('/')
  })

  it('renders primary navigation with feature links', () => {
    render(<App />)

    const primaryNav = screen.getByRole('navigation', { name: /primary/i })
    expect(
      within(primaryNav).getByRole('link', { name: /home/i })
    ).toBeInTheDocument()
    expect(
      within(primaryNav).getByRole('link', { name: /users/i })
    ).toBeInTheDocument()
    expect(
      within(primaryNav).getByRole('link', { name: /products/i })
    ).toBeInTheDocument()
  })

  it('defaults to the Home view', async () => {
    render(<App />)

    expect(
      await screen.findByRole('heading', {
        level: 1,
        name: /react quality bootstrap starter/i,
      })
    ).toBeInTheDocument()
  })

  it('switches to the Users view when route changes', async () => {
    render(<App />)
    act(() => {
      window.history.pushState({}, '', '/users')
      window.dispatchEvent(new PopStateEvent('popstate'))
    })

    expect(
      await screen.findByRole('heading', { level: 1, name: 'Users' })
    ).toBeInTheDocument()
  })
})
