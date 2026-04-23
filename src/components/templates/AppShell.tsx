import useHashRoute from '../../hooks/useHashRoute'
import AccordionTemplate from './AccordionTemplate'
import DocsExplorerTemplate from './DocsExplorerTemplate'

interface NavItem {
  route: string
  href: string
  label: string
}

const NAV_ITEMS: NavItem[] = [
  { route: 'docs', href: '#/docs', label: 'Docs Explorer' },
  { route: 'accordion', href: '#/accordion', label: 'FAQ Accordion' },
]

function AppShell() {
  const route = useHashRoute()

  return (
    <div className="app-shell">
      <header className="app-shell-header">
        <span className="app-shell-title">hello-app</span>
        <nav className="app-shell-nav" aria-label="Primary">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.route}
              href={item.href}
              className={`app-shell-nav-link${route === item.route ? ' is-active' : ''}`}
              aria-current={route === item.route ? 'page' : undefined}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </header>
      <div className="app-shell-body">
        {route === 'accordion' ? (
          <AccordionTemplate />
        ) : (
          <DocsExplorerTemplate />
        )}
      </div>
    </div>
  )
}

export default AppShell
