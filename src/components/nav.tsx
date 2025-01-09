import { FC } from 'react'
import { Link } from 'react-router'

interface NavProps {
  user: { username: string } | null
  onLogout: () => void
}

const Nav: FC<NavProps> = ({ user, onLogout }) => {
  return (
    <nav className='py-4 px-8'>
      <div className='flex items-center justify-between'>
        <div className='space-x-4'>
          <Link to='/'>Home</Link>
        </div>

        <div className='flex items-center space-x-4'>
          {user ? (
            <>
              <span className='text-lg font-medium text-white'>Bonjour, {user.username}</span>
              <button
                onClick={onLogout}
                className='bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md transition-all'
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

export default Nav
