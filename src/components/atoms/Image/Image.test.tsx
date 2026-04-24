import { render, screen } from '@testing-library/react'
import Image from './Image'

describe('Image', () => {
  it('renders with src and alt', () => {
    render(<Image src="/p.jpg" alt="Hero shot" />)
    const img = screen.getByRole('img', { name: 'Hero shot' })
    expect(img).toHaveAttribute('src', '/p.jpg')
  })

  it('defaults to lazy loading', () => {
    render(<Image src="/a.png" alt="A" />)
    expect(screen.getByRole('img')).toHaveAttribute('loading', 'lazy')
  })

  it('applies variant class names', () => {
    const { container } = render(<Image src="/x.jpg" alt="X" variant="cover" />)
    const img = container.querySelector('img')
    expect(img).toHaveClass('image', 'image--cover')
  })

  it('merges optional className', () => {
    const { container } = render(
      <Image src="/y.jpg" alt="Y" className="media-card__thumb" />
    )
    expect(container.querySelector('img')).toHaveClass(
      'image',
      'media-card__thumb'
    )
  })
})
