import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router';
import Nav from './components/nav';
import LoginForm from './components/User/LoginForm';
import Dashboard from './components/User/Dashboard';
import WalletApp from './components/Wallet/Wallet';

const Main: React.FC = () => {
  const [user, setUser] = useState<{ username: string } | null>(null);

 
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser)); 
    }
  }, []);

  const handleLogin = (username: string, password: string) => {
    const user = { username, password };
    localStorage.setItem('user', JSON.stringify(user)); 
    setUser(user); 
  };

  const handleLogout = () => {
    localStorage.removeItem('user'); 
    setUser(null); 
  };

  return (
    <Router>
      <Nav user={user} onLogout={handleLogout} />
      <Routes>
        <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/wallet" element={<WalletApp/>}/>
      </Routes>
    </Router>
  );
};

ReactDOM.render(<Main />, document.getElementById('root'));
