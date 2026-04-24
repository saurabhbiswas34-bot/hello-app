import { describe, expect, it } from 'vitest'
import formatPrice from './formatPrice'

describe('formatPrice', () => {
  it('formats USD with symbol', () => {
    expect(formatPrice(12.5)).toBe('$12.50')
  })

  it('formats zero', () => {
    expect(formatPrice(0)).toBe('$0.00')
  })
})
