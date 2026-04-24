import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import SectionTitle from './SectionTitle'

describe('SectionTitle', () => {
  it('renders heading', () => {
    render(<SectionTitle>Demo</SectionTitle>)
    expect(
      screen.getByRole('heading', { level: 1, name: 'Demo' })
    ).toBeInTheDocument()
  })
})
