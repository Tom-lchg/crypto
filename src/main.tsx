import Home from '@/pages/home';
import '@/styles/index.css';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router';
import Nav from './components/nav';
import LoginForm from './components/User/LoginForm';
import { useEffect } from 'react';
import Dashboard from './components/User/Dashboard';

const App = () => {
  const navigate = useNavigate();

  const handleLogin = (username: string, password: string) => {

    const user = { username, token: 'dummyToken' };
    localStorage.setItem('user', JSON.stringify(user));
    navigate('/dashboard');
  };

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      navigate('/dashboard');
    }
  }, [navigate]);

  return (
    <>
      <Nav />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<LoginForm onLogin={handleLogin} />} />
        <Route path='/dashboard' element={<Dashboard />} />
      </Routes>
    </>
  );
};

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
