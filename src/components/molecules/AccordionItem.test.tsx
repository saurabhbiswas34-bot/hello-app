import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AccordionItem from './AccordionItem'

const useAccordionStoreMock = vi.fn()

vi.mock('../../store/useAccordionStore', () => ({
  default: (selector: (state: any) => unknown) =>
    selector(useAccordionStoreMock()),
}))

describe('AccordionItem', () => {
  it('shows closed state and toggles open', async () => {
    const user = userEvent.setup()
    const toggleItem = vi.fn()

    useAccordionStoreMock.mockReturnValue({
      openItemId: null,
      toggleItem,
    })

    render(
      <AccordionItem
        item={{
          id: 'item-1',
          title: 'What is Atomic Design?',
          content: 'Atomic Design content',
        }}
      />
    )

    expect(screen.queryByText('Atomic Design content')).not.toBeInTheDocument()
    await user.click(
      screen.getByRole('button', { name: /what is atomic design/i })
    )
    expect(toggleItem).toHaveBeenCalledWith('item-1')
  })

  it('shows content when item is open', () => {
    const toggleItem = vi.fn()

    useAccordionStoreMock.mockReturnValue({
      openItemId: 'item-1',
      toggleItem,
    })

    render(
      <AccordionItem
        item={{
          id: 'item-1',
          title: 'What is Atomic Design?',
          content: 'Atomic Design content',
        }}
      />
    )

    expect(screen.getByText('Atomic Design content')).toBeInTheDocument()
  })
})
