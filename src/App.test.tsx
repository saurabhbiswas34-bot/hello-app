import { act, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

vi.mock('./data/docsTree', () => {
  const tree = {
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
      {
        name: 'quality',
        type: 'folder',
        path: 'docs/quality',
        children: [
          {
            name: 'QUALITY_GATES.md',
            type: 'file',
            path: 'docs/quality/QUALITY_GATES.md',
          },
        ],
      },
    ],
  }

  return {
    docsTree: tree,
    docsContentByPath: new Map([
      [
        'docs/architecture/ARCHITECTURE.md',
        '# Architecture\n\nArchitecture overview body.',
      ],
      [
        'docs/quality/QUALITY_GATES.md',
        '# Quality Gates\n\nQuality gates body.',
      ],
    ]),
    getInitialExpanded: () =>
      new Map([
        ['docs', true],
        ['docs/architecture', true],
        ['docs/quality', true],
      ]),
    getFirstDocPath: () => 'docs/architecture/ARCHITECTURE.md',
  }
})

vi.mock('./hooks/useAccordionData', () => ({
  default: () => ({
    items: [
      {
        id: 'item-1',
        title: 'What is Atomic Design?',
        content: 'Atomic Design content',
      },
    ],
    isLoading: false,
    error: null,
  }),
}))

const resetHash = (): void => {
  window.location.hash = ''
}

describe('App shell navigation', () => {
  beforeEach(() => {
    resetHash()
  })

  it('renders primary navigation with both features', () => {
    render(<App />)

    const primaryNav = screen.getByRole('navigation', { name: /primary/i })
    expect(
      within(primaryNav).getByRole('link', { name: /docs explorer/i })
    ).toBeInTheDocument()
    expect(
      within(primaryNav).getByRole('link', { name: /faq accordion/i })
    ).toBeInTheDocument()
  })

  it('defaults to the Docs Explorer view', () => {
    render(<App />)

    expect(
      screen.getByRole('navigation', { name: /documentation tree/i })
    ).toBeInTheDocument()
    expect(
      screen.queryByRole('heading', { level: 1, name: 'FAQ Accordion' })
    ).not.toBeInTheDocument()
  })

  it('switches to the Accordion view when hash changes', () => {
    render(<App />)

    act(() => {
      window.location.hash = '#/accordion'
      window.dispatchEvent(new HashChangeEvent('hashchange'))
    })

    expect(
      screen.getByRole('heading', { level: 1, name: 'FAQ Accordion' })
    ).toBeInTheDocument()
    expect(
      screen.queryByRole('navigation', { name: /documentation tree/i })
    ).not.toBeInTheDocument()
  })
})

describe('Docs Explorer', () => {
  beforeEach(() => {
    resetHash()
  })

  it('renders the tree sidebar with folders and files', () => {
    render(<App />)

    const nav = screen.getByRole('navigation', { name: /documentation tree/i })
    expect(
      within(nav).getByRole('button', { name: 'architecture folder' })
    ).toBeInTheDocument()
    expect(
      within(nav).getByRole('button', { name: 'ARCHITECTURE.md' })
    ).toBeInTheDocument()
    expect(
      within(nav).getByRole('button', { name: 'QUALITY_GATES.md' })
    ).toBeInTheDocument()
  })

  it('switches content when a different file is selected in the tree', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('button', { name: 'QUALITY_GATES.md' }))

    expect(
      screen.getByRole('heading', { level: 1, name: /quality gates/i })
    ).toBeInTheDocument()
    expect(screen.getByText(/quality gates body/i)).toBeInTheDocument()
  })

  it('collapses a folder when its toggle is clicked', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(
      screen.getByRole('button', { name: 'architecture folder' })
    )

    expect(
      screen.queryByRole('button', { name: 'ARCHITECTURE.md' })
    ).not.toBeInTheDocument()
  })
})

describe('FAQ Accordion', () => {
  beforeEach(() => {
    window.location.hash = '#/accordion'
  })

  afterEach(() => {
    resetHash()
  })

  it('renders heading and toggles accordion content', async () => {
    const user = userEvent.setup()
    render(<App />)

    expect(
      screen.getByRole('heading', { level: 1, name: 'FAQ Accordion' })
    ).toBeInTheDocument()
    expect(screen.queryByText('Atomic Design content')).not.toBeInTheDocument()

    await user.click(
      screen.getByRole('button', { name: /what is atomic design/i })
    )
    expect(screen.getByText('Atomic Design content')).toBeInTheDocument()

    await user.click(
      screen.getByRole('button', { name: /what is atomic design/i })
    )
    expect(screen.queryByText('Atomic Design content')).not.toBeInTheDocument()
  })
})
