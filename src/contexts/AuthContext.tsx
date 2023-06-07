import { UserDTO } from "@dtos/UserDTO";
import { api } from "@services/api";
import { storageAuthTokenGet, storageAuthTokenRemove, storageAuthTokenSave } from "@storage/storageAuthToken";
import { storageUserGet, storageUserRemove, storageUserSave } from "@storage/storageUser";
import { AppError } from "@utils/AppError";
import { useToast } from "native-base";
import { createContext, ReactNode, useEffect, useState } from "react";

export interface AuthContextDataProps {
  user: UserDTO
  isLoadingUserStorageData: boolean
  signIn: (email: string, password: string) => Promise<void>
  updateUserProfile: (userUpdate: UserDTO) => Promise<void>
  logout: () => void
}

interface AuthContextProviderProps {
  children: ReactNode
}

export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps)

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const toast = useToast()
  const [user, setUser] = useState<UserDTO>({} as UserDTO)
  const [isLoadingUserStorageData, setIsLoadingUserStorageData] = useState(true)

  async function userAndTokenUpdate(userData: UserDTO, token: string) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`
    setUser(userData)
  }

  async function storageUserAndTokenSave(userData: UserDTO, token: string, refresh_token: string) {
      try {
        setIsLoadingUserStorageData(true)
        await storageUserSave(userData)
        await storageAuthTokenSave({ token, refresh_token })
      } catch (error) {
        throw error
      } finally {
        setIsLoadingUserStorageData(false)
      }
  }

  async function logout() {
    try {
      setIsLoadingUserStorageData(true)
      setUser({} as UserDTO)
      await storageAuthTokenRemove()
      await storageUserRemove()

    } catch (error) {
      throw error
    } finally {
      setIsLoadingUserStorageData(false)
    }
  }

  async function updateUserProfile(userUpdated: UserDTO) {
    try {
      setUser(userUpdated)
      await storageUserSave(userUpdated)
    } catch (error) {
      throw error
    }
  }

  async function signIn(email: string, password: string): Promise<void> {
    try {
      const { data } = await api.post('/sessions', { email, password})
    
      if(data.user && data.token && data.refresh_token) {
        setIsLoadingUserStorageData(true)
        await storageUserAndTokenSave(data.user, data.token, data.refresh_token)

        userAndTokenUpdate(data.user, data.token)
      }
    } catch (err) {
      const isAppError = err instanceof AppError
      const title = isAppError ? err.message : 'Não foi possível efetuar o login, tente novamente'
      toast.show({
        title,
        bgColor: 'red.500'
      })
    } finally {
        setIsLoadingUserStorageData(false)
    }
  }

  async function loadUserDate() {
    try {
      setIsLoadingUserStorageData(true)
      const userLogged = await storageUserGet();
      const { token } = await storageAuthTokenGet();

      if(userLogged && token) {
        userAndTokenUpdate(userLogged, token)
      }
    } catch (error) {
      throw error
    } finally {
      setIsLoadingUserStorageData(false)
    }
  }

  useEffect(() => {
    loadUserDate()
  }, [])

  useEffect(() => {
    const subscribe = api.registerInterceptTokenManager(logout)
    return () => {
      subscribe()
    }
  }, [logout])

  return (
    <AuthContext.Provider value={{ user, signIn, logout, isLoadingUserStorageData, updateUserProfile }}>
      {children}
    </AuthContext.Provider>
  )
}



