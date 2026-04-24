import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import type { AccordionEntry } from '../../types/accordion'
import Users from './Users'
import useUsersData from './hooks/useUsersData'

vi.mock('./hooks/useUsersData')

const mockedUseUsersData = vi.mocked(useUsersData)

const items: AccordionEntry[] = [
  { id: 'u-1', title: 'User One', content: 'Details' },
]

describe('Users', () => {
  beforeEach(() => {
    mockedUseUsersData.mockReset()
  })

  it('shows loading state', () => {
    mockedUseUsersData.mockReturnValue({
      items: [],
      isLoading: true,
      error: undefined,
    })
    render(<Users />)
    expect(screen.getByText('Loading users...')).toBeInTheDocument()
  })

  it('shows error state', () => {
    mockedUseUsersData.mockReturnValue({
      items: [],
      isLoading: false,
      error: new Error('fail'),
    })
    render(<Users />)
    expect(screen.getByText('Failed to load users.')).toBeInTheDocument()
  })

  it('renders accordion when data is ready', async () => {
    mockedUseUsersData.mockReturnValue({
      items,
      isLoading: false,
      error: undefined,
    })
    render(<Users />)
    expect(
      await screen.findByRole('button', { name: /user one/i })
    ).toBeInTheDocument()
  })
})
