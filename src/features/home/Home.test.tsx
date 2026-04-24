import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import Home from './Home'

describe('Home', () => {
  it('renders hero and storybook link', () => {
    render(<Home />)
    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /react quality bootstrap starter/i,
      })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: /storybook docs/i })
    ).toHaveAttribute('href', 'https://storybook.js.org/')
  })
})
