import { useMemo, useReducer } from 'react'
import type { ReactNode } from 'react'
import { AccordionContext } from './accordionContext'
import { accordionReducer, initialAccordionState } from './accordionReducer'

function AccordionStoreProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(accordionReducer, initialAccordionState)

  const value = useMemo(
    () => ({
      state,
      dispatch,
    }),
    [state]
  )

  return (
    <AccordionContext.Provider value={value}>
      {children}
    </AccordionContext.Provider>
  )
}

export { AccordionStoreProvider }
