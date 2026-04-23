import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import AppShell from './AppShell'

describe('AppShell', () => {
  it('renders layout with home route content', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<AppShell />}>
            <Route index element={<h1>Home View</h1>} />
          </Route>
        </Routes>
      </MemoryRouter>
    )

    expect(
      screen.getByRole('heading', { name: 'Home View' })
    ).toBeInTheDocument()
  })

  it('renders nested route content', () => {
    render(
      <MemoryRouter initialEntries={['/accordion']}>
        <Routes>
          <Route path="/" element={<AppShell />}>
            <Route path="accordion" element={<h1>Accordion View</h1>} />
          </Route>
        </Routes>
      </MemoryRouter>
    )

    expect(
      screen.getByRole('heading', { name: 'Accordion View' })
    ).toBeInTheDocument()
  })
})
