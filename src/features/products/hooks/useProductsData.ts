import useSWR from 'swr'
import type { Product } from '../types/product'
import { API_ENDPOINTS } from '../../../config/api'

interface ProductsResponse {
  products: Product[]
}

interface ProductsDataResult {
  products: Product[]
  isLoading: boolean
  error: unknown
}

const fetchProducts = async (): Promise<Product[]> => {
  const response = await fetch(API_ENDPOINTS.products)
  if (!response.ok) {
    throw new Error('Failed to fetch products')
  }

  const payload = (await response.json()) as ProductsResponse
  return payload.products ?? []
}

const useProductsData = (): ProductsDataResult => {
  const { data, error, isLoading } = useSWR<Product[]>(
    API_ENDPOINTS.products,
    fetchProducts
  )

  return {
    products: data ?? [],
    isLoading,
    error,
  }
}

export default useProductsData
