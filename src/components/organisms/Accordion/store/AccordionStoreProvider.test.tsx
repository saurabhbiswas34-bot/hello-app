import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { AccordionStoreProvider } from './AccordionStoreProvider'
import { useAccordionStore } from './useAccordionStore'

function ToggleProbe() {
  const { state, dispatch } = useAccordionStore()
  return (
    <div>
      <span data-testid="open-id">{state.openItemId ?? 'none'}</span>
      <button
        type="button"
        onClick={() => dispatch({ type: 'toggle', itemId: 'probe' })}
      >
        toggle
      </button>
    </div>
  )
}

describe('AccordionStoreProvider', () => {
  it('exposes reducer state to children', async () => {
    const user = userEvent.setup()
    render(
      <AccordionStoreProvider>
        <ToggleProbe />
      </AccordionStoreProvider>
    )

    expect(screen.getByTestId('open-id')).toHaveTextContent('none')
    await user.click(screen.getByRole('button', { name: /toggle/i }))
    expect(screen.getByTestId('open-id')).toHaveTextContent('probe')
  })
})
