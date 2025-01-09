import Home from '@/pages/home'
import '@/styles/index.css'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router'
import Nav from './components/nav'
import CryptoDetails from './components/CryptoDetails'
import Blog from './components/Blog'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Nav />
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path="/details/:id" element={<CryptoDetails />} />
      <Route path="/blog/:id" element={<Blog />} />
    </Routes>
  </BrowserRouter>
)
