import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

interface User {
  username: string;
  token: string;
}

const Dashboard: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser)); 
    } else {
      navigate('/login'); 
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user'); 
    navigate('/login'); 
  };

  return (
    <div className="dashboard">
      {user ? (
        <>
          <h1 className="text-2xl font-bold">Bienvenue, {user.username}!</h1>
          <p className="mt-4">Voici votre tableau de bord.</p>
          <img src="/src/assets/Zemour.jpg" alt="" />
          <button
            onClick={handleLogout}
            className="mt-6 bg-red-500 text-white py-2 px-4 rounded"
          >
            Déconnexion
          </button>
        </>
      ) : (
        <p>Chargement...</p>
      )}
    </div>
  );
};

export default Dashboard;
