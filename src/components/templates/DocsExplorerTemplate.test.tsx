import { render, screen } from '@testing-library/react'
import DocsExplorerTemplate from './DocsExplorerTemplate'

vi.mock('../../data/docsTree', () => ({
  docsTree: {
    name: 'docs',
    type: 'folder',
    path: 'docs',
    children: [
      {
        name: 'architecture',
        type: 'folder',
        path: 'docs/architecture',
        children: [
          {
            name: 'ARCHITECTURE.md',
            type: 'file',
            path: 'docs/architecture/ARCHITECTURE.md',
          },
        ],
      },
    ],
  },
  docsContentByPath: new Map([
    ['docs/architecture/ARCHITECTURE.md', '# Architecture\\n\\nBody'],
  ]),
}))

const useDocsStoreMock = vi.fn()

vi.mock('../../store/useDocsStore', () => ({
  default: (selector: (state: any) => unknown) => selector(useDocsStoreMock()),
}))

describe('DocsExplorerTemplate', () => {
  it('renders docs sidebar and content panel', () => {
    useDocsStoreMock.mockReturnValue({
      selectedPath: 'docs/architecture/ARCHITECTURE.md',
      expanded: new Map([['docs/architecture', true]]),
      selectDoc: vi.fn(),
      toggleFolder: vi.fn(),
    })

    render(<DocsExplorerTemplate />)
    expect(screen.getByText('Docs')).toBeInTheDocument()
    expect(
      screen.getByRole('navigation', { name: /documentation tree/i })
    ).toBeInTheDocument()
  })
})
