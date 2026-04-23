import { renderHook } from '@testing-library/react'
import useAccordionData from './useAccordionData'

const useSWRMock = vi.fn()

vi.mock('swr', () => ({
  default: (...args: unknown[]) => useSWRMock(...args),
}))

describe('useAccordionData', () => {
  it('returns empty items when data is undefined', () => {
    useSWRMock.mockReturnValue({
      data: undefined,
      error: null,
      isLoading: true,
    })
    const { result } = renderHook(() => useAccordionData())
    expect(result.current.items).toEqual([])
    expect(result.current.isLoading).toBe(true)
  })

  it('returns loaded data when available', () => {
    useSWRMock.mockReturnValue({
      data: [{ id: 'item-1', title: 't', content: 'c' }],
      error: null,
      isLoading: false,
    })
    const { result } = renderHook(() => useAccordionData())
    expect(result.current.items).toHaveLength(1)
    expect(result.current.error).toBeNull()
  })
})
