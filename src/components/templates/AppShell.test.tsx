import { render, screen } from '@testing-library/react'
import AppShell from './AppShell'

const hashRouteMock = vi.fn()

vi.mock('../../hooks/useHashRoute', () => ({
  default: () => hashRouteMock(),
}))

vi.mock('./AccordionTemplate', () => ({
  default: () => <h1>Accordion View</h1>,
}))

vi.mock('./DocsExplorerTemplate', () => ({
  default: () => <h1>Docs View</h1>,
}))

describe('AppShell', () => {
  it('renders docs view when route is docs', () => {
    hashRouteMock.mockReturnValue('docs')
    render(<AppShell />)
    expect(
      screen.getByRole('heading', { name: 'Docs View' })
    ).toBeInTheDocument()
  })

  it('renders accordion view when route is accordion', () => {
    hashRouteMock.mockReturnValue('accordion')
    render(<AppShell />)
    expect(
      screen.getByRole('heading', { name: 'Accordion View' })
    ).toBeInTheDocument()
  })
})
