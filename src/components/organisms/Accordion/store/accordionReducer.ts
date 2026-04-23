export interface AccordionState {
  openItemId: string | null
}

export type AccordionAction = { type: 'toggle'; itemId: string }

export const initialAccordionState: AccordionState = {
  openItemId: null,
}

export function accordionReducer(
  state: AccordionState,
  action: AccordionAction
): AccordionState {
  if (action.type === 'toggle') {
    return {
      openItemId: state.openItemId === action.itemId ? null : action.itemId,
    }
  }

  return state
}
