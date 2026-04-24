import { afterEach, describe, expect, it, vi } from 'vitest'

describe('api endpoints', () => {
  afterEach(() => {
    vi.unstubAllEnvs()
    vi.resetModules()
  })

  it('uses dummyjson defaults when env is empty', async () => {
    vi.stubEnv('VITE_API_BASE_URL', '')
    const { API_ENDPOINTS } = await import('./api')
    expect(API_ENDPOINTS.users).toBe('https://dummyjson.com/users')
    expect(API_ENDPOINTS.products).toBe('https://dummyjson.com/products')
  })

  it('normalizes configured base URL', async () => {
    vi.stubEnv('VITE_API_BASE_URL', ' https://api.example.com/ ')
    const { API_ENDPOINTS } = await import('./api')
    expect(API_ENDPOINTS.users).toBe('https://api.example.com/users')
    expect(API_ENDPOINTS.products).toBe('https://api.example.com/products')
  })
})
