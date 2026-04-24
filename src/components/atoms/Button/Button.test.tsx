import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Button from './Button'

describe('Button', () => {
  it('renders a native button when url is omitted', () => {
    render(<Button>Save</Button>)
    expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument()
  })

  it('renders an anchor when url is provided', () => {
    render(<Button url="https://example.com/path">Docs</Button>)
    const link = screen.getByRole('link', { name: /docs/i })
    expect(link).toHaveAttribute('href', 'https://example.com/path')
  })

  it('trims url and still renders a link', () => {
    render(<Button url="  https://example.com  ">Go</Button>)
    expect(screen.getByRole('link')).toHaveAttribute(
      'href',
      'https://example.com'
    )
  })

  it('treats blank url as a button', () => {
    render(<Button url="   ">Only spaces</Button>)
    expect(
      screen.getByRole('button', { name: 'Only spaces' })
    ).toBeInTheDocument()
  })

  it('uses type="button" for the native button', () => {
    render(<Button>Act</Button>)
    expect(screen.getByRole('button')).toHaveAttribute('type', 'button')
  })

  it('applies variant and spacing modifiers', () => {
    const { container } = render(
      <Button variant="blue" horizontalSpacing="md" topMargin="lg">
        Styled
      </Button>
    )
    const el = container.querySelector('.button')
    expect(el).toHaveClass(
      'button',
      'button--blue',
      'button--h-spacing-md',
      'button--t-margin-lg'
    )
  })

  it('opens new tab with noopener noreferrer when newTab is true', () => {
    render(
      <Button url="https://example.com" newTab>
        External
      </Button>
    )
    const link = screen.getByRole('link', { name: /external/i })
    expect(link).toHaveAttribute('target', '_blank')
    expect(link.getAttribute('rel')).toMatch(/noopener/)
    expect(link.getAttribute('rel')).toMatch(/noreferrer/)
  })

  it('merges rel tokens without dropping noopener noreferrer', () => {
    render(
      <Button url="https://example.com" newTab rel="nofollow">
        Tab
      </Button>
    )
    const rel = screen.getByRole('link').getAttribute('rel') ?? ''
    expect(rel.split(/\s+/)).toEqual(
      expect.arrayContaining(['nofollow', 'noopener', 'noreferrer'])
    )
  })

  it('shows different link icons for same-tab vs new-tab', () => {
    const { rerender } = render(<Button url="https://a.test">Same</Button>)
    expect(
      screen.getByRole('link').querySelector('[data-icon="same-tab"]')
    ).toBeInTheDocument()

    rerender(
      <Button url="https://a.test" newTab>
        New
      </Button>
    )
    const icon = screen.getByRole('link').querySelector('.button__icon')
    expect(icon).toHaveAttribute('data-icon', 'new-tab')
    expect(icon).toHaveAttribute('aria-hidden', 'true')
  })

  it('does not render a trailing icon for button mode', () => {
    render(<Button>No link icon</Button>)
    expect(document.querySelector('.button__icon')).toBeNull()
  })

  it('supports disabled on native button', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(
      <Button disabled onClick={onClick}>
        Off
      </Button>
    )
    const btn = screen.getByRole('button')
    expect(btn).toBeDisabled()
    await user.click(btn)
    expect(onClick).not.toHaveBeenCalled()
  })

  it('forwards optional id without duplicating built-in ids', () => {
    render(<Button id="my-cta">Go</Button>)
    expect(screen.getByRole('button')).toHaveAttribute('id', 'my-cta')
  })
})
