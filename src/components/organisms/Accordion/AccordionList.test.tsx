import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import type { AccordionEntry } from '../../../types/accordion'
import AccordionList from './AccordionList'

const entries: AccordionEntry[] = [
  { id: 'a', title: 'First', content: 'Body one' },
  { id: 'b', title: 'Second', content: 'Body two' },
]

describe('AccordionList', () => {
  it('opens a panel when its trigger is clicked', async () => {
    const user = userEvent.setup()
    render(<AccordionList items={entries} />)

    await user.click(screen.getByRole('button', { name: /first/i }))
    expect(screen.getByText('Body one')).toBeVisible()

    await user.click(screen.getByRole('button', { name: /second/i }))
    expect(screen.getByText('Body two')).toBeVisible()
  })
})
