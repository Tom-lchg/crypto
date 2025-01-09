/* eslint-disable react-refresh/only-export-components */

import { User } from '@/types/user'
import React, { createContext, FC, useEffect, useState } from 'react'

type UserType = {
  user: User | null
  handleLogout: () => void
  handleLogin: (username: string, password: string) => void
}

export const UserContext = createContext<UserType | null>(null)

interface UserProviderProps {
  children: React.ReactNode
}

export const UserProvider: FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('user')
    setUser(null)
  }

  const handleLogin = (username: string, password: string) => {
    const cred = { username, password }
    localStorage.setItem('user', JSON.stringify(cred))
    const id = 24
    setUser({ id, username })
  }

  return (
    <UserContext.Provider value={{ user, handleLogout, handleLogin }}>
      {children}
    </UserContext.Provider>
  )
}
