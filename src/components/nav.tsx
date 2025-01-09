import { FC, JSX } from 'react'
import { Link } from 'react-router'

const Nav: FC = (): JSX.Element => {
  return (
    <nav>
      <div className='max-w-7xl mx-auto flex items-center justify-between'>
        <div className='space-x-4'>
          <Link to='/'>Home</Link>
          <Link to='/'>Home</Link>
          <Link to='/'>Home</Link>
        </div>
        <div className='space-x-4'>
          <Link to='/'>Login</Link>
        </div>
      </div>
    </nav>
  )
}

export default Nav
