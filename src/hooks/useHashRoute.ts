import { useEffect, useState } from 'react'

const DEFAULT_ROUTE = 'docs'
const KNOWN_ROUTES = new Set(['docs', 'accordion'])

const parseHash = (): string => {
  const raw = window.location.hash.replace(/^#\/?/, '').split('?')[0]
  return KNOWN_ROUTES.has(raw) ? raw : DEFAULT_ROUTE
}

const useHashRoute = (): string => {
  const [route, setRoute] = useState<string>(parseHash)

  useEffect(() => {
    const handleChange = () => setRoute(parseHash())
    window.addEventListener('hashchange', handleChange)
    return () => window.removeEventListener('hashchange', handleChange)
  }, [])

  return route
}

export default useHashRoute
