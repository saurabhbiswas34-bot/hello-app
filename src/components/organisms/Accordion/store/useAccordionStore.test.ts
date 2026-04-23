import { accordionReducer, initialAccordionState } from './accordionReducer'

describe('accordionReducer', () => {
  it('opens and closes the same item', () => {
    const openedState = accordionReducer(initialAccordionState, {
      type: 'toggle',
      itemId: 'item-1',
    })
    expect(openedState.openItemId).toBe('item-1')

    const closedState = accordionReducer(openedState, {
      type: 'toggle',
      itemId: 'item-1',
    })
    expect(closedState.openItemId).toBeNull()
  })

  it('switches to another item', () => {
    const openedFirst = accordionReducer(initialAccordionState, {
      type: 'toggle',
      itemId: 'item-1',
    })
    const openedSecond = accordionReducer(openedFirst, {
      type: 'toggle',
      itemId: 'item-2',
    })
    expect(openedSecond.openItemId).toBe('item-2')
  })
})
