import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TreeNode from './TreeNode'
import type { DocTreeNode } from '../../types/docs'

const selectDoc = vi.fn()
const toggleFolder = vi.fn()
const docsStoreMock = vi.fn()

vi.mock('../../store/useDocsStore', () => ({
  default: (selector: (state: any) => unknown) => selector(docsStoreMock()),
}))

describe('TreeNode', () => {
  beforeEach(() => {
    selectDoc.mockReset()
    toggleFolder.mockReset()
  })

  it('renders folder node and toggles expansion', async () => {
    const user = userEvent.setup()
    const folderNode: DocTreeNode = {
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
    }

    docsStoreMock.mockReturnValue({
      selectedPath: null,
      expanded: new Map([['docs/architecture', true]]),
      selectDoc,
      toggleFolder,
    })

    render(<TreeNode node={folderNode} />)

    await user.click(
      screen.getByRole('button', { name: 'architecture folder' })
    )
    expect(toggleFolder).toHaveBeenCalledWith('docs/architecture')
    expect(
      screen.getByRole('button', { name: 'ARCHITECTURE.md' })
    ).toBeInTheDocument()
  })

  it('renders file node and selects it', async () => {
    const user = userEvent.setup()
    const fileNode: DocTreeNode = {
      name: 'QUALITY_GATES.md',
      type: 'file',
      path: 'docs/quality/QUALITY_GATES.md',
    }

    docsStoreMock.mockReturnValue({
      selectedPath: 'docs/quality/QUALITY_GATES.md',
      expanded: new Map(),
      selectDoc,
      toggleFolder,
    })

    render(<TreeNode node={fileNode} level={1} />)

    const button = screen.getByRole('button', { name: 'QUALITY_GATES.md' })
    expect(button).toHaveAttribute('aria-current', 'page')
    await user.click(button)
    expect(selectDoc).toHaveBeenCalledWith('docs/quality/QUALITY_GATES.md')
  })
})
