import { UserDTO } from "@dtos/UserDTO";
import { api } from "@services/api";
import { storageUserGet, storageUserRemove, storageUserSave } from "@storage/storageUser";
import { AppError } from "@utils/AppError";
import { useToast } from "native-base";
import { createContext, ReactNode, useEffect, useState } from "react";

export interface AuthContextDataProps {
  user: UserDTO
  isLoadingUserStorageData: boolean
  signIn: (email: string, password: string) => Promise<void>
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

  async function logout() {
    try {

      setIsLoadingUserStorageData(true)
      setUser({} as UserDTO)
      await storageUserRemove()

    } catch (error) {
      throw error
    } finally {
      setIsLoadingUserStorageData(false)
    }
  }

  async function signIn(email: string, password: string): Promise<void> {
    try {
      const { data } = await api.post('/sessions', { email, password})
    
      if(data.user) {
        setUser(data.user)
        storageUserSave(data.user)
      }
    } catch (err) {
      const isAppError = err instanceof AppError
      const title = isAppError ? err.message : 'Não foi possível efetuar o login, tente novamente'
      toast.show({
        title,
        bgColor: 'red.500'
      })
    }
  }

  async function loadUserDate() {
    try {
      const userLogged = await storageUserGet();
      if(userLogged) {
        setUser(userLogged)
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

  return (
    <AuthContext.Provider value={{ user, signIn, logout, isLoadingUserStorageData }}>
      {children}
    </AuthContext.Provider>
  )
}



