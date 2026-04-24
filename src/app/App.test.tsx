import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
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
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('link', { name: /users/i }))

    expect(
      await screen.findByRole('heading', { level: 1, name: 'Users' })
    ).toBeInTheDocument()
  })
})
