import { create } from 'zustand'

interface AccordionStoreState {
  openItemId: string | null
  toggleItem: (itemId: string) => void
}

const useAccordionStore = create<AccordionStoreState>((set) => ({
  openItemId: null,
  toggleItem: (itemId: string) =>
    set((state) => ({
      openItemId: state.openItemId === itemId ? null : itemId,
    })),
}))

export default useAccordionStore
