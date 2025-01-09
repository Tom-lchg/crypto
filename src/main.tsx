import Home from '@/pages/home'
import '@/styles/index.css'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router'
import Nav from './components/nav'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Nav />
    <Routes>
      <Route path='/' element={<Home />} />
    </Routes>
  </BrowserRouter>
)
