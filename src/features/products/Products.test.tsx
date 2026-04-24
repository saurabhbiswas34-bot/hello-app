import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import type { Product } from '../../types/product'
import Products from './Products'
import useProductsData from './hooks/useProductsData'

vi.mock('./hooks/useProductsData')

const mockedUseProductsData = vi.mocked(useProductsData)

const oneProduct: Product[] = [
  {
    id: 1,
    title: 'P1',
    description: 'D',
    category: 'c',
    price: 5,
    rating: 3,
    thumbnail: 'https://example.com/p.jpg',
  },
]

describe('Products', () => {
  beforeEach(() => {
    mockedUseProductsData.mockReset()
  })

  it('shows loading state', () => {
    mockedUseProductsData.mockReturnValue({
      products: [],
      isLoading: true,
      error: undefined,
    })
    render(<Products />)
    expect(screen.getByText('Loading products...')).toBeInTheDocument()
  })

  it('shows error state', () => {
    mockedUseProductsData.mockReturnValue({
      products: [],
      isLoading: false,
      error: new Error('boom'),
    })
    render(<Products />)
    expect(screen.getByText('Failed to load products.')).toBeInTheDocument()
  })

  it('shows empty state', () => {
    mockedUseProductsData.mockReturnValue({
      products: [],
      isLoading: false,
      error: undefined,
    })
    render(<Products />)
    expect(screen.getByText('No products to show.')).toBeInTheDocument()
  })

  it('renders grid when products exist', () => {
    mockedUseProductsData.mockReturnValue({
      products: oneProduct,
      isLoading: false,
      error: undefined,
    })
    render(<Products />)
    expect(
      screen.getByRole('region', { name: /product list/i })
    ).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'P1' })).toBeInTheDocument()
  })
})
