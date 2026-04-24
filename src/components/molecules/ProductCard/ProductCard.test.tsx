import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import type { Product } from '../../../types/product'
import ProductCard from './ProductCard'

const sampleProduct: Product = {
  id: 1,
  title: 'Test item',
  description: 'Short description',
  category: 'misc',
  price: 10,
  rating: 4.2,
  thumbnail: 'https://example.com/t.jpg',
}

describe('ProductCard', () => {
  it('renders product fields', () => {
    render(<ProductCard product={sampleProduct} priceLabel="$10.00" />)
    expect(
      screen.getByRole('heading', { name: 'Test item' })
    ).toBeInTheDocument()
    expect(screen.getByText('misc')).toBeInTheDocument()
    expect(screen.getByText('Short description')).toBeInTheDocument()
    expect(screen.getByText('$10.00')).toBeInTheDocument()
    expect(screen.getByLabelText('Rating 4.2')).toHaveTextContent('4.2')
    expect(screen.getByRole('img', { name: 'Test item' })).toHaveAttribute(
      'src',
      'https://example.com/t.jpg'
    )
  })
})
