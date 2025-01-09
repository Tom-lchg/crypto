import { FC, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';

const Nav: FC = () => {
  const [user, setUser] = useState<{ username: string } | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser)); 
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user'); 
    setUser(null); 
    navigate('/login'); 
  };

  return (
    <nav className="bg-gray-800 text-white py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="space-x-4">
          <Link to="/" className="hover:text-blue-400">Accueil</Link>
          <Link to="/dashboard" className="hover:text-blue-400">Tableau de bord</Link>
          <Link to="/transactions" className="hover:text-blue-400">Transactions</Link>
        </div>

        <div className="space-x-4">
          {user ? (
            <>
              <span className="text-white">Bonjour, {user.username}</span>
              <button
                onClick={handleLogout}
                className="hover:text-red-400"
              >
                Déconnexion
              </button>
            </>
          ) : (
            <Link to="/login" className="hover:text-blue-400">Connexion</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
