<<<<<<< HEAD
import { FC } from 'react';
import { Link, useNavigate } from 'react-router';
=======
import { UserContext } from '@/hook/user-context'
import { FC, useContext } from 'react'
import { Link } from 'react-router'
>>>>>>> 7651748ce7ba4360c33815725e7e3d6af48cdb64

const Nav: FC = () => {
  const { user, handleLogout } = useContext(UserContext) || {}

<<<<<<< HEAD
const Nav: FC<NavProps> = ({ user, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user'); 
    onLogout(); 
    navigate('/login'); 
  };

  return (
    <nav className="bg-gray-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link to="/" className="text-xl font-semibold text-blue-400 hover:text-blue-500">Accueil</Link>
          <Link to="/dashboard" className="text-xl font-semibold text-blue-400 hover:text-blue-500">Tableau de bord</Link>
          <Link to="/transactions" className="text-xl font-semibold text-blue-400 hover:text-blue-500">Transactions</Link>
          <Link to="/wallet" className="text-xl font-semibold text-blue-400 hover:text-blue-500">Crypto Dépot</Link>
          <Link to="/portefeuille" className="text-xl font-semibold text-blue-400 hover:text-blue-500">Mon Portefeuille</Link>
        </div>

        <div className="flex items-center space-x-4">
=======
  return (
    <nav className='py-4 px-8'>
      <div className='flex items-center justify-between'>
        <div className='space-x-4'>
          <Link to='/'>Markets</Link>
          <Link to='/wallet'>Wallets</Link>
          <Link to='/portefeuille'>Portefeuille</Link>
        </div>

        <div className='flex items-center space-x-4'>
>>>>>>> 7651748ce7ba4360c33815725e7e3d6af48cdb64
          {user ? (
            <>
              <span className='text-lg font-medium text-white'>Bonjour, {user.username}</span>
              <button
                onClick={handleLogout}
<<<<<<< HEAD
                className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md transition-all"
=======
                className='bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md transition-all'
>>>>>>> 7651748ce7ba4360c33815725e7e3d6af48cdb64
              >
                Déconnexion
              </button>
            </>
          ) : (
            <Link to='/login' className='text-lg font-medium text-blue-400 hover:text-blue-500'>
              Connexion
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}

<<<<<<< HEAD

=======
export default Nav
>>>>>>> 7651748ce7ba4360c33815725e7e3d6af48cdb64
