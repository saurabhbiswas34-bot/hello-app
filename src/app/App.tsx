import { Suspense, lazy } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import AppShell from './AppShell'

const Home = lazy(() => import('../features/home/Home'))
const Users = lazy(() => import('../features/users/Users'))
const Products = lazy(() => import('../features/products/Products'))

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppShell />}>
          <Route
            index
            element={
              <Suspense fallback={<p>Loading page...</p>}>
                <Home />
              </Suspense>
            }
          />
          <Route
            path="users"
            element={
              <Suspense fallback={<p>Loading page...</p>}>
                <Users />
              </Suspense>
            }
          />
          <Route
            path="products"
            element={
              <Suspense fallback={<p>Loading page...</p>}>
                <Products />
              </Suspense>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
