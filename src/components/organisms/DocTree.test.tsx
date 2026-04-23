import { render, screen } from '@testing-library/react'
import DocTree from './DocTree'

describe('DocTree', () => {
  it('renders folder and file nodes from tree root', () => {
    const tree = {
      name: 'docs',
      type: 'folder' as const,
      path: 'docs',
      children: [
        {
          name: 'architecture',
          type: 'folder' as const,
          path: 'docs/architecture',
          children: [
            {
              name: 'ARCHITECTURE.md',
              type: 'file' as const,
              path: 'docs/architecture/ARCHITECTURE.md',
            },
          ],
        },
      ],
    }

    render(<DocTree tree={tree} />)
    expect(
      screen.getByRole('navigation', { name: /documentation tree/i })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'architecture folder' })
    ).toBeInTheDocument()
  })
})
