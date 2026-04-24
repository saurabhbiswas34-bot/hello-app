import { act, renderHook } from '@testing-library/react'
import { SWRConfig } from 'swr'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import useAccordionData from './useAccordionData'

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <SWRConfig value={{ provider: () => new Map(), dedupingInterval: 0 }}>
    {children}
  </SWRConfig>
)

describe('useAccordionData', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('loads mock FAQ entries after delay', async () => {
    const { result } = renderHook(() => useAccordionData(), { wrapper })

    expect(result.current.isLoading).toBe(true)

    await act(async () => {
      await vi.advanceTimersByTimeAsync(350)
    })
    await act(async () => {
      await Promise.resolve()
    })

    expect(result.current.items).toHaveLength(4)
    expect(result.current.isLoading).toBe(false)
  })
})
