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
      setUser(JSON.parse(storedUser)); // Récupère l'utilisateur du localStorage
    } else {
      navigate('/login'); // Redirige vers la page de connexion si aucun utilisateur n'est connecté
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user'); // Supprime l'utilisateur du localStorage lors de la déconnexion
    navigate('/login'); // Redirige vers la page de connexion
  };

  return (
    <div className="dashboard">
      {user ? (
        <>
          <h1 className="text-2xl font-bold">Bienvenue, {user.username}!</h1>
          <p className="mt-4">Voici votre tableau de bord.</p>
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
