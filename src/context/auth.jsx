import { useMutation } from '@tanstack/react-query'
import { createContext, useEffect, useState } from 'react'
import { Outlet } from 'react-router'
import { toast } from 'sonner'

import {
  ACCESS_TK_STORAGE,
  REFRESH_TK_STORAGE,
} from '@/constants/local-storage'
import { protectedApi, publicApi } from '@/lib/axios'

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext({
  user: null,
  login: () => {},
  signUp: () => {},
  initializing: true,
  signOut: () => {},
})

const storeToken = (Token) => {
  localStorage.setItem(ACCESS_TK_STORAGE, Token.accessToken)
  localStorage.setItem(REFRESH_TK_STORAGE, Token.refreshToken)
}

const deleteTokens = () => {
  localStorage.removeItem(ACCESS_TK_STORAGE)
  localStorage.removeItem(REFRESH_TK_STORAGE)
}

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [initializing, setinitializing] = useState(false)

  const signUpMutation = useMutation({
    mutationKey: ['signup'],
    mutationFn: async (variables) => {
      const response = await publicApi.post('/users', {
        first_name: variables.firstName,
        last_name: variables.lastName,
        email: variables.email,
        password: variables.password,
      })
      return response.data
    },
  })

  const signUp = (data) => {
    signUpMutation.mutate(data, {
      onSuccess: (createdUser) => {
        storeToken(createdUser.tokens)
        setUser(createdUser)
        toast.success('usuário criado com sucesso')
      },
      onError: (error) =>
        toast.error(`Houve um erro, usuário não criado: ${error}`),
    })
  }
  const loginMutation = useMutation({
    mutationKey: ['login'],
    mutationFn: async (data) => {
      const response = await publicApi.post('/users/login', {
        email: data.email,
        password: data.password,
      })
      return response.data
    },
  })

  const login = (data) => {
    loginMutation.mutate(data, {
      onSuccess: (createdUser) => {
        storeToken(createdUser.tokens)
        setUser(createdUser)
      },
      onError: (error) => {
        console.log(error)
      },
    })
  }

  useEffect(() => {
    const init = async () => {
      try {
        setinitializing(true)
        const accessToken = localStorage.getItem(ACCESS_TK_STORAGE)
        const refreshToken = localStorage.getItem(REFRESH_TK_STORAGE)
        if (!accessToken && !refreshToken) return
        const response = await protectedApi.get('/users/me')
        // , {
        //   headers: {
        //     Authorization: `Bearer ${accessToken}`,
        //   },
        // })
        setUser(response.data)
      } catch (error) {
        deleteTokens()
        console.log(error)
      } finally {
        setinitializing(false)
      }
    }
    init()
  }, [])

  const signOut = () => {
    setUser(null)
    deleteTokens()
  }

  return (
    <AuthContext.Provider
      value={{ user, login, signUp, initializing, signOut }}
    >
      {children || <Outlet />}
    </AuthContext.Provider>
  )
}
