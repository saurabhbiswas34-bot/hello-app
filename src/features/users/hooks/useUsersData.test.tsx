import { renderHook, waitFor } from '@testing-library/react'
import { SWRConfig } from 'swr'
import { afterEach, describe, expect, it, vi } from 'vitest'
import useUsersData from './useUsersData'

const swrWrapper = ({ children }: { children: React.ReactNode }) => (
  <SWRConfig value={{ provider: () => new Map(), dedupingInterval: 0 }}>
    {children}
  </SWRConfig>
)

const sampleUser = {
  id: 1,
  firstName: 'Ada',
  lastName: 'Lovelace',
  email: 'ada@example.com',
  phone: '555',
  image: 'https://example.com/u.jpg',
  company: { name: 'Co', title: 'Engineer' },
  address: { city: 'London', state: 'UK' },
}

describe('useUsersData', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('maps users to accordion items', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => ({ users: [sampleUser] }),
    } as Response)

    const { result } = renderHook(() => useUsersData(), { wrapper: swrWrapper })

    await waitFor(() => expect(result.current.isLoading).toBe(false))
    expect(result.current.items).toHaveLength(1)
    expect(result.current.items[0].title).toBe('Ada Lovelace')
    expect(result.current.items[0].id).toBe('user-1')
  })
})
