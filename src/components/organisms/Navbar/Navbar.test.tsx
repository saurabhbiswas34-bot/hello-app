import { render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import Navbar from './Navbar'

describe('Navbar', () => {
  it('renders primary links', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    )

    const nav = screen.getByRole('navigation', { name: /primary/i })
    expect(within(nav).getByRole('link', { name: /home/i })).toBeInTheDocument()
    expect(
      within(nav).getByRole('link', { name: /users/i })
    ).toBeInTheDocument()
    expect(
      within(nav).getByRole('link', { name: /products/i })
    ).toBeInTheDocument()
  })
})
