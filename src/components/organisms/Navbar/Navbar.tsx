import { NavLink } from 'react-router-dom'
import './Navbar.css'

interface NavItem {
  to: string
  label: string
}

const NAV_ITEMS: NavItem[] = [
  { to: '/', label: 'Home' },
  { to: '/users', label: 'Users' },
  { to: '/products', label: 'Products' },
]

function Navbar() {
  return (
    <nav className="app-shell__nav" aria-label="Primary">
      {NAV_ITEMS.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.to === '/'}
          className={({ isActive }) =>
            `app-shell__nav-link${isActive ? ' app-shell__nav-link--active' : ''}`
          }
        >
          {item.label}
        </NavLink>
      ))}
    </nav>
  )
}

export default Navbar
