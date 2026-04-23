import { renderHook } from '@testing-library/react'
import useHashRoute from './useHashRoute'

describe('useHashRoute', () => {
  it('defaults to docs for empty hash', () => {
    window.location.hash = ''
    const { result } = renderHook(() => useHashRoute())
    expect(result.current).toBe('docs')
  })

  it('uses known route from hash', () => {
    window.location.hash = '#/accordion'
    const { result } = renderHook(() => useHashRoute())
    expect(result.current).toBe('accordion')
  })

  it('falls back to docs for unknown hash', () => {
    window.location.hash = '#/unknown'
    const { result } = renderHook(() => useHashRoute())
    expect(result.current).toBe('docs')
  })
})
