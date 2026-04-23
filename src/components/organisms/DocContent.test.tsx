import { render, screen } from '@testing-library/react'
import DocContent from './DocContent'

const docsStoreMock = vi.fn()

vi.mock('../../store/useDocsStore', () => ({
  default: (selector: (state: any) => unknown) => selector(docsStoreMock()),
}))

describe('DocContent', () => {
  it('shows empty state when nothing selected', () => {
    docsStoreMock.mockReturnValue({ selectedPath: null })
    render(<DocContent docsByPath={new Map()} />)
    expect(screen.getByText(/select a document/i)).toBeInTheDocument()
  })

  it('shows missing state when selected file has no content', () => {
    docsStoreMock.mockReturnValue({ selectedPath: 'docs/missing.md' })
    render(<DocContent docsByPath={new Map()} />)
    expect(screen.getByText(/content not found/i)).toBeInTheDocument()
  })

  it('renders markdown when content exists', () => {
    docsStoreMock.mockReturnValue({
      selectedPath: 'docs/architecture/ARCHITECTURE.md',
    })
    const docsByPath = new Map([
      [
        'docs/architecture/ARCHITECTURE.md',
        '# Architecture\n\nArchitecture body',
      ],
    ])

    render(<DocContent docsByPath={docsByPath} />)

    expect(
      screen.getByRole('heading', { level: 1, name: 'Architecture' })
    ).toBeInTheDocument()
    expect(screen.getByText('Architecture body')).toBeInTheDocument()
  })
})
