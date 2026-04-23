import { create } from 'zustand'
import { getFirstDocPath, getInitialExpanded } from '../data/docsTree'

interface DocsStoreState {
  selectedPath: string | null
  expanded: Map<string, boolean>
  selectDoc: (path: string) => void
  toggleFolder: (path: string) => void
}

const useDocsStore = create<DocsStoreState>((set) => ({
  selectedPath: getFirstDocPath(),
  expanded: getInitialExpanded(),
  selectDoc: (path: string) => set({ selectedPath: path }),
  toggleFolder: (path: string) =>
    set((state) => {
      const next = new Map(state.expanded)
      next.set(path, !next.get(path))
      return { expanded: next }
    }),
}))

export default useDocsStore
