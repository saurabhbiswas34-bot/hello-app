import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

vi.mock('./hooks/useAccordionData', () => ({
  default: () => ({
    items: [
      {
        id: 'item-1',
        title: 'What is Atomic Design?',
        content: 'Atomic Design content',
      },
    ],
    isLoading: false,
    error: null,
  }),
}))

describe('App accordion', () => {
  it('renders heading and toggles accordion content', async () => {
    const user = userEvent.setup()
    render(<App />)

    expect(screen.getByText('FAQ Accordion')).toBeInTheDocument()
    expect(screen.queryByText('Atomic Design content')).not.toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /what is atomic design/i }))
    expect(screen.getByText('Atomic Design content')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /what is atomic design/i }))
    expect(screen.queryByText('Atomic Design content')).not.toBeInTheDocument()
  })
})
