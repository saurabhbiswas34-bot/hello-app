import { useContext } from 'react'
import { AccordionContext } from './accordionContext'

function useAccordionStore() {
  const context = useContext(AccordionContext)
  if (!context) {
    throw new Error(
      'useAccordionStore must be used inside AccordionStoreProvider'
    )
  }

  return context
}

export { useAccordionStore }
