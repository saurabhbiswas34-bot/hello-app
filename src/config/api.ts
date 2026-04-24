const DEFAULT_API_BASE_URL = 'https://dummyjson.com'

const normalizeBaseUrl = (value: string): string => value.replace(/\/+$/, '')

const getApiBaseUrl = (): string => {
  const configuredBaseUrl = import.meta.env.VITE_API_BASE_URL?.trim()
  if (!configuredBaseUrl) {
    return DEFAULT_API_BASE_URL
  }

  return normalizeBaseUrl(configuredBaseUrl)
}

const API_BASE_URL = getApiBaseUrl()

export const API_ENDPOINTS = {
  users: `${API_BASE_URL}/users`,
  products: `${API_BASE_URL}/products`,
}
