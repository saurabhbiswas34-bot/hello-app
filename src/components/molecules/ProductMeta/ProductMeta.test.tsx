import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import ProductMeta from './ProductMeta'

describe('ProductMeta', () => {
  it('shows price and accessible rating', () => {
    render(<ProductMeta priceLabel="$9.99" rating={4.567} />)
    expect(screen.getByText('$9.99')).toBeInTheDocument()
    expect(screen.getByLabelText('Rating 4.6')).toHaveTextContent('4.6')
  })
})
