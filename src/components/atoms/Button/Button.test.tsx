import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import Button from './Button'

describe('Button', () => {
  it('renders an anchor when url is provided', () => {
    render(<Button url="https://example.com/">Go</Button>)
    const link = screen.getByRole('link', { name: 'Go' })
    expect(link.tagName).toBe('A')
    expect(link).toHaveAttribute('href', 'https://example.com/')
  })

  it('renders a native button with type="button" when url is omitted', () => {
    render(<Button>Press</Button>)
    const btn = screen.getByRole('button', { name: 'Press' })
    expect(btn.tagName).toBe('BUTTON')
    expect(btn).toHaveAttribute('type', 'button')
  })

  it('applies default variant class by default', () => {
    render(<Button>Press</Button>)
    expect(screen.getByRole('button', { name: 'Press' })).toHaveClass(
      'button',
      'button--default'
    )
  })

  it('applies blue and red variant classes', () => {
    const { rerender } = render(<Button variant="blue">X</Button>)
    expect(screen.getByRole('button', { name: 'X' })).toHaveClass(
      'button--blue'
    )

    rerender(<Button variant="red">X</Button>)
    expect(screen.getByRole('button', { name: 'X' })).toHaveClass('button--red')
  })

  it('applies horizontal spacing and top margin modifier classes', () => {
    render(
      <Button horizontalSpacing="md" topMargin="lg">
        X
      </Button>
    )
    const btn = screen.getByRole('button', { name: 'X' })
    expect(btn).toHaveClass('button--h-spacing-md', 'button--t-margin-lg')
  })

  it('adds target="_blank" and merges safe rel tokens when newTab is true', () => {
    render(
      <Button url="https://example.com/" newTab>
        Go
      </Button>
    )
    const link = screen.getByRole('link', { name: 'Go' })
    expect(link).toHaveAttribute('target', '_blank')
    const rel = link.getAttribute('rel') ?? ''
    expect(rel.split(/\s+/)).toEqual(
      expect.arrayContaining(['noopener', 'noreferrer'])
    )
  })

  it('preserves caller-provided rel tokens when merging', () => {
    render(
      <Button url="https://example.com/" newTab rel="author noopener">
        Go
      </Button>
    )
    const rel =
      screen.getByRole('link', { name: 'Go' }).getAttribute('rel') ?? ''
    const tokens = rel.split(/\s+/)
    expect(tokens).toEqual(
      expect.arrayContaining(['author', 'noopener', 'noreferrer'])
    )
    // ensure no duplicate tokens
    expect(new Set(tokens).size).toBe(tokens.length)
  })

  it('renders new-tab icon when newTab is true, same-tab icon otherwise', () => {
    const { container, rerender } = render(
      <Button url="https://example.com/">Go</Button>
    )
    expect(container.querySelector('[data-icon="same-tab"]')).not.toBeNull()
    expect(container.querySelector('[data-icon="new-tab"]')).toBeNull()

    rerender(
      <Button url="https://example.com/" newTab>
        Go
      </Button>
    )
    expect(container.querySelector('[data-icon="new-tab"]')).not.toBeNull()
    expect(container.querySelector('[data-icon="same-tab"]')).toBeNull()
  })

  it('marks the decorative icon as aria-hidden and non-focusable', () => {
    const { container } = render(<Button url="https://example.com/">Go</Button>)
    const icon = container.querySelector('svg.button__icon')
    expect(icon).not.toBeNull()
    expect(icon).toHaveAttribute('aria-hidden', 'true')
    expect(icon).toHaveAttribute('focusable', 'false')
  })

  it('fires onClick in button mode', () => {
    const handler = vi.fn()
    render(<Button onClick={handler}>Press</Button>)
    fireEvent.click(screen.getByRole('button', { name: 'Press' }))
    expect(handler).toHaveBeenCalledTimes(1)
  })

  it('fires onClick in link mode', () => {
    const handler = vi.fn()
    render(
      <Button url="https://example.com/" onClick={handler}>
        Go
      </Button>
    )
    fireEvent.click(screen.getByRole('link', { name: 'Go' }))
    expect(handler).toHaveBeenCalledTimes(1)
  })

  it('does not fire onClick when button is disabled', () => {
    const handler = vi.fn()
    render(
      <Button disabled onClick={handler}>
        Press
      </Button>
    )
    const btn = screen.getByRole('button', { name: 'Press' })
    expect(btn).toBeDisabled()
    fireEvent.click(btn)
    expect(handler).not.toHaveBeenCalled()
  })

  it('does not generate ids, so rendering multiple buttons produces no duplicate ids', () => {
    const { container } = render(
      <>
        <Button>One</Button>
        <Button>Two</Button>
        <Button url="https://example.com/">Three</Button>
      </>
    )
    const ids = Array.from(container.querySelectorAll('[id]')).map(
      (el) => (el as HTMLElement).id
    )
    expect(ids).toEqual([])
  })

  it('passes through a caller-provided id without duplicating it', () => {
    const { container } = render(<Button id="cta-primary">Press</Button>)
    expect(screen.getByRole('button', { name: 'Press' })).toHaveAttribute(
      'id',
      'cta-primary'
    )
    expect(container.querySelectorAll('#cta-primary').length).toBe(1)
  })
})
