import { createContext, useContext } from 'react'

export const AuthContext = createContext({
  user: null,
  login: () => {},
  signUp: () => {},
  initializing: true,
  signOut: () => {},
})

export const useAuthContext = () => useContext(AuthContext)
