import { create } from 'zustand'

const useAccordionStore = create((set) => ({
  openItemId: null,
  toggleItem: (itemId) =>
    set((state) => ({
      openItemId: state.openItemId === itemId ? null : itemId,
    })),
}))

export default useAccordionStore
