import useAccordionStore from './useAccordionStore'

describe('useAccordionStore', () => {
  beforeEach(() => {
    useAccordionStore.setState({ openItemId: null })
  })

  it('opens and closes the same item', () => {
    useAccordionStore.getState().toggleItem('item-1')
    expect(useAccordionStore.getState().openItemId).toBe('item-1')

    useAccordionStore.getState().toggleItem('item-1')
    expect(useAccordionStore.getState().openItemId).toBeNull()
  })

  it('switches to another item', () => {
    useAccordionStore.getState().toggleItem('item-1')
    useAccordionStore.getState().toggleItem('item-2')
    expect(useAccordionStore.getState().openItemId).toBe('item-2')
  })
})
