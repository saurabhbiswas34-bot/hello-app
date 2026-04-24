import type { MouseEventHandler, ReactNode, Ref } from 'react'
import './Button.css'

export type ButtonVariant = 'default' | 'blue' | 'red'

export type ButtonSpacing = 'none' | 'sm' | 'md' | 'lg'

export interface ButtonProps {
  ref?: Ref<HTMLButtonElement | HTMLAnchorElement>
  children: ReactNode
  /** When provided, the component renders an <a>; otherwise a <button type="button">. */
  url?: string
  /** Only meaningful with `url`. Adds target="_blank" and merges rel="noopener noreferrer". */
  newTab?: boolean
  variant?: ButtonVariant
  horizontalSpacing?: ButtonSpacing
  topMargin?: ButtonSpacing
  className?: string
  id?: string
  disabled?: boolean
  onClick?: MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>
  rel?: string
  target?: string
}

function mergeRel(
  existing: string | undefined,
  required: readonly string[]
): string {
  const parts = new Set<string>()
  for (const token of (existing ?? '').split(/\s+/).filter(Boolean)) {
    parts.add(token)
  }
  for (const token of required) {
    parts.add(token)
  }
  return [...parts].join(' ')
}

function SameTabIcon() {
  return (
    <svg
      className="button__icon"
      data-icon="same-tab"
      width={16}
      height={16}
      viewBox="0 0 16 16"
      aria-hidden="true"
      focusable="false"
    >
      <path
        fill="currentColor"
        d="M6 3.5h6.5V10h-1V5.207L4.854 12.354l-.708-.708L10.793 4.5H6v-1Z"
      />
    </svg>
  )
}

function NewTabIcon() {
  return (
    <svg
      className="button__icon"
      data-icon="new-tab"
      width={16}
      height={16}
      viewBox="0 0 16 16"
      aria-hidden="true"
      focusable="false"
    >
      <path
        fill="currentColor"
        d="M4.5 3A1.5 1.5 0 0 0 3 4.5v7A1.5 1.5 0 0 0 4.5 13h7a1.5 1.5 0 0 0 1.5-1.5V9h-1v2.5a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5v-7a.5.5 0 0 1 .5-.5H7v-1H4.5Zm4.854-.354 3.5 3.5v-2a.5.5 0 0 1 1 0V8.5a.5.5 0 0 1-.5.5H8.5a.5.5 0 0 1 0-1h2L7 3.146l.354-.354Z"
      />
    </svg>
  )
}

function Button({
  ref,
  children,
  url,
  newTab = false,
  variant = 'default',
  horizontalSpacing = 'none',
  topMargin = 'none',
  className,
  id,
  disabled = false,
  onClick,
  rel,
  target,
}: ButtonProps) {
  const rootClass = [
    'button',
    `button--${variant}`,
    `button--h-spacing-${horizontalSpacing}`,
    `button--t-margin-${topMargin}`,
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const trimmedUrl = url?.trim()

  if (trimmedUrl) {
    const resolvedRel = newTab ? mergeRel(rel, ['noopener', 'noreferrer']) : rel
    const resolvedTarget = newTab ? '_blank' : target

    return (
      <a
        ref={ref as Ref<HTMLAnchorElement> | undefined}
        className={rootClass}
        href={trimmedUrl}
        id={id}
        onClick={onClick}
        target={resolvedTarget}
        rel={resolvedRel}
      >
        <span className="button__label">{children}</span>
        {newTab ? <NewTabIcon /> : <SameTabIcon />}
      </a>
    )
  }

  return (
    <button
      ref={ref as Ref<HTMLButtonElement> | undefined}
      type="button"
      className={rootClass}
      disabled={disabled}
      id={id}
      onClick={onClick}
    >
      <span className="button__label">{children}</span>
    </button>
  )
}

export default Button
