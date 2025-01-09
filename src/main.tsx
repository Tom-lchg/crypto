/* eslint-disable react-refresh/only-export-components */

import '@/styles/index.css'
import { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { Route, BrowserRouter as Router, Routes } from 'react-router'
import Nav from './components/nav'
import Dashboard from './components/User/Dashboard'
import LoginForm from './components/User/LoginForm'
import WalletApp from './components/Wallet/Wallet'
import Home from './pages/home'

// @ts-expect-error - ça sera fix plus tard
const root = createRoot(document.getElementById('root'))

const Main = () => {
  const [user, setUser] = useState<{ username: string } | null>(null)

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const handleLogin = (username: string, password: string) => {
    const user = { username, password }
    localStorage.setItem('user', JSON.stringify(user))
    setUser(user)
  }

  const handleLogout = () => {
    localStorage.removeItem('user')
    setUser(null)
  }

  return (
    <Router>
      <Nav user={user} onLogout={handleLogout} />
      <Routes>
        <Route path='/login' element={<LoginForm onLogin={handleLogin} />} />
        <Route path='/' element={<Home />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/wallet' element={<WalletApp />} />
      </Routes>
    </Router>
  )
}

root.render(<Main />)
