import { UserDTO } from "@dtos/UserDTO";
import { createContext, ReactNode, useState } from "react";

export interface AuthContextDataProps {
  user: UserDTO
}

interface AuthContextProviderProps {
  children: ReactNode
}

export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps)

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<UserDTO>({
    id: '1',
    name: 'carlos',
    email: 'carlos@zanchet.com',
    avatar: 'avatar.png'
  })

  return (
    <AuthContext.Provider value={{user}}>
      {children}
    </AuthContext.Provider>
  )
}



