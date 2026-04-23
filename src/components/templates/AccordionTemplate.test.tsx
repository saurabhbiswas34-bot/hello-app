import { render, screen } from '@testing-library/react'
import AccordionTemplate from './AccordionTemplate'

const accordionDataMock = vi.fn()

vi.mock('../../hooks/useAccordionData', () => ({
  default: () => accordionDataMock(),
}))

describe('AccordionTemplate', () => {
  it('shows loading state', () => {
    accordionDataMock.mockReturnValue({
      items: [],
      isLoading: true,
      error: null,
    })
    render(<AccordionTemplate />)
    expect(screen.getByText(/loading mock data/i)).toBeInTheDocument()
  })

  it('shows error state', () => {
    accordionDataMock.mockReturnValue({
      items: [],
      isLoading: false,
      error: new Error('x'),
    })
    render(<AccordionTemplate />)
    expect(screen.getByText(/failed to load data/i)).toBeInTheDocument()
  })

  it('shows accordion list on success', () => {
    accordionDataMock.mockReturnValue({
      items: [
        {
          id: 'item-1',
          title: 'What is Atomic Design?',
          content: 'Atomic Design content',
        },
      ],
      isLoading: false,
      error: null,
    })

    render(<AccordionTemplate />)
    expect(
      screen.getByRole('button', { name: /what is atomic design/i })
    ).toBeInTheDocument()
  })
})
