import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { useAccordionStore } from './useAccordionStore'

function OutsideConsumer() {
  useAccordionStore()
  return null
}

describe('useAccordionStore', () => {
  it('throws when used outside AccordionStoreProvider', () => {
    expect(() => render(<OutsideConsumer />)).toThrow(/AccordionStoreProvider/i)
  })
})
