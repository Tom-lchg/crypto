<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router';
import Nav from './components/nav';
import LoginForm from './components/User/LoginForm';
import Dashboard from './components/User/Dashboard';
import WalletApp from './components/Wallet/Wallet';
import Portefeuille from './components/Wallet/Portefeuille';
import '@/styles/index.css'

=======
/* eslint-disable react-refresh/only-export-components */
>>>>>>> 7651748ce7ba4360c33815725e7e3d6af48cdb64

import '@/styles/index.css'
import { createRoot } from 'react-dom/client'
import { Route, BrowserRouter as Router, Routes } from 'react-router'
import Nav from './components/nav'
import Dashboard from './components/User/Dashboard'
import LoginForm from './components/User/LoginForm'
import { UserProvider } from './hook/user-context'
import Home from './pages/home'
import Wallet from './pages/wallet'

// @ts-expect-error - ça sera fix plus tard
const root = createRoot(document.getElementById('root'))

const Main = () => {
  return (
<<<<<<< HEAD
    <Router>
      <Nav user={user} onLogout={handleLogout} />
      <Routes>
        <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/wallet" element={<WalletApp/>}/>
        <Route path="/portefeuille" element={<Portefeuille/>}/>
      </Routes>
    </Router>
  );
};
=======
    <UserProvider>
      <Router>
        <Nav />
        <Routes>
          <Route path='/login' element={<LoginForm />} />
          <Route path='/' element={<Home />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/wallet' element={<Wallet />} />
        </Routes>
      </Router>
    </UserProvider>
  )
}
>>>>>>> 7651748ce7ba4360c33815725e7e3d6af48cdb64

root.render(<Main />)
