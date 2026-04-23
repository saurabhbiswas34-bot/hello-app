import { createContext } from 'react'
import type { Dispatch } from 'react'
import type { AccordionAction, AccordionState } from './accordionReducer'

interface AccordionContextValue {
  state: AccordionState
  dispatch: Dispatch<AccordionAction>
}

const AccordionContext = createContext<AccordionContextValue | null>(null)

export { AccordionContext }
