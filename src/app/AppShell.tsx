import { Outlet } from 'react-router-dom'
import Navbar from '../components/organisms/Navbar/Navbar'
import './AppShell.css'

function AppShell() {
  return (
    <div className="app-shell">
      <header className="app-shell__header">
        <h1 className="app-shell__title">Hello App</h1>
        <Navbar />
      </header>
      <main className="app-shell__body">
        <Outlet />
      </main>
    </div>
  )
}

export default AppShell
