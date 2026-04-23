import { render, screen } from '@testing-library/react'
import SectionTitle from './SectionTitle'

describe('SectionTitle', () => {
  it('renders children inside h1', () => {
    render(<SectionTitle>Heading</SectionTitle>)
    expect(
      screen.getByRole('heading', { level: 1, name: 'Heading' })
    ).toBeInTheDocument()
  })
})
