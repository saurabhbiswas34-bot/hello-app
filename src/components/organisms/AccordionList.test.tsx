import { render, screen } from '@testing-library/react'
import AccordionList from './AccordionList'

describe('AccordionList', () => {
  it('renders all accordion items', () => {
    render(
      <AccordionList
        items={[
          { id: 'item-1', title: 'One', content: 'One content' },
          { id: 'item-2', title: 'Two', content: 'Two content' },
        ]}
      />
    )

    expect(screen.getByRole('button', { name: 'One' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Two' })).toBeInTheDocument()
  })
})
