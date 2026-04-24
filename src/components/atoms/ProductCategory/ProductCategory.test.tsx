import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import ProductCategory from './ProductCategory'

describe('ProductCategory', () => {
  it('renders category text', () => {
    render(<ProductCategory category="electronics" />)
    expect(screen.getByText('electronics')).toBeInTheDocument()
  })
})
