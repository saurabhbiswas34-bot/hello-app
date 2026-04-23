import { Outlet } from 'react-router-dom'
import Navbar from '../components/organisms/Navbar/Navbar'
import './AppShell.css'

function AppShell() {
  return (
    <div className="app-shell">
      <header className="app-shell__header">
        <Navbar />
      </header>
      <div className="app-shell__body">
        <Outlet />
      </div>
    </div>
  )
}

export default AppShell
