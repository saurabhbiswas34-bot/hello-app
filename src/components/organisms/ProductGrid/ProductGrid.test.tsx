import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import type { Product } from '../../../types/product'
import ProductGrid from './ProductGrid'

const items: Product[] = [
  {
    id: 1,
    title: 'A',
    description: 'd',
    category: 'c',
    price: 1,
    rating: 1,
    thumbnail: 'https://example.com/a.jpg',
  },
]

describe('ProductGrid', () => {
  it('renders a card per product with accessible list name', () => {
    render(
      <ProductGrid products={items} formatPrice={(n) => `$${n.toFixed(2)}`} />
    )
    expect(
      screen.getByRole('region', { name: /product list/i })
    ).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'A' })).toBeInTheDocument()
  })
})
