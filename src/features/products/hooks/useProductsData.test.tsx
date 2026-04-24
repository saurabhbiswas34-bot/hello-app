import { renderHook, waitFor } from '@testing-library/react'
import { SWRConfig } from 'swr'
import { afterEach, describe, expect, it, vi } from 'vitest'
import type { Product } from '../../../types/product'
import useProductsData from './useProductsData'

const swrWrapper = ({ children }: { children: React.ReactNode }) => (
  <SWRConfig value={{ provider: () => new Map(), dedupingInterval: 0 }}>
    {children}
  </SWRConfig>
)

describe('useProductsData', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('fetches products on success', async () => {
    const product: Product = {
      id: 9,
      title: 'Item',
      description: 'Desc',
      category: 'cat',
      price: 2,
      rating: 3.3,
      thumbnail: 'https://example.com/i.jpg',
    }
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => ({ products: [product] }),
    } as Response)

    const { result } = renderHook(() => useProductsData(), {
      wrapper: swrWrapper,
    })

    await waitFor(() => expect(result.current.isLoading).toBe(false))
    expect(result.current.products).toEqual([product])
    expect(result.current.error).toBeUndefined()
  })

  it('surfaces fetch errors', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: false,
      status: 500,
    } as Response)

    const { result } = renderHook(() => useProductsData(), {
      wrapper: swrWrapper,
    })

    await waitFor(() => expect(result.current.error).toBeDefined())
    expect(result.current.products).toEqual([])
  })
})
